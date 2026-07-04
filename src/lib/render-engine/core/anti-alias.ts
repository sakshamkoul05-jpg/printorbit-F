/**
 * Anti-aliasing post-processor.
 * Implements a fast approximate anti-aliasing (FXAA-like) pass.
 */

export interface AASettings {
  enabled: boolean;
  quality: 'fast' | 'high';
  edgeThreshold: number;   // minimum edge contrast (0.01 - 0.5)
  edgeSearchSteps: number; // search steps for edge direction
}

export const DEFAULT_AA: AASettings = {
  enabled: true,
  quality: 'high',
  edgeThreshold: 0.08,
  edgeSearchSteps: 4,
};

/**
 * Apply anti-aliasing to an ImageData.
 * Uses a fast morphological edge detection and blending approach.
 */
export function applyAntiAlias(
  dst: ImageData,
  settings: AASettings = DEFAULT_AA,
): void {
  if (!settings.enabled) return;

  const w = dst.width;
  const h = dst.height;
  const data = dst.data;

  if (settings.quality === 'high') {
    applyAdaptiveAA(data, w, h, settings);
  } else {
    applyFastAA(data, w, h, settings);
  }
}

/**
 * Fast AA — simple edge blurring using luminance variance.
 */
function applyFastAA(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  settings: AASettings,
): void {
  const threshold = settings.edgeThreshold;
  const copy = new Uint8Array(data);

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;

      // Compute local luminance variance
      const l00 = luminanceAt(copy, w, x, y);
      const l10 = luminanceAt(copy, w, x + 1, y);
      const l01 = luminanceAt(copy, w, x, y + 1);
      const lm1 = luminanceAt(copy, w, x - 1, y);
      const l0m1 = luminanceAt(copy, w, x, y - 1);

      const dx = Math.abs(l10 - lm1);
      const dy = Math.abs(l01 - l0m1);

      if (dx > threshold || dy > threshold) {
        // Edge detected — blur along the edge
        const blend = Math.max(dx, dy);
        if (dx > dy) {
          // Horizontal edge — blend vertically
          for (let c = 0; c < 4; c++) {
            data[idx + c] = lerpByte(
              copy[idx + c],
              (copy[((y - 1) * w + x) * 4 + c] + copy[((y + 1) * w + x) * 4 + c]) / 2,
              blend * 2,
            );
          }
        } else {
          // Vertical edge — blend horizontally
          for (let c = 0; c < 4; c++) {
            data[idx + c] = lerpByte(
              copy[idx + c],
              (copy[(y * w + (x - 1)) * 4 + c] + copy[(y * w + (x + 1)) * 4 + c]) / 2,
              blend * 2,
            );
          }
        }
      }
    }
  }
}

/**
 * Adaptive AA — multi-directional edge detection with sub-pixel correction.
 */
function applyAdaptiveAA(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  settings: AASettings,
): void {
  const threshold = settings.edgeThreshold;
  const steps = settings.edgeSearchSteps;
  const copy = new Uint8Array(data);

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;

      // Edge detection using 3×3 Sobel
      const gx = sobelLuminanceX(copy, w, x, y);
      const gy = sobelLuminanceY(copy, w, x, y);
      const magnitude = Math.sqrt(gx * gx + gy * gy);

      if (magnitude < threshold) continue;

      // Edge direction
      const angle = Math.atan2(gy, gx);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Search along edge normal for pixel pairs
      let blend = 0;
      for (let s = 1; s <= steps; s++) {
        const nx1 = Math.round(x + cosA * s);
        const ny1 = Math.round(y + sinA * s);
        const nx2 = Math.round(x - cosA * s);
        const ny2 = Math.round(y - sinA * s);

        if (nx1 < 0 || nx1 >= w || ny1 < 0 || ny1 >= h) break;
        if (nx2 < 0 || nx2 >= w || ny2 < 0 || ny2 >= h) break;

        const l1 = luminanceAt(copy, w, nx1, ny1);
        const l2 = luminanceAt(copy, w, nx2, ny2);
        blend += Math.abs(l1 - l2) * 0.5;
      }
      blend = Math.min(1, blend / steps);

      if (blend > 0.01) {
        for (let c = 0; c < 4; c++) {
          const idx1 = (Math.round(y + sinA * 0.5) * w + Math.round(x + cosA * 0.5)) * 4 + c;
          const idx2 = (Math.round(y - sinA * 0.5) * w + Math.round(x - cosA * 0.5)) * 4 + c;
          data[idx + c] = lerpByte(
            copy[idx + c],
            (copy[idx1] + copy[idx2]) / 2,
            blend,
          );
        }
      }
    }
  }
}

function luminanceAt(data: Uint8Array, w: number, x: number, y: number): number {
  const i = (y * w + x) * 4;
  return (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722) / 255;
}

function sobelLuminanceX(data: Uint8Array, w: number, x: number, y: number): number {
  const kernel = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  let sum = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const l = luminanceAt(data, w, x + dx, y + dy);
      sum += l * kernel[(dy + 1) * 3 + (dx + 1)];
    }
  }
  return sum;
}

function sobelLuminanceY(data: Uint8Array, w: number, x: number, y: number): number {
  const kernel = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
  let sum = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const l = luminanceAt(data, w, x + dx, y + dy);
      sum += l * kernel[(dy + 1) * 3 + (dx + 1)];
    }
  }
  return sum;
}

function lerpByte(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * Math.max(0, Math.min(1, t)));
}
