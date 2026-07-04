'use client';

import { useMemo } from 'react';
import type { SceneDef, DesignFile, MockupEditorState } from '@/types/mockup';

interface MockupCanvasProps {
  scene: SceneDef;
  designFile: DesignFile | null;
  editorState: MockupEditorState;
}

export default function MockupCanvas({ scene, designFile, editorState }: MockupCanvasProps) {
  const filterStr = useMemo(() => {
    const b = editorState.brightness;
    const c = editorState.contrast;
    const s = editorState.saturation;
    const o = editorState.designOpacity;
    return `brightness(${b}) contrast(${c}) saturate(${s}) opacity(${o})`;
  }, [editorState]);

  const bgGradient = useMemo(() => {
    const colors = scene.color;
    if (colors.length === 1) return colors[0];
    return `linear-gradient(135deg, ${colors.join(', ')})`;
  }, [scene.color]);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-2.5 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white">{scene.name}</span>
          <span className="text-[10px] text-slate-400">{scene.product}</span>
        </div>
        <span className="text-[10px] text-slate-500">Live Preview</span>
      </div>

      {/* Canvas */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: `${scene.width}/${scene.height}`, background: bgGradient }}
      >
        {/* Ambient highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 70% 20%, rgba(255,240,200,0.12) 0%, transparent 60%)',
            zIndex: 2,
          }}
        />

        {/* Design on product */}
        {designFile && (
          <div
            className="absolute"
            style={{
              left: scene.renderOptions.designLeft,
              top: scene.renderOptions.designTop,
              width: scene.renderOptions.designWidth,
              height: scene.renderOptions.designHeight,
              transform: scene.renderOptions.designTransform,
              borderRadius: scene.renderOptions.designBorderRadius || '0',
              boxShadow: editorState.dropShadow ? (scene.renderOptions.boxShadow || 'none') : 'none',
              clipPath: scene.renderOptions.designClipPath || 'none',
              opacity: editorState.designOpacity,
              zIndex: 1,
            }}
          >
            <img
              src={designFile.dataUrl}
              alt="Design"
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: scene.renderOptions.designBorderRadius || '0',
                filter: filterStr,
                mixBlendMode: (scene.renderOptions.blendMode as any) || 'normal',
                transform: `scaleX(${editorState.flipHorizontal ? -1 : 1}) scaleY(${editorState.flipVertical ? -1 : 1})`,
              }}
            />
          </div>
        )}

        {/* Vignette overlay */}
        {editorState.vignette > 0 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${editorState.vignette}) 100%)`,
              zIndex: 3,
            }}
          />
        )}

        {/* Empty state */}
        {!designFile && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p className="text-white/40 text-sm">Upload your design to preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
