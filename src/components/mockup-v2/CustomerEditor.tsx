'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, Image as FabricImage, Rect, Line, Point } from 'fabric';
import { ZoomIn, ZoomOut, Maximize, Trash2, Upload } from 'lucide-react';

export interface SnapGuide {
  axis: 'h' | 'v';
  pos: number;
}

interface CustomerEditorProps {
  mockupId: string;
  metadata: {
    width: number;
    height: number;
    printArea: { x: number; y: number; width: number; height: number };
    corners: { tl: { x: number; y: number }; tr: { x: number; y: number }; br: { x: number; y: number }; bl: { x: number; y: number } };
  };
  artworkDataUrl: string | null;
  onArtworkChange: (data: {
    left: number; top: number; scaleX: number; scaleY: number; angle: number; opacity: number;
  } | null) => void;
  onUploadClick?: () => void;
}

const SNAP_THRESHOLD = 10;
const HISTORY_MAX = 50;

export default function CustomerEditor({
  mockupId, metadata, artworkDataUrl, onArtworkChange, onUploadClick,
}: CustomerEditorProps) {
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const cRef = useRef<Canvas | null>(null);
  const artworkRef = useRef<FabricImage | null>(null);
  const [zoom, setZoom] = useState(1);
  const historyRef = useRef<string[]>([]);
  const historyIdxRef = useRef(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    if (!canvasElRef.current || cRef.current) return;
    const c = new Canvas(canvasElRef.current, {
      width: 860, height: 640, backgroundColor: '#1e293b',
      selection: false, preserveObjectStacking: true,
    });
    cRef.current = c;

    c.on('mouse:wheel', (opt) => {
      const e = opt.e as WheelEvent;
      let z = c.getZoom();
      z *= 0.999 ** e.deltaY;
      z = Math.min(Math.max(0.1, z), 5);
      c.zoomToPoint(new Point(e.offsetX, e.offsetY), z);
      setZoom(z);
      e.preventDefault(); e.stopPropagation();
    });

    return () => { c.dispose(); cRef.current = null; };
  }, []);

  useEffect(() => {
    const c = cRef.current;
    if (!c) return;
    const { width, height } = metadata;
    const scale = Math.min(860 / width, 640 / height);
    const cw = width * scale;
    const ch = height * scale;
    const ox = (860 - cw) / 2;
    const oy = (640 - ch) / 2;

    const existing = c.getObjects().find(o => (o as any).data?.type === 'bg-slot');
    if (existing) c.remove(existing);

    const bg = new Rect({
      left: ox, top: oy, width: cw, height: ch,
      fill: 'transparent', stroke: '#334155', strokeWidth: 1,
      selectable: false, evented: false,
    });
    (bg as any).data = { type: 'bg-slot', offsetX: ox, offsetY: oy, scale };
    c.add(bg); c.sendObjectToBack(bg);

    const pa = metadata.printArea;
    const pr = new Rect({
      left: ox + pa.x * scale, top: oy + pa.y * scale,
      width: pa.width * scale, height: pa.height * scale,
      fill: 'rgba(59,130,246,0.04)',
      stroke: '#3b82f6', strokeWidth: 1.5, strokeDashArray: [5, 3] as number[],
      selectable: false, evented: false,
    });
    (pr as any).data = { type: 'print-area-guide' };
    const oldPr = c.getObjects().find(o => (o as any).data?.type === 'print-area-guide');
    if (oldPr) c.remove(oldPr);
    c.add(pr);

    const corners = [metadata.corners.tl, metadata.corners.tr, metadata.corners.br, metadata.corners.bl];
    const colors = ['#ff4444', '#44ff44', '#4488ff', '#ffaa00'];
    const labels = ['TL', 'TR', 'BR', 'BL'];
    const oldC = c.getObjects().filter(o => (o as any).data?.type === 'corner-marker');
    oldC.forEach(o => c.remove(o));
    corners.forEach((pt, i) => {
      const dot = new Rect({
        left: ox + pt.x * scale - 3, top: oy + pt.y * scale - 3,
        width: 6, height: 6, fill: colors[i],
        selectable: false, evented: false, rx: 1, ry: 1,
      });
      (dot as any).data = { type: 'corner-marker' };
      c.add(dot);
    });

    c.renderAll();
  }, [metadata]);

  useEffect(() => {
    const c = cRef.current;
    if (!c) return;

    if (artworkRef.current) {
      c.remove(artworkRef.current);
      artworkRef.current = null;
    }

    if (!artworkDataUrl) {
      onArtworkChange(null);
      historyRef.current = [];
      historyIdxRef.current = -1;
      setCanUndo(false);
      setCanRedo(false);
      c.renderAll();
      return;
    }

    const bg = c.getObjects().find(o => (o as any).data?.type === 'bg-slot');
    const offsetX = (bg as any)?.data?.offsetX || 0;
    const offsetY = (bg as any)?.data?.offsetY || 0;
    const scale = (bg as any)?.data?.scale || 1;
    const pa = metadata.printArea;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const fi = new FabricImage(img, {
        left: offsetX + pa.x * scale,
        top: offsetY + pa.y * scale,
        scaleX: (pa.width * scale * 0.8) / img.width,
        scaleY: (pa.height * scale * 0.8) / img.height,
        cornerColor: '#3b82f6',
        cornerSize: 10,
        transparentCorners: false,
        borderColor: '#3b82f6',
        padding: 2,
      });
      (fi as any).data = { type: 'artwork' };
      c.add(fi);
      c.setActiveObject(fi);
      c.renderAll();
      artworkRef.current = fi;

      const getState = (o: FabricImage) => ({
        left: o.left, top: o.top,
        scaleX: o.scaleX || 1, scaleY: o.scaleY || 1,
        angle: o.angle || 0, opacity: o.opacity ?? 1,
      });
      const initState = getState(fi);
      historyRef.current = [JSON.stringify(initState)];
      historyIdxRef.current = 0;
      setCanUndo(false);
      setCanRedo(false);
      onArtworkChange(initState);

      fi.on('moving', () => doSnap(c, fi, offsetX, offsetY, scale, metadata));
      fi.on('scaling', () => doSnap(c, fi, offsetX, offsetY, scale, metadata));

      let saveTimer: ReturnType<typeof setTimeout> | null = null;
      const saveState = () => {
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
          const s = JSON.stringify(getState(fi));
          const idx = historyIdxRef.current;
          const cut = historyRef.current.slice(0, idx + 1);
          historyRef.current = [...cut, s].slice(-HISTORY_MAX);
          historyIdxRef.current = historyRef.current.length - 1;
          setCanUndo(historyRef.current.length > 1);
          setCanRedo(false);
          onArtworkChange(getState(fi));
          clearSnapGuides(c);
        }, 200);
      };
      fi.on('modified', saveState);
    };
    img.src = artworkDataUrl;

    return () => {
      if (artworkRef.current) {
        c.remove(artworkRef.current);
        artworkRef.current = null;
      }
    };
  }, [artworkDataUrl, mockupId]);

  const doSnap = useCallback((c: Canvas, obj: FabricImage, ox: number, oy: number, sc: number, meta: typeof metadata) => {
    const pa = meta.printArea;
    const paL = ox + pa.x * sc;
    const paR = ox + (pa.x + pa.width) * sc;
    const paT = oy + pa.y * sc;
    const paB = oy + (pa.y + pa.height) * sc;
    const paCx = (paL + paR) / 2;
    const paCy = (paT + paB) / 2;

    const br = obj.getBoundingRect();
    const aL = br.left;
    const aR = br.left + br.width;
    const aT = br.top;
    const aB = br.top + br.height;
    const aCx = (aL + aR) / 2;
    const aCy = (aT + aB) / 2;

    let snapX: number | null = null;
    let snapY: number | null = null;
    let guideH: number | null = null;
    let guideV: number | null = null;

    const hPairs: [number, number, () => number][] = [
      [aL, paL, () => { guideV = paL; return paL; }],
      [aL, paR, () => { guideV = paR; return paR; }],
      [aR, paL, () => { guideV = paL; return paL; }],
      [aR, paR, () => { guideV = paR; return paR; }],
      [aCx, paCx, () => { guideV = paCx; return paCx - br.width / 2; }],
    ];
    for (const [a, p, getDest] of hPairs) {
      if (Math.abs(a - p) < SNAP_THRESHOLD) {
        snapX = getDest();
        break;
      }
    }

    const vPairs: [number, number, () => number][] = [
      [aT, paT, () => { guideH = paT; return paT; }],
      [aT, paB, () => { guideH = paB; return paB + br.height; }],
      [aB, paT, () => { guideH = paT; return paT + br.height; }],
      [aB, paB, () => { guideH = paB; return paB - br.height; }],
      [aCy, paCy, () => { guideH = paCy; return paCy - br.height / 2; }],
    ];
    for (const [a, p, getDest] of vPairs) {
      if (Math.abs(a - p) < SNAP_THRESHOLD) {
        snapY = getDest();
        break;
      }
    }

    if (snapX !== null) obj.set('left', snapX);
    if (snapY !== null) obj.set('top', snapY);
    obj.setCoords();

    clearSnapGuides(c);
    if (guideH !== null) {
      const ln = new Line([0, guideH, 860, guideH], {
        stroke: '#f59e0b', strokeWidth: 1, strokeDashArray: [4, 4] as number[],
        selectable: false, evented: false,
      });
      (ln as any).data = { type: 'snap-guide' };
      c.add(ln);
    }
    if (guideV !== null) {
      const ln = new Line([guideV, 0, guideV, 640], {
        stroke: '#f59e0b', strokeWidth: 1, strokeDashArray: [4, 4] as number[],
        selectable: false, evented: false,
      });
      (ln as any).data = { type: 'snap-guide' };
      c.add(ln);
    }
    c.renderAll();
  }, []);

  const clearSnapGuides = useCallback((c: Canvas) => {
    const guides = c.getObjects().filter(o => (o as any).data?.type === 'snap-guide');
    guides.forEach(o => c.remove(o));
  }, []);

  const undo = useCallback(() => {
    const idx = historyIdxRef.current;
    if (idx <= 0 || !artworkRef.current || !cRef.current) return;
    const newIdx = idx - 1;
    const state = JSON.parse(historyRef.current[newIdx]);
    applyState(artworkRef.current, state);
    historyIdxRef.current = newIdx;
    setCanUndo(newIdx > 0);
    setCanRedo(true);
    cRef.current.renderAll();
    clearSnapGuides(cRef.current);
  }, [clearSnapGuides]);

  const redo = useCallback(() => {
    const idx = historyIdxRef.current;
    if (idx >= historyRef.current.length - 1 || !artworkRef.current || !cRef.current) return;
    const newIdx = idx + 1;
    const state = JSON.parse(historyRef.current[newIdx]);
    applyState(artworkRef.current, state);
    historyIdxRef.current = newIdx;
    setCanUndo(true);
    setCanRedo(newIdx < historyRef.current.length - 1);
    cRef.current.renderAll();
    clearSnapGuides(cRef.current);
  }, [clearSnapGuides]);

  const applyState = (obj: FabricImage, state: any) => {
    obj.set('left', state.left);
    obj.set('top', state.top);
    obj.set('scaleX', state.scaleX);
    obj.set('scaleY', state.scaleY);
    obj.set('angle', state.angle);
    obj.set('opacity', state.opacity);
    obj.setCoords();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!artworkRef.current || !cRef.current) return;
      const active = cRef.current.getActiveObject();
      if (active !== artworkRef.current) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (e.key === 'Backspace' && (e.target as HTMLElement)?.tagName === 'INPUT') return;
        cRef.current.remove(artworkRef.current);
        artworkRef.current = null;
        onArtworkChange(null);
        historyRef.current = [];
        historyIdxRef.current = -1;
        setCanUndo(false);
        setCanRedo(false);
        cRef.current.renderAll();
        e.preventDefault();
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); return; }
        if (e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); return; }
        if (e.key === 'y') { e.preventDefault(); redo(); return; }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  const zoomIn = useCallback(() => {
    const c = cRef.current; if (!c) return;
    const z = Math.min(c.getZoom() * 1.2, 5); c.setZoom(z); c.renderAll(); setZoom(z);
  }, []);
  const zoomOut = useCallback(() => {
    const c = cRef.current; if (!c) return;
    const z = Math.max(c.getZoom() / 1.2, 0.1); c.setZoom(z); c.renderAll(); setZoom(z);
  }, []);
  const fitToScreen = useCallback(() => {
    const c = cRef.current; if (!c) return;
    c.setZoom(1); c.absolutePan(new Point(0, 0)); c.renderAll(); setZoom(1);
  }, []);

  return (
    <div className="rounded-3 overflow-hidden" style={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}>
      <div className="d-flex align-items-center justify-content-between px-3 py-2" style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
        <div className="d-flex align-items-center gap-2">
          <button onClick={onUploadClick}
            className="d-flex align-items-center gap-1 btn"
            style={{ padding: '0.375rem 0.75rem', backgroundColor: '#2563eb', color: 'var(--bs-white)', fontSize: '0.75rem', fontWeight: 500, borderRadius: '0.5rem', transition: 'background-color 0.15s', border: 'none' }}>
            <Upload size={14} />
            Upload Artwork
          </button>
          {artworkRef.current && (
            <button onClick={() => {
              if (!cRef.current || !artworkRef.current) return;
              cRef.current.remove(artworkRef.current);
              artworkRef.current = null;
              onArtworkChange(null);
               historyRef.current = []; historyIdxRef.current = -1; setCanUndo(false); setCanRedo(false);
              cRef.current.renderAll();
            }}
              className="d-flex align-items-center gap-1 btn"
              style={{ padding: '0.375rem 0.75rem', backgroundColor: 'rgba(220,38,38,0.2)', color: '#f87171', fontSize: '0.75rem', fontWeight: 500, borderRadius: '0.5rem', transition: 'background-color 0.15s', border: 'none' }}>
              <Trash2 size={14} />
              Remove
            </button>
          )}
        </div>

        <div className="d-flex align-items-center gap-1">
          <span style={{ fontSize: '10px', color: '#64748b', marginRight: '0.25rem', fontFamily: 'monospace' }}>
            {artworkRef.current ? `${Math.round(artworkRef.current.scaleX! * 100)}%` : '—'}
          </span>
          <button onClick={undo} disabled={!canUndo}
            className="btn"
            style={{ padding: '0.375rem', color: '#94a3b8', opacity: canUndo ? 1 : 0.3, cursor: canUndo ? 'pointer' : 'not-allowed', backgroundColor: 'transparent', borderRadius: '0.5rem', fontSize: '0.75rem', border: 'none' }}>↶</button>
          <button onClick={redo} disabled={!canRedo}
            className="btn"
            style={{ padding: '0.375rem', color: '#94a3b8', opacity: canRedo ? 1 : 0.3, cursor: canRedo ? 'pointer' : 'not-allowed', backgroundColor: 'transparent', borderRadius: '0.5rem', fontSize: '0.75rem', border: 'none' }}>↷</button>
          <div style={{ width: '1px', height: '1rem', backgroundColor: '#334155', margin: '0 0.25rem' }} />
          <button onClick={zoomOut} className="btn p-1" style={{ color: '#94a3b8', backgroundColor: 'transparent', borderRadius: '0.5rem', border: 'none' }}><ZoomOut size={16} /></button>
          <span style={{ fontSize: '0.75rem', color: '#64748b', width: '2.5rem', textAlign: 'center', fontFamily: 'monospace' }}>{Math.round(zoom * 100)}%</span>
          <button onClick={zoomIn} className="btn p-1" style={{ color: '#94a3b8', backgroundColor: 'transparent', borderRadius: '0.5rem', border: 'none' }}><ZoomIn size={16} /></button>
          <button onClick={fitToScreen} className="btn p-1" style={{ color: '#94a3b8', backgroundColor: 'transparent', borderRadius: '0.5rem', border: 'none' }}><Maximize size={16} /></button>
        </div>
      </div>

      <div className="position-relative" style={{ width: 860, height: 640 }}>
        <img
          src={`/mockups/${mockupId}/background.png`}
          alt=""
          className="position-absolute"
          style={{ inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none', opacity: 0.3, zIndex: 0 }}
        />
        <canvas ref={canvasElRef} width={860} height={640} className="position-relative" style={{ zIndex: 1 }} />
        {!artworkDataUrl && (
          <div className="position-absolute d-flex align-items-center justify-content-center" style={{ inset: 0, pointerEvents: 'none', zIndex: 20 }}>
            <div className="text-center" style={{ color: '#64748b' }}>
              <svg style={{ width: '3rem', height: '3rem', margin: '0 auto 0.75rem', opacity: 0.4 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p style={{ fontSize: '0.875rem' }}>Upload your artwork above</p>
              <p style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.25rem' }}>Drag to position, scale with handles</p>
              <div className="d-flex align-items-center justify-content-center gap-2 mt-2" style={{ fontSize: '10px', color: '#475569' }}>
                <kbd style={{ padding: '0.125rem 0.375rem', backgroundColor: '#1e293b', borderRadius: '0.25rem', fontSize: '9px' }}>Delete</kbd> remove
                <kbd style={{ padding: '0.125rem 0.375rem', backgroundColor: '#1e293b', borderRadius: '0.25rem', fontSize: '9px' }}>⌘Z</kbd> undo
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="d-flex align-items-center gap-3 px-3 py-2" style={{ backgroundColor: 'rgba(30,41,59,0.5)', borderTop: '1px solid #334155', fontSize: '10px', color: '#64748b' }}>
        <span>Scroll to zoom</span>
        <span>Drag artwork to position</span>
        <span>Snaps to printable area</span>
        <span>Scale from corners</span>
      </div>
    </div>
  );
}
