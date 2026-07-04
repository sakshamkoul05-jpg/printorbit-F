/**
 * Compositor — applies blend modes, shadows, highlights, reflections.
 * All operations are per-pixel on ImageData.
 */

import type { BlendMode } from '../types';

/**
 * Composite two ImageData layers using the specified blend mode.
 * Overwrites dst with the result.
 */
export function compositeBlend(
  dst: ImageData,
  src: ImageData,
  mode: BlendMode,
  opacity: number = 1,
): void {
  const dw = dst.width, dh = dst.height;
  const dd = dst.data, sd = src.data;
  const len = dw * dh * 4;

  for (let i = 0; i < len; i += 4) {
    const sr = sd[i], sg = sd[i + 1], sb = sd[i + 2], sa = sd[i + 3] / 255;
    const dr = dd[i], dg = dd[i + 1], db = dd[i + 2], da = dd[i + 3] / 255;

    const a = sa * opacity;
    if (a < 0.001) continue;

    let br = dr, bg = dg, bb = db;
    const nr = sr / 255, ng = sg / 255, nb = sb / 255;
    const pr = dr / 255, pg = dg / 255, pb = db / 255;

    switch (mode) {
      case 'multiply': {
        br = dr * sr / 255;
        bg = dg * sg / 255;
        bb = db * sb / 255;
        break;
      }
      case 'screen': {
        br = 255 - ((255 - dr) * (255 - sr)) / 255;
        bg = 255 - ((255 - dg) * (255 - sg)) / 255;
        bb = 255 - ((255 - db) * (255 - sb)) / 255;
        break;
      }
      case 'overlay': {
        br = dr < 128 ? (2 * nr * pr) * 255 : (1 - 2 * (1 - nr) * (1 - pr)) * 255;
        bg = dg < 128 ? (2 * ng * pg) * 255 : (1 - 2 * (1 - ng) * (1 - pg)) * 255;
        bb = db < 128 ? (2 * nb * pb) * 255 : (1 - 2 * (1 - nb) * (1 - pb)) * 255;
        break;
      }
      case 'soft-light': {
        br = (1 - 2 * nr) * dr * dr / 255 + 2 * nr * dr;
        bg = (1 - 2 * ng) * dg * dg / 255 + 2 * ng * dg;
        bb = (1 - 2 * nb) * db * db / 255 + 2 * nb * db;
        break;
      }
      case 'hard-light': {
        br = sr < 128 ? (2 * nr * pr) * 255 : (1 - 2 * (1 - nr) * (1 - pr)) * 255;
        bg = sg < 128 ? (2 * ng * pg) * 255 : (1 - 2 * (1 - ng) * (1 - pg)) * 255;
        bb = sb < 128 ? (2 * nb * pb) * 255 : (1 - 2 * (1 - nb) * (1 - pb)) * 255;
        break;
      }
      case 'darken': {
        br = Math.min(dr, sr);
        bg = Math.min(dg, sg);
        bb = Math.min(db, sb);
        break;
      }
      case 'lighten': {
        br = Math.max(dr, sr);
        bg = Math.max(dg, sg);
        bb = Math.max(db, sb);
        break;
      }
      case 'color-dodge': {
        br = sr === 255 ? 255 : Math.min(255, dr * 255 / (255 - sr));
        bg = sg === 255 ? 255 : Math.min(255, dg * 255 / (255 - sg));
        bb = sb === 255 ? 255 : Math.min(255, db * 255 / (255 - sb));
        break;
      }
      case 'color-burn': {
        br = sr === 0 ? 0 : Math.max(0, 255 - (255 - dr) * 255 / sr);
        bg = sg === 0 ? 0 : Math.max(0, 255 - (255 - dg) * 255 / sg);
        bb = sb === 0 ? 0 : Math.max(0, 255 - (255 - db) * 255 / sb);
        break;
      }
      case 'difference': {
        br = Math.abs(dr - sr);
        bg = Math.abs(dg - sg);
        bb = Math.abs(db - sb);
        break;
      }
      case 'exclusion': {
        br = dr + sr - (dr * sr / 128);
        bg = dg + sg - (dg * sg / 128);
        bb = db + sb - (db * sb / 128);
        break;
      }
      default: { // normal
        br = sr;
        bg = sg;
        bb = sb;
      }
    }

    // Alpha blend
    const outA = da + a * (1 - da);
    if (outA > 0) {
      dd[i] = clampByte((dr * da * (1 - a) + br * a) / outA);
      dd[i + 1] = clampByte((dg * da * (1 - a) + bg * a) / outA);
      dd[i + 2] = clampByte((db * da * (1 - a) + bb * a) / outA);
      dd[i + 3] = clampByte(outA * 255);
    }
  }
}

/**
 * Apply shadow map to an image.
 * Shadows layer is typically a grayscale image where white = full shadow.
 */
export function applyShadow(
  dst: ImageData,
  shadowMap: ImageData,
  opacity: number,
): void {
  const dd = dst.data;
  const sd = shadowMap.data;
  const len = dst.width * dst.height * 4;

  for (let i = 0; i < len; i += 4) {
    const shadow = sd[i] / 255 * opacity; // Use R channel
    if (shadow < 0.001) continue;
    dd[i] = clampByte(dd[i] * (1 - shadow));
    dd[i + 1] = clampByte(dd[i + 1] * (1 - shadow));
    dd[i + 2] = clampByte(dd[i + 2] * (1 - shadow));
  }
}

/**
 * Apply highlight map to an image.
 * Highlights layer is grayscale where white = full highlight.
 */
export function applyHighlight(
  dst: ImageData,
  highlightMap: ImageData,
  opacity: number,
): void {
  const dd = dst.data;
  const sd = highlightMap.data;
  const len = dst.width * dst.height * 4;

  for (let i = 0; i < len; i += 4) {
    const hl = sd[i] / 255 * opacity;
    if (hl < 0.001) continue;
    const factor = 1 + hl;
    dd[i] = clampByte(dd[i] * factor);
    dd[i + 1] = clampByte(dd[i + 1] * factor);
    dd[i + 2] = clampByte(dd[i + 2] * factor);
  }
}

/**
 * Apply reflection map to an image.
 * Reflection is typically a semi-transparent overlay with specular highlights.
 */
export function applyReflection(
  dst: ImageData,
  reflectionMap: ImageData,
  opacity: number,
): void {
  const dd = dst.data;
  const sd = reflectionMap.data;
  const len = dst.width * dst.height * 4;

  for (let i = 0; i < len; i += 4) {
    const refAlpha = sd[i + 3] / 255 * opacity;
    if (refAlpha < 0.001) continue;

    // Screen blend the reflection
    const r = 255 - ((255 - dd[i]) * (255 - sd[i])) / 255;
    const g = 255 - ((255 - dd[i + 1]) * (255 - sd[i + 1])) / 255;
    const b = 255 - ((255 - dd[i + 2]) * (255 - sd[i + 2])) / 255;

    // Alpha composite
    const invA = 1 - refAlpha;
    dd[i] = clampByte(dd[i] * invA + r * refAlpha);
    dd[i + 1] = clampByte(dd[i + 1] * invA + g * refAlpha);
    dd[i + 2] = clampByte(dd[i + 2] * invA + b * refAlpha);
  }
}

/**
 * Clip an image using an alpha mask.
 * Where mask alpha is 0, output pixel becomes transparent.
 */
export function applyMask(dst: ImageData, mask: ImageData): void {
  const dd = dst.data;
  const md = mask.data;
  const len = dst.width * dst.height * 4;

  for (let i = 0; i < len; i += 4) {
    const maskA = md[i + 3] / 255;
    if (maskA < 1) {
      dd[i + 3] = clampByte(dd[i + 3] * maskA);
    }
  }
}

function clampByte(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}
