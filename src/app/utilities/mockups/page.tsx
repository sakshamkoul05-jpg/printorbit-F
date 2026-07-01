'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import {
  Upload, Download, Image, CreditCard, Shirt, Coffee, Frame, Flag,
  Sticker, Package, BookOpen, FileText, Gem, Sun, Moon, Cloud,
  ZoomIn, ZoomOut, Move, RotateCcw, ChevronRight, X, Layers,
  Maximize2, Palette, Lightbulb, ArrowLeft, Monitor, Sparkles,
} from 'lucide-react';

// ============================================================
// TYPES
// ============================================================

interface SceneConfig {
  id: string;
  name: string;
  bgGradient: string[];
  productShape: 'card' | 'shirt' | 'mug' | 'poster' | 'banner' | 'sticker' | 'box' | 'book' | 'flyer' | 'cap';
  productRect: { x: number; y: number; w: number; h: number };
  lighting: 'warm' | 'cool' | 'neutral';
  shadowOffset: { x: number; y: number };
  description: string;
}

interface Category {
  id: string;
  name: string;
  icon: typeof CreditCard;
  scenes: SceneConfig[];
}

interface MockupControls {
  designScale: number;
  designX: number;
  designY: number;
  brightness: number;
  contrast: number;
  blur: number;
  shadowIntensity: number;
  lightDirection: number;
  bgTint: string;
}

interface ExportSettings {
  format: 'png' | 'jpeg';
  scale: 1 | 2 | 3;
}

// ============================================================
// PRODUCT CATEGORIES & SCENES
// ============================================================

const categories: Category[] = [
  {
    id: 'business-cards',
    name: 'Business Cards',
    icon: CreditCard,
    scenes: [
      {
        id: 'bc-desk',
        name: 'Desk Scene',
        bgGradient: ['#3b3225', '#5c4a3a', '#8b7355'],
        productShape: 'card',
        productRect: { x: 0.22, y: 0.35, w: 0.56, h: 0.33 },
        lighting: 'warm',
        shadowOffset: { x: 8, y: 12 },
        description: 'Business card on wooden desk',
      },
      {
        id: 'bc-hand',
        name: 'Hand Hold',
        bgGradient: ['#2c3e50', '#4a6741', '#7d9b76'],
        productShape: 'card',
        productRect: { x: 0.25, y: 0.28, w: 0.5, h: 0.3 },
        lighting: 'neutral',
        shadowOffset: { x: 5, y: 8 },
        description: 'Business card held in hand',
      },
      {
        id: 'bc-holder',
        name: 'Card Holder',
        bgGradient: ['#1a1a2e', '#16213e', '#0f3460'],
        productShape: 'card',
        productRect: { x: 0.28, y: 0.3, w: 0.44, h: 0.26 },
        lighting: 'cool',
        shadowOffset: { x: 3, y: 6 },
        description: 'Business card in premium holder',
      },
      {
        id: 'bc-flatlay',
        name: 'Flat Lay',
        bgGradient: ['#f5f0e8', '#ede4d4', '#e8dcc8'],
        productShape: 'card',
        productRect: { x: 0.25, y: 0.32, w: 0.5, h: 0.3 },
        lighting: 'neutral',
        shadowOffset: { x: 0, y: 4 },
        description: 'Minimalist flat lay arrangement',
      },
    ],
  },
  {
    id: 't-shirts',
    name: 'T-Shirts',
    icon: Shirt,
    scenes: [
      {
        id: 'ts-model-front',
        name: 'Model Front',
        bgGradient: ['#e8e0d8', '#d4ccc4', '#c0b8b0'],
        productShape: 'shirt',
        productRect: { x: 0.25, y: 0.18, w: 0.5, h: 0.6 },
        lighting: 'neutral',
        shadowOffset: { x: 4, y: 8 },
        description: 'T-shirt front view on model',
      },
      {
        id: 'ts-model-back',
        name: 'Model Back',
        bgGradient: ['#d0d5db', '#b8c0ca', '#a0aab5'],
        productShape: 'shirt',
        productRect: { x: 0.25, y: 0.18, w: 0.5, h: 0.6 },
        lighting: 'cool',
        shadowOffset: { x: -4, y: 8 },
        description: 'T-shirt back view on model',
      },
      {
        id: 'ts-flatlay',
        name: 'Flat Lay',
        bgGradient: ['#f0ebe3', '#e6ddd3', '#dcd3c7'],
        productShape: 'shirt',
        productRect: { x: 0.22, y: 0.15, w: 0.56, h: 0.65 },
        lighting: 'neutral',
        shadowOffset: { x: 0, y: 6 },
        description: 'T-shirt folded flat lay',
      },
      {
        id: 'ts-hanger',
        name: 'On Hanger',
        bgGradient: ['#2d2d2d', '#3d3d3d', '#4d4d4d'],
        productShape: 'shirt',
        productRect: { x: 0.28, y: 0.2, w: 0.44, h: 0.55 },
        lighting: 'warm',
        shadowOffset: { x: 6, y: 10 },
        description: 'T-shirt hanging on wooden hanger',
      },
    ],
  },
  {
    id: 'mugs',
    name: 'Mugs',
    icon: Coffee,
    scenes: [
      {
        id: 'mug-hand',
        name: 'Hand Holding',
        bgGradient: ['#f5e6d3', '#e8d5c0', '#dbc4ad'],
        productShape: 'mug',
        productRect: { x: 0.3, y: 0.25, w: 0.4, h: 0.45 },
        lighting: 'warm',
        shadowOffset: { x: 6, y: 10 },
        description: 'Mug held in hand with steam',
      },
      {
        id: 'mug-desk',
        name: 'Desk Scene',
        bgGradient: ['#3e2723', '#5d4037', '#795548'],
        productShape: 'mug',
        productRect: { x: 0.32, y: 0.28, w: 0.36, h: 0.42 },
        lighting: 'warm',
        shadowOffset: { x: 5, y: 8 },
        description: 'Mug on office desk',
      },
      {
        id: 'mug-shelf',
        name: 'Shelf Display',
        bgGradient: ['#1b2838', '#2c3e50', '#34495e'],
        productShape: 'mug',
        productRect: { x: 0.33, y: 0.3, w: 0.34, h: 0.4 },
        lighting: 'cool',
        shadowOffset: { x: 4, y: 6 },
        description: 'Mug on bookshelf',
      },
    ],
  },
  {
    id: 'posters',
    name: 'Posters',
    icon: Frame,
    scenes: [
      {
        id: 'poster-gallery',
        name: 'Gallery Wall',
        bgGradient: ['#f5f5f0', '#ebe8e0', '#e0ddd5'],
        productShape: 'poster',
        productRect: { x: 0.2, y: 0.1, w: 0.6, h: 0.72 },
        lighting: 'neutral',
        shadowOffset: { x: 4, y: 4 },
        description: 'Poster framed on gallery wall',
      },
      {
        id: 'poster-street',
        name: 'Street Scene',
        bgGradient: ['#4a4a4a', '#6b6b6b', '#8c8c8c'],
        productShape: 'poster',
        productRect: { x: 0.15, y: 0.08, w: 0.7, h: 0.75 },
        lighting: 'cool',
        shadowOffset: { x: 0, y: 0 },
        description: 'Poster on urban wall',
      },
      {
        id: 'poster-frame',
        name: 'Elegant Frame',
        bgGradient: ['#2c1810', '#3e2723', '#4e342e'],
        productShape: 'poster',
        productRect: { x: 0.18, y: 0.08, w: 0.64, h: 0.76 },
        lighting: 'warm',
        shadowOffset: { x: 6, y: 6 },
        description: 'Poster in ornate gold frame',
      },
    ],
  },
  {
    id: 'banners',
    name: 'Banners',
    icon: Flag,
    scenes: [
      {
        id: 'banner-outdoor',
        name: 'Outdoor Building',
        bgGradient: ['#87ceeb', '#b0e0e6', '#e0f0ff'],
        productShape: 'banner',
        productRect: { x: 0.15, y: 0.1, w: 0.7, h: 0.45 },
        lighting: 'warm',
        shadowOffset: { x: 3, y: 6 },
        description: 'Banner on building exterior',
      },
      {
        id: 'banner-event',
        name: 'Event Setup',
        bgGradient: ['#1a1a2e', '#2d2d44', '#3d3d5c'],
        productShape: 'banner',
        productRect: { x: 0.12, y: 0.08, w: 0.76, h: 0.5 },
        lighting: 'warm',
        shadowOffset: { x: 2, y: 4 },
        description: 'Banner at trade show event',
      },
      {
        id: 'banner-storefront',
        name: 'Storefront',
        bgGradient: ['#c9b99a', '#b8a889', '#a79778'],
        productShape: 'banner',
        productRect: { x: 0.1, y: 0.12, w: 0.8, h: 0.42 },
        lighting: 'neutral',
        shadowOffset: { x: 0, y: 3 },
        description: 'Banner above storefront',
      },
    ],
  },
  {
    id: 'stickers',
    name: 'Stickers',
    icon: Sticker,
    scenes: [
      {
        id: 'sticker-laptop',
        name: 'Laptop',
        bgGradient: ['#c0c0c0', '#d4d4d4', '#e8e8e8'],
        productShape: 'sticker',
        productRect: { x: 0.3, y: 0.25, w: 0.4, h: 0.4 },
        lighting: 'neutral',
        shadowOffset: { x: 2, y: 3 },
        description: 'Sticker on laptop lid',
      },
      {
        id: 'sticker-bottle',
        name: 'Water Bottle',
        bgGradient: ['#e8f4f8', '#d0e8ef', '#b8dce6'],
        productShape: 'sticker',
        productRect: { x: 0.32, y: 0.2, w: 0.36, h: 0.45 },
        lighting: 'cool',
        shadowOffset: { x: 3, y: 5 },
        description: 'Sticker on water bottle',
      },
      {
        id: 'sticker-notebook',
        name: 'Notebook',
        bgGradient: ['#f0e6d3', '#e6d8c4', '#dccab5'],
        productShape: 'sticker',
        productRect: { x: 0.28, y: 0.22, w: 0.44, h: 0.42 },
        lighting: 'warm',
        shadowOffset: { x: 2, y: 4 },
        description: 'Sticker on notebook cover',
      },
      {
        id: 'sticker-phone',
        name: 'Phone Case',
        bgGradient: ['#1a1a2e', '#2d2d44', '#16213e'],
        productShape: 'sticker',
        productRect: { x: 0.33, y: 0.18, w: 0.34, h: 0.5 },
        lighting: 'cool',
        shadowOffset: { x: 3, y: 6 },
        description: 'Sticker on phone case',
      },
    ],
  },
  {
    id: 'packaging',
    name: 'Packaging',
    icon: Package,
    scenes: [
      {
        id: 'pkg-box',
        name: 'Product Box',
        bgGradient: ['#f5f0e8', '#ede4d4', '#e0d5c5'],
        productShape: 'box',
        productRect: { x: 0.2, y: 0.2, w: 0.6, h: 0.55 },
        lighting: 'warm',
        shadowOffset: { x: 8, y: 12 },
        description: 'Custom product box',
      },
      {
        id: 'pkg-bag',
        name: 'Paper Bag',
        bgGradient: ['#d4c4a8', '#c4b498', '#b4a488'],
        productShape: 'box',
        productRect: { x: 0.25, y: 0.15, w: 0.5, h: 0.6 },
        lighting: 'neutral',
        shadowOffset: { x: 4, y: 8 },
        description: 'Branded paper bag',
      },
      {
        id: 'pkg-tissue',
        name: 'Tissue Paper',
        bgGradient: ['#fff5f5', '#ffe8e8', '#ffdbdb'],
        productShape: 'box',
        productRect: { x: 0.18, y: 0.18, w: 0.64, h: 0.55 },
        lighting: 'warm',
        shadowOffset: { x: 2, y: 4 },
        description: 'Branded tissue paper wrap',
      },
    ],
  },
  {
    id: 'books',
    name: 'Books & Magazines',
    icon: BookOpen,
    scenes: [
      {
        id: 'book-reading',
        name: 'Reading Scene',
        bgGradient: ['#f5e6d3', '#e8d5c0', '#dbc4ad'],
        productShape: 'book',
        productRect: { x: 0.2, y: 0.15, w: 0.6, h: 0.65 },
        lighting: 'warm',
        shadowOffset: { x: 6, y: 10 },
        description: 'Book cover in reading setup',
      },
      {
        id: 'book-shelf',
        name: 'Bookshelf',
        bgGradient: ['#3e2723', '#5d4037', '#6d4c41'],
        productShape: 'book',
        productRect: { x: 0.25, y: 0.12, w: 0.5, h: 0.7 },
        lighting: 'warm',
        shadowOffset: { x: 3, y: 5 },
        description: 'Book on wooden bookshelf',
      },
      {
        id: 'book-table',
        name: 'Table Display',
        bgGradient: ['#e0d5c5', '#d0c5b5', '#c0b5a5'],
        productShape: 'book',
        productRect: { x: 0.22, y: 0.18, w: 0.56, h: 0.6 },
        lighting: 'neutral',
        shadowOffset: { x: 4, y: 8 },
        description: 'Book on modern table',
      },
    ],
  },
  {
    id: 'flyers',
    name: 'Flyers',
    icon: FileText,
    scenes: [
      {
        id: 'flyer-hand',
        name: 'Hand Holding',
        bgGradient: ['#e8e0d8', '#d4ccc4', '#c0b8b0'],
        productShape: 'flyer',
        productRect: { x: 0.22, y: 0.15, w: 0.56, h: 0.65 },
        lighting: 'neutral',
        shadowOffset: { x: 4, y: 8 },
        description: 'Flyer held in hand',
      },
      {
        id: 'flyer-table',
        name: 'Table Surface',
        bgGradient: ['#5c4a3a', '#6d5b4a', '#7e6c5a'],
        productShape: 'flyer',
        productRect: { x: 0.2, y: 0.12, w: 0.6, h: 0.7 },
        lighting: 'warm',
        shadowOffset: { x: 0, y: 4 },
        description: 'Flyer on wooden table',
      },
      {
        id: 'flyer-wall',
        name: 'Wall Pin',
        bgGradient: ['#e8e0d8', '#d4ccc4', '#c8bfb5'],
        productShape: 'flyer',
        productRect: { x: 0.25, y: 0.1, w: 0.5, h: 0.7 },
        lighting: 'neutral',
        shadowOffset: { x: 2, y: 2 },
        description: 'Flyer pinned on wall',
      },
    ],
  },
  {
    id: 'caps-totes',
    name: 'Caps & Totes',
    icon: Gem,
    scenes: [
      {
        id: 'cap-model',
        name: 'Model Wear',
        bgGradient: ['#d0d5db', '#b8c0ca', '#a0aab5'],
        productShape: 'cap',
        productRect: { x: 0.22, y: 0.2, w: 0.56, h: 0.45 },
        lighting: 'neutral',
        shadowOffset: { x: 4, y: 6 },
        description: 'Cap worn by model',
      },
      {
        id: 'cap-flatlay',
        name: 'Flat Lay',
        bgGradient: ['#f0ebe3', '#e6ddd3', '#dcd3c7'],
        productShape: 'cap',
        productRect: { x: 0.25, y: 0.25, w: 0.5, h: 0.4 },
        lighting: 'neutral',
        shadowOffset: { x: 0, y: 4 },
        description: 'Cap flat lay arrangement',
      },
      {
        id: 'tote-model',
        name: 'Tote on Model',
        bgGradient: ['#e8e0d8', '#d4ccc4', '#c0b8b0'],
        productShape: 'cap',
        productRect: { x: 0.2, y: 0.15, w: 0.6, h: 0.6 },
        lighting: 'warm',
        shadowOffset: { x: 4, y: 8 },
        description: 'Tote bag carried by model',
      },
    ],
  },
];

// ============================================================
// DEFAULT CONTROLS
// ============================================================

const defaultControls: MockupControls = {
  designScale: 100,
  designX: 0,
  designY: 0,
  brightness: 0,
  contrast: 0,
  blur: 0,
  shadowIntensity: 40,
  lightDirection: 135,
  bgTint: '#ffffff',
};

// ============================================================
// CANVAS DRAWING HELPERS
// ============================================================

function drawProductShape(
  ctx: CanvasRenderingContext2D,
  shape: SceneConfig['productShape'],
  rect: { x: number; y: number; w: number; h: number },
  cw: number,
  ch: number
) {
  const x = rect.x * cw;
  const y = rect.y * ch;
  const w = rect.w * cw;
  const h = rect.h * ch;
  const r = 8;

  ctx.save();
  ctx.beginPath();

  switch (shape) {
    case 'card': {
      const cardW = w;
      const cardH = cardW * 0.6;
      const cardX = x + (w - cardW) / 2;
      const cardY = y + (h - cardH) / 2;
      ctx.roundRect(cardX, cardY, cardW, cardH, r);
      break;
    }
    case 'shirt': {
      const neckW = w * 0.28;
      const neckH = h * 0.06;
      const armW = w * 0.12;
      const armH = h * 0.18;
      ctx.moveTo(x + w * 0.5, y);
      ctx.lineTo(x + w * 0.5 + neckW * 0.5, y + neckH);
      ctx.lineTo(x + w - armW * 0.3, y + neckH);
      ctx.lineTo(x + w, y + neckH + armH * 0.4);
      ctx.lineTo(x + w - armW * 0.5, y + neckH + armH);
      ctx.lineTo(x + w * 0.7, y + neckH + armH * 0.6);
      ctx.lineTo(x + w * 0.7, y + h);
      ctx.lineTo(x + w * 0.3, y + h);
      ctx.lineTo(x + w * 0.3, y + neckH + armH * 0.6);
      ctx.lineTo(x + armW * 0.5, y + neckH + armH);
      ctx.lineTo(x + armW * 0.3, y + neckH + armH * 0.4);
      ctx.lineTo(x, y + neckH);
      ctx.lineTo(x + w * 0.5 - neckW * 0.5, y + neckH);
      ctx.closePath();
      break;
    }
    case 'mug': {
      const mugW = w * 0.55;
      const mugH = h;
      const mugX = x + (w - mugW) / 2;
      const mugY = y;
      const handleW = w * 0.25;
      const handleH = mugH * 0.5;
      ctx.roundRect(mugX, mugY, mugW, mugH, [r * 2, r * 2, r, r]);
      ctx.moveTo(mugX + mugW, mugY + mugH * 0.2);
      ctx.quadraticCurveTo(mugX + mugW + handleW, mugY + mugH * 0.2, mugX + mugW + handleW, mugY + mugH * 0.5);
      ctx.quadraticCurveTo(mugX + mugW + handleW, mugY + mugH * 0.8, mugX + mugW, mugY + mugH * 0.8);
      break;
    }
    case 'poster': {
      ctx.roundRect(x, y, w, h, r);
      break;
    }
    case 'banner': {
      ctx.roundRect(x, y, w, h, [0, 0, r, r]);
      break;
    }
    case 'sticker': {
      ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
      break;
    }
    case 'box': {
      const boxW = w * 0.7;
      const boxH = h * 0.75;
      const boxX = x + (w - boxW) / 2;
      const boxY = y + (h - boxH) * 0.6;
      ctx.moveTo(boxX + boxW * 0.1, boxY);
      ctx.lineTo(boxX + boxW * 0.9, boxY);
      ctx.lineTo(boxX + boxW, boxY + boxH * 0.15);
      ctx.lineTo(boxX + boxW, boxY + boxH);
      ctx.lineTo(boxX, boxY + boxH);
      ctx.lineTo(boxX, boxY + boxH * 0.15);
      ctx.closePath();
      break;
    }
    case 'book': {
      const bookW = w * 0.6;
      const bookH = h * 0.85;
      const bookX = x + (w - bookW) / 2;
      const bookY = y + (h - bookH) / 2;
      const spine = bookW * 0.06;
      ctx.roundRect(bookX + spine, bookY, bookW - spine, bookH, [0, r, r, 0]);
      ctx.moveTo(bookX + spine, bookY);
      ctx.lineTo(bookX, bookY + bookH * 0.05);
      ctx.lineTo(bookX, bookY + bookH * 0.95);
      ctx.lineTo(bookX + spine, bookY + bookH);
      break;
    }
    case 'flyer': {
      const flyerW = w * 0.65;
      const flyerH = flyerW * 1.414;
      const flyerX = x + (w - flyerW) / 2;
      const flyerY = y + (h - flyerH) / 2;
      ctx.roundRect(flyerX, flyerY, flyerW, flyerH, r);
      break;
    }
    case 'cap': {
      const capW = w * 0.75;
      const capH = h * 0.65;
      const capX = x + (w - capW) / 2;
      const capY = y + (h - capH) * 0.4;
      ctx.moveTo(capX, capY + capH * 0.5);
      ctx.quadraticCurveTo(capX, capY, capX + capW * 0.5, capY);
      ctx.quadraticCurveTo(capX + capW, capY, capX + capW, capY + capH * 0.5);
      ctx.lineTo(capX + capW * 1.1, capY + capH * 0.7);
      ctx.quadraticCurveTo(capX + capW * 1.1, capY + capH * 0.9, capX + capW * 0.8, capY + capH);
      ctx.lineTo(capX + capW * 0.2, capY + capH);
      ctx.quadraticCurveTo(capX - capW * 0.05, capY + capH * 0.9, capX - capW * 0.02, capY + capH * 0.7);
      ctx.closePath();
      break;
    }
    default:
      ctx.roundRect(x, y, w, h, r);
  }

  ctx.closePath();
  ctx.restore();
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  scene: SceneConfig,
  cw: number,
  ch: number
) {
  const grad = ctx.createLinearGradient(0, 0, cw, ch);
  grad.addColorStop(0, scene.bgGradient[0]);
  grad.addColorStop(0.5, scene.bgGradient[1]);
  grad.addColorStop(1, scene.bgGradient[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, cw, ch);

  for (let i = 0; i < 3000; i++) {
    const px = Math.random() * cw;
    const py = Math.random() * ch;
    const alpha = Math.random() * 0.08;
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillRect(px, py, 1, 1);
  }
}

function drawLighting(
  ctx: CanvasRenderingContext2D,
  scene: SceneConfig,
  cw: number,
  ch: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  if (scene.lighting === 'warm') {
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(cw, ch) * 0.7);
    grad.addColorStop(0, 'rgba(255,200,100,0.15)');
    grad.addColorStop(0.5, 'rgba(255,180,80,0.05)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);
  } else if (scene.lighting === 'cool') {
    const grad = ctx.createRadialGradient(cw, 0, 0, cw, 0, Math.max(cw, ch) * 0.7);
    grad.addColorStop(0, 'rgba(150,200,255,0.12)');
    grad.addColorStop(0.5, 'rgba(100,180,255,0.04)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);
  } else {
    const grad = ctx.createRadialGradient(cw / 2, 0, 0, cw / 2, 0, ch * 0.8);
    grad.addColorStop(0, 'rgba(255,255,255,0.08)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.02)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);
  }
  ctx.restore();
}

function drawShadow(
  ctx: CanvasRenderingContext2D,
  scene: SceneConfig,
  cw: number,
  ch: number,
  intensity: number
) {
  ctx.save();
  drawProductShape(ctx, scene.productShape, scene.productRect, cw, ch);
  ctx.shadowColor = `rgba(0,0,0,${intensity / 100 * 0.6})`;
  ctx.shadowBlur = 30;
  ctx.shadowOffsetX = scene.shadowOffset.x;
  ctx.shadowOffsetY = scene.shadowOffset.y;
  ctx.fillStyle = 'rgba(0,0,0,0.001)';
  ctx.fill();
  ctx.restore();

  ctx.save();
  drawProductShape(ctx, scene.productShape, scene.productRect, cw, ch);
  ctx.shadowColor = `rgba(0,0,0,${intensity / 100 * 0.3})`;
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = scene.shadowOffset.x * 0.3;
  ctx.shadowOffsetY = scene.shadowOffset.y * 0.5;
  ctx.fillStyle = 'rgba(0,0,0,0.001)';
  ctx.fill();
  ctx.restore();
}

function drawDesignOnProduct(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  scene: SceneConfig,
  cw: number,
  ch: number,
  controls: MockupControls
) {
  const rect = scene.productRect;
  let productX = rect.x * cw;
  let productY = rect.y * ch;
  let productW = rect.w * cw;
  let productH = rect.h * ch;

  if (scene.productShape === 'mug') {
    productW *= 0.55;
    productX = rect.x * cw + (rect.w * cw - productW) / 2;
  } else if (scene.productShape === 'box') {
    productW *= 0.7;
    productH *= 0.75;
    productX = rect.x * cw + (rect.w * cw - productW) / 2;
    productY = rect.y * ch + (rect.h * ch - productH) * 0.6;
  } else if (scene.productShape === 'shirt') {
    productW *= 0.6;
    productH *= 0.5;
    productX = rect.x * cw + (rect.w * cw - productW) / 2;
    productY = rect.y * ch + rect.h * ch * 0.15;
  } else if (scene.productShape === 'book') {
    productW *= 0.5;
    productH *= 0.7;
    productX = rect.x * cw + (rect.w * cw - productW) / 2 + productW * 0.06;
    productY = rect.y * ch + (rect.h * ch - productH) / 2;
  }

  const scale = controls.designScale / 100;
  const offsetX = controls.designX;
  const offsetY = controls.designY;

  const imgAspect = img.width / img.height;
  const areaAspect = productW / productH;

  let drawW: number, drawH: number;
  if (imgAspect > areaAspect) {
    drawW = productW * 0.8 * scale;
    drawH = drawW / imgAspect;
  } else {
    drawH = productH * 0.8 * scale;
    drawW = drawH * imgAspect;
  }

  const drawX = productX + (productW - drawW) / 2 + offsetX;
  const drawY = productY + (productH - drawH) / 2 + offsetY;

  ctx.save();
  drawProductShape(ctx, scene.productShape, scene.productRect, cw, ch);
  ctx.clip();

  const brightness = controls.brightness / 50;
  const contrast = (controls.contrast + 50) / 50;

  if (brightness !== 0 || contrast !== 1) {
    const r = brightness > 0 ? 255 : 0;
    const g = brightness > 0 ? 255 : 0;
    const b = brightness > 0 ? 255 : 0;
    const alpha = Math.abs(brightness);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.globalCompositeOperation = brightness > 0 ? 'lighter' : 'multiply';
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.3})`;
    ctx.fillRect(drawX, drawY, drawW, drawH);
    ctx.globalCompositeOperation = 'source-over';
    if (contrast !== 1) {
      ctx.filter = `contrast(${contrast})`;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.filter = 'none';
    }
  } else {
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  ctx.restore();
}

function drawGrainOverlay(
  ctx: CanvasRenderingContext2D,
  cw: number,
  ch: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  for (let i = 0; i < 2000; i++) {
    const px = Math.random() * cw;
    const py = Math.random() * ch;
    const v = Math.random() > 0.5 ? 255 : 0;
    const alpha = Math.random() * 0.04;
    ctx.fillStyle = `rgba(${v},${v},${v},${alpha})`;
    ctx.fillRect(px, py, 1, 1);
  }
  ctx.restore();
}

function drawLightDirectionOverlay(
  ctx: CanvasRenderingContext2D,
  cw: number,
  ch: number,
  angle: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'soft-light';
  const rad = (angle * Math.PI) / 180;
  const cx = cw / 2 + Math.cos(rad) * cw * 0.3;
  const cy = ch / 2 + Math.sin(rad) * ch * 0.3;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(cw, ch) * 0.6);
  grad.addColorStop(0, 'rgba(255,255,255,0.12)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, cw, ch);
  ctx.restore();
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function MockupSceneGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>('business-cards');
  const [selectedScene, setSelectedScene] = useState<string>('bc-desk');
  const [designImage, setDesignImage] = useState<HTMLImageElement | null>(null);
  const [designFileName, setDesignFileName] = useState('');
  const [controls, setControls] = useState<MockupControls>({ ...defaultControls });
  const [exportSettings, setExportSettings] = useState<ExportSettings>({ format: 'png', scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animationFrameRef = useRef<number>(0);

  const category = categories.find((c) => c.id === selectedCategory);
  const scene = category?.scenes.find((s) => s.id === selectedScene);

  const CANVAS_W = 800;
  const CANVAS_H = 600;

  const handleFileLoad = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setDesignFileName(file.name);
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setDesignImage(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileLoad(file);
  }, [handleFileLoad]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileLoad(file);
  }, [handleFileLoad]);

  const updateControl = useCallback((key: keyof MockupControls, value: number | string) => {
    setControls((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetControls = useCallback(() => {
    setControls({ ...defaultControls });
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = CANVAS_W;
    const ch = CANVAS_H;

    ctx.clearRect(0, 0, cw, ch);

    if (scene) {
      drawBackground(ctx, scene, cw, ch);
      drawShadow(ctx, scene, cw, ch, controls.shadowIntensity);

      ctx.save();
      drawProductShape(ctx, scene.productShape, scene.productRect, cw, ch);
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      if (designImage) {
        drawDesignOnProduct(ctx, designImage, scene, cw, ch, controls);
      } else {
        ctx.save();
        drawProductShape(ctx, scene.productShape, scene.productRect, cw, ch);
        ctx.clip();
        const rect = scene.productRect;
        const px = rect.x * cw;
        const py = rect.y * ch;
        const pw = rect.w * cw;
        const ph = rect.h * ch;
        ctx.fillStyle = 'rgba(0,0,0,0.04)';
        ctx.fillRect(px, py, pw, ph);
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Upload your design', px + pw / 2, py + ph / 2);
        ctx.restore();
      }

      drawLighting(ctx, scene, cw, ch);
      drawLightDirectionOverlay(ctx, cw, ch, controls.lightDirection);
      drawGrainOverlay(ctx, cw, ch);

      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(scene.name, 16, ch - 12);
      ctx.restore();
    }
  }, [scene, designImage, controls]);

  useEffect(() => {
    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      setIsRendering(true);
      renderCanvas();
      setIsRendering(false);
    });
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [renderCanvas]);

  useEffect(() => {
    if (category && !category.scenes.find((s) => s.id === selectedScene)) {
      setSelectedScene(category.scenes[0].id);
    }
  }, [category, selectedScene]);

  const handleExport = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scale = exportSettings.scale;
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = CANVAS_W * scale;
    exportCanvas.height = CANVAS_H * scale;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(scale, scale);

    if (scene) {
      drawBackground(ctx, scene, CANVAS_W, CANVAS_H);
      drawShadow(ctx, scene, CANVAS_W, CANVAS_H, controls.shadowIntensity);

      ctx.save();
      drawProductShape(ctx, scene.productShape, scene.productRect, CANVAS_W, CANVAS_H);
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      if (designImage) {
        drawDesignOnProduct(ctx, designImage, scene, CANVAS_W, CANVAS_H, controls);
      }

      drawLighting(ctx, scene, CANVAS_W, CANVAS_H);
      drawLightDirectionOverlay(ctx, CANVAS_W, CANVAS_H, controls.lightDirection);
      drawGrainOverlay(ctx, CANVAS_W, CANVAS_H);
    }

    const mimeType = exportSettings.format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const ext = exportSettings.format === 'jpeg' ? 'jpg' : 'png';
    const dataUrl = exportCanvas.toDataURL(mimeType, 0.95);
    const a = document.createElement('a');
    a.download = `mockup-${scene?.id || 'scene'}-${scale}x.${ext}`;
    a.href = dataUrl;
    a.click();
    setShowExportMenu(false);
  }, [scene, designImage, controls, exportSettings]);

  const handleCategoryChange = useCallback((catId: string) => {
    setSelectedCategory(catId);
    const cat = categories.find((c) => c.id === catId);
    if (cat && cat.scenes.length > 0) {
      setSelectedScene(cat.scenes[0].id);
    }
  }, []);

  const SliderControl = ({
    label,
    value,
    min,
    max,
    step = 1,
    unit = '',
    onChange,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onChange: (v: number) => void;
  }) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-slate-500">{label}</span>
        <span className="text-[11px] font-bold text-dark tabular-nums">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <Container>
          <div className="py-5">
            <Link href="/utilities" className="text-xs text-primary hover:underline mb-2 inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Utilities
            </Link>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-dark font-heading">Mockup Scene Generator</h1>
                <p className="text-xs text-muted">Create photorealistic product mockups in seconds</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container size="wide">
        <div className="py-6 flex flex-col xl:flex-row gap-5 min-h-[calc(100vh-200px)]">

          {/* LEFT SIDEBAR — CATEGORIES */}
          <div className="w-full xl:w-56 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-2 sticky top-24">
              <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Products</p>
              <div className="space-y-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <cat.icon className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium truncate">{cat.name}</span>
                    <ChevronRight className={`w-3 h-3 ml-auto shrink-0 ${selectedCategory === cat.id ? 'text-white/60' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>

              {category && (
                <>
                  <div className="border-t border-slate-100 my-2" />
                  <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scenes</p>
                  <div className="space-y-0.5">
                    {category.scenes.map((sc) => (
                      <button
                        key={sc.id}
                        onClick={() => setSelectedScene(sc.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                          selectedScene === sc.id
                            ? 'bg-slate-100 text-dark border border-slate-200'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded border border-slate-200 shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${sc.bgGradient[0]}, ${sc.bgGradient[2]})`,
                          }}
                        />
                        <span className="text-[11px] font-medium truncate">{sc.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CENTER — CANVAS */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* Upload Bar */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative bg-white rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                isDragging
                  ? 'border-primary bg-primary/5 scale-[1.01]'
                  : 'border-slate-200 hover:border-primary/40 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={handleFileInput}
                className="hidden"
              />
              <div className="flex items-center gap-4 px-5 py-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  designImage ? 'bg-green-50' : 'bg-slate-100'
                }`}>
                  {designImage ? (
                    <img
                      src={designImage.src}
                      alt="Design"
                      className="w-10 h-10 object-contain rounded"
                    />
                  ) : (
                    <Upload className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark truncate">
                    {designFileName || 'Upload your design'}
                  </p>
                  <p className="text-[11px] text-muted">
                    {designImage
                      ? `${designImage.naturalWidth} × ${designImage.naturalHeight}px — Click to replace`
                      : 'Drag & drop or click to browse (PNG, JPG, SVG, WebP)'}
                  </p>
                </div>
                {designImage && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDesignImage(null);
                      setDesignFileName('');
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                  >
                    <X className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                  </button>
                )}
              </div>
            </div>

            {/* Canvas Area */}
            <div className="bg-slate-900 rounded-xl p-3 relative overflow-hidden">
              {isRendering && (
                <div className="absolute inset-0 z-10 bg-slate-900/60 flex items-center justify-center rounded-xl">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    Rendering...
                  </div>
                </div>
              )}
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className="w-full rounded-lg"
                style={{ imageRendering: 'auto' }}
              />
              {scene && (
                <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 text-[10px] text-white/80 font-medium">
                  {CANVAS_W} × {CANVAS_H} • {scene.lighting} light
                </div>
              )}
            </div>

            {/* Scene Thumbnails */}
            {category && (
              <div className="bg-white rounded-xl border border-slate-200 p-3">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {category.scenes.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedScene(sc.id)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedScene === sc.id
                          ? 'border-primary shadow-md scale-105'
                          : 'border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div
                        className="w-20 h-14"
                        style={{
                          background: `linear-gradient(135deg, ${sc.bgGradient[0]}, ${sc.bgGradient[1]}, ${sc.bgGradient[2]})`,
                        }}
                      />
                      <div className="px-2 py-1 bg-white">
                        <p className="text-[9px] font-medium text-slate-600 truncate">{sc.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR — CONTROLS */}
          <div className="w-full xl:w-64 shrink-0 space-y-4">

            {/* Design Controls */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Move className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Design Placement</h3>
              </div>
              <SliderControl
                label="Scale"
                value={controls.designScale}
                min={20}
                max={200}
                unit="%"
                onChange={(v) => updateControl('designScale', v)}
              />
              <SliderControl
                label="X Position"
                value={controls.designX}
                min={-200}
                max={200}
                unit="px"
                onChange={(v) => updateControl('designX', v)}
              />
              <SliderControl
                label="Y Position"
                value={controls.designY}
                min={-200}
                max={200}
                unit="px"
                onChange={(v) => updateControl('designY', v)}
              />
            </div>

            {/* Appearance Controls */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Appearance</h3>
              </div>
              <SliderControl
                label="Brightness"
                value={controls.brightness}
                min={-50}
                max={50}
                onChange={(v) => updateControl('brightness', v)}
              />
              <SliderControl
                label="Contrast"
                value={controls.contrast}
                min={-50}
                max={50}
                onChange={(v) => updateControl('contrast', v)}
              />
              <SliderControl
                label="Shadow Intensity"
                value={controls.shadowIntensity}
                min={0}
                max={100}
                unit="%"
                onChange={(v) => updateControl('shadowIntensity', v)}
              />
            </div>

            {/* Lighting Controls */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Lighting</h3>
              </div>
              <SliderControl
                label="Light Angle"
                value={controls.lightDirection}
                min={0}
                max={360}
                unit="°"
                onChange={(v) => updateControl('lightDirection', v)}
              />
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'Warm', icon: Sun, angle: 135, color: 'text-amber-500' },
                  { label: 'Cool', icon: Cloud, angle: 45, color: 'text-blue-500' },
                  { label: 'Neutral', icon: Moon, angle: 90, color: 'text-slate-400' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => updateControl('lightDirection', preset.angle)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                      Math.abs(controls.lightDirection - preset.angle) < 20
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <preset.icon className={`w-4 h-4 ${preset.color}`} />
                    <span className="text-[9px] font-medium text-slate-600">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={resetControls}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-xl hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Controls
            </button>

            {/* Export */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 relative">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Export</h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 mb-1 block">Format</label>
                  <select
                    value={exportSettings.format}
                    onChange={(e) =>
                      setExportSettings((p) => ({ ...p, format: e.target.value as 'png' | 'jpeg' }))
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-primary"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 mb-1 block">Resolution</label>
                  <select
                    value={exportSettings.scale}
                    onChange={(e) =>
                      setExportSettings((p) => ({ ...p, scale: Number(e.target.value) as 1 | 2 | 3 }))
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-primary"
                  >
                    <option value={1}>1× (800×600)</option>
                    <option value={2}>2× (1600×1200)</option>
                    <option value={3}>3× (2400×1800)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleExport}
                disabled={!scene}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Mockup
              </button>

              <p className="text-[9px] text-slate-400 text-center">
                {exportSettings.scale}× {exportSettings.format.toUpperCase()} —{' '}
                {CANVAS_W * exportSettings.scale} × {CANVAS_H * exportSettings.scale}px
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
