'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { SCENES, renderPerspectiveWarp, renderExportShadow, renderVignette } from '@/lib/mockupEngine';
import type { SceneDef } from '@/lib/mockupEngine';

export default function MockupGenerator() {
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [designFileName, setDesignFileName] = useState('');
  const [scene, setScene] = useState<SceneDef>(SCENES[0]);
  const [activeCategory, setActiveCategory] = useState('Business Cards');
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [exporting, setExporting] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = [...new Set(SCENES.map(s => s.product))];
  const filteredScenes = SCENES.filter(s => s.product === activeCategory);

  const filterStr = `brightness(${1 + brightness / 100}) contrast(${1 + contrast / 100}) saturate(${1 + saturation / 100})`;

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setDesignFileName(file.name);
    const r = new FileReader();
    r.onload = e => setDesignImage(e.target?.result as string);
    r.readAsDataURL(file);
  }, []);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  }, [handleFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleExport = useCallback(async (scale: number) => {
    setExporting(true);
    try {
      const W = 1200 * scale;
      const H = 800 * scale;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d')!;

      // Background
      const bgMatch = scene.background.match(/#[0-9a-f]{6}/gi);
      if (bgMatch && bgMatch.length >= 2) {
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, bgMatch[0]);
        g.addColorStop(1, bgMatch[bgMatch.length - 1]);
        ctx.fillStyle = g;
      } else if (bgMatch) {
        ctx.fillStyle = bgMatch[0];
      } else {
        ctx.fillStyle = '#888';
      }
      ctx.fillRect(0, 0, W, H);

      // Subtle shading
      const l = ctx.createRadialGradient(W * 0.7, H * 0.2, 0, W * 0.7, H * 0.2, W * 0.9);
      l.addColorStop(0, 'rgba(255,240,200,0.12)');
      l.addColorStop(1, 'transparent');
      ctx.fillStyle = l;
      ctx.fillRect(0, 0, W, H);

      // Design
      if (designImage && scene.corners) {
        const img = new Image();
        await new Promise<void>(res => { img.onload = () => res(); img.onerror = () => res(); img.src = designImage; });
        renderPerspectiveWarp(ctx, img, scene.corners, W, H, { brightness, contrast, saturation, opacity });
      }

      // Shadow
      if (designImage && scene.corners && scene.shadowExport) {
        renderExportShadow(ctx, scene.corners, scene.shadowExport, W, H);
      }

      // Vignette
      renderVignette(ctx, W, H, 0.25);

      const link = document.createElement('a');
      link.download = `mockup-${scene.id}-${scale}x.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  }, [designImage, scene, brightness, contrast, saturation, opacity]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <Container>
          <div className="py-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <Link href="/utilities" className="text-xs text-blue-400 hover:underline mb-1 inline-block">← Back to Utilities</Link>
              <h1 className="text-xl md:text-2xl font-bold text-white font-heading">Mockup Scene Generator</h1>
              <p className="text-xs text-slate-400 mt-0.5">Place your design on professional product scenes</p>
            </div>
            {designImage && (
              <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                  <button key={s} onClick={() => handleExport(s)} disabled={exporting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white text-xs font-medium rounded-lg transition-colors">
                    {exporting ? '...' : `Export ${s}×`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6 flex flex-col xl:flex-row gap-6">
          {/* ── LEFT SIDEBAR ── */}
          <div className="w-full xl:w-64 shrink-0 space-y-4">
            {/* Upload */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Your Design</p>
              {designImage ? (
                <div className="space-y-3">
                  <div className="relative w-full aspect-[3/2] bg-slate-700 rounded-lg overflow-hidden">
                    <img src={designImage} alt="design" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{designFileName}</p>
                  <div className="flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg">Replace</button>
                    <button onClick={() => { setDesignImage(null); setDesignFileName(''); }} className="px-3 py-1.5 bg-red-900/50 hover:bg-red-800/50 text-red-300 text-xs rounded-lg">Remove</button>
                  </div>
                </div>
              ) : (
                <div onDragOver={e => e.preventDefault()} onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-[3/2] border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-8 h-8 text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
                  </svg>
                  <p className="text-xs text-slate-400">Drop your design</p>
                  <p className="text-[10px] text-slate-500 mt-1">PNG, JPG</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </div>

            {/* Categories */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Product Type</p>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {categories.map(cat => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setScene(SCENES.find(s => s.product === cat) || SCENES[0]); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenes */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Scenes</p>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {filteredScenes.map(s => (
                  <button key={s.id} onClick={() => setScene(s)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all ${scene.id === s.id ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-500 bg-slate-700/50'}`}>
                    <div className="w-full h-14 rounded-md overflow-hidden mb-1" style={{ background: s.background }}>
                      {designImage && scene.id === s.id && (
                        <img src={designImage} alt="" className="w-full h-full object-cover opacity-50" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-200 font-medium">{s.name}</p>
                    <p className="text-[9px] text-slate-500">{s.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Adjustments */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Adjustments</p>
              <div className="space-y-3">
                {[
                  { label: 'Brightness', v: brightness, s: setBrightness },
                  { label: 'Contrast', v: contrast, s: setContrast },
                  { label: 'Saturation', v: saturation, s: setSaturation },
                  { label: 'Opacity', v: opacity, s: setOpacity },
                ].map(({ label, v, s }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-slate-400">{label}</span>
                      <span className="text-[10px] text-slate-500">{v}{label === 'Opacity' ? '%' : ''}</span>
                    </div>
                    <input type="range" min={label === 'Opacity' ? 10 : -50} max={label === 'Opacity' ? 100 : 50} value={v}
                      onChange={e => s(Number(e.target.value))}
                      className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                  </div>
                ))}
                <button onClick={() => { setBrightness(0); setContrast(0); setSaturation(0); setOpacity(100); }}
                  className="w-full px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-lg">Reset</button>
              </div>
            </div>
          </div>

          {/* ── MAIN PREVIEW ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="px-4 py-2.5 bg-slate-750 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{scene.name}</span>
                  <span className="text-[10px] text-slate-400">{scene.product}</span>
                </div>
                <span className="text-[10px] text-slate-500">1200 × 800</span>
              </div>

              {/* ── THE MOCKUP ── */}
              <div ref={previewRef} className="relative overflow-hidden" style={{ aspectRatio: '3/2', background: scene.background }}>
                {/* Ambient lighting */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at 70% 20%, rgba(255,240,200,0.12) 0%, transparent 60%)',
                  pointerEvents: 'none', zIndex: 2,
                }} />

                {/* Design on product with CSS 3D transform */}
                {designImage && (
                  <div className="absolute" style={{
                    left: scene.designLeft,
                    top: scene.designTop,
                    width: scene.designWidth,
                    height: scene.designHeight,
                    transform: scene.designTransform,
                    borderRadius: scene.borderRadius || '0',
                    boxShadow: scene.boxShadow || 'none',
                    clipPath: scene.clipPath || 'none',
                    opacity: opacity / 100,
                    zIndex: 1,
                  }}>
                    <img
                      src={designImage}
                      alt="Design on product"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: scene.borderRadius || '0',
                        filter: filterStr,
                        mixBlendMode: (scene.blendMode as any) || 'normal',
                      }}
                    />
                  </div>
                )}

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
                  zIndex: 3,
                }} />

                {/* No-design placeholder */}
                {!designImage && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <p className="text-white/40 text-sm">Upload your design to preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-4 bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 mb-2">Tips</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Use high resolution images (1200px+ wide) for sharp results',
                  'PNG with transparent background works best for clean compositing',
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
