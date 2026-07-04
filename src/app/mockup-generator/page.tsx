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
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <Container>
          <div className="py-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <Link href="/" className="text-xs text-blue-400 hover:underline mb-1 inline-block">
                ← Back to Home
              </Link>
              <h1 className="text-xl md:text-2xl font-bold text-white font-heading">Mockup Generator</h1>
              <p className="text-xs text-slate-400 mt-0.5">Place your design on photorealistic product mockups</p>
            </div>
            {canExport && (
              <button onClick={handleExport}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center gap-2">
                <Download className="w-4 h-4" />
                {isExporting ? 'Exporting...' : 'Export Mockup'}
              </button>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6 flex flex-col xl:flex-row gap-6">
          {/* Left sidebar */}
          <div className="w-full xl:w-64 shrink-0 space-y-4">
            <MockupSelector
              selectedId={selectedMockup}
              onSelect={setSelectedMockup}
            />

            {selectedMockup && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
                <p className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">Artwork</p>
                {artworkDataUrl ? (
                  <div>
                    <div className="bg-slate-700 rounded-lg p-2 mb-2">
                      <img src={artworkDataUrl} alt="Artwork preview" className="w-full h-20 object-contain rounded" />
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      {artworkFile && <span>{artworkFile.name}</span>}
                    </div>
                    <button onClick={() => { setArtworkDataUrl(null); setArtworkFile(null); setArtworkState(null); }}
                      className="mt-2 text-[10px] text-red-400 hover:text-red-300">Remove</button>
                  </div>
                ) : (
                  <label className="block">
                    <div className="border-2 border-dashed border-slate-600 rounded-xl p-4 text-center cursor-pointer hover:border-slate-500 transition-colors">
                      <ImageIcon className="w-6 h-6 mx-auto mb-1.5 text-slate-500" />
                      <p className="text-[11px] text-slate-400">Upload your design</p>
                      <p className="text-[9px] text-slate-600 mt-0.5">PNG, JPG, WebP</p>
                    </div>
                    <input id="artwork-upload" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileUpload} className="hidden" />
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
          <div className="flex-1 min-w-0">
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
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
                <p className="text-xs text-slate-400">Loading mockup data...</p>
              </div>
            )}

            {selectedMockup && metadataError && (
              <div className="bg-slate-800 rounded-xl border border-red-800/50 p-12 text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-400" />
                <p className="text-xs text-red-400 mb-1">Failed to load mockup</p>
                <p className="text-[10px] text-slate-500">No metadata.json found at <code className="text-blue-400">/mockups/{selectedMockup}/</code></p>
                <p className="text-[10px] text-slate-600 mt-1">Create one with the <Link href="/admin/mockup-editor" className="text-blue-400 hover:underline">Admin Editor</Link></p>
              </div>
            )}

            {!selectedMockup && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Select a Mockup</h3>
                <p className="text-xs text-slate-400 max-w-xs">Pick a product from the sidebar, upload your design, and position it on the mockup canvas.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
