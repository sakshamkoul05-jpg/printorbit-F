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
      <div className="rounded-3 p-3" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
        <p className="mb-0" style={{ fontSize: '10px', color: '#94a3b8' }}>Upload artwork to see properties</p>
      </div>
    );
  }

  const NumField = ({ label, value, step = 1, min, max, onChange: set }: {
    label: string; value: number; step?: number; min?: number; max?: number;
    onChange: (v: number) => void;
  }) => (
    <div>
      <label className="d-block mb-0" style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <div className="d-flex align-items-center" style={{ gap: '0.25rem' }}>
        <button onClick={() => set(Math.max(min ?? -Infinity, value - step))}
          className="btn"
          style={{ padding: '0.25rem 0.375rem', backgroundColor: '#334155', color: '#94a3b8', borderRadius: '0.25rem', fontSize: '10px', border: 'none' }}>−</button>
        <input type="number" value={Math.round(value * 100) / 100}
          onChange={e => set(Number(e.target.value))}
          min={min} max={max} step={step}
          className="w-100 text-center"
          style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.25rem', padding: '0.25rem 0.375rem', fontSize: '0.6875rem', color: '#e2e8f0', outline: 'none', fontFamily: 'monospace' }} />
        <button onClick={() => set(Math.min(max ?? Infinity, value + step))}
          className="btn"
          style={{ padding: '0.25rem 0.375rem', backgroundColor: '#334155', color: '#94a3b8', borderRadius: '0.25rem', fontSize: '10px', border: 'none' }}>+</button>
      </div>
    </div>
  );

  return (
    <div className="rounded-3 p-3 d-flex flex-column gap-2" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <div className="d-flex align-items-center justify-content-between">
        <p className="mb-0" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Properties</p>
        <button onClick={onReset}
          className="btn p-0"
          style={{ fontSize: '10px', color: '#64748b', transition: 'color 0.15s' }}>Reset</button>
      </div>

      <p className="mb-0" style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>Position</p>
      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
        <NumField label="X" value={Math.round(artwork.left)} step={1} onChange={v => onChange({ left: v })} />
        <NumField label="Y" value={Math.round(artwork.top)} step={1} onChange={v => onChange({ top: v })} />
      </div>

      <p className="mb-0" style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>Size</p>
      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
        <NumField label="W" value={Math.round(artwork.scaleX * 100)} step={5} min={1} max={500} onChange={v => onChange({ scaleX: v / 100, scaleY: v / 100 })} />
        <NumField label="H" value={Math.round(artwork.scaleY * 100)} step={5} min={1} max={500} onChange={v => onChange({ scaleX: v / 100, scaleY: v / 100 })} />
      </div>

      <p className="mb-0" style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>Rotation</p>
      <NumField label="°" value={Math.round(artwork.angle)} step={5} min={-360} max={360} onChange={v => onChange({ angle: v })} />

      <p className="mb-0" style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>Opacity</p>
      <div>
        <input type="range" min={0} max={1} step={0.01} value={artwork.opacity}
          onChange={e => onChange({ opacity: Number(e.target.value) })}
          className="w-100"
          style={{ height: '0.25rem', backgroundColor: '#334155', borderRadius: '0.5rem', accentColor: '#3b82f6', cursor: 'pointer' }} />
        <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>{Math.round(artwork.opacity * 100)}%</span>
      </div>

      <div style={{ paddingTop: '0.5rem', borderTop: '1px solid #334155' }}>
        <p className="mb-2" style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>Quick Align</p>
        <div className="d-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem' }}>
          {['←', '↔', '→'].map((sym, i) => (
            <button key={i}
              className="btn"
              style={{ padding: '0.375rem', backgroundColor: '#334155', color: '#cbd5e1', borderRadius: '0.25rem', fontSize: '0.75rem', transition: 'background-color 0.15s', border: 'none' }}>
              {sym}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
