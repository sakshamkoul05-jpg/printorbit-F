/**
 * Displacement mapping — distorts an image using a height map.
 * Each pixel is shifted based on the gradient of the displacement map.
 * Used for fabric wrinkles, paper texture, surface irregularities.
 */

export interface DisplacementOptions {
  strength: number;    // displacement strength in pixels (0 = no displacement)
  scale: number;       // scale factor for the displacement map sampling
  wrap: boolean;       // wrap edges (vs. transparent)
}

/**
 * Apply displacement mapping to an ImageData.
 * 
 * @param src Source ImageData to distort
 * @param dispMap Displacement map (grayscale, height values)
 * @param options Displacement parameters
 * @returns Displaced ImageData
 */
export function applyDisplacement(
  src: ImageData,
  dispMap: ImageData,
  options: DisplacementOptions,
): ImageData {
  const w = src.width;
  const h = src.height;
  const out = new ImageData(w, h);
  const srcData = src.data;
  const outData = out.data;
  const dispData = dispMap.data;
  const dispW = dispMap.width;
  const dispH = dispMap.height;

  const { strength, scale } = options;

  // Pre-compute displacement offsets using Sobel gradient of height map
  const offsetsX = new Float32Array(w * h);
  const offsetsY = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Sample displacement map at scaled coordinates
      const sx = (x / w) * dispW * scale;
      const sy = (y / h) * dispH * scale;

      // Sobel gradient
      const gx = sobelX(dispData, dispW, dispH, sx, sy);
      const gy = sobelY(dispData, dispW, dispH, sx, sy);

      const idx = y * w + x;
      offsetsX[idx] = gx * strength;
      offsetsY[idx] = gy * strength;
    }
  }

  // Apply displacement (reverse mapping for quality)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dstIdx = (y * w + x) * 4;
      const idx = y * w + x;

      const srcX = x + offsetsX[idx];
      const srcY = y + offsetsY[idx];

      // Bilinear sample at source position
      if (srcX >= 0 && srcX < w - 1 && srcY >= 0 && srcY < h - 1) {
        const ix = Math.floor(srcX);
        const iy = Math.floor(srcY);
        const fx = srcX - ix;
        const fy = srcY - iy;

        const idx00 = (iy * w + ix) * 4;
        const idx10 = (iy * w + Math.min(ix + 1, w - 1)) * 4;
        const idx01 = (Math.min(iy + 1, h - 1) * w + ix) * 4;
        const idx11 = (Math.min(iy + 1, h - 1) * w + Math.min(ix + 1, w - 1)) * 4;

        for (let c = 0; c < 4; c++) {
          const v00 = srcData[idx00 + c];
          const v10 = srcData[idx10 + c];
          const v01 = srcData[idx01 + c];
          const v11 = srcData[idx11 + c];
          outData[dstIdx + c] =
            (v00 * (1 - fx) + v10 * fx) * (1 - fy) +
            (v01 * (1 - fx) + v11 * fx) * fy;
        }
      } else if (options.wrap) {
        const wx = ((x % w) + w) % w;
        const wy = ((y % h) + h) % h;
        const srcIdx = (wy * w + wx) * 4;
        outData[dstIdx] = srcData[srcIdx];
        outData[dstIdx + 1] = srcData[srcIdx + 1];
        outData[dstIdx + 2] = srcData[srcIdx + 2];
        outData[dstIdx + 3] = srcData[srcIdx + 3];
      } else {
        outData[dstIdx] = 0;
        outData[dstIdx + 1] = 0;
        outData[dstIdx + 2] = 0;
        outData[dstIdx + 3] = 0;
      }
    }
  }

  return out;
}

/**
 * Sobel gradient in X at sub-pixel position (sx, sy) in the displacement map.
 */
function sobelX(data: Uint8ClampedArray, w: number, h: number, sx: number, sy: number): number {
  const ix = Math.floor(sx);
  const iy = Math.floor(sy);
  if (ix < 1 || ix >= w - 1 || iy < 1 || iy >= h - 1) return 0;

  const kernel = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  let sum = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const val = data[((iy + dy) * w + (ix + dx)) * 4]; // R channel (grayscale)
      sum += val * kernel[(dy + 1) * 3 + (dx + 1)];
    }
  }
  return sum / 255;
}

/**
 * Sobel gradient in Y at sub-pixel position.
 */
function sobelY(data: Uint8ClampedArray, w: number, h: number, sx: number, sy: number): number {
  const ix = Math.floor(sx);
  const iy = Math.floor(sy);
  if (ix < 1 || ix >= w - 1 || iy < 1 || iy >= h - 1) return 0;

  const kernel = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
  let sum = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const val = data[((iy + dy) * w + (ix + dx)) * 4];
      sum += val * kernel[(dy + 1) * 3 + (dx + 1)];
    }
  }
  return sum / 255;
}
