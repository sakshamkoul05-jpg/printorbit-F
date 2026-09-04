'use client';

import {
  RotateCcw, RotateCw, FlipHorizontal, FlipVertical,
  Sun, Contrast, Droplets, Eye, Type,
  Undo2, Redo2, Rotate3D, Eraser,
} from 'lucide-react';
import type { MockupEditorState, EditorAction } from '@/types/mockup';

interface EditorToolbarProps {
  editorState: MockupEditorState;
  onAction: (action: EditorAction) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onReset: () => void;
}

interface SliderControlProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  action: EditorAction;
  onAction: (a: EditorAction) => void;
}

function SliderControl({ label, icon, value, min, max, step = 0.01, action, onAction }: SliderControlProps) {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-1">
        <div className="d-flex align-items-center gap-1">
          <span style={{ color: '#94a3b8' }}>{icon}</span>
          <span style={{ fontSize: '10px', color: '#94a3b8' }}>{label}</span>
        </div>
        <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>{value.toFixed(2)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onAction({ ...action, value: Number(e.target.value) })}
        className="w-100"
        style={{ height: '0.25rem', backgroundColor: '#334155', borderRadius: '0.5rem', accentColor: '#3b82f6', cursor: 'pointer' }}
      />
    </div>
  );
}

export default function EditorToolbar({ editorState, onAction, onUndo, onRedo, canUndo, canRedo, onReset }: EditorToolbarProps) {
  const btnBase = 'btn p-1';

  const tb = (on: boolean, action: EditorAction) =>
    <button onClick={() => onAction(action)}
      className={btnBase}
      style={{
        padding: '0.375rem',
        borderRadius: '0.5rem',
        transition: 'color 0.15s',
        backgroundColor: on ? 'rgba(37,99,235,0.3)' : '#334155',
        color: on ? '#60a5fa' : '#94a3b8',
        border: on ? '1px solid rgba(37,99,235,0.4)' : 'none',
      }}
    >
      {action.type === 'flipHorizontal' ? <FlipHorizontal size={14} /> :
       action.type === 'flipVertical' ? <FlipVertical size={14} /> :
       action.type === 'setDropShadow' ? <Eye size={14} /> :
       action.type === 'setTexture' ? <Rotate3D size={14} /> :
       action.type === 'setReflection' ? <Droplets size={14} /> : null}
    </button>;

  return (
    <div className="d-flex flex-column gap-3 p-3 rounded-3" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <div className="d-flex align-items-center gap-2">
        <button onClick={onUndo} disabled={!canUndo}
          className={btnBase}
          style={{
            padding: '0.375rem',
            borderRadius: '0.5rem',
            backgroundColor: canUndo ? '#334155' : 'rgba(30,41,59,0.5)',
            color: canUndo ? '#cbd5e1' : '#475569',
            cursor: canUndo ? 'pointer' : 'not-allowed',
            border: 'none',
          }}>
          <Undo2 size={14} />
        </button>
        <button onClick={onRedo} disabled={!canRedo}
          className={btnBase}
          style={{
            padding: '0.375rem',
            borderRadius: '0.5rem',
            backgroundColor: canRedo ? '#334155' : 'rgba(30,41,59,0.5)',
            color: canRedo ? '#cbd5e1' : '#475569',
            cursor: canRedo ? 'pointer' : 'not-allowed',
            border: 'none',
          }}>
          <Redo2 size={14} />
        </button>
        <div className="flex-fill" />
        <button onClick={onReset} className="btn" style={{ padding: '0.375rem 0.625rem', backgroundColor: '#334155', color: '#cbd5e1', fontSize: '10px', borderRadius: '0.5rem', transition: 'background-color 0.15s', border: 'none' }}>
          <Eraser size={12} className="d-inline me-1" />Reset
        </button>
      </div>

      <hr className="m-0" style={{ borderColor: '#334155' }} />

      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.375rem' }}>
        {tb(editorState.dropShadow, { type: 'setDropShadow', value: !editorState.dropShadow })}
        {tb(editorState.texture, { type: 'setTexture', value: !editorState.texture })}
        {tb(editorState.reflection, { type: 'setReflection', value: !editorState.reflection })}
        {tb(editorState.flipHorizontal, { type: 'flipHorizontal', value: false })}
        {tb(editorState.flipVertical, { type: 'flipVertical', value: false })}
      </div>

      <hr className="m-0" style={{ borderColor: '#334155' }} />

      <SliderControl label="Brightness" icon={<Sun size={12} />} value={editorState.brightness} min={0} max={2} action={{ type: 'setBrightness', value: editorState.brightness }} onAction={onAction} />
      <SliderControl label="Contrast" icon={<Contrast size={12} />} value={editorState.contrast} min={0} max={2} action={{ type: 'setContrast', value: editorState.contrast }} onAction={onAction} />
      <SliderControl label="Saturation" icon={<Droplets size={12} />} value={editorState.saturation} min={0} max={2} action={{ type: 'setSaturation', value: editorState.saturation }} onAction={onAction} />
      <SliderControl label="Opacity" icon={<Eye size={12} />} value={editorState.designOpacity} min={0.1} max={1} step={0.05} action={{ type: 'setOpacity', value: editorState.designOpacity }} onAction={onAction} />
      <SliderControl label="Scale" icon={<Type size={12} />} value={editorState.designScale} min={0.5} max={2} step={0.05} action={{ type: 'setScale', value: editorState.designScale }} onAction={onAction} />
      <SliderControl label="Vignette" icon={<Rotate3D size={12} />} value={editorState.vignette} min={0} max={0.6} step={0.05} action={{ type: 'setVignette', value: editorState.vignette }} onAction={onAction} />
    </div>
  );
}
