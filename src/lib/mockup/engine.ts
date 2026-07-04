import type { CornerPoints, SceneDef, DesignBlendMode } from '@/types/mockup';

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 800;
export const EXPORT_SCALES = [1, 2, 3] as const;

// ── Main composite renderer ──
export function renderMockup(
  ctx: CanvasRenderingContext2D,
  designImg: HTMLImageElement | null,
  scene: SceneDef,
  options: {
    brightness?: number; contrast?: number; saturation?: number; opacity?: number;
    shadowIntensity?: number; reflectionIntensity?: number; blendMode?: DesignBlendMode;
  },
  canvasW: number,
  canvasH: number,
) {
  ctx.clearRect(0, 0, canvasW, canvasH);

  // 1) Background
  const bgMatch = scene.background.value.match(/#[0-9a-f]{6}/gi);
  if (bgMatch && bgMatch.length >= 2) {
    const g = ctx.createLinearGradient(0, 0, canvasW, canvasH);
    bgMatch.forEach((c, i) => g.addColorStop(i / (bgMatch.length - 1), c));
    ctx.fillStyle = g;
  } else {
    ctx.fillStyle = bgMatch?.[0] || '#e8e0d8';
  }
  ctx.fillRect(0, 0, canvasW, canvasH);

  // 2) Ambient lighting
  const light = ctx.createRadialGradient(canvasW * 0.7, canvasH * 0.2, 0, canvasW * 0.7, canvasH * 0.2, canvasW * 0.9);
  light.addColorStop(0, 'rgba(255,240,200,0.14)');
  light.addColorStop(1, 'transparent');
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, canvasW, canvasH);

  // 3) Design with perspective warp
  if (designImg) {
    const bri = options.brightness ?? 0;
    const con = options.contrast ?? 0;
    const sat = options.saturation ?? 0;
    const op = options.opacity ?? 100;
    const bm = options.blendMode || 'normal';
    renderPerspectiveWarp(ctx, designImg, scene.perspectivePoints, canvasW, canvasH, { brightness: bri, contrast: con, saturation: sat, opacity: op, blendMode: bm });
  }

  // 4) Texture overlay
  if (scene.textureLayer) {
    renderTextureOverlay(ctx, canvasW, canvasH, scene.textureLayer.type, scene.textureLayer.opacity);
  }

  // 5) Shadow
  if (scene.shadow && designImg) {
    const si = options.shadowIntensity ?? 1;
    renderShadow(ctx, scene.perspectivePoints, { ...scene.shadow, opacity: scene.shadow.opacity * si }, canvasW, canvasH);
  }

  // 6) Vignette
  renderVignette(ctx, canvasW, canvasH, 0.22);
}

// ── Per-pixel perspective warp ──
export function renderPerspectiveWarp(
  ctx: CanvasRenderingContext2D,
  designImg: HTMLImageElement,
  corners: CornerPoints,
  canvasW: number,
  canvasH: number,
  options?: { brightness?: number; contrast?: number; saturation?: number; opacity?: number; blendMode?: DesignBlendMode },
) {
  const pts = [
    corners.tl.x * canvasW, corners.tl.y * canvasH,
    corners.tr.x * canvasW, corners.tr.y * canvasH,
    corners.br.x * canvasW, corners.br.y * canvasH,
    corners.bl.x * canvasW, corners.bl.y * canvasH,
  ];
  const xs = [pts[0], pts[2], pts[4], pts[6]];
  const ys = [pts[1], pts[3], pts[5], pts[7]];
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  const dstW = maxX - minX;
  const dstH = maxY - minY;
  if (dstW <= 0 || dstH <= 0) return;

  const ntl = { x: (pts[0] - minX) / dstW, y: (pts[1] - minY) / dstH };
  const ntr = { x: (pts[2] - minX) / dstW, y: (pts[3] - minY) / dstH };
  const nbr = { x: (pts[4] - minX) / dstW, y: (pts[5] - minY) / dstH };
  const nbl = { x: (pts[6] - minX) / dstW, y: (pts[7] - minY) / dstH };

  const srcW = designImg.naturalWidth || designImg.width;
  const srcH = designImg.naturalHeight || designImg.height;
  if (srcW === 0 || srcH === 0) return;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = srcW;
  tempCanvas.height = srcH;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.drawImage(designImg, 0, 0);
  const srcData = tempCtx.getImageData(0, 0, srcW, srcH).data;

  const dstImgData = ctx.createImageData(Math.ceil(dstW), Math.ceil(dstH));
  const dstData = dstImgData.data;
  const bri = (options?.brightness ?? 0) / 100;
  const con = (options?.contrast ?? 0) / 100;
  const sat = (options?.saturation ?? 0) / 100;
  const op = (options?.opacity ?? 100) / 100;

  const gIdx = (x: number, y: number) => (y * srcW + x) * 4;
  const dw = Math.floor(dstW);
  const dh = Math.floor(dstH);

  for (let py = 0; py < dh; py++) {
    const ny = py / dstH;
    const row = py * dw * 4;
    for (let px = 0; px < dw; px++) {
      const nx = px / dstW;
      const di = row + px * 4;
      const tu = ntl.x + (ntr.x - ntl.x) * nx;
      const tv = ntl.y + (ntr.y - ntl.y) * nx;
      const bu = nbl.x + (nbr.x - nbl.x) * nx;
      const bv = nbl.y + (nbr.y - nbl.y) * nx;
      const u = tu + (bu - tu) * ny;
      const v = tv + (bv - tv) * ny;
      const sx = u * srcW;
      const sy = v * srcH;

      if (sx < 0 || sx >= srcW || sy < 0 || sy >= srcH) {
        dstData[di] = 0; dstData[di + 1] = 0; dstData[di + 2] = 0; dstData[di + 3] = 0;
        continue;
      }

      const ix = Math.floor(sx);
      const iy = Math.floor(sy);
      const fx = sx - ix;
      const fy = sy - iy;
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

  const warped = document.createElement('canvas');
  warped.width = Math.ceil(dstW);
  warped.height = Math.ceil(dstH);
  const wctx = warped.getContext('2d')!;
  wctx.putImageData(dstImgData, 0, 0);

  ctx.save();
  if (options?.blendMode && options.blendMode !== 'normal') {
    ctx.globalCompositeOperation = options.blendMode;
  }
  ctx.drawImage(warped, minX, minY, dstW, dstH);
  ctx.restore();
}

// ── Shadow (3 cascading layers) ──
export function renderShadow(
  ctx: CanvasRenderingContext2D,
  corners: CornerPoints,
  shadow: { angle: number; distance: number; blur: number; opacity: number; color: string },
  canvasW: number,
  canvasH: number,
) {
  const cx = ((corners.tl.x + corners.tr.x + corners.bl.x + corners.br.x) / 4) * canvasW;
  const cy = ((corners.tl.y + corners.tr.y + corners.bl.y + corners.br.y) / 4) * canvasH;
  const angleRad = shadow.angle * Math.PI / 180;
  const sw = (corners.tr.x - corners.tl.x + corners.br.x - corners.bl.x) / 2 * canvasW;
  const sh = (corners.bl.y - corners.tl.y + corners.br.y - corners.tr.y) / 2 * canvasH;

  ctx.save();
  for (let i = 0; i < 3; i++) {
    const o = shadow.opacity * (1 - i * 0.32);
    const blr = shadow.blur * (1 + i * 0.6);
    const dist = shadow.distance * (1 + i * 0.5);
    const lx = Math.cos(angleRad) * dist * (canvasW / 100);
    const ly = Math.sin(angleRad) * dist * (canvasH / 100);
    ctx.shadowColor = `rgba(0,0,0,${o})`;
    ctx.shadowBlur = blr;
    ctx.shadowOffsetX = lx;
    ctx.shadowOffsetY = ly;
    ctx.fillStyle = `rgba(0,0,0,${0.01})`;
    ctx.fillRect(cx - sw / 2 + lx, cy - sh / 2 + ly, sw, sh);
  }
  ctx.restore();
}

// ── Vignette ──
export function renderVignette(ctx: CanvasRenderingContext2D, w: number, h: number, strength = 0.22) {
  const g = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.82);
  g.addColorStop(0, 'transparent');
  g.addColorStop(1, `rgba(0,0,0,${strength})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

// ── Texture overlay ──
export function renderTextureOverlay(ctx: CanvasRenderingContext2D, w: number, h: number, type: string, opacity: number) {
  const tc = document.createElement('canvas');
  tc.width = w;
  tc.height = h;
  const tctx = tc.getContext('2d')!;
  const imgData = tctx.createImageData(w, h);
  for (let i = 0; i < imgData.data.length; i += 4) {
    let val = 0;
    if (type === 'paper') val = Math.random() * 40;
    else if (type === 'fabric') val = (Math.random() * 30 + Math.sin((i / 4) % 4) * 10);
    else if (type === 'ceramic') val = Math.random() * 15;
    else if (type === 'vinyl') val = Math.random() * 10;
    else val = Math.random() * 50;
    imgData.data[i] = val;
    imgData.data[i + 1] = val;
    imgData.data[i + 2] = val;
    imgData.data[i + 3] = opacity * 255;
  }
  tctx.putImageData(imgData, 0, 0);
  ctx.globalCompositeOperation = 'multiply';
  ctx.drawImage(tc, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
}
