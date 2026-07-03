'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { proxyImage } from '@/lib/ai';

// ============================================================
// SCENE DEFINITIONS - Real product photography mockups
// ============================================================
interface SceneDef {
  id: string;
  name: string;
  product: string;
  bg: string;
  designZone: { x: number; y: number; w: number; h: number; rotateX?: number; rotateY?: number; skewX?: number; skewY?: number; borderRadius?: number; scaleX?: number };
  lighting: { gradient: string; opacity: number };
  shadow: { x: number; y: number; blur: number; spread: number; color: string; opacity: number };
}

const SCENES: SceneDef[] = [
  // ── BUSINESS CARDS ──
  { id: 'bc-desk', name: 'Office Desk', product: 'Business Card', bg: 'linear-gradient(145deg, #3a2a1a 0%, #5c4033 40%, #4a3528 100%)', designZone: { x: 30, y: 25, w: 40, h: 25, rotateX: 45, rotateY: -15, skewX: 2 }, lighting: { gradient: 'radial-gradient(ellipse at 30% 20%, rgba(255,220,150,0.35) 0%, transparent 70%)', opacity: 1 }, shadow: { x: 8, y: 15, blur: 30, spread: -5, color: '#000', opacity: 0.5 } },
  { id: 'bc-marble', name: 'Marble Surface', product: 'Business Card', bg: 'linear-gradient(160deg, #f0ece4 0%, #e8e0d8 30%, #f5f0ea 60%, #ddd5cc 100%)', designZone: { x: 25, y: 20, w: 45, h: 28, rotateX: 50, rotateY: 10 }, lighting: { gradient: 'radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 5, y: 12, blur: 25, spread: -3, color: '#000', opacity: 0.4 } },
  { id: 'bc-hand', name: 'Held in Hand', product: 'Business Card', bg: 'linear-gradient(180deg, #d4c8b8 0%, #c8baa8 50%, #bfb09a 100%)', designZone: { x: 35, y: 30, w: 35, h: 22, rotateX: 15, rotateY: -20, skewX: -3 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 40%, rgba(255,230,180,0.3) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 3, y: 8, blur: 20, spread: -2, color: '#000', opacity: 0.45 } },
  { id: 'bc-holder', name: 'Card Holder', product: 'Business Card', bg: 'linear-gradient(170deg, #2a2a2a 0%, #3a3a3a 40%, #1a1a1a 100%)', designZone: { x: 30, y: 15, w: 40, h: 30, rotateX: 5, rotateY: -5 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)', opacity: 1 }, shadow: { x: 4, y: 6, blur: 15, spread: 0, color: '#000', opacity: 0.5 } },
  { id: 'bc-flatlay', name: 'Flat Lay', product: 'Business Card', bg: 'linear-gradient(135deg, #f7f3ed 0%, #efe8de 50%, #e8dfd2 100%)', designZone: { x: 30, y: 30, w: 40, h: 25, rotateX: 0, rotateY: 0 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)', opacity: 1 }, shadow: { x: 3, y: 5, blur: 15, spread: -2, color: '#000', opacity: 0.3 } },

  // ── T-SHIRTS ──
  { id: 'ts-model', name: 'On Model', product: 'T-Shirt', bg: 'linear-gradient(180deg, #e8ddd0 0%, #d8cab8 50%, #cfc0ac 100%)', designZone: { x: 28, y: 20, w: 44, h: 45, rotateX: 5, borderRadius: 5 }, lighting: { gradient: 'radial-gradient(ellipse at 40% 30%, rgba(255,230,190,0.25) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 0, y: 8, blur: 20, spread: 0, color: '#000', opacity: 0.25 } },
  { id: 'ts-flatlay', name: 'Flat Lay', product: 'T-Shirt', bg: 'linear-gradient(150deg, #f5f0e8 0%, #ede5d8 50%, #e0d5c5 100%)', designZone: { x: 25, y: 18, w: 50, h: 55, rotateX: 0, borderRadius: 3 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 2, y: 4, blur: 12, spread: -1, color: '#000', opacity: 0.2 } },
  { id: 'ts-hanger', name: 'On Hanger', product: 'T-Shirt', bg: 'linear-gradient(180deg, #f0ebe3 0%, #e5ddd0 50%, #d8cfc0 100%)', designZone: { x: 25, y: 22, w: 50, h: 50, rotateX: 0, borderRadius: 3 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 25%, rgba(255,255,255,0.3) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 3, y: 8, blur: 18, spread: -2, color: '#000', opacity: 0.3 } },
  { id: 'ts-lifestyle', name: 'Lifestyle', product: 'T-Shirt', bg: 'linear-gradient(160deg, #c8d5c0 0%, #b8c8b0 50%, #a8b8a0 100%)', designZone: { x: 28, y: 18, w: 44, h: 48, rotateX: 5, rotateY: -5, borderRadius: 5 }, lighting: { gradient: 'radial-gradient(ellipse at 35% 25%, rgba(255,240,200,0.3) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 5, y: 10, blur: 20, spread: 0, color: '#000', opacity: 0.3 } },

  // ── MUGS ──
  { id: 'mug-desk', name: 'On Desk', product: 'Mug', bg: 'linear-gradient(145deg, #5c4a3a 0%, #7a6550 40%, #6b5545 100%)', designZone: { x: 32, y: 20, w: 36, h: 45, rotateY: -12, borderRadius: 5 }, lighting: { gradient: 'radial-gradient(ellipse at 35% 30%, rgba(255,220,150,0.3) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 8, y: 12, blur: 25, spread: -3, color: '#000', opacity: 0.45 } },
  { id: 'mug-hand', name: 'Held in Hand', product: 'Mug', bg: 'linear-gradient(180deg, #d8ccc0 0%, #c8baa8 50%, #bbb0a0 100%)', designZone: { x: 30, y: 18, w: 38, h: 48, rotateY: -8, borderRadius: 5 }, lighting: { gradient: 'radial-gradient(ellipse at 45% 35%, rgba(255,230,180,0.25) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 5, y: 10, blur: 20, spread: -2, color: '#000', opacity: 0.4 } },
  { id: 'mug-shelf', name: 'On Shelf', product: 'Mug', bg: 'linear-gradient(180deg, #e8e0d5 0%, #d5cbbf 50%, #c8bfb2 100%)', designZone: { x: 35, y: 22, w: 30, h: 42, rotateY: -5, borderRadius: 5 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 4, y: 8, blur: 18, spread: -2, color: '#000', opacity: 0.35 } },
  { id: 'mug-morning', name: 'Morning Coffee', product: 'Mug', bg: 'linear-gradient(150deg, #f0e8dd 0%, #e5dcd0 50%, #d8cec0 100%)', designZone: { x: 32, y: 20, w: 35, h: 44, rotateY: -10, borderRadius: 5 }, lighting: { gradient: 'radial-gradient(ellipse at 30% 25%, rgba(255,220,150,0.35) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 6, y: 10, blur: 22, spread: -3, color: '#000', opacity: 0.4 } },

  // ── POSTERS ──
  { id: 'poster-gallery', name: 'Gallery Wall', product: 'Poster', bg: 'linear-gradient(180deg, #f5f2ed 0%, #ebe5dc 50%, #e0d8cd 100%)', designZone: { x: 28, y: 12, w: 44, h: 65, rotateX: 2 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 15%, rgba(255,255,255,0.35) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 4, y: 6, blur: 20, spread: -2, color: '#000', opacity: 0.3 } },
  { id: 'poster-street', name: 'Street Wall', product: 'Poster', bg: 'linear-gradient(180deg, #8a8070 0%, #7a7060 50%, #6a6050 100%)', designZone: { x: 25, y: 10, w: 50, h: 70, rotateX: 3, rotateY: -2 }, lighting: { gradient: 'radial-gradient(ellipse at 40% 20%, rgba(255,240,200,0.2) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 5, y: 8, blur: 25, spread: -3, color: '#000', opacity: 0.4 } },
  { id: 'poster-frame', name: 'Framed', product: 'Poster', bg: 'linear-gradient(170deg, #e8e2d8 0%, #d8d0c5 50%, #ccc2b5 100%)', designZone: { x: 22, y: 10, w: 56, h: 72, rotateX: 1 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 3, y: 5, blur: 15, spread: 0, color: '#000', opacity: 0.25 } },
  { id: 'poster-bedroom', name: 'Bedroom', product: 'Poster', bg: 'linear-gradient(180deg, #d5ccc0 0%, #c8bfb2 50%, #bbb0a0 100%)', designZone: { x: 25, y: 10, w: 50, h: 68, rotateX: 2 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 25%, rgba(255,230,180,0.2) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 4, y: 6, blur: 18, spread: -2, color: '#000', opacity: 0.3 } },

  // ── BANNERS ──
  { id: 'banner-outdoor', name: 'Outdoor Building', product: 'Banner', bg: 'linear-gradient(180deg, #87CEEB 0%, #6BB3D9 30%, #5a8aa8 100%)', designZone: { x: 15, y: 20, w: 70, h: 50, rotateX: 5, rotateY: -3 }, lighting: { gradient: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%)', opacity: 1 }, shadow: { x: 5, y: 10, blur: 30, spread: -5, color: '#000', opacity: 0.35 } },
  { id: 'banner-event', name: 'Event Stage', product: 'Banner', bg: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', designZone: { x: 10, y: 15, w: 80, h: 55, rotateX: 3 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 30%, rgba(100,200,255,0.1) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 0, y: 5, blur: 20, spread: 0, color: '#000', opacity: 0.4 } },
  { id: 'banner-storefront', name: 'Storefront', product: 'Banner', bg: 'linear-gradient(180deg, #c8c0b5 0%, #b8b0a5 50%, #a8a095 100%)', designZone: { x: 15, y: 15, w: 70, h: 55, rotateX: 8, rotateY: -2 }, lighting: { gradient: 'radial-gradient(ellipse at 40% 25%, rgba(255,240,200,0.2) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 4, y: 8, blur: 25, spread: -3, color: '#000', opacity: 0.35 } },

  // ── STICKERS ──
  { id: 'sticker-laptop', name: 'On Laptop', product: 'Sticker', bg: 'linear-gradient(160deg, #c0c0c0 0%, #d0d0d0 50%, #b8b8b8 100%)', designZone: { x: 32, y: 28, w: 36, h: 36, borderRadius: 50, rotateX: 55, rotateY: -5 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)', opacity: 1 }, shadow: { x: 2, y: 4, blur: 8, spread: -1, color: '#000', opacity: 0.3 } },
  { id: 'sticker-bottle', name: 'On Bottle', product: 'Sticker', bg: 'linear-gradient(180deg, #e0d8cc 0%, #d0c8bc 50%, #c5bbaa 100%)', designZone: { x: 33, y: 25, w: 34, h: 38, borderRadius: 50, rotateY: -15 }, lighting: { gradient: 'radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.25) 0%, transparent 50%)', opacity: 1 }, shadow: { x: 4, y: 6, blur: 12, spread: -1, color: '#000', opacity: 0.35 } },
  { id: 'sticker-notebook', name: 'On Notebook', product: 'Sticker', bg: 'linear-gradient(145deg, #8B7355 0%, #A08060 40%, #7a6545 100%)', designZone: { x: 30, y: 25, w: 40, h: 40, borderRadius: 50, rotateX: 50, rotateY: 5 }, lighting: { gradient: 'radial-gradient(ellipse at 35% 25%, rgba(255,220,150,0.25) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 3, y: 5, blur: 10, spread: -1, color: '#000', opacity: 0.3 } },
  { id: 'sticker-phone', name: 'On Phone', product: 'Sticker', bg: 'linear-gradient(170deg, #2a2a2a 0%, #3a3a3a 50%, #1a1a1a 100%)', designZone: { x: 30, y: 30, w: 40, h: 35, borderRadius: 50, rotateX: 55, rotateY: -8 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)', opacity: 1 }, shadow: { x: 2, y: 3, blur: 8, spread: 0, color: '#000', opacity: 0.4 } },

  // ── PACKAGING ──
  { id: 'box-table', name: 'On Table', product: 'Box', bg: 'linear-gradient(150deg, #6b5a48 0%, #8a7560 40%, #7a6550 100%)', designZone: { x: 25, y: 15, w: 50, h: 55, rotateX: 30, rotateY: -15, skewX: -5 }, lighting: { gradient: 'radial-gradient(ellipse at 35% 25%, rgba(255,220,150,0.3) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 10, y: 15, blur: 30, spread: -5, color: '#000', opacity: 0.45 } },
  { id: 'box-shelf', name: 'On Shelf', product: 'Box', bg: 'linear-gradient(180deg, #e8e0d5 0%, #d5cbbf 50%, #c8bfb2 100%)', designZone: { x: 28, y: 12, w: 44, h: 58, rotateX: 5, rotateY: -8 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.25) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 6, y: 10, blur: 22, spread: -3, color: '#000', opacity: 0.35 } },

  // ── BOOKS & MAGAZINES ──
  { id: 'book-reading', name: 'Being Read', product: 'Book', bg: 'linear-gradient(160deg, #d5ccc0 0%, #c8bfb2 50%, #bbb0a0 100%)', designZone: { x: 20, y: 15, w: 60, h: 65, rotateX: 10, rotateY: -5, borderRadius: 2 }, lighting: { gradient: 'radial-gradient(ellipse at 40% 30%, rgba(255,230,180,0.25) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 5, y: 8, blur: 20, spread: -2, color: '#000', opacity: 0.35 } },
  { id: 'book-shelf', name: 'On Bookshelf', product: 'Book', bg: 'linear-gradient(180deg, #8B7355 0%, #7a6545 50%, #6b5a3a 100%)', designZone: { x: 25, y: 10, w: 50, h: 72, rotateX: 2, rotateY: -3 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 15%, rgba(255,255,255,0.15) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 3, y: 5, blur: 15, spread: -1, color: '#000', opacity: 0.4 } },
  { id: 'book-table', name: 'On Table', product: 'Book', bg: 'linear-gradient(150deg, #c8bfb2 0%, #bbb0a0 50%, #aea395 100%)', designZone: { x: 22, y: 15, w: 56, h: 65, rotateX: 45, rotateY: -10, borderRadius: 2 }, lighting: { gradient: 'radial-gradient(ellipse at 35% 25%, rgba(255,220,150,0.3) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 8, y: 12, blur: 25, spread: -3, color: '#000', opacity: 0.4 } },

  // ── FLYERS ──
  { id: 'flyer-hand', name: 'Held in Hand', product: 'Flyer', bg: 'linear-gradient(180deg, #d8ccc0 0%, #c8baa8 50%, #bbb0a0 100%)', designZone: { x: 25, y: 15, w: 50, h: 60, rotateX: 10, rotateY: -15, skewX: -2 }, lighting: { gradient: 'radial-gradient(ellipse at 45% 30%, rgba(255,230,180,0.25) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 5, y: 10, blur: 22, spread: -3, color: '#000', opacity: 0.4 } },
  { id: 'flyer-table', name: 'On Table', product: 'Flyer', bg: 'linear-gradient(145deg, #6b5a48 0%, #8a7560 40%, #7a6550 100%)', designZone: { x: 22, y: 12, w: 56, h: 68, rotateX: 55, rotateY: 5 }, lighting: { gradient: 'radial-gradient(ellipse at 35% 20%, rgba(255,220,150,0.3) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 6, y: 12, blur: 25, spread: -4, color: '#000', opacity: 0.45 } },
  { id: 'flyer-wall', name: 'On Wall', product: 'Flyer', bg: 'linear-gradient(180deg, #e8e2d8 0%, #d8d0c5 50%, #ccc2b5 100%)', designZone: { x: 25, y: 10, w: 50, h: 65, rotateX: 2 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 3, y: 5, blur: 15, spread: -2, color: '#000', opacity: 0.3 } },

  // ── CAPS & TOTES ──
  { id: 'cap-model', name: 'On Model', product: 'Cap', bg: 'linear-gradient(180deg, #e0d8cc 0%, #d0c8bc 50%, #c5bbaa 100%)', designZone: { x: 25, y: 18, w: 50, h: 35, rotateX: 15, rotateY: -5, borderRadius: 40 }, lighting: { gradient: 'radial-gradient(ellipse at 45% 30%, rgba(255,230,180,0.2) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 4, y: 8, blur: 18, spread: -2, color: '#000', opacity: 0.3 } },
  { id: 'tote-flatlay', name: 'Flat Lay', product: 'Tote Bag', bg: 'linear-gradient(150deg, #f0ebe3 0%, #e5ddd0 50%, #d8cfc0 100%)', designZone: { x: 22, y: 15, w: 56, h: 60, rotateX: 0, borderRadius: 3 }, lighting: { gradient: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)', opacity: 1 }, shadow: { x: 2, y: 4, blur: 12, spread: -1, color: '#000', opacity: 0.2 } },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function MockupGenerator() {
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [designFileName, setDesignFileName] = useState('');
  const [selectedScene, setSelectedScene] = useState<SceneDef>(SCENES[0]);
  const [activeCategory, setActiveCategory] = useState('Business Card');
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [designOpacity, setDesignOpacity] = useState(100);
  const [blur, setBlur] = useState(0);
  const [designScale, setDesignScale] = useState(100);
  const [exporting, setExporting] = useState(false);
  const [proxyCache, setProxyCache] = useState<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [...new Set(SCENES.map(s => s.product))];
  const filteredScenes = SCENES.filter(s => s.product === activeCategory);

  // ── Handle file upload ──
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDesignFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setDesignImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    setDesignFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setDesignImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  // ── Build CSS filter string ──
  const filterStr = [
    `brightness(${1 + brightness / 100})`,
    `contrast(${1 + contrast / 100})`,
    `saturate(${1 + saturation / 100})`,
    blur > 0 ? `blur(${blur}px)` : '',
  ].filter(Boolean).join(' ');

  // ── Export to canvas ──
  const handleExport = useCallback(async (scale: number) => {
    setExporting(true);
    try {
      const canvas = document.createElement('canvas');
      const W = 1200 * scale;
      const H = 800 * scale;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d')!;

      // 1) Draw background scene
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      const bgMatch = selectedScene.bg.match(/#[0-9a-f]{6}/gi) || ['#888', '#666'];
      bgGrad.addColorStop(0, bgMatch[0]);
      bgGrad.addColorStop(1, bgMatch[bgMatch.length - 1]);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // 2) Draw wood grain / texture lines for realism
      ctx.globalAlpha = 0.08;
      for (let i = 0; i < 60; i++) {
        const y = Math.random() * H;
        ctx.strokeStyle = Math.random() > 0.5 ? '#000' : '#fff';
        ctx.lineWidth = Math.random() * 2 + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(W * 0.3, y + Math.random() * 10 - 5, W * 0.7, y + Math.random() * 10 - 5, W, y + Math.random() * 5);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // 3) Draw lighting gradient
      const lightGrad = ctx.createRadialGradient(W * 0.3, H * 0.2, 0, W * 0.3, H * 0.2, W * 0.7);
      lightGrad.addColorStop(0, 'rgba(255,240,200,0.2)');
      lightGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, W, H);

      // 4) Draw design image on product
      if (designImage) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = designImage;
        });

        const dz = selectedScene.designZone;
        const dx = (dz.x / 100) * W;
        const dy = (dz.y / 100) * H;
        const dw = (dz.w / 100) * W * (designScale / 100);
        const dh = (dz.h / 100) * H * (designScale / 100);

        ctx.save();
        ctx.translate(dx + dw / 2, dy + dh / 2);

        // Apply perspective transform
        const rx = (dz.rotateX || 0) * Math.PI / 180;
        const ry = (dz.rotateY || 0) * Math.PI / 180;
        ctx.transform(
          Math.cos(ry), Math.sin(rx) * Math.sin(ry),
          0, Math.cos(rx),
          0, 0
        );

        // Apply filters
        ctx.filter = filterStr;
        ctx.globalAlpha = designOpacity / 100;
        ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
        ctx.filter = 'none';
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // 5) Draw shadow
      const dz = selectedScene.designZone;
      const sh = selectedScene.shadow;
      ctx.save();
      ctx.shadowColor = `rgba(${sh.color === '#000' ? '0,0,0' : '255,255,255'},${sh.opacity})`;
      ctx.shadowBlur = sh.blur * scale;
      ctx.shadowOffsetX = sh.x * scale;
      ctx.shadowOffsetY = sh.y * scale;
      ctx.fillStyle = 'rgba(0,0,0,0.01)';
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // 6) Draw vignette
      const vigGrad = ctx.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.8);
      vigGrad.addColorStop(0, 'transparent');
      vigGrad.addColorStop(1, 'rgba(0,0,0,0.3)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, W, H);

      // 7) Draw subtle grain
      ctx.globalAlpha = 0.03;
      for (let i = 0; i < 2000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#000' : '#fff';
        ctx.fillRect(Math.random() * W, Math.random() * H, scale, scale);
      }
      ctx.globalAlpha = 1;

      // 8) Export
      const link = document.createElement('a');
      link.download = `mockup-${selectedScene.name.replace(/\s+/g, '-').toLowerCase()}-${scale}x.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  }, [designImage, selectedScene, brightness, contrast, saturation, designOpacity, blur, designScale]);

  const dz = selectedScene.designZone;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <div>
              <Link href="/utilities" className="text-xs text-blue-400 hover:underline mb-1 inline-block">← Back to Utilities</Link>
              <h1 className="text-xl md:text-2xl font-bold text-white font-heading">Mockup Scene Generator</h1>
              <p className="text-xs text-slate-400 mt-0.5">Place your design on realistic product scenes</p>
            </div>
            {designImage && (
              <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                  <button key={s} onClick={() => handleExport(s)} disabled={exporting}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white text-xs font-medium rounded-lg transition-colors">
                    {exporting ? '...' : `Export ${s}×`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6 flex flex-col xl:flex-row gap-6">
          {/* ── LEFT: Scene Selection ── */}
          <div className="w-full xl:w-64 shrink-0">
            {/* Upload */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 mb-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Your Design</p>
              {designImage ? (
                <div className="space-y-3">
                  <div className="relative w-full aspect-[3/2] bg-slate-700 rounded-lg overflow-hidden">
                    <img src={designImage} alt="Design" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{designFileName}</p>
                  <div className="flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()}
                      className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors">Replace</button>
                    <button onClick={() => { setDesignImage(null); setDesignFileName(''); }}
                      className="px-3 py-1.5 bg-red-900/50 hover:bg-red-800/50 text-red-300 text-xs rounded-lg transition-colors">Remove</button>
                  </div>
                </div>
              ) : (
                <div onDragOver={e => e.preventDefault()} onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-[3/2] border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-8 h-8 text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
                  </svg>
                  <p className="text-xs text-slate-400">Drop image or click</p>
                  <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, SVG</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </div>

            {/* Product Categories */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 mb-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Product</p>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setSelectedScene(SCENES.find(s => s.product === cat) || SCENES[0]); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scene Thumbnails */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 mb-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Scene ({filteredScenes.length})</p>
              <div className="space-y-2">
                {filteredScenes.map(scene => (
                  <button key={scene.id} onClick={() => setSelectedScene(scene)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all ${selectedScene.id === scene.id ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-500 bg-slate-700/50'}`}>
                    <div className="w-full h-16 rounded-md mb-2" style={{ background: scene.bg }} />
                    <p className="text-[11px] text-slate-200 font-medium">{scene.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Adjustments */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Adjustments</p>
              <div className="space-y-3">
                {[
                  { label: 'Brightness', value: brightness, set: setBrightness, min: -50, max: 50 },
                  { label: 'Contrast', value: contrast, set: setContrast, min: -50, max: 50 },
                  { label: 'Saturation', value: saturation, set: setSaturation, min: -50, max: 50 },
                  { label: 'Design Opacity', value: designOpacity, set: setDesignOpacity, min: 10, max: 100 },
                  { label: 'Design Scale', value: designScale, set: setDesignScale, min: 50, max: 150 },
                  { label: 'Soft Edges', value: blur, set: setBlur, min: 0, max: 5 },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-slate-400">{s.label}</span>
                      <span className="text-[10px] text-slate-500">{s.value}{s.label === 'Soft Edges' ? 'px' : s.label === 'Design Scale' || s.label === 'Design Opacity' ? '%' : ''}</span>
                    </div>
                    <input type="range" min={s.min} max={s.max} value={s.value}
                      onChange={e => s.set(Number(e.target.value))}
                      className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                  </div>
                ))}
                <button onClick={() => { setBrightness(0); setContrast(0); setSaturation(0); setDesignOpacity(100); setDesignScale(100); setBlur(0); }}
                  className="w-full px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-lg transition-colors">
                  Reset All
                </button>
              </div>
            </div>
          </div>

          {/* ── CENTER: Preview ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              {/* Scene Name Bar */}
              <div className="px-4 py-2.5 bg-slate-750 border-b border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white">{selectedScene.name}</span>
                  <span className="text-[10px] text-slate-400 ml-2">{selectedScene.product}</span>
                </div>
                <span className="text-[10px] text-slate-500">1200 × 800</span>
              </div>

              {/* Mockup Preview */}
              <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
                <div className="absolute inset-0 overflow-hidden"
                  style={{ background: selectedScene.bg }}>

                  {/* Lighting overlay */}
                  <div className="absolute inset-0" style={{
                    background: selectedScene.lighting.gradient,
                    opacity: selectedScene.lighting.opacity,
                  }} />

                  {/* Design placement zone */}
                  <div className="absolute transition-all duration-300" style={{
                    left: `${dz.x}%`,
                    top: `${dz.y}%`,
                    width: `${dz.w * (designScale / 100)}%`,
                    height: `${dz.h * (designScale / 100)}%`,
                    transform: [
                      `perspective(800px)`,
                      `rotateX(${dz.rotateX || 0}deg)`,
                      `rotateY(${dz.rotateY || 0}deg)`,
                      `skewX(${dz.skewX || 0}deg)`,
                      `skewY(${dz.skewY || 0}deg)`,
                    ].join(' '),
                    borderRadius: `${dz.borderRadius || 0}px`,
                    boxShadow: `${selectedScene.shadow.x}px ${selectedScene.shadow.y}px ${selectedScene.shadow.blur}px ${selectedScene.shadow.spread}px rgba(0,0,0,${selectedScene.shadow.opacity})`,
                  }}>
                    {designImage ? (
                      <img src={designImage} alt="Design" className="w-full h-full object-cover rounded-[inherit]"
                        style={{ filter: filterStr, opacity: designOpacity / 100 }} />
                    ) : (
                      <div className="w-full h-full bg-white/10 border border-dashed border-white/30 rounded-[inherit] flex items-center justify-center">
                        <span className="text-white/40 text-xs">Your Design</span>
                      </div>
                    )}
                  </div>

                  {/* Vignette */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Subtle noise overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-4 bg-slate-800 rounded-xl border border-slate-700 p-4">
              <p className="text-xs font-bold text-slate-300 mb-2">Tips for Best Results</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { tip: 'Use high-resolution images (1200px+ wide) for sharp results' },
                  { tip: 'PNG with transparent background works best for overlays' },
                  { tip: 'Adjust brightness/contrast to match the scene lighting' },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 text-xs mt-0.5">→</span>
                    <p className="text-[10px] text-slate-400">{t.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
