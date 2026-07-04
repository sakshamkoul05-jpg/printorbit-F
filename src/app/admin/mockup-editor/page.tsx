'use client';

import { useState, useCallback, useRef } from 'react';
import { ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';
import CanvasEditor from '@/components/admin/mockup-editor/CanvasEditor';
import AssetPanel from '@/components/admin/mockup-editor/AssetPanel';
import MetadataPanel, { type MetadataValues } from '@/components/admin/mockup-editor/MetadataPanel';
import Container from '@/components/ui/Container';

const DEFAULT_METADATA: MetadataValues = {
  id: '',
  name: '',
  product: 'tshirt',
  category: 'Apparel',
  description: '',
  width: 1200,
  height: 800,
  printArea: { x: 200, y: 200, width: 600, height: 400 },
  blend: 'multiply',
  shadowOpacity: 0.65,
  highlightOpacity: 0.42,
  reflectionOpacity: 0.3,
  textureStrength: 0.55,
  displacementStrength: 18,
  surfaceTexture: 'fabric',
  dpi: 300,
};

export default function AdminMockupEditorPage() {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [maskUrl, setMaskUrl] = useState<string | null>(null);
  const [corners, setCorners] = useState<{ x: number; y: number }[]>([
    { x: 220, y: 180 },
    { x: 580, y: 180 },
    { x: 580, y: 520 },
    { x: 220, y: 520 },
  ]);
  const [printArea, setPrintArea] = useState(DEFAULT_METADATA.printArea);
  const [metadata, setMetadata] = useState<MetadataValues>(DEFAULT_METADATA);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [uploads, setUploads] = useState<Record<string, { name: string; dataUrl: string }>>({});
  const previewRef = useRef<HTMLDivElement>(null);

  const updateMetadata = useCallback((values: MetadataValues) => {
    setMetadata(values);
    setPrintArea(values.printArea);
  }, []);

  const handleBackgroundUpload = useCallback((file: File, dataUrl: string) => {
    setBackgroundUrl(dataUrl);
    setUploads(prev => ({ ...prev, background: { name: file.name, dataUrl } }));
  }, []);

  const handleMaskUpload = useCallback((file: File, dataUrl: string) => {
    setMaskUrl(dataUrl);
    setUploads(prev => ({ ...prev, mask: { name: file.name, dataUrl } }));
  }, []);

  const handleAssetUpload = useCallback((type: string, file: File, dataUrl: string) => {
    setUploads(prev => ({ ...prev, [type]: { name: file.name, dataUrl } }));
  }, []);

  const handlePreview = useCallback(async () => {
    if (!backgroundUrl) return;
    setIsPreviewing(true);

    try {
      // Render preview using the engine pipeline
      const canvas = document.createElement('canvas');
      canvas.width = metadata.width;
      canvas.height = metadata.height;
      const ctx = canvas.getContext('2d')!;

      // Draw background
      const bg = new Image();
      bg.src = backgroundUrl;
      await new Promise(r => { bg.onload = r; bg.onerror = r; });
      ctx.drawImage(bg, 0, 0, metadata.width, metadata.height);

      // Draw test artwork (colorful gradient) through perspective warp
      if (maskUrl) {
        drawTestArtwork(ctx, corners, metadata);
      }

      // Apply simple shadow if shadows asset loaded
      if (uploads.shadows) {
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(0, 0, metadata.width, metadata.height);
      }

      setPreviewUrl(canvas.toDataURL('image/png'));
    } catch (err) {
      console.error('Preview error:', err);
    } finally {
      setIsPreviewing(false);
    }
  }, [backgroundUrl, maskUrl, corners, metadata, uploads]);

  const handleExport = useCallback(() => {
    // Build metadata.json from current state
    const metaJson = {
      id: metadata.id || `mockup-${Date.now()}`,
      name: metadata.name || 'Untitled Mockup',
      product: metadata.product,
      category: metadata.category,
      description: metadata.description,
      width: metadata.width,
      height: metadata.height,
      printArea: {
        x: printArea.x, y: printArea.y,
        width: printArea.width, height: printArea.height,
      },
      corners: corners.map(c => [Math.round(c.x), Math.round(c.y)]),
      blend: metadata.blend,
      shadowOpacity: metadata.shadowOpacity,
      highlightOpacity: metadata.highlightOpacity,
      reflectionOpacity: metadata.reflectionOpacity,
      textureStrength: metadata.textureStrength,
      displacementStrength: metadata.displacementStrength,
      surfaceTexture: metadata.surfaceTexture,
      dpi: metadata.dpi,
      colorSpace: 'sRGB',
      assets: {
        background: 'background.png',
        mask: 'mask.png',
        ...(uploads.shadows ? { shadows: 'shadows.png' } : {}),
        ...(uploads.highlights ? { highlights: 'highlights.png' } : {}),
        ...(uploads.reflection ? { reflection: 'reflection.png' } : {}),
        ...(uploads.displacement ? { displacement: 'displacement.png' } : {}),
        ...(uploads.texture ? { texture: 'texture.png' } : {}),
      },
    };

    const jsonBlob = new Blob([JSON.stringify(metaJson, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(jsonBlob);
    link.download = `mockup-${metadata.product || 'mockup'}-metadata.json`;
    link.click();

    alert(`metadata.json exported!\n\nPlace all assets in:\npublic/mockups/${metadata.product || 'mockup'}/\n\nThen the render engine will use them automatically.`);
  }, [metadata, printArea, corners, uploads]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-xs text-blue-400 hover:underline mb-1 inline-block flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back to Admin
              </Link>
              <h1 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-400" />
                Mockup Editor
              </h1>
              <p className="text-xs text-slate-400">Upload product photos, set printable areas, adjust perspective corners</p>
            </div>
            <span className={`text-[10px] px-2 py-1 rounded-full ${backgroundUrl ? 'bg-green-900/30 text-green-400' : 'bg-slate-700 text-slate-500'}`}>
              {backgroundUrl ? 'Product loaded' : 'No product'}
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6 flex flex-col xl:flex-row gap-6">
          {/* LEFT: Asset Upload */}
          <div className="w-full xl:w-64 shrink-0">
            <AssetPanel
              onBackgroundUpload={handleBackgroundUpload}
              onMaskUpload={handleMaskUpload}
              onAssetUpload={handleAssetUpload}
              backgroundUrl={backgroundUrl}
              maskUrl={maskUrl}
            />
          </div>

          {/* CENTER: Canvas Editor */}
          <div className="flex-1 min-w-0">
            <CanvasEditor
              backgroundUrl={backgroundUrl}
              maskUrl={maskUrl}
              printArea={printArea}
              corners={corners}
              onPrintAreaChange={setPrintArea}
              onCornersChange={setCorners}
            />

            {/* Render Preview */}
            {previewUrl && (
              <div ref={previewRef} className="mt-4 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">Render Preview</span>
                  <span className="text-[10px] text-slate-500">{metadata.width}×{metadata.height}px</span>
                </div>
                <div className="p-4">
                  <img src={previewUrl} alt="Render preview" className="w-full rounded-lg" />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Metadata + Controls */}
          <div className="w-full xl:w-72 shrink-0">
            <MetadataPanel
              metadata={metadata}
              onChange={updateMetadata}
              onExport={handleExport}
              onPreview={handlePreview}
              isPreviewing={isPreviewing}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

/**
 * Draw test artwork with perspective warp for preview purposes.
 * Uses a colorful checkerboard + text to demonstrate the perspective mapping.
 */
function drawTestArtwork(
  ctx: CanvasRenderingContext2D,
  corners: { x: number; y: number }[],
  meta: MetadataValues,
) {
  const c = corners;
  const minX = Math.min(...c.map(p => p.x));
  const minY = Math.min(...c.map(p => p.y));
  const maxX = Math.max(...c.map(p => p.x));
  const maxY = Math.max(...c.map(p => p.y));
  const w = maxX - minX;
  const h = maxY - minY;
  if (w <= 0 || h <= 0) return;

  // Draw checkerboard pattern
  const cols = 8, rows = 6;
  const cellW = w / cols;
  const cellH = h / rows;

  // Create offscreen canvas for the artwork
  const artCanvas = document.createElement('canvas');
  artCanvas.width = w;
  artCanvas.height = h;
  const actx = artCanvas.getContext('2d')!;

  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bff', '#ff9f43'];
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      actx.fillStyle = colors[(r + col) % colors.length];
      actx.fillRect(col * cellW, r * cellH, cellW, cellH);
    }
  }

  // Draw "YOUR ARTWORK" text
  actx.fillStyle = 'rgba(255,255,255,0.9)';
  actx.font = `bold ${Math.min(w, h) * 0.08}px sans-serif`;
  actx.textAlign = 'center';
  actx.textBaseline = 'middle';
  actx.fillText('YOUR ARTWORK', w / 2, h / 2 - 20);
  actx.font = `${Math.min(w, h) * 0.04}px sans-serif`;
  actx.fillStyle = 'rgba(255,255,255,0.6)';
  actx.fillText('Drag corners to adjust perspective', w / 2, h / 2 + 30);

  // Apply perspective warp using canvas transform
  ctx.save();
  ctx.setTransform(
    (c[1].x - c[0].x) / w, (c[1].y - c[0].y) / h,
    (c[3].x - c[0].x) / w, (c[3].y - c[0].y) / h,
    c[0].x, c[0].y,
  );
  ctx.drawImage(artCanvas, 0, 0);
  ctx.restore();

  // Draw border around printable area
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(c[0].x, c[0].y);
  ctx.lineTo(c[1].x, c[1].y);
  ctx.lineTo(c[2].x, c[2].y);
  ctx.lineTo(c[3].x, c[3].y);
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);
}
