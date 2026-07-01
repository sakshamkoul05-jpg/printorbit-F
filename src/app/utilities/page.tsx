'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Ruler, Calculator, Grid3x3, BookOpenCheck, Droplets, Paintbrush, PenTool, Sparkles,
  ImageIcon, Wand2, FileDown, Grid2x2, Hash, Type, CreditCard, DollarSign, Layers,
  BookOpen, Download, Upload, CheckCircle, AlertTriangle, ArrowRight, Copy,
  RefreshCw, Sliders, Eye, Minimize2, Bold, Shield, CircleDot, Scissors,
  ScanSearch, Palette, Moon, ArrowLeftRight, Monitor, Search, FileSearch,
  Package, Truck, Clock, FileText, Weight, Target, Settings, Grid, ZoomIn,
} from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import PreflightChecker, { CMYKSimulator, TrapWidthCalculator, SpotUVGenerator, DieCutTemplateGenerator } from './_components/PrintProductionNew';
import { ColorBlindSimulator, ContrastChecker, ICCProfileComparison, SafeFontList, ColorMixCalculator } from './_components/ColorToolsNew';
import { ImageDPIScaler, StencilGenerator, BleedPreviewOverlay } from './_components/ImageToolsNew';
import { FileProofingTool, PrintQuantityCalculator, PaperStockComparison, ShippingCalculator, OrderTimelineEstimator, DesignBriefGenerator } from './_components/ClientToolsNew';
import { EnvelopeSizeReference, PrintResolutionReference, SubstrateWeightCalculator, FileNamingGenerator, MultiPageLayoutArranger } from './_components/ReferenceToolsNew';
import { ImpressionCalculator, GCRCalculator, ImpositionCalculator } from './_components/AdvancedTools';

// ============================================================
// TOOL DEFINITIONS
// ============================================================
type ToolCategory = 'PRINT PRODUCTION' | 'COLOR TOOLS' | 'IMAGE TOOLS' | 'CLIENT TOOLS' | 'REFERENCE' | 'ADVANCED';

interface ToolDef {
  id: string;
  name: string;
  icon: typeof Ruler;
  description: string;
  category: ToolCategory;
}

const tools: ToolDef[] = [
  { id: 'dpi', name: 'DPI Calculator', icon: Ruler, description: 'Calculate print DPI from dimensions', category: 'PRINT PRODUCTION' },
  { id: 'bleed', name: 'Bleed Calculator', icon: Grid3x3, description: 'Calculate bleed & safe zones', category: 'PRINT PRODUCTION' },
  { id: 'units', name: 'Unit Converter', icon: Calculator, description: 'Convert mm, cm, inches, px, pt, pc', category: 'PRINT PRODUCTION' },
  { id: 'papersize', name: 'Paper Size Reference', icon: BookOpenCheck, description: 'Standard paper sizes worldwide', category: 'PRINT PRODUCTION' },
  { id: 'preflight', name: 'Print Preflight Checker', icon: Shield, description: 'Check designs for print readiness', category: 'PRINT PRODUCTION' },
  { id: 'cmyksim', name: 'CMYK Simulator', icon: CircleDot, description: 'Preview RGB→CMYK color shift', category: 'PRINT PRODUCTION' },
  { id: 'trap', name: 'Trap Width Calculator', icon: ArrowLeftRight, description: 'Calculate trap for offset printing', category: 'PRINT PRODUCTION' },
  { id: 'spotuv', name: 'Spot UV Template', icon: Sparkles, description: 'Generate spot UV mask layers', category: 'PRINT PRODUCTION' },
  { id: 'diecut', name: 'Die-Cut Template', icon: Scissors, description: 'Generate cut/fold templates', category: 'PRINT PRODUCTION' },
  { id: 'colorconvert', name: 'Color Converter', icon: Droplets, description: 'Convert HEX, RGB, CMYK, HSL', category: 'COLOR TOOLS' },
  { id: 'richblack', name: 'Rich Black Calculator', icon: Bold, description: 'Proper rich black values for print', category: 'COLOR TOOLS' },
  { id: 'palette', name: 'Color Palette Generator', icon: Paintbrush, description: 'Generate color palettes', category: 'COLOR TOOLS' },
  { id: 'colorblind', name: 'Color Blind Simulator', icon: Eye, description: 'Simulate color vision deficiencies', category: 'COLOR TOOLS' },
  { id: 'contrast', name: 'Contrast Checker', icon: ScanSearch, description: 'WCAG contrast ratio checker', category: 'COLOR TOOLS' },
  { id: 'icc', name: 'ICC Profile Comparison', icon: Monitor, description: 'Compare color gamuts across profiles', category: 'COLOR TOOLS' },
  { id: 'safefont', name: 'Safe Font List', icon: Type, description: 'Cross-platform font compatibility', category: 'COLOR TOOLS' },
  { id: 'colormix', name: 'Color Mixing Calculator', icon: Palette, description: 'Spot color mixing percentages', category: 'COLOR TOOLS' },
  { id: 'compress', name: 'Image Compression', icon: Minimize2, description: 'Compress images with quality control', category: 'IMAGE TOOLS' },
  { id: 'watermark', name: 'Watermark Tool', icon: ImageIcon, description: 'Add text watermarks to images', category: 'IMAGE TOOLS' },
  { id: 'bgremove', name: 'Background Remover', icon: Wand2, description: 'Remove white/light backgrounds', category: 'IMAGE TOOLS' },
  { id: 'formatconvert', name: 'Image Format Converter', icon: FileDown, description: 'Convert PNG, JPG, WebP formats', category: 'IMAGE TOOLS' },
  { id: 'svgtopng', name: 'SVG to PNG', icon: Grid2x2, description: 'Convert SVG to PNG at custom DPI', category: 'IMAGE TOOLS' },
  { id: 'upscaler', name: 'Image DPI Scaler', icon: ZoomIn, description: 'Smart upscale images for print', category: 'IMAGE TOOLS' },
  { id: 'stencil', name: 'Stencil Generator', icon: Scissors, description: 'Create cuttable stencil templates', category: 'IMAGE TOOLS' },
  { id: 'bleedpreview', name: 'Bleed Preview Overlay', icon: Grid, description: 'Visualize bleed/safe zones on designs', category: 'IMAGE TOOLS' },
  { id: 'barcode', name: 'Barcode Generator', icon: Hash, description: 'Generate Code 128, EAN-13, UPC-A', category: 'CLIENT TOOLS' },
  { id: 'lorem', name: 'Placeholder Text Generator', icon: Type, description: 'Lorem ipsum for print mockups', category: 'CLIENT TOOLS' },
  { id: 'bizcard', name: 'Business Card Sizes', icon: CreditCard, description: 'Standard sizes worldwide', category: 'CLIENT TOOLS' },
  { id: 'proofing', name: 'File Proofing Tool', icon: FileSearch, description: 'Client design proofing & annotation', category: 'CLIENT TOOLS' },
  { id: 'quantity', name: 'Print Quantity Calculator', icon: DollarSign, description: 'Cost estimation by quantity', category: 'CLIENT TOOLS' },
  { id: 'paperstock', name: 'Paper Stock Comparison', icon: Layers, description: 'Compare paper types & finishes', category: 'CLIENT TOOLS' },
  { id: 'shipping', name: 'Shipping Calculator', icon: Truck, description: 'Estimate shipping costs', category: 'CLIENT TOOLS' },
  { id: 'timeline', name: 'Order Timeline Estimator', icon: Clock, description: 'Production timeline calculator', category: 'CLIENT TOOLS' },
  { id: 'brief', name: 'Design Brief Generator', icon: FileText, description: 'Client questionnaire & brief', category: 'CLIENT TOOLS' },
  { id: 'priceest', name: 'Print Price Estimator', icon: DollarSign, description: 'Estimate print job costs', category: 'REFERENCE' },
  { id: 'gangsheet', name: 'Gang Sheet Calculator', icon: Layers, description: 'Items per sheet calculator', category: 'REFERENCE' },
  { id: 'fontpair', name: 'Font Pairing Guide', icon: BookOpen, description: 'Recommended font combinations', category: 'REFERENCE' },
  { id: 'envelope', name: 'Envelope Size Reference', icon: Package, description: 'Standard envelope sizes worldwide', category: 'REFERENCE' },
  { id: 'presref', name: 'Print Resolution Guide', icon: Monitor, description: 'DPI requirements per product', category: 'REFERENCE' },
  { id: 'substrate', name: 'Substrate Weight Calc', icon: Weight, description: 'Paper weight conversions', category: 'REFERENCE' },
  { id: 'filenaming', name: 'File Naming Generator', icon: FileText, description: 'Standardized print file names', category: 'REFERENCE' },
  { id: 'impose', name: 'Multi-Page Layout', icon: Grid2x2, description: 'Page imposition for booklets', category: 'REFERENCE' },
  { id: 'impression', name: 'Impression Calculator', icon: Target, description: 'Ink coverage & cost estimation', category: 'ADVANCED' },
  { id: 'gcr', name: 'GCR/UCR Calculator', icon: Settings, description: 'Gray Component Replacement settings', category: 'ADVANCED' },
  { id: 'imposecalc', name: 'Imposition Calculator', icon: Grid3x3, description: 'Multi-up imposition layouts', category: 'ADVANCED' },
];

// ============================================================
// UTILITY HELPERS
// ============================================================
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0; const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (mx === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
  };
  return { r: f(0), g: f(8), b: f(4) };
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
}

function rgbToCmyk(r: number, g: number, b: number) {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  const c = (1 - rr - k) / (1 - k);
  const m = (1 - gg - k) / (1 - k);
  const y = (1 - bb - k) / (1 - k);
  return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
}

function cmykToRgb(c: number, m: number, y: number, k: number) {
  c /= 100; m /= 100; y /= 100; k /= 100;
  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k)),
  };
}

function hslToHex(h: number, s: number, l: number) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

function parseColorInput(input: string): { r: number; g: number; b: number } | null {
  const hex = input.trim();
  if (/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
    return hexToRgb(hex.startsWith('#') ? hex : '#' + hex);
  }
  const rgbMatch = hex.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
  if (rgbMatch) {
    return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
  }
  return null;
}

function getInkPercent(c: number, m: number, y: number, k: number) {
  return c + m + y + k;
}

// ============================================================
// 1. DPI CALCULATOR
// ============================================================
function DPICalculator() {
  const [unit, setUnit] = useState<'mm' | 'inches'>('mm');
  const [printW, setPrintW] = useState('');
  const [printH, setPrintH] = useState('');
  const [pxW, setPxW] = useState('');
  const [pxH, setPxH] = useState('');

  const presets = [
    { name: 'Business Card', w: 85, h: 55, u: 'mm' as const },
    { name: 'A4 Flyer', w: 210, h: 297, u: 'mm' as const },
    { name: 'A3 Poster', w: 297, h: 420, u: 'mm' as const },
    { name: 'A2 Poster', w: 420, h: 594, u: 'mm' as const },
    { name: 'Roll-up Banner', w: 850, h: 2000, u: 'mm' as const },
    { name: 'US Letter', w: 8.5, h: 11, u: 'inches' as const },
    { name: 'US Business Card', w: 3.5, h: 2, u: 'inches' as const },
    { name: 'Web Banner', w: 1920, h: 1080, u: 'mm' as const },
  ];

  const pw = parseFloat(printW) || 0;
  const ph = parseFloat(printH) || 0;
  const ppxw = parseInt(pxW) || 0;
  const ppxh = parseInt(pxH) || 0;

  let dpi = 0;
  let dpiH = 0;
  let dpiW = 0;
  if (pw > 0 && ppxw > 0) {
    dpiW = unit === 'mm' ? (ppxw / pw) * 25.4 : ppxw / pw;
  }
  if (ph > 0 && ppxh > 0) {
    dpiH = unit === 'mm' ? (ppxh / ph) * 25.4 : ppxh / ph;
  }
  if (dpiW > 0 && dpiH > 0) {
    dpi = Math.min(dpiW, dpiH);
  } else if (dpiW > 0) {
    dpi = dpiW;
  } else if (dpiH > 0) {
    dpi = dpiH;
  }

  const getQuality = () => {
    if (dpi === 0) return { label: 'Enter values', color: 'text-slate-400', icon: null };
    if (dpi >= 300) return { label: 'Print Ready', color: 'text-green-600', icon: CheckCircle };
    if (dpi >= 150) return { label: 'Acceptable for large format', color: 'text-yellow-600', icon: AlertTriangle };
    return { label: 'Too low for print', color: 'text-red-600', icon: AlertTriangle };
  };

  const quality = getQuality();

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button onClick={() => setUnit('mm')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${unit === 'mm' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>Millimeters</button>
        <button onClick={() => setUnit('inches')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${unit === 'inches' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>Inches</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Print Width ({unit})</label>
          <input type="number" step="any" value={printW} onChange={(e) => setPrintW(e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Print Height ({unit})</label>
          <input type="number" step="any" value={printH} onChange={(e) => setPrintH(e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Pixel Width</label>
          <input type="number" value={pxW} onChange={(e) => setPxW(e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Pixel Height</label>
          <input type="number" value={pxH} onChange={(e) => setPxH(e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
      </div>
      {dpi > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <div className="flex justify-between"><span className="text-sm text-muted">Horizontal DPI</span><span className="text-sm font-bold text-dark">{dpiW.toFixed(1)}</span></div>
          <div className="flex justify-between"><span className="text-sm text-muted">Vertical DPI</span><span className="text-sm font-bold text-dark">{dpiH.toFixed(1)}</span></div>
          <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
            <span className="text-sm font-semibold text-dark">Effective DPI</span>
            <span className={`text-lg font-bold ${quality.color}`}>{dpi.toFixed(1)}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm font-medium ${quality.color}`}>
            {quality.icon && <quality.icon className="w-4 h-4" />}
            {quality.label}
          </div>
        </div>
      )}
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-2 block">Quick Presets</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.name} onClick={() => { setUnit(p.u); setPrintW(String(p.w)); setPrintH(String(p.h)); }} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">{p.name}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 2. BLEED CALCULATOR
// ============================================================
function BleedCalculator() {
  const products = [
    { name: 'Business Card', w: 85, h: 55, bleed: 3 },
    { name: 'DL Flyer', w: 99, h: 210, bleed: 3 },
    { name: 'A5 Flyer', w: 148, h: 210, bleed: 3 },
    { name: 'A4 Flyer', w: 210, h: 297, bleed: 3 },
    { name: 'A3 Poster', w: 297, h: 420, bleed: 3 },
    { name: 'A2 Poster', w: 420, h: 594, bleed: 3 },
    { name: 'A1 Poster', w: 594, h: 841, bleed: 3 },
    { name: 'Roll-up Banner', w: 850, h: 2000, bleed: 5 },
    { name: 'Custom', w: 0, h: 0, bleed: 3 },
  ];

  const [selected, setSelected] = useState(0);
  const [customW, setCustomW] = useState(100);
  const [customH, setCustomH] = useState(150);
  const [bleedVal, setBleedVal] = useState(3);

  const product = products[selected];
  const fw = selected === products.length - 1 ? customW : product.w;
  const fh = selected === products.length - 1 ? customH : product.h;
  const bl = selected === products.length - 1 ? bleedVal : product.bleed;

  const totalW = fw + bl * 2;
  const totalH = fh + bl * 2;
  const safeW = fw - bl * 2;
  const safeH = fh - bl * 2;

  const scale = 120 / Math.max(totalW, totalH);
  const boxW = fw * scale;
  const boxH = fh * scale;
  const totalBoxW = totalW * scale;
  const totalBoxH = totalH * scale;
  const safeBoxW = Math.max(0, safeW) * scale;
  const safeBoxH = Math.max(0, safeH) * scale;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2">
        {products.map((p, i) => (
          <button key={p.name} onClick={() => setSelected(i)} className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${selected === i ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{p.name}</button>
        ))}
      </div>
      {selected === products.length - 1 && (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Width (mm)</label>
            <input type="number" value={customW} onChange={(e) => setCustomW(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Height (mm)</label>
            <input type="number" value={customH} onChange={(e) => setCustomH(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Bleed (mm)</label>
            <input type="number" step="0.5" value={bleedVal} onChange={(e) => setBleedVal(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="relative border-2 border-dashed border-slate-400 bg-slate-50 rounded-lg" style={{ width: totalBoxW, height: totalBoxH }}>
          <div className="absolute bg-primary/5 border border-primary/30 rounded" style={{ width: boxW, height: boxH, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {safeW > 0 && safeH > 0 && (
              <div className="absolute border border-dashed border-green-400 bg-green-50/50 rounded" style={{ width: safeBoxW, height: safeBoxH, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            )}
          </div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500">Total: {totalW} x {totalH} mm</div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary">Trim: {fw} x {fh} mm</div>
        </div>
      </div>
      <div className="flex gap-4 text-xs justify-center">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 border-2 border-dashed border-slate-400 bg-slate-50 rounded" /><span className="text-muted">Bleed Area</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 border border-primary/30 bg-primary/5 rounded" /><span className="text-muted">Trim Size</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 border border-dashed border-green-400 bg-green-50 rounded" /><span className="text-muted">Safe Zone</span></div>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
        <div className="flex justify-between"><span className="text-sm text-muted">Final Trim Size</span><span className="text-sm font-bold text-dark">{fw} x {fh} mm</span></div>
        <div className="flex justify-between"><span className="text-sm text-muted">Bleed per side</span><span className="text-sm font-bold text-dark">{bl} mm</span></div>
        <div className="flex justify-between"><span className="text-sm text-muted">Total File Size</span><span className="text-sm font-bold text-dark">{totalW} x {totalH} mm</span></div>
        <div className="flex justify-between"><span className="text-sm text-muted">Safe Zone</span><span className="text-sm font-bold text-dark">{Math.max(0, safeW)} x {Math.max(0, safeH)} mm</span></div>
      </div>
    </div>
  );
}

// ============================================================
// 3. UNIT CONVERTER
// ============================================================
function UnitConverter() {
  const [dpi, setDpi] = useState(300);
  const [value, setValue] = useState('100');
  const [fromUnit, setFromUnit] = useState('mm');

  const units = ['mm', 'cm', 'inches', 'px', 'points', 'picas'];
  const toMm: Record<string, (v: number, dpi: number) => number> = {
    mm: (v) => v,
    cm: (v) => v * 10,
    inches: (v) => v * 25.4,
    px: (v) => (v / dpi) * 25.4,
    points: (v) => v * 0.3528,
    picas: (v) => v * 4.233,
  };
  const fromMm: Record<string, (v: number, dpi: number) => number> = {
    mm: (v) => v,
    cm: (v) => v / 10,
    inches: (v) => v / 25.4,
    px: (v) => (v / 25.4) * dpi,
    points: (v) => v / 0.3528,
    picas: (v) => v / 4.233,
  };

  const numVal = parseFloat(value) || 0;
  const mmVal = toMm[fromUnit](numVal, dpi);
  const results = units.map((u) => ({ unit: u, value: fromMm[u](mmVal, dpi) }));

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">DPI Setting</label>
        <input type="number" value={dpi} onChange={(e) => setDpi(Number(e.target.value) || 72)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Value</label>
          <input type="number" step="any" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
        <div className="w-40">
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Unit</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        {results.map((r) => (
          <div key={r.unit} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-sm font-medium text-muted capitalize">{r.unit === 'px' ? 'Pixels' : r.unit === 'mm' ? 'Millimeters' : r.unit === 'cm' ? 'Centimeters' : r.unit === 'points' ? 'Points' : r.unit === 'picas' ? 'Picas' : 'Inches'}</span>
            <span className="text-sm font-bold text-dark">{r.unit === 'px' ? Math.round(r.value) : r.value.toFixed(4)} {r.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 4. PAPER SIZE REFERENCE
// ============================================================
function PaperSizeReference() {
  const sizes = [
    { name: 'A0', mmW: 841, mmH: 1189 },
    { name: 'A1', mmW: 594, mmH: 841 },
    { name: 'A2', mmW: 420, mmH: 594 },
    { name: 'A3', mmW: 297, mmH: 420 },
    { name: 'A4', mmW: 210, mmH: 297 },
    { name: 'A5', mmW: 148, mmH: 210 },
    { name: 'A6', mmW: 105, mmH: 148 },
    { name: 'A7', mmW: 74, mmH: 105 },
    { name: 'B0', mmW: 1000, mmH: 1414 },
    { name: 'B1', mmW: 707, mmH: 1000 },
    { name: 'B2', mmW: 500, mmH: 707 },
    { name: 'B3', mmW: 353, mmH: 500 },
    { name: 'B4', mmW: 250, mmH: 353 },
    { name: 'B5', mmW: 176, mmH: 250 },
    { name: 'Letter', mmW: 216, mmH: 279 },
    { name: 'Legal', mmW: 216, mmH: 356 },
    { name: 'Tabloid', mmW: 279, mmH: 432 },
    { name: 'Executive', mmW: 184, mmH: 267 },
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400">Size</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400">mm</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400">inches</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400">px @300dpi</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((s) => (
              <tr key={s.name} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-bold text-dark">{s.name}</td>
                <td className="py-3 px-4 text-right text-muted">{s.mmW} x {s.mmH}</td>
                <td className="py-3 px-4 text-right text-muted">{(s.mmW / 25.4).toFixed(2)} x {(s.mmH / 25.4).toFixed(2)}</td>
                <td className="py-3 px-4 text-right text-muted">{Math.round((s.mmW / 25.4) * 300)} x {Math.round((s.mmH / 25.4) * 300)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// 5. COLOR CONVERTER
// ============================================================
function ColorConverter() {
  const [hex, setHex] = useState('#0B57D0');
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const [customInput, setCustomInput] = useState('#0B57D0');

  const handleCustomInput = (val: string) => {
    setCustomInput(val);
    const parsed = parseColorInput(val);
    if (parsed) setHex(rgbToHex(parsed.r, parsed.g, parsed.b));
  };

  const pantoneApprox: { name: string; hex: string }[] = [
    { name: 'PANTONE 286 C', hex: '#0032A0' }, { name: 'PANTONE 072 C', hex: '#10069F' },
    { name: 'PANTONE Process Blue C', hex: '#0085CA' }, { name: 'PANTONE 2935 C', hex: '#003DA5' },
    { name: 'PANTONE 2945 C', hex: '#002D5F' }, { name: 'PANTONE 300 C', hex: '#005EB8' },
    { name: 'PANTONE 071 C', hex: '#1B365D' }, { name: 'PANTONE 281 C', hex: '#00205B' },
    { name: 'PANTONE 288 C', hex: '#003087' }, { name: 'PANTONE 289 C', hex: '#0C2340' },
  ];

  const closestPantone = pantoneApprox.reduce<{ name: string; hex: string; dist: number }>((best, p) => {
    const pr = hexToRgb(p.hex);
    const dist = Math.sqrt((rgb.r - pr.r) ** 2 + (rgb.g - pr.g) ** 2 + (rgb.b - pr.b) ** 2);
    return dist < best.dist ? { ...p, dist } : best;
  }, { name: '', hex: '', dist: Infinity });

  const copyToClipboard = (text: string) => navigator.clipboard?.writeText(text);

  return (
    <div className="space-y-5">
      <div className="flex gap-3 items-end">
        <div className="w-16 h-16 rounded-xl border-2 border-slate-200 shrink-0" style={{ backgroundColor: hex }} />
        <div className="flex-1">
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Enter any color value</label>
          <input type="text" value={customInput} onChange={(e) => handleCustomInput(e.target.value)} placeholder="#FF0000 or rgb(255,0,0)" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
        <input type="color" value={hex} onChange={(e) => { setHex(e.target.value.toUpperCase()); setCustomInput(e.target.value.toUpperCase()); }} className="w-12 h-12 rounded-lg cursor-pointer border-0" />
      </div>
      <div className="space-y-2">
        {[
          { label: 'HEX', value: hex },
          { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
          { label: 'CMYK', value: `C:${cmyk.c} M:${cmyk.m} Y:${cmyk.y} K:${cmyk.k}` },
          { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
              <p className="text-sm font-medium text-dark">{item.value}</p>
            </div>
            <button onClick={() => copyToClipboard(item.value)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><Copy className="w-3.5 h-3.5 text-slate-400" /></button>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpenCheck className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-dark">Closest Pantone Match</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border border-slate-200" style={{ backgroundColor: closestPantone.hex }} />
          <div>
            <p className="text-sm font-bold text-dark">{closestPantone.name}</p>
            <p className="text-[10px] text-muted">{closestPantone.hex}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 6. RICH BLACK CALCULATOR
// ============================================================
function RichBlackCalculator() {
  const [c, setC] = useState(60);
  const [m, setM] = useState(40);
  const [y, setY] = useState(40);
  const [k, setK] = useState(100);

  const total = getInkPercent(c, m, y, k);
  const rgb = cmykToRgb(c, m, y, k);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  const presets = [
    { name: 'Standard Rich Black', c: 60, m: 40, y: 40, k: 100 },
    { name: 'Cool Rich Black', c: 40, m: 30, y: 30, k: 100 },
    { name: 'Warm Rich Black', c: 30, m: 50, y: 50, k: 100 },
    { name: 'Deep Rich Black', c: 70, m: 50, y: 50, k: 100 },
    { name: 'Pure K=100 (Avoid)', c: 0, m: 0, y: 0, k: 100 },
  ];

  return (
    <div className="space-y-5">
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800 flex gap-2">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        Pure black (K=100 only) looks washed out in print. Use rich black for large solid black areas. Total ink must be ≤300%.
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'C', val: c, set: setC, color: 'bg-cyan-500' },
          { label: 'M', val: m, set: setM, color: 'bg-pink-500' },
          { label: 'Y', val: y, set: setY, color: 'bg-yellow-400' },
          { label: 'K', val: k, set: setK, color: 'bg-slate-800' },
        ].map((ch) => (
          <div key={ch.label}>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">{ch.label} (%)</label>
            <input type="number" min={0} max={100} value={ch.val} onChange={(e) => ch.set(Math.min(100, Math.max(0, Number(e.target.value))))} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary text-center" />
            <input type="range" min={0} max={100} value={ch.val} onChange={(e) => ch.set(Number(e.target.value))} className="w-full accent-primary mt-1" />
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <div className="w-20 h-20 rounded-xl border-2 border-slate-200" style={{ backgroundColor: hex }} />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-bold text-dark">{hex}</p>
          <p className="text-xs text-muted">RGB({rgb.r}, {rgb.g}, {rgb.b})</p>
          <div className={`flex items-center gap-1 text-xs font-bold ${total > 300 ? 'text-red-600' : total > 250 ? 'text-yellow-600' : 'text-green-600'}`}>
            {total > 300 ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
            Total Ink: {total}% {total > 300 ? '(EXCEEDS LIMIT!)' : '(OK)'}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 block">Presets</label>
        {presets.map((p) => (
          <button key={p.name} onClick={() => { setC(p.c); setM(p.m); setY(p.y); setK(p.k); }} className="w-full flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary/50 transition-colors">
            {(() => { const rgb = cmykToRgb(p.c, p.m, p.y, p.k); return <div className="w-8 h-8 rounded-lg border border-slate-200 shrink-0" style={{ backgroundColor: rgbToHex(rgb.r, rgb.g, rgb.b) }} />; })()}
            <div className="text-left">
              <p className="text-xs font-bold text-dark">{p.name}</p>
              <p className="text-[10px] text-muted">C:{p.c} M:{p.m} Y:{p.y} K:{p.k} | {getInkPercent(p.c, p.m, p.y, p.k)}%</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 7. COLOR PALETTE GENERATOR
// ============================================================
function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#0B57D0');
  const [palettes, setPalettes] = useState<{ name: string; colors: string[] }[]>([]);

  const generate = () => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const h = hsl.h, s = hsl.s, l = hsl.l;

    const complementary = [baseColor, hslToHex((h + 180) % 360, s, l)];
    const analogous = [hslToHex((h - 30 + 360) % 360, s, l), baseColor, hslToHex((h + 30) % 360, s, l)];
    const triadic = [baseColor, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
    const splitComp = [baseColor, hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l)];
    const tetradic = [baseColor, hslToHex((h + 90) % 360, s, l), hslToHex((h + 180) % 360, s, l), hslToHex((h + 270) % 360, s, l)];
    const shades = Array.from({ length: 5 }, (_, i) => hslToHex(h, s, Math.max(10, Math.min(90, l - 30 + i * 15))));
    const tints = Array.from({ length: 5 }, (_, i) => hslToHex(h, Math.max(5, s - i * 15), Math.min(95, l + i * 12)));

    setPalettes([
      { name: 'Complementary', colors: complementary },
      { name: 'Analogous', colors: analogous },
      { name: 'Triadic', colors: triadic },
      { name: 'Split Complementary', colors: splitComp },
      { name: 'Tetradic', colors: tetradic },
      { name: 'Shades', colors: shades },
      { name: 'Tints', colors: tints },
    ]);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-14 h-14 rounded-xl cursor-pointer border-0" />
        <div className="flex-1">
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Base Color</label>
          <input type="text" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
      </div>
      <button onClick={generate} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors"><Sparkles className="w-4 h-4" /> Generate Palettes</button>
      {palettes.length > 0 && (
        <div className="space-y-4">
          {palettes.map((p) => (
            <div key={p.name}>
              <p className="text-xs font-bold text-dark mb-2">{p.name}</p>
              <div className="flex gap-2">
                {p.colors.map((c, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className="h-14 rounded-lg border border-slate-200 cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: c }} onClick={() => navigator.clipboard?.writeText(c)} />
                    <p className="text-[9px] text-slate-400 mt-1">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// 8. IMAGE COMPRESSION
// ============================================================
function ImageCompression() {
  const [original, setOriginal] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [compressedUrl, setCompressedUrl] = useState('');
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setOriginal(f);
    setOriginalUrl(URL.createObjectURL(f));
    setOriginalSize(f.size);
    setCompressedUrl('');
    setCompressedSize(0);
  };

  const compress = () => {
    if (!original) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          setCompressedUrl(URL.createObjectURL(blob));
          setCompressedSize(blob.size);
        }
      }, 'image/jpeg', quality / 100);
    };
    img.src = originalUrl;
  };

  const savings = originalSize > 0 && compressedSize > 0 ? parseFloat(((1 - compressedSize / originalSize) * 100).toFixed(1)) : 0;

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-5">
      <div onClick={() => ref.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">{original ? original.name : 'Click to upload image (JPG, PNG, WebP)'}</p>
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={loadImage} className="hidden" />
      {original && (
        <>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Quality: {quality}%</label>
            <input type="range" min={1} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div className="flex gap-4 text-xs">
            <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <p className="text-muted mb-1">Original</p>
              <p className="font-bold text-dark">{formatSize(originalSize)}</p>
            </div>
            <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <p className="text-muted mb-1">Compressed</p>
              <p className="font-bold text-dark">{compressedSize > 0 ? formatSize(compressedSize) : '—'}</p>
            </div>
            <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <p className="text-muted mb-1">Saved</p>
              <p className={`font-bold ${Number(savings) > 0 ? 'text-green-600' : 'text-slate-400'}`}>{savings > 0 ? `${savings}%` : '—'}</p>
            </div>
          </div>
          <button onClick={compress} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors"><Minimize2 className="w-4 h-4" /> Compress Image</button>
          {compressedUrl && (
            <a href={compressedUrl} download={`compressed-${original.name}`} className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" /> Download Compressed Image
            </a>
          )}
        </>
      )}
    </div>
  );
}

// ============================================================
// 9. WATERMARK TOOL
// ============================================================
function WatermarkTool() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('SAMPLE');
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(30);
  const [position, setPosition] = useState(4);
  const [rotation, setRotation] = useState(-30);
  const [color, setColor] = useState('#FFFFFF');
  const ref = useRef<HTMLInputElement>(null);

  const positions = ['Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'];

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setImageFile(f); setImageUrl(URL.createObjectURL(f)); }
  };

  const download = () => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      ctx.save();
      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = color;
      const scaledSize = fontSize * (img.width / 800);
      ctx.font = `bold ${scaledSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const px = (position % 3) * (img.width / 2);
      const py = Math.floor(position / 3) * (img.height / 2);
      ctx.translate(px, py);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.fillText(text, 0, 0);
      ctx.restore();
      const a = document.createElement('a');
      a.download = `watermarked-${imageFile?.name || 'image.png'}`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = imageUrl;
  };

  return (
    <div className="space-y-5">
      <div onClick={() => ref.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">{imageFile ? imageFile.name : 'Click to upload image'}</p>
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={loadImage} className="hidden" />
      {imageUrl && (
        <>
          <div className="relative rounded-xl overflow-hidden border border-slate-200">
            <img src={imageUrl} alt="Preview" className="w-full max-h-64 object-contain bg-slate-100" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Watermark Text</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Font Size: {fontSize}px</label>
              <input type="range" min={12} max={200} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Opacity: {opacity}%</label>
              <input type="range" min={1} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Rotation: {rotation}°</label>
              <input type="range" min={-180} max={180} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Color</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-2 block">Position</label>
            <div className="grid grid-cols-3 gap-2">
              {positions.map((p, i) => (
                <button key={p} onClick={() => setPosition(i)} className={`px-2 py-2 text-[10px] font-medium rounded-lg transition-colors ${position === i ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{p}</button>
              ))}
            </div>
          </div>
          <button onClick={download} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors"><Download className="w-4 h-4" /> Download Watermarked Image</button>
        </>
      )}
    </div>
  );
}

// ============================================================
// 10. BACKGROUND REMOVER
// ============================================================
function BackgroundRemover() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [threshold, setThreshold] = useState(240);
  const [tolerance, setTolerance] = useState(30);
  const ref = useRef<HTMLInputElement>(null);

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setImageUrl(URL.createObjectURL(f)); setImageName(f.name); }
  };

  const remove = () => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const brightness = (r + g + b) / 3;
        if (brightness >= threshold - tolerance && brightness <= threshold + tolerance) {
          data[i + 3] = 0;
        } else if (brightness >= threshold) {
          const dist = brightness - (threshold - tolerance);
          const maxDist = tolerance;
          data[i + 3] = Math.round((1 - dist / maxDist) * 255);
        }
      }
      ctx.putImageData(imageData, 0, 0);
      const a = document.createElement('a');
      a.download = `no-bg-${imageName || 'image.png'}`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = imageUrl;
  };

  return (
    <div className="space-y-5">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 flex gap-2">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        This tool works best on images with white or very light solid backgrounds. Results vary with complex backgrounds.
      </div>
      <div onClick={() => ref.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">{imageUrl ? imageName : 'Click to upload image'}</p>
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={loadImage} className="hidden" />
      {imageUrl && (
        <>
          <img src={imageUrl} alt="Preview" className="w-full rounded-xl border border-slate-200 max-h-48 object-contain" style={{ background: 'repeating-conic-gradient(#e2e8f0 0% 25%, white 0% 50%) 0 0 / 20px 20px' }} />
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Brightness Threshold: {threshold}</label>
            <input type="range" min={150} max={255} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Tolerance: {tolerance}</label>
            <input type="range" min={5} max={100} value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <button onClick={remove} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors"><Wand2 className="w-4 h-4" /> Remove Background & Download</button>
        </>
      )}
    </div>
  );
}

// ============================================================
// 11. IMAGE FORMAT CONVERTER
// ============================================================
function FormatConverter() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
  const [quality, setQuality] = useState(92);
  const ref = useRef<HTMLInputElement>(null);

  const formats = [
    { value: 'image/png', label: 'PNG', desc: 'Lossless, transparent' },
    { value: 'image/jpeg', label: 'JPEG', desc: 'Smaller size, lossy' },
    { value: 'image/webp', label: 'WebP', desc: 'Modern, best compression' },
  ] as const;

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setImageUrl(URL.createObjectURL(f)); setImageName(f.name); }
  };

  const convert = () => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const ext = format === 'image/png' ? 'png' : format === 'image/jpeg' ? 'jpg' : 'webp';
          const a = document.createElement('a');
          a.download = `${imageName.split('.')[0] || 'converted'}.${ext}`;
          a.href = URL.createObjectURL(blob);
          a.click();
          URL.revokeObjectURL(a.href);
        }
      }, format, format === 'image/png' ? undefined : quality / 100);
    };
    img.src = imageUrl;
  };

  return (
    <div className="space-y-5">
      <div onClick={() => ref.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">{imageName || 'Click to upload image (PNG, JPG, WebP)'}</p>
      </div>
      <input ref={ref} type="file" accept="image/png,image/jpeg,image/webp" onChange={loadImage} className="hidden" />
      {imageUrl && (
        <>
          <img src={imageUrl} alt="Preview" className="w-full rounded-xl border border-slate-200 max-h-48 object-contain" />
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-2 block">Output Format</label>
            <div className="grid grid-cols-3 gap-2">
              {formats.map((f) => (
                <button key={f.value} onClick={() => setFormat(f.value)} className={`p-3 rounded-xl border text-center transition-colors ${format === f.value ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'}`}>
                  <p className="text-sm font-bold text-dark">{f.label}</p>
                  <p className="text-[10px] text-muted">{f.desc}</p>
                </button>
              ))}
            </div>
          </div>
          {format !== 'image/png' && (
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Quality: {quality}%</label>
              <input type="range" min={1} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-primary" />
            </div>
          )}
          <button onClick={convert} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors"><FileDown className="w-4 h-4" /> Convert & Download</button>
        </>
      )}
    </div>
  );
}

// ============================================================
// 12. SVG TO PNG
// ============================================================
function SVGtoPNG() {
  const [svgContent, setSvgContent] = useState('');
  const [svgPreview, setSvgPreview] = useState('');
  const [dpi, setDpi] = useState(300);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const ref = useRef<HTMLInputElement>(null);

  const loadSvg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      setSvgContent(content);
      setSvgPreview(URL.createObjectURL(new Blob([content], { type: 'image/svg+xml' })));
    };
    reader.readAsText(f);
  };

  const convert = () => {
    if (!svgContent) return;
    const scaleFactor = dpi / 96;
    const canvasW = Math.round(width * scaleFactor);
    const canvasH = Math.round(height * scaleFactor);
    const canvas = document.createElement('canvas');
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvasW, canvasH);
      const a = document.createElement('a');
      a.download = `svg-${dpi}dpi-${canvasW}x${canvasH}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = svgPreview;
  };

  return (
    <div className="space-y-5">
      <div onClick={() => ref.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">{svgContent ? 'SVG loaded' : 'Click to upload SVG file'}</p>
      </div>
      <input ref={ref} type="file" accept=".svg,image/svg+xml" onChange={loadSvg} className="hidden" />
      {svgContent && (
        <>
          <div className="border border-slate-200 rounded-xl p-4 bg-white flex items-center justify-center" style={{ background: 'repeating-conic-gradient(#e2e8f0 0% 25%, white 0% 50%) 0 0 / 20px 20px' }}>
            <img src={svgPreview} alt="SVG Preview" className="max-w-full max-h-48 object-contain" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Width (px)</label>
              <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Height (px)</label>
              <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1 block">Output DPI: {dpi}</label>
            <input type="range" min={72} max={600} step={1} value={dpi} onChange={(e) => setDpi(Number(e.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1"><span>72 (Screen)</span><span>150 (Draft)</span><span>300 (Print)</span><span>600 (High quality)</span></div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-muted">
            Output: {Math.round(width * (dpi / 96))} x {Math.round(height * (dpi / 96))} px at {dpi} DPI
          </div>
          <button onClick={convert} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors"><Grid2x2 className="w-4 h-4" /> Convert & Download PNG</button>
        </>
      )}
    </div>
  );
}

// ============================================================
// 13. BARCODE GENERATOR
// ============================================================
function BarcodeGenerator() {
  const [data, setData] = useState('1234567890');
  const [format, setFormat] = useState('code128');
  const [showText, setShowText] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formats = [
    { id: 'code128', name: 'Code 128', desc: 'All ASCII characters' },
    { id: 'code39', name: 'Code 39', desc: 'Uppercase + digits' },
    { id: 'ean13', name: 'EAN-13', desc: '12 digits + check' },
    { id: 'upca', name: 'UPC-A', desc: '11 digits + check' },
  ];

  const drawBarcode = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000000';
    const barData = getBarcodeBars(data, format);
    if (!barData.length) return;

    const barWidth = Math.max(1, Math.floor((canvas.width - 40) / barData.length));
    const startX = 20;
    const barHeight = 80;
    const startY = 10;

    let x = startX;
    for (let i = 0; i < barData.length; i++) {
      if (barData[i]) {
        ctx.fillRect(x, startY, barWidth, barHeight);
      }
      x += barWidth;
    }

    if (showText) {
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(data, canvas.width / 2, startY + barHeight + 20);
    }
  }, [data, format, showText]);

  const getBarcodeBars = (text: string, fmt: string): boolean[] => {
    const bars: boolean[] = [];
    if (fmt === 'code128') {
      bars.push(true, false, true);
      for (let i = 0; i < Math.min(text.length, 20); i++) {
        const code = text.charCodeAt(i) % 7;
        for (let b = 0; b < 6; b++) bars.push(((code >> b) & 1) === 1);
        bars.push(true, false);
      }
      bars.push(true, false, true, true, false, true);
    } else if (fmt === 'code39') {
      bars.push(true, false, false, false, true, false, true, false, false);
      const chars = text.toUpperCase().substring(0, 15);
      for (const ch of chars) {
        const code = ch.charCodeAt(0) % 9;
        for (let b = 0; b < 5; b++) { bars.push(((code >> b) & 1) === 1); bars.push(false); }
        bars.push(true, false);
      }
      bars.push(true, false, false, false, true, false, true, false, false);
    } else if (fmt === 'ean13') {
      const digits = text.replace(/\D/g, '').substring(0, 12).padEnd(12, '0');
      bars.push(true, false, true);
      for (let i = 0; i < 12; i++) {
        const d = parseInt(digits[i]) || 0;
        for (let b = 0; b < 4; b++) bars.push(((d >> b) & 1) === 1);
        bars.push(false, true);
      }
      bars.push(true, false, true);
    } else if (fmt === 'upca') {
      const digits = text.replace(/\D/g, '').substring(0, 11).padEnd(11, '0');
      bars.push(true, false, true);
      for (let i = 0; i < 11; i++) {
        const d = parseInt(digits[i]) || 0;
        for (let b = 0; b < 3; b++) bars.push(((d >> b) & 1) === 1);
        bars.push(true, false);
      }
      bars.push(true, false, true);
    }
    return bars;
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawBarcode();
    const a = document.createElement('a');
    a.download = `barcode-${data}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-2 block">Barcode Format</label>
        <div className="grid grid-cols-2 gap-2">
          {formats.map((f) => (
            <button key={f.id} onClick={() => setFormat(f.id)} className={`p-3 rounded-xl border text-left transition-colors ${format === f.id ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'}`}>
              <p className="text-xs font-bold text-dark">{f.name}</p>
              <p className="text-[10px] text-muted">{f.desc}</p>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">Data / Content</label>
        <input type="text" value={data} onChange={(e) => setData(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" placeholder="Enter barcode data..." />
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
        <input type="checkbox" checked={showText} onChange={(e) => setShowText(e.target.checked)} className="accent-primary" />
        Show text below barcode
      </label>
      <div className="flex justify-center bg-white border border-slate-200 rounded-xl p-4">
        <canvas ref={canvasRef} width={400} height={120} className="max-w-full" />
      </div>
      <button onClick={() => { drawBarcode(); setTimeout(download, 100); }} disabled={!data.trim()} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark disabled:opacity-50 transition-colors"><Hash className="w-4 h-4" /> Generate & Download Barcode</button>
    </div>
  );
}

// ============================================================
// 14. PLACEHOLDER TEXT GENERATOR
// ============================================================
function PlaceholderTextGenerator() {
  const [mode, setMode] = useState<'paragraphs' | 'words' | 'characters'>('paragraphs');
  const [count, setCount] = useState(3);
  const [generated, setGenerated] = useState('');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
    'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
    'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
    'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
  ];

  const generateWord = () => loremWords[Math.floor(Math.random() * loremWords.length)];
  const generateSentence = () => {
    const len = 8 + Math.floor(Math.random() * 12);
    const words = Array.from({ length: len }, generateWord);
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };
  const generateParagraph = () => Array.from({ length: 4 + Math.floor(Math.random() * 4) }, generateSentence).join(' ');

  const generate = () => {
    if (mode === 'paragraphs') {
      setGenerated(Array.from({ length: count }, generateParagraph).join('\n\n'));
    } else if (mode === 'words') {
      setGenerated(Array.from({ length: count }, generateWord).join(' '));
    } else {
      let text = '';
      while (text.length < count) text += generateWord() + ' ';
      setGenerated(text.substring(0, count));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(['paragraphs', 'words', 'characters'] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 text-xs font-bold rounded-lg capitalize transition-colors ${mode === m ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>{m}</button>
        ))}
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">Number of {mode}</label>
        <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
      </div>
      <button onClick={generate} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors"><Type className="w-4 h-4" /> Generate Text</button>
      {generated && (
        <div className="space-y-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-64 overflow-y-auto">
            <p className="text-sm text-dark whitespace-pre-wrap leading-relaxed">{generated}</p>
          </div>
          <button onClick={() => navigator.clipboard?.writeText(generated)} className="w-full flex items-center justify-center gap-2 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors"><Copy className="w-3.5 h-3.5" /> Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 15. BUSINESS CARD SIZES
// ============================================================
function BusinessCardSizes() {
  const [dpi] = useState(300);
  const sizes = [
    { region: 'United States / Canada', w: 88.9, h: 50.8, note: '3.5 x 2 inches' },
    { region: 'Europe / ISO 7810', w: 85.6, h: 53.98, note: 'ID-1 standard' },
    { region: 'United Kingdom', w: 85, h: 55, note: 'Most common' },
    { region: 'India', w: 88.9, h: 50.8, note: 'Same as US' },
    { region: 'Japan', w: 91, h: 55, note: 'Standard Japanese' },
    { region: 'China', w: 90, h: 54, note: 'Standard Chinese' },
    { region: 'Australia / NZ', w: 90, h: 55, note: 'Common size' },
    { region: 'France / Germany', w: 85, h: 55, note: 'ISO standard' },
    { region: 'Square (Modern)', w: 65, h: 65, note: 'Trendy option' },
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Region</th>
              <th className="text-right py-3 px-3 text-xs font-semibold text-slate-400">mm</th>
              <th className="text-right py-3 px-3 text-xs font-semibold text-slate-400">inches</th>
              <th className="text-right py-3 px-3 text-xs font-semibold text-slate-400">px @{dpi}</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((s) => (
              <tr key={s.region} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3">
                  <p className="font-bold text-dark text-xs">{s.region}</p>
                  <p className="text-[10px] text-muted">{s.note}</p>
                </td>
                <td className="py-3 px-3 text-right text-xs text-muted">{s.w} x {s.h}</td>
                <td className="py-3 px-3 text-right text-xs text-muted">{(s.w / 25.4).toFixed(2)} x {(s.h / 25.4).toFixed(2)}</td>
                <td className="py-3 px-3 text-right text-xs text-muted">{Math.round((s.w / 25.4) * dpi)} x {Math.round((s.h / 25.4) * dpi)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-xs text-muted">
          <strong className="text-dark">Note:</strong> All pixel dimensions calculated at {dpi} DPI. Include 3mm bleed on each side for print production. Safe zone is typically 5mm from trim edge.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// 16. PRINT PRICE ESTIMATOR
// ============================================================
function PrintPriceEstimator() {
  const [product, setProduct] = useState('flyer');
  const [quantity, setQuantity] = useState(500);
  const [size, setSize] = useState('A4');
  const [paper, setPaper] = useState('170gsm');
  const [finish, setFinish] = useState('matte-lamination');

  const products: Record<string, { base: number; perUnit: Record<string, number>; sizes: string[]; papers: string[]; finishes: string[] }> = {
    flyer: { base: 500, perUnit: { '500': 2.5, '1000': 2, '2000': 1.5, '5000': 1, '10000': 0.7 }, sizes: ['DL', 'A5', 'A4', 'A3'], papers: ['130gsm', '170gsm', '250gsm', '300gsm'], finishes: ['none', 'matte-lamination', 'gloss-lamination', 'spot-uv'] },
    brochure: { base: 1500, perUnit: { '100': 15, '250': 10, '500': 7, '1000': 5, '5000': 3 }, sizes: ['A4', 'A3'], papers: ['170gsm', '250gsm', '300gsm'], finishes: ['none', 'matte-lamination', 'gloss-lamination'] },
    businessCard: { base: 300, perUnit: { '100': 5, '250': 3, '500': 2, '1000': 1.2, '5000': 0.5 }, sizes: ['Standard', 'Square'], papers: ['300gsm', '350gsm', '400gsm'], finishes: ['none', 'matte-lamination', 'gloss-lamination', 'spot-uv', 'foil'] },
    poster: { base: 800, perUnit: { '10': 50, '25': 30, '50': 20, '100': 12, '500': 6 }, sizes: ['A3', 'A2', 'A1', 'A0'], papers: ['170gsm', '250gsm', '300gsm'], finishes: ['none', 'matte-lamination', 'gloss-lamination'] },
    sticker: { base: 400, perUnit: { '100': 4, '250': 2.5, '500': 1.5, '1000': 1, '5000': 0.4 }, sizes: ['50x50mm', '75x75mm', '100x100mm', 'Custom'], papers: ['Vinyl', 'Paper', 'Transparent'], finishes: ['matte', 'gloss'] },
    invitation: { base: 600, perUnit: { '50': 12, '100': 8, '250': 5, '500': 3.5, '1000': 2.5 }, sizes: ['5x7 inches', 'A5', 'Custom'], papers: ['250gsm', '300gsm', '350gsm', 'Cotton'], finishes: ['none', 'matte-lamination', 'foil', 'embossing'] },
  };

  const productData = products[product] || products.flyer;
  const qtyKey = Object.keys(productData.perUnit).reduce((prev, curr) =>
    Math.abs(parseInt(curr) - quantity) < Math.abs(parseInt(prev) - quantity) ? curr : prev
  );
  const unitPrice = productData.perUnit[qtyKey] || 1;
  const multiplier = size === 'A3' || size === 'A2' || size === 'A1' || size === 'A0' ? (size === 'A0' ? 4 : size === 'A1' ? 3 : size === 'A2' ? 2 : 1.5) : 1;
  const paperMultiplier = paper === '300gsm' || paper === '350gsm' || paper === '400gsm' ? 1.2 : paper === 'Cotton' ? 1.8 : 1;
  const finishMultiplier = finish === 'gloss-lamination' ? 1.3 : finish === 'matte-lamination' ? 1.3 : finish === 'spot-uv' ? 1.6 : finish === 'foil' ? 1.8 : finish === 'embossing' ? 1.7 : 1;

  const totalPrice = Math.round(productData.base + unitPrice * quantity * multiplier * paperMultiplier * finishMultiplier);
  const minPrice = Math.round(totalPrice * 0.7);
  const maxPrice = Math.round(totalPrice * 1.3);

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-2 block">Product Type</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(products).map((p) => (
            <button key={p} onClick={() => setProduct(p)} className={`px-3 py-2 text-xs font-medium rounded-lg capitalize transition-colors ${product === p ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{p.replace(/([A-Z])/g, ' $1')}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
            {productData.sizes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Quantity</label>
          <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
            {[50, 100, 250, 500, 1000, 2000, 5000, 10000].map((q) => <option key={q} value={q}>{q.toLocaleString()}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Paper Stock</label>
          <select value={paper} onChange={(e) => setPaper(e.target.value)} className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
            {productData.papers.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Finish</label>
          <select value={finish} onChange={(e) => setFinish(e.target.value)} className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
            {productData.finishes.map((f) => <option key={f} value={f}>{f.replace(/-/g, ' ')}</option>)}
          </select>
        </div>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center space-y-2">
        <p className="text-xs text-muted uppercase tracking-wider font-semibold">Estimated Price Range</p>
        <p className="text-3xl font-bold text-dark">₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}</p>
        <p className="text-xs text-muted">For {quantity.toLocaleString()} units • Price varies by vendor and location</p>
      </div>
      <p className="text-[10px] text-slate-400 text-center">This is an estimate only. Actual prices depend on vendor, location, design complexity, and current material costs.</p>
    </div>
  );
}

// ============================================================
// 17. GANG SHEET CALCULATOR
// ============================================================
function GangSheetCalculator() {
  const [sheetW, setSheetW] = useState(320);
  const [sheetH, setSheetH] = useState(450);
  const [itemW, setItemW] = useState(85);
  const [itemH, setItemH] = useState(55);
  const [allowRotation, setAllowRotation] = useState(true);
  const [sheetName, setSheetName] = useState('SRA3');

  const presets = [
    { name: 'SRA3', w: 320, h: 450 },
    { name: 'A3', w: 297, h: 420 },
    { name: 'A2', w: 420, h: 594 },
    { name: 'B1', w: 707, h: 1000 },
    { name: 'Custom', w: 0, h: 0 },
  ];

  const fitWithoutRotation = () => {
    const cols = Math.floor(sheetW / itemW);
    const rows = Math.floor(sheetH / itemH);
    return cols * rows;
  };

  const fitWithRotation = () => {
    const normalCols = Math.floor(sheetW / itemW);
    const normalRows = Math.floor(sheetH / itemH);
    const normalTotal = normalCols * normalRows;

    const rotCols = Math.floor(sheetW / itemH);
    const rotRows = Math.floor(sheetH / itemW);
    const rotTotal = rotCols * rotRows;

    if (rotTotal > normalTotal) {
      return { count: rotTotal, rotated: true, cols: rotCols, rows: rotRows };
    }
    return { count: normalTotal, rotated: false, cols: normalCols, rows: normalRows };
  };

  const result = fitWithRotation();
  const noRotCount = fitWithoutRotation();
  const wastePercent = ((1 - (result.count * itemW * itemH) / (sheetW * sheetH)) * 100).toFixed(1);

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-2 block">Sheet Presets</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.name} onClick={() => { if (p.w > 0) { setSheetW(p.w); setSheetH(p.h); setSheetName(p.name); } }} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${sheetName === p.name ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{p.name}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Sheet Width (mm)</label>
          <input type="number" value={sheetW} onChange={(e) => { setSheetW(Number(e.target.value)); setSheetName('Custom'); }} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Sheet Height (mm)</label>
          <input type="number" value={sheetH} onChange={(e) => { setSheetH(Number(e.target.value)); setSheetName('Custom'); }} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Item Width (mm)</label>
          <input type="number" value={itemW} onChange={(e) => setItemW(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">Item Height (mm)</label>
          <input type="number" value={itemH} onChange={(e) => setItemH(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
        <input type="checkbox" checked={allowRotation} onChange={(e) => setAllowRotation(e.target.checked)} className="accent-primary" />
        Allow item rotation for better fit
      </label>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted">Items per Sheet</span>
          <span className="text-2xl font-bold text-primary">{result.count}</span>
        </div>
        <div className="flex justify-between"><span className="text-sm text-muted">Sheet Size</span><span className="text-sm font-bold text-dark">{sheetW} x {sheetH} mm</span></div>
        <div className="flex justify-between"><span className="text-sm text-muted">Item Size</span><span className="text-sm font-bold text-dark">{itemW} x {itemH} mm</span></div>
        {allowRotation && result.rotated && <p className="text-xs text-primary font-medium">Items rotated for optimal fit</p>}
        <div className="flex justify-between"><span className="text-sm text-muted">Waste</span><span className="text-sm font-bold text-dark">{wastePercent}%</span></div>
      </div>
      {sheetW > 0 && sheetH > 0 && itemW > 0 && itemH > 0 && (
        <div className="border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-400 mb-2">Visual Layout ({result.cols} x {result.rows})</p>
          <div className="relative border border-dashed border-slate-300 bg-slate-50 rounded-lg" style={{ width: '100%', aspectRatio: `${sheetW}/${sheetH}` }}>
            {Array.from({ length: Math.min(result.count, 50) }).map((_, i) => {
              const col = i % result.cols;
              const row = Math.floor(i / result.cols);
              const itemAspect = result.rotated ? itemH / itemW : itemW / itemH;
              const sheetAspect = sheetW / sheetH;
              const cellW = (1 / result.cols) * 100;
              const cellH = (1 / result.rows) * 100;
              return (
                <div key={i} className="absolute border border-primary/30 bg-primary/10 rounded-sm" style={{
                  left: `${col * cellW}%`, top: `${row * cellH}%`,
                  width: `${cellW - 0.5}%`, height: `${cellH - 0.5}%`,
                }} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 18. FONT PAIRING GUIDE
// ============================================================
function FontPairingGuide() {
  const [category, setCategory] = useState('modern');
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');

  const pairings: Record<string, { name: string; heading: string; body: string; description: string }[]> = {
    modern: [
      { name: 'Clean & Minimal', heading: 'Inter', body: 'Inter', description: 'Highly readable sans-serif pair. Perfect for tech and corporate brands.' },
      { name: 'Geometric Duo', heading: 'Space Grotesk', body: 'DM Sans', description: 'Geometric heading with friendly body text. Great for startups.' },
      { name: 'Elegant Modern', heading: 'Sora', body: 'Source Sans 3', description: 'Sophisticated heading with neutral body. Ideal for luxury brands.' },
      { name: 'Bold Statement', heading: 'Syne', body: 'Work Sans', description: 'Expressive heading with clean body. Perfect for creative studios.' },
    ],
    classic: [
      { name: 'Traditional Elegance', heading: 'Playfair Display', body: 'Lato', description: 'High contrast serif with warm sans-serif. Timeless combination.' },
      { name: 'Editorial', heading: 'Merriweather', body: 'Open Sans', description: 'Sturdy serif with friendly sans-serif. Great for publications.' },
      { name: 'Refined', heading: 'Libre Caslon Text', body: 'Raleway', description: 'Classic serif with elegant sans. Perfect for wedding invitations.' },
      { name: 'Literary', heading: 'Newsreader', body: 'Nunito Sans', description: 'Traditional newspaper feel with modern body. Ideal for books.' },
    ],
    creative: [
      { name: 'Artistic', heading: 'Bricolage Grotesque', body: 'Karla', description: 'Quirky heading with friendly body. Great for art and design.' },
      { name: 'Playful', heading: 'Comfortaa', body: 'Fira Sans', description: 'Rounded heading with technical body. Perfect for gaming brands.' },
      { name: 'Experimental', heading: 'Climate Crisis', body: 'Inter', description: 'Variable display font with neutral body. Statement piece.' },
      { name: 'Retro Modern', heading: 'Outfit', body: 'Work Sans', description: 'Geometric display with clean body. Trendy yet readable.' },
    ],
    corporate: [
      { name: 'Professional', heading: 'IBM Plex Sans', body: 'IBM Plex Serif', description: 'Enterprise-grade type system. Conveys trust and reliability.' },
      { name: 'Tech Corporate', heading: 'Google Sans', body: 'Google Sans Text', description: 'Clean and modern. Perfect for technology companies.' },
      { name: 'Financial', heading: 'Public Sans', body: 'Source Serif 4', description: 'Neutral heading with professional body. Ideal for banking.' },
      { name: 'Enterprise', heading: 'Lexend', body: 'Noto Sans', description: 'Optimized for readability. Great for dashboards and reports.' },
    ],
  };

  const categories = [
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'creative', name: 'Creative' },
    { id: 'corporate', name: 'Corporate' },
  ];

  const currentPairings = pairings[category] || pairings.modern;

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-2 block">Preview Text</label>
        <input type="text" value={previewText} onChange={(e) => setPreviewText(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary" />
      </div>
      <div className="flex gap-2">
        {categories.map((c) => (
          <button key={c.id} onClick={() => setCategory(c.id)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${category === c.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>{c.name}</button>
        ))}
      </div>
      <div className="space-y-4">
        {currentPairings.map((pair) => (
          <div key={pair.name} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-primary">{pair.name}</p>
              <p className="text-[10px] text-muted">{pair.heading} + {pair.body}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p style={{ fontFamily: pair.heading }} className="text-2xl font-bold text-dark mb-2">{previewText}</p>
              <p style={{ fontFamily: pair.body }} className="text-sm text-muted leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <p className="text-[10px] text-muted">{pair.description}</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] text-dark">Heading: {pair.heading}</span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] text-dark">Body: {pair.body}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function UtilitiesPage() {
  const [active, setActive] = useState('dpi');

  const components: Record<string, React.ReactNode> = {
    dpi: <DPICalculator />,
    bleed: <BleedCalculator />,
    units: <UnitConverter />,
    papersize: <PaperSizeReference />,
    preflight: <PreflightChecker />,
    cmyksim: <CMYKSimulator />,
    trap: <TrapWidthCalculator />,
    spotuv: <SpotUVGenerator />,
    diecut: <DieCutTemplateGenerator />,
    colorconvert: <ColorConverter />,
    richblack: <RichBlackCalculator />,
    palette: <PaletteGenerator />,
    colorblind: <ColorBlindSimulator />,
    contrast: <ContrastChecker />,
    icc: <ICCProfileComparison />,
    safefont: <SafeFontList />,
    colormix: <ColorMixCalculator />,
    compress: <ImageCompression />,
    watermark: <WatermarkTool />,
    bgremove: <BackgroundRemover />,
    formatconvert: <FormatConverter />,
    svgtopng: <SVGtoPNG />,
    upscaler: <ImageDPIScaler />,
    stencil: <StencilGenerator />,
    bleedpreview: <BleedPreviewOverlay />,
    barcode: <BarcodeGenerator />,
    lorem: <PlaceholderTextGenerator />,
    bizcard: <BusinessCardSizes />,
    proofing: <FileProofingTool />,
    quantity: <PrintQuantityCalculator />,
    paperstock: <PaperStockComparison />,
    shipping: <ShippingCalculator />,
    timeline: <OrderTimelineEstimator />,
    brief: <DesignBriefGenerator />,
    priceest: <PrintPriceEstimator />,
    gangsheet: <GangSheetCalculator />,
    fontpair: <FontPairingGuide />,
    envelope: <EnvelopeSizeReference />,
    presref: <PrintResolutionReference />,
    substrate: <SubstrateWeightCalculator />,
    filenaming: <FileNamingGenerator />,
    impose: <MultiPageLayoutArranger />,
    impression: <ImpressionCalculator />,
    gcr: <GCRCalculator />,
    imposecalc: <ImpositionCalculator />,
  };

  const categories = [...new Set(tools.map((t) => t.category))];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <Container>
          <div className="py-6">
            <Link href="/" className="text-xs text-primary hover:underline mb-3 inline-block">← Back to Home</Link>
            <h1 className="text-2xl md:text-3xl font-bold text-dark font-heading">Print Utilities & Tools</h1>
            <p className="text-sm text-muted mt-1">45+ essential tools for designers & print professionals · <Link href="/utilities/mockups" className="text-primary hover:underline font-medium">Mockup Scene Generator →</Link></p>
          </div>
        </Container>
      </div>
      <Container>
        <div className="py-8 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-2 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              {categories.map((cat) => (
                <div key={cat} className="mb-2">
                  <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cat}</p>
                  {tools.filter((t) => t.category === cat).map((t) => (
                    <button key={t.id} onClick={() => setActive(t.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all ${active === t.id ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
                      <t.icon className="w-4 h-4 shrink-0" />
                      <div>
                        <div className="text-xs font-medium">{t.name}</div>
                        <div className={`text-[9px] ${active === t.id ? 'text-white/70' : 'text-slate-400'}`}>{t.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  {(() => { const t = tools.find((t) => t.id === active); return t ? <t.icon className="w-5 h-5 text-primary" /> : null; })()}
                  <h2 className="text-lg font-bold text-dark">{tools.find((t) => t.id === active)?.name}</h2>
                </div>
                <p className="text-sm text-muted">{tools.find((t) => t.id === active)?.description}</p>
              </div>
              {components[active]}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
