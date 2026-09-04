'use client';

import { useRef, useState, useCallback } from 'react';
import { Upload, File, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ValidationResult } from '@/types/mockup';

interface DesignUploadProps {
  onFileSelect: (file: File) => void;
  currentFile?: { name: string; dataUrl: string; validation?: ValidationResult } | null;
  onRemove?: () => void;
}

export default function DesignUpload({ onFileSelect, currentFile, onRemove }: DesignUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setLoading(true);
    await onFileSelect(file);
    setLoading(false);
  }, [onFileSelect]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  }, [handleFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const v = currentFile?.validation;

  return (
    <div className="rounded-3 p-3" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <p className="mb-3" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Design</p>

      {currentFile ? (
        <div className="d-flex flex-column gap-2">
          <div className="position-relative w-100 rounded overflow-hidden" style={{ aspectRatio: '3/2', backgroundColor: '#334155' }}>
            <img src={currentFile.dataUrl} alt="design" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            {loading && (
              <div className="position-absolute d-flex align-items-center justify-content-center" style={{ inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <div className="rounded-circle" style={{ width: '1.5rem', height: '1.5rem', border: '2px solid #60a5fa', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
              </div>
            )}
          </div>
          <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.75rem' }}>
            <File size={14} style={{ color: '#94a3b8' }} />
            <span className="text-truncate flex-fill" style={{ color: '#cbd5e1' }}>{currentFile.name}</span>
            {v?.valid ? (
              <CheckCircle2 size={14} style={{ color: '#4ade80', flexShrink: 0 }} />
            ) : (
              <AlertCircle size={14} style={{ color: '#fbbf24', flexShrink: 0 }} />
            )}
          </div>
          {v && !v.valid && (
            <div style={{ fontSize: '10px', color: '#f87171' }}>
              {v.errors.map((e, i) => <p key={i} className="mb-0">{e}</p>)}
            </div>
          )}
          {v?.warnings && v.warnings.length > 0 && (
            <div style={{ fontSize: '10px', color: '#fbbf24' }}>
              {v.warnings.map((w, i) => <p key={i} className="mb-0">{w}</p>)}
            </div>
          )}
          <div className="d-flex gap-2">
            <button onClick={() => fileRef.current?.click()}
              className="flex-fill btn"
              style={{ padding: '0.375rem 0.75rem', backgroundColor: '#334155', color: 'var(--bs-white)', fontSize: '0.75rem', borderRadius: '0.5rem', transition: 'background-color 0.15s', border: 'none' }}>
              Replace
            </button>
            <button onClick={onRemove}
              className="btn"
              style={{ padding: '0.375rem 0.75rem', backgroundColor: 'rgba(220,38,38,0.5)', color: '#fca5a5', fontSize: '0.75rem', borderRadius: '0.5rem', transition: 'background-color 0.15s', border: 'none' }}>
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className="d-flex flex-column align-items-center justify-content-center w-100 rounded"
          style={{
            aspectRatio: '3/2',
            border: `2px dashed ${dragOver ? '#3b82f6' : '#475569'}`,
            backgroundColor: dragOver ? 'rgba(59,130,246,0.1)' : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {loading ? (
            <div className="rounded-circle" style={{ width: '2rem', height: '2rem', border: '2px solid #60a5fa', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
          ) : (
            <>
              <Upload size={32} style={{ marginBottom: '0.5rem', color: dragOver ? '#60a5fa' : '#64748b' }} />
              <p className="mb-0" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Drop your design</p>
              <p className="mb-0 mt-1" style={{ fontSize: '10px', color: '#64748b' }}>PNG, JPG, SVG</p>
            </>
          )}
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleChange} className="d-none" />
    </div>
  );
}
