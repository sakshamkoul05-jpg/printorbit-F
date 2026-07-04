'use client';

import { useState } from 'react';
import { Download, X } from 'lucide-react';
import type { ExportFormat } from '@/types/mockup';

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: (format: ExportFormat, scale: number, dpi: number) => Promise<void>;
  exporting: boolean;
}

const FORMATS: { value: ExportFormat; label: string; mime: string }[] = [
  { value: 'png', label: 'PNG', mime: 'Lossless' },
  { value: 'jpeg', label: 'JPEG', mime: 'Small file' },
  { value: 'webp', label: 'WebP', mime: 'Modern format' },
];

const SCALES = [
  { value: 1, label: '1×', desc: '1200×800' },
  { value: 2, label: '2×', desc: '2400×1600' },
  { value: 3, label: '3×', desc: '3600×2400' },
];

export default function ExportDialog({ open, onClose, onExport, exporting }: ExportDialogProps) {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [scale, setScale] = useState(2);
  const [dpi, setDpi] = useState(300);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Export Mockup</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Format */}
        <div className="mb-4">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Format</p>
          <div className="grid grid-cols-3 gap-2">
            {FORMATS.map(f => (
              <button key={f.value} onClick={() => setFormat(f.value)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                  format === f.value
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                    : 'bg-slate-700 border-slate-600 text-slate-400 hover:border-slate-500'
                }`}
              >
                {f.label}
                <span className="block text-[8px] text-slate-500 mt-0.5">{f.mime}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scale */}
        <div className="mb-4">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Resolution</p>
          <div className="grid grid-cols-3 gap-2">
            {SCALES.map(s => (
              <button key={s.value} onClick={() => setScale(s.value)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                  scale === s.value
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                    : 'bg-slate-700 border-slate-600 text-slate-400 hover:border-slate-500'
                }`}
              >
                {s.label}
                <span className="block text-[8px] text-slate-500 mt-0.5">{s.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* DPI */}
        <div className="mb-5">
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-slate-400">DPI</span>
            <span className="text-[10px] text-slate-500 font-mono">{dpi}</span>
          </div>
          <input type="range" min={72} max={600} step={1} value={dpi}
            onChange={e => setDpi(Number(e.target.value))}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
          <div className="flex justify-between text-[8px] text-slate-600 mt-0.5">
            <span>72</span><span>300</span><span>600</span>
          </div>
        </div>

        {/* Export button */}
        <button onClick={() => onExport(format, scale, dpi)} disabled={exporting}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
          {exporting ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Exporting...</>
          ) : (
            <><Download className="w-4 h-4" /> Export {SCALES.find(s => s.value === scale)?.label} {format.toUpperCase()}</>
          )}
        </button>
      </div>
    </div>
  );
}
