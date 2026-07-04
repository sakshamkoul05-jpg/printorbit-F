/**
 * Cylinder projection — maps artwork onto a cylindrical surface.
 * Used for mugs, bottles, glasses, and other curved products.
 * 
 * The cylinder is defined by center, radius, and angular range.
 * Artwork is wrapped around the cylinder surface using ray-casting.
 */

export interface CylinderParams {
  centerX: number;   // center X in output canvas (px)
  centerY: number;   // center Y in output canvas (px)
  radius: number;    // cylinder radius in output canvas (px)
  angleStart: number; // start angle in radians
  angleEnd: number;   // end angle in radians
  height: number;     // visible height in output canvas (px)
}

/**
 * Project artwork onto a cylinder surface.
 * 
 * @param src Source artwork ImageData
 * @param params Cylinder parameters
 * @param outWidth Output canvas width
 * @param outHeight Output canvas height
 * @returns Rendered ImageData with cylindrical projection
 */
export function projectCylinder(
  src: ImageData,
  params: CylinderParams,
  outWidth: number,
  outHeight: number,
): ImageData {
  const out = new ImageData(outWidth, outHeight);
  const srcData = src.data;
  const srcW = src.width;
  const srcH = src.height;
  const outData = out.data;

  const { centerX, centerY, radius, angleStart, angleEnd, height } = params;
  const angleRange = angleEnd - angleStart;
  const circumference = radius * angleRange;

  // For each output pixel, cast ray and find intersection with cylinder
  for (let y = 0; y < outHeight; y++) {
    for (let x = 0; x < outWidth; x++) {
      const dstIdx = (y * outWidth + x) * 4;

      // Vector from center to pixel
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if this pixel is on the cylinder surface (within margin)
      const margin = 0.5;
      if (Math.abs(dist - radius) > margin) {
        // Not on cylinder surface — transparent
        outData[dstIdx] = 0;
        outData[dstIdx + 1] = 0;
        outData[dstIdx + 2] = 0;
        outData[dstIdx + 3] = 0;
        continue;
      }

      // Compute angle of this pixel relative to center
      let angle = Math.atan2(dy, dx);
      // Normalize to [angleStart, angleEnd]
      while (angle < angleStart) angle += Math.PI * 2;
      while (angle > angleEnd) angle -= Math.PI * 2;

      if (angle < angleStart || angle > angleEnd) {
        outData[dstIdx] = 0;
        outData[dstIdx + 1] = 0;
        outData[dstIdx + 2] = 0;
        outData[dstIdx + 3] = 0;
        continue;
      }

      // Map to artwork UV coordinates
      const u = (angle - angleStart) / angleRange;
      const v = y / height;

      // Sample artwork
      const sx = u * srcW;
      const sy = v * srcH;

      const ix = Math.round(Math.max(0, Math.min(srcW - 1, sx)));
      const iy = Math.round(Math.max(0, Math.min(srcH - 1, sy)));

      const srcIdx = (iy * srcW + ix) * 4;
      outData[dstIdx] = srcData[srcIdx];
      outData[dstIdx + 1] = srcData[srcIdx + 1];
      outData[dstIdx + 2] = srcData[srcIdx + 2];
      outData[dstIdx + 3] = srcData[srcIdx + 3];
    }
  }

  return out;
}

/**
 * Apply curvature distortion to simulate a curved surface.
 * This is a simpler alternative to full cylinder projection.
 * Used when we just need a curved appearance without true 3D projection.
 * 
 * @param src Source ImageData
 * @param curvature Amount of curvature (-1 to 1, positive = convex, negative = concave)
 * @returns Distorted ImageData
 */
export function applyCurvature(
  src: ImageData,
  curvature: number,
): ImageData {
  const w = src.width;
  const h = src.height;
  const out = new ImageData(w, h);
  const srcData = src.data;
  const outData = out.data;

  const maxShift = w * Math.abs(curvature) * 0.15;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dstIdx = (y * w + x) * 4;

      // Normalized X position (-1 to 1)
      const nx = (x / w) * 2 - 1;
      // Parabolic shift
      const shift = maxShift * (1 - nx * nx) * Math.sign(curvature);

      const srcX = x + shift;
      const srcY = y;

      if (srcX < 0 || srcX >= w) {
        outData[dstIdx] = 0;
        outData[dstIdx + 1] = 0;
        outData[dstIdx + 2] = 0;
        outData[dstIdx + 3] = 0;
        continue;
      }

      const ix = Math.round(srcX);
      const srcIdx = (y * w + ix) * 4;
      outData[dstIdx] = srcData[srcIdx];
      outData[dstIdx + 1] = srcData[srcIdx + 1];
      outData[dstIdx + 2] = srcData[srcIdx + 2];
      outData[dstIdx + 3] = srcData[srcIdx + 3];
    }
  }

  return out;
}
