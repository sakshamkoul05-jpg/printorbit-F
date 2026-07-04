/**
 * Render Engine — main entry point.
 * Exports the complete photorealistic mockup rendering API.
 * 
 * Architecture:
 * 
 * ┌─────────────────────────────────────────────────────┐
 * │                    renderEngine                      │
 * │  ┌─────────────┐  ┌────────────┐  ┌──────────────┐ │
 * │  │ Core         │  │ Assets      │  │ Products      │ │
 * │  │ ├ homography │  │ ├ loader    │  │ ├ registry    │ │
 * │  │ ├ mesh-warp  │  │ ├ metadata  │  │ └ (per-type)  │ │
 * │  │ ├ compositor │  │ └ cache     │  └──────────────┘ │
 * │  │ ├ texture    │  └────────────┘                    │
 * │  │ ├ color      │  ┌────────────┐                    │
 * │  │ ├ cylinder   │  │ Workers     │                    │
 * │  │ ├ displacem. │  │ └ render    │                    │
 * │  │ ├ anti-alias │  └────────────┘                    │
 * │  │ └ pipeline   │  ┌────────────┐                    │
 * │  └─────────────┘  │ Export      │                    │
 * │                    │ └ encoder   │                    │
 * │                    └────────────┘                    │
 * └─────────────────────────────────────────────────────┘
 */

// ── Core Rendering Pipeline ──
export { renderPipeline } from './core/pipeline';
export { resizeImageData } from './core/pipeline';

// ── Perspective Warp ──
export {
  computeHomography,
  invertHomography,
  warpPerspective,
  mat3Transform,
  sampleBilinear,
  sampleBicubic,
} from './core/homography';
export type { Mat3, WarpOptions } from './core/homography';

// ── Mesh Warp ──
export { warpMesh } from './core/mesh-warp';

// ── Displacement Mapping ──
export { applyDisplacement } from './core/displacement';
export type { DisplacementOptions } from './core/displacement';

// ── Cylinder Projection ──
export { projectCylinder, applyCurvature } from './core/cylinder';
export type { CylinderParams } from './core/cylinder';

// ── Compositor ──
export {
  compositeBlend,
  applyShadow,
  applyHighlight,
  applyReflection,
  applyMask,
} from './core/compositor';

// ── Texture Application ──
export { applyTexture } from './core/texture';
export type { TextureOptions } from './core/texture';

// ── Color Adjustments ──
export { applyColorAdjustments } from './core/color';

// ── Anti-Aliasing ──
export { applyAntiAlias } from './core/anti-alias';
export type { AASettings } from './core/anti-alias';

// ── Asset Management ──
export {
  loadMockupAssets,
  loadArtwork,
  bitmapToImageData,
  autoCropTransparent,
  autoCenter,
  clearAssetCache,
} from './assets/loader';
export type { LoadedAssets } from './assets/loader';

// ── Metadata ──
export {
  parseMetadata,
  computePrintAreaMapping,
  validateMetadata,
} from './assets/metadata';

// ── Product Renderers ──
export {
  registerRenderer,
  getRenderer,
  hasRenderer,
  getAllRenderers,
} from './products/registry';
export type { ProductRenderer, ProductRenderContext } from './products/registry';

// ── Web Worker ──
export { submitRenderJob, terminateWorker } from './workers/render-worker-client';

// ── Export ──
export { exportResult, downloadBlob } from './export/encoder';

// ── Types ──
export type {
  Point2D,
  QuadCorners,
  MeshGrid,
  BezierPatch,
  ColorAdjustments,
  BlendMode,
  SurfaceTexture,
  MockupMetadata,
  RenderOptions,
  RenderProgress,
  PipelineStage,
  ExportFormat,
  ExportResult,
  ValidationResult,
} from './types';

export {
  DEFAULT_COLOR_ADJUSTMENTS,
  DEFAULT_RENDER_OPTIONS,
  PipelineStage as PipelineStageEnum,
} from './types';
