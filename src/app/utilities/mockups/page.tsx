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
    <div className="min-vh-100" style={{ backgroundColor: '#0f172a' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
        <Container>
          <div className="py-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <Link href="/utilities" className="text-xs text-primary hover-underline mb-1 d-inline-block">← Back to Utilities</Link>
              <h1 className="text-xl text-md-2xl fw-bold text-white font-heading">Mockup Scene Generator</h1>
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>Place your design on professional product scenes</p>
            </div>
            {designImage && (
              <div className="d-flex gap-2">
                {[1, 2, 3].map(s => (
                  <button key={s} onClick={() => handleExport(s)} disabled={exporting}
                    className="px-4 py-2 bg-primary text-white text-xs fw-medium rounded-lg">
                    {exporting ? '...' : `Export ${s}×`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6 d-flex flex-column flex-xl-row gap-4">
          {/* ── LEFT SIDEBAR ── */}
          <div className="w-100 d-flex flex-column gap-4" style={{ maxWidth: '256px' }}>
            {/* Upload */}
            <div className="rounded-xl p-4" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <p className="text-xs fw-bold text-uppercase tracking-wider mb-3" style={{ color: '#cbd5e1' }}>Your Design</p>
              {designImage ? (
                <div className="d-flex flex-column gap-3">
                  <div className="w-100 position-relative rounded-lg overflow-hidden" style={{ aspectRatio: '3/2', backgroundColor: '#334155' }}>
                    <img src={designImage} alt="design" className="w-100 h-100" style={{ objectFit: 'contain' }} />
                  </div>
                  <p className="truncate" style={{ fontSize: '10px', color: '#94a3b8' }}>{designFileName}</p>
                  <div className="d-flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="flex-grow-1 px-3 py-2 bg-secondary text-white text-xs rounded-lg">Replace</button>
                    <button onClick={() => { setDesignImage(null); setDesignFileName(''); }} className="px-3 py-2 text-xs rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.5)', color: '#fca5a5' }}>Remove</button>
                  </div>
                </div>
              ) : (
                <div onDragOver={e => e.preventDefault()} onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-100 border-2 border-dashed rounded-lg d-flex flex-column align-items-center justify-content-center cursor-pointer"
                  style={{ aspectRatio: '3/2', borderColor: '#475569' }}>
                  <svg style={{ width: '32px', height: '32px', color: '#64748b', marginBottom: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
                  </svg>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>Drop your design</p>
                  <p className="mt-1" style={{ fontSize: '10px', color: '#64748b' }}>PNG, JPG</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="d-none" />
            </div>

            {/* Categories */}
            <div className="rounded-xl p-4" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <p className="text-xs fw-bold text-uppercase tracking-wider mb-3" style={{ color: '#cbd5e1' }}>Product Type</p>
              <div className="d-flex flex-column gap-1" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setScene(SCENES.find(s => s.product === cat) || SCENES[0]); }}
                    className={`w-100 text-start px-3 py-2 rounded-lg text-xs fw-medium ${activeCategory === cat ? 'bg-primary text-white' : ''}`}
                    style={{ color: activeCategory === cat ? undefined : '#cbd5e1' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenes */}
            <div className="rounded-xl p-4" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <p className="text-xs fw-bold text-uppercase tracking-wider mb-3" style={{ color: '#cbd5e1' }}>Scenes</p>
              <div className="d-flex flex-column gap-2" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {filteredScenes.map(s => (
                  <button key={s.id} onClick={() => setScene(s)}
                    className={`w-100 text-start p-2 rounded-lg border ${scene.id === s.id ? 'border-primary' : 'border-secondary'}`}
                    style={{ backgroundColor: scene.id === s.id ? 'rgba(59, 130, 246, 0.1)' : 'rgba(51, 65, 85, 0.5)' }}>
                    <div className="w-100 rounded-md overflow-hidden mb-1" style={{ height: '56px', background: s.background }}>
                      {designImage && scene.id === s.id && (
                        <img src={designImage} alt="" className="w-100 h-100" style={{ objectFit: 'cover', opacity: 0.5 }} />
                      )}
                    </div>
                    <p className="fw-medium" style={{ fontSize: '11px', color: '#e2e8f0' }}>{s.name}</p>
                    <p style={{ fontSize: '9px', color: '#64748b' }}>{s.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Adjustments */}
            <div className="rounded-xl p-4" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <p className="text-xs fw-bold text-uppercase tracking-wider mb-3" style={{ color: '#cbd5e1' }}>Adjustments</p>
              <div className="d-flex flex-column gap-3">
                {[
                  { label: 'Brightness', v: brightness, s: setBrightness },
                  { label: 'Contrast', v: contrast, s: setContrast },
                  { label: 'Saturation', v: saturation, s: setSaturation },
                  { label: 'Opacity', v: opacity, s: setOpacity },
                ].map(({ label, v, s }) => (
                  <div key={label}>
                    <div className="d-flex justify-content-between mb-1">
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>{label}</span>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{v}{label === 'Opacity' ? '%' : ''}</span>
                    </div>
                    <input type="range" min={label === 'Opacity' ? 10 : -50} max={label === 'Opacity' ? 100 : 50} value={v}
                      onChange={e => s(Number(e.target.value))}
                      className="w-100" style={{ height: '4px', backgroundColor: '#334155', borderRadius: '8px', accentColor: '#3b82f6' }} />
                  </div>
                ))}
                <button onClick={() => { setBrightness(0); setContrast(0); setSaturation(0); setOpacity(100); }}
                  className="w-100 px-3 py-2 bg-secondary text-xs rounded-lg" style={{ color: '#cbd5e1' }}>Reset</button>
              </div>
            </div>
          </div>

          {/* ── MAIN PREVIEW ── */}
          <div className="flex-grow-1" style={{ minWidth: 0 }}>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <div className="px-4 py-2 d-flex align-items-center justify-content-between" style={{ backgroundColor: '#334155', borderBottom: '1px solid #334155' }}>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-xs fw-bold text-white">{scene.name}</span>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>{scene.product}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#64748b' }}>1200 × 800</span>
              </div>

              {/* ── THE MOCKUP ── */}
              <div ref={previewRef} className="position-relative overflow-hidden" style={{ aspectRatio: '3/2', background: scene.background }}>
                {/* Ambient lighting */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                  background: 'radial-gradient(ellipse at 70% 20%, rgba(255,240,200,0.12) 0%, transparent 60%)',
                  pointerEvents: 'none', zIndex: 2,
                }} />

                {/* Design on product with CSS 3D transform */}
                {designImage && (
                  <div className="position-absolute" style={{
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
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                  background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
                  pointerEvents: 'none',
                  zIndex: 3,
                }} />

                {/* No-design placeholder */}
                {!designImage && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 10 }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)' }} className="text-sm">Upload your design to preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <p className="text-xs fw-bold mb-2" style={{ color: '#cbd5e1' }}>Tips</p>
              <div className="row g-2">
                {[
                  'Use high resolution images (1200px+ wide) for sharp results',
                  'PNG with transparent background works best for clean compositing',
                  'Adjust brightness/contrast to match the scene lighting',
                ].map((t, i) => (
                  <div key={i} className="col-12 col-sm-4 d-flex align-items-start gap-2">
                    <span className="text-primary text-xs mt-1">→</span>
                    <p style={{ fontSize: '10px', color: '#94a3b8' }}>{t}</p>
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
