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
    <div className="rounded-3 overflow-hidden" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <div className="d-flex align-items-center justify-content-between px-3 py-2" style={{ borderBottom: '1px solid #334155' }}>
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--bs-white)' }}>{scene.name}</span>
          <span style={{ fontSize: '10px', color: '#94a3b8' }}>{scene.product}</span>
        </div>
        <span style={{ fontSize: '10px', color: '#64748b' }}>Live Preview</span>
      </div>

      <div
        className="position-relative overflow-hidden"
        style={{ aspectRatio: `${scene.width}/${scene.height}`, background: bgGradient }}
      >
        <div
          className="position-absolute"
          style={{
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 70% 20%, rgba(255,240,200,0.12) 0%, transparent 60%)',
            zIndex: 2,
          }}
        />

        {designFile && (
          <div
            className="position-absolute"
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

        {editorState.vignette > 0 && (
          <div
            className="position-absolute"
            style={{
              inset: 0,
              pointerEvents: 'none',
              background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${editorState.vignette}) 100%)`,
              zIndex: 3,
            }}
          />
        )}

        {!designFile && (
          <div className="position-absolute d-flex align-items-center justify-content-center" style={{ inset: 0, zIndex: 10 }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Upload your design to preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
