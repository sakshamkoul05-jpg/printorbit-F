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
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
      <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Your Design</p>

      {currentFile ? (
        <div className="space-y-3">
          <div className="relative w-full aspect-[3/2] bg-slate-700 rounded-lg overflow-hidden">
            <img src={currentFile.dataUrl} alt="design" className="w-full h-full object-contain" />
            {loading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <File className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300 truncate flex-1">{currentFile.name}</span>
            {v?.valid ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            )}
          </div>
          {v && !v.valid && (
            <div className="text-[10px] text-red-400 space-y-0.5">
              {v.errors.map((e, i) => <p key={i}>{e}</p>)}
            </div>
          )}
          {v?.warnings && v.warnings.length > 0 && (
            <div className="text-[10px] text-amber-400 space-y-0.5">
              {v.warnings.map((w, i) => <p key={i}>{w}</p>)}
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={() => fileRef.current?.click()}
              className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors">
              Replace
            </button>
            <button onClick={onRemove}
              className="px-3 py-1.5 bg-red-900/50 hover:bg-red-800/50 text-red-300 text-xs rounded-lg transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={cn(
            'w-full aspect-[3/2] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all',
            dragOver ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 hover:border-blue-500',
          )}
        >
          {loading ? (
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Upload className={cn('w-8 h-8 mb-2', dragOver ? 'text-blue-400' : 'text-slate-500')} />
              <p className="text-xs text-slate-400">Drop your design</p>
              <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, SVG</p>
            </>
          )}
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleChange} className="hidden" />
    </div>
  );
}
