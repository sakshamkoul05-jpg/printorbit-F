'use client';
import { useState, useRef, useCallback } from 'react';
import {
  Eye,
  CheckCircle,
  AlertTriangle,
  Palette,
  Type,
  Droplets,
  Monitor,
  Upload,
  X,
  RotateCcw,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   Shared helpers
   ═══════════════════════════════════════════════════════ */

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const a = hexToRgb(hex1);
  const b = hexToRgb(hex2);
  if (!a || !b) return 0;
  const l1 = relativeLuminance(a.r, a.g, a.b);
  const l2 = relativeLuminance(b.r, b.g, b.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function deltaE(c1: { r: number; g: number; b: number }, c2: { r: number; g: number; b: number }): number {
  const rmean = (c1.r + c2.r) / 2;
  const dr = c1.r - c2.r;
  const dg = c1.g - c2.g;
  const db = c1.b - c2.b;
  return Math.sqrt(
    (2 + rmean / 256) * dr * dr +
      4 * dg * dg +
      (2 + (255 - rmean) / 256) * db * db
  );
}

/* ═══════════════════════════════════════════════════════
   1. Color Blind Simulator
   ═══════════════════════════════════════════════════════ */

type CBType = { id: string; label: string; matrix: number[][] };

const CB_TYPES: CBType[] = [
  {
    id: 'protanopia',
    label: 'Protanopia (Red-blind)',
    matrix: [
      [0.56667, 0.43333, 0.0],
      [0.55833, 0.44167, 0.0],
      [0.0, 0.24167, 0.75833],
    ],
  },
  {
    id: 'deuteranopia',
    label: 'Deuteranopia (Green-blind)',
    matrix: [
      [0.625, 0.375, 0.0],
      [0.7, 0.3, 0.0],
      [0.0, 0.3, 0.7],
    ],
  },
  {
    id: 'tritanopia',
    label: 'Tritanopia (Blue-blind)',
    matrix: [
      [0.95, 0.05, 0.0],
      [0.0, 0.43333, 0.56667],
      [0.0, 0.475, 0.525],
    ],
  },
  {
    id: 'achromatopsia',
    label: 'Achromatopsia (Total)',
    matrix: [
      [0.299, 0.587, 0.114],
      [0.299, 0.587, 0.114],
      [0.299, 0.587, 0.114],
    ],
  },
];

function simulateCB(r: number, g: number, b: number, matrix: number[][]): { r: number; g: number; b: number } {
  return {
    r: matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b,
    g: matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b,
    b: matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b,
  };
}

export function ColorBlindSimulator() {
  const [hex, setHex] = useState('#e74c3c');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [simulatedImages, setSimulatedImages] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const rgb = hexToRgb(hex) ?? { r: 231, g: 76, b: 60 };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);

    const img = new Image();
    img.onload = () => {
      const results: Record<string, string> = {};
      for (const cb of CB_TYPES) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, img.width, img.height);
        const px = data.data;
        for (let i = 0; i < px.length; i += 4) {
          const sim = simulateCB(px[i], px[i + 1], px[i + 2], cb.matrix);
          px[i] = Math.max(0, Math.min(255, Math.round(sim.r)));
          px[i + 1] = Math.max(0, Math.min(255, Math.round(sim.g)));
          px[i + 2] = Math.max(0, Math.min(255, Math.round(sim.b)));
        }
        ctx.putImageData(data, 0, 0);
        results[cb.id] = canvas.toDataURL();
      }
      setSimulatedImages(results);
    };
    img.src = url;
  }, []);

  const clearImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setSimulatedImages({});
    if (fileRef.current) fileRef.current.value = '';
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2 mb-4">
        <Eye size={20} style={{ color: '#22d3ee' }} /> Color Blind Simulator
      </h3>

      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <label className="text-sm text-muted">HEX Color:</label>
        <div className="d-flex align-items-center gap-2">
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="form-control form-control-color"
            style={{ width: '40px', height: '40px', padding: 0, border: 'none' }}
          />
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="form-control form-control-sm text-uppercase"
            style={{ width: '112px' }}
            maxLength={7}
          />
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-sm-4 col-md-3 col-lg">
          <div className="border rounded-lg p-3 text-center">
            <div
              className="mx-auto mb-2 rounded-lg"
              style={{ backgroundColor: hex, width: '64px', height: '64px' }}
            />
            <span className="text-xs fw-medium">Original</span>
          </div>
        </div>
        {CB_TYPES.map((cb) => {
          const sim = simulateCB(rgb.r, rgb.g, rgb.b, cb.matrix);
          const simHex = rgbToHex(sim.r, sim.g, sim.b);
          return (
            <div key={cb.id} className="col-6 col-sm-4 col-md-3 col-lg">
              <div className="border rounded-lg p-3 text-center">
                <div
                  className="mx-auto mb-2 rounded-lg"
                  style={{ backgroundColor: simHex, width: '64px', height: '64px' }}
                />
                <span className="text-xs fw-medium">{cb.label}</span>
                <span className="d-block text-muted" style={{ fontSize: '10px' }}>{simHex.toUpperCase()}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-top pt-4 mt-4">
        <p className="mb-3 text-sm fw-medium text-muted">Or upload a design image:</p>
        <div className="d-flex align-items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="d-none"
            id="cb-image-input"
          />
          <label
            htmlFor="cb-image-input"
            className="btn btn-sm d-flex align-items-center gap-2"
            style={{ border: '1px dashed #dee2e6', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
          >
            <Upload size={16} /> Upload Image
          </label>
          {imageFile && (
            <button onClick={clearImage} className="btn btn-sm p-1 text-muted">
              <X size={16} />
            </button>
          )}
        </div>

        {imagePreview && (
          <div className="mt-4">
            <p className="mb-2 text-xs text-muted">Original:</p>
            <img src={imagePreview} alt="Original" className="mb-4 rounded-lg" style={{ maxHeight: '192px', objectFit: 'contain' }} />
            <div className="row g-3">
              {CB_TYPES.map((cb) => (
                <div key={cb.id} className="col-6 col-md-3">
                  <p className="mb-1 text-xs text-muted">{cb.label}</p>
                  {simulatedImages[cb.id] ? (
                    <img
                      src={simulatedImages[cb.id]}
                      alt={cb.label}
                      className="rounded-lg"
                      style={{ maxHeight: '144px', objectFit: 'contain' }}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center rounded-lg text-xs text-muted" style={{ height: '144px', backgroundColor: '#f8f9fa' }}>
                      Processing...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. Color Contrast Checker
   ═══════════════════════════════════════════════════════ */

interface WCAGResult {
  label: string;
  ratio: string;
  normalAA: boolean;
  normalAAA: boolean;
  largeAA: boolean;
  largeAAA: boolean;
  uiAA: boolean;
}

function evaluateContrast(fg: string, bg: string): WCAGResult {
  const ratio = contrastRatio(fg, bg);
  return {
    label: `${fg.toUpperCase()} on ${bg.toUpperCase()}`,
    ratio: ratio.toFixed(2),
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5,
    uiAA: ratio >= 3,
  };
}

function suggestFix(fg: string, bg: string): string | null {
  const ratio = contrastRatio(fg, bg);
  if (ratio >= 4.5) return null;
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  if (!fgRgb || !bgRgb) return null;
  const bgLum = relativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  if (bgLum > 0.5) {
    for (let step = 0; step <= 255; step += 5) {
      const darker = rgbToHex(
        Math.max(0, fgRgb.r - step),
        Math.max(0, fgRgb.g - step),
        Math.max(0, fgRgb.b - step)
      );
      if (contrastRatio(darker, bg) >= 4.5) return darker;
    }
  } else {
    for (let step = 0; step <= 255; step += 5) {
      const lighter = rgbToHex(
        Math.min(255, fgRgb.r + step),
        Math.min(255, fgRgb.g + step),
        Math.min(255, fgRgb.b + step)
      );
      if (contrastRatio(lighter, bg) >= 4.5) return lighter;
    }
  }
  return null;
}

export function ContrastChecker() {
  const [fg, setFg] = useState('#ffffff');
  const [bg, setBg] = useState('#1a1a2e');

  const result = evaluateContrast(fg, bg);
  const suggestion = suggestFix(fg, bg);

  const PassIcon = ({ pass }: { pass: boolean }) =>
    pass ? <CheckCircle className="inline" size={16} style={{ color: '#34d399' }} /> : <AlertTriangle className="inline" size={16} style={{ color: '#f87171' }} />;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2 mb-4">
        <CheckCircle size={20} style={{ color: '#34d399' }} /> Color Contrast Checker
      </h3>

      <div className="d-flex flex-wrap align-items-center gap-4 mb-4">
        <div className="d-flex align-items-center gap-2">
          <label className="text-sm text-muted">Foreground:</label>
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="form-control form-control-color" style={{ width: '40px', height: '40px', padding: 0, border: 'none' }} />
          <input
            type="text"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            className="form-control form-control-sm text-uppercase"
            style={{ width: '96px' }}
            maxLength={7}
          />
        </div>
        <div className="d-flex align-items-center gap-2">
          <label className="text-sm text-muted">Background:</label>
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="form-control form-control-color" style={{ width: '40px', height: '40px', padding: 0, border: 'none' }} />
          <input
            type="text"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="form-control form-control-sm text-uppercase"
            style={{ width: '96px' }}
            maxLength={7}
          />
        </div>
        <button
          onClick={() => { setFg('#ffffff'); setBg('#1a1a2e'); }}
          className="btn btn-sm d-flex align-items-center gap-1"
          style={{ border: '1px solid #dee2e6' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div
        className="mb-4 rounded-xl p-4"
        style={{ backgroundColor: bg, color: fg, border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <p className="h4 fw-bold mb-1">Sample Heading</p>
        <p className="mb-1">This is body text. The quick brown fox jumps over the lazy dog.</p>
        <p className="text-sm">Small text (14px) for fine print and labels.</p>
      </div>

      <div className="border rounded-xl p-4 mb-4">
        <p className="mb-2 text-sm fw-semibold">
          Contrast Ratio: <span style={{ color: '#22d3ee' }}>{result.ratio}:1</span>
        </p>
        <div className="table-responsive">
          <table className="table table-sm text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                <th>Level</th>
                <th>AA Normal</th>
                <th>AA Large</th>
                <th>AAA Normal</th>
                <th>AAA Large</th>
                <th>UI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-medium">Result</td>
                <td><PassIcon pass={result.normalAA} /></td>
                <td><PassIcon pass={result.largeAA} /></td>
                <td><PassIcon pass={result.normalAAA} /></td>
                <td><PassIcon pass={result.largeAAA} /></td>
                <td><PassIcon pass={result.uiAA} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {suggestion && (
        <div className="rounded-xl p-4 text-sm" style={{ backgroundColor: '#fffbeb', border: '1px solid #fed7aa', color: '#92400e' }}>
          <p className="mb-1 fw-semibold">Suggested foreground color for AA compliance:</p>
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-lg" style={{ width: '32px', height: '32px', backgroundColor: suggestion, border: '1px solid rgba(255,255,255,0.2)' }} />
            <button
              onClick={() => setFg(suggestion)}
              className="btn btn-sm"
              style={{ backgroundColor: '#f59e0b20', color: '#92400e' }}
            >
              Apply {suggestion.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   3. ICC Profile Comparison
   ═══════════════════════════════════════════════════════ */

interface ProfileInfo {
  id: string;
  label: string;
  primaries: { x: number; y: number }[];
  whitePoint: { x: number; y: number };
  description: string;
}

const ICC_PROFILES: ProfileInfo[] = [
  {
    id: 'srgb',
    label: 'sRGB',
    primaries: [
      { x: 0.64, y: 0.33 },
      { x: 0.3, y: 0.6 },
      { x: 0.15, y: 0.06 },
    ],
    whitePoint: { x: 0.3127, y: 0.329 },
    description: 'Standard RGB — default web color space, ~35% Adobe RGB gamut.',
  },
  {
    id: 'adobergb',
    label: 'Adobe RGB',
    primaries: [
      { x: 0.64, y: 0.33 },
      { x: 0.21, y: 0.71 },
      { x: 0.15, y: 0.06 },
    ],
    whitePoint: { x: 0.3127, y: 0.329 },
    description: 'Wider gamut than sRGB, covers ~50% of CIE 1931. Common in prepress.',
  },
  {
    id: 'displayp3',
    label: 'Display P3',
    primaries: [
      { x: 0.68, y: 0.32 },
      { x: 0.265, y: 0.69 },
      { x: 0.15, y: 0.06 },
    ],
    whitePoint: { x: 0.3127, y: 0.329 },
    description: 'Wide gamut used by Apple displays. ~25% larger than sRGB.',
  },
  {
    id: 'fogra39',
    label: 'FOGRA39 (Coated)',
    primaries: [
      { x: 0.64, y: 0.33 },
      { x: 0.21, y: 0.695 },
      { x: 0.15, y: 0.06 },
    ],
    whitePoint: { x: 0.314, y: 0.331 },
    description: 'ISO 12647-2 coated paper reference. European print standard.',
  },
  {
    id: 'fogra47',
    label: 'FOGRA47 (Uncoated)',
    primaries: [
      { x: 0.63, y: 0.34 },
      { x: 0.195, y: 0.67 },
      { x: 0.14, y: 0.065 },
    ],
    whitePoint: { x: 0.323, y: 0.339 },
    description: 'ISO 12647-2 uncoated white paper reference.',
  },
  {
    id: 'swop',
    label: 'SWOP',
    primaries: [
      { x: 0.63, y: 0.34 },
      { x: 0.21, y: 0.69 },
      { x: 0.155, y: 0.07 },
    ],
    whitePoint: { x: 0.315, y: 0.335 },
    description: 'Specifications for Web Offset Printing. North American standard.',
  },
  {
    id: 'gracol',
    label: 'GRACoL',
    primaries: [
      { x: 0.64, y: 0.34 },
      { x: 0.21, y: 0.7 },
      { x: 0.15, y: 0.06 },
    ],
    whitePoint: { x: 0.313, y: 0.33 },
    description: 'General Requirements for Commercial Offset Lithography.',
  },
];

const PROFILE_COLORS = ['#22d3ee', '#f472b6', '#a78bfa', '#34d399', '#fb923c', '#facc15', '#f87171'];

export function ICCProfileComparison() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<string[]>(['srgb', 'adobergb']);
  const [referenceHex, setReferenceHex] = useState('#0066cc');

  const toggleProfile = useCallback(
    (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 4 ? [...prev, id] : prev
      );
    },
    []
  );

  const refRgb = hexToRgb(referenceHex) ?? { r: 0, g: 102, b: 204 };

  const drawDiagram = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const pad = 50;
    const toX = (x: number) => pad + x * (W - 2 * pad);
    const toY = (y: number) => H - pad - y * (H - 2 * pad);

    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.fillRect(0, 0, W, H);

    const locusPoints = [
      [0.1741, 0.005], [0.1714, 0.0046], [0.1668, 0.0048], [0.1582, 0.0063],
      [0.1452, 0.0109], [0.1295, 0.0201], [0.1124, 0.0358], [0.0957, 0.0603],
      [0.0774, 0.0963], [0.0597, 0.14], [0.0461, 0.1875], [0.0353, 0.242],
      [0.0265, 0.305], [0.0196, 0.37], [0.0142, 0.435], [0.01, 0.5],
      [0.0072, 0.566], [0.005, 0.63], [0.0038, 0.695], [0.0035, 0.76],
      [0.0047, 0.825], [0.0075, 0.89], [0.013, 0.945], [0.022, 0.98],
      [0.035, 0.995], [0.057, 0.99], [0.091, 0.965], [0.136, 0.92],
      [0.185, 0.86], [0.235, 0.79], [0.285, 0.71], [0.33, 0.63],
      [0.37, 0.55], [0.4, 0.47], [0.425, 0.4], [0.445, 0.33],
      [0.46, 0.27], [0.47, 0.21], [0.475, 0.165], [0.478, 0.125],
      [0.479, 0.09], [0.478, 0.06], [0.476, 0.035], [0.472, 0.018],
    ];
    ctx.beginPath();
    ctx.moveTo(toX(locusPoints[0][0]), toY(locusPoints[0][1]));
    for (const pt of locusPoints) ctx.lineTo(toX(pt[0]), toY(pt[1]));
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    selected.forEach((pid, idx) => {
      const profile = ICC_PROFILES.find((p) => p.id === pid);
      if (!profile) return;
      const color = PROFILE_COLORS[idx % PROFILE_COLORS.length];
      ctx.beginPath();
      ctx.moveTo(toX(profile.primaries[0].x), toY(profile.primaries[0].y));
      for (let i = 1; i < profile.primaries.length; i++) {
        ctx.lineTo(toX(profile.primaries[i].x), toY(profile.primaries[i].y));
      }
      ctx.closePath();
      ctx.fillStyle = color + '20';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      profile.primaries.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(toX(pt.x), toY(pt.y), 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      ctx.beginPath();
      ctx.arc(toX(profile.whitePoint.x), toY(profile.whitePoint.y), 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '11px sans-serif';
    ctx.fillText('CIE x →', W - 70, H - 15);
    ctx.save();
    ctx.translate(12, 70);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('CIE y →', 0, 0);
    ctx.restore();
  }, [selected]);

  useState(() => {
    drawDiagram();
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2 mb-4">
        <Monitor size={20} style={{ color: '#a78bfa' }} /> ICC Profile Comparison
      </h3>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {ICC_PROFILES.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => toggleProfile(p.id)}
            className={`btn btn-sm d-flex align-items-center gap-1 ${selected.includes(p.id) ? 'text-white' : ''}`}
            style={selected.includes(p.id)
              ? { backgroundColor: PROFILE_COLORS[idx % PROFILE_COLORS.length] + '30', borderColor: PROFILE_COLORS[idx % PROFILE_COLORS.length], color: '#000' }
              : { border: '1px solid #dee2e6' }
            }
          >
            <span
              className="rounded-circle d-inline-block"
              style={{ width: '8px', height: '8px', backgroundColor: PROFILE_COLORS[idx % PROFILE_COLORS.length] }}
            />
            {p.label}
          </button>
        ))}
      </div>

      <div className="d-flex align-items-center gap-2 mb-4">
        <label className="text-sm text-muted">Reference color:</label>
        <input
          type="color"
          value={referenceHex}
          onChange={(e) => setReferenceHex(e.target.value)}
          className="form-control form-control-color"
          style={{ width: '32px', height: '32px', padding: 0, border: 'none' }}
        />
        <input
          type="text"
          value={referenceHex}
          onChange={(e) => setReferenceHex(e.target.value)}
          className="form-control form-control-sm text-uppercase"
          style={{ width: '96px' }}
          maxLength={7}
        />
      </div>

      <div className="border rounded-xl overflow-hidden mb-4" style={{ backgroundColor: '#000' }}>
        <canvas ref={canvasRef} width={500} height={400} className="w-100" style={{ height: 'auto' }} />
      </div>

      <div className="row g-3">
        {selected.map((pid, idx) => {
          const profile = ICC_PROFILES.find((p) => p.id === pid);
          if (!profile) return null;
          const color = PROFILE_COLORS[idx % PROFILE_COLORS.length];
          const sim = simulateCB(refRgb.r, refRgb.g, refRgb.b, [
            [profile.primaries[0].x / profile.whitePoint.x, 0, 0],
            [0, profile.primaries[1].y / profile.whitePoint.y, 0],
            [0, 0, 1],
          ]);
          return (
            <div key={pid} className="col-12 col-sm-6">
              <div className="border rounded-lg p-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: color }} />
                  <span className="text-sm fw-semibold">{profile.label}</span>
                </div>
                <p className="text-xs text-muted mb-2">{profile.description}</p>
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded" style={{ width: '32px', height: '32px', backgroundColor: referenceHex }} />
                  <span className="text-muted">→</span>
                  <div className="rounded" style={{ width: '32px', height: '32px', backgroundColor: rgbToHex(sim.r, sim.g, sim.b) }} />
                  <span style={{ fontSize: '10px', color: '#6c757d' }}>
                    ({rgbToHex(sim.r, sim.g, sim.b).toUpperCase()})
                  </span>
                </div>
                <p className="mt-1" style={{ fontSize: '10px', color: '#6c757d' }}>
                  White: ({profile.whitePoint.x.toFixed(3)}, {profile.whitePoint.y.toFixed(3)})
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   4. Safe Font List
   ═══════════════════════════════════════════════════════ */

type FontCategory = 'Serif' | 'Sans-serif' | 'Script' | 'Decorative' | 'Monospace';

interface FontEntry {
  name: string;
  category: FontCategory;
  windows: boolean;
  mac: boolean;
  linux: boolean;
  web: boolean;
  safeAlt: string;
}

const FONT_DB: FontEntry[] = [
  { name: 'Times New Roman', category: 'Serif', windows: true, mac: true, linux: true, web: true, safeAlt: 'Georgia' },
  { name: 'Georgia', category: 'Serif', windows: true, mac: true, linux: true, web: true, safeAlt: 'Times New Roman' },
  { name: 'Garamond', category: 'Serif', windows: true, mac: true, linux: false, web: false, safeAlt: 'Georgia' },
  { name: 'Palatino Linotype', category: 'Serif', windows: true, mac: true, linux: false, web: false, safeAlt: 'Georgia' },
  { name: 'Book Antiqua', category: 'Serif', windows: true, mac: false, linux: false, web: false, safeAlt: 'Georgia' },
  { name: 'Cambria', category: 'Serif', windows: true, mac: true, linux: true, web: false, safeAlt: 'Georgia' },
  { name: 'Baskerville', category: 'Serif', windows: true, mac: true, linux: false, web: false, safeAlt: 'Georgia' },
  { name: 'Didot', category: 'Serif', windows: false, mac: true, linux: false, web: false, safeAlt: 'Georgia' },
  { name: 'Hoefler Text', category: 'Serif', windows: false, mac: true, linux: false, web: false, safeAlt: 'Georgia' },
  { name: 'Crimson Text', category: 'Serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'Merriweather', category: 'Serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'Playfair Display', category: 'Serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'Lora', category: 'Serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'PT Serif', category: 'Serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'Libre Baskerville', category: 'Serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'Noto Serif', category: 'Serif', windows: false, mac: false, linux: true, web: true, safeAlt: 'Georgia' },
  { name: 'Source Serif Pro', category: 'Serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'EB Garamond', category: 'Serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'Old Standard TT', category: 'Serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'Cardo', category: 'Serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'Arial', category: 'Sans-serif', windows: true, mac: true, linux: true, web: true, safeAlt: 'Helvetica' },
  { name: 'Helvetica', category: 'Sans-serif', windows: false, mac: true, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Verdana', category: 'Sans-serif', windows: true, mac: true, linux: true, web: true, safeAlt: 'Arial' },
  { name: 'Tahoma', category: 'Sans-serif', windows: true, mac: true, linux: true, web: false, safeAlt: 'Arial' },
  { name: 'Trebuchet MS', category: 'Sans-serif', windows: true, mac: true, linux: true, web: false, safeAlt: 'Arial' },
  { name: 'Impact', category: 'Sans-serif', windows: true, mac: true, linux: true, web: true, safeAlt: 'Arial Black' },
  { name: 'Comic Sans MS', category: 'Sans-serif', windows: true, mac: true, linux: false, web: false, safeAlt: 'Arial' },
  { name: 'Lucida Sans', category: 'Sans-serif', windows: true, mac: true, linux: false, web: false, safeAlt: 'Arial' },
  { name: 'Calibri', category: 'Sans-serif', windows: true, mac: true, linux: true, web: false, safeAlt: 'Arial' },
  { name: 'Segoe UI', category: 'Sans-serif', windows: true, mac: false, linux: false, web: false, safeAlt: 'Arial' },
  { name: 'Futura', category: 'Sans-serif', windows: false, mac: true, linux: false, web: false, safeAlt: 'Arial' },
  { name: 'Avenir', category: 'Sans-serif', windows: false, mac: true, linux: false, web: false, safeAlt: 'Arial' },
  { name: 'Gill Sans', category: 'Sans-serif', windows: false, mac: true, linux: false, web: false, safeAlt: 'Arial' },
  { name: 'Roboto', category: 'Sans-serif', windows: false, mac: false, linux: true, web: true, safeAlt: 'Arial' },
  { name: 'Open Sans', category: 'Sans-serif', windows: false, mac: false, linux: true, web: true, safeAlt: 'Arial' },
  { name: 'Lato', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Montserrat', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Poppins', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Inter', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Raleway', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Nunito', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Source Sans Pro', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Work Sans', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Quicksand', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'PT Sans', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Oswald', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Noto Sans', category: 'Sans-serif', windows: false, mac: false, linux: true, web: true, safeAlt: 'Arial' },
  { name: 'Ubuntu', category: 'Sans-serif', windows: false, mac: false, linux: true, web: true, safeAlt: 'Arial' },
  { name: 'Fira Sans', category: 'Sans-serif', windows: false, mac: false, linux: true, web: true, safeAlt: 'Arial' },
  { name: 'DM Sans', category: 'Sans-serif', windows: false, mac: false, linux: false, web: true, safeAlt: 'Arial' },
  { name: 'Brush Script MT', category: 'Script', windows: true, mac: true, linux: false, web: false, safeAlt: 'Comic Sans MS' },
  { name: 'Segoe Script', category: 'Script', windows: true, mac: false, linux: false, web: false, safeAlt: 'Comic Sans MS' },
  { name: 'Lucida Handwriting', category: 'Script', windows: true, mac: true, linux: false, web: false, safeAlt: 'Comic Sans MS' },
  { name: 'Papyrus', category: 'Script', windows: false, mac: true, linux: false, web: false, safeAlt: 'Comic Sans MS' },
  { name: 'Pacifico', category: 'Script', windows: false, mac: false, linux: false, web: true, safeAlt: 'Comic Sans MS' },
  { name: 'Dancing Script', category: 'Script', windows: false, mac: false, linux: false, web: true, safeAlt: 'Comic Sans MS' },
  { name: 'Satisfy', category: 'Script', windows: false, mac: false, linux: false, web: true, safeAlt: 'Comic Sans MS' },
  { name: 'Great Vibes', category: 'Script', windows: false, mac: false, linux: false, web: true, safeAlt: 'Comic Sans MS' },
  { name: 'Sacramento', category: 'Script', windows: false, mac: false, linux: false, web: true, safeAlt: 'Comic Sans MS' },
  { name: 'Caveat', category: 'Script', windows: false, mac: false, linux: false, web: true, safeAlt: 'Comic Sans MS' },
  { name: 'Kalam', category: 'Script', windows: false, mac: false, linux: false, web: true, safeAlt: 'Comic Sans MS' },
  { name: 'Indie Flower', category: 'Script', windows: false, mac: false, linux: false, web: true, safeAlt: 'Comic Sans MS' },
  { name: 'Arial Black', category: 'Decorative', windows: true, mac: true, linux: true, web: true, safeAlt: 'Impact' },
  { name: 'Cooper Black', category: 'Decorative', windows: true, mac: true, linux: false, web: false, safeAlt: 'Arial Black' },
  { name: 'Copperplate', category: 'Decorative', windows: false, mac: true, linux: false, web: false, safeAlt: 'Arial Black' },
  { name: 'Pristina', category: 'Decorative', windows: true, mac: true, linux: false, web: false, safeAlt: 'Arial Black' },
  { name: 'Kristen ITC', category: 'Decorative', windows: true, mac: false, linux: false, web: false, safeAlt: 'Arial Black' },
  { name: 'Algerian', category: 'Decorative', windows: true, mac: false, linux: false, web: false, safeAlt: 'Arial Black' },
  { name: 'Bodoni MT', category: 'Decorative', windows: true, mac: true, linux: false, web: false, safeAlt: 'Georgia' },
  { name: 'Rockwell', category: 'Decorative', windows: true, mac: true, linux: false, web: false, safeAlt: 'Courier New' },
  { name: 'Stencil', category: 'Decorative', windows: true, mac: false, linux: false, web: false, safeAlt: 'Arial Black' },
  { name: 'Playfair Display SC', category: 'Decorative', windows: false, mac: false, linux: false, web: true, safeAlt: 'Georgia' },
  { name: 'Courier New', category: 'Monospace', windows: true, mac: true, linux: true, web: true, safeAlt: 'Courier' },
  { name: 'Courier', category: 'Monospace', windows: true, mac: true, linux: true, web: true, safeAlt: 'Courier New' },
  { name: 'Consolas', category: 'Monospace', windows: true, mac: true, linux: false, web: false, safeAlt: 'Courier New' },
  { name: 'Lucida Console', category: 'Monospace', windows: true, mac: true, linux: false, web: false, safeAlt: 'Courier New' },
  { name: 'Monaco', category: 'Monospace', windows: false, mac: true, linux: false, web: false, safeAlt: 'Courier New' },
  { name: 'Menlo', category: 'Monospace', windows: false, mac: true, linux: false, web: false, safeAlt: 'Courier New' },
  { name: 'Fira Code', category: 'Monospace', windows: false, mac: false, linux: true, web: true, safeAlt: 'Courier New' },
  { name: 'Source Code Pro', category: 'Monospace', windows: false, mac: false, linux: false, web: true, safeAlt: 'Courier New' },
  { name: 'JetBrains Mono', category: 'Monospace', windows: false, mac: false, linux: false, web: true, safeAlt: 'Courier New' },
  { name: 'Inconsolata', category: 'Monospace', windows: false, mac: false, linux: false, web: true, safeAlt: 'Courier New' },
  { name: 'IBM Plex Mono', category: 'Monospace', windows: false, mac: false, linux: false, web: true, safeAlt: 'Courier New' },
  { name: 'Ubuntu Mono', category: 'Monospace', windows: false, mac: false, linux: true, web: true, safeAlt: 'Courier New' },
  { name: 'Space Mono', category: 'Monospace', windows: false, mac: false, linux: false, web: true, safeAlt: 'Courier New' },
];

const FONT_CATEGORIES: FontCategory[] = ['Serif', 'Sans-serif', 'Script', 'Decorative', 'Monospace'];

export function SafeFontList() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FontCategory | 'All'>('All');

  const filtered = FONT_DB.filter((f) => {
    const matchesQuery = f.name.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCategory === 'All' || f.category === activeCategory;
    return matchesQuery && matchesCat;
  });

  const PlatformDot = ({ available }: { available: boolean }) =>
    available ? (
      <CheckCircle className="inline" size={16} style={{ color: '#34d399' }} />
    ) : (
      <X className="inline" size={16} style={{ color: '#f8717160' }} />
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2 mb-4">
        <Type size={20} style={{ color: '#fbbf24' }} /> Safe Font List
      </h3>

      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search font name..."
          className="form-control form-control-sm"
          style={{ width: '256px' }}
        />
        <div className="d-flex flex-wrap gap-1">
          <button
            onClick={() => setActiveCategory('All')}
            className={`btn btn-sm ${activeCategory === 'All' ? 'btn-dark' : 'btn-outline-secondary'}`}
          >
            All ({FONT_DB.length})
          </button>
          {FONT_CATEGORIES.map((cat) => {
            const count = FONT_DB.filter((f) => f.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm ${activeCategory === cat ? 'btn-dark' : 'btn-outline-secondary'}`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-sm text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #dee2e6' }}>
              <th>Font</th>
              <th>Category</th>
              <th>Windows</th>
              <th>Mac</th>
              <th>Linux</th>
              <th>Web</th>
              <th>Safe Alt</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.name} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td className="fw-medium">{f.name}</td>
                <td className="text-muted text-xs">{f.category}</td>
                <td><PlatformDot available={f.windows} /></td>
                <td><PlatformDot available={f.mac} /></td>
                <td><PlatformDot available={f.linux} /></td>
                <td><PlatformDot available={f.web} /></td>
                <td className="text-muted text-xs">{f.safeAlt}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  No fonts found matching &quot;{query}&quot;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   5. Print Color Mixing Calculator
   ═══════════════════════════════════════════════════════ */

interface Ink {
  name: string;
  hex: string;
  cmyk: { c: number; m: number; y: number; k: number };
}

const INKS: Ink[] = [
  { name: 'Process Black', hex: '#000000', cmyk: { c: 0, m: 0, y: 0, k: 100 } },
  { name: 'Reflex Blue', hex: '#001489', cmyk: { c: 100, m: 80, y: 0, k: 30 } },
  { name: 'Warm Red', hex: '#f9423a', cmyk: { c: 0, m: 85, y: 75, k: 0 } },
  { name: 'Rubine Red', hex: '#ce1126', cmyk: { c: 0, m: 95, y: 85, k: 5 } },
  { name: 'Rhodamine Red', hex: '#e10098', cmyk: { c: 0, m: 90, y: 15, k: 0 } },
  { name: 'Purple', hex: '#660099', cmyk: { c: 50, m: 95, y: 0, k: 20 } },
  { name: 'Violet', hex: '#440099', cmyk: { c: 70, m: 95, y: 0, k: 20 } },
  { name: 'Blue 072', hex: '#0018a4', cmyk: { c: 100, m: 80, y: 0, k: 25 } },
  { name: 'Green', hex: '#00ab84', cmyk: { c: 80, m: 0, y: 50, k: 15 } },
  { name: 'Yellow', hex: '#fedd00', cmyk: { c: 0, m: 10, y: 95, k: 0 } },
  { name: 'Orange', hex: '#ff6900', cmyk: { c: 0, m: 60, y: 100, k: 0 } },
  { name: 'Transparent White', hex: '#f5f5f0', cmyk: { c: 0, m: 0, y: 2, k: 3 } },
];

function mixInks(
  target: { r: number; g: number; b: number },
  selectedInks: { ink: Ink; percent: number }[]
): { r: number; g: number; b: number } {
  let r = 0, g = 0, b = 0;
  const totalPercent = selectedInks.reduce((sum, s) => sum + s.percent, 0);
  if (totalPercent === 0) return { r: 0, g: 0, b: 0 };
  for (const { ink, percent } of selectedInks) {
    const weight = percent / totalPercent;
    const rgb = hexToRgb(ink.hex);
    if (rgb) {
      r += rgb.r * weight;
      g += rgb.g * weight;
      b += rgb.b * weight;
    }
  }
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

function autoMix(target: { r: number; g: number; b: number }, inks: Ink[]): number[] {
  const mix = new Array(inks.length).fill(0);
  const bestMix = [...mix];
  let bestDE = Infinity;

  for (let iter = 0; iter < 2000; iter++) {
    const idx = iter % inks.length;
    const step = iter < 500 ? 10 : iter < 1200 ? 5 : 1;
    mix[idx] = Math.min(100, mix[idx] + step);
    const result = mixInks(target, inks.map((ink, i) => ({ ink, percent: mix[i] })));
    const de = deltaE(target, result);
    if (de < bestDE) {
      bestDE = de;
      bestMix.forEach((_, i) => (bestMix[i] = mix[i]));
    }
    if (de < 1) break;
    if (mix[idx] >= 100) mix[idx] = 0;
  }

  return bestMix;
}

export function ColorMixCalculator() {
  const [targetHex, setTargetHex] = useState('#8b2252');
  const [percentages, setPercentages] = useState<number[]>(() => INKS.map(() => 0));
  const [autoResult, setAutoResult] = useState<number[] | null>(null);

  const targetRgb = hexToRgb(targetHex) ?? { r: 139, g: 34, b: 82 };

  const updatePercent = useCallback((idx: number, val: number) => {
    setPercentages((prev) => {
      const next = [...prev];
      next[idx] = Math.max(0, Math.min(100, val));
      return next;
    });
  }, []);

  const handleAutoMix = useCallback(() => {
    const result = autoMix(targetRgb, INKS);
    setPercentages(result);
    setAutoResult(result);
  }, [targetRgb]);

  const handleReset = useCallback(() => {
    setPercentages(INKS.map(() => 0));
    setAutoResult(null);
  }, []);

  const mixed = mixInks(
    targetRgb,
    INKS.map((ink, i) => ({ ink, percent: percentages[i] }))
  );
  const de = deltaE(targetRgb, mixed);
  const totalPct = percentages.reduce((a, b) => a + b, 0);

  const deQuality =
    de < 2 ? 'Excellent — indistinguishable to most eyes' :
    de < 5 ? 'Good — slight difference perceptible' :
    de < 10 ? 'Fair — noticeable difference' :
    'Poor — significant color shift';

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2 mb-4">
        <Droplets size={20} style={{ color: '#fb923c' }} /> Print Color Mixing Calculator
      </h3>

      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <div className="d-flex align-items-center gap-2">
          <label className="text-sm text-muted">Target Color:</label>
          <input
            type="color"
            value={targetHex}
            onChange={(e) => setTargetHex(e.target.value)}
            className="form-control form-control-color"
            style={{ width: '40px', height: '40px', padding: 0, border: 'none' }}
          />
          <input
            type="text"
            value={targetHex}
            onChange={(e) => setTargetHex(e.target.value)}
            className="form-control form-control-sm text-uppercase"
            style={{ width: '112px' }}
            maxLength={7}
          />
        </div>
        <button
          onClick={handleAutoMix}
          className="btn btn-sm"
          style={{ backgroundColor: '#fb923c20', color: '#c2410c' }}
        >
          Auto-Mix
        </button>
        <button
          onClick={handleReset}
          className="btn btn-sm d-flex align-items-center gap-1"
          style={{ border: '1px solid #dee2e6' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="row g-3 mb-4">
        {INKS.map((ink, idx) => (
          <div key={ink.name} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="border rounded-lg p-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="rounded" style={{ width: '20px', height: '20px', backgroundColor: ink.hex }} />
                <span className="text-xs fw-medium">{ink.name}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={percentages[idx]}
                  onChange={(e) => updatePercent(idx, Number(e.target.value))}
                  className="form-range flex-grow-1"
                  style={{ accentColor: '#fb923c' }}
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={percentages[idx]}
                  onChange={(e) => updatePercent(idx, Number(e.target.value))}
                  className="form-control form-control-sm text-center"
                  style={{ width: '56px' }}
                />
                <span style={{ fontSize: '10px', color: '#6c757d' }}>%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-xl p-4 mb-4">
        <div className="d-flex align-items-center gap-3 mb-2">
          <span className="text-xs text-muted">Total: {totalPct.toFixed(1)}%</span>
          <span className="text-xs text-muted">|</span>
          <span className="text-xs text-muted">Delta-E: <span className={`fw-bold ${de < 2 ? 'text-success' : de < 5 ? 'text-warning' : 'text-danger'}`}>{de.toFixed(1)}</span></span>
        </div>
        <p className="mb-3 text-xs text-muted">{deQuality}</p>

        <div className="d-flex align-items-center gap-4">
          <div className="text-center">
            <div className="mx-auto mb-1 rounded-xl" style={{ width: '80px', height: '80px', backgroundColor: targetHex, border: '1px solid rgba(0,0,0,0.1)' }} />
            <span style={{ fontSize: '10px', color: '#6c757d' }}>Target</span>
          </div>
          <span className="text-lg text-muted">→</span>
          <div className="text-center">
            <div
              className="mx-auto mb-1 rounded-xl"
              style={{ width: '80px', height: '80px', backgroundColor: rgbToHex(mixed.r, mixed.g, mixed.b), border: '1px solid rgba(0,0,0,0.1)' }}
            />
            <span style={{ fontSize: '10px', color: '#6c757d' }}>Mixed</span>
          </div>
        </div>
      </div>

      {autoResult && (
        <div className="rounded-xl p-3 text-sm" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534' }}>
          Auto-mix result:
          {INKS.map((ink, i) =>
            autoResult[i] > 0 ? (
              <span key={ink.name} className="ms-2 d-inline-flex align-items-center gap-1 text-xs">
                <span className="d-inline-block rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: ink.hex }} />
                {ink.name} {autoResult[i]}%
              </span>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
