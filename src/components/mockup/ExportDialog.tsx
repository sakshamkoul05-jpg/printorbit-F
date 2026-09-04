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
    <div className="position-fixed d-flex align-items-center justify-content-center" style={{ inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div className="w-100 mx-3" style={{ maxWidth: '24rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-2">
            <Download size={16} style={{ color: '#60a5fa' }} />
            <h3 className="mb-0" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--bs-white)' }}>Export Mockup</h3>
          </div>
          <button onClick={onClose} className="btn p-1" style={{ borderRadius: '0.5rem', transition: 'background-color 0.15s' }}>
            <X size={16} style={{ color: '#94a3b8' }} />
          </button>
        </div>

        <div className="mb-3">
          <p className="mb-2" style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Format</p>
          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {FORMATS.map(f => (
              <button key={f.value} onClick={() => setFormat(f.value)}
                className="btn text-center"
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  transition: 'all 0.15s',
                  backgroundColor: format === f.value ? 'rgba(37,99,235,0.2)' : '#334155',
                  border: `1px solid ${format === f.value ? '#3b82f6' : '#475569'}`,
                  color: format === f.value ? '#60a5fa' : '#94a3b8',
                }}
              >
                {f.label}
                <span className="d-block" style={{ fontSize: '8px', color: '#64748b', marginTop: '0.125rem' }}>{f.mime}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-2" style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resolution</p>
          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {SCALES.map(s => (
              <button key={s.value} onClick={() => setScale(s.value)}
                className="btn text-center"
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  transition: 'all 0.15s',
                  backgroundColor: scale === s.value ? 'rgba(37,99,235,0.2)' : '#334155',
                  border: `1px solid ${scale === s.value ? '#3b82f6' : '#475569'}`,
                  color: scale === s.value ? '#60a5fa' : '#94a3b8',
                }}
              >
                {s.label}
                <span className="d-block" style={{ fontSize: '8px', color: '#64748b', marginTop: '0.125rem' }}>{s.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between mb-1">
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>DPI</span>
            <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>{dpi}</span>
          </div>
          <input type="range" min={72} max={600} step={1} value={dpi}
            onChange={e => setDpi(Number(e.target.value))}
            className="w-100"
            style={{ height: '0.25rem', backgroundColor: '#334155', borderRadius: '0.5rem', accentColor: '#3b82f6', cursor: 'pointer' }} />
          <div className="d-flex justify-content-between" style={{ fontSize: '8px', color: '#475569', marginTop: '0.125rem' }}>
            <span>72</span><span>300</span><span>600</span>
          </div>
        </div>

        <button onClick={() => onExport(format, scale, dpi)} disabled={exporting}
          className="w-100 d-flex align-items-center justify-content-center gap-2 btn"
          style={{ padding: '0.625rem', backgroundColor: '#2563eb', color: 'var(--bs-white)', fontSize: '0.75rem', fontWeight: 500, borderRadius: '0.75rem', transition: 'background-color 0.15s', border: 'none', opacity: exporting ? 0.7 : 1 }}>
          {exporting ? (
            <><div className="rounded-circle" style={{ width: '1rem', height: '1rem', border: '2px solid var(--bs-white)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} /> Exporting...</>
          ) : (
            <><Download size={16} /> Export {SCALES.find(s => s.value === scale)?.label} {format.toUpperCase()}</>
          )}
        </button>
      </div>
    </div>
  );
}
