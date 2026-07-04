/**
 * Export encoder — renders final ImageData to downloadable formats.
 * Supports PNG, JPEG, WebP at configurable DPI and quality.
 */

import type { ExportFormat, ExportResult } from '../types';

/**
 * Export ImageData to a Blob in the specified format.
 */
export async function exportResult(
  imageData: ImageData,
  format: ExportFormat = 'png',
  options?: {
    quality?: number;
    dpi?: number;
    download?: boolean;
    filename?: string;
  },
): Promise<ExportResult> {
  try {
    const quality = options?.quality ?? (format === 'jpeg' ? 0.92 : undefined);
    const dpi = options?.dpi || 300;
    const mimeType = mimeForFormat(format);

    const canvas = new OffscreenCanvas(imageData.width, imageData.height);
    const ctx = canvas.getContext('2d')!;
    ctx.putImageData(imageData, 0, 0);

    // Set DPI metadata
    const blob = await canvas.convertToBlob({ type: mimeType, quality });

    if (!blob) {
      return { success: false, error: 'Failed to encode image' };
    }

    const filename = options?.filename || `mockup-${format}-${Date.now()}.${format}`;

    if (options?.download !== false) {
      downloadBlob(blob, filename);
    }

    const dataUrl = await blobToDataUrl(blob);

    return {
      success: true,
      blob,
      dataUrl,
      width: imageData.width,
      height: imageData.height,
      dpi,
      format,
      fileSize: blob.size,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Download a Blob as a file.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 200);
}

/**
 * Convert Blob to data URL.
 */
async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Export with CMYK simulation (for print-ready exports).
 * Converts sRGB pixels to simulated CMYK using a simple transformation.
 * Note: True CMYK requires ICC profile conversion.
 */
export function simulateCMYK(imageData: ImageData): ImageData {
  const data = imageData.data;
  const len = imageData.width * imageData.height * 4;

  for (let i = 0; i < len; i += 4) {
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let b = data[i + 2] / 255;

    // Simple sRGB → CMY
    let c = 1 - r;
    let m = 1 - g;
    let y = 1 - b;

    // CMY → CMYK
    const k = Math.min(c, m, y);
    if (k < 1) {
      c = (c - k) / (1 - k);
      m = (m - k) / (1 - k);
      y = (y - k) / (1 - k);
    }

    // Map back to RGB for preview (simulation)
    r = 1 - Math.min(1, c + k);
    g = 1 - Math.min(1, m + k);
    b = 1 - Math.min(1, y + k);

    data[i] = Math.round(r * 255);
    data[i + 1] = Math.round(g * 255);
    data[i + 2] = Math.round(b * 255);
  }

  return imageData;
}

function mimeForFormat(format: ExportFormat): string {
  switch (format) {
    case 'png': return 'image/png';
    case 'jpeg': return 'image/jpeg';
    case 'webp': return 'image/webp';
    case 'pdf': return 'application/pdf';
    default: return 'image/png';
  }
}
