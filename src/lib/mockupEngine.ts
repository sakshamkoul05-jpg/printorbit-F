// Canvas perspective warp engine for Placeit-style mockups

export interface CornerPoints {
  tl: { x: number; y: number };
  tr: { x: number; y: number };
  bl: { x: number; y: number };
  br: { x: number; y: number };
}

export interface SceneDef {
  id: string;
  name: string;
  product: string;
  photoUrl: string;
  corners: CornerPoints;
  clipPath?: string;
  blendMode?: GlobalCompositeOperation;
  textureOverlay?: string;
  shadow?: { angle: number; distance: number; blur: number; opacity: number };
  description?: string;
}

// ── Perspective warp: map a design into 4-point quadrilateral ──
export function renderPerspectiveWarp(
  ctx: CanvasRenderingContext2D,
  designImg: HTMLImageElement,
  corners: CornerPoints,
  canvasW: number,
  canvasH: number,
  options?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    opacity?: number;
    blendMode?: GlobalCompositeOperation;
  }
) {
  const { tl, tr, bl, br } = corners;

  // Convert % coords to pixel coords
  const pts = [
    tl.x * canvasW, tl.y * canvasH,
    tr.x * canvasW, tr.y * canvasH,
    br.x * canvasW, br.y * canvasH,
    bl.x * canvasW, bl.y * canvasH,
  ];

  // Find bounding box of destination quad
  const xs = [pts[0], pts[2], pts[4], pts[6]];
  const ys = [pts[1], pts[3], pts[5], pts[7]];
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  const dstW = maxX - minX;
  const dstH = maxY - minY;

  if (dstW <= 0 || dstH <= 0) return;

  // Use homography-based perspective interpolation
  // For each pixel in the destination bounding box, find source UV,
  // then sample the design image.

  // Normalize destination corners relative to bounding box
  const ntl = { x: (pts[0] - minX) / dstW, y: (pts[1] - minY) / dstH };
  const ntr = { x: (pts[2] - minX) / dstW, y: (pts[3] - minY) / dstH };
  const nbr = { x: (pts[4] - minX) / dstW, y: (pts[5] - minY) / dstH };
  const nbl = { x: (pts[6] - minX) / dstW, y: (pts[7] - minY) / dstH };

  // Calculate source image dimensions
  const srcW = designImg.naturalWidth || designImg.width;
  const srcH = designImg.naturalHeight || designImg.height;

  // Get source image data
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = srcW;
  tempCanvas.height = srcH;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.drawImage(designImg, 0, 0);
  const srcData = tempCtx.getImageData(0, 0, srcW, srcH).data;

  // Create output image data
  const dstImgData = ctx.createImageData(Math.ceil(dstW), Math.ceil(dstH));
  const dstData = dstImgData.data;

  // Apply image adjustments
  const bri = (options?.brightness ?? 0) / 100;
  const con = (options?.contrast ?? 0) / 100;
  const sat = (options?.saturation ?? 0) / 100;
  const op = (options?.opacity ?? 100) / 100;

  // Pixel-level helper (defined once outside loop for performance)
  const gIdx = (x: number, y: number) => (y * srcW + x) * 4;
  const dstW2 = Math.floor(dstW);
  const dstH2 = Math.floor(dstH);

  for (let py = 0; py < dstH2; py++) {
    const ny = py / dstH;
    const rowBase = py * dstW2 * 4;
    for (let px = 0; px < dstW2; px++) {
      const nx = px / dstW;
      const di = rowBase + px * 4;

      // Bilinear UV interpolation in destination space
      const topU = ntl.x + (ntr.x - ntl.x) * nx;
      const topV = ntl.y + (ntr.y - ntl.y) * nx;
      const botU = nbl.x + (nbr.x - nbl.x) * nx;
      const botV = nbl.y + (nbr.y - nbl.y) * nx;
      const u = topU + (botU - topU) * ny;
      const v = topV + (botV - topV) * ny;

      const srcX = u * srcW;
      const srcY = v * srcH;

      if (srcX < 0 || srcX >= srcW || srcY < 0 || srcY >= srcH) {
        dstData[di] = 0; dstData[di + 1] = 0; dstData[di + 2] = 0; dstData[di + 3] = 0;
        continue;
      }

      const ix = Math.floor(srcX);
      const iy = Math.floor(srcY);
      const fx = srcX - ix;
      const fy = srcY - iy;
      const ix1 = Math.min(ix + 1, srcW - 1);
      const iy1 = Math.min(iy + 1, srcH - 1);

      const i00 = gIdx(ix, iy);
      const i10 = gIdx(ix1, iy);
      const i01 = gIdx(ix, iy1);
      const i11 = gIdx(ix1, iy1);
      const w00 = (1 - fx) * (1 - fy);
      const w10 = fx * (1 - fy);
      const w01 = (1 - fx) * fy;
      const w11 = fx * fy;

      let r = srcData[i00] * w00 + srcData[i10] * w10 + srcData[i01] * w01 + srcData[i11] * w11;
      let g = srcData[i00 + 1] * w00 + srcData[i10 + 1] * w10 + srcData[i01 + 1] * w01 + srcData[i11 + 1] * w11;
      let b = srcData[i00 + 2] * w00 + srcData[i10 + 2] * w10 + srcData[i01 + 2] * w01 + srcData[i11 + 2] * w11;
      let a = srcData[i00 + 3] * w00 + srcData[i10 + 3] * w10 + srcData[i01 + 3] * w01 + srcData[i11 + 3] * w11;

      if (bri !== 0) { r = Math.min(255, Math.max(0, r + bri * 255)); g = Math.min(255, Math.max(0, g + bri * 255)); b = Math.min(255, Math.max(0, b + bri * 255)); }
      if (con !== 0) { const f = 1 + con; r = Math.min(255, Math.max(0, (r - 128) * f + 128)); g = Math.min(255, Math.max(0, (g - 128) * f + 128)); b = Math.min(255, Math.max(0, (b - 128) * f + 128)); }
      if (sat !== 0) { const gr = 0.2989 * r + 0.5870 * g + 0.1140 * b; r = Math.min(255, Math.max(0, gr + (r - gr) * (1 + sat))); g = Math.min(255, Math.max(0, gr + (g - gr) * (1 + sat))); b = Math.min(255, Math.max(0, gr + (b - gr) * (1 + sat))); }
      a = a * op;

      dstData[di] = r; dstData[di + 1] = g; dstData[di + 2] = b; dstData[di + 3] = a;
    }
  }

  // Put the warped image data
  const warpedCanvas = document.createElement('canvas');
  warpedCanvas.width = Math.ceil(dstW);
  warpedCanvas.height = Math.ceil(dstH);
  const warpedCtx = warpedCanvas.getContext('2d')!;
  warpedCtx.putImageData(dstImgData, 0, 0);

  // Draw onto main canvas at the correct position
  ctx.save();

  if (options?.blendMode) {
    ctx.globalCompositeOperation = options.blendMode;
  }

  ctx.drawImage(warpedCanvas, minX, minY, dstW, dstH);
  ctx.restore();

  return { x: minX, y: minY, w: dstW, h: dstH };
}

// ── Render background scene ──
export function renderBackground(
  ctx: CanvasRenderingContext2D,
  bgImg: HTMLImageElement,
  w: number,
  h: number
) {
  ctx.drawImage(bgImg, 0, 0, w, h);
}

// ── Render shadow for the product ──
export function renderShadow(
  ctx: CanvasRenderingContext2D,
  corners: CornerPoints,
  shadow: { angle: number; distance: number; blur: number; opacity: number },
  canvasW: number,
  canvasH: number
) {
  const cx = ((corners.tl.x + corners.tr.x + corners.bl.x + corners.br.x) / 4) * canvasW;
  const cy = ((corners.tl.y + corners.tr.y + corners.bl.y + corners.br.y) / 4) * canvasH;

  const angleRad = shadow.angle * Math.PI / 180;

  const w = (corners.tr.x - corners.tl.x + corners.br.x - corners.bl.x) / 2 * canvasW;
  const h = (corners.bl.y - corners.tl.y + corners.br.y - corners.tr.y) / 2 * canvasH;

  ctx.save();

  // Multiple shadow layers for realism
  for (let i = 0; i < 3; i++) {
    const layerOpacity = shadow.opacity * (1 - i * 0.3);
    const layerBlur = shadow.blur * (1 + i * 0.5);
    const layerDist = shadow.distance * (1 + i * 0.4);

    const lx = Math.cos(angleRad) * layerDist * (canvasW / 100);
    const ly = Math.sin(angleRad) * layerDist * (canvasH / 100);

    ctx.shadowColor = `rgba(0,0,0,${layerOpacity})`;
    ctx.shadowBlur = layerBlur;
    ctx.shadowOffsetX = lx;
    ctx.shadowOffsetY = ly;
    ctx.fillStyle = 'rgba(0,0,0,0.01)';
    ctx.fillRect(cx - w / 2 + lx, cy - h / 2 + ly, w, h);
  }

  ctx.restore();
}

// ── Render vignette ──
export function renderVignette(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  strength: number = 0.3
) {
  const grad = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.8);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(1, `rgba(0,0,0,${strength})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

// ── Render noise grain overlay ──
export function renderGrain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  intensity: number = 0.04
) {
  const grainCanvas = document.createElement('canvas');
  grainCanvas.width = w;
  grainCanvas.height = h;
  const gctx = grainCanvas.getContext('2d')!;
  const imgData = gctx.createImageData(w, h);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const val = Math.random() * 255;
    imgData.data[i] = val;
    imgData.data[i + 1] = val;
    imgData.data[i + 2] = val;
    imgData.data[i + 3] = intensity * 255;
  }
  gctx.putImageData(imgData, 0, 0);
  ctx.globalCompositeOperation = 'multiply';
  ctx.drawImage(grainCanvas, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
}
