'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Upload,
  Download,
  ZoomIn,
  ZoomOut,
  AlertTriangle,
  CheckCircle,
  Scissors,
  Eye,
  EyeOff,
  RotateCcw,
  FileDown,
  Wand2,
  Sliders,
  Move,
  ArrowLeftRight,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   Shared helpers
   ═══════════════════════════════════════════════════════ */

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function bicubicInterpolate(
  pixels: Uint8ClampedArray,
  srcW: number,
  srcH: number,
  dstW: number,
  dstH: number
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(dstW * dstH * 4);
  const xRatio = srcW / dstW;
  const yRatio = srcH / dstH;

  function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
  }

  function getPixel(x: number, y: number, c: number): number {
    const sx = clamp(x, 0, srcW - 1);
    const sy = clamp(y, 0, srcH - 1);
    return pixels[(sy * srcW + sx) * 4 + c];
  }

  function cubicWeight(t: number): number {
    const t2 = t * t;
    const t3 = t2 * t;
    return a * t3 + b * t2 + c * t + d;
  }

  const a = -0.5;
  const b = 1.0;
  const c = -0.5;
  const d = 0.0;

  for (let dy = 0; dy < dstH; dy++) {
    for (let dx = 0; dx < dstW; dx++) {
      const srcX = dx * xRatio;
      const srcY = dy * yRatio;
      const x0 = Math.floor(srcX);
      const y0 = Math.floor(srcY);
      const fx = srcX - x0;
      const fy = srcY - y0;

      for (let ch = 0; ch < 4; ch++) {
        const p00 = getPixel(x0 - 1, y0 - 1, ch);
        const p10 = getPixel(x0, y0 - 1, ch);
        const p20 = getPixel(x0 + 1, y0 - 1, ch);
        const p30 = getPixel(x0 + 2, y0 - 1, ch);
        const p01 = getPixel(x0 - 1, y0, ch);
        const p11 = getPixel(x0, y0, ch);
        const p21 = getPixel(x0 + 1, y0, ch);
        const p31 = getPixel(x0 + 2, y0, ch);
        const p02 = getPixel(x0 - 1, y0 + 1, ch);
        const p12 = getPixel(x0, y0 + 1, ch);
        const p22 = getPixel(x0 + 1, y0 + 1, ch);
        const p32 = getPixel(x0 + 2, y0 + 1, ch);
        const p03 = getPixel(x0 - 1, y0 + 2, ch);
        const p13 = getPixel(x0, y0 + 2, ch);
        const p23 = getPixel(x0 + 1, y0 + 2, ch);
        const p33 = getPixel(x0 + 2, y0 + 2, ch);

        const col0 = p00 * cubicWeight(fx + 1) + p10 * cubicWeight(fx) + p20 * cubicWeight(1 - fx) + p30 * cubicWeight(2 - fx);
        const col1 = p01 * cubicWeight(fx + 1) + p11 * cubicWeight(fx) + p21 * cubicWeight(1 - fx) + p31 * cubicWeight(2 - fx);
        const col2 = p02 * cubicWeight(fx + 1) + p12 * cubicWeight(fx) + p22 * cubicWeight(1 - fx) + p32 * cubicWeight(2 - fx);
        const col3 = p03 * cubicWeight(fx + 1) + p13 * cubicWeight(fx) + p23 * cubicWeight(1 - fx) + p33 * cubicWeight(2 - fx);

        const val = col0 * cubicWeight(fy + 1) + col1 * cubicWeight(fy) + col2 * cubicWeight(1 - fy) + col3 * cubicWeight(2 - fy);
        out[(dy * dstW + dx) * 4 + ch] = clamp(Math.round(val), 0, 255);
      }
    }
  }
  return out;
}

const PAPER_SIZES = [
  { name: 'A3', mmW: 297, mmH: 420 },
  { name: 'A4', mmW: 210, mmH: 297 },
  { name: 'A5', mmW: 148, mmH: 210 },
  { name: 'A6', mmW: 105, mmH: 148 },
  { name: 'Business Card', mmW: 85, mmH: 55 },
  { name: 'DL Flyer', mmW: 99, mmH: 210 },
  { name: 'Custom', mmW: 0, mmH: 0 },
];

/* ═══════════════════════════════════════════════════════
   1. IMAGE DPI SCALER (UPSCALER)
   ═══════════════════════════════════════════════════════ */

export function ImageDPIScaler() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [origWidth, setOrigWidth] = useState(0);
  const [origHeight, setOrigHeight] = useState(0);
  const [targetDpi, setTargetDpi] = useState(300);
  const [targetWmm, setTargetWmm] = useState('');
  const [targetHmm, setTargetHmm] = useState('');
  const [upscaledUrl, setUpscaledUrl] = useState('');
  const [upscaledSize, setUpscaledSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [zoom, setZoom] = useState<'before' | 'after'>('before');
  const fileRef = useRef<HTMLInputElement>(null);

  const tWmm = parseFloat(targetWmm) || 0;
  const tHmm = parseFloat(targetHmm) || 0;

  const targetPxW = tWmm > 0 ? Math.round((tWmm / 25.4) * targetDpi) : 0;
  const targetPxH = tHmm > 0 ? Math.round((tHmm / 25.4) * targetDpi) : 0;

  const currentDpi = origWidth > 0 && tWmm > 0 ? (origWidth / tWmm) * 25.4 : 0;
  const upscaleFactor = origWidth > 0 && targetPxW > 0 ? targetPxW / origWidth : 0;

  const qualityRating = (() => {
    if (upscaleFactor <= 1) return { label: 'No upscale needed', color: 'text-blue-600', icon: CheckCircle };
    if (upscaleFactor <= 1.5) return { label: 'Excellent quality', color: 'text-green-600', icon: CheckCircle };
    if (upscaleFactor <= 2.5) return { label: 'Good quality', color: 'text-green-500', icon: CheckCircle };
    if (upscaleFactor <= 4) return { label: 'Moderate quality', color: 'text-yellow-600', icon: AlertTriangle };
    return { label: 'Low quality — heavy upscaling', color: 'text-red-600', icon: AlertTriangle };
  })();

  const loadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setUpscaledUrl('');
    setUpscaledSize(0);
    const url = URL.createObjectURL(f);
    setImagePreview(url);
    const img = new Image();
    img.onload = () => {
      setOrigWidth(img.width);
      setOrigHeight(img.height);
    };
    img.src = url;
  }, []);

  useEffect(() => {
    if (tWmm > 0 && !targetHmm) {
      const ratio = origHeight / origWidth;
      setTargetHmm((tWmm * ratio).toFixed(1));
    }
  }, [tWmm, origWidth, origHeight, targetHmm]);

  const handleUpscale = useCallback(() => {
    if (!imagePreview || targetPxW <= 0 || targetPxH <= 0) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const srcCanvas = document.createElement('canvas');
      srcCanvas.width = img.width;
      srcCanvas.height = img.height;
      const srcCtx = srcCanvas.getContext('2d')!;
      srcCtx.drawImage(img, 0, 0);
      const srcData = srcCtx.getImageData(0, 0, img.width, img.height);

      const upscaledPixels = bicubicInterpolate(
        srcData.data,
        img.width,
        img.height,
        targetPxW,
        targetPxH
      );

      const dstCanvas = document.createElement('canvas');
      dstCanvas.width = targetPxW;
      dstCanvas.height = targetPxH;
      const dstCtx = dstCanvas.getContext('2d')!;
      const dstImageData = dstCtx.createImageData(targetPxW, targetPxH);
      dstImageData.data.set(upscaledPixels);
      dstCtx.putImageData(dstImageData, 0, 0);

      dstCanvas.toBlob((blob) => {
        if (blob) {
          setUpscaledUrl(URL.createObjectURL(blob));
          setUpscaledSize(blob.size);
        }
        setProcessing(false);
      }, 'image/png');
    };
    img.src = imagePreview;
  }, [imagePreview, targetPxW, targetPxH]);

  const handleDownload = useCallback(() => {
    if (!upscaledUrl) return;
    const a = document.createElement('a');
    a.download = `upscaled-${imageFile?.name || 'image.png'}`;
    a.href = upscaledUrl;
    a.click();
  }, [upscaledUrl, imageFile]);

  return (
    <div className="space-y-5">
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
      >
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">{imageFile ? imageFile.name : 'Click to upload low-res image'}</p>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={loadImage} className="hidden" />

      {imagePreview && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Target DPI</label>
              <div className="flex gap-1">
                {[150, 300, 600].map((d) => (
                  <button
                    key={d}
                    onClick={() => setTargetDpi(d)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                      targetDpi === d ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div />
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Width (mm)</label>
              <input
                type="number"
                step="any"
                value={targetWmm}
                onChange={(e) => setTargetWmm(e.target.value)}
                placeholder="e.g. 210"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Height (mm)</label>
              <input
                type="number"
                step="any"
                value={targetHmm}
                onChange={(e) => setTargetHmm(e.target.value)}
                placeholder="e.g. 297"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted">Original</span>
              <span className="text-sm font-bold text-dark">{origWidth} x {origHeight} px</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted">Target</span>
              <span className="text-sm font-bold text-dark">{targetPxW} x {targetPxH} px</span>
            </div>
            {currentDpi > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted">Current DPI at target size</span>
                <span className="text-sm font-bold text-dark">{currentDpi.toFixed(1)}</span>
              </div>
            )}
            {upscaleFactor > 0 && (
              <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                <span className="text-sm font-semibold text-dark">Scale Factor</span>
                <span className="text-lg font-bold text-dark">{upscaleFactor.toFixed(2)}x</span>
              </div>
            )}
            {upscaleFactor > 1 && (
              <div className={`flex items-center gap-2 text-sm font-medium ${qualityRating.color}`}>
                {qualityRating.icon && <qualityRating.icon className="w-4 h-4" />}
                {qualityRating.label}
              </div>
            )}
          </div>

          <button
            onClick={handleUpscale}
            disabled={processing || targetPxW <= 0 || targetPxH <= 0}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 className="w-4 h-4" />
            {processing ? 'Processing...' : 'Upscale Image'}
          </button>

          {upscaledUrl && (
            <>
              <div className="flex gap-2">
                <button
                  onClick={() => setZoom('before')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-colors ${
                    zoom === 'before' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Before
                </button>
                <button
                  onClick={() => setZoom('after')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-colors ${
                    zoom === 'after' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5" /> After
                </button>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={zoom === 'before' ? imagePreview : upscaledUrl}
                  alt={zoom}
                  className="w-full max-h-64 object-contain"
                />
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-[10px] font-bold rounded">
                  {zoom === 'before' ? `${origWidth}x${origHeight}` : `${targetPxW}x${targetPxH}`}
                </div>
              </div>
              <div className="flex gap-3 text-xs">
                <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <p className="text-muted mb-1">Original</p>
                  <p className="font-bold text-dark">{formatBytes(imageFile?.size || 0)}</p>
                </div>
                <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <p className="text-muted mb-1">Upscaled</p>
                  <p className="font-bold text-dark">{formatBytes(upscaledSize)}</p>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" /> Download Upscaled Image
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. STENCIL / TEMPLATE GENERATOR
   ═══════════════════════════════════════════════════════ */

export function StencilGenerator() {
  const [mode, setMode] = useState<'image' | 'text'>('image');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [textInput, setTextInput] = useState('CUT');
  const [fontSize, setFontSize] = useState(120);
  const [threshold, setThreshold] = useState(128);
  const [invert, setInvert] = useState(false);
  const [bridgeWidth, setBridgeWidth] = useState(3);
  const [stencilUrl, setStencilUrl] = useState('');
  const [stencilSvg, setStencilSvg] = useState('');
  const [cutPaths, setCutPaths] = useState(0);
  const [showGuides, setShowGuides] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setStencilUrl('');
    setStencilSvg('');
    const url = URL.createObjectURL(f);
    setImagePreview(url);
  }, []);

  const generateStencil = useCallback(() => {
    if (mode === 'image' && !imagePreview) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    if (mode === 'text') {
      canvas.width = 600;
      canvas.height = 400;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 600, 400);
      ctx.fillStyle = 'black';
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(textInput, 300, 200);
    } else {
      const img = new Image();
      img.src = imagePreview;
      // Use sync draw since image is already loaded via preview
      canvas.width = img.width || 400;
      canvas.height = img.height || 300;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Convert to grayscale and threshold
    const gray = new Uint8Array(canvas.width * canvas.height);
    for (let i = 0; i < data.length; i += 4) {
      const g = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
      gray[i / 4] = g;
    }

    let mask = new Uint8Array(canvas.width * canvas.height);
    for (let i = 0; i < gray.length; i++) {
      mask[i] = gray[i] < threshold ? 1 : 0;
    }

    if (invert) {
      for (let i = 0; i < mask.length; i++) mask[i] = 1 - mask[i];
    }

    // Bridge: dilate then erode to connect nearby pieces
    if (bridgeWidth > 0) {
      const w = canvas.width;
      const h = canvas.height;
      const temp = new Uint8Array(mask);

      // Dilate
      for (let iter = 0; iter < bridgeWidth; iter++) {
        const next = new Uint8Array(temp);
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            if (temp[y * w + x]) {
              next[(y - 1) * w + x] = 1;
              next[(y + 1) * w + x] = 1;
              next[y * w + (x - 1)] = 1;
              next[y * w + (x + 1)] = 1;
            }
          }
        }
        temp.set(next);
      }

      // Erode
      for (let iter = 0; iter < bridgeWidth; iter++) {
        const next = new Uint8Array(temp);
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            if (!temp[y * w + x]) {
              next[(y - 1) * w + x] = 0;
              next[(y + 1) * w + x] = 0;
              next[y * w + (x - 1)] = 0;
              next[y * w + (x + 1)] = 0;
            }
          }
        }
        temp.set(next);
      }
      mask = temp;
    }

    // Render stencil: white = cut out, black = material
    for (let i = 0; i < data.length; i += 4) {
      const val = mask[i / 4] ? 255 : 0;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    // Count edge pixels (approximate cut paths)
    let edges = 0;
    const w = canvas.width;
    const h = canvas.height;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        if (mask[idx] !== mask[idx - 1] || mask[idx] !== mask[(y - 1) * w + x]) {
          edges++;
        }
      }
    }
    setCutPaths(edges);

    setStencilUrl(canvas.toDataURL('image/png'));

    // Generate simple SVG trace of contours
    const svgParts: string[] = [];
    svgParts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`);
    svgParts.push(`<rect width="${w}" height="${h}" fill="white"/>`);

    // Simple contour tracing: find boundary pixels
    const visited = new Uint8Array(w * h);
    let pathCount = 0;
    const maxPaths = 2000;

    for (let y = 1; y < h - 1 && pathCount < maxPaths; y++) {
      for (let x = 1; x < w - 1 && pathCount < maxPaths; x++) {
        const idx = y * w + x;
        if (mask[idx] && !visited[idx]) {
          // Check if this is a boundary pixel (has a non-mask neighbor)
          const isBoundary =
            !mask[(y - 1) * w + x] || !mask[(y + 1) * w + x] ||
            !mask[y * w + (x - 1)] || !mask[y * w + (x + 1)];
          if (isBoundary) {
            // Trace a simple path along boundary
            const points: string[] = [];
            let cx = x, cy = y;
            let safety = 0;
            while (safety < 500) {
              visited[cy * w + cx] = 1;
              points.push(`${cx},${cy}`);
              // Simple: move to unvisited mask neighbor that is boundary
              let found = false;
              for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
                const nx = cx + dx;
                const ny = cy + dy;
                if (nx >= 0 && nx < w && ny >= 0 && ny < h && mask[ny * w + nx] && !visited[ny * w + nx]) {
                  cx = nx;
                  cy = ny;
                  found = true;
                  break;
                }
              }
              if (!found) break;
              safety++;
            }
            if (points.length > 2) {
              svgParts.push(`<polyline points="${points.join(' ')}" fill="none" stroke="black" stroke-width="1"/>`);
              pathCount++;
            }
          }
        }
      }
    }
    svgParts.push('</svg>');
    setStencilSvg(svgParts.join('\n'));
  }, [mode, imagePreview, textInput, fontSize, threshold, invert, bridgeWidth]);

  const handleDownloadPng = useCallback(() => {
    if (!stencilUrl) return;
    const a = document.createElement('a');
    a.download = `stencil-${imageFile?.name || 'text'}.png`;
    a.href = stencilUrl;
    a.click();
  }, [stencilUrl, imageFile]);

  const handleDownloadSvg = useCallback(() => {
    if (!stencilSvg) return;
    const blob = new Blob([stencilSvg], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.download = `stencil-${imageFile?.name || 'text'}.svg`;
    a.href = URL.createObjectURL(blob);
    a.click();
  }, [stencilSvg, imageFile]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('image')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
            mode === 'image' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          From Image
        </button>
        <button
          onClick={() => setMode('text')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
            mode === 'text' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          From Text
        </button>
      </div>

      {mode === 'image' ? (
        <>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600">{imageFile ? imageFile.name : 'Click to upload image for stencil'}</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={loadImage} className="hidden" />
          {imagePreview && (
            <div className="relative rounded-xl overflow-hidden border border-slate-200">
              <img src={imagePreview} alt="Source" className="w-full max-h-48 object-contain bg-slate-100" />
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Text</label>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Font Size: {fontSize}px</label>
            <input
              type="range"
              min={24}
              max={300}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Threshold: {threshold}</label>
          <input
            type="range"
            min={0}
            max={255}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>More black</span>
            <span>More white</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Bridge Width: {bridgeWidth}px</label>
          <input
            type="range"
            min={0}
            max={10}
            value={bridgeWidth}
            onChange={(e) => setBridgeWidth(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <p className="text-[10px] text-slate-400 mt-1">Connects isolated stencil pieces</p>
        </div>
        <button
          onClick={() => setInvert(!invert)}
          className={`w-full flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-colors ${
            invert ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {invert ? 'Inverted' : 'Invert Colors'}
        </button>
      </div>

      <button
        onClick={generateStencil}
        disabled={mode === 'image' && !imagePreview}
        className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Scissors className="w-4 h-4" /> Generate Stencil
      </button>

      {stencilUrl && (
        <>
          <div className="flex items-center gap-2 text-xs text-muted">
            <button
              onClick={() => setShowGuides(!showGuides)}
              className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg"
            >
              {showGuides ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {showGuides ? 'Guides On' : 'Guides Off'}
            </button>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-slate-200">
            <img src={stencilUrl} alt="Stencil" className="w-full max-h-64 object-contain" />
            {showGuides && (
              <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-black/60 text-white text-[10px] rounded">
                  <div className="w-2 h-2 bg-white rounded-sm" /> Cut area
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-black/60 text-white text-[10px] rounded">
                  <div className="w-2 h-2 bg-black rounded-sm border border-white/50" /> Material
                </div>
              </div>
            )}
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted">Estimated cut paths</span>
              <span className="text-sm font-bold text-dark">{cutPaths.toLocaleString()} px</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadPng}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" /> PNG
            </button>
            <button
              onClick={handleDownloadSvg}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              <FileDown className="w-4 h-4" /> SVG
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   3. BLEED PREVIEW OVERLAY
   ═══════════════════════════════════════════════════════ */

export function BleedPreviewOverlay() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [origWidth, setOrigWidth] = useState(0);
  const [origHeight, setOrigHeight] = useState(0);
  const [paperIdx, setPaperIdx] = useState(1);
  const [customW, setCustomW] = useState(210);
  const [customH, setCustomH] = useState(297);
  const [bleedMm, setBleedMm] = useState(3);
  const [safeMm, setSafeMm] = useState(5);
  const [showGuides, setShowGuides] = useState(true);
  const [annotatedUrl, setAnnotatedUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const paper = PAPER_SIZES[paperIdx];
  const printW = paperIdx === PAPER_SIZES.length - 1 ? customW : paper.mmW;
  const printH = paperIdx === PAPER_SIZES.length - 1 ? customH : paper.mmH;
  const totalW = printW + bleedMm * 2;
  const totalH = printH + bleedMm * 2;

  const loadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setAnnotatedUrl('');
    const url = URL.createObjectURL(f);
    setImagePreview(url);
    const img = new Image();
    img.onload = () => {
      setOrigWidth(img.width);
      setOrigHeight(img.height);
    };
    img.src = url;
  }, []);

  const drawOverlay = useCallback(
    (exportMode = false): HTMLCanvasElement => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      const img = new Image();
      img.src = imagePreview;

      // Scale image to fit within total print area (bleed to bleed)
      const imgAspect = origWidth / origHeight;
      const totalAspect = totalW / totalH;

      let drawW: number, drawH: number;
      if (imgAspect > totalAspect) {
        drawW = origWidth;
        drawH = origWidth / totalAspect;
      } else {
        drawH = origHeight;
        drawW = origHeight * totalAspect;
      }

      const canvasW = 800;
      const canvasH = Math.round(canvasW * (totalH / totalW));
      canvas.width = canvasW;
      canvas.height = canvasH;

      const scale = canvasW / totalW;
      const bleedPx = bleedMm * scale;
      const safePx = safeMm * scale;
      const printWPx = printW * scale;
      const printHPx = printH * scale;

      // Draw image (centered, covering full bleed area)
      ctx.drawImage(img, 0, 0, origWidth, origHeight, 0, 0, canvasW, canvasH);

      if (showGuides || exportMode) {
        const cx = canvasW / 2;
        const cy = canvasH / 2;

        // Bleed zone fill (green dashed outer)
        ctx.save();
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 4]);
        ctx.strokeRect(
          cx - printWPx / 2 - bleedPx,
          cy - printHPx / 2 - bleedPx,
          printWPx + bleedPx * 2,
          printHPx + bleedPx * 2
        );
        ctx.setLineDash([]);
        ctx.restore();

        // Trim line (red solid)
        ctx.save();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          cx - printWPx / 2,
          cy - printHPx / 2,
          printWPx,
          printHPx
        );
        ctx.restore();

        // Safe zone (blue dashed inner)
        if (safeMm > 0) {
          const safeWPx = Math.max(0, printW - safeMm * 2) * scale;
          const safeHPx = Math.max(0, printH - safeMm * 2) * scale;
          ctx.save();
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 4]);
          ctx.strokeRect(
            cx - safeWPx / 2,
            cy - safeHPx / 2,
            safeWPx,
            safeHPx
          );
          ctx.setLineDash([]);
          ctx.restore();
        }

        // Semi-transparent fills
        // Bleed zone (between trim and bleed line) - green tint
        ctx.save();
        ctx.fillStyle = 'rgba(34, 197, 94, 0.12)';
        ctx.fillRect(0, 0, canvasW, cy - printHPx / 2 - bleedPx);
        ctx.fillRect(0, cy + printHPx / 2 + bleedPx, canvasW, canvasH);
        ctx.fillRect(0, cy - printHPx / 2 - bleedPx, cx - printWPx / 2 - bleedPx, printHPx + bleedPx * 2);
        ctx.fillRect(cx + printWPx / 2 + bleedPx, cy - printHPx / 2 - bleedPx, canvasW, printHPx + bleedPx * 2);
        ctx.restore();

        // Safe zone - blue tint
        if (safeMm > 0) {
          const safeWPx = Math.max(0, printW - safeMm * 2) * scale;
          const safeHPx = Math.max(0, printH - safeMm * 2) * scale;
          ctx.save();
          ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
          ctx.fillRect(cx - safeWPx / 2, cy - safeHPx / 2, safeWPx, safeHPx);
          ctx.restore();
        }

        // Corner crop marks
        ctx.save();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        const markLen = 15;
        const corners = [
          [cx - printWPx / 2, cy - printHPx / 2],
          [cx + printWPx / 2, cy - printHPx / 2],
          [cx - printWPx / 2, cy + printHPx / 2],
          [cx + printWPx / 2, cy + printHPx / 2],
        ];
        for (const [mx, my] of corners) {
          // Horizontal
          ctx.beginPath();
          ctx.moveTo(mx - markLen, my);
          ctx.lineTo(mx + markLen, my);
          ctx.stroke();
          // Vertical
          ctx.beginPath();
          ctx.moveTo(mx, my - markLen);
          ctx.lineTo(mx, my + markLen);
          ctx.stroke();
        }
        ctx.restore();

        // Labels
        ctx.save();
        ctx.font = 'bold 10px Arial, sans-serif';
        ctx.textAlign = 'center';

        // Bleed label
        ctx.fillStyle = '#22c55e';
        ctx.fillText(`Bleed: ${bleedMm}mm`, cx, cy - printHPx / 2 - bleedPx - 6);

        // Trim label
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`Trim: ${printW}x${printH}mm`, cx, cy - printHPx / 2 - 4);

        // Safe label
        if (safeMm > 0) {
          ctx.fillStyle = '#3b82f6';
          ctx.fillText(`Safe: ${safeMm}mm`, cx, cy - (printH - safeMm * 2) * scale / 2 - 4);
        }
        ctx.restore();
      }

      return canvas;
    },
    [imagePreview, origWidth, origHeight, totalW, totalH, printW, printH, bleedMm, safeMm, showGuides]
  );

  const generatePreview = useCallback(() => {
    if (!imagePreview) return;
    const canvas = drawOverlay(false);
    setAnnotatedUrl(canvas.toDataURL('image/png'));
  }, [imagePreview, drawOverlay]);

  const handleDownload = useCallback(() => {
    if (!imagePreview) return;
    const canvas = drawOverlay(true);
    const a = document.createElement('a');
    a.download = `bleed-preview-${imageFile?.name || 'image.png'}`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  }, [imagePreview, drawOverlay, imageFile]);

  // Auto-generate when inputs change
  useEffect(() => {
    if (imagePreview) {
      generatePreview();
    }
  }, [imagePreview, paperIdx, customW, customH, bleedMm, safeMm, showGuides, generatePreview]);

  return (
    <div className="space-y-5">
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
      >
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">{imageFile ? imageFile.name : 'Click to upload design'}</p>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={loadImage} className="hidden" />

      <div>
        <label className="text-xs font-semibold text-slate-400 mb-2 block">Target Print Size</label>
        <div className="grid grid-cols-4 gap-2">
          {PAPER_SIZES.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setPaperIdx(i)}
              className={`px-2 py-2 text-[10px] font-medium rounded-lg transition-colors ${
                paperIdx === i ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {paperIdx === PAPER_SIZES.length - 1 && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Width (mm)</label>
            <input
              type="number"
              value={customW}
              onChange={(e) => setCustomW(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Height (mm)</label>
            <input
              type="number"
              value={customH}
              onChange={(e) => setCustomH(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Bleed: {bleedMm}mm</label>
          <input
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={bleedMm}
            onChange={(e) => setBleedMm(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Safe Zone: {safeMm}mm</label>
          <input
            type="range"
            min={0}
            max={15}
            step={0.5}
            value={safeMm}
            onChange={(e) => setSafeMm(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setShowGuides(!showGuides)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-colors ${
            showGuides ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {showGuides ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          Guides {showGuides ? 'On' : 'Off'}
        </button>
      </div>

      {annotatedUrl && (
        <>
          <div className="relative rounded-xl overflow-hidden border border-slate-200">
            <img src={annotatedUrl} alt="Bleed Preview" className="w-full object-contain" />
          </div>

          <div className="flex gap-4 text-[10px] justify-center flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-red-500" />
              <span className="text-muted">Trim Line</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-green-500 border-t border-dashed border-green-500" />
              <span className="text-muted">Bleed Line ({bleedMm}mm)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-blue-500 border-t border-dashed border-blue-500" />
              <span className="text-muted">Safe Zone ({safeMm}mm)</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted">Print Size</span>
              <span className="text-sm font-bold text-dark">{printW} x {printH} mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted">Total with Bleed</span>
              <span className="text-sm font-bold text-dark">{totalW} x {totalH} mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted">Safe Area</span>
              <span className="text-sm font-bold text-dark">{Math.max(0, printW - safeMm * 2)} x {Math.max(0, printH - safeMm * 2)} mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted">Original Image</span>
              <span className="text-sm font-bold text-dark">{origWidth} x {origHeight} px</span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" /> Download Annotated Image
          </button>
        </>
      )}
    </div>
  );
}
