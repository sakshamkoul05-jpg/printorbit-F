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
      <div className="flex justify-between mb-1">
        <span className="text-[10px] text-slate-400">{label}</span>
        <span className="text-[10px] text-slate-500 font-mono">{value.toFixed(step && step < 1 ? 2 : 0)}</span>
      </div>
      <input type="range" min={min} max={max} step={step || 1} value={value}
        onChange={e => set(Number(e.target.value))}
        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
    </div>
  );

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 space-y-4">
      <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Metadata</p>

      {/* Identity */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">ID</label>
          <input type="text" value={metadata.id}
            onChange={e => update('id', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Name</label>
          <input type="text" value={metadata.name}
            onChange={e => update('name', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Product</label>
          <select value={metadata.product} onChange={e => update('product', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500">
            {PRODUCT_IDS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Category</label>
          <select value={metadata.category} onChange={e => update('category', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-[10px] text-slate-400 block mb-1">Description</label>
        <input type="text" value={metadata.description}
          onChange={e => update('description', e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Width (px)</label>
          <input type="number" value={metadata.width}
            onChange={e => update('width', Number(e.target.value))}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Height (px)</label>
          <input type="number" value={metadata.height}
            onChange={e => update('height', Number(e.target.value))}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      {/* Printable Area */}
      <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
        <p className="text-[10px] text-slate-400 mb-2 font-medium">Printable Area</p>
        <div className="grid grid-cols-2 gap-2">
          {(['x', 'y', 'width', 'height'] as const).map(k => (
            <div key={k}>
              <label className="text-[9px] text-slate-500 block mb-0.5">{k}</label>
              <input type="number" value={metadata.printArea[k]}
                onChange={e => update('printArea', { ...metadata.printArea, [k]: Number(e.target.value) })}
                className="w-full bg-slate-700 border border-slate-600 rounded-md px-2 py-1 text-[10px] text-slate-200 focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Render Settings */}
      <div className="space-y-3">
        <p className="text-[10px] text-slate-400 font-medium">Render Settings</p>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Blend Mode</label>
            <select value={metadata.blend} onChange={e => update('blend', e.target.value as BlendMode)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500">
              {BLEND_MODES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Surface Texture</label>
            <select value={metadata.surfaceTexture} onChange={e => update('surfaceTexture', e.target.value as SurfaceTexture)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500">
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

      {/* Actions */}
      <div className="space-y-2 pt-2 border-t border-slate-700">
        <button onClick={onPreview} disabled={isPreviewing}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
          {isPreviewing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Eye className="w-3.5 h-3.5" />}
          {isPreviewing ? 'Rendering...' : 'Preview Render'}
        </button>

        <button onClick={onExport}
          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
          <Download className="w-3.5 h-3.5" />
          Export Mockup Package
        </button>
      </div>
    </div>
  );
}
