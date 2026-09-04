'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, Image, Download, Trash2, Eye } from 'lucide-react';

interface AssetUploadPanelProps {
  onBackgroundUpload: (file: File, dataUrl: string) => void;
  onMaskUpload: (file: File, dataUrl: string) => void;
  onAssetUpload: (type: string, file: File, dataUrl: string) => void;
  backgroundUrl: string | null;
  maskUrl: string | null;
}

interface AssetSlot {
  key: string;
  label: string;
  description: string;
  required: boolean;
  color: string;
}

const ASSET_SLOTS: AssetSlot[] = [
  { key: 'background', label: 'Background', description: 'Product photo', required: true, color: '#3b82f6' },
  { key: 'mask', label: 'Mask', description: 'Printable area mask (alpha)', required: true, color: '#10b981' },
  { key: 'shadows', label: 'Shadows', description: 'Shadow map (grayscale)', required: false, color: '#f59e0b' },
  { key: 'highlights', label: 'Highlights', description: 'Highlight map (grayscale)', required: false, color: '#ef4444' },
  { key: 'reflection', label: 'Reflection', description: 'Reflection/gloss map', required: false, color: '#8b5cf6' },
  { key: 'displacement', label: 'Displacement', description: 'Height map for warp', required: false, color: '#ec4899' },
  { key: 'texture', label: 'Texture', description: 'Surface texture overlay', required: false, color: '#14b8a6' },
];

export default function AssetUploadPanel({
  onBackgroundUpload, onMaskUpload, onAssetUpload,
  backgroundUrl, maskUrl,
}: AssetUploadPanelProps) {
  const [uploads, setUploads] = useState<Record<string, { name: string; dataUrl: string }>>({});

  const handleFile = useCallback((slot: AssetSlot, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setUploads(prev => ({ ...prev, [slot.key]: { name: file.name, dataUrl } }));
      if (slot.key === 'background') onBackgroundUpload(file, dataUrl);
      else if (slot.key === 'mask') onMaskUpload(file, dataUrl);
      else onAssetUpload(slot.key, file, dataUrl);
    };
    reader.readAsDataURL(file);
  }, [onBackgroundUpload, onMaskUpload, onAssetUpload]);

  const removeAsset = useCallback((key: string) => {
    setUploads(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  return (
    <div className="d-flex flex-column gap-2">
      <p className="mb-3" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mockup Assets</p>

      {ASSET_SLOTS.map(slot => {
        const uploaded = uploads[slot.key];
        return (
          <div key={slot.key}
            className="rounded p-2"
            style={{ backgroundColor: '#1e293b', border: '1px solid #334155', transition: 'border-color 0.15s' }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: slot.color }} />
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#e2e8f0' }}>{slot.label}</span>
                  <span style={{ fontSize: '9px', color: '#64748b', marginLeft: '0.5rem' }}>{slot.description}</span>
                </div>
              </div>
              {slot.required && <span style={{ fontSize: '9px', color: '#f87171' }}>*required</span>}
            </div>

            {uploaded ? (
              <div className="d-flex align-items-center gap-2">
                <div className="rounded overflow-hidden shrink-0" style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#334155' }}>
                  <img src={uploaded.dataUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span className="text-truncate flex-fill" style={{ fontSize: '10px', color: '#94a3b8' }}>{uploaded.name}</span>
                <button onClick={() => removeAsset(slot.key)}
                  className="btn p-1"
                  style={{ color: '#64748b', transition: 'color 0.15s', border: 'none', backgroundColor: 'transparent' }}>
                  <Trash2 size={12} />
                </button>
              </div>
            ) : (
              <UploadSlot slot={slot} onUpload={handleFile} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function UploadSlot({ slot, onUpload }: { slot: AssetSlot; onUpload: (slot: AssetSlot, file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onUpload(slot, file);
  }, [slot, onUpload]);

  return (
    <>
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="d-flex align-items-center gap-2 rounded"
        style={{ padding: '0.5rem', border: '1px dashed #475569', cursor: 'pointer', transition: 'border-color 0.15s' }}
      >
        <Upload size={14} style={{ color: '#64748b', flexShrink: 0 }} />
        <span style={{ fontSize: '10px', color: '#64748b' }}>Drop or click to upload</span>
      </div>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg" className="d-none"
        onChange={e => { if (e.target.files?.[0]) onUpload(slot, e.target.files[0]); }} />
    </>
  );
}
