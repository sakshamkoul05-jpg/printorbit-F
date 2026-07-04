/**
 * Mesh warp — grid-based deformation using bilinear interpolation
 * between control points. Used for fabric folds, paper creases, etc.
 */

import type { MeshGrid, Point2D } from '../types';

/**
 * Deform an ImageData using a mesh warp.
 * Each quad of the source mesh is warped to the corresponding quad of the destination mesh.
 */
export function warpMesh(
  src: ImageData,
  srcMesh: MeshGrid,
  dstMesh: MeshGrid,
  outWidth: number,
  outHeight: number,
): ImageData {
  const out = new ImageData(outWidth, outHeight);
  const srcData = src.data;
  const srcW = src.width;
  const srcH = src.height;
  const outData = out.data;

  if (srcMesh.rows !== dstMesh.rows || srcMesh.cols !== dstMesh.cols) {
    throw new Error('Source and destination meshes must have same dimensions');
  }

  const rows = srcMesh.rows;
  const cols = srcMesh.cols;

  // For each output pixel, find which dst quad it falls in, then map to src quad
  for (let y = 0; y < outHeight; y++) {
    for (let x = 0; x < outWidth; x++) {
      const dstIdx = (y * outWidth + x) * 4;

      // Find containing quad in dst mesh
      let found = false;
      let srcX = 0, srcY = 0;

      for (let r = 0; r < rows - 1 && !found; r++) {
        for (let c = 0; c < cols - 1 && !found; c++) {
          const d00 = dstMesh.points[r][c];
          const d10 = dstMesh.points[r][c + 1];
          const d01 = dstMesh.points[r + 1][c];
          const d11 = dstMesh.points[r + 1][c + 1];

          if (pointInQuad(x, y, d00, d10, d01, d11)) {
            // Compute bilinear coordinates within the dst quad
            const u = bilinearCoordX(x, y, d00, d10, d01, d11);
            const v = bilinearCoordY(x, y, d00, d10, d01, d11);

            // Map to src quad
            const s00 = srcMesh.points[r][c];
            const s10 = srcMesh.points[r][c + 1];
            const s01 = srcMesh.points[r + 1][c];
            const s11 = srcMesh.points[r + 1][c + 1];

            // Bilinear interpolation in src quad
            srcX = lerp(lerp(s00.x, s10.x, u), lerp(s01.x, s11.x, u), v);
            srcY = lerp(lerp(s00.y, s10.y, u), lerp(s01.y, s11.y, u), v);
            found = true;
          }
        }
      }

      if (!found) {
        // Direct mapping (no deformation)
        srcX = x;
        srcY = y;
      }

      // Sample
      const sx = Math.round(srcX);
      const sy = Math.round(srcY);
      if (sx >= 0 && sx < srcW && sy >= 0 && sy < srcH) {
        const srcIdx = (sy * srcW + sx) * 4;
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
 * Check if point (px, py) is inside the quad defined by four corners.
 * Uses the cross-product method (works for convex quads).
 */
function pointInQuad(px: number, py: number, a: Point2D, b: Point2D, c: Point2D, d: Point2D): boolean {
  const sign = (p1: Point2D, p2: Point2D, p3: Point2D) =>
    (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);

  const d1 = sign({ x: px, y: py }, a, b);
  const d2 = sign({ x: px, y: py }, b, c);
  const d3 = sign({ x: px, y: py }, c, d);
  const d4 = sign({ x: px, y: py }, d, a);

  const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0) || (d4 < 0);
  const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0) || (d4 > 0);

  return !(hasNeg && hasPos);
}

/**
 * Approximate u coordinate (0..1) within a quad using bilinear interpolation.
 */
function bilinearCoordX(px: number, py: number, a: Point2D, b: Point2D, c: Point2D, d: Point2D): number {
  // Simple Newton iteration to solve for u,v in the bilinear equation
  let u = 0.5, v = 0.5;
  for (let iter = 0; iter < 20; iter++) {
    const x = lerp(lerp(a.x, b.x, u), lerp(c.x, d.x, u), v);
    const dxdu = lerp(-a.x + b.x, -c.x + d.x, v);
    const dxdv = lerp(lerp(a.x, b.x, u), -lerp(c.x, d.x, u), 1) + lerp(c.x, d.x, u);
    const err = x - px;
    if (Math.abs(err) < 0.001) break;
    const denom = dxdu + dxdv;
    if (Math.abs(denom) < 1e-10) break;
    u -= err / denom * 0.5;
    v -= err / denom * 0.5;
    u = Math.max(0, Math.min(1, u));
    v = Math.max(0, Math.min(1, v));
  }
  return u;
}

function bilinearCoordY(px: number, py: number, a: Point2D, b: Point2D, c: Point2D, d: Point2D): number {
  let u = 0.5, v = 0.5;
  for (let iter = 0; iter < 20; iter++) {
    const y = lerp(lerp(a.y, b.y, u), lerp(c.y, d.y, u), v);
    const dydu = lerp(-a.y + b.y, -c.y + d.y, v);
    const dydv = lerp(lerp(a.y, b.y, u), -lerp(c.y, d.y, u), 1) + lerp(c.y, d.y, u);
    const err = y - py;
    if (Math.abs(err) < 0.001) break;
    const denom = dydu + dydv;
    if (Math.abs(denom) < 1e-10) break;
    u -= err / denom * 0.5;
    v -= err / denom * 0.5;
    u = Math.max(0, Math.min(1, u));
    v = Math.max(0, Math.min(1, v));
  }
  return v;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
