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
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">{icon}</span>
          <span className="text-[10px] text-slate-400">{label}</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">{value.toFixed(2)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onAction({ ...action, value: Number(e.target.value) })}
        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  );
}

export default function EditorToolbar({ editorState, onAction, onUndo, onRedo, canUndo, canRedo, onReset }: EditorToolbarProps) {
  const btnBase = 'p-1.5 rounded-lg transition-colors';

  const tb = (on: boolean, action: EditorAction) =>
    <button onClick={() => onAction(action)}
      className={`${btnBase} ${on ? 'bg-blue-600/30 text-blue-400 border border-blue-600/40' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
    >
      {action.type === 'flipHorizontal' ? <FlipHorizontal className="w-3.5 h-3.5" /> :
       action.type === 'flipVertical' ? <FlipVertical className="w-3.5 h-3.5" /> :
       action.type === 'setDropShadow' ? <Eye className="w-3.5 h-3.5" /> :
       action.type === 'setTexture' ? <Rotate3D className="w-3.5 h-3.5" /> :
       action.type === 'setReflection' ? <Droplets className="w-3.5 h-3.5" /> : null}
    </button>;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 space-y-4">
      {/* Undo/Redo */}
      <div className="flex items-center gap-2">
        <button onClick={onUndo} disabled={!canUndo}
          className={`${btnBase} ${canUndo ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-800/50 text-slate-600 cursor-not-allowed'}`}>
          <Undo2 className="w-3.5 h-3.5" />
        </button>
        <button onClick={onRedo} disabled={!canRedo}
          className={`${btnBase} ${canRedo ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-800/50 text-slate-600 cursor-not-allowed'}`}>
          <Redo2 className="w-3.5 h-3.5" />
        </button>
        <div className="flex-1" />
        <button onClick={onReset} className="px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-[10px] rounded-lg transition-colors">
          <Eraser className="w-3 h-3 inline mr-1" />Reset
        </button>
      </div>

      <hr className="border-slate-700" />

      {/* Toggles */}
      <div className="grid grid-cols-3 gap-1.5">
        {tb(editorState.dropShadow, { type: 'setDropShadow', value: !editorState.dropShadow })}
        {tb(editorState.texture, { type: 'setTexture', value: !editorState.texture })}
        {tb(editorState.reflection, { type: 'setReflection', value: !editorState.reflection })}
        {tb(editorState.flipHorizontal, { type: 'flipHorizontal', value: false })}
        {tb(editorState.flipVertical, { type: 'flipVertical', value: false })}
      </div>

      <hr className="border-slate-700" />

      {/* Sliders */}
      <SliderControl label="Brightness" icon={<Sun className="w-3 h-3" />} value={editorState.brightness} min={0} max={2} action={{ type: 'setBrightness', value: editorState.brightness }} onAction={onAction} />
      <SliderControl label="Contrast" icon={<Contrast className="w-3 h-3" />} value={editorState.contrast} min={0} max={2} action={{ type: 'setContrast', value: editorState.contrast }} onAction={onAction} />
      <SliderControl label="Saturation" icon={<Droplets className="w-3 h-3" />} value={editorState.saturation} min={0} max={2} action={{ type: 'setSaturation', value: editorState.saturation }} onAction={onAction} />
      <SliderControl label="Opacity" icon={<Eye className="w-3 h-3" />} value={editorState.designOpacity} min={0.1} max={1} step={0.05} action={{ type: 'setOpacity', value: editorState.designOpacity }} onAction={onAction} />
      <SliderControl label="Scale" icon={<Type className="w-3 h-3" />} value={editorState.designScale} min={0.5} max={2} step={0.05} action={{ type: 'setScale', value: editorState.designScale }} onAction={onAction} />
      <SliderControl label="Vignette" icon={<Rotate3D className="w-3 h-3" />} value={editorState.vignette} min={0} max={0.6} step={0.05} action={{ type: 'setVignette', value: editorState.vignette }} onAction={onAction} />
    </div>
  );
}
