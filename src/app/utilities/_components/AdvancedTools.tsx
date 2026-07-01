'use client';
import { useState, useRef, useCallback } from 'react';
import {
  Calculator,
  Info,
  Upload,
  RotateCcw,
  Layers,
  Grid3X3,
  ArrowUpDown,
  AlertTriangle,
  CheckCircle,
  Droplets,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   Shared helpers
   ═══════════════════════════════════════════════════════ */

const INK_TYPES = [
  { id: 'cmyk', label: 'CMYK Process', costPerMl: 0.12 },
  { id: 'spot', label: 'Spot Color', costPerMl: 0.25 },
  { id: 'specialty', label: 'Specialty (Metallic/etc)', costPerMl: 0.45 },
];

const PAPER_SIZES = [
  { name: 'A4', w: 21, h: 29.7 },
  { name: 'A3', w: 29.7, h: 42 },
  { name: 'A2', w: 42, h: 59.4 },
  { name: 'A1', w: 59.4, h: 84.1 },
  { name: 'SRA3', w: 32, h: 45 },
  { name: 'SRA2', w: 45, h: 64 },
  { name: 'B1', w: 70.7, h: 100 },
  { name: 'B2', w: 50, h: 70.7 },
  { name: 'Custom', w: 0, h: 0 },
];

const SHEET_SIZES = [
  { name: 'SRA3', w: 320, h: 450 },
  { name: 'SRA2', w: 450, h: 640 },
  { name: 'B1', w: 707, h: 1000 },
  { name: 'B2', w: 500, h: 707 },
  { name: 'Custom', w: 0, h: 0 },
];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/* ═══════════════════════════════════════════════════════
   1. Impression Calculator
   ═══════════════════════════════════════════════════════ */

export function ImpressionCalculator() {
  const [printW, setPrintW] = useState(21);
  const [printH, setPrintH] = useState(29.7);
  const [paperSize, setPaperSize] = useState('A4');
  const [quantity, setQuantity] = useState(1000);
  const [inkCoverage, setInkCoverage] = useState(50);
  const [inkType, setInkType] = useState('cmyk');
  const [channelPct, setChannelPct] = useState({ c: 50, m: 40, y: 30, k: 20 });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [autoCoverage, setAutoCoverage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    const url = URL.createObjectURL(f);
    setImagePreview(url);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, img.width, img.height).data;

      let totalC = 0, totalM = 0, totalY = 0, totalK = 0;
      const pixels = data.length / 4;
      const step = Math.max(1, Math.floor(pixels / 10000));

      for (let i = 0; i < data.length; i += 4 * step) {
        const r = data[i] / 255;
        const g = data[i + 1] / 255;
        const b = data[i + 2] / 255;
        const k = 1 - Math.max(r, g, b);
        const c = (1 - r - k) / (1 - k) || 0;
        const m = (1 - g - k) / (1 - k) || 0;
        const y = (1 - b - k) / (1 - k) || 0;
        totalC += c;
        totalM += m;
        totalY += y;
        totalK += k;
      }

      const sampled = Math.floor(pixels / step);
      const avgC = (totalC / sampled) * 100;
      const avgM = (totalM / sampled) * 100;
      const avgY = (totalY / sampled) * 100;
      const avgK = (totalK / sampled) * 100;
      const avgAll = (avgC + avgM + avgY + avgK) / 4;

      setChannelPct({ c: Math.round(avgC), m: Math.round(avgM), y: Math.round(avgY), k: Math.round(avgK) });
      setInkCoverage(Math.round(avgAll));
      setAutoCoverage(true);
    };
    img.src = url;
  }, []);

  const resetImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setAutoCoverage(false);
    setChannelPct({ c: 50, m: 40, y: 30, k: 20 });
    setInkCoverage(50);
    if (fileRef.current) fileRef.current.value = '';
  }, []);

  const inkInfo = INK_TYPES.find((t) => t.id === inkType)!;
  const paperInfo = PAPER_SIZES.find((p) => p.name === paperSize) || PAPER_SIZES[0];
  const wCm = paperSize === 'Custom' ? printW : paperInfo.w;
  const hCm = paperSize === 'Custom' ? printH : paperInfo.h;

  const singleAreaM2 = (wCm * hCm) / 10000;
  const totalAreaM2 = singleAreaM2 * quantity;
  const inkAreaM2 = totalAreaM2 * (inkCoverage / 100);
  const inkConsumptionMl = inkAreaM2 * 100; // ~100 ml per m² at 100% coverage
  const totalCost = inkConsumptionMl * inkInfo.costPerMl;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Calculator className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Impression Calculator</h3>
          <p className="text-sm text-gray-500">Calculate total ink coverage and cost</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paper Size</label>
            <select
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              {PAPER_SIZES.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} {p.w ? `(${p.w} × ${p.h} cm)` : ''}
                </option>
              ))}
            </select>
          </div>

          {paperSize === 'Custom' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width (cm)</label>
                <input
                  type="number"
                  value={printW}
                  onChange={(e) => setPrintW(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  min={1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={printH}
                  onChange={(e) => setPrintH(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  min={1}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(clamp(Number(e.target.value), 1, 1000000))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              min={1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ink Type</label>
            <select
              value={inkType}
              onChange={(e) => setInkType(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              {INK_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label} — ${t.costPerMl.toFixed(2)}/ml
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Ink Coverage: {inkCoverage}%
                {autoCoverage && <span className="text-indigo-500 ml-1">(auto)</span>}
              </label>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              value={inkCoverage}
              onChange={(e) => {
                setInkCoverage(Number(e.target.value));
                setAutoCoverage(false);
              }}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>5%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Image Upload (optional)</span>
              {imageFile && (
                <button
                  onClick={resetImage}
                  className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 rounded-lg py-3 text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {imageFile ? imageFile.name : 'Upload image for auto-analysis'}
            </button>
            {imagePreview && (
              <div className="mt-2 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Channel breakdown */}
          <div className="border border-gray-200 rounded-lg p-3">
            <span className="text-sm font-medium text-gray-700 mb-2 block">Ink Channel Breakdown</span>
            {(['c', 'm', 'y', 'k'] as const).map((ch) => (
              <div key={ch} className="flex items-center gap-2 mb-1">
                <span className="w-4 text-xs font-bold" style={{ color: ch === 'c' ? '#00bcd4' : ch === 'm' ? '#e91e63' : ch === 'y' ? '#ffeb3b' : '#333' }}>
                  {ch.toUpperCase()}
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={channelPct[ch]}
                  onChange={(e) => setChannelPct({ ...channelPct, [ch]: Number(e.target.value) })}
                  className="flex-1 accent-current"
                />
                <span className="w-10 text-right text-xs text-gray-500">{channelPct[ch]}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-4">
          <div className="bg-indigo-50 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-indigo-900 mb-4">Results</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-700">Print Area per Unit</span>
                <span className="font-semibold text-indigo-900">{wCm} × {hCm} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-700">Single Area</span>
                <span className="font-semibold text-indigo-900">{singleAreaM2.toFixed(4)} m²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-700">Total Print Area</span>
                <span className="font-semibold text-indigo-900">{totalAreaM2.toFixed(2)} m²</span>
              </div>
              <div className="h-px bg-indigo-200" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-700">Ink Coverage Area</span>
                <span className="font-semibold text-indigo-900">{inkAreaM2.toFixed(2)} m²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-700">Est. Ink Consumption</span>
                <span className="font-semibold text-indigo-900">{inkConsumptionMl.toFixed(0)} ml</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Cost Breakdown</h4>
            <div className="space-y-3">
              {inkType === 'cmyk' && (
                <>
                  {(['c', 'm', 'y', 'k'] as const).map((ch) => {
                    const chMl = inkConsumptionMl * (channelPct[ch] / inkCoverage);
                    const chCost = chMl * inkInfo.costPerMl;
                    const colors: Record<string, string> = { c: '#00bcd4', m: '#e91e63', y: '#ffeb3b', k: '#333' };
                    return (
                      <div key={ch} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded" style={{ backgroundColor: colors[ch] }} />
                        <span className="text-sm text-gray-600 flex-1">{ch.toUpperCase()} Channel</span>
                        <span className="text-xs text-gray-400">{chMl.toFixed(0)} ml</span>
                        <span className="text-sm font-medium text-gray-900 w-16 text-right">${chCost.toFixed(2)}</span>
                      </div>
                    );
                  })}
                  <div className="h-px bg-gray-200" />
                </>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">Total Ink Cost</span>
                <span className="text-lg font-bold text-indigo-600">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Cost per Impression</span>
                <span>${(totalCost / quantity).toFixed(4)}</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800">
              Estimates are based on typical ink consumption of 100 ml/m² at 100% coverage. Actual usage varies by substrate, ink density, and printing method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. GCR / UCR Calculator
   ═══════════════════════════════════════════════════════ */

type GCRStrength = 'light' | 'medium' | 'heavy' | 'max';

const GCR_PROFILES: Record<GCRStrength, { label: string; factor: number; desc: string }> = {
  light: { label: 'Light GCR', factor: 0.3, desc: 'Subtle gray replacement, minimal color shift. Good for proofing.' },
  medium: { label: 'Medium GCR', factor: 0.55, desc: 'Balanced replacement. Standard for sheetfed offset.' },
  heavy: { label: 'Heavy GCR', factor: 0.8, desc: 'Aggressive replacement. Reduces ink load significantly.' },
  max: { label: 'Maximum GCR', factor: 1.0, desc: 'Full gray component replaced by K. Used in newspaper printing.' },
};

type PrintMethod = 'sheetfed' | 'web' | 'newsprint' | 'digital';

const PRINT_METHODS: Record<PrintMethod, { label: string; recGCR: GCRStrength; recUCR: number }> = {
  sheetfed: { label: 'Sheetfed Offset', recGCR: 'medium', recUCR: 25 },
  web: { label: 'Web Offset', recGCR: 'heavy', recUCR: 35 },
  newsprint: { label: 'Newspaper', recGCR: 'max', recUCR: 40 },
  digital: { label: 'Digital Print', recGCR: 'light', recUCR: 15 },
};

function applyGCR(c: number, m: number, y: number, k: number, factor: number) {
  const grayMin = Math.min(c, m, y);
  const grayReplace = grayMin * factor;
  return {
    c: clamp(c - grayReplace, 0, 100),
    m: clamp(m - grayReplace, 0, 100),
    y: clamp(y - grayReplace, 0, 100),
    k: clamp(k + grayReplace, 0, 100),
  };
}

function applyUCR(c: number, m: number, y: number, k: number, amount: number) {
  const grayMin = Math.min(c, m, y);
  const ucrReplace = Math.min(grayMin, amount);
  return {
    c: clamp(c - ucrReplace, 0, 100),
    m: clamp(m - ucrReplace, 0, 100),
    y: clamp(y - ucrReplace, 0, 100),
    k: clamp(k + ucrReplace * 0.5, 0, 100),
  };
}

function totalInk(c: number, m: number, y: number, k: number) {
  return c + m + y + k;
}

export function GCRCalculator() {
  const [c, setC] = useState(40);
  const [m, setM] = useState(30);
  const [y, setY] = useState(20);
  const [k, setK] = useState(10);
  const [gcrStrength, setGcrStrength] = useState<GCRStrength>('medium');
  const [ucrAmount, setUcrAmount] = useState(25);
  const [printMethod, setPrintMethod] = useState<PrintMethod>('sheetfed');
  const [showInfo, setShowInfo] = useState(false);

  const gcrResult = applyGCR(c, m, y, k, GCR_PROFILES[gcrStrength].factor);
  const ucrResult = applyUCR(c, m, y, k, ucrAmount);
  const origTotal = totalInk(c, m, y, k);
  const gcrTotal = totalInk(gcrResult.c, gcrResult.m, gcrResult.y, gcrResult.k);
  const ucrTotal = totalInk(ucrResult.c, ucrResult.m, ucrResult.y, ucrResult.k);

  const method = PRINT_METHODS[printMethod];

  const cmkyColor = (val: number) => `rgba(0,0,0,${val / 100})`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Droplets className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">GCR / UCR Calculator</h3>
          <p className="text-sm text-gray-500">Gray Component Replacement settings</p>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {showInfo && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-sm text-blue-800 space-y-2">
          <p><strong>GCR (Gray Component Replacement)</strong> replaces the neutral gray formed by equal amounts of C, M, and Y with an equivalent amount of black (K) ink. This reduces total ink consumption and improves gray balance.</p>
          <p><strong>UCR (Under Color Removal)</strong> specifically targets the neutral shadow areas and removes cyan, magenta, and yellow from those areas, replacing with black. It is more conservative than GCR and focuses on darkest tones.</p>
          <p className="text-xs text-blue-600 mt-2">GCR affects the full tonal range while UCR primarily affects shadows and deep neutrals.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: CMYK Inputs */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Input CMYK Values</h4>
          {[
            { label: 'C', value: c, set: setC, color: '#00bcd4' },
            { label: 'M', value: m, set: setM, color: '#e91e63' },
            { label: 'Y', value: y, set: setY, color: '#ffeb3b' },
            { label: 'K', value: k, set: setK, color: '#333' },
          ].map(({ label, value, set, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: color }} />
              <span className="w-6 font-bold text-sm text-gray-700">{label}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="flex-1 accent-current"
              />
              <input
                type="number"
                min={0}
                max={100}
                value={value}
                onChange={(e) => set(clamp(Number(e.target.value), 0, 100))}
                className="w-16 rounded border border-gray-200 px-2 py-1 text-sm text-center focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          ))}

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Ink Coverage</span>
              <span className={`font-semibold ${origTotal > 300 ? 'text-red-600' : origTotal > 240 ? 'text-amber-600' : 'text-green-600'}`}>
                {origTotal}%
              </span>
            </div>
            {origTotal > 300 && (
              <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                <AlertTriangle className="w-3 h-3" /> Exceeds typical 300% maximum
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Printing Method</label>
            <select
              value={printMethod}
              onChange={(e) => setPrintMethod(e.target.value as PrintMethod)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            >
              {Object.entries(PRINT_METHODS).map(([id, m]) => (
                <option key={id} value={id}>{m.label}</option>
              ))}
            </select>
          </div>

          <div className="bg-purple-50 rounded-lg p-3 text-sm text-purple-800">
            <strong>Recommendation for {method.label}:</strong> Use {GCR_PROFILES[method.recGCR].label} with UCR amount {method.recUCR}%.
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">GCR Strength</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(GCR_PROFILES) as GCRStrength[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setGcrStrength(s)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                    gcrStrength === s
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-gray-200 text-gray-600 hover:border-purple-300'
                  }`}
                >
                  {GCR_PROFILES[s].label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">{GCR_PROFILES[gcrStrength].desc}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">UCR Amount: {ucrAmount}%</label>
            <input
              type="range"
              min={0}
              max={50}
              value={ucrAmount}
              onChange={(e) => setUcrAmount(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          {/* Color Swatch Comparison */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-200">
              <div className="p-2 text-center">Original</div>
              <div className="p-2 text-center border-x border-gray-200">GCR Result</div>
              <div className="p-2 text-center">UCR Result</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="p-3 text-center">
                <div
                  className="w-full h-16 rounded-lg mb-2"
                  style={{ backgroundColor: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)` }}
                />
                <div className="text-xs text-gray-600">
                  C{c} M{m} Y{y} K{k}
                </div>
              </div>
              <div className="p-3 text-center border-x border-gray-200">
                <div
                  className="w-full h-16 rounded-lg mb-2"
                  style={{ backgroundColor: `cmyk(${gcrResult.c}%, ${gcrResult.m}%, ${gcrResult.y}%, ${gcrResult.k}%)` }}
                />
                <div className="text-xs text-gray-600">
                  C{Math.round(gcrResult.c)} M{Math.round(gcrResult.m)} Y{Math.round(gcrResult.y)} K{Math.round(gcrResult.k)}
                </div>
              </div>
              <div className="p-3 text-center">
                <div
                  className="w-full h-16 rounded-lg mb-2"
                  style={{ backgroundColor: `cmyk(${ucrResult.c}%, ${ucrResult.m}%, ${ucrResult.y}%, ${ucrResult.k}%)` }}
                />
                <div className="text-xs text-gray-600">
                  C{Math.round(ucrResult.c)} M{Math.round(ucrResult.m)} Y{Math.round(ucrResult.y)} K{Math.round(ucrResult.k)}
                </div>
              </div>
            </div>
          </div>

          {/* Before / After Coverage */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900">Ink Coverage Comparison</h4>
            {[
              { label: 'Original', total: origTotal, color: 'bg-gray-500' },
              { label: 'After GCR', total: gcrTotal, color: 'bg-purple-500' },
              { label: 'After UCR', total: ucrTotal, color: 'bg-blue-500' },
            ].map(({ label, total, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-20">{label}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all`}
                    style={{ width: `${Math.min((total / 400) * 100, 100)}%` }}
                  />
                </div>
                <span className={`text-xs font-medium w-12 text-right ${total > 300 ? 'text-red-600' : 'text-gray-700'}`}>
                  {total}%
                </span>
              </div>
            ))}
          </div>

          <div className="bg-green-50 rounded-lg p-3 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
            <p className="text-xs text-green-800">
              {origTotal - gcrTotal > 0
                ? `GCR saves approximately ${Math.round(origTotal - gcrTotal)}% total ink coverage compared to the original.`
                : 'Current values show minimal gray component to replace.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   3. Imposition Calculator
   ═══════════════════════════════════════════════════════ */

type SheetOrientation = 'portrait' | 'landscape';

export function ImpositionCalculator() {
  const [finishedW, setFinishedW] = useState(210);
  const [finishedH, setFinishedH] = useState(297);
  const [sheetName, setSheetName] = useState('SRA3');
  const [customSheetW, setCustomSheetW] = useState(320);
  const [customSheetH, setCustomSheetH] = useState(450);
  const [gutterH, setGutterH] = useState(3);
  const [gutterV, setGutterV] = useState(3);
  const [margin, setMargin] = useState(5);
  const [orientation, setOrientation] = useState<SheetOrientation>('portrait');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sheet = SHEET_SIZES.find((s) => s.name === sheetName) || SHEET_SIZES[0];
  const sheetW = sheetName === 'Custom' ? customSheetW : sheet.w;
  const sheetH = sheetName === 'Custom' ? customSheetH : sheet.h;

  const [sheetWFinal, sheetHFinal] = orientation === 'portrait' ? [sheetW, sheetH] : [sheetH, sheetW];

  const usableW = sheetWFinal - margin * 2;
  const usableH = sheetHFinal - margin * 2;

  const cols = Math.max(1, Math.floor((usableW + gutterH) / (finishedW + gutterH)));
  const rows = Math.max(1, Math.floor((usableH + gutterV) / (finishedH + gutterV)));
  const itemsPerSheet = cols * rows;

  const usedW = cols * finishedW + (cols - 1) * gutterH;
  const usedH = rows * finishedH + (rows - 1) * gutterV;
  const usedArea = usedW * usedH;
  const totalSheetArea = sheetWFinal * sheetHFinal;
  const utilization = (usedArea / totalSheetArea) * 100;
  const wasteArea = totalSheetArea - usedArea;
  const wastePct = 100 - utilization;

  const drawLayout = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const cw = canvas.width;
    const ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);

    const scale = Math.min((cw - 40) / sheetWFinal, (ch - 40) / sheetHFinal);
    const offsetX = (cw - sheetWFinal * scale) / 2;
    const offsetY = (ch - sheetHFinal * scale) / 2;

    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(offsetX, offsetY, sheetWFinal * scale, sheetHFinal * scale);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.strokeRect(offsetX, offsetY, sheetWFinal * scale, sheetHFinal * scale);

    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(offsetX, offsetY, margin * scale, sheetHFinal * scale);
    ctx.fillRect(offsetX + (sheetWFinal - margin) * scale, offsetY, margin * scale, sheetHFinal * scale);
    ctx.fillRect(offsetX, offsetY, sheetWFinal * scale, margin * scale);
    ctx.fillRect(offsetX, offsetY + (sheetHFinal - margin) * scale, sheetWFinal * scale, margin * scale);

    const startX = offsetX + margin * scale;
    const startY = offsetY + margin * scale;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * (finishedW + gutterH) * scale;
        const y = startY + r * (finishedH + gutterV) * scale;

        ctx.fillStyle = '#dbeafe';
        ctx.fillRect(x, y, finishedW * scale, finishedH * scale);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, finishedW * scale, finishedH * scale);

        if (finishedW * scale > 30 && finishedH * scale > 20) {
          ctx.fillStyle = '#1d4ed8';
          ctx.font = `${Math.min(10, finishedW * scale / 4)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${r * cols + c + 1}`, x + (finishedW * scale) / 2, y + (finishedH * scale) / 2);
        }
      }
    }

    ctx.fillStyle = '#6b7280';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${sheetWFinal} × ${sheetHFinal} mm`, cw / 2, ch - 5);
  }, [sheetWFinal, sheetHFinal, finishedW, finishedH, cols, rows, margin, gutterH, gutterV]);

  useState(() => {
    setTimeout(drawLayout, 0);
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <Grid3X3 className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Imposition Calculator</h3>
          <p className="text-sm text-gray-500">Multi-up imposition for commercial printing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Finished Size (mm)</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Width</label>
              <input
                type="number"
                value={finishedW}
                onChange={(e) => setFinishedW(clamp(Number(e.target.value), 1, 2000))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                min={1}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Height</label>
              <input
                type="number"
                value={finishedH}
                onChange={(e) => setFinishedH(clamp(Number(e.target.value), 1, 2000))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                min={1}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sheet Size</label>
            <select
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            >
              {SHEET_SIZES.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} {s.w ? `(${s.w} × ${s.h} mm)` : ''}
                </option>
              ))}
            </select>
          </div>

          {sheetName === 'Custom' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Sheet Width (mm)</label>
                <input
                  type="number"
                  value={customSheetW}
                  onChange={(e) => setCustomSheetW(clamp(Number(e.target.value), 1, 3000))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  min={1}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Sheet Height (mm)</label>
                <input
                  type="number"
                  value={customSheetH}
                  onChange={(e) => setCustomSheetH(clamp(Number(e.target.value), 1, 3000))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  min={1}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOrientation('portrait')}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm flex items-center justify-center gap-2 transition-colors ${
                orientation === 'portrait'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}
            >
              <ArrowUpDown className="w-4 h-4" /> Portrait
            </button>
            <button
              onClick={() => setOrientation('landscape')}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm flex items-center justify-center gap-2 transition-colors ${
                orientation === 'landscape'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}
            >
              <ArrowUpDown className="w-4 h-4 rotate-90" /> Landscape
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Gutter H (mm)</label>
              <input
                type="number"
                value={gutterH}
                onChange={(e) => setGutterH(clamp(Number(e.target.value), 0, 50))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                min={0}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Gutter V (mm)</label>
              <input
                type="number"
                value={gutterV}
                onChange={(e) => setGutterV(clamp(Number(e.target.value), 0, 50))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Sheet Margin (mm)</label>
            <input
              type="number"
              value={margin}
              onChange={(e) => setMargin(clamp(Number(e.target.value), 0, 50))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              min={0}
            />
          </div>
        </div>

        {/* Right: Results + Canvas */}
        <div className="space-y-4">
          <div className="bg-emerald-50 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-emerald-900 mb-4">Imposition Results</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">Layout</span>
                <span className="font-semibold text-emerald-900">{cols} × {rows}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">Items per Sheet</span>
                <span className="font-semibold text-emerald-900">{itemsPerSheet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">Sheet Size</span>
                <span className="font-semibold text-emerald-900">{sheetWFinal} × {sheetHFinal} mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">Used Area</span>
                <span className="font-semibold text-emerald-900">{usedW} × {usedH} mm</span>
              </div>
              <div className="h-px bg-emerald-200" />
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">Utilization</span>
                <span className={`font-bold ${utilization > 80 ? 'text-green-700' : utilization > 60 ? 'text-amber-700' : 'text-red-700'}`}>
                  {utilization.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">Waste</span>
                <span className="font-semibold text-emerald-900">
                  {wasteArea.toFixed(0)} mm² ({wastePct.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Canvas visualization */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <span className="text-xs font-medium text-gray-600">Visual Layout</span>
            </div>
            <canvas
              ref={(el) => {
                (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = el;
                if (el) setTimeout(drawLayout, 0);
              }}
              width={400}
              height={350}
              className="w-full"
            />
          </div>

          <div className="bg-amber-50 rounded-lg p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800">
              Utilization above 80% is considered efficient. Gutters account for trim/bleed areas. Add 3mm bleed on each side if required by your print provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
