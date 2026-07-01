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
import { generateLayout, getLayoutIds, getStyleIds, LAYOUTS, STYLE_MAP } from '@/lib/designEngine';
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

  // Listen for navbar toggle
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-orbit-magic', handleToggle);
    return () => window.removeEventListener('toggle-orbit-magic', handleToggle);
  }, []);

  // Notification bubble
  useEffect(() => {
    if (hasNotified) return;
    const t = setTimeout(() => setHasNotified(true), 3000);
    return () => clearTimeout(t);
  }, [hasNotified]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Draw preview on canvas
  const drawPreview = useCallback((design: { backgroundColor: string; elements: CanvasElement[] }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = selectedProduct?.width || 1050;
    const h = selectedProduct?.height || 600;
    canvas.width = w;
    canvas.height = h;

    // Background
    ctx.fillStyle = design.backgroundColor;
    ctx.fillRect(0, 0, w, h);

    // Elements
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
      } else if (el.type === 'text' && el.text) {
        ctx.fillStyle = el.fill;
        const fs = el.fontSize || 16;
        const fw = el.fontWeight === 'bold' ? 'bold' : 'normal';
        ctx.font = `${fw} ${fs}px ${el.fontFamily || 'Inter'}, sans-serif`;
        ctx.textBaseline = 'top';
        // Word wrap for longer text
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
      // AI generates content + layout/style choices
      const result = await aiAPI.generateContent(prompt, selectedProduct.width, selectedProduct.height, selectedProduct.id);

      // Design engine calculates ALL positions mathematically
      const design = generateLayout(
        result.layout || 'centered',
        result.style || selectedStyle.id,
        result.content,
        selectedProduct.width,
        selectedProduct.height,
      );

      setGeneratedDesign(design);

      // Update selected style to match AI choice
      const aiStyle = STYLE_MAP[result.style || selectedStyle.id];
      if (aiStyle) {
        const preset = STYLE_PRESETS.find(s => s.id === result.style);
        if (preset) setSelectedStyle(preset);
      }
    } catch {
      // Fallback: generate with current selections
      const fallbackContent = {
        title: 'YOUR DESIGN',
        subtitle: prompt.slice(0, 60),
        body: '',
        tagline: selectedProduct.name.toUpperCase(),
        contact: 'www.printorbit.in',
        cta: 'Order Now',
      };
      const design = generateLayout('centered', selectedStyle.id, fallbackContent, selectedProduct.width, selectedProduct.height);
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
      {/* Floating Mascot Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open Orbit Magic"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 animate-ping" />
          <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary-dark to-accent shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-110">
            <Image src="/mascot-orbit.svg" alt="Orbit Magic" width={44} height={44} className="drop-shadow-lg" />
          </span>
          {!isOpen && hasNotified && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-accent text-white text-[10px] font-bold rounded-full shadow-lg">
              <Sparkles className="w-3 h-3" />
            </motion.span>
          )}
        </motion.button>
      )}

      {/* Main Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[640px] max-h-[calc(100vh-3rem)] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary via-primary-dark to-accent px-5 py-4 flex items-center justify-between shrink-0 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 right-8 w-20 h-20 rounded-full border border-white/30" />
                <div className="absolute -bottom-4 right-20 w-16 h-16 rounded-full border border-white/20" />
                <div className="absolute top-1 right-32 w-8 h-8 rounded-full border border-white/20" />
              </div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Image src="/mascot-orbit.svg" alt="Orbit Magic" width={32} height={32} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Orbit Magic
                    <span className="px-1.5 py-0.5 bg-accent/80 text-[9px] font-bold rounded-full text-white">AI</span>
                  </h3>
                  <p className="text-[11px] text-white/70">Design Studio Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                {view !== 'home' && (
                  <button onClick={() => setView('home')} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors" title="Back to home">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* HOME VIEW */}
                {view === 'home' && (
                  <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 space-y-5">
                    {/* Hero CTA */}
                    <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-4 border border-primary/10">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                          <Wand2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-slate-800">AI Design Generator</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Describe your vision, get a print-ready design in seconds</p>
                        </div>
                      </div>
                      <button onClick={() => setView('generate')} className="mt-3 w-full py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Start Designing
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Design Actions */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Designs</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {QUICK_DESIGNS.map((qd) => (
                          <button
                            key={qd.label}
                            onClick={() => {
                              const tmpl = PRODUCT_TEMPLATES.find((p) => p.id === qd.product);
                              if (tmpl) setSelectedProduct(tmpl);
                              setPrompt(qd.prompt);
                              setView('generate');
                            }}
                            className="group p-3 bg-slate-50 hover:bg-primary/5 rounded-xl border border-slate-100 hover:border-primary/20 transition-all text-left"
                          >
                            <span className="text-lg">{PRODUCT_TEMPLATES.find((p) => p.id === qd.product)?.icon}</span>
                            <p className="text-xs font-semibold text-slate-700 mt-1 group-hover:text-primary transition-colors">{qd.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Product Templates */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Product Templates</h4>
                      <div className="space-y-1.5">
                        {PRODUCT_TEMPLATES.slice(0, 6).map((pt) => (
                          <button
                            key={pt.id}
                            onClick={() => { setSelectedProduct(pt); setView('generate'); }}
                            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all group"
                          >
                            <span className="text-xl w-8 text-center">{pt.icon}</span>
                            <div className="flex-1 text-left">
                              <p className="text-xs font-semibold text-slate-700 group-hover:text-primary transition-colors">{pt.name}</p>
                              <p className="text-[10px] text-slate-400">{pt.description}</p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ask Orbit Magic */}
                    <button onClick={() => setView('chat')} className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl border border-accent/10 hover:border-accent/30 transition-all">
                      <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-xs font-semibold text-slate-700">Ask Orbit Magic</p>
                        <p className="text-[10px] text-slate-400">Get design advice & recommendations</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                  </motion.div>
                )}

                {/* GENERATE VIEW */}
                {view === 'generate' && (
                  <motion.div key="generate" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 space-y-4">
                    {/* Selected Product */}
                    {selectedProduct && (
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
                        <span className="text-2xl">{selectedProduct.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800">{selectedProduct.name}</p>
                          <p className="text-[10px] text-slate-400">{selectedProduct.width} x {selectedProduct.height}px</p>
                        </div>
                        <button onClick={() => setView('home')} className="text-xs text-primary hover:underline">Change</button>
                      </div>
                    )}

                    {/* Style Presets */}
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                        <Paintbrush className="w-3 h-3" /> Style
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {STYLE_PRESETS.map((sp) => (
                          <button
                            key={sp.id}
                            onClick={() => setSelectedStyle(sp)}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-medium transition-all ${
                              selectedStyle.id === sp.id
                                ? 'bg-primary text-white shadow-md shadow-primary/20 ring-2 ring-primary/30'
                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex gap-0.5">
                              {sp.colors.map((c, i) => (
                                <span key={i} className="w-3 h-3 rounded-full border border-white/50" style={{ backgroundColor: c }} />
                              ))}
                            </div>
                            {sp.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Prompt */}
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                        <Type className="w-3 h-3" /> Describe your design
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A premium business card for a luxury real estate agency with marble texture, gold foil accents, and elegant serif typography..."
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none transition-all placeholder:text-slate-300"
                      />
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-[10px] text-slate-400">Tip: Be specific about colors, mood, and layout</p>
                        <span className="text-[10px] text-slate-300">{prompt.length}/500</span>
                      </div>
                    </div>

                    {/* Generate Button */}
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt.trim()}
                      className="w-full py-3.5 bg-gradient-to-r from-primary via-primary-dark to-accent text-white text-sm font-bold rounded-xl hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating Design...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Generate Design
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Suggested Prompts */}
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Try these prompts</label>
                      <div className="space-y-1.5">
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
                            className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-primary/5 text-xs text-slate-500 rounded-lg border border-slate-100 hover:border-primary/20 transition-all"
                          >
                            {sp}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PREVIEW VIEW */}
                {view === 'preview' && (
                  <motion.div key="preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-5 space-y-4">
                    {/* Canvas Preview */}
                    <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-4 flex items-center justify-center min-h-[200px]">
                      {isGenerating ? (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 animate-pulse">
                            <Sparkles className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-sm font-semibold text-slate-600">Generating your design...</p>
                          <p className="text-xs text-slate-400 mt-1">AI is crafting something beautiful</p>
                          <div className="mt-3 w-48 mx-auto h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" animate={{ width: ['0%', '100%'] }} transition={{ duration: 3, ease: 'easeInOut' }} />
                          </div>
                        </div>
                      ) : generatedDesign ? (
                        <canvas
                          ref={canvasRef}
                          className="max-w-full max-h-[300px] rounded-lg shadow-lg"
                          style={{ objectFit: 'contain' }}
                        />
                      ) : null}
                    </div>

                    {generatedDesign && !isGenerating && (
                      <>
                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={`/design-studio?product=${selectedProduct?.id || 'standard-business-cards'}`}
                            onClick={() => {
                              // Store design in sessionStorage for design studio to pick up
                              if (generatedDesign) {
                                sessionStorage.setItem('orbit-magic-design', JSON.stringify(generatedDesign));
                              }
                            }}
                            className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                          >
                            <Layers className="w-4 h-4" />
                            Open in Studio
                          </Link>
                        <button
                            onClick={handleGenerate}
                            className="flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Regenerate
                          </button>
                        </div>

                        {/* Style Variants */}
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Try different styles</label>
                          <div className="grid grid-cols-4 gap-1.5">
                            {STYLE_PRESETS.filter((sp) => sp.id !== selectedStyle.id).slice(0, 4).map((sp) => (
                              <button
                                key={sp.id}
                                onClick={() => {
                                  setSelectedStyle(sp);
                                  // Regenerate with new style
                                  if (generatedDesign && selectedProduct) {
                                    const newDesign = generateLayout(
                                      LAYOUTS[generatedDesign.elements.length > 10 ? 'centered' : 'split'] ? 'centered' : 'centered',
                                      sp.id,
                                      { title: 'YOUR DESIGN', subtitle: prompt.slice(0, 60), tagline: selectedProduct.name.toUpperCase(), contact: 'www.printorbit.in', cta: 'Order Now' },
                                      selectedProduct.width,
                                      selectedProduct.height,
                                    );
                                    setGeneratedDesign(newDesign);
                                  }
                                }}
                                className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 text-[10px] font-medium text-slate-500 hover:bg-slate-100 transition-all"
                              >
                                <div className="flex gap-0.5">
                                  {sp.colors.map((c, i) => (
                                    <span key={i} className="w-2.5 h-2.5 rounded-full border border-white/50" style={{ backgroundColor: c }} />
                                  ))}
                                </div>
                                {sp.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-3 bg-accent/5 rounded-xl border border-accent/10">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-accent" />
                            <p className="text-xs font-semibold text-slate-700">Ready to print?</p>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">Send this design to production with premium quality printing and fast delivery across India.</p>
                          <Link href={`/products/${selectedProduct?.id || 'standard-business-cards'}`} className="mt-2 flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
                            Order {selectedProduct?.name || 'This Product'} <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* CHAT VIEW */}
                {view === 'chat' && (
                  <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {chatMessages.map((msg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {msg.role === 'assistant' && (
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mr-2 mt-0.5">
                              <Sparkles className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-primary text-white rounded-br-md'
                              : 'bg-slate-100 text-slate-700 rounded-bl-md'
                          }`}>
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                      {chatLoading && (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Quick Chips */}
                    <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                      {['Design tips', 'Color advice', 'Material help', 'Pricing'].map((chip) => (
                        <button key={chip} onClick={() => sendChat(chip)} disabled={chatLoading} className="px-3 py-1 text-[11px] font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-full transition-colors border border-primary/10">
                          {chip}
                        </button>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={(e) => { e.preventDefault(); sendChat(chatInput); }} className="p-3 border-t border-slate-100 flex items-center gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask Orbit Magic..."
                        disabled={chatLoading}
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm placeholder:text-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-50"
                      />
                      <button type="submit" disabled={!chatInput.trim() || chatLoading} className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-white disabled:opacity-40 shrink-0 shadow-md shadow-primary/20">
                        <Send className="w-4 h-4" />
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
