/**
 * Homography (perspective transform) engine.
 * Computes 3×3 homography matrix from 4 point correspondences
 * and warps images using bilinear or bicubic sampling.
 */

export interface Mat3 {
  data: Float64Array; // 9 elements, row-major
}

// ── Matrix utilities ──
export function mat3Identity(): Mat3 {
  const d = new Float64Array(9) as Float64Array;
  d[0] = 1; d[4] = 1; d[8] = 1;
  return { data: d };
}

export function mat3Copy(m: Mat3): Mat3 {
  return { data: new Float64Array(m.data) as Float64Array };
}

export function mat3Mul(a: Mat3, b: Mat3): Mat3 {
  const d = new Float64Array(9) as Float64Array;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      d[r * 3 + c] =
        a.data[r * 3] * b.data[c] +
        a.data[r * 3 + 1] * b.data[3 + c] +
        a.data[r * 3 + 2] * b.data[6 + c];
    }
  }
  return { data: d };
}

export function mat3Transform(m: Mat3, x: number, y: number): { x: number; y: number } {
  const w = m.data[6] * x + m.data[7] * y + m.data[8];
  if (Math.abs(w) < 1e-10) return { x, y };
  return {
    x: (m.data[0] * x + m.data[1] * y + m.data[2]) / w,
    y: (m.data[3] * x + m.data[4] * y + m.data[5]) / w,
  };
}

/**
 * Compute homography matrix from 4 source → destination point pairs.
 * Uses the Direct Linear Transform (DLT) method.
 * 
 * src = [{x,y}, {x,y}, {x,y}, {x,y}] in artwork space
 * dst = [{x,y}, {x,y}, {x,y}, {x,y}] in canvas space (printable area corners)
 */
export function computeHomography(
  src: [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }, { x: number; y: number }],
  dst: [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }, { x: number; y: number }],
): Mat3 {
  // Build 8×9 linear system Ah = 0 using DLT
  const A = new Float64Array(8 * 9);

  for (let i = 0; i < 4; i++) {
    const sx = src[i].x, sy = src[i].y;
    const dx = dst[i].x, dy = dst[i].y;
    const row1 = i * 2;
    const row2 = i * 2 + 1;

    // First row: [ -sx, -sy, -1, 0, 0, 0, dx*sx, dx*sy, dx ]
    A[row1 * 9 + 0] = -sx;
    A[row1 * 9 + 1] = -sy;
    A[row1 * 9 + 2] = -1;
    A[row1 * 9 + 3] = 0;
    A[row1 * 9 + 4] = 0;
    A[row1 * 9 + 5] = 0;
    A[row1 * 9 + 6] = dx * sx;
    A[row1 * 9 + 7] = dx * sy;
    A[row1 * 9 + 8] = dx;

    // Second row: [ 0, 0, 0, -sx, -sy, -1, dy*sx, dy*sy, dy ]
    A[row2 * 9 + 0] = 0;
    A[row2 * 9 + 1] = 0;
    A[row2 * 9 + 2] = 0;
    A[row2 * 9 + 3] = -sx;
    A[row2 * 9 + 4] = -sy;
    A[row2 * 9 + 5] = -1;
    A[row2 * 9 + 6] = dy * sx;
    A[row2 * 9 + 7] = dy * sy;
    A[row2 * 9 + 8] = dy;
  }

  // Solve via SVD (simplified: use smallest singular vector from eigen of AᵀA)
  const h = solveDLT(A);
  return { data: h };
}

/**
 * Solve the DLT system using the eigenvector of AᵀA for the smallest eigenvalue.
 * This is a simplified SVD for the 9×9 case.
 */
function solveDLT(A: Float64Array): Float64Array {
  // Compute AᵀA (9×9)
  const ATA = new Float64Array(81) as Float64Array;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        sum += A[i * 9 + r] * A[i * 9 + c];
      }
      ATA[r * 9 + c] = sum;
    }
  }

  // Power iteration to find eigenvector for smallest eigenvalue
  // (inverse iteration on ATA shifted by small epsilon)
  let v = new Float64Array([1, 1, 1, 1, 1, 1, 1, 1, 1]) as Float64Array;
  const eps = 1e-10;

  for (let iter = 0; iter < 100; iter++) {
    // Solve (ATA + eps*I) v_new = v
    const vNew = solveLinearSystem(ATA, v, eps);
    const norm = Math.sqrt(vNew.reduce((s, x) => s + x * x, 0));
    if (norm < 1e-15) break;
    for (let i = 0; i < 9; i++) vNew[i] /= norm;

    // Check convergence
    let diff = 0;
    for (let i = 0; i < 9; i++) diff += Math.abs(vNew[i] - v[i]);
    v = new Float64Array(vNew) as Float64Array;
    if (diff < 1e-12) break;
  }

  return v;
}

/**
 * Solve (A + λI)x = b using Gaussian elimination with partial pivoting.
 * A is 9×9, λ is regularization.
 */
function solveLinearSystem(A: Float64Array, b: Float64Array, lambda: number): Float64Array {
  const n = 9;
  const aug = new Float64Array(n * (n + 1)) as Float64Array;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      aug[r * (n + 1) + c] = A[r * n + c];
    }
    aug[r * (n + 1) + n] = b[r];
    aug[r * (n + 1) + r] += lambda; // regularization
  }

  // Forward elimination with partial pivoting
  for (let col = 0; col < n; col++) {
    // Find pivot
    let maxVal = Math.abs(aug[col * (n + 1) + col]);
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      const val = Math.abs(aug[row * (n + 1) + col]);
      if (val > maxVal) { maxVal = val; maxRow = row; }
    }

    // Swap
    if (maxRow !== col) {
      for (let c = col; c <= n; c++) {
        const tmp = aug[col * (n + 1) + c];
        aug[col * (n + 1) + c] = aug[maxRow * (n + 1) + c];
        aug[maxRow * (n + 1) + c] = tmp;
      }
    }

    // Eliminate below
    const pivot = aug[col * (n + 1) + col];
    if (Math.abs(pivot) < 1e-15) continue;
    for (let row = col + 1; row < n; row++) {
      const factor = aug[row * (n + 1) + col] / pivot;
      for (let c = col; c <= n; c++) {
        aug[row * (n + 1) + c] -= factor * aug[col * (n + 1) + c];
      }
    }
  }

  // Back substitution
  const x = new Float64Array(n) as Float64Array;
  for (let r = n - 1; r >= 0; r--) {
    let sum = aug[r * (n + 1) + n];
    for (let c = r + 1; c < n; c++) {
      sum -= aug[r * (n + 1) + c] * x[c];
    }
    const diag = aug[r * (n + 1) + r];
    x[r] = Math.abs(diag) > 1e-15 ? sum / diag : 0;
  }

  return x;
}

// ── Sampling ──

/**
 * Bilinear sample at sub-pixel (x, y) from ImageData.
 * Returns [r, g, b, a] clamped 0-255.
 */
export function sampleBilinear(data: Uint8ClampedArray, width: number, height: number, x: number, y: number): [number, number, number, number] {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;

  const clamped = (v: number, max: number) => Math.max(0, Math.min(max - 1, v));

  const x0 = clamped(ix, width);
  const x1 = clamped(ix + 1, width);
  const y0 = clamped(iy, height);
  const y1 = clamped(iy + 1, height);

  const idx00 = (y0 * width + x0) * 4;
  const idx10 = (y0 * width + x1) * 4;
  const idx01 = (y1 * width + x0) * 4;
  const idx11 = (y1 * width + x1) * 4;

  const result: [number, number, number, number] = [0, 0, 0, 0];
  for (let c = 0; c < 4; c++) {
    const v00 = data[idx00 + c];
    const v10 = data[idx10 + c];
    const v01 = data[idx01 + c];
    const v11 = data[idx11 + c];

    const v0 = v00 * (1 - fx) + v10 * fx;
    const v1 = v01 * (1 - fx) + v11 * fx;
    result[c] = v0 * (1 - fy) + v1 * fy;
  }

  return result;
}

/**
 * Bicubic sample at sub-pixel (x, y) from ImageData.
 * Higher quality, slower.
 */
function cubicBSpline(t: number): number {
  const at = Math.abs(t);
  const at2 = at * at;
  const at3 = at2 * at;
  if (at < 1) return 1.5 * at3 - 2.5 * at2 + 1;
  if (at < 2) return -0.5 * at3 + 2.5 * at2 - 4 * at + 2;
  return 0;
}

export function sampleBicubic(data: Uint8ClampedArray, width: number, height: number, x: number, y: number): [number, number, number, number] {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;

  const result: [number, number, number, number] = [0, 0, 0, 0];

  for (let c = 0; c < 4; c++) {
    let sum = 0;
    let norm = 0;
    for (let dy = -1; dy <= 2; dy++) {
      for (let dx = -1; dx <= 2; dx++) {
        const px = Math.max(0, Math.min(width - 1, ix + dx));
        const py = Math.max(0, Math.min(height - 1, iy + dy));
        const w = cubicBSpline(dx - fx) * cubicBSpline(dy - fy);
        sum += data[(py * width + px) * 4 + c] * w;
        norm += w;
      }
    }
    result[c] = norm > 0 ? sum / norm : 0;
  }

  return result;
}

// ── Main warp function ──

export interface WarpOptions {
  sampling?: 'bilinear' | 'bicubic';
  edgeBehavior?: 'transparent' | 'clamp' | 'wrap';
}

/**
 * Warp an ImageData using a homography matrix.
 * The homography maps from destination (output) to source (artwork).
 * 
 * @param src Source image data (artwork)
 * @param H Homography matrix (destination → source)
 * @param outWidth Output width in pixels
 * @param outHeight Output height in pixels
 * @param options Sampling and edge behavior options
 * @returns Warped ImageData
 */
export function warpPerspective(
  src: ImageData,
  H: Mat3,
  outWidth: number,
  outHeight: number,
  options: WarpOptions = {},
): ImageData {
  const isBicubic = options.sampling === 'bicubic';
  const sample = isBicubic ? sampleBicubic : sampleBilinear;

  const out = new ImageData(outWidth, outHeight);
  const srcData = src.data;
  const srcW = src.width;
  const srcH = src.height;
  const outData = out.data;

  const edgeClamp = options.edgeBehavior === 'clamp';

  for (let y = 0; y < outHeight; y++) {
    for (let x = 0; x < outWidth; x++) {
      const dstIdx = (y * outWidth + x) * 4;

      // Map destination pixel to source
      const sp = mat3Transform(H, x, y);

      // Edge handling
      if (sp.x < 0 || sp.x >= srcW || sp.y < 0 || sp.y >= srcH) {
        if (edgeClamp) {
          sp.x = Math.max(0, Math.min(srcW - 1, sp.x));
          sp.y = Math.max(0, Math.min(srcH - 1, sp.y));
        } else {
          outData[dstIdx] = 0;
          outData[dstIdx + 1] = 0;
          outData[dstIdx + 2] = 0;
          outData[dstIdx + 3] = 0;
          continue;
        }
      }

      const [r, g, b, a] = sample(srcData, srcW, srcH, sp.x, sp.y);
      outData[dstIdx] = r;
      outData[dstIdx + 1] = g;
      outData[dstIdx + 2] = b;
      outData[dstIdx + 3] = a;
    }
  }

  return out;
}

/**
 * Compute the inverse of a 3×3 homography matrix.
 */
export function invertHomography(H: Mat3): Mat3 | null {
  const m = H.data;
  const det =
    m[0] * (m[4] * m[8] - m[5] * m[7]) -
    m[1] * (m[3] * m[8] - m[5] * m[6]) +
    m[2] * (m[3] * m[7] - m[4] * m[6]);

  if (Math.abs(det) < 1e-15) return null;

  const invDet = 1 / det;
  const inv = new Float64Array(9) as Float64Array;

  inv[0] = (m[4] * m[8] - m[5] * m[7]) * invDet;
  inv[1] = (m[2] * m[7] - m[1] * m[8]) * invDet;
  inv[2] = (m[1] * m[5] - m[2] * m[4]) * invDet;
  inv[3] = (m[5] * m[6] - m[3] * m[8]) * invDet;
  inv[4] = (m[0] * m[8] - m[2] * m[6]) * invDet;
  inv[5] = (m[2] * m[3] - m[0] * m[5]) * invDet;
  inv[6] = (m[3] * m[7] - m[4] * m[6]) * invDet;
  inv[7] = (m[2] * m[6] - m[0] * m[7]) * invDet;
  inv[8] = (m[0] * m[4] - m[1] * m[3]) * invDet;

  return { data: inv };
}
