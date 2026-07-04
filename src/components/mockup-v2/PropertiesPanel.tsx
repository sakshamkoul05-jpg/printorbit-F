'use client';

import { RotateCw, Lock, Unlock, AlignCenter, AlignLeft, AlignRight } from 'lucide-react';

interface PropertiesPanelProps {
  artwork: {
    left: number; top: number;
    scaleX: number; scaleY: number;
    angle: number; opacity: number;
  } | null;
  onChange: (update: Partial<{
    left: number; top: number;
    scaleX: number; scaleY: number;
    angle: number; opacity: number;
  }>) => void;
  onReset: () => void;
}

export default function PropertiesPanel({ artwork, onChange, onReset }: PropertiesPanelProps) {
  if (!artwork) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <p className="text-[10px] text-slate-400">Upload artwork to see properties</p>
      </div>
    );
  }

  const NumField = ({ label, value, step = 1, min, max, onChange: set }: {
    label: string; value: number; step?: number; min?: number; max?: number;
    onChange: (v: number) => void;
  }) => (
    <div>
      <label className="text-[9px] text-slate-500 block mb-0.5 uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-1">
        <button onClick={() => set(Math.max(min ?? -Infinity, value - step))}
          className="px-1.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-400 rounded text-[10px]">−</button>
        <input type="number" value={Math.round(value * 100) / 100}
          onChange={e => set(Number(e.target.value))}
          min={min} max={max} step={step}
          className="w-full bg-slate-700 border border-slate-600 rounded px-1.5 py-1 text-[11px] text-slate-200 text-center focus:outline-none focus:border-blue-500 font-mono" />
        <button onClick={() => set(Math.min(max ?? Infinity, value + step))}
          className="px-1.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-400 rounded text-[10px]">+</button>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Properties</p>
        <button onClick={onReset}
          className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors">Reset</button>
      </div>

      {/* Position */}
      <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium">Position</p>
      <div className="grid grid-cols-2 gap-2">
        <NumField label="X" value={Math.round(artwork.left)} step={1} onChange={v => onChange({ left: v })} />
        <NumField label="Y" value={Math.round(artwork.top)} step={1} onChange={v => onChange({ top: v })} />
      </div>

      {/* Size */}
      <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium">Size</p>
      <div className="grid grid-cols-2 gap-2">
        <NumField label="W" value={Math.round(artwork.scaleX * 100)} step={5} min={1} max={500} onChange={v => onChange({ scaleX: v / 100, scaleY: v / 100 })} />
        <NumField label="H" value={Math.round(artwork.scaleY * 100)} step={5} min={1} max={500} onChange={v => onChange({ scaleX: v / 100, scaleY: v / 100 })} />
      </div>

      {/* Rotation */}
      <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium">Rotation</p>
      <NumField label="°" value={Math.round(artwork.angle)} step={5} min={-360} max={360} onChange={v => onChange({ angle: v })} />

      {/* Opacity */}
      <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium">Opacity</p>
      <div>
        <input type="range" min={0} max={1} step={0.01} value={artwork.opacity}
          onChange={e => onChange({ opacity: Number(e.target.value) })}
          className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
        <span className="text-[10px] text-slate-500 font-mono">{Math.round(artwork.opacity * 100)}%</span>
      </div>

      {/* Quick align */}
      <div className="pt-2 border-t border-slate-700">
        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium mb-2">Quick Align</p>
        <div className="grid grid-cols-3 gap-1">
          {['←', '↔', '→'].map((sym, i) => (
            <button key={i}
              className="py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-xs transition-colors">
              {sym}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
