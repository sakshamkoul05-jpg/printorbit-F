/**
 * Color adjustment pipeline.
 * Applies brightness, contrast, saturation, exposure, highlights, shadows,
 * whites, blacks, temperature, tint, vibrance, and tone curves.
 * All operations are per-pixel on ImageData in linear space.
 */

import type { ColorAdjustments } from '../types';

/**
 * Apply full color adjustment stack to an ImageData.
 */
export function applyColorAdjustments(
  dst: ImageData,
  adjustments: ColorAdjustments,
): void {
  const data = dst.data;
  const len = dst.width * dst.height * 4;

  // Pre-compute tone curve LUT if curves are provided
  const curveLUT = adjustments.curves.length > 0
    ? buildCurveLUT(adjustments.curves)
    : null;

  for (let i = 0; i < len; i += 4) {
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let b = data[i + 2] / 255;
    const a = data[i + 3] / 255;

    if (a < 0.001) continue;

    // Convert to linear space
    r = srgbToLinear(r);
    g = srgbToLinear(g);
    b = srgbToLinear(b);

    // Exposure (EV)
    if (adjustments.exposure !== 0) {
      const ev = Math.pow(2, adjustments.exposure);
      r *= ev; g *= ev; b *= ev;
    }

    // Temperature (white balance)
    if (adjustments.temperature !== 0) {
      const t = adjustments.temperature / 100;
      r *= 1 + t * 0.05;
      b *= 1 - t * 0.05;
    }

    // Tint
    if (adjustments.tint !== 0) {
      const t = adjustments.tint / 100;
      g *= 1 + t * 0.03;
      r *= 1 - t * 0.015;
      b *= 1 - t * 0.015;
    }

    // Contrast
    if (adjustments.contrast !== 1) {
      const pivot = 0.5;
      r = pivot + (r - pivot) * adjustments.contrast;
      g = pivot + (g - pivot) * adjustments.contrast;
      b = pivot + (b - pivot) * adjustments.contrast;
    }

    // Brightness
    if (adjustments.brightness !== 1) {
      r *= adjustments.brightness;
      g *= adjustments.brightness;
      b *= adjustments.brightness;
    }

    // Highlights & Shadows (using masked curves)
    if (adjustments.highlights !== 0) {
      const mask = gaussianMask(r, 0.7, 0.3); // highlight mask
      r += adjustments.highlights * mask * 0.3;
      g += adjustments.highlights * mask * 0.3;
      b += adjustments.highlights * mask * 0.3;
    }

    if (adjustments.shadows !== 0) {
      const mask = 1 - gaussianMask(r, 0.7, 0.3); // shadow mask
      r += adjustments.shadows * mask * 0.3;
      g += adjustments.shadows * mask * 0.3;
      b += adjustments.shadows * mask * 0.3;
    }

    // Whites & Blacks (clamp-based)
    if (adjustments.whites !== 0) {
      const boost = adjustments.whites * 0.2;
      r = Math.min(1, r + boost * r * r);
      g = Math.min(1, g + boost * g * g);
      b = Math.min(1, b + boost * b * b);
    }

    if (adjustments.blacks !== 0) {
      const cut = adjustments.blacks * 0.2;
      r = Math.max(0, r - cut * (1 - r) * (1 - r));
      g = Math.max(0, g - cut * (1 - g) * (1 - g));
      b = Math.max(0, b - cut * (1 - b) * (1 - b));
    }

    // Convert to linear sRGB for saturation
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Saturation
    if (adjustments.saturation !== 1) {
      r = luminance + (r - luminance) * adjustments.saturation;
      g = luminance + (g - luminance) * adjustments.saturation;
      b = luminance + (b - luminance) * adjustments.saturation;
    }

    // Vibrance (smart saturation — boosts less saturated colors more)
    if (adjustments.vibrance !== 0) {
      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const sat = maxC - minC;
      const vibranceMask = 1 - sat; // desaturated areas get more boost
      const vb = adjustments.vibrance * vibranceMask * 0.5;
      r = luminance + (r - luminance) * (1 + vb);
      g = luminance + (g - luminance) * (1 + vb);
      b = luminance + (b - luminance) * (1 + vb);
    }

    // Tone curve
    if (curveLUT) {
      r = curveLUT[Math.round(clamp(r) * 255)];
      g = curveLUT[Math.round(clamp(g) * 255)];
      b = curveLUT[Math.round(clamp(b) * 255)];
    } else {
      // Default contrast curve as fallback
      r = applyScurve(r);
      g = applyScurve(g);
      b = applyScurve(b);
    }

    // Clamp and convert back to gamma
    data[i] = clampByte(linearToSrgb(r) * 255);
    data[i + 1] = clampByte(linearToSrgb(g) * 255);
    data[i + 2] = clampByte(linearToSrgb(b) * 255);
    // Alpha unchanged
  }
}

/**
 * Build a 256-entry LUT from tone curve points.
 * Points are [[in, out], ...] with values 0..1.
 */
function buildCurveLUT(points: number[][]): Float32Array {
  const lut = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    const x = i / 255;
    lut[i] = interpolateCurve(points, x);
  }
  return lut;
}

function interpolateCurve(points: number[][], x: number): number {
  if (points.length === 0) return x;
  if (x <= points[0][0]) return points[0][1];
  if (x >= points[points.length - 1][0]) return points[points.length - 1][1];

  for (let i = 0; i < points.length - 1; i++) {
    if (x >= points[i][0] && x <= points[i + 1][0]) {
      const t = (x - points[i][0]) / (points[i + 1][0] - points[i][0]);
      // Cubic hermite interpolation
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      return hermiteInterp(p1[1], p2[1], (p2[1] - p0[1]) * 0.5, (p3[1] - p1[1]) * 0.5, t);
    }
  }
  return x;
}

function hermiteInterp(p0: number, p1: number, t0: number, t1: number, t: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * p0 + (t3 - 2 * t2 + t) * t0 + (-2 * t3 + 3 * t2) * p1 + (t3 - t2) * t1;
}

/**
 * sRGB gamma → linear
 */
function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Linear → sRGB gamma
 */
function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

/**
 * Subtle S-curve for contrast.
 */
function applyScurve(x: number): number {
  // Logistic function centered at 0.5
  return 1 / (1 + Math.exp(-8 * (x - 0.5)));
}

function gaussianMask(x: number, center: number, width: number): number {
  return Math.exp(-((x - center) ** 2) / (2 * width * width));
}

function clamp(x: number): number {
  return Math.max(0, Math.min(1, x));
}

function clampByte(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}
