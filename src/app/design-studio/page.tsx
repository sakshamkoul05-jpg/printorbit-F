'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Type, Image, Square, Circle, Minus, Undo2, Redo2, Download, Save,
  ZoomIn, ZoomOut, Trash2, Copy, Layers, Palette, ChevronDown, Sparkles,
  Upload, Grid3X3, Move, RotateCw, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, Sliders, FileText, Shapes, Eraser,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

interface CanvasElement {
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
        case 'rect':
          ctx.fillStyle = el.fill;
          ctx.fillRect(el.x, el.y, el.width, el.height);
          if (el.strokeWidth) {
            ctx.strokeStyle = el.stroke || el.fill;
            ctx.lineWidth = el.strokeWidth;
            ctx.strokeRect(el.x, el.y, el.width, el.height);
          }
          break;
        case 'circle':
          ctx.fillStyle = el.fill;
          ctx.beginPath();
          ctx.arc(el.x + el.width / 2, el.y + el.height / 2, el.width / 2, 0, Math.PI * 2);
          ctx.fill();
          if (el.strokeWidth) {
            ctx.strokeStyle = el.stroke || el.fill;
            ctx.lineWidth = el.strokeWidth;
            ctx.stroke();
          }
          break;
        case 'text':
          ctx.fillStyle = el.fill;
          ctx.font = `${el.fontStyle || 'normal'} ${el.fontWeight || 'normal'} ${el.fontSize || 24}px ${el.fontFamily || 'Inter'}`;
          ctx.fillText(el.text || '', el.x, el.y + (el.fontSize || 24));
          break;
        case 'line':
          ctx.strokeStyle = el.fill;
          ctx.lineWidth = el.strokeWidth || 2;
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
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden">
      {/* Top Toolbar */}
      <div className="h-12 bg-dark border-b border-white/10 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="sm" dark={false} showText={false} />
            <span className="text-white font-semibold text-sm font-heading hidden sm:inline">Design Studio</span>
          </Link>

          <div className="h-5 w-px bg-white/10" />

          {/* File Tools */}
          <div className="flex items-center gap-1">
            <button onClick={undo} className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Undo">
              <Undo2 className="w-4 h-4" />
            </button>
            <button onClick={redo} className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Redo">
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          <div className="h-5 w-px bg-white/10" />

          {/* Zoom */}
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(Math.max(25, zoom - 25))} className="p-1 text-white/50 hover:text-white rounded">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-white/60 w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(400, zoom + 25))} className="p-1 text-white/50 hover:text-white rounded">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/15 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            Templates
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accent-dark transition-colors">
            <Save className="w-3.5 h-3.5" />
            Save
          </button>
        </div>
      </div>

      {/* Product Context Banner */}
      {activeProduct && PRODUCT_CANVAS_MAP[activeProduct] && (
        <div className="h-9 bg-primary/10 border-b border-primary/20 flex items-center justify-center px-4 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-medium">
              Designing for: {PRODUCT_CANVAS_MAP[activeProduct].label}
            </span>
            <span className="text-slate-400">
              ({canvasWidth} × {canvasHeight} px)
            </span>
            <Link
              href={`/products/${activeProduct}`}
              className="ml-2 text-primary underline hover:text-primary/80 transition-colors"
            >
              View Product
            </Link>
            <button
              onClick={() => { setActiveProduct(null); setCanvasWidth(1050); setCanvasHeight(600); }}
              className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"
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
          className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 w-[600px]"
        >
          <h3 className="text-lg font-bold text-dark mb-4">Choose a Template</h3>
          <div className="grid grid-cols-3 gap-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.name}
                onClick={() => {
                  setCanvasWidth(t.width);
                  setCanvasHeight(t.height);
                  setShowTemplates(false);
                }}
                className="p-4 border border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left"
              >
                <div className="w-full aspect-[3/2] bg-slate-100 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-xs text-muted">{t.width}×{t.height}</span>
                </div>
                <p className="text-sm font-semibold text-dark">{t.name}</p>
                <p className="text-[10px] text-muted">{t.category}</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-14 bg-dark-light border-r border-white/10 flex flex-col items-center py-3 gap-1 shrink-0">
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
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                selectedTool === tool.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-white/40 hover:text-white hover:bg-white/10'
              }`}
              title={tool.label}
            >
              <tool.icon className="w-4.5 h-4.5" />
            </button>
          ))}

          <div className="flex-1" />

          <div className="w-8 h-px bg-white/10 mb-2" />

          <button
            onClick={() => setShowLayers(!showLayers)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              showLayers ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white hover:bg-white/10'
            }`}
            title="Layers"
          >
            <Layers className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto flex items-center justify-center bg-slate-950 p-8">
          <div
            className="relative shadow-2xl"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
          >
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              className="cursor-crosshair rounded-lg"
              style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 200px)' }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-72 bg-white border-l border-slate-200 flex flex-col overflow-hidden shrink-0">
          {/* Properties Panel */}
          {selectedElement ? (
            <div className="p-4 border-b border-slate-100 space-y-4 overflow-y-auto max-h-[50vh]">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Properties</h3>

              {selectedElement.type === 'text' && (
                <>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Text</label>
                    <input
                      type="text"
                      value={selectedElement.text || ''}
                      onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">Font</label>
                      <select
                        value={selectedElement.fontFamily || 'Inter'}
                        onChange={(e) => updateElement(selectedElement.id, { fontFamily: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary"
                      >
                        {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">Size</label>
                      <input
                        type="number"
                        value={selectedElement.fontSize || 24}
                        onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">X</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.x)}
                    onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Y</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.y)}
                    onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Width</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.width)}
                    onChange={(e) => updateElement(selectedElement.id, { width: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Height</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.height)}
                    onChange={(e) => updateElement(selectedElement.id, { height: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={selectedElement.fill}
                    onChange={(e) => updateElement(selectedElement.id, { fill: e.target.value })}
                    className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedElement.fill}
                    onChange={(e) => updateElement(selectedElement.id, { fill: e.target.value })}
                    className="flex-1 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm font-mono outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Opacity: {Math.round(selectedElement.opacity * 100)}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={selectedElement.opacity * 100}
                  onChange={(e) => updateElement(selectedElement.id, { opacity: parseInt(e.target.value) / 100 })}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Rotation: {selectedElement.rotation}°</label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={selectedElement.rotation}
                  onChange={(e) => updateElement(selectedElement.id, { rotation: parseInt(e.target.value) })}
                  className="w-full accent-primary"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => duplicateElement(selectedElement.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Duplicate
                </button>
                <button
                  onClick={() => deleteElement(selectedElement.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red/10 text-red text-xs font-medium rounded-lg hover:bg-red/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Canvas</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Width</label>
                    <input
                      type="number"
                      value={canvasWidth}
                      onChange={(e) => setCanvasWidth(parseInt(e.target.value) || 1050)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Height</label>
                    <input
                      type="number"
                      value={canvasHeight}
                      onChange={(e) => setCanvasHeight(parseInt(e.target.value) || 600)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm font-mono outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Color Palette */}
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-lg border-2 transition-all ${
                    selectedColor === color ? 'border-dark scale-110' : 'border-slate-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Layers */}
          {showLayers && (
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Layers</h3>
              <div className="space-y-1">
                {elements.map((el, i) => (
                  <button
                    key={el.id}
                    onClick={() => setSelectedId(el.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedId === el.id ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-4 h-4 rounded border border-slate-200" style={{ backgroundColor: el.fill }} />
                    <span className="text-xs font-medium flex-1 truncate">
                      {el.type === 'text' ? `"${el.text}"` : el.type}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteElement(el.id); }}
                      className="p-0.5 text-slate-400 hover:text-red"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </button>
                ))}
                {elements.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4">No elements yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
