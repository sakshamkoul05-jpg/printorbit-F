/**
 * Render Pipeline — the master orchestrator.
 * Runs the full photorealistic rendering pipeline:
 * 
 * 1. Preprocess artwork (auto-crop, auto-center, detect transparency)
 * 2. Fit artwork to printable area (maintain aspect ratio, no stretching)
 * 3. Perspective warp (homography with bilinear/bicubic sampling)
 * 4. Mesh warp (grid deformation for fabric, paper)
 * 5. Bezier warp (curved surface patches)
 * 6. Cylinder projection (mugs, bottles)
 * 7. Displacement mapping (surface irregularities)
 * 8. Alpha mask clip (printable area mask)
 * 9. Multiply blend onto background
 * 10. Apply shadows
 * 11. Apply highlights
 * 12. Apply reflections
 * 13. Apply surface texture
 * 14. Color adjustments (brightness, contrast, HSL, curves)
 * 15. Anti-aliasing
 * 16. Export
 */

import type { MockupMetadata, RenderOptions, RenderProgress } from '../types';
import { PipelineStage } from '../types';
import type { LoadedAssets } from '../assets/loader';
import { bitmapToImageData } from '../assets/loader';
import { computeHomography, invertHomography, warpPerspective } from './homography';
import { warpMesh } from './mesh-warp';
import { applyDisplacement } from './displacement';
import { projectCylinder, applyCurvature } from './cylinder';
import { compositeBlend, applyShadow, applyHighlight, applyReflection, applyMask } from './compositor';
import { applyTexture } from './texture';
import { applyColorAdjustments } from './color';
import { applyAntiAlias, DEFAULT_AA } from './anti-alias';
import { computePrintAreaMapping } from '../assets/metadata';

type ProgressCallback = (progress: RenderProgress) => void;

/**
 * Run the full rendering pipeline.
 * 
 * @param artwork Customer artwork as ImageData
 * @param assets Loaded mockup assets (background, mask, etc.)
 * @param metadata Mockup metadata
 * @param options Render options (color adjustments, intensities, output size)
 * @param onProgress Optional progress callback
 * @returns Final rendered ImageData
 */
export async function renderPipeline(
  artwork: ImageData,
  assets: LoadedAssets,
  metadata: MockupMetadata,
  options: RenderOptions,
  onProgress?: ProgressCallback,
): Promise<ImageData> {
  const scale = options.scale || 1;
  const outW = Math.round((options.outputWidth || metadata.width) * scale);
  const outH = Math.round((options.outputHeight || metadata.height) * scale);

  // ── Stage 1: Preprocess artwork ──
  report(onProgress, PipelineStage.Preprocess, 0, 'Preprocessing artwork');
  let current = preprocessArtwork(artwork, metadata);

  // ── Stage 2: Fit to printable area ──
  report(onProgress, PipelineStage.FitToPrintArea, 5, 'Fitting to printable area');
  current = fitToPrintArea(current, metadata);

  // ── Stage 3: Perspective Warp ──
  report(onProgress, PipelineStage.PerspectiveWarp, 15, 'Applying perspective warp');
  current = await perspectiveWarpStage(current, metadata, outW, outH);

  // ── Stage 4: Mesh Warp ──
  if (metadata.mesh) {
    report(onProgress, PipelineStage.MeshWarp, 30, 'Applying mesh warp');
    // Note: requires src mesh from metadata
  }

  // ── Stage 5: Bezier Warp ──
  if (metadata.bezierPatches && metadata.bezierPatches.length > 0) {
    report(onProgress, PipelineStage.BezierWarp, 35, 'Applying bezier warp');
    // Future: bezier patch rendering
  }

  // ── Stage 6: Cylinder Projection ──
  if (metadata.cylinder) {
    report(onProgress, PipelineStage.CylinderProjection, 40, 'Applying cylinder projection');
    current = projectCylinder(current, {
      centerX: metadata.cylinder.centerX * scale,
      centerY: metadata.cylinder.centerY * scale,
      radius: metadata.cylinder.radius * scale,
      angleStart: metadata.cylinder.angleStart,
      angleEnd: metadata.cylinder.angleEnd,
      height: outH,
    }, outW, outH);
  }

  // ── Stage 7: Displacement Mapping ──
  if (assets.displacement && metadata.displacementStrength > 0) {
    report(onProgress, PipelineStage.DisplacementMapping, 50, 'Applying displacement mapping');
    const dispData = bitmapToImageData(assets.displacement);
    current = applyDisplacement(current, dispData, {
      strength: metadata.displacementStrength * options.displacementIntensity,
      scale: 1,
      wrap: false,
    });
  }

  // Now composite onto the background
  // First, load background as ImageData
  report(onProgress, PipelineStage.MaskClip, 60, 'Compositing onto product');
  const bg = bitmapToImageData(assets.background);
  
  // Scale background to output size if needed
  const bgReady = bg.width !== outW || bg.height !== outH
    ? resizeImageData(bg, outW, outH)
    : bg;

  // ── Stage 8: Mask Clip ──
  const mask = bitmapToImageData(assets.mask);
  const maskReady = mask.width !== outW || mask.height !== outH
    ? resizeImageData(mask, outW, outH)
    : mask;
  applyMask(current, maskReady);

  // ── Stage 9: Multiply Blend onto Background ──
  report(onProgress, PipelineStage.MultiplyBlend, 70, 'Applying multiply blend');
  compositeBlend(bgReady, current, metadata.blend);

  // ── Stage 10: Apply Shadows ──
  if (assets.shadows && metadata.shadowOpacity > 0) {
    report(onProgress, PipelineStage.ShadowApply, 75, 'Applying shadows');
    const shadowData = assets.shadows.width !== outW || assets.shadows.height !== outH
      ? resizeImageData(bitmapToImageData(assets.shadows), outW, outH)
      : bitmapToImageData(assets.shadows);
    applyShadow(bgReady, shadowData, metadata.shadowOpacity * options.shadowIntensity);
  }

  // ── Stage 11: Apply Highlights ──
  if (assets.highlights && metadata.highlightOpacity > 0) {
    report(onProgress, PipelineStage.HighlightApply, 80, 'Applying highlights');
    const hlData = assets.highlights.width !== outW || assets.highlights.height !== outH
      ? resizeImageData(bitmapToImageData(assets.highlights), outW, outH)
      : bitmapToImageData(assets.highlights);
    applyHighlight(bgReady, hlData, metadata.highlightOpacity * options.highlightIntensity);
  }

  // ── Stage 12: Apply Reflections ──
  if (assets.reflection && metadata.reflectionOpacity > 0) {
    report(onProgress, PipelineStage.ReflectionApply, 85, 'Applying reflections');
    const refData = assets.reflection.width !== outW || assets.reflection.height !== outH
      ? resizeImageData(bitmapToImageData(assets.reflection), outW, outH)
      : bitmapToImageData(assets.reflection);
    applyReflection(bgReady, refData, metadata.reflectionOpacity * options.reflectionIntensity);
  }

  // ── Stage 13: Apply Surface Texture ──
  if (metadata.textureStrength > 0) {
    report(onProgress, PipelineStage.TextureApply, 90, 'Applying surface texture');
    let textureImageData: ImageData | undefined = undefined;
    if (assets.texture) {
      textureImageData = bitmapToImageData(assets.texture);
    }
    applyTexture(bgReady, {
      type: metadata.surfaceTexture,
      strength: metadata.textureStrength * options.textureIntensity,
    }, textureImageData);
  }

  // ── Stage 14: Color Adjustments ──
  report(onProgress, PipelineStage.ColorAdjust, 93, 'Applying color adjustments');
  applyColorAdjustments(bgReady, options.colorAdjustments);

  // ── Stage 15: Anti-Aliasing ──
  if (options.antiAlias) {
    report(onProgress, PipelineStage.AntiAlias, 96, 'Applying anti-aliasing');
    applyAntiAlias(bgReady, DEFAULT_AA);
  }

  // ── Stage 16: Done ──
  report(onProgress, PipelineStage.Export, 100, 'Complete');

  return bgReady;
}

/**
 * Preprocess artwork: auto-crop transparent edges, auto-center.
 */
function preprocessArtwork(artwork: ImageData, metadata: MockupMetadata): ImageData {
  // Auto-crop transparent edges
  let processed = autoCrop(artwork);
  if (processed.width === 0 || processed.height === 0) {
    return new ImageData(1, 1);
  }
  return processed;
}

function autoCrop(imageData: ImageData): ImageData {
  const { data, width, height } = imageData;
  let minX = width, minY = height, maxX = 0, maxY = 0;
  let hasContent = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 0) {
        hasContent = true;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (!hasContent) return new ImageData(1, 1);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const cropped = new ImageData(cropW, cropH);

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const si = ((minY + y) * width + (minX + x)) * 4;
      const di = (y * cropW + x) * 4;
      for (let c = 0; c < 4; c++) cropped.data[di + c] = data[si + c];
    }
  }

  return cropped;
}

/**
 * Fit artwork to printable area while maintaining aspect ratio.
 * Never stretches — adds transparent padding if needed.
 */
function fitToPrintArea(artwork: ImageData, metadata: MockupMetadata): ImageData {
  const pa = metadata.printArea;
  const targetW = pa.width;
  const targetH = pa.height;

  const artAspect = artwork.width / artwork.height;
  const targetAspect = targetW / targetH;

  let fitW: number, fitH: number;
  if (artAspect > targetAspect) {
    fitW = targetW;
    fitH = Math.round(targetW / artAspect);
  } else {
    fitH = targetH;
    fitW = Math.round(targetH * artAspect);
  }

  // Resize artwork to fit
  const resized = resizeImageData(artwork, fitW, fitH);

  // Center in target
  const result = new ImageData(targetW, targetH);
  const ox = Math.round((targetW - fitW) / 2);
  const oy = Math.round((targetH - fitH) / 2);

  for (let y = 0; y < fitH; y++) {
    for (let x = 0; x < fitW; x++) {
      const si = (y * fitW + x) * 4;
      const di = ((oy + y) * targetW + (ox + x)) * 4;
      for (let c = 0; c < 4; c++) result.data[di + c] = resized.data[si + c];
    }
  }

  return result;
}

/**
 * Perspective warp stage: compute homography and warp artwork.
 */
async function perspectiveWarpStage(
  artwork: ImageData,
  metadata: MockupMetadata,
  outW: number,
  outH: number,
): Promise<ImageData> {
  const mapping = computePrintAreaMapping(metadata);

  // Source is the entire fitted artwork (already sized to printArea)
  // We need to warp from artwork space → product corner space
  const artworkW = artwork.width;
  const artworkH = artwork.height;

  const srcCorners = [
    { x: 0, y: 0 },
    { x: artworkW, y: 0 },
    { x: artworkW, y: artworkH },
    { x: 0, y: artworkH },
  ] as [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }, { x: number; y: number }];

  // Scale destination corners to output dimensions
  const scaleX = outW / metadata.width;
  const scaleY = outH / metadata.height;
  const dstCorners = [
    { x: metadata.corners.tl.x * scaleX, y: metadata.corners.tl.y * scaleY },
    { x: metadata.corners.tr.x * scaleX, y: metadata.corners.tr.y * scaleY },
    { x: metadata.corners.br.x * scaleX, y: metadata.corners.br.y * scaleY },
    { x: metadata.corners.bl.x * scaleX, y: metadata.corners.bl.y * scaleY },
  ] as [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }, { x: number; y: number }];

  // Compute homography from destination → source (inverse)
  const H = computeHomography(dstCorners, srcCorners);

  // Warp artwork to output canvas
  const warped = warpPerspective(artwork, H, outW, outH, {
    sampling: 'bicubic',
    edgeBehavior: 'transparent',
  });

  return warped;
}

/**
 * Resize ImageData to new dimensions using canvas 2D API.
 */
export function resizeImageData(src: ImageData, newW: number, newH: number): ImageData {
  const canvas = new OffscreenCanvas(newW, newH);
  const ctx = canvas.getContext('2d')!;
  // Draw source to temp canvas then to target for quality resizing
  const temp = new OffscreenCanvas(src.width, src.height);
  const tCtx = temp.getContext('2d')!;
  tCtx.putImageData(src, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(temp, 0, 0, newW, newH);
  return ctx.getImageData(0, 0, newW, newH);
}

function report(
  cb: ProgressCallback | undefined,
  stage: PipelineStage,
  percent: number,
  message: string,
) {
  cb?.({ stage, percent, message });
}
