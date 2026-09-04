'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Sparkles, Loader2, Wand2, Palette, Type, Shapes,
  ChevronRight, ChevronDown, Send, ArrowRight, Download,
  RefreshCw, Zap, Eye, Layers, Star, Paintbrush,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { aiAPI } from '@/lib/ai';
import { generateLayout, getLayoutIds, getStyleIds, TEMPLATE_REGISTRY, STYLE_TO_PALETTE } from '@/lib/designEngine';
import type { CanvasElement } from '@/app/design-studio/page';

type WidgetView = 'home' | 'generate' | 'preview' | 'chat';

interface ProductTemplate {
  id: string;
  name: string;
  icon: string;
  width: number;
  height: number;
  category: string;
  description: string;
}

interface StylePreset {
  id: string;
  name: string;
  colors: string[];
  description: string;
  gradient: string;
}

const PRODUCT_TEMPLATES: ProductTemplate[] = [
  { id: 'business-card', name: 'Business Card', icon: '💼', width: 1050, height: 600, category: 'Cards', description: 'Professional visiting cards' },
  { id: 'flyer-a5', name: 'A5 Flyer', icon: '📄', width: 1754, height: 2480, category: 'Marketing', description: 'Eye-catching promotional flyers' },
  { id: 'flyer-a4', name: 'A4 Flyer', icon: '📋', width: 2480, height: 3508, category: 'Marketing', description: 'Large format promotional material' },
  { id: 'brochure', name: 'Brochure', icon: '📑', width: 2480, height: 3508, category: 'Marketing', description: 'Multi-fold informational brochure' },
  { id: 'banner-vinyl', name: 'Vinyl Banner', icon: '🏁', width: 3600, height: 7200, category: 'Signage', description: 'Indoor & outdoor banners' },
  { id: 'sticker', name: 'Die-Cut Sticker', icon: '🏷️', width: 600, height: 600, category: 'Packaging', description: 'Custom shaped stickers' },
  { id: 'tshirt', name: 'T-Shirt', icon: '👕', width: 1200, height: 1600, category: 'Apparel', description: 'Custom printed t-shirts' },
  { id: 'mug', name: 'Ceramic Mug', icon: '☕', width: 1200, height: 800, category: 'Gifts', description: 'Personalized drinkware' },
  { id: 'letterhead', name: 'Letterhead', icon: '✉️', width: 2480, height: 3508, category: 'Stationery', description: 'Professional letterheads' },
  { id: 'poster-a3', name: 'Poster A3', icon: '🖼️', width: 3508, height: 4961, category: 'Signage', description: 'Large format posters' },
  { id: 'instagram-post', name: 'Instagram Post', icon: '📱', width: 1080, height: 1080, category: 'Social', description: 'Social media content' },
  { id: 'youtube-thumb', name: 'YouTube Thumbnail', icon: '🎬', width: 1280, height: 720, category: 'Social', description: 'Video thumbnails' },
];

const STYLE_PRESETS: StylePreset[] = [
  { id: 'modern', name: 'Modern', colors: ['#0B57D0', '#FFFFFF', '#1F2937'], description: 'Clean & professional', gradient: 'from-blue-500 to-blue-700' },
  { id: 'luxury', name: 'Luxury', colors: ['#1A1A2E', '#C9A84C', '#FFFFFF'], description: 'Elegant gold accents', gradient: 'from-yellow-600 to-yellow-800' },
  { id: 'bold', name: 'Bold', colors: ['#FF6B00', '#FFFFFF', '#0F172A'], description: 'High impact & energy', gradient: 'from-orange-500 to-red-600' },
  { id: 'minimal', name: 'Minimal', colors: ['#FFFFFF', '#1F2937', '#E2E8F0'], description: 'Simple & sophisticated', gradient: 'from-slate-100 to-slate-300' },
  { id: 'eco', name: 'Eco Fresh', colors: ['#16A34A', '#FFFFFF', '#065F46'], description: 'Natural & sustainable', gradient: 'from-green-500 to-emerald-700' },
  { id: 'creative', name: 'Creative', colors: ['#7C3AED', '#EC4899', '#FFFFFF'], description: 'Artistic & vibrant', gradient: 'from-purple-500 to-pink-500' },
  { id: 'corporate', name: 'Corporate', colors: ['#0F172A', '#3B82F6', '#FFFFFF'], description: 'Trust & reliability', gradient: 'from-slate-800 to-blue-600' },
  { id: 'playful', name: 'Playful', colors: ['#F59E0B', '#EF4444', '#3B82F6'], description: 'Fun & energetic', gradient: 'from-amber-400 to-pink-500' },
];

const QUICK_DESIGNS = [
  { label: 'Business Card', prompt: 'Create a modern professional business card with clean typography, subtle gradient accent, and clear hierarchy for name, title, and contact info', product: 'business-card' },
  { label: 'Event Flyer', prompt: 'Design a bold event flyer with large headline, event details, date/time prominent, eye-catching colors, and clear call-to-action', product: 'flyer-a5' },
  { label: 'Product Label', prompt: 'Create a premium product label with elegant typography, brand logo placement, ingredients/info section, and sophisticated color scheme', product: 'sticker' },
  { label: 'Social Post', prompt: 'Design an engaging Instagram post with modern layout, bold text overlay, brand colors, and scroll-stopping visual hierarchy', product: 'instagram-post' },
  { label: 'T-Shirt Print', prompt: 'Create a trendy t-shirt graphic design with bold typography, modern illustration style, and vibrant colors that pop on fabric', product: 'tshirt' },
  { label: 'Banner', prompt: 'Design a large format banner with huge readable text, strong visual impact, clear message hierarchy, and professional branding', product: 'banner-vinyl' },
];

export default function OrbitMagicWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<WidgetView>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductTemplate | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StylePreset>(STYLE_PRESETS[0]);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState<{ backgroundColor: string; elements: CanvasElement[] } | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: "Hi! I'm Orbit Magic — your AI design assistant. I can create professional print designs in seconds. What would you like to design today?" },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-orbit-magic', handleToggle);
    return () => window.removeEventListener('toggle-orbit-magic', handleToggle);
  }, []);

  useEffect(() => {
    if (hasNotified) return;
    const t = setTimeout(() => setHasNotified(true), 3000);
    return () => clearTimeout(t);
  }, [hasNotified]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const drawPreview = useCallback((design: { backgroundColor: string; elements: CanvasElement[] }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = selectedProduct?.width || 1050;
    const h = selectedProduct?.height || 600;
    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = design.backgroundColor;
    ctx.fillRect(0, 0, w, h);

    design.elements.forEach((el) => {
      ctx.save();
      ctx.globalAlpha = el.opacity;
      if (el.rotation) {
        ctx.translate(el.x + el.width / 2, el.y + el.height / 2);
        ctx.rotate((el.rotation * Math.PI) / 180);
        ctx.translate(-(el.x + el.width / 2), -(el.y + el.height / 2));
      }

      if (el.type === 'rect') {
        if (el.fill && el.fill !== 'transparent') {
          ctx.fillStyle = el.fill;
          const r = (el as any).radius || 0;
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
          ctx.strokeRect(el.x, el.y, el.width, el.height);
        }
      } else if (el.type === 'circle') {
        ctx.fillStyle = el.fill;
        ctx.beginPath();
        ctx.ellipse(el.x + el.width / 2, el.y + el.height / 2, el.width / 2, el.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        if (el.stroke) {
          ctx.strokeStyle = el.stroke;
          ctx.lineWidth = el.strokeWidth || 2;
          ctx.stroke();
        }
      } else if (el.type === 'text' && el.text) {
        ctx.fillStyle = el.fill;
        const fs = el.fontSize || 16;
        const fw = el.fontWeight === 'bold' ? 'bold' : 'normal';
        ctx.font = `${fw} ${fs}px ${el.fontFamily || 'Inter'}, sans-serif`;
        ctx.textBaseline = 'top';
        const maxWidth = el.width || 600;
        const words = el.text.split(' ');
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
      } else if (el.type === 'line') {
        ctx.strokeStyle = el.fill;
        ctx.lineWidth = el.strokeWidth || 1;
        ctx.beginPath();
        ctx.moveTo(el.x, el.y);
        ctx.lineTo(el.x + el.width, el.y + el.height);
        ctx.stroke();
      }
      ctx.restore();
    });
  }, [selectedProduct]);

  useEffect(() => {
    if (generatedDesign) drawPreview(generatedDesign);
  }, [generatedDesign, drawPreview]);

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedProduct) return;
    setIsGenerating(true);
    setView('preview');

    try {
      const result = await aiAPI.generateContent(prompt, selectedProduct.width, selectedProduct.height, selectedProduct.id);
      const design = generateLayout(
        result.layout || 'centered',
        result.style || selectedStyle.id,
        result.content,
        selectedProduct.width,
        selectedProduct.height,
        selectedProduct.id,
      );
      setGeneratedDesign(design);
      const aiStyle = STYLE_TO_PALETTE[result.style || selectedStyle.id];
      if (aiStyle) {
        const preset = STYLE_PRESETS.find(s => s.id === result.style);
        if (preset) setSelectedStyle(preset);
      }
    } catch {
      const fallbackContent = {
        title: 'YOUR DESIGN',
        subtitle: prompt.slice(0, 60),
        body: '',
        tagline: selectedProduct.name.toUpperCase(),
        contact: 'www.printorbit.in',
        cta: 'Order Now',
      };
      const design = generateLayout('centered', selectedStyle.id, fallbackContent, selectedProduct.width, selectedProduct.height, selectedProduct.id);
      setGeneratedDesign(design);
    }
    setIsGenerating(false);
  };

  const sendChat = async (text: string) => {
    if (!text.trim() || chatLoading) return;
    setChatMessages((prev) => [...prev, { role: 'user', text: text.trim() }]);
    setChatInput('');
    setChatLoading(true);
    try {
      const result = await aiAPI.chat(text.trim(), 'User is in Orbit Magic design assistant');
      setChatMessages((prev) => [...prev, { role: 'assistant', text: result.reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble. Please try again!" }]);
    }
    setChatLoading(false);
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          onClick={() => setIsOpen(true)}
          className="position-fixed border-0 p-0"
          style={{ bottom: '1.5rem', right: '1.5rem', zIndex: 50, background: 'transparent' }}
          aria-label="Open Orbit Magic"
        >
          <span className="position-absolute rounded-circle" style={{ inset: 0, background: 'linear-gradient(to right, var(--bs-primary, #0d6efd), #6f42c1)', opacity: 0.2, animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite' }} />
          <span className="position-relative d-flex align-items-center justify-content-center rounded-circle" style={{ width: '4rem', height: '4rem', background: 'linear-gradient(to bottom right, var(--bs-primary, #0d6efd), #6f42c1)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', transition: 'all 0.3s', transform: 'scale(1)' }}>
            <Image src="/mascot-orbit.svg" alt="Orbit Magic" width={44} height={44} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />
          </span>
          {!isOpen && hasNotified && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="position-absolute d-flex align-items-center justify-content-center rounded-circle" style={{ top: '-0.25rem', right: '-0.25rem', width: '1.5rem', height: '1.5rem', backgroundColor: '#6f42c1', color: 'var(--bs-white)', fontSize: '10px', fontWeight: 700, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <Sparkles size={12} />
            </motion.span>
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="position-fixed d-flex flex-column overflow-hidden"
            style={{ bottom: '1.5rem', right: '1.5rem', zIndex: 50, width: '420px', maxWidth: 'calc(100vw - 2rem)', height: '640px', maxHeight: 'calc(100vh - 3rem)', backgroundColor: 'var(--bs-white)', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid rgba(226,232,240,0.8)' }}
          >
            {/* Header */}
            <div className="position-relative d-flex align-items-center justify-content-between px-4 py-3" style={{ background: 'linear-gradient(to right, var(--bs-primary, #0d6efd), var(--bs-primary, #0d6efd), #6f42c1)', flexShrink: 0, overflow: 'hidden' }}>
              <div className="position-absolute" style={{ inset: 0, opacity: 0.1 }}>
                <div className="position-absolute rounded-circle" style={{ top: '0.5rem', right: '2rem', width: '5rem', height: '5rem', border: '1px solid rgba(255,255,255,0.3)' }} />
                <div className="position-absolute rounded-circle" style={{ bottom: '-1rem', right: '5rem', width: '4rem', height: '4rem', border: '1px solid rgba(255,255,255,0.2)' }} />
                <div className="position-absolute rounded-circle" style={{ top: '0.25rem', right: '8rem', width: '2rem', height: '2rem', border: '1px solid rgba(255,255,255,0.2)' }} />
              </div>
              <div className="d-flex align-items-center gap-2 position-relative" style={{ zIndex: 10 }}>
                <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '2.75rem', height: '2.75rem', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Image src="/mascot-orbit.svg" alt="Orbit Magic" width={32} height={32} />
                </div>
                <div>
                  <h3 className="d-flex align-items-center gap-1 mb-0" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--bs-white)' }}>
                    Orbit Magic
                    <span className="d-inline-block text-center" style={{ padding: '0.125rem 0.375rem', backgroundColor: 'rgba(111,66,193,0.8)', fontSize: '9px', fontWeight: 700, borderRadius: '9999px', color: 'var(--bs-white)' }}>AI</span>
                  </h3>
                  <p className="mb-0" style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)' }}>Design Studio Assistant</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-1 position-relative" style={{ zIndex: 10 }}>
                {view !== 'home' && (
                  <button onClick={() => setView('home')} className="btn p-2" style={{ color: 'rgba(255,255,255,0.7)', borderRadius: '0.75rem', transition: 'color 0.15s' }} title="Back to home">
                    <RefreshCw size={16} />
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="btn p-2" style={{ color: 'rgba(255,255,255,0.7)', borderRadius: '0.75rem', transition: 'color 0.15s' }}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-fill overflow-y-auto">
              <AnimatePresence mode="wait">
                {view === 'home' && (
                  <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="d-flex flex-column gap-4 p-4">
                    <div className="position-relative rounded-3 p-3" style={{ background: 'linear-gradient(to bottom right, rgba(13,110,253,0.05), rgba(111,66,193,0.05), rgba(13,110,253,0.05))', border: '1px solid rgba(13,110,253,0.1)' }}>
                      <div className="d-flex align-items-start gap-2">
                        <div className="d-flex align-items-center justify-content-center rounded-3 shrink-0" style={{ width: '2.5rem', height: '2.5rem', background: 'linear-gradient(to bottom right, var(--bs-primary, #0d6efd), #6f42c1)', boxShadow: '0 10px 15px -3px rgba(13,110,253,0.2)' }}>
                          <Wand2 size={20} style={{ color: 'var(--bs-white)' }} />
                        </div>
                        <div className="flex-fill">
                          <h4 className="mb-0" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>AI Design Generator</h4>
                          <p className="mb-0 mt-1" style={{ fontSize: '0.75rem', color: '#64748b' }}>Describe your vision, get a print-ready design in seconds</p>
                        </div>
                      </div>
                      <button onClick={() => setView('generate')} className="mt-2 w-100 d-flex align-items-center justify-content-center gap-2 btn" style={{ padding: '0.625rem', background: 'linear-gradient(to right, var(--bs-primary, #0d6efd), var(--bs-primary, #0d6efd))', color: 'var(--bs-white)', fontSize: '0.875rem', fontWeight: 600, borderRadius: '0.75rem', border: 'none', transition: 'box-shadow 0.15s' }}>
                        <Sparkles size={16} />
                        Start Designing
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    <div>
                      <h4 className="mb-3" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Designs</h4>
                      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                        {QUICK_DESIGNS.map((qd) => (
                          <button
                            key={qd.label}
                            onClick={() => {
                              const tmpl = PRODUCT_TEMPLATES.find((p) => p.id === qd.product);
                              if (tmpl) setSelectedProduct(tmpl);
                              setPrompt(qd.prompt);
                              setView('generate');
                            }}
                            className="group text-start btn"
                            style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #f1f5f9', transition: 'all 0.15s' }}
                          >
                            <span style={{ fontSize: '1.125rem' }}>{PRODUCT_TEMPLATES.find((p) => p.id === qd.product)?.icon}</span>
                            <p className="mb-0 mt-1" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', transition: 'color 0.15s' }}>{qd.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-3" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product Templates</h4>
                      <div className="d-flex flex-column" style={{ gap: '0.375rem' }}>
                        {PRODUCT_TEMPLATES.slice(0, 6).map((pt) => (
                          <button
                            key={pt.id}
                            onClick={() => { setSelectedProduct(pt); setView('generate'); }}
                            className="w-100 d-flex align-items-center gap-2 btn"
                            style={{ padding: '0.625rem', borderRadius: '0.75rem', transition: 'all 0.15s' }}
                          >
                            <span className="d-inline-block text-center" style={{ fontSize: '1.25rem', width: '2rem' }}>{pt.icon}</span>
                            <div className="flex-fill text-start">
                              <p className="mb-0" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>{pt.name}</p>
                              <p className="mb-0" style={{ fontSize: '10px', color: '#94a3b8' }}>{pt.description}</p>
                            </div>
                            <ChevronRight size={14} style={{ color: '#cbd5e1' }} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => setView('chat')} className="w-100 d-flex align-items-center gap-2 btn" style={{ padding: '0.75rem', background: 'linear-gradient(to right, rgba(111,66,193,0.05), rgba(13,110,253,0.05))', borderRadius: '0.75rem', border: '1px solid rgba(111,66,193,0.1)', transition: 'all 0.15s' }}>
                      <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '2.25rem', height: '2.25rem', backgroundColor: 'rgba(111,66,193,0.1)' }}>
                        <Sparkles size={16} style={{ color: '#6f42c1' }} />
                      </div>
                      <div className="flex-fill text-start">
                        <p className="mb-0" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>Ask Orbit Magic</p>
                        <p className="mb-0" style={{ fontSize: '10px', color: '#94a3b8' }}>Get design advice & recommendations</p>
                      </div>
                      <ChevronRight size={16} style={{ color: '#cbd5e1' }} />
                    </button>
                  </motion.div>
                )}

                {view === 'generate' && (
                  <motion.div key="generate" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="d-flex flex-column gap-3 p-4">
                    {selectedProduct && (
                      <div className="d-flex align-items-center gap-2 p-2 rounded-3" style={{ backgroundColor: 'rgba(13,110,253,0.05)', border: '1px solid rgba(13,110,253,0.1)' }}>
                        <span style={{ fontSize: '1.5rem' }}>{selectedProduct.icon}</span>
                        <div className="flex-fill">
                          <p className="mb-0" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>{selectedProduct.name}</p>
                          <p className="mb-0" style={{ fontSize: '10px', color: '#94a3b8' }}>{selectedProduct.width} x {selectedProduct.height}px</p>
                        </div>
                        <button onClick={() => setView('home')} className="btn p-0" style={{ fontSize: '0.75rem', color: 'var(--bs-primary, #0d6efd)' }}>Change</button>
                      </div>
                    )}

                    <div>
                      <label className="d-flex align-items-center gap-1 mb-2" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Paintbrush size={12} /> Style
                      </label>
                      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.375rem' }}>
                        {STYLE_PRESETS.map((sp) => (
                          <button
                            key={sp.id}
                            onClick={() => setSelectedStyle(sp)}
                            className="d-flex flex-column align-items-center gap-1 btn"
                            style={{
                              padding: '0.5rem',
                              fontSize: '10px',
                              fontWeight: 500,
                              borderRadius: '0.75rem',
                              transition: 'all 0.15s',
                              backgroundColor: selectedStyle.id === sp.id ? 'var(--bs-primary, #0d6efd)' : '#f8fafc',
                              color: selectedStyle.id === sp.id ? 'var(--bs-white)' : '#64748b',
                              border: 'none',
                              outline: selectedStyle.id === sp.id ? '2px solid rgba(13,110,253,0.3)' : 'none',
                            }}
                          >
                            <div className="d-flex" style={{ gap: '0.125rem' }}>
                              {sp.colors.map((c, i) => (
                                <span key={i} className="rounded-circle" style={{ width: '0.75rem', height: '0.75rem', backgroundColor: c, border: '1px solid rgba(255,255,255,0.5)' }} />
                              ))}
                            </div>
                            {sp.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="d-flex align-items-center gap-1 mb-2" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Type size={12} /> Describe your design
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A premium business card for a luxury real estate agency with marble texture, gold foil accents, and elegant serif typography..."
                        rows={4}
                        className="w-100"
                        style={{
                          padding: '0.75rem 1rem',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '0.75rem',
                          fontSize: '0.875rem',
                          outline: 'none',
                          resize: 'none',
                          transition: 'all 0.15s',
                        }}
                      />
                      <div className="d-flex align-items-center justify-content-between mt-1">
                        <p className="mb-0" style={{ fontSize: '10px', color: '#94a3b8' }}>Tip: Be specific about colors, mood, and layout</p>
                        <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{prompt.length}/500</span>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt.trim()}
                      className="w-100 d-flex align-items-center justify-content-center gap-2 btn"
                      style={{
                        padding: '0.875rem',
                        background: 'linear-gradient(to right, var(--bs-primary, #0d6efd), var(--bs-primary, #0d6efd), #6f42c1)',
                        color: 'var(--bs-white)',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        borderRadius: '0.75rem',
                        transition: 'box-shadow 0.15s',
                        opacity: isGenerating || !prompt.trim() ? 0.5 : 1,
                        border: 'none',
                      }}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Generating Design...
                        </>
                      ) : (
                        <>
                          <Zap size={16} />
                          Generate Design
                          <Sparkles size={16} />
                        </>
                      )}
                    </button>

                    <div>
                      <label className="d-block mb-2" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Try these prompts</label>
                      <div className="d-flex flex-column" style={{ gap: '0.375rem' }}>
                        {[
                          'Modern minimalist with clean lines and subtle gradients',
                          'Bold geometric shapes with vibrant accent colors',
                          'Elegant luxury style with gold foil and serif fonts',
                          'Eco-friendly natural theme with earthy green tones',
                          'Corporate professional with navy blue and white',
                          'Creative artistic with abstract watercolor elements',
                        ].map((sp, i) => (
                          <button
                            key={i}
                            onClick={() => setPrompt(sp)}
                            className="w-100 text-start btn"
                            style={{ padding: '0.5rem 0.75rem', backgroundColor: '#f8fafc', fontSize: '0.75rem', color: '#64748b', borderRadius: '0.5rem', border: '1px solid #f1f5f9', transition: 'all 0.15s' }}
                          >
                            {sp}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'preview' && (
                  <motion.div key="preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="d-flex flex-column gap-3 p-4">
                    <div className="position-relative d-flex align-items-center justify-content-center rounded-3 p-3" style={{ background: 'linear-gradient(to bottom right, #f1f5f9, #e2e8f0)', minHeight: '200px' }}>
                      {isGenerating ? (
                        <div className="text-center py-4">
                          <div className="mx-auto d-flex align-items-center justify-content-center rounded-3 mb-2" style={{ width: '4rem', height: '4rem', background: 'linear-gradient(to bottom right, var(--bs-primary, #0d6efd), #6f42c1)', animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}>
                            <Sparkles size={32} style={{ color: 'var(--bs-white)' }} />
                          </div>
                          <p className="mb-0" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Generating your design...</p>
                          <p className="mb-0 mt-1" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>AI is crafting something beautiful</p>
                          <div className="mx-auto mt-2 rounded-pill overflow-hidden" style={{ width: '12rem', height: '0.375rem', backgroundColor: '#e2e8f0' }}>
                            <motion.div className="h-100 rounded-pill" style={{ background: 'linear-gradient(to right, var(--bs-primary, #0d6efd), #6f42c1)' }} animate={{ width: ['0%', '100%'] }} transition={{ duration: 3, ease: 'easeInOut' }} />
                          </div>
                        </div>
                      ) : generatedDesign ? (
                        <canvas
                          ref={canvasRef}
                          className="rounded shadow"
                          style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                        />
                      ) : null}
                    </div>

                    {generatedDesign && !isGenerating && (
                      <>
                        <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                          <Link
                            href={`/design-studio?product=${selectedProduct?.id || 'standard-business-cards'}`}
                            onClick={() => {
                              if (generatedDesign) {
                                sessionStorage.setItem('orbit-magic-design', JSON.stringify(generatedDesign));
                              }
                            }}
                            className="d-flex align-items-center justify-content-center gap-2 text-decoration-none"
                            style={{ padding: '0.75rem', background: 'linear-gradient(to right, var(--bs-primary, #0d6efd), var(--bs-primary, #0d6efd))', color: 'var(--bs-white)', fontSize: '0.875rem', fontWeight: 600, borderRadius: '0.75rem', transition: 'box-shadow 0.15s' }}
                          >
                            <Layers size={16} />
                            Open in Studio
                          </Link>
                          <button
                            onClick={handleGenerate}
                            className="d-flex align-items-center justify-content-center gap-2 btn"
                            style={{ padding: '0.75rem', backgroundColor: '#f1f5f9', color: '#334155', fontSize: '0.875rem', fontWeight: 600, borderRadius: '0.75rem', transition: 'all 0.15s', border: 'none' }}
                          >
                            <RefreshCw size={16} />
                            Regenerate
                          </button>
                        </div>

                        <div>
                          <label className="d-block mb-2" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Try different styles</label>
                          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.375rem' }}>
                            {STYLE_PRESETS.filter((sp) => sp.id !== selectedStyle.id).slice(0, 4).map((sp) => (
                              <button
                                key={sp.id}
                                onClick={() => {
                                  setSelectedStyle(sp);
                                  if (generatedDesign && selectedProduct) {
                                    const newDesign = generateLayout(
                                      'centered',
                                      sp.id,
                                      { title: 'YOUR DESIGN', subtitle: prompt.slice(0, 60), tagline: selectedProduct.name.toUpperCase(), contact: 'www.printorbit.in', cta: 'Order Now' },
                                      selectedProduct.width,
                                      selectedProduct.height,
                                      selectedProduct.id,
                                    );
                                    setGeneratedDesign(newDesign);
                                  }
                                }}
                                className="d-flex flex-column align-items-center gap-1 btn"
                                style={{ padding: '0.5rem', borderRadius: '0.75rem', backgroundColor: '#f8fafc', fontSize: '10px', fontWeight: 500, color: '#64748b', transition: 'all 0.15s', border: 'none' }}
                              >
                                <div className="d-flex" style={{ gap: '0.125rem' }}>
                                  {sp.colors.map((c, i) => (
                                    <span key={i} className="rounded-circle" style={{ width: '0.625rem', height: '0.625rem', backgroundColor: c, border: '1px solid rgba(255,255,255,0.5)' }} />
                                  ))}
                                </div>
                                {sp.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-2 rounded-3" style={{ backgroundColor: 'rgba(111,66,193,0.05)', border: '1px solid rgba(111,66,193,0.1)' }}>
                          <div className="d-flex align-items-center gap-2">
                            <Star size={16} style={{ color: '#6f42c1' }} />
                            <p className="mb-0" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>Ready to print?</p>
                          </div>
                          <p className="mb-0 mt-1" style={{ fontSize: '0.6875rem', color: '#64748b' }}>Send this design to production with premium quality printing and fast delivery across India.</p>
                          <Link href={`/products/${selectedProduct?.id || 'standard-business-cards'}`} className="d-inline-flex align-items-center gap-1 mt-1 text-decoration-none" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6f42c1' }}>
                            Order {selectedProduct?.name || 'This Product'} <ArrowRight size={12} />
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {view === 'chat' && (
                  <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="d-flex flex-column h-100">
                    <div className="flex-fill overflow-y-auto p-3 d-flex flex-column" style={{ gap: '0.75rem' }}>
                      {chatMessages.map((msg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                          {msg.role === 'assistant' && (
                            <div className="d-flex align-items-center justify-content-center rounded-3 shrink-0 me-2" style={{ width: '1.75rem', height: '1.75rem', background: 'linear-gradient(to bottom right, var(--bs-primary, #0d6efd), #6f42c1)', marginTop: '0.125rem' }}>
                              <Sparkles size={14} style={{ color: 'var(--bs-white)' }} />
                            </div>
                          )}
                          <div
                            className="px-3 py-2"
                            style={{
                              maxWidth: '82%',
                              fontSize: '0.8125rem',
                              lineHeight: 1.6,
                              borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                              backgroundColor: msg.role === 'user' ? 'var(--bs-primary, #0d6efd)' : '#f1f5f9',
                              color: msg.role === 'user' ? 'var(--bs-white)' : '#334155',
                            }}
                          >
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                      {chatLoading && (
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '1.75rem', height: '1.75rem', background: 'linear-gradient(to bottom right, var(--bs-primary, #0d6efd), #6f42c1)' }}>
                            <Sparkles size={14} style={{ color: 'var(--bs-white)' }} />
                          </div>
                          <div className="d-flex align-items-center rounded-3" style={{ backgroundColor: '#f1f5f9', padding: '0.75rem 1rem', gap: '0.375rem', borderRadius: '1rem 1rem 1rem 0.25rem' }}>
                            <span className="rounded-circle" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#94a3b8', animation: 'bounce 1s infinite', animationDelay: '0ms' }} />
                            <span className="rounded-circle" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#94a3b8', animation: 'bounce 1s infinite', animationDelay: '150ms' }} />
                            <span className="rounded-circle" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#94a3b8', animation: 'bounce 1s infinite', animationDelay: '300ms' }} />
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="px-3 pb-2 d-flex flex-wrap" style={{ gap: '0.375rem' }}>
                      {['Design tips', 'Color advice', 'Material help', 'Pricing'].map((chip) => (
                        <button key={chip} onClick={() => sendChat(chip)} disabled={chatLoading} className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.6875rem', fontWeight: 500, color: 'var(--bs-primary, #0d6efd)', backgroundColor: 'rgba(13,110,253,0.05)', borderRadius: '9999px', border: '1px solid rgba(13,110,253,0.1)', transition: 'color 0.15s' }}>
                          {chip}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); sendChat(chatInput); }} className="d-flex align-items-center gap-2 p-3" style={{ borderTop: '1px solid #f1f5f9' }}>
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask Orbit Magic..."
                        disabled={chatLoading}
                        className="flex-fill"
                        style={{ padding: '0.625rem 1rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '9999px', fontSize: '0.875rem', outline: 'none', transition: 'all 0.15s', opacity: chatLoading ? 0.5 : 1 }}
                      />
                      <button type="submit" disabled={!chatInput.trim() || chatLoading} className="d-flex align-items-center justify-content-center rounded-circle shrink-0" style={{ width: '2.5rem', height: '2.5rem', background: 'linear-gradient(to right, var(--bs-primary, #0d6efd), #6f42c1)', color: 'var(--bs-white)', opacity: !chatInput.trim() || chatLoading ? 0.4 : 1, border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <Send size={16} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
