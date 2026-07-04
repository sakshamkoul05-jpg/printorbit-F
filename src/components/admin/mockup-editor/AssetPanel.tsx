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
    <div className="space-y-2">
      <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Mockup Assets</p>

      {ASSET_SLOTS.map(slot => {
        const uploaded = uploads[slot.key];
        return (
          <div key={slot.key}
            className="bg-slate-800 rounded-lg border border-slate-700 p-3 transition-colors hover:border-slate-600"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: slot.color }} />
                <div>
                  <span className="text-xs font-medium text-slate-200">{slot.label}</span>
                  <span className="text-[9px] text-slate-500 ml-2">{slot.description}</span>
                </div>
              </div>
              {slot.required && <span className="text-[9px] text-red-400">*required</span>}
            </div>

            {uploaded ? (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded bg-slate-700 overflow-hidden shrink-0">
                  <img src={uploaded.dataUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] text-slate-400 truncate flex-1">{uploaded.name}</span>
                <button onClick={() => removeAsset(slot.key)}
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3 h-3" />
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
        className="flex items-center gap-2 p-2 border border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
      >
        <Upload className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span className="text-[10px] text-slate-500">Drop or click to upload</span>
      </div>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg" className="hidden"
        onChange={e => { if (e.target.files?.[0]) onUpload(slot, e.target.files[0]); }} />
    </>
  );
}
