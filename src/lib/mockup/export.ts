import type { ExportFormat, ExportOptions, ExportResult } from '@/types/mockup';

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
}

export async function exportMockup(
  canvas: HTMLCanvasElement,
  options: ExportOptions,
  state?: { selectedScene?: { id: string } },
): Promise<ExportResult> {
  const format = options.format || 'png';
  const scale = options.scale || 1;
  const dpi = options.dpi || 300;

  const width = Math.round(canvas.width * scale);
  const height = Math.round(canvas.height * scale);

  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext('2d')!;

  if (options.background) {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(canvas, 0, 0, width, height);

  const mimeType = mimeForFormat(format);
  const quality = format === 'jpeg' ? (options.quality || 0.95) : undefined;

  const blob = await new Promise<Blob | null>(resolve =>
    offscreen.toBlob(b => resolve(b), mimeType, quality),
  );

  if (!blob) {
    return { success: false, error: 'Failed to encode image' };
  }

  const productName = state?.selectedScene?.id || 'mockup';
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `${productName}-${timestamp}.${format}`;

  if (options.download !== false) {
    downloadBlob(blob, filename);
  }

  return {
    success: true,
    blob,
    dataUrl: offscreen.toDataURL(mimeType, quality),
    filename,
    fileSize: blob.size,
    format,
    width,
    height,
    dpi,
  };
}

function mimeForFormat(format: ExportFormat): string {
  switch (format) {
    case 'png': return 'image/png';
    case 'jpeg': return 'image/jpeg';
    case 'webp': return 'image/webp';
    default: return 'image/png';
  }
}

const PDF_HEADER = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]); // %PDF-

export async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return res.blob();
}
