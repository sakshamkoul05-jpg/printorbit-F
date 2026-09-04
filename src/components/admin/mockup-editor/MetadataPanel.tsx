'use client';

import { useState, useCallback } from 'react';
import { Download, FileJson, Eye, RefreshCw } from 'lucide-react';
import type { BlendMode, SurfaceTexture } from '@/lib/render-engine/types';

interface MetadataPanelProps {
  metadata: MetadataValues;
  onChange: (values: MetadataValues) => void;
  onExport: () => void;
  onPreview: () => void;
  isPreviewing: boolean;
}

export interface MetadataValues {
  id: string;
  name: string;
  product: string;
  category: string;
  description: string;
  width: number;
  height: number;
  printArea: { x: number; y: number; width: number; height: number };
  blend: BlendMode;
  shadowOpacity: number;
  highlightOpacity: number;
  reflectionOpacity: number;
  textureStrength: number;
  displacementStrength: number;
  surfaceTexture: SurfaceTexture;
  dpi: number;
}

const BLEND_MODES: BlendMode[] = [
  'normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard-light',
  'darken', 'lighten', 'color-dodge', 'color-burn',
];

const TEXTURE_TYPES: SurfaceTexture[] = [
  'fabric', 'paper', 'canvas', 'leather', 'metal', 'glass', 'plastic', 'ceramic', 'wood',
];

const PRODUCT_IDS = [
  'tshirt', 'hoodie', 'mug', 'bottle', 'business-card', 'poster', 'phone-case',
  'packaging-box', 'canvas-print', 'flyer', 'brochure', 'sticker', 'label',
  'cap', 'shopping-bag', 'letterhead', 'certificate', 'menu', 'banner',
  'roll-up-standee', 'notebook', 'id-card', 'wedding-card', 'invitation',
];

const CATEGORIES = [
  'Apparel', 'Stationery', 'Packaging', 'Marketing', 'Posters',
  'Business Cards', 'Promotional', 'Office', 'Restaurant',
];

export default function MetadataPanel({
  metadata, onChange, onExport, onPreview, isPreviewing,
}: MetadataPanelProps) {
  const update = useCallback(<K extends keyof MetadataValues>(key: K, value: MetadataValues[K]) => {
    onChange({ ...metadata, [key]: value });
  }, [metadata, onChange]);

  const Slider = ({ label, value, min, max, step, onChange: set }: {
    label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void;
  }) => (
    <div>
      <div className="d-flex justify-content-between mb-1">
        <span style={{ fontSize: '10px', color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>{value.toFixed(step && step < 1 ? 2 : 0)}</span>
      </div>
      <input type="range" min={min} max={max} step={step || 1} value={value}
        onChange={e => set(Number(e.target.value))}
        className="w-100"
        style={{ height: '0.25rem', backgroundColor: '#334155', borderRadius: '0.5rem', accentColor: '#3b82f6', cursor: 'pointer' }} />
    </div>
  );

  return (
    <div className="rounded-3 p-3 d-flex flex-column gap-3" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <p className="mb-0" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Metadata</p>

      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
        <div>
          <label className="d-block mb-1" style={{ fontSize: '10px', color: '#94a3b8' }}>ID</label>
          <input type="text" value={metadata.id}
            onChange={e => update('id', e.target.value)}
            className="w-100"
            style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem', padding: '0.375rem 0.625rem', fontSize: '0.75rem', color: '#e2e8f0', outline: 'none' }} />
        </div>
        <div>
          <label className="d-block mb-1" style={{ fontSize: '10px', color: '#94a3b8' }}>Name</label>
          <input type="text" value={metadata.name}
            onChange={e => update('name', e.target.value)}
            className="w-100"
            style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem', padding: '0.375rem 0.625rem', fontSize: '0.75rem', color: '#e2e8f0', outline: 'none' }} />
        </div>
      </div>

      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
        <div>
          <label className="d-block mb-1" style={{ fontSize: '10px', color: '#94a3b8' }}>Product</label>
          <select value={metadata.product} onChange={e => update('product', e.target.value)}
            className="w-100"
            style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem', padding: '0.375rem 0.625rem', fontSize: '0.75rem', color: '#e2e8f0', outline: 'none' }}>
            {PRODUCT_IDS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="d-block mb-1" style={{ fontSize: '10px', color: '#94a3b8' }}>Category</label>
          <select value={metadata.category} onChange={e => update('category', e.target.value)}
            className="w-100"
            style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem', padding: '0.375rem 0.625rem', fontSize: '0.75rem', color: '#e2e8f0', outline: 'none' }}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="d-block mb-1" style={{ fontSize: '10px', color: '#94a3b8' }}>Description</label>
        <input type="text" value={metadata.description}
          onChange={e => update('description', e.target.value)}
          className="w-100"
          style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem', padding: '0.375rem 0.625rem', fontSize: '0.75rem', color: '#e2e8f0', outline: 'none' }} />
      </div>

      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
        <div>
          <label className="d-block mb-1" style={{ fontSize: '10px', color: '#94a3b8' }}>Width (px)</label>
          <input type="number" value={metadata.width}
            onChange={e => update('width', Number(e.target.value))}
            className="w-100"
            style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem', padding: '0.375rem 0.625rem', fontSize: '0.75rem', color: '#e2e8f0', outline: 'none' }} />
        </div>
        <div>
          <label className="d-block mb-1" style={{ fontSize: '10px', color: '#94a3b8' }}>Height (px)</label>
          <input type="number" value={metadata.height}
            onChange={e => update('height', Number(e.target.value))}
            className="w-100"
            style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem', padding: '0.375rem 0.625rem', fontSize: '0.75rem', color: '#e2e8f0', outline: 'none' }} />
        </div>
      </div>

      <div className="rounded p-2" style={{ backgroundColor: 'rgba(15,23,42,0.5)', border: '1px solid #334155' }}>
        <p className="mb-2" style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>Printable Area</p>
        <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
          {(['x', 'y', 'width', 'height'] as const).map(k => (
            <div key={k}>
              <label className="d-block mb-0" style={{ fontSize: '9px', color: '#64748b' }}>{k}</label>
              <input type="number" value={metadata.printArea[k]}
                onChange={e => update('printArea', { ...metadata.printArea, [k]: Number(e.target.value) })}
                className="w-100"
                style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.375rem', padding: '0.25rem 0.5rem', fontSize: '10px', color: '#e2e8f0', outline: 'none' }} />
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex flex-column gap-2">
        <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>Render Settings</p>

        <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
          <div>
            <label className="d-block mb-1" style={{ fontSize: '10px', color: '#94a3b8' }}>Blend Mode</label>
            <select value={metadata.blend} onChange={e => update('blend', e.target.value as BlendMode)}
              className="w-100"
              style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem', padding: '0.375rem 0.625rem', fontSize: '0.75rem', color: '#e2e8f0', outline: 'none' }}>
              {BLEND_MODES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="d-block mb-1" style={{ fontSize: '10px', color: '#94a3b8' }}>Surface Texture</label>
            <select value={metadata.surfaceTexture} onChange={e => update('surfaceTexture', e.target.value as SurfaceTexture)}
              className="w-100"
              style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem', padding: '0.375rem 0.625rem', fontSize: '0.75rem', color: '#e2e8f0', outline: 'none' }}>
              {TEXTURE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <Slider label="Shadow Opacity" value={metadata.shadowOpacity} min={0} max={1} step={0.05} onChange={v => update('shadowOpacity', v)} />
        <Slider label="Highlight Opacity" value={metadata.highlightOpacity} min={0} max={1} step={0.05} onChange={v => update('highlightOpacity', v)} />
        <Slider label="Reflection Opacity" value={metadata.reflectionOpacity} min={0} max={1} step={0.05} onChange={v => update('reflectionOpacity', v)} />
        <Slider label="Texture Strength" value={metadata.textureStrength} min={0} max={1} step={0.05} onChange={v => update('textureStrength', v)} />
        <Slider label="Displacement Strength" value={metadata.displacementStrength} min={0} max={50} step={1} onChange={v => update('displacementStrength', v)} />
        <Slider label="DPI" value={metadata.dpi} min={72} max={600} step={1} onChange={v => update('dpi', v)} />
      </div>

      <div className="d-flex flex-column gap-2 pt-2" style={{ borderTop: '1px solid #334155' }}>
        <button onClick={onPreview} disabled={isPreviewing}
          className="w-100 d-flex align-items-center justify-content-center gap-2 btn"
          style={{ padding: '0.5rem', backgroundColor: '#2563eb', color: 'var(--bs-white)', fontSize: '0.75rem', fontWeight: 500, borderRadius: '0.75rem', transition: 'background-color 0.15s', border: 'none', opacity: isPreviewing ? 0.7 : 1 }}>
          {isPreviewing ? <RefreshCw size={14} className="animate-spin" /> : <Eye size={14} />}
          {isPreviewing ? 'Rendering...' : 'Preview Render'}
        </button>

        <button onClick={onExport}
          className="w-100 d-flex align-items-center justify-content-center gap-2 btn"
          style={{ padding: '0.5rem', backgroundColor: '#059669', color: 'var(--bs-white)', fontSize: '0.75rem', fontWeight: 500, borderRadius: '0.75rem', transition: 'background-color 0.15s', border: 'none' }}>
          <Download size={14} />
          Export Mockup Package
        </button>
      </div>
    </div>
  );
}
