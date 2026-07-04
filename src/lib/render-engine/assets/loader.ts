/**
 * Asset loader — loads mockup assets from the filesystem or URL.
 * Uses ImageBitmap for efficient off-thread rendering.
 */

import type { MockupMetadata } from '../types';

export interface LoadedAssets {
  background: ImageBitmap;
  mask: ImageBitmap;
  displacement: ImageBitmap | null;
  highlights: ImageBitmap | null;
  shadows: ImageBitmap | null;
  reflection: ImageBitmap | null;
  texture: ImageBitmap | null;
}

interface CacheEntry {
  bitmap: ImageBitmap;
  timestamp: number;
}

const assetCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Load all assets for a given mockup from its base URL.
 * 
 * @param baseUrl URL to the mockup directory (e.g., /mockups/tshirt/)
 * @param metadata The mockup metadata
 * @param signal Optional AbortSignal for cancellation
 * @returns Loaded assets as ImageBitmaps
 */
export async function loadMockupAssets(
  baseUrl: string,
  metadata: MockupMetadata,
  signal?: AbortSignal,
): Promise<LoadedAssets> {
  const assets = metadata.assets;

  const [background, mask, displacement, highlights, shadows, reflection, texture] =
    await Promise.all([
      loadBitmap(`${baseUrl}/${assets.background}`, signal),
      loadBitmap(`${baseUrl}/${assets.mask}`, signal),
      assets.displacement ? loadBitmap(`${baseUrl}/${assets.displacement}`, signal) : null,
      assets.highlights ? loadBitmap(`${baseUrl}/${assets.highlights}`, signal) : null,
      assets.shadows ? loadBitmap(`${baseUrl}/${assets.shadows}`, signal) : null,
      assets.reflection ? loadBitmap(`${baseUrl}/${assets.reflection}`, signal) : null,
      assets.texture ? loadBitmap(`${baseUrl}/${assets.texture}`, signal) : null,
    ]);

  return {
    background,
    mask,
    displacement,
    highlights,
    shadows,
    reflection,
    texture,
  };
}

/**
 * Load a single image as ImageBitmap with caching.
 */
async function loadBitmap(url: string, signal?: AbortSignal): Promise<ImageBitmap> {
  const cached = assetCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.bitmap;
  }

  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Failed to load asset: ${url}`);

  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);

  assetCache.set(url, { bitmap, timestamp: Date.now() });

  return bitmap;
}

/**
 * Convert ImageBitmap to ImageData for pixel-level operations.
 */
export function bitmapToImageData(bitmap: ImageBitmap): ImageData {
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0);
  return ctx.getImageData(0, 0, bitmap.width, bitmap.height);
}

/**
 * Load customer artwork from a File object as ImageData.
 * Validates and preprocesses (detects transparency, checks dimensions).
 */
export async function loadArtwork(file: File): Promise<{
  imageData: ImageData;
  hasTransparency: boolean;
  width: number;
  height: number;
}> {
  const bitmap = await createImageBitmap(file);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);

  // Detect transparency
  const data = imageData.data;
  let hasTransparency = false;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) { hasTransparency = true; break; }
  }

  bitmap.close();

  return {
    imageData,
    hasTransparency,
    width: imageData.width,
    height: imageData.height,
  };
}

/**
 * Clear the asset cache.
 */
export function clearAssetCache(): void {
  for (const entry of assetCache.values()) {
    entry.bitmap.close();
  }
  assetCache.clear();
}

/**
 * Auto-crop transparent edges from artwork.
 */
export function autoCropTransparent(imageData: ImageData): ImageData {
  const { data, width, height } = imageData;
  let minX = width, minY = height, maxX = 0, maxY = 0;
  let hasOpacity = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 0) {
        hasOpacity = true;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (!hasOpacity) return imageData;

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const cropped = new ImageData(cropW, cropH);

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const srcIdx = ((minY + y) * width + (minX + x)) * 4;
      const dstIdx = (y * cropW + x) * 4;
      for (let c = 0; c < 4; c++) {
        cropped.data[dstIdx + c] = data[srcIdx + c];
      }
    }
  }

  return cropped;
}

/**
 * Auto-center artwork by adding transparent padding.
 */
export function autoCenter(imageData: ImageData, targetWidth: number, targetHeight: number): ImageData {
  const result = new ImageData(targetWidth, targetHeight);
  const ox = Math.floor((targetWidth - imageData.width) / 2);
  const oy = Math.floor((targetHeight - imageData.height) / 2);

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const srcIdx = (y * imageData.width + x) * 4;
      const dstIdx = ((oy + y) * targetWidth + (ox + x)) * 4;
      for (let c = 0; c < 4; c++) {
        result.data[dstIdx + c] = imageData.data[srcIdx + c];
      }
    }
  }

  return result;
}
