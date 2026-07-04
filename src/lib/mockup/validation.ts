import type { ValidationResult, AllowedFileType } from '@/types/mockup';

const ALLOWED_TYPES: AllowedFileType[] = ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MIN_DIMENSION = 100;
const RECOMMENDED_MIN_DPI = 150;

export async function validateDesignFile(file: File): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Type check
  if (!ALLOWED_TYPES.includes(file.type as AllowedFileType)) {
    errors.push(`Unsupported file type: ${file.type}. Accepted: PNG, JPG, JPEG, SVG, PDF`);
    return { valid: false, errors, warnings, fileSize: file.size };
  }

  // Size check
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum: 50MB`);
    return { valid: false, errors, warnings, fileSize: file.size };
  }

  let width = 0;
  let height = 0;
  let hasTransparency = false;

  if (file.type === 'image/svg+xml') {
    const text = await file.text();
    const match = text.match(/viewBox="([^"]+)"/);
    if (match) {
      const [, , vbW, vbH] = match[1].split(/\s+/).map(Number);
      width = vbW; height = vbH;
    }
  } else if (file.type === 'application/pdf') {
    warnings.push('PDF preview not available. Ensure your PDF has embedded fonts and high-resolution images.');
    return { valid: true, errors, warnings, fileSize: file.size };
  } else {
    const result = await analyzeImage(file);
    width = result.width;
    height = result.height;
    hasTransparency = result.hasTransparency;
  }

  if (width < MIN_DIMENSION || height < MIN_DIMENSION) {
    errors.push(`Image too small (${width}×${height}). Minimum: ${MIN_DIMENSION}×${MIN_DIMENSION}px`);
  }

  const dpi = Math.min(width / 3.5, height / 2) * 25.4;
  if (dpi < RECOMMENDED_MIN_DPI) {
    warnings.push(`Low resolution for print (≈${Math.round(dpi)} DPI). Recommended: ≥${RECOMMENDED_MIN_DPI} DPI`);
  }

  if (file.size > 5 * 1024 * 1024) {
    warnings.push(`Large file (${(file.size / 1024 / 1024).toFixed(1)}MB). Consider optimizing for faster rendering.`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    dimensions: { width, height },
    hasTransparency,
    fileSize: file.size,
  };
}

async function analyzeImage(file: File): Promise<{ width: number; height: number; hasTransparency: boolean }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let hasTransparency = false;
      if (file.type === 'image/png') {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, Math.min(img.width, 100), Math.min(img.height, 100));
        for (let i = 3; i < data.data.length; i += 4) {
          if (data.data[i] < 255) { hasTransparency = true; break; }
        }
      }
      resolve({ width: img.width, height: img.height, hasTransparency });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
    img.src = url;
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}
