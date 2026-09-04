'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Type, Image, Square, Circle, Minus, Undo2, Redo2, Download, Save,
  ZoomIn, ZoomOut, Trash2, Copy, Layers, Palette, ChevronDown, Sparkles,
  Upload, Grid3X3, Move, RotateCw, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, Sliders, FileText, Shapes, Eraser, Bot,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import AIAgentPanel from '@/components/ai/AIAgentPanel';

export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'rect' | 'circle' | 'line';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  rotation: number;
  opacity: number;
  strokeWidth?: number;
  stroke?: string;
  src?: string;
  radius?: number;
}

const TEMPLATES = [
  { name: 'Business Card', width: 1050, height: 600, category: 'Cards' },
  { name: 'A5 Flyer', width: 1754, height: 2480, category: 'Flyers' },
  { name: 'A4 Letterhead', width: 2480, height: 3508, category: 'Stationery' },
  { name: 'Instagram Post', width: 1080, height: 1080, category: 'Social' },
  { name: 'YouTube Thumbnail', width: 1280, height: 720, category: 'Social' },
  { name: 'Poster A3', width: 3508, height: 4961, category: 'Posters' },
];

const PRODUCT_CANVAS_MAP: Record<string, { width: number; height: number; label: string }> = {
  'standard-business-cards': { width: 1050, height: 600, label: 'Business Card' },
  'premium-matte-business-cards': { width: 1050, height: 600, label: 'Business Card' },
  'metallic-foil-business-cards': { width: 1050, height: 600, label: 'Business Card' },
  'luxury-business-cards': { width: 1050, height: 600, label: 'Business Card' },
  'magnet-business-cards': { width: 1050, height: 600, label: 'Business Card' },
  'a5-flyers': { width: 1754, height: 2480, label: 'A5 Flyer' },
  'a4-flyers': { width: 2480, height: 3508, label: 'A4 Flyer' },
  'tri-fold-brochures': { width: 2480, height: 3508, label: 'Tri-Fold Brochure' },
  'bi-fold-brochures': { width: 2480, height: 3508, label: 'Bi-Fold Brochure' },
  'vinyl-banners': { width: 3600, height: 7200, label: 'Vinyl Banner' },
  'die-cut-stickers': { width: 600, height: 600, label: 'Die-Cut Sticker' },
  'mailer-boxes': { width: 2400, height: 1200, label: 'Mailer Box' },
  'cotton-tshirts': { width: 1200, height: 1600, label: 'T-Shirt' },
  'ceramic-mugs': { width: 1200, height: 800, label: 'Ceramic Mug' },
  'a4-letterheads': { width: 2480, height: 3508, label: 'A4 Letterhead' },
};

const FONTS = ['Inter', 'Space Grotesk', 'Playfair Display', 'Montserrat', 'Poppins', 'Roboto', 'Lato', 'Oswald'];
const COLORS = ['#0B57D0', '#FF6B00', '#16A34A', '#DC2626', '#7C3AED', '#0F172A', '#FFFFFF', '#F8FAFC', '#1F2937', '#64748B'];

export default function DesignStudioPage() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product');
  const templateParam = searchParams.get('template');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [canvasWidth, setCanvasWidth] = useState(1050);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showLayers, setShowLayers] = useState(true);
  const [history, setHistory] = useState<CanvasElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#0B57D0');
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [textInput, setTextInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeProduct, setActiveProduct] = useState<string | null>(productParam);
  const [showAIAgent, setShowAIAgent] = useState(false);

  // Set canvas size based on product param
  useEffect(() => {
    if (productParam && PRODUCT_CANVAS_MAP[productParam]) {
      const product = PRODUCT_CANVAS_MAP[productParam];
      setCanvasWidth(product.width);
      setCanvasHeight(product.height);
      setActiveProduct(productParam);
    }
  }, [productParam]);

  const selectedElement = elements.find((el) => el.id === selectedId);

  const saveToHistory = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...elements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [elements, history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements([...history[historyIndex - 1]]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements([...history[historyIndex + 1]]);
    }
  };

  const addElement = (type: CanvasElement['type']) => {
    const id = `el_${Date.now()}`;
    let newEl: CanvasElement;

    switch (type) {
      case 'text':
        newEl = {
          id, type: 'text', x: 100, y: 100, width: 200, height: 40,
          fill: selectedColor, text: textInput || 'Your Text', fontSize, fontFamily,
          fontWeight: 'normal', fontStyle: 'normal', rotation: 0, opacity: 1,
        };
        break;
      case 'rect':
        newEl = {
          id, type: 'rect', x: 100, y: 100, width: 150, height: 100,
          fill: selectedColor, rotation: 0, opacity: 1, strokeWidth: 0,
        };
        break;
      case 'circle':
        newEl = {
          id, type: 'circle', x: 100, y: 100, width: 100, height: 100,
          fill: selectedColor, rotation: 0, opacity: 1, radius: 50, strokeWidth: 0,
        };
        break;
      case 'line':
        newEl = {
          id, type: 'line', x: 100, y: 100, width: 200, height: 0,
          fill: selectedColor, rotation: 0, opacity: 1, strokeWidth: 2,
        };
        break;
      default:
        return;
    }

    setElements([...elements, newEl]);
    setSelectedId(id);
    saveToHistory();
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedId === id) setSelectedId(null);
    saveToHistory();
  };

  const duplicateElement = (id: string) => {
    const el = elements.find((e) => e.id === id);
    if (!el) return;
    const newEl = { ...el, id: `el_${Date.now()}`, x: el.x + 20, y: el.y + 20 };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
    saveToHistory();
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(elements.map((el) => el.id === id ? { ...el, ...updates } : el));
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check if clicking on an element
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height) {
        setSelectedId(el.id);
        setIsDragging(true);
        setDragStart({ x: x - el.x, y: y - el.y });
        return;
      }
    }

    // Add element at click position if tool is active
    if (selectedTool === 'text' || selectedTool === 'rect' || selectedTool === 'circle') {
      const id = `el_${Date.now()}`;
      const newEl: CanvasElement = {
        id, type: selectedTool as CanvasElement['type'],
        x, y, width: selectedTool === 'text' ? 200 : 150, height: selectedTool === 'text' ? 40 : 100,
        fill: selectedColor, text: selectedTool === 'text' ? (textInput || 'Text') : undefined,
        fontSize: selectedTool === 'text' ? fontSize : undefined,
        fontFamily: selectedTool === 'text' ? fontFamily : undefined,
        rotation: 0, opacity: 1, strokeWidth: 0,
        radius: selectedTool === 'circle' ? 50 : undefined,
      };
      setElements([...elements, newEl]);
      setSelectedId(id);
      saveToHistory();
    } else {
      setSelectedId(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedId) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX - dragStart.x;
    const y = (e.clientY - rect.top) * scaleY - dragStart.y;
    updateElement(selectedId, { x, y });
  };

  const handleCanvasMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      saveToHistory();
    }
  };

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Grid
    ctx.strokeStyle = '#e2e8f020';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvasWidth; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
    }
    for (let y = 0; y < canvasHeight; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }

    // Elements
    elements.forEach((el) => {
      ctx.save();
      ctx.globalAlpha = el.opacity;

      if (el.rotation) {
        ctx.translate(el.x + el.width / 2, el.y + el.height / 2);
        ctx.rotate((el.rotation * Math.PI) / 180);
        ctx.translate(-(el.x + el.width / 2), -(el.y + el.height / 2));
      }

      switch (el.type) {
        case 'rect': {
          const r = (el as any).radius || 0;
          if (el.fill && el.fill !== 'transparent') {
            ctx.fillStyle = el.fill;
            if (r > 0) {
              ctx.beginPath();
              ctx.roundRect(el.x, el.y, el.width, el.height, r);
              ctx.fill();
            } else {
              ctx.fillRect(el.x, el.y, el.width, el.height);
            }
          }
          if (el.stroke) {
            ctx.strokeStyle = el.stroke;
            ctx.lineWidth = el.strokeWidth || 2;
            if (r > 0) {
              ctx.beginPath();
              ctx.roundRect(el.x, el.y, el.width, el.height, r);
              ctx.stroke();
            } else {
              ctx.strokeRect(el.x, el.y, el.width, el.height);
            }
          }
          break;
        }
        case 'circle':
          ctx.fillStyle = el.fill;
          ctx.beginPath();
          ctx.ellipse(el.x + el.width / 2, el.y + el.height / 2, el.width / 2, el.height / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          if (el.stroke) {
            ctx.strokeStyle = el.stroke;
            ctx.lineWidth = el.strokeWidth || 2;
            ctx.stroke();
          }
          break;
        case 'text': {
          ctx.fillStyle = el.fill;
          const fs = el.fontSize || 24;
          const fw = el.fontWeight === 'bold' ? 'bold' : 'normal';
          ctx.font = `${fw} ${fs}px ${el.fontFamily || 'Inter'}, sans-serif`;
          ctx.textBaseline = 'top';
          const maxWidth = el.width || 600;
          const words = (el.text || '').split(' ');
          let line = '';
          let lineY = el.y;
          for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && i > 0) {
              ctx.fillText(line.trim(), el.x, lineY);
              line = words[i] + ' ';
              lineY += fs * 1.3;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line.trim(), el.x, lineY);
          break;
        }
        case 'line':
          ctx.strokeStyle = el.fill;
          ctx.lineWidth = el.strokeWidth || 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(el.x, el.y);
          ctx.lineTo(el.x + el.width, el.y + el.height);
          ctx.stroke();
          break;
        case 'image':
          if (el.src) {
            const img = new window.Image();
            img.onload = () => ctx.drawImage(img, el.x, el.y, el.width, el.height);
            img.src = el.src;
          }
          break;
      }

      ctx.restore();

      // Selection highlight
      if (el.id === selectedId) {
        ctx.strokeStyle = '#0B57D0';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(el.x - 4, el.y - 4, el.width + 8, el.height + 8);
        ctx.setLineDash([]);

        // Resize handles
        const handles = [
          { x: el.x - 4, y: el.y - 4 },
          { x: el.x + el.width, y: el.y - 4 },
          { x: el.x - 4, y: el.y + el.height },
          { x: el.x + el.width, y: el.y + el.height },
        ];
        handles.forEach((h) => {
          ctx.fillStyle = '#0B57D0';
          ctx.fillRect(h.x, h.y, 8, 8);
        });
      }
    });
  }, [elements, selectedId, canvasWidth, canvasHeight, bgColor, zoom]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'design.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#0f172a', overflow: 'hidden' }}>
      {/* Top Toolbar */}
      <div className="d-flex align-items-center justify-content-between px-4 shrink-0" style={{ height: '48px', backgroundColor: '#1e293b', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="d-flex align-items-center gap-3">
          <Link href="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <Logo size="sm" dark={false} showText={false} />
            <span className="text-white fw-semibold text-sm font-heading d-none d-sm-inline">Design Studio</span>
          </Link>

          <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.1)' }} />

          {/* File Tools */}
          <div className="d-flex align-items-center gap-1">
            <button onClick={undo} className="btn btn-sm p-1" style={{ color: 'rgba(255,255,255,0.5)' }} title="Undo">
              <Undo2 size={16} />
            </button>
            <button onClick={redo} className="btn btn-sm p-1" style={{ color: 'rgba(255,255,255,0.5)' }} title="Redo">
              <Redo2 size={16} />
            </button>
          </div>

          <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.1)' }} />

          {/* Zoom */}
          <div className="d-flex align-items-center gap-2">
            <button onClick={() => setZoom(Math.max(25, zoom - 25))} className="btn btn-sm p-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <ZoomOut size={16} />
            </button>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)', width: '40px', textAlign: 'center' }}>{zoom}%</span>
            <button onClick={() => setZoom(Math.min(400, zoom + 25))} className="btn btn-sm p-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <ZoomIn size={16} />
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="btn btn-sm d-flex align-items-center gap-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
          >
            <FileText size={14} />
            Templates
          </button>
          <button
            onClick={() => setShowAIAgent(!showAIAgent)}
            className={`btn btn-sm d-flex align-items-center gap-1 ${showAIAgent ? 'btn-primary' : ''}`}
            style={!showAIAgent ? { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' } : {}}
          >
            <Bot size={14} />
            AI Agent
          </button>
          <button
            onClick={handleDownload}
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
          >
            <Download size={14} />
            Download
          </button>
          <button className="btn btn-sm d-flex align-items-center gap-1" style={{ backgroundColor: '#6c5ce7', color: 'white' }}>
            <Save size={14} />
            Save
          </button>
        </div>
      </div>

      {/* Product Context Banner */}
      {activeProduct && PRODUCT_CANVAS_MAP[activeProduct] && (
        <div className="d-flex align-items-center justify-content-center px-4 shrink-0" style={{ height: '36px', backgroundColor: 'rgba(13, 110, 253, 0.1)', borderBottom: '1px solid rgba(13, 110, 253, 0.2)' }}>
          <div className="d-flex align-items-center gap-2 text-xs">
            <Sparkles size={14} className="text-primary" />
            <span className="text-primary fw-medium">
              Designing for: {PRODUCT_CANVAS_MAP[activeProduct].label}
            </span>
            <span className="text-muted">
              ({canvasWidth} × {canvasHeight} px)
            </span>
            <Link
              href={`/products/${activeProduct}`}
              className="ms-2 text-primary text-decoration-underline"
            >
              View Product
            </Link>
            <button
              onClick={() => { setActiveProduct(null); setCanvasWidth(1050); setCanvasHeight(600); }}
              className="ms-2 btn btn-sm p-0"
              style={{ color: '#64748b' }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Template Picker Modal */}
      {showTemplates && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="position-absolute bg-white rounded-2xl shadow-lg border p-4"
          style={{ top: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: 50, width: '600px', borderColor: '#dee2e6' }}
        >
          <h3 className="text-lg fw-bold text-dark mb-3">Choose a Template</h3>
          <div className="row g-3">
            {TEMPLATES.map((t) => (
              <div key={t.name} className="col-4">
                <button
                  onClick={() => {
                    setCanvasWidth(t.width);
                    setCanvasHeight(t.height);
                    setShowTemplates(false);
                  }}
                  className="w-100 p-3 border rounded-xl text-start"
                  style={{ borderColor: '#dee2e6' }}
                >
                  <div className="w-100 bg-light rounded-lg mb-2 d-flex align-items-center justify-content-center" style={{ aspectRatio: '3/2' }}>
                    <span className="text-xs text-muted">{t.width}×{t.height}</span>
                  </div>
                  <p className="text-sm fw-semibold text-dark">{t.name}</p>
                  <p className="text-muted" style={{ fontSize: '10px' }}>{t.category}</p>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="d-flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="d-flex flex-column align-items-center py-3 gap-1 shrink-0" style={{ width: '56px', backgroundColor: '#1e293b', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            { id: 'select', icon: Move, label: 'Select' },
            { id: 'text', icon: Type, label: 'Text' },
            { id: 'rect', icon: Square, label: 'Rectangle' },
            { id: 'circle', icon: Circle, label: 'Circle' },
            { id: 'line', icon: Minus, label: 'Line' },
            { id: 'image', icon: Image, label: 'Image' },
            { id: 'upload', icon: Upload, label: 'Upload' },
            { id: 'shapes', icon: Shapes, label: 'Shapes' },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`rounded-xl d-flex align-items-center justify-content-center ${selectedTool === tool.id ? 'bg-primary text-white shadow' : ''}`}
              style={{ width: '40px', height: '40px', color: selectedTool === tool.id ? undefined : 'rgba(255,255,255,0.4)' }}
              title={tool.label}
            >
              <tool.icon size={18} />
            </button>
          ))}

          <div className="flex-grow-1" />

          <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '8px' }} />

          <button
            onClick={() => setShowLayers(!showLayers)}
            className={`rounded-xl d-flex align-items-center justify-content-center ${showLayers ? 'bg-white bg-opacity-15 text-white' : ''}`}
            style={{ width: '40px', height: '40px', color: showLayers ? undefined : 'rgba(255,255,255,0.4)' }}
            title="Layers"
          >
            <Layers size={18} />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-grow-1 overflow-auto d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#020617' }}>
          <div
            className="position-relative shadow"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
          >
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              className="rounded-lg"
              style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 200px)', cursor: 'crosshair' }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="d-flex flex-column overflow-hidden shrink-0" style={{ width: '288px', backgroundColor: 'white', borderLeft: '1px solid #dee2e6' }}>
          {/* Properties Panel */}
          {selectedElement ? (
            <div className="p-3 border-bottom overflow-y-auto" style={{ maxHeight: '50vh', borderColor: '#f8f9fa' }}>
              <h3 className="text-xs fw-bold text-muted text-uppercase tracking-wider mb-3">Properties</h3>

              {selectedElement.type === 'text' && (
                <>
                  <div className="mb-3">
                    <label className="text-xs fw-medium text-secondary mb-1 d-block">Text</label>
                    <input
                      type="text"
                      value={selectedElement.text || ''}
                      onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="text-xs fw-medium text-secondary mb-1 d-block">Font</label>
                      <select
                        value={selectedElement.fontFamily || 'Inter'}
                        onChange={(e) => updateElement(selectedElement.id, { fontFamily: e.target.value })}
                        className="form-select form-select-sm"
                      >
                        {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="text-xs fw-medium text-secondary mb-1 d-block">Size</label>
                      <input
                        type="number"
                        value={selectedElement.fontSize || 24}
                        onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="text-xs fw-medium text-secondary mb-1 d-block">X</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.x)}
                    onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) })}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-6">
                  <label className="text-xs fw-medium text-secondary mb-1 d-block">Y</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.y)}
                    onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) })}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="text-xs fw-medium text-secondary mb-1 d-block">Width</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.width)}
                    onChange={(e) => updateElement(selectedElement.id, { width: parseInt(e.target.value) })}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-6">
                  <label className="text-xs fw-medium text-secondary mb-1 d-block">Height</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.height)}
                    onChange={(e) => updateElement(selectedElement.id, { height: parseInt(e.target.value) })}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="text-xs fw-medium text-secondary mb-1 d-block">Color</label>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="color"
                    value={selectedElement.fill}
                    onChange={(e) => updateElement(selectedElement.id, { fill: e.target.value })}
                    className="form-control form-control-color"
                    style={{ width: '32px', height: '32px' }}
                  />
                  <input
                    type="text"
                    value={selectedElement.fill}
                    onChange={(e) => updateElement(selectedElement.id, { fill: e.target.value })}
                    className="form-control form-control-sm font-monospace flex-grow-1"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="text-xs fw-medium text-secondary mb-1 d-block">Opacity: {Math.round(selectedElement.opacity * 100)}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={selectedElement.opacity * 100}
                  onChange={(e) => updateElement(selectedElement.id, { opacity: parseInt(e.target.value) / 100 })}
                  className="form-range"
                  style={{ accentColor: 'var(--bs-primary)' }}
                />
              </div>

              <div className="mb-3">
                <label className="text-xs fw-medium text-secondary mb-1 d-block">Rotation: {selectedElement.rotation}°</label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={selectedElement.rotation}
                  onChange={(e) => updateElement(selectedElement.id, { rotation: parseInt(e.target.value) })}
                  className="form-range"
                  style={{ accentColor: 'var(--bs-primary)' }}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  onClick={() => duplicateElement(selectedElement.id)}
                  className="flex-grow-1 btn btn-light btn-sm d-flex align-items-center justify-content-center gap-1"
                >
                  <Copy size={14} />
                  Duplicate
                </button>
                <button
                  onClick={() => deleteElement(selectedElement.id)}
                  className="flex-grow-1 btn btn-sm d-flex align-items-center justify-content-center gap-1"
                  style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 border-bottom" style={{ borderColor: '#f8f9fa' }}>
              <h3 className="text-xs fw-bold text-muted text-uppercase tracking-wider mb-3">Canvas</h3>
              <div className="d-flex flex-column gap-3">
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-xs fw-medium text-secondary mb-1 d-block">Width</label>
                    <input
                      type="number"
                      value={canvasWidth}
                      onChange={(e) => setCanvasWidth(parseInt(e.target.value) || 1050)}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-xs fw-medium text-secondary mb-1 d-block">Height</label>
                    <input
                      type="number"
                      value={canvasHeight}
                      onChange={(e) => setCanvasHeight(parseInt(e.target.value) || 600)}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs fw-medium text-secondary mb-1 d-block">Background</label>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="form-control form-control-color"
                      style={{ width: '32px', height: '32px' }}
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="form-control form-control-sm font-monospace flex-grow-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Color Palette */}
          <div className="p-3 border-bottom" style={{ borderColor: '#f8f9fa' }}>
            <h3 className="text-xs fw-bold text-muted text-uppercase tracking-wider mb-3">Colors</h3>
            <div className="d-flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-lg border-2 ${selectedColor === color ? 'border-dark' : ''}`}
                  style={{ width: '28px', height: '28px', backgroundColor: color, borderColor: selectedColor === color ? '#212529' : '#dee2e6' }}
                />
              ))}
            </div>
          </div>

          {/* Layers */}
          {showLayers && (
            <div className="flex-grow-1 overflow-y-auto p-3">
              <h3 className="text-xs fw-bold text-muted text-uppercase tracking-wider mb-3">Layers</h3>
              <div className="d-flex flex-column gap-1">
                {elements.map((el, i) => (
                  <button
                    key={el.id}
                    onClick={() => setSelectedId(el.id)}
                    className={`w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-lg text-start ${selectedId === el.id ? 'bg-primary bg-opacity-10 text-primary' : 'text-secondary'}`}
                  >
                    <div className="rounded border" style={{ width: '16px', height: '16px', backgroundColor: el.fill, borderColor: '#dee2e6' }} />
                    <span className="text-xs fw-medium flex-grow-1 text-truncate">
                      {el.type === 'text' ? `"${el.text}"` : el.type}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteElement(el.id); }}
                      className="btn btn-sm p-0"
                      style={{ color: '#64748b' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </button>
                ))}
                {elements.length === 0 && (
                  <p className="text-xs text-muted text-center py-3">No elements yet</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* AI Agent Panel */}
        <AIAgentPanel
          isOpen={showAIAgent}
          onClose={() => setShowAIAgent(false)}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          elements={elements}
          backgroundColor={bgColor}
          onDesignGenerated={(design) => {
            setElements(design.elements);
            setBgColor(design.backgroundColor);
            saveToHistory();
          }}
          onElementsUpdate={(newElements) => {
            setElements(newElements);
            saveToHistory();
          }}
          onBackgroundChange={(color) => setBgColor(color)}
        />
      </div>
    </div>
  );
}
