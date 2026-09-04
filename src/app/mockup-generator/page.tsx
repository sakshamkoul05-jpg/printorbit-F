'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import CustomerEditor from '@/components/mockup-v2/CustomerEditor';
import MockupSelector from '@/components/mockup-v2/MockupSelector';
import PropertiesPanel from '@/components/mockup-v2/PropertiesPanel';
import { Download, ImageIcon, AlertTriangle } from 'lucide-react';

interface ArtworkState {
  left: number; top: number; scaleX: number; scaleY: number; angle: number; opacity: number;
}

export default function MockupGeneratorPage() {
  const [selectedMockup, setSelectedMockup] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [metadataLoading, setMetadataLoading] = useState(false);
  const [metadataError, setMetadataError] = useState<string | null>(null);
  const [artworkDataUrl, setArtworkDataUrl] = useState<string | null>(null);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [artworkState, setArtworkState] = useState<ArtworkState | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Load metadata when mockup is selected
  useEffect(() => {
    if (!selectedMockup) { setMetadata(null); return; }
    setMetadataLoading(true);
    setMetadataError(null);
    fetch(`/mockups/${selectedMockup}/metadata.json`)
      .then(r => { if (!r.ok) throw new Error('Not found'); return r.json(); })
      .then(setMetadata)
      .catch(e => setMetadataError(e.message))
      .finally(() => setMetadataLoading(false));
  }, [selectedMockup]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setArtworkFile(file);
    const reader = new FileReader();
    reader.onload = () => setArtworkDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleArtworkChange = useCallback((state: ArtworkState | null) => {
    setArtworkState(state);
  }, []);

  const handlePropertyChange = useCallback((update: Partial<ArtworkState>) => {
    setArtworkState(prev => prev ? { ...prev, ...update } : null);
  }, []);

  const handleExport = useCallback(async () => {
    if (!selectedMockup || !artworkDataUrl || !artworkState || !metadata) return;
    setIsExporting(true);
    try {
      // Use the render engine pipeline for export
      const { renderPipeline, exportResult } = await import('@/lib/render-engine');
      const { loadMockupAssets } = await import('@/lib/render-engine/assets/loader');
      const { parseMetadata } = await import('@/lib/render-engine/assets/metadata');

      const meta = parseMetadata(metadata);
      const assets = await loadMockupAssets(`/mockups/${selectedMockup}/`, meta);

      const artworkImg = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = artworkDataUrl;
      });

      const cvs = document.createElement('canvas');
      cvs.width = artworkImg.naturalWidth;
      cvs.height = artworkImg.naturalHeight;
      const ctx = cvs.getContext('2d')!;
      ctx.drawImage(artworkImg, 0, 0);
      const artworkData = ctx.getImageData(0, 0, cvs.width, cvs.height);

      const imageData = await renderPipeline(artworkData, assets, meta, {
        colorAdjustments: {
          brightness: 1, contrast: 1, saturation: 1, exposure: 0,
          highlights: 0, shadows: 0, whites: 0, blacks: 0,
          temperature: 0, tint: 0, vibrance: 0, curves: [],
        },
        shadowIntensity: 1,
        highlightIntensity: 1,
        reflectionIntensity: 1,
        textureIntensity: 1,
        displacementIntensity: 1,
        outputWidth: metadata.width * 2,
        outputHeight: metadata.height * 2,
        antiAlias: true,
        scale: 2,
      });

      const result = await exportResult(imageData, 'png', {
        filename: `${selectedMockup}-mockup-${Date.now()}.png`,
        dpi: meta.dpi,
      });

      if (!result.success) {
        alert('Export failed: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Export error:', err);
      alert('Export failed. Check console for details.');
    } finally {
      setIsExporting(false);
    }
  }, [selectedMockup, artworkDataUrl, artworkState, metadata]);

  const canExport = selectedMockup && artworkDataUrl && artworkState && metadata && !isExporting;

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0f172a' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
        <Container>
          <div className="py-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <Link href="/" className="text-xs text-primary hover-underline mb-1 d-inline-block">
                ← Back to Home
              </Link>
              <h1 className="text-xl text-md-2xl fw-bold text-white font-heading">Mockup Generator</h1>
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>Place your design on photorealistic product mockups</p>
            </div>
            {canExport && (
              <button onClick={handleExport}
                className="px-5 py-2 bg-primary text-white text-xs fw-medium rounded-xl shadow-lg d-flex align-items-center gap-2"
                style={{ boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)' }}>
                <Download size={16} />
                {isExporting ? 'Exporting...' : 'Export Mockup'}
              </button>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6 d-flex flex-column flex-xl-row gap-4">
          {/* Left sidebar */}
          <div className="w-100 d-flex flex-column gap-4" style={{ maxWidth: '256px' }}>
            <MockupSelector
              selectedId={selectedMockup}
              onSelect={setSelectedMockup}
            />

            {selectedMockup && (
              <div className="rounded-xl p-4" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                <p className="text-xs fw-bold text-uppercase tracking-wider mb-3" style={{ color: '#cbd5e1' }}>Artwork</p>
                {artworkDataUrl ? (
                  <div>
                    <div className="rounded-lg p-2 mb-2" style={{ backgroundColor: '#334155' }}>
                      <img src={artworkDataUrl} alt="Artwork preview" className="w-100 rounded" style={{ height: '80px', objectFit: 'contain' }} />
                    </div>
                    <div className="d-flex align-items-center gap-1" style={{ fontSize: '10px', color: '#64748b' }}>
                      {artworkFile && <span>{artworkFile.name}</span>}
                    </div>
                    <button onClick={() => { setArtworkDataUrl(null); setArtworkFile(null); setArtworkState(null); }}
                      className="mt-2 text-danger" style={{ fontSize: '10px' }}>Remove</button>
                  </div>
                ) : (
                  <label className="d-block">
                    <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer" style={{ borderColor: '#475569' }}>
                      <ImageIcon size={24} className="mx-auto mb-2" style={{ color: '#64748b' }} />
                      <p style={{ fontSize: '11px', color: '#94a3b8' }}>Upload your design</p>
                      <p className="mt-1" style={{ fontSize: '9px', color: '#475569' }}>PNG, JPG, WebP</p>
                    </div>
                    <input id="artwork-upload" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileUpload} className="d-none" />
                  </label>
                )}
              </div>
            )}

            {artworkState && (
              <PropertiesPanel
                artwork={artworkState}
                onChange={handlePropertyChange}
                onReset={() => setArtworkState(null)}
              />
            )}
          </div>

          {/* Main canvas */}
          <div className="flex-grow-1" style={{ minWidth: 0 }}>
            {selectedMockup && metadata && (
              <CustomerEditor
                mockupId={selectedMockup}
                metadata={metadata}
                artworkDataUrl={artworkDataUrl}
                onArtworkChange={handleArtworkChange}
                onUploadClick={() => document.getElementById('artwork-upload')?.click()}
              />
            )}

            {selectedMockup && metadataLoading && (
              <div className="rounded-xl p-12 text-center" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Loading mockup data...</p>
              </div>
            )}

            {selectedMockup && metadataError && (
              <div className="rounded-xl p-12 text-center" style={{ backgroundColor: '#1e293b', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
                <AlertTriangle size={32} className="mx-auto mb-2 text-danger" />
                <p className="text-xs text-danger mb-1">Failed to load mockup</p>
                <p style={{ fontSize: '10px', color: '#64748b' }}>No metadata.json found at <code className="text-primary">/mockups/{selectedMockup}/</code></p>
                <p className="mt-1" style={{ fontSize: '10px', color: '#475569' }}>Create one with the <Link href="/admin/mockup-editor" className="text-primary hover-underline">Admin Editor</Link></p>
              </div>
            )}

            {!selectedMockup && (
              <div className="rounded-xl p-12 d-flex flex-column align-items-center justify-content-center text-center" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                <div className="rounded-2xl d-flex align-items-center justify-content-center mb-4" style={{ width: '64px', height: '64px', backgroundColor: '#334155' }}>
                  <svg style={{ width: '32px', height: '32px', color: '#64748b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm fw-bold text-white mb-1">Select a Mockup</h3>
                <p className="text-xs" style={{ color: '#94a3b8', maxWidth: '400px' }}>Pick a product from the sidebar, upload your design, and position it on the mockup canvas.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
