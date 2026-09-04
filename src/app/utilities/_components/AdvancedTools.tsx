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
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#eef2ff' }}>
          <Calculator size={20} style={{ color: '#4f46e5' }} />
        </div>
        <div>
          <h3 className="fw-semibold text-dark">Impression Calculator</h3>
          <p className="text-sm text-muted">Calculate total ink coverage and cost</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Left: Inputs */}
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-3">
            <div>
              <label className="form-label text-sm fw-medium">Paper Size</label>
              <select
                value={paperSize}
                onChange={(e) => setPaperSize(e.target.value)}
                className="form-select form-select-sm"
              >
                {PAPER_SIZES.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} {p.w ? `(${p.w} × ${p.h} cm)` : ''}
                  </option>
                ))}
              </select>
            </div>

            {paperSize === 'Custom' && (
              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label text-sm fw-medium">Width (cm)</label>
                  <input
                    type="number"
                    value={printW}
                    onChange={(e) => setPrintW(Number(e.target.value))}
                    className="form-control form-control-sm"
                    min={1}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-sm fw-medium">Height (cm)</label>
                  <input
                    type="number"
                    value={printH}
                    onChange={(e) => setPrintH(Number(e.target.value))}
                    className="form-control form-control-sm"
                    min={1}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="form-label text-sm fw-medium">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(clamp(Number(e.target.value), 1, 1000000))}
                className="form-control form-control-sm"
                min={1}
              />
            </div>

            <div>
              <label className="form-label text-sm fw-medium">Ink Type</label>
              <select
                value={inkType}
                onChange={(e) => setInkType(e.target.value)}
                className="form-select form-select-sm"
              >
                {INK_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label} — ${t.costPerMl.toFixed(2)}/ml
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="d-flex justify-content-between mb-1">
                <label className="text-sm fw-medium">
                  Ink Coverage: {inkCoverage}%
                  {autoCoverage && <span style={{ color: '#6366f1' }} className="ms-1">(auto)</span>}
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
                className="form-range"
                style={{ accentColor: '#4f46e5' }}
              />
              <div className="d-flex justify-content-between text-xs text-muted">
                <span>5%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="border rounded-lg p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-sm fw-medium">Image Upload (optional)</span>
                {imageFile && (
                  <button
                    onClick={resetImage}
                    className="btn btn-sm p-0 text-muted"
                  >
                    <RotateCcw size={12} /> Clear
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="d-none"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-100 border border-dashed rounded-lg py-3 text-sm text-muted d-flex align-items-center justify-content-center gap-2"
                style={{ borderColor: '#dee2e6' }}
              >
                <Upload size={16} />
                {imageFile ? imageFile.name : 'Upload image for auto-analysis'}
              </button>
              {imagePreview && (
                <div className="mt-2 position-relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="w-100 rounded-lg" style={{ height: '96px', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            {/* Channel breakdown */}
            <div className="border rounded-lg p-3">
              <span className="text-sm fw-medium mb-2 d-block">Ink Channel Breakdown</span>
              {(['c', 'm', 'y', 'k'] as const).map((ch) => (
                <div key={ch} className="d-flex align-items-center gap-2 mb-1">
                  <span className="text-xs fw-bold" style={{ width: '16px', color: ch === 'c' ? '#00bcd4' : ch === 'm' ? '#e91e63' : ch === 'y' ? '#ffeb3b' : '#333' }}>
                    {ch.toUpperCase()}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={channelPct[ch]}
                    onChange={(e) => setChannelPct({ ...channelPct, [ch]: Number(e.target.value) })}
                    className="form-range flex-grow-1"
                    style={{ accentColor: ch === 'c' ? '#00bcd4' : ch === 'm' ? '#e91e63' : ch === 'y' ? '#ffeb3b' : '#333' }}
                  />
                  <span className="text-xs text-muted" style={{ width: '40px', textAlign: 'right' }}>{channelPct[ch]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-3">
            <div className="rounded-xl p-4" style={{ backgroundColor: '#eef2ff' }}>
              <h4 className="text-sm fw-semibold mb-3" style={{ color: '#312e81' }}>Results</h4>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sm" style={{ color: '#4338ca' }}>Print Area per Unit</span>
                  <span className="fw-semibold" style={{ color: '#312e81' }}>{wCm} × {hCm} cm</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sm" style={{ color: '#4338ca' }}>Single Area</span>
                  <span className="fw-semibold" style={{ color: '#312e81' }}>{singleAreaM2.toFixed(4)} m²</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sm" style={{ color: '#4338ca' }}>Total Print Area</span>
                  <span className="fw-semibold" style={{ color: '#312e81' }}>{totalAreaM2.toFixed(2)} m²</span>
                </div>
                <div className="border-top" style={{ borderColor: '#c7d2fe' }} />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sm" style={{ color: '#4338ca' }}>Ink Coverage Area</span>
                  <span className="fw-semibold" style={{ color: '#312e81' }}>{inkAreaM2.toFixed(2)} m²</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sm" style={{ color: '#4338ca' }}>Est. Ink Consumption</span>
                  <span className="fw-semibold" style={{ color: '#312e81' }}>{inkConsumptionMl.toFixed(0)} ml</span>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <h4 className="text-sm fw-semibold mb-3">Cost Breakdown</h4>
              <div className="d-flex flex-column gap-2">
                {inkType === 'cmyk' && (
                  <>
                    {(['c', 'm', 'y', 'k'] as const).map((ch) => {
                      const chMl = inkConsumptionMl * (channelPct[ch] / inkCoverage);
                      const chCost = chMl * inkInfo.costPerMl;
                      const colors: Record<string, string> = { c: '#00bcd4', m: '#e91e63', y: '#ffeb3b', k: '#333' };
                      return (
                        <div key={ch} className="d-flex align-items-center gap-2">
                          <div className="rounded" style={{ width: '20px', height: '20px', backgroundColor: colors[ch] }} />
                          <span className="text-sm text-secondary flex-grow-1">{ch.toUpperCase()} Channel</span>
                          <span className="text-xs text-muted">{chMl.toFixed(0)} ml</span>
                          <span className="text-sm fw-medium" style={{ width: '64px', textAlign: 'right' }}>${chCost.toFixed(2)}</span>
                        </div>
                      );
                    })}
                    <div className="border-top" style={{ borderColor: '#dee2e6' }} />
                  </>
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sm fw-medium">Total Ink Cost</span>
                  <span className="text-lg fw-bold" style={{ color: '#4f46e5' }}>${totalCost.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center text-sm text-muted">
                  <span>Cost per Impression</span>
                  <span>${(totalCost / quantity).toFixed(4)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-3 d-flex align-items-start gap-2" style={{ backgroundColor: '#fffbeb' }}>
              <Info size={16} className="mt-1 shrink-0" style={{ color: '#d97706' }} />
              <p className="text-xs" style={{ color: '#92400e' }}>
                Estimates are based on typical ink consumption of 100 ml/m² at 100% coverage. Actual usage varies by substrate, ink density, and printing method.
              </p>
            </div>
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
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#faf5ff' }}>
          <Droplets size={20} style={{ color: '#9333ea' }} />
        </div>
        <div className="flex-grow-1">
          <h3 className="fw-semibold text-dark">GCR / UCR Calculator</h3>
          <p className="text-sm text-muted">Gray Component Replacement settings</p>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="btn btn-sm p-1 text-muted"
        >
          <Info size={20} />
        </button>
      </div>

      {showInfo && (
        <div className="rounded-lg p-3 mb-4 text-sm" style={{ backgroundColor: '#eff6ff', color: '#1e40af' }}>
          <p><strong>GCR (Gray Component Replacement)</strong> replaces the neutral gray formed by equal amounts of C, M, and Y with an equivalent amount of black (K) ink. This reduces total ink consumption and improves gray balance.</p>
          <p><strong>UCR (Under Color Removal)</strong> specifically targets the neutral shadow areas and removes cyan, magenta, and yellow from those areas, replacing with black. It is more conservative than GCR and focuses on darkest tones.</p>
          <p className="text-xs mt-2" style={{ color: '#2563eb' }}>GCR affects the full tonal range while UCR primarily affects shadows and deep neutrals.</p>
        </div>
      )}

      <div className="row g-4">
        {/* Left: CMYK Inputs */}
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-3">
            <h4 className="text-sm fw-semibold">Input CMYK Values</h4>
            {[
              { label: 'C', value: c, set: setC, color: '#00bcd4' },
              { label: 'M', value: m, set: setM, color: '#e91e63' },
              { label: 'Y', value: y, set: setY, color: '#ffeb3b' },
              { label: 'K', value: k, set: setK, color: '#333' },
            ].map(({ label, value, set, color }) => (
              <div key={label} className="d-flex align-items-center gap-2">
                <div className="rounded" style={{ width: '24px', height: '24px', backgroundColor: color }} />
                <span className="fw-bold text-sm" style={{ width: '24px' }}>{label}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  onChange={(e) => set(Number(e.target.value))}
                  className="form-range flex-grow-1"
                  style={{ accentColor: color }}
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={value}
                  onChange={(e) => set(clamp(Number(e.target.value), 0, 100))}
                  className="form-control form-control-sm text-center"
                  style={{ width: '64px' }}
                />
              </div>
            ))}

            <div className="rounded-lg p-3" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="d-flex justify-content-between text-sm">
                <span className="text-secondary">Total Ink Coverage</span>
                <span className={`fw-semibold ${origTotal > 300 ? 'text-danger' : origTotal > 240 ? 'text-warning' : 'text-success'}`}>
                  {origTotal}%
                </span>
              </div>
              {origTotal > 300 && (
                <div className="d-flex align-items-center gap-1 mt-1 text-xs text-danger">
                  <AlertTriangle size={12} /> Exceeds typical 300% maximum
                </div>
              )}
            </div>

            <div>
              <label className="form-label text-sm fw-medium">Printing Method</label>
              <select
                value={printMethod}
                onChange={(e) => setPrintMethod(e.target.value as PrintMethod)}
                className="form-select form-select-sm"
              >
                {Object.entries(PRINT_METHODS).map(([id, m]) => (
                  <option key={id} value={id}>{m.label}</option>
                ))}
              </select>
            </div>

            <div className="rounded-lg p-3 text-sm" style={{ backgroundColor: '#faf5ff', color: '#6b21a8' }}>
              <strong>Recommendation for {method.label}:</strong> Use {GCR_PROFILES[method.recGCR].label} with UCR amount {method.recUCR}%.
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-3">
            <div>
              <label className="form-label text-sm fw-medium mb-2">GCR Strength</label>
              <div className="row g-2">
                {(Object.keys(GCR_PROFILES) as GCRStrength[]).map((s) => (
                  <div key={s} className="col-6">
                    <button
                      onClick={() => setGcrStrength(s)}
                      className={`w-100 rounded-lg border px-3 py-2 text-sm ${gcrStrength === s ? 'text-white' : ''}`}
                      style={gcrStrength === s ? { backgroundColor: '#9333ea', borderColor: '#9333ea' } : { borderColor: '#dee2e6', color: '#6c757d' }}
                    >
                      {GCR_PROFILES[s].label}
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-2">{GCR_PROFILES[gcrStrength].desc}</p>
            </div>

            <div>
              <label className="form-label text-sm fw-medium">UCR Amount: {ucrAmount}%</label>
              <input
                type="range"
                min={0}
                max={50}
                value={ucrAmount}
                onChange={(e) => setUcrAmount(Number(e.target.value))}
                className="form-range"
                style={{ accentColor: '#9333ea' }}
              />
            </div>

            {/* Color Swatch Comparison */}
            <div className="border rounded-xl overflow-hidden">
              <div className="row g-0 text-xs fw-medium text-muted" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="col-4 p-2 text-center">Original</div>
                <div className="col-4 p-2 text-center border-start border-end" style={{ borderColor: '#dee2e6' }}>GCR Result</div>
                <div className="col-4 p-2 text-center">UCR Result</div>
              </div>
              <div className="row g-0">
                <div className="col-4 p-3 text-center">
                  <div
                    className="w-100 rounded-lg mb-2"
                    style={{ height: '64px', backgroundColor: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)` }}
                  />
                  <div className="text-xs text-secondary">
                    C{c} M{m} Y{y} K{k}
                  </div>
                </div>
                <div className="col-4 p-3 text-center border-start border-end" style={{ borderColor: '#dee2e6' }}>
                  <div
                    className="w-100 rounded-lg mb-2"
                    style={{ height: '64px', backgroundColor: `cmyk(${gcrResult.c}%, ${gcrResult.m}%, ${gcrResult.y}%, ${gcrResult.k}%)` }}
                  />
                  <div className="text-xs text-secondary">
                    C{Math.round(gcrResult.c)} M{Math.round(gcrResult.m)} Y{Math.round(gcrResult.y)} K{Math.round(gcrResult.k)}
                  </div>
                </div>
                <div className="col-4 p-3 text-center">
                  <div
                    className="w-100 rounded-lg mb-2"
                    style={{ height: '64px', backgroundColor: `cmyk(${ucrResult.c}%, ${ucrResult.m}%, ${ucrResult.y}%, ${ucrResult.k}%)` }}
                  />
                  <div className="text-xs text-secondary">
                    C{Math.round(ucrResult.c)} M{Math.round(ucrResult.m)} Y{Math.round(ucrResult.y)} K{Math.round(ucrResult.k)}
                  </div>
                </div>
              </div>
            </div>

            {/* Before / After Coverage */}
            <div className="d-flex flex-column gap-2">
              <h4 className="text-sm fw-semibold">Ink Coverage Comparison</h4>
              {[
                { label: 'Original', total: origTotal, color: '#6c757d' },
                { label: 'After GCR', total: gcrTotal, color: '#9333ea' },
                { label: 'After UCR', total: ucrTotal, color: '#3b82f6' },
              ].map(({ label, total, color }) => (
                <div key={label} className="d-flex align-items-center gap-2">
                  <span className="text-xs text-secondary" style={{ width: '80px' }}>{label}</span>
                  <div className="flex-grow-1 rounded-full overflow-hidden" style={{ height: '16px', backgroundColor: '#f1f3f5' }}>
                    <div
                      className="h-100 rounded-full"
                      style={{ width: `${Math.min((total / 400) * 100, 100)}%`, backgroundColor: color, transition: 'width 0.3s' }}
                    />
                  </div>
                  <span className={`text-xs fw-medium ${total > 300 ? 'text-danger' : 'text-secondary'}`} style={{ width: '48px', textAlign: 'right' }}>
                    {total}%
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-lg p-3 d-flex align-items-start gap-2" style={{ backgroundColor: '#f0fdf4' }}>
              <CheckCircle size={16} className="mt-1 shrink-0" style={{ color: '#16a34a' }} />
              <p className="text-xs" style={{ color: '#166534' }}>
                {origTotal - gcrTotal > 0
                  ? `GCR saves approximately ${Math.round(origTotal - gcrTotal)}% total ink coverage compared to the original.`
                  : 'Current values show minimal gray component to replace.'}
              </p>
            </div>
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
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#ecfdf5' }}>
          <Grid3X3 size={20} style={{ color: '#059669' }} />
        </div>
        <div>
          <h3 className="fw-semibold text-dark">Imposition Calculator</h3>
          <p className="text-sm text-muted">Multi-up imposition for commercial printing</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Left: Inputs */}
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-3">
            <h4 className="text-sm fw-semibold">Finished Size (mm)</h4>
            <div className="row g-2">
              <div className="col-6">
                <label className="form-label text-xs text-muted">Width</label>
                <input
                  type="number"
                  value={finishedW}
                  onChange={(e) => setFinishedW(clamp(Number(e.target.value), 1, 2000))}
                  className="form-control form-control-sm"
                  min={1}
                />
              </div>
              <div className="col-6">
                <label className="form-label text-xs text-muted">Height</label>
                <input
                  type="number"
                  value={finishedH}
                  onChange={(e) => setFinishedH(clamp(Number(e.target.value), 1, 2000))}
                  className="form-control form-control-sm"
                  min={1}
                />
              </div>
            </div>

            <div>
              <label className="form-label text-sm fw-medium">Sheet Size</label>
              <select
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
                className="form-select form-select-sm"
              >
                {SHEET_SIZES.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} {s.w ? `(${s.w} × ${s.h} mm)` : ''}
                  </option>
                ))}
              </select>
            </div>

            {sheetName === 'Custom' && (
              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label text-xs text-muted">Sheet Width (mm)</label>
                  <input
                    type="number"
                    value={customSheetW}
                    onChange={(e) => setCustomSheetW(clamp(Number(e.target.value), 1, 3000))}
                    className="form-control form-control-sm"
                    min={1}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-xs text-muted">Sheet Height (mm)</label>
                  <input
                    type="number"
                    value={customSheetH}
                    onChange={(e) => setCustomSheetH(clamp(Number(e.target.value), 1, 3000))}
                    className="form-control form-control-sm"
                    min={1}
                  />
                </div>
              </div>
            )}

            <div className="d-flex gap-2">
              <button
                onClick={() => setOrientation('portrait')}
                className={`flex-grow-1 rounded-lg border px-3 py-2 text-sm d-flex align-items-center justify-content-center gap-2 ${orientation === 'portrait' ? 'text-white' : ''}`}
                style={orientation === 'portrait' ? { backgroundColor: '#059669', borderColor: '#059669' } : { borderColor: '#dee2e6', color: '#6c757d' }}
              >
                <ArrowUpDown size={16} /> Portrait
              </button>
              <button
                onClick={() => setOrientation('landscape')}
                className={`flex-grow-1 rounded-lg border px-3 py-2 text-sm d-flex align-items-center justify-content-center gap-2 ${orientation === 'landscape' ? 'text-white' : ''}`}
                style={orientation === 'landscape' ? { backgroundColor: '#059669', borderColor: '#059669' } : { borderColor: '#dee2e6', color: '#6c757d' }}
              >
                <ArrowUpDown size={16} style={{ transform: 'rotate(90deg)' }} /> Landscape
              </button>
            </div>

            <div className="row g-2">
              <div className="col-6">
                <label className="form-label text-xs text-muted">Gutter H (mm)</label>
                <input
                  type="number"
                  value={gutterH}
                  onChange={(e) => setGutterH(clamp(Number(e.target.value), 0, 50))}
                  className="form-control form-control-sm"
                  min={0}
                />
              </div>
              <div className="col-6">
                <label className="form-label text-xs text-muted">Gutter V (mm)</label>
                <input
                  type="number"
                  value={gutterV}
                  onChange={(e) => setGutterV(clamp(Number(e.target.value), 0, 50))}
                  className="form-control form-control-sm"
                  min={0}
                />
              </div>
            </div>

            <div>
              <label className="form-label text-xs text-muted">Sheet Margin (mm)</label>
              <input
                type="number"
                value={margin}
                onChange={(e) => setMargin(clamp(Number(e.target.value), 0, 50))}
                className="form-control form-control-sm"
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Right: Results + Canvas */}
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-3">
            <div className="rounded-xl p-4" style={{ backgroundColor: '#ecfdf5' }}>
              <h4 className="text-sm fw-semibold mb-3" style={{ color: '#065f46' }}>Imposition Results</h4>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between">
                  <span className="text-sm" style={{ color: '#047857' }}>Layout</span>
                  <span className="fw-semibold" style={{ color: '#065f46' }}>{cols} × {rows}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-sm" style={{ color: '#047857' }}>Items per Sheet</span>
                  <span className="fw-semibold" style={{ color: '#065f46' }}>{itemsPerSheet}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-sm" style={{ color: '#047857' }}>Sheet Size</span>
                  <span className="fw-semibold" style={{ color: '#065f46' }}>{sheetWFinal} × {sheetHFinal} mm</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-sm" style={{ color: '#047857' }}>Used Area</span>
                  <span className="fw-semibold" style={{ color: '#065f46' }}>{usedW} × {usedH} mm</span>
                </div>
                <div className="border-top" style={{ borderColor: '#a7f3d0' }} />
                <div className="d-flex justify-content-between">
                  <span className="text-sm" style={{ color: '#047857' }}>Utilization</span>
                  <span className={`fw-bold ${utilization > 80 ? 'text-success' : utilization > 60 ? 'text-warning' : 'text-danger'}`}>
                    {utilization.toFixed(1)}%
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-sm" style={{ color: '#047857' }}>Waste</span>
                  <span className="fw-semibold" style={{ color: '#065f46' }}>
                    {wasteArea.toFixed(0)} mm² ({wastePct.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Canvas visualization */}
            <div className="border rounded-xl overflow-hidden">
              <div className="px-3 py-2 border-bottom" style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
                <span className="text-xs fw-medium text-secondary">Visual Layout</span>
              </div>
              <canvas
                ref={(el) => {
                  (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = el;
                  if (el) setTimeout(drawLayout, 0);
                }}
                width={400}
                height={350}
                className="w-100"
              />
            </div>

            <div className="rounded-lg p-3 d-flex align-items-start gap-2" style={{ backgroundColor: '#fffbeb' }}>
              <Info size={16} className="mt-1 shrink-0" style={{ color: '#d97706' }} />
              <p className="text-xs" style={{ color: '#92400e' }}>
                Utilization above 80% is considered efficient. Gutters account for trim/bleed areas. Add 3mm bleed on each side if required by your print provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
