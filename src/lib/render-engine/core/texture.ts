/**
 * Texture applicator — applies surface textures to rendered images.
 * Supports fabric, paper, canvas, leather, metal, glass, plastic, ceramic, wood.
 */

import type { SurfaceTexture } from '../types';

export interface TextureOptions {
  type: SurfaceTexture;
  strength: number;     // 0..1
  scale?: number;       // texture scale multiplier
}

/**
 * Apply surface texture overlay to an ImageData.
 * Textures are procedurally generated when no texture map is provided.
 * 
 * @param dst ImageData to modify in-place
 * @param options Texture type and strength
 * @param textureMap Optional pre-loaded texture ImageData
 */
export function applyTexture(
  dst: ImageData,
  options: TextureOptions,
  textureMap?: ImageData,
): void {
  if (textureMap) {
    applyTextureMap(dst, textureMap, options.strength);
  } else {
    applyProceduralTexture(dst, options);
  }
}

/**
 * Apply a pre-loaded texture map via overlay blending.
 */
function applyTextureMap(dst: ImageData, map: ImageData, strength: number): void {
  const dd = dst.data;
  const md = map.data;
  const len = dst.width * dst.height * 4;
  const mw = map.width, mh = map.height;

  for (let i = 0; i < len; i += 4) {
    const px = (i / 4) % dst.width;
    const py = Math.floor(i / 4 / dst.width);
    // Sample texture with tiling
    const tx = px % mw;
    const ty = py % mh;
    const mi = (ty * mw + tx) * 4;

    const texVal = md[mi] / 255; // Grayscale from R channel
    const alpha = texVal * strength;

    // Overlay blend
    const c = dd[i] / 255;
    const result = c < 0.5
      ? 2 * texVal * c
      : 1 - 2 * (1 - texVal) * (1 - c);

    dd[i] = clampByte(lerp(dd[i], result * 255, alpha));
    dd[i + 1] = clampByte(lerp(dd[i + 1], result * 255, alpha));
    dd[i + 2] = clampByte(lerp(dd[i + 2], result * 255, alpha));
  }
}

/**
 * Generate and apply procedural texture based on surface type.
 */
function applyProceduralTexture(dst: ImageData, options: TextureOptions): void {
  const { type, strength } = options;
  const dd = dst.data;
  const w = dst.width, h = dst.height;
  const len = w * h * 4;
  const scale = options.scale ?? 1;

  // Pre-compute noise or pattern
  const texture = generateTexturePattern(w, h, type, scale);

  for (let i = 0; i < len; i += 4) {
    const texVal = texture[i / 4];
    const alpha = texVal * strength;
    const c = dd[i] / 255;

    let result: number;
    if (type === 'fabric' || type === 'canvas') {
      // Bump texture: add subtle variation
      result = c + (texVal - 0.5) * strength * 0.15;
    } else if (type === 'metal' || type === 'glass') {
      // Specular texture: bright highlights
      result = c * (1 + texVal * strength * 0.3);
    } else {
      // Overlay blend
      result = c < 0.5
        ? 2 * texVal * c
        : 1 - 2 * (1 - texVal) * (1 - c);
    }

    dd[i] = clampByte(lerp(dd[i], result * 255, alpha));
    dd[i + 1] = clampByte(lerp(dd[i + 1], result * 255, alpha));
    dd[i + 2] = clampByte(lerp(dd[i + 2], result * 255, alpha));
  }
}

/**
 * Generate procedural texture pattern for a given surface type.
 * Returns Float32Array of normalized values (0..1) per pixel (not per channel).
 */
function generateTexturePattern(
  width: number,
  height: number,
  type: SurfaceTexture,
  scale: number,
): Float32Array {
  const len = width * height;
  const data = new Float32Array(len);
  const seed = hashSeed(type);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const nx = x / width * scale;
      const ny = y / height * scale;

      switch (type) {
        case 'fabric': {
          // Woven fabric pattern — alternating threads
          const threadX = Math.sin(nx * 60) * 0.5 + 0.5;
          const threadY = Math.sin(ny * 60) * 0.5 + 0.5;
          data[idx] = threadX * threadY * 0.3 + 0.7;
          // Add micro-randomness
          data[idx] += simpleNoise2D(nx * 200, ny * 200, seed) * 0.05;
          break;
        }
        case 'paper': {
          // Random fiber distribution
          data[idx] = 0.5 + simpleNoise2D(nx * 100, ny * 100, seed) * 0.15;
          break;
        }
        case 'canvas': {
          // Coarse woven texture
          const cx = Math.sin(nx * 40 + Math.sin(ny * 20) * 0.3) * 0.5 + 0.5;
          const cy = Math.sin(ny * 40 + Math.sin(nx * 20) * 0.3) * 0.5 + 0.5;
          data[idx] = cx * cy * 0.4 + 0.6;
          break;
        }
        case 'leather': {
          // Large grain with fine texture
          const large = simpleNoise2D(nx * 15, ny * 15, seed);
          const fine = simpleNoise2D(nx * 80, ny * 80, seed + 1);
          data[idx] = 0.5 + large * 0.2 + fine * 0.08;
          break;
        }
        case 'metal': {
          // Brushed metal
          const brush = Math.sin(ny * 500 + simpleNoise2D(nx * 50, ny * 5, seed) * 2) * 0.5 + 0.5;
          data[idx] = 0.4 + brush * 0.3 + simpleNoise2D(nx * 30, ny * 30, seed + 1) * 0.1;
          break;
        }
        case 'glass': {
          // Slight specular variation
          data[idx] = 0.8 + simpleNoise2D(nx * 50, ny * 50, seed) * 0.15;
          break;
        }
        case 'plastic': {
          // Smooth with faint grain
          data[idx] = 0.6 + simpleNoise2D(nx * 60, ny * 60, seed) * 0.1;
          break;
        }
        case 'ceramic': {
          // Speckled glaze pattern
          const speckle = Math.round(simpleNoise2D(nx * 100, ny * 100, seed) * 3) / 3;
          data[idx] = 0.5 + speckle * 0.12;
          break;
        }
        case 'wood': {
          // Wood grain rings
          const rings = Math.sin((nx * 20 + simpleNoise2D(nx * 10, ny * 5, seed) * 0.5) * Math.PI * 4);
          data[idx] = 0.3 + rings * 0.2 + simpleNoise2D(nx * 40, ny * 40, seed + 1) * 0.05;
          break;
        }
        default: {
          data[idx] = simpleNoise2D(nx * 50, ny * 50, seed) * 0.1 + 0.5;
        }
      }
    }
  }

  return data;
}

/**
 * Simple 2D noise using sine-based hash (fast, deterministic).
 */
function simpleNoise2D(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 0.314) * 43758.5453;
  return n - Math.floor(n);
}

function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clampByte(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}
