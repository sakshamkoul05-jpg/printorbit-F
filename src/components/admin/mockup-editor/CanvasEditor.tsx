'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, Rect, Circle, Text, Point } from 'fabric';
import { Crosshair, Move, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface CanvasEditorProps {
  backgroundUrl: string | null;
  printArea: { x: number; y: number; width: number; height: number };
  corners: { x: number; y: number }[];
  onPrintAreaChange: (area: { x: number; y: number; width: number; height: number }) => void;
  onCornersChange: (corners: { x: number; y: number }[]) => void;
  maskUrl?: string | null;
}

export default function CanvasEditor({
  backgroundUrl, printArea, corners, onPrintAreaChange, onCornersChange,
}: CanvasEditorProps) {
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<'corners' | 'area'>('corners');

  const getByType = useCallback((c: Canvas, type: string) => {
    return c.getObjects().find(o => {
      const d = (o as any).data;
      return d && d.type === type;
    });
  }, []);

  const removeByType = useCallback((c: Canvas, prefix: string) => {
    const toRemove = c.getObjects().filter(o => {
      const t = (o as any).data?.type || '';
      return typeof t === 'string' && t.startsWith(prefix);
    });
    toRemove.forEach(o => c.remove(o));
  }, []);

  useEffect(() => {
    if (!canvasElRef.current || fabricRef.current) return;
    const c = new Canvas(canvasElRef.current, {
      width: 800, height: 600, backgroundColor: '#1e293b',
      selection: false, preserveObjectStacking: true,
    });
    fabricRef.current = c;

    c.on('mouse:wheel', (opt) => {
      const e = opt.e as WheelEvent;
      let z = c.getZoom();
      z *= 0.999 ** e.deltaY;
      z = Math.min(Math.max(0.1, z), 5);
      c.zoomToPoint(new Point(e.offsetX, e.offsetY), z);
      setZoom(z);
      e.preventDefault(); e.stopPropagation();
    });

    return () => { c.dispose(); fabricRef.current = null; };
  }, []);

  useEffect(() => {
    const c = fabricRef.current;
    if (!c) return;
    const existing = getByType(c, 'background');
    if (existing) c.remove(existing);
    if (backgroundUrl) {
      const bg = new Rect({
        left: 0, top: 0, width: 800, height: 600, fill: 'transparent',
        selectable: false, evented: false,
      });
      (bg as any).data = { type: 'background' };
      c.add(bg); c.sendObjectToBack(bg); c.renderAll();
    }
  }, [backgroundUrl, getByType]);

  useEffect(() => {
    const c = fabricRef.current;
    if (!c) return;
    removeByType(c, 'corner-');
    const colors = ['#ff4444', '#44ff44', '#4488ff', '#ffaa00'];
    const labels = ['TL', 'TR', 'BR', 'BL'];

    corners.forEach((pt, i) => {
      const circle = new Circle({
        left: pt.x - 8, top: pt.y - 8, radius: 8,
        fill: colors[i], stroke: '#fff', strokeWidth: 2,
        hasControls: false, hasBorders: false,
        lockRotation: true, lockScalingX: true, lockScalingY: true, lockUniScaling: true,
      });
      (circle as any).data = { type: `corner-${i}` };

      const label = new Text(labels[i], {
        left: pt.x + 10, top: pt.y - 10, fontSize: 12,
        fill: colors[i], fontFamily: 'monospace',
        selectable: false, evented: false,
      });
      (label as any).data = { type: `corner-label-${i}` };

      circle.on('moving', () => {
        const n = [...corners];
        n[i] = { x: circle.left + 8, y: circle.top + 8 };
        onCornersChange(n);
        label.set({ left: circle.left + 18, top: circle.top - 2 });
        c.renderAll();
      });

      c.add(circle, label);
    });
    c.renderAll();
  }, [corners, mode, onCornersChange, removeByType]);

  useEffect(() => {
    const c = fabricRef.current;
    if (!c) return;
    removeByType(c, 'print-area');
    const rect = new Rect({
      left: printArea.x, top: printArea.y,
      width: printArea.width, height: printArea.height,
      fill: 'rgba(59,130,246,0.08)', stroke: '#3b82f6', strokeWidth: 2,
      strokeDashArray: [6, 3] as number[],
      selectable: mode === 'area', evented: mode === 'area',
      hasControls: true, hasBorders: true, lockRotation: true,
      cornerColor: '#3b82f6', cornerSize: 10, transparentCorners: false,
    });
    (rect as any).data = { type: 'print-area' };
    rect.on('modified', () => {
      onPrintAreaChange({
        x: Math.round(rect.left), y: Math.round(rect.top),
        width: Math.round(rect.width * (rect.scaleX || 1)),
        height: Math.round(rect.height * (rect.scaleY || 1)),
      });
    });
    c.add(rect);
    c.renderAll();
  }, [printArea, mode, onPrintAreaChange, removeByType]);

  const zoomIn = useCallback(() => {
    const c = fabricRef.current; if (!c) return;
    const z = Math.min(c.getZoom() * 1.2, 5); c.setZoom(z); c.renderAll(); setZoom(z);
  }, []);
  const zoomOut = useCallback(() => {
    const c = fabricRef.current; if (!c) return;
    const z = Math.max(c.getZoom() / 1.2, 0.1); c.setZoom(z); c.renderAll(); setZoom(z);
  }, []);
  const fitToScreen = useCallback(() => {
    const c = fabricRef.current; if (!c) return;
    c.setZoom(1); c.absolutePan(new Point(0, 0)); c.renderAll(); setZoom(1);
  }, []);

  return (
    <div className="rounded-3 overflow-hidden" style={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}>
      <div className="d-flex align-items-center justify-content-between px-3 py-2" style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
        <div className="d-flex align-items-center" style={{ gap: '0.25rem' }}>
          <button onClick={() => setMode('corners')}
            className="btn p-1"
            style={{
              borderRadius: '0.5rem',
              transition: 'all 0.15s',
              backgroundColor: mode === 'corners' ? '#2563eb' : 'transparent',
              color: mode === 'corners' ? 'var(--bs-white)' : '#94a3b8',
              border: 'none',
            }}>
            <Crosshair size={16} />
          </button>
          <button onClick={() => setMode('area')}
            className="btn p-1"
            style={{
              borderRadius: '0.5rem',
              transition: 'all 0.15s',
              backgroundColor: mode === 'area' ? '#2563eb' : 'transparent',
              color: mode === 'area' ? 'var(--bs-white)' : '#94a3b8',
              border: 'none',
            }}>
            <Move size={16} />
          </button>
        </div>
        <div className="d-flex align-items-center" style={{ gap: '0.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', marginRight: '0.5rem' }}>{Math.round(zoom * 100)}%</span>
          <button onClick={zoomOut} className="btn p-1" style={{ color: '#94a3b8', backgroundColor: 'transparent', borderRadius: '0.5rem', border: 'none' }}><ZoomOut size={16} /></button>
          <button onClick={zoomIn} className="btn p-1" style={{ color: '#94a3b8', backgroundColor: 'transparent', borderRadius: '0.5rem', border: 'none' }}><ZoomIn size={16} /></button>
          <button onClick={fitToScreen} className="btn p-1" style={{ color: '#94a3b8', backgroundColor: 'transparent', borderRadius: '0.5rem', border: 'none' }}><Maximize size={16} /></button>
        </div>
      </div>

      <div className="position-relative" style={{ width: 800, height: 600 }}>
        {!backgroundUrl && (
          <div className="position-absolute d-flex align-items-center justify-content-center" style={{ inset: 0, color: '#64748b', zIndex: 10, pointerEvents: 'none' }}>
            <div className="text-center">
              <svg style={{ width: '3rem', height: '3rem', margin: '0 auto 0.75rem', opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p style={{ fontSize: '0.875rem' }}>Upload a background image to start</p>
              <p style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.25rem' }}>Drag corner points to set perspective</p>
            </div>
          </div>
        )}
        {backgroundUrl && (
          <img src={backgroundUrl} alt="" className="position-absolute" style={{ inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none', opacity: 0.4, zIndex: 0 }} />
        )}
        <canvas ref={canvasElRef} width={800} height={600} className="position-relative" style={{ zIndex: 1 }} />
      </div>

      <div className="d-flex align-items-center gap-3 px-3 py-2" style={{ backgroundColor: 'rgba(30,41,59,0.5)', borderTop: '1px solid #334155', fontSize: '10px', color: '#64748b' }}>
        <span>Scroll to zoom</span>
        <span>Drag corner points to adjust perspective</span>
        <span>Area mode to resize printable area</span>
      </div>
    </div>
  );
}
