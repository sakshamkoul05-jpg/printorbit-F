'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { proxyImage } from '@/lib/ai';
import { SCENES } from '@/lib/mockupScenes';
import { renderPerspectiveWarp, renderVignette, renderGrain, renderShadow } from '@/lib/mockupEngine';
import type { SceneDef } from '@/lib/mockupEngine';

const CANVAS_W = 1200;
const CANVAS_H = 800;
const PREVIEW_W = 800;
const PREVIEW_H = 533;

export default function MockupGenerator() {
  const [designImage, setDesignImage] = useState<HTMLImageElement | null>(null);
  const [designDataUrl, setDesignDataUrl] = useState<string | null>(null);
  const [designFileName, setDesignFileName] = useState('');
  const [selectedScene, setSelectedScene] = useState<SceneDef>(SCENES[0]);
  const [activeCategory, setActiveCategory] = useState('Business Cards');
  const [bgDataUrl, setBgDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [needsRender, setNeedsRender] = useState(0);

  // Design adjustments
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [designOpacity, setDesignOpacity] = useState(100);
  const [designScale, setDesignScale] = useState(100);
  const [sizeLock, setSizeLock] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = [...new Set(SCENES.map(s => s.product))];
  const filteredScenes = SCENES.filter(s => s.product === activeCategory);

  // ── Load background image via proxy ──
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    proxyImage(selectedScene.photoUrl)
      .then(dataUrl => { if (!cancelled) { setBgDataUrl(dataUrl); setLoading(false); } })
      .catch(() => { if (!cancelled) { setBgDataUrl(null); setLoading(false); } });
    return () => { cancelled = true; };
  }, [selectedScene.photoUrl]);

  // ── Re-render whenever inputs change ──
  useEffect(() => { setNeedsRender(n => n + 1); }, [bgDataUrl, designDataUrl, selectedScene, brightness, contrast, saturation, designOpacity, designScale, sizeLock]);

  // ── Render the mockup preview ──
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas || (!bgDataUrl && !designDataUrl)) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    const W = PREVIEW_W;
    const H = PREVIEW_H;
    canvas.width = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);

    const renderFrame = async () => {
      // 1) Background
      if (bgDataUrl) {
        const bg = new Image(); bg.crossOrigin = 'anonymous';
        await new Promise(res => { bg.onload = res; bg.onerror = res; bg.src = bgDataUrl; });
        ctx.drawImage(bg, 0, 0, W, H);
      } else {
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, '#e8e0d0'); g.addColorStop(1, '#c8b8a0');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }

      // 2) Design with perspective warp
      if (designDataUrl && designImage) {
        const img = new Image();
        await new Promise(res => { img.onload = res; img.onerror = res; img.src = designDataUrl; });

        const scale = sizeLock ? (designScale / 100) : 1;
        const scaleCompensation = sizeLock ? 1 : (designScale / 100);
        const scaledCorners = {
          tl: selectedScene.corners.tl,
          tr: selectedScene.corners.tr,
          bl: selectedScene.corners.bl,
          br: selectedScene.corners.br,
        };

        renderPerspectiveWarp(ctx, img, selectedScene.corners, W, H, {
          brightness: brightness * scaleCompensation,
          contrast: contrast * scaleCompensation,
          saturation: saturation * scaleCompensation,
          opacity: designOpacity,
          blendMode: selectedScene.blendMode,
        });

        // Apply blend texture overlay
        if (selectedScene.textureOverlay) {
          ctx.globalCompositeOperation = 'multiply';
          ctx.globalAlpha = 0.08;
          const g2 = ctx.createRadialGradient(W / 2, H / 2, W * 0.1, W / 2, H / 2, W * 0.6);
          g2.addColorStop(0, '#000'); g2.addColorStop(1, 'transparent');
          ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = 'source-over';
        }
      }

      // 3) Shadow
      if (selectedScene.shadow && designDataUrl) {
        renderShadow(ctx, selectedScene.corners, selectedScene.shadow, W, H);
      }

      // 4) Vignette
      renderVignette(ctx, W, H, 0.25);

      // 5) Grain overlay
      renderGrain(ctx, W, H, 0.03);
    };

    renderFrame();
  }, [needsRender, bgDataUrl, designDataUrl, designImage, selectedScene, brightness, contrast, saturation, designOpacity, designScale, sizeLock]);

  // ── Handle file upload ──
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDesignFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setDesignDataUrl(url);
      const img = new Image();
      img.onload = () => setDesignImage(img);
      img.src = url;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    setDesignFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setDesignDataUrl(url);
      const img = new Image();
      img.onload = () => setDesignImage(img);
      img.src = url;
    };
    reader.readAsDataURL(file);
  }, []);

  // ── Export ──
  const handleExport = useCallback(async (scale: number) => {
    setExporting(true);
    try {
      const W = CANVAS_W * scale;
      const H = CANVAS_H * scale;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d')!;

      // Background
      if (bgDataUrl) {
        const bg = new Image();
        await new Promise(res => { bg.onload = res; bg.onerror = res; bg.crossOrigin = 'anonymous'; bg.src = bgDataUrl; });
        ctx.drawImage(bg, 0, 0, W, H);
      }

      // Design
      if (designDataUrl) {
        const img = new Image();
        await new Promise(res => { img.onload = res; img.onerror = res; img.crossOrigin = 'anonymous'; img.src = designDataUrl; });
        renderPerspectiveWarp(ctx, img, selectedScene.corners, W, H, {
          brightness, contrast, saturation, opacity: designOpacity, blendMode: selectedScene.blendMode,
        });
      }

      // Shadow
      if (selectedScene.shadow && designDataUrl) {
        renderShadow(ctx, selectedScene.corners, selectedScene.shadow, W, H);
      }

      // Vignette + grain
      renderVignette(ctx, W, H, 0.25);
      renderGrain(ctx, W, H, 0.03);

      const link = document.createElement('a');
      link.download = `mockup-${selectedScene.id}-${scale}x.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  }, [bgDataUrl, designDataUrl, selectedScene, brightness, contrast, saturation, designOpacity]);

  const scene = selectedScene;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <Container>
          <div className="py-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <Link href="/utilities" className="text-xs text-blue-400 hover:underline mb-1 inline-block">← Back to Utilities</Link>
              <h1 className="text-xl md:text-2xl font-bold text-white font-heading">Mockup Scene Generator</h1>
              <p className="text-xs text-slate-400 mt-0.5">Place your design on realistic product photos</p>
            </div>
            {designDataUrl && (
              <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                  <button key={s} onClick={() => handleExport(s)} disabled={exporting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white text-xs font-medium rounded-lg transition-colors">
                    {exporting ? 'Exporting...' : `Export ${s}×`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6 flex flex-col xl:flex-row gap-6">
          {/* ── LEFT: Categories + Scenes ── */}
          <div className="w-full xl:w-64 shrink-0 space-y-4">
            {/* Upload */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Your Design</p>
              {designDataUrl ? (
                <div className="space-y-3">
                  <div className="relative w-full aspect-[4/3] bg-slate-700 rounded-lg overflow-hidden">
                    <img src={designDataUrl} alt="Design" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{designFileName}</p>
                  <div className="flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()}
                      className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors">Replace</button>
                    <button onClick={() => { setDesignImage(null); setDesignDataUrl(null); setDesignFileName(''); }}
                      className="px-3 py-1.5 bg-red-900/50 hover:bg-red-800/50 text-red-300 text-xs rounded-lg transition-colors">Remove</button>
                  </div>
                </div>
              ) : (
                <div onDragOver={e => e.preventDefault()} onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-[4/3] border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-8 h-8 text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
                  </svg>
                  <p className="text-xs text-slate-400">Drop image or click</p>
                  <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, SVG</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </div>

            {/* Categories */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Product</p>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {categories.map(cat => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setSelectedScene(SCENES.find(s => s.product === cat) || SCENES[0]); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scene Thumbnails */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">{activeCategory} Scenes</p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredScenes.map(s => (
                  <button key={s.id} onClick={() => setSelectedScene(s)}
                    className={`w-full text-left p-2 rounded-lg border transition-all ${selectedScene.id === s.id ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-500 bg-slate-700/50'}`}>
                    <div className="w-full h-12 rounded-md mb-1 overflow-hidden bg-slate-700">
                      <img src={s.photoUrl} alt={s.name} className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                    <p className="text-[10px] text-slate-300 font-medium">{s.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── CENTER: Canvas Preview ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="px-4 py-2.5 bg-slate-750 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{scene.name}</span>
                  <span className="text-[10px] text-slate-400">{scene.product}</span>
                </div>
                <div className="flex items-center gap-3">
                  {loading && <span className="text-[10px] text-yellow-400">Loading image...</span>}
                  <span className="text-[10px] text-slate-500">{PREVIEW_W} × {PREVIEW_H}</span>
                </div>
              </div>
              <div className="relative bg-slate-900" style={{ aspectRatio: `${PREVIEW_W}/${PREVIEW_H}` }}>
                <canvas ref={previewCanvasRef}
                  width={PREVIEW_W} height={PREVIEW_H}
                  className="absolute inset-0 w-full h-full" />
                {!designDataUrl && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-slate-500 text-sm">Upload a design to see it on this mockup</p>
                  </div>
                )}
              </div>
            </div>

            {/* Adjustments */}
            <div className="mt-4 bg-slate-800 rounded-xl border border-slate-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-slate-300">Image Adjustments</p>
                <button onClick={() => { setBrightness(0); setContrast(0); setSaturation(0); setDesignOpacity(100); setDesignScale(100); setSizeLock(false); }}
                  className="text-[10px] text-slate-500 hover:text-white transition-colors">Reset All</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Brightness', value: brightness, set: setBrightness, min: -50, max: 50, unit: '' },
                  { label: 'Contrast', value: contrast, set: setContrast, min: -50, max: 50, unit: '' },
                  { label: 'Saturation', value: saturation, set: setSaturation, min: -50, max: 50, unit: '' },
                  { label: 'Opacity', value: designOpacity, set: setDesignOpacity, min: 10, max: 100, unit: '%' },
                  { label: 'Scale', value: designScale, set: setDesignScale, min: 25, max: 150, unit: '%' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-slate-400">{s.label}</span>
                      <span className="text-[10px] text-slate-500">{s.value}{s.unit}</span>
                    </div>
                    <input type="range" min={s.min} max={s.max} value={s.value}
                      onChange={e => s.set(Number(e.target.value))}
                      className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                  </div>
                ))}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-slate-400">Size Lock</span>
                  </div>
                  <button onClick={() => setSizeLock(!sizeLock)}
                    className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${sizeLock ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                    {sizeLock ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 mb-2">Tips for Best Results</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Use PNG with transparent background for apparel mockups',
                  'High-res images (1200px+) produce sharper results',
                  'Adjust brightness/contrast to match the scene lighting',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 text-xs mt-0.5">→</span>
                    <p className="text-[10px] text-slate-400">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
