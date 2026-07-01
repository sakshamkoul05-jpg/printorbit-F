'use client';
import { useState, useRef, useCallback } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  Ruler,
  Droplets,
  Square,
  Circle,
  Pencil,
  Type,
  Scissors,
  Star,
  Heart,
  RectangleHorizontal,
  RotateCcw,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   1. Print File Preflight Checker
   ───────────────────────────────────────────── */

interface PreflightResult {
  label: string;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
}

const PRINT_SIZES = [
  { name: 'A4', w: 210, h: 297 },
  { name: 'A5', w: 148, h: 210 },
  { name: 'A6', w: 105, h: 148 },
  { name: 'Business Card', w: 85, h: 55 },
  { name: 'US Letter', w: 216, h: 279 },
  { name: 'Legal', w: 216, h: 356 },
  { name: 'DL', w: 99, h: 210 },
];

export default function PreflightChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<PreflightResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ w: number; h: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const analyze = useCallback((f: File) => {
    setLoading(true);
    const img = new Image();
    const url = URL.createObjectURL(f);
    setPreview(url);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const w = img.width;
      const h = img.height;
      setDimensions({ w, h });

      const res: PreflightResult[] = [];

      // --- RGB detection ---
      const imageData = ctx.getImageData(0, 0, w, h).data;
      let totalPixels = 0;
      let wideGamutCount = 0;
      const sampleStep = Math.max(1, Math.floor((w * h) / 10000));
      for (let i = 0; i < imageData.length; i += 4 * sampleStep) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        totalPixels++;
        if (
          (r > 200 && g < 80 && b < 80) ||
          (g > 200 && r < 80 && b < 80) ||
          (b > 200 && r < 80 && g < 80) ||
          (r > 200 && g > 200 && b < 50) ||
          (r > 200 && b > 200 && g < 50)
        ) {
          wideGamutCount++;
        }
      }
      const wideGamutRatio = wideGamutCount / totalPixels;
      if (wideGamutRatio > 0.1) {
        res.push({
          label: 'Color Space',
          status: 'warn',
          detail: 'Image appears to use RGB. Consider converting to CMYK for print.',
        });
      } else {
        res.push({
          label: 'Color Space',
          status: 'pass',
          detail: 'Image color range appears suitable for CMYK conversion.',
        });
      }

      // --- DPI estimation ---
      const COMMON_PRINT_DPI = 300;
      const LARGE_FORMAT_DPI = 150;
      const mmPerInch = 25.4;

      let bestFit = null;
      let bestFitScore = Infinity;
      for (const size of PRINT_SIZES) {
        const dpiW = (w / size.w) * mmPerInch;
        const dpiH = (h / size.h) * mmPerInch;
        const avgDpi = (dpiW + dpiH) / 2;
        const ratio = Math.abs(dpiW / dpiH - 1);
        if (ratio < 0.15 && avgDpi > 20) {
          const score = Math.abs(avgDpi - 300) + ratio * 100;
          if (score < bestFitScore) {
            bestFitScore = score;
            bestFit = { ...size, avgDpi: Math.round(avgDpi) };
          }
        }
      }

      if (bestFit) {
        const dpiThreshold = bestFit.w * bestFit.h > 200000 ? LARGE_FORMAT_DPI : COMMON_PRINT_DPI;
        const status = bestFit.avgDpi >= dpiThreshold ? 'pass' : bestFit.avgDpi >= dpiThreshold * 0.7 ? 'warn' : 'fail';
        res.push({
          label: `Estimated DPI (${bestFit.name})`,
          status,
          detail: `~${bestFit.avgDpi} DPI at ${bestFit.name} size (${bestFit.w}×${bestFit.h}mm). ${status === 'pass' ? 'Good for print.' : status === 'warn' ? 'May be acceptable for large format.' : 'Resolution too low for quality print.'}`,
        });
      } else {
        const estDpi = Math.round((w / 210) * mmPerInch);
        res.push({
          label: 'Estimated DPI',
          status: estDpi >= 300 ? 'pass' : estDpi >= 150 ? 'warn' : 'fail',
          detail: `~${estDpi} DPI estimated at A4 equivalent. No standard print size matched closely.`,
        });
      }

      // --- Resolution check ---
      const pixelsTotal = w * h;
      if (pixelsTotal < 1000000) {
        res.push({
          label: 'Total Resolution',
          status: 'fail',
          detail: `Only ${pixelsTotal.toLocaleString()} pixels. Very low for print.`,
        });
      } else if (pixelsTotal < 4000000) {
        res.push({
          label: 'Total Resolution',
          status: 'warn',
          detail: `${pixelsTotal.toLocaleString()} pixels. Adequate for small prints.`,
        });
      } else {
        res.push({
          label: 'Total Resolution',
          status: 'pass',
          detail: `${pixelsTotal.toLocaleString()} pixels. Good resolution for print.`,
        });
      }

      // --- Dimension match ---
      const matchedSizes: string[] = [];
      const tolerance = 0.05;
      for (const size of PRINT_SIZES) {
        const ratioW = w / ((size.w / mmPerInch) * 96);
        const ratioH = h / ((size.h / mmPerInch) * 96);
        if (Math.abs(ratioW - ratioH) < tolerance && ratioW > 0.8 && ratioW < 1.2) {
          matchedSizes.push(size.name);
        }
      }

      if (matchedSizes.length > 0) {
        res.push({
          label: 'Print Size Match',
          status: 'pass',
          detail: `Dimensions align with: ${matchedSizes.join(', ')}`,
        });
      } else {
        res.push({
          label: 'Print Size Match',
          status: 'warn',
          detail: 'No standard print size matched. Verify dimensions before printing.',
        });
      }

      // --- Aspect ratio ---
      const aspect = w / h;
      res.push({
        label: 'Aspect Ratio',
        status: 'pass',
        detail: `${aspect.toFixed(2)}:1 (${w}×${h}px)`,
      });

      // --- File size ---
      const fileSizeMB = f.size / (1024 * 1024);
      if (fileSizeMB < 0.5) {
        res.push({
          label: 'File Size',
          status: 'warn',
          detail: `${fileSizeMB.toFixed(2)} MB — may indicate heavy compression.`,
        });
      } else {
        res.push({
          label: 'File Size',
          status: 'pass',
          detail: `${fileSizeMB.toFixed(2)} MB — acceptable.`,
        });
      }

      setResults(res);
      setLoading(false);
    };

    img.src = url;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith('image/')) {
        setFile(f);
        analyze(f);
      }
    },
    [analyze],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) {
        setFile(f);
        analyze(f);
      }
    },
    [analyze],
  );

  const statusIcon = (s: 'pass' | 'warn' | 'fail') =>
    s === 'pass' ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : s === 'warn' ? (
      <AlertTriangle className="w-5 h-5 text-yellow-500" />
    ) : (
      <AlertTriangle className="w-5 h-5 text-red-500" />
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Ruler className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900">Print File Preflight Checker</h3>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all"
      >
        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
        <p className="text-sm text-gray-600">
          {file ? file.name : 'Drop an image file or click to upload'}
        </p>
        {dimensions && (
          <p className="text-xs text-gray-400 mt-1">
            {dimensions.w} × {dimensions.h} px
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {preview && (
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <img src={preview} alt="Preview" className="max-h-48 w-full object-contain bg-gray-100" />
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((r, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                r.status === 'pass'
                  ? 'bg-green-50 border-green-200'
                  : r.status === 'warn'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
              }`}
            >
              {statusIcon(r.status)}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">{r.label}</p>
                <p className="text-xs text-gray-600">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   2. CMYK Simulator
   ───────────────────────────────────────────── */

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function rgbToCmyk(r: number, g: number, b: number) {
  const rP = r / 255;
  const gP = g / 255;
  const bP = b / 255;
  const k = 1 - Math.max(rP, gP, bP);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = ((1 - rP - k) / (1 - k)) * 100;
  const m = ((1 - gP - k) / (1 - k)) * 100;
  const y = ((1 - bP - k) / (1 - k)) * 100;
  return {
    c: Math.round(c * 10) / 10,
    m: Math.round(m * 10) / 10,
    y: Math.round(y * 10) / 10,
    k: Math.round(k * 100 * 10) / 10,
  };
}

function cmykToRgb(c: number, m: number, y: number, k: number) {
  const cP = c / 100;
  const mP = m / 100;
  const yP = y / 100;
  const kP = k / 100;
  return {
    r: Math.round(255 * (1 - cP) * (1 - kP)),
    g: Math.round(255 * (1 - mP) * (1 - kP)),
    b: Math.round(255 * (1 - yP) * (1 - kP)),
  };
}

function rgbToLab(r: number, g: number, b: number) {
  let rP = r / 255;
  let gP = g / 255;
  let bP = b / 255;
  rP = rP > 0.04045 ? ((rP + 0.055) / 1.055) ** 2.4 : rP / 12.92;
  gP = gP > 0.04045 ? ((gP + 0.055) / 1.055) ** 2.4 : gP / 12.92;
  bP = bP > 0.04045 ? ((bP + 0.055) / 1.055) ** 2.4 : bP / 12.92;
  let x = (rP * 0.4124564 + gP * 0.3575761 + bP * 0.1804375) / 0.95047;
  let y = (rP * 0.2126729 + gP * 0.7151522 + bP * 0.072175) / 1.0;
  let z = (rP * 0.0193339 + gP * 0.119192 + bP * 0.9503041) / 1.08883;
  x = x > 0.008856 ? Math.cbrt(x) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.cbrt(y) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.cbrt(z) : 7.787 * z + 16 / 116;
  return { l: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z) };
}

function deltaE(lab1: { l: number; a: number; b: number }, lab2: { l: number; a: number; b: number }) {
  return Math.sqrt(
    (lab1.l - lab2.l) ** 2 + (lab1.a - lab2.a) ** 2 + (lab1.b - lab2.b) ** 2,
  );
}

export function CMYKSimulator() {
  const [hex, setHex] = useState('#FF6B35');
  const [customHex, setCustomHex] = useState('#FF6B35');

  const rgb = hexToRgb(hex);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const simulated = cmykToRgb(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
  const labRgb = rgbToLab(rgb.r, rgb.g, rgb.b);
  const labCmyk = rgbToLab(simulated.r, simulated.g, simulated.b);
  const de = deltaE(labRgb, labCmyk);
  const outOfGamut = de > 5;

  const swatch = (r: number, g: number, b: number) => `rgb(${r},${g},${b})`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Droplets className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">CMYK Simulator</h3>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">HEX Color:</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={hex}
            onChange={(e) => {
              setHex(e.target.value);
              setCustomHex(e.target.value);
            }}
            className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={customHex}
            onChange={(e) => {
              const v = e.target.value;
              setCustomHex(v);
              if (/^#[0-9A-Fa-f]{6}$/.test(v)) setHex(v);
            }}
            className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div
            className="h-24 rounded-xl border border-gray-200 shadow-sm"
            style={{ backgroundColor: swatch(rgb.r, rgb.g, rgb.b) }}
          />
          <p className="text-xs text-gray-500 mt-2 font-medium">RGB Original</p>
          <p className="text-xs font-mono text-gray-600">
            {rgb.r}, {rgb.g}, {rgb.b}
          </p>
        </div>
        <div className="text-center">
          <div
            className="h-24 rounded-xl border border-gray-200 shadow-sm"
            style={{ backgroundColor: swatch(simulated.r, simulated.g, simulated.b) }}
          />
          <p className="text-xs text-gray-500 mt-2 font-medium">CMYK Simulated</p>
          <p className="text-xs font-mono text-gray-600">
            {simulated.r}, {simulated.g}, {simulated.b}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <h4 className="text-sm font-semibold text-gray-700">CMYK Values</h4>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'C', value: cmyk.c, color: 'bg-cyan-100 text-cyan-700' },
            { label: 'M', value: cmyk.m, color: 'bg-pink-100 text-pink-700' },
            { label: 'Y', value: cmyk.y, color: 'bg-yellow-100 text-yellow-700' },
            { label: 'K', value: cmyk.k, color: 'bg-gray-200 text-gray-700' },
          ].map((c) => (
            <div key={c.label} className={`rounded-lg py-2 ${c.color}`}>
              <p className="text-xs font-bold">{c.label}</p>
              <p className="text-sm font-mono">{c.value}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-4 rounded-xl border ${outOfGamut ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
        <div className="flex items-center gap-2">
          {outOfGamut ? (
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Delta-E: {de.toFixed(2)} {outOfGamut ? '(Out of Gamut)' : '(Within Gamut)'}
            </p>
            <p className="text-xs text-gray-600">
              {de < 1
                ? 'Imperceptible difference.'
                : de < 3
                  ? 'Perceptible through close observation.'
                  : de < 6
                    ? 'Clearly perceptible.'
                    : 'Significant color shift. May print noticeably different.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3. Trap Width Calculator
   ───────────────────────────────────────────── */

const PAPER_TYPES = [
  { name: 'Coated', factor: 0.7 },
  { name: 'Uncoated', factor: 1.0 },
  { name: 'Newsprint', factor: 1.3 },
];

export function TrapWidthCalculator() {
  const [lpi, setLpi] = useState(150);
  const [paper, setPaper] = useState(0);
  const [colors, setColors] = useState(2);

  const dotGain = PAPER_TYPES[paper].factor;
  const baseTrap = (72 / lpi) * dotGain;
  const colorFactor = 0.5 + colors * 0.15;
  const trapWidth = Math.round(baseTrap * colorFactor * 100) / 100;
  const trapWidthPts = Math.round(trapWidth * 10) / 10;
  const trapWidthMm = Math.round((trapWidthPts * 0.3528) * 100) / 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Square className="w-5 h-5 text-green-500" />
        <h3 className="text-lg font-semibold text-gray-900">Trap Width Calculator</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Line Count (LPI)</label>
          <input
            type="number"
            value={lpi}
            onChange={(e) => setLpi(Number(e.target.value) || 1)}
            min={1}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Paper Type</label>
          <select
            value={paper}
            onChange={(e) => setPaper(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {PAPER_TYPES.map((p, i) => (
              <option key={i} value={i}>
                {p.name} (×{p.factor})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Overprint Colors</label>
          <input
            type="number"
            value={colors}
            onChange={(e) => setColors(Math.max(1, Number(e.target.value) || 1))}
            min={1}
            max={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
        <p className="text-sm font-semibold text-gray-900 mb-1">Recommended Trap Width</p>
        <p className="text-2xl font-bold text-green-600">{trapWidthPts} pts ({trapWidthMm} mm)</p>
      </div>

      {/* Visual Diagram */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <p className="text-xs font-medium text-gray-500 mb-3 text-center">Trap Visualization</p>
        <svg viewBox="0 0 300 120" className="w-full max-w-sm mx-auto">
          {/* Left rectangle */}
          <rect x={30} y={20} width={110} height={80} fill="#3B82F6" rx={2} opacity={0.8} />
          <text x={85} y={65} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">
            Color 1
          </text>

          {/* Trap overlap area */}
          <rect
            x={130}
            y={20}
            width={trapWidthPts * 3}
            height={80}
            fill="#8B5CF6"
            opacity={0.6}
          />
          <line
            x1={130}
            y1={15}
            x2={130}
            y2={105}
            stroke="#8B5CF6"
            strokeWidth={2}
            strokeDasharray="4,2"
          />

          {/* Right rectangle */}
          <rect x={130 + trapWidthPts * 3} y={20} width={110 - trapWidthPts * 3} height={80} fill="#EF4444" rx={2} opacity={0.8} />
          <text x={185} y={65} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">
            Color 2
          </text>

          {/* Trap dimension */}
          <line
            x1={130}
            y1={110}
            x2={130 + trapWidthPts * 3}
            y2={110}
            stroke="#374151"
            strokeWidth={1}
          />
          <text
            x={130 + (trapWidthPts * 1.5)}
            y={118}
            textAnchor="middle"
            fill="#374151"
            fontSize={9}
          >
            {trapWidthPts}pt
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   4. Spot UV Template Generator
   ───────────────────────────────────────────── */

type DrawTool = 'rect' | 'circle' | 'freehand' | 'text';
type DrawnShape =
  | { type: 'rect'; x: number; y: number; w: number; h: number }
  | { type: 'circle'; cx: number; cy: number; r: number }
  | { type: 'freehand'; points: { x: number; y: number }[] }
  | { type: 'text'; x: number; y: number; text: string };

export function SpotUVGenerator() {
  const [widthMm, setWidthMm] = useState(90);
  const [heightMm, setHeightMm] = useState(55);
  const [tool, setTool] = useState<DrawTool>('rect');
  const [shapes, setShapes] = useState<DrawnShape[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);
  const [textInput, setTextInput] = useState('UV');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const SCALE = 3;
  const canvasW = widthMm * SCALE;
  const canvasH = heightMm * SCALE;

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvasW,
      y: ((e.clientY - rect.top) / rect.height) * canvasH,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPos(e);
    if (tool === 'text') {
      const newText = prompt('Enter text for UV area:', textInput);
      if (newText) {
        setShapes((prev) => [...prev, { type: 'text', x: pos.x, y: pos.y, text: newText }]);
      }
      return;
    }
    setDrawing(true);
    setStart(pos);
    if (tool === 'freehand') setCurrentPoints([pos]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !start) return;
    const pos = getPos(e);
    if (tool === 'freehand') {
      setCurrentPoints((prev) => [...prev, pos]);
    }
    // For rect/circle, preview is handled in render
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !start) return;
    const pos = getPos(e);
    setDrawing(false);

    if (tool === 'rect') {
      const x = Math.min(start.x, pos.x);
      const y = Math.min(start.y, pos.y);
      const w = Math.abs(pos.x - start.x);
      const h = Math.abs(pos.y - start.y);
      if (w > 2 && h > 2) setShapes((prev) => [...prev, { type: 'rect', x, y, w, h }]);
    } else if (tool === 'circle') {
      const cx = (start.x + pos.x) / 2;
      const cy = (start.y + pos.y) / 2;
      const r = Math.sqrt((pos.x - start.x) ** 2 + (pos.y - start.y) ** 2) / 2;
      if (r > 2) setShapes((prev) => [...prev, { type: 'circle', cx, cy, r }]);
    } else if (tool === 'freehand' && currentPoints.length > 2) {
      setShapes((prev) => [...prev, { type: 'freehand', points: [...currentPoints] }]);
    }

    setStart(null);
    setCurrentPoints([]);
  };

  const renderShape = (s: DrawnShape, i: number, preview?: boolean) => {
    const opacity = preview ? 0.5 : 1;
    if (s.type === 'rect') {
      return (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width={s.w}
          height={s.h}
          fill="white"
          opacity={opacity}
        />
      );
    }
    if (s.type === 'circle') {
      return (
        <circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="white"
          opacity={opacity}
        />
      );
    }
    if (s.type === 'freehand') {
      const d = s.points.map((p, j) => `${j === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
      return (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="white"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={opacity}
        />
      );
    }
    if (s.type === 'text') {
      return (
        <text
          key={i}
          x={s.x}
          y={s.y}
          fill="white"
          fontSize={36}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          opacity={opacity}
        >
          {s.text}
        </text>
      );
    }
    return null;
  };

  const previewShape = () => {
    if (!drawing || !start || tool === 'freehand' || tool === 'text') return null;
    if (tool === 'rect') {
      return (
        <rect
          x={Math.min(start.x, (start.x))}
          y={Math.min(start.y, (start.y))}
          width={0}
          height={0}
          fill="white"
          opacity={0.5}
          className="pointer-events-none"
        />
      );
    }
    return null;
  };

  const exportPNG = () => {
    const cvs = document.createElement('canvas');
    cvs.width = canvasW;
    cvs.height = canvasH;
    const ctx = cvs.getContext('2d')!;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = 'white';

    for (const s of shapes) {
      if (s.type === 'rect') ctx.fillRect(s.x, s.y, s.w, s.h);
      if (s.type === 'circle') {
        ctx.beginPath();
        ctx.arc(s.cx, s.cy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (s.type === 'freehand') {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        s.points.forEach((p, j) => (j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.stroke();
      }
      if (s.type === 'text') {
        ctx.font = 'bold 36px Arial';
        ctx.fillText(s.text, s.x, s.y);
      }
    }

    const link = document.createElement('a');
    link.download = 'spot-uv-mask.png';
    link.href = cvs.toDataURL('image/png');
    link.click();
  };

  const toolButtons: { t: DrawTool; icon: React.ReactNode; label: string }[] = [
    { t: 'rect', icon: <Square className="w-4 h-4" />, label: 'Rectangle' },
    { t: 'circle', icon: <Circle className="w-4 h-4" />, label: 'Circle' },
    { t: 'freehand', icon: <Pencil className="w-4 h-4" />, label: 'Freehand' },
    { t: 'text', icon: <Type className="w-4 h-4" />, label: 'Text' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Droplets className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg font-semibold text-gray-900">Spot UV Template Generator</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Width (mm)</label>
          <input
            type="number"
            value={widthMm}
            onChange={(e) => setWidthMm(Math.max(10, Number(e.target.value) || 10))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (mm)</label>
          <input
            type="number"
            value={heightMm}
            onChange={(e) => setHeightMm(Math.max(10, Number(e.target.value) || 10))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {toolButtons.map(({ t, icon, label }) => (
          <button
            key={t}
            onClick={() => setTool(t)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              tool === t
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
        <button
          onClick={() => setShapes([])}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
      </div>

      <div className="flex justify-center bg-gray-900 rounded-xl p-4 overflow-auto">
        <canvas
          ref={canvasRef}
          width={canvasW}
          height={canvasH}
          style={{ width: Math.min(canvasW, 500), height: Math.min(canvasH, 500) * (canvasH / canvasW) }}
          className="border border-gray-700 cursor-crosshair rounded-lg"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            if (drawing) {
              setDrawing(false);
              setStart(null);
              setCurrentPoints([]);
            }
          }}
        />
      </div>

      {/* SVG preview */}
      <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
        <p className="text-xs font-medium text-gray-500 mb-2 text-center">Mask Preview (White = UV Area)</p>
        <div className="flex justify-center bg-black rounded-lg p-2">
          <svg
            viewBox={`0 0 ${canvasW} ${canvasH}`}
            style={{ width: Math.min(canvasW, 400), maxHeight: 200 }}
          >
            <rect width={canvasW} height={canvasH} fill="black" />
            {shapes.map((s, i) => renderShape(s, i))}
          </svg>
        </div>
      </div>

      <button
        onClick={exportPNG}
        disabled={shapes.length === 0}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <Download className="w-4 h-4" />
        Export PNG Mask ({widthMm}×{heightMm}mm)
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   5. Die-Cut Template Generator
   ───────────────────────────────────────────── */

type ShapeType = 'circle' | 'rounded-rect' | 'oval' | 'polygon' | 'heart' | 'star';

interface ShapeOption {
  type: ShapeType;
  label: string;
  icon: React.ReactNode;
}

const SHAPES: ShapeOption[] = [
  { type: 'circle', label: 'Circle', icon: <Circle className="w-4 h-4" /> },
  { type: 'rounded-rect', label: 'Rounded Rect', icon: <RectangleHorizontal className="w-4 h-4" /> },
  { type: 'oval', label: 'Oval', icon: <OvalIcon /> },
  { type: 'heart', label: 'Heart', icon: <Heart className="w-4 h-4" /> },
  { type: 'star', label: 'Star', icon: <Star className="w-4 h-4" /> },
  { type: 'polygon', label: 'Polygon (6)', icon: <HexIcon /> },
];

function OvalIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx={8} cy={8} rx={7} ry={5} />
    </svg>
  );
}

function HexIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="8,1 14,4 14,12 8,15 2,12 2,4" />
    </svg>
  );
}

function generateShapePath(
  shape: ShapeType,
  cx: number,
  cy: number,
  w: number,
  h: number,
  cornerRadius = 8,
): string {
  const hw = w / 2;
  const hh = h / 2;

  switch (shape) {
    case 'circle': {
      const r = Math.min(hw, hh);
      return `M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} Z`;
    }
    case 'rounded-rect': {
      const cr = Math.min(cornerRadius, hw, hh);
      return `M ${cx - hw + cr} ${cy - hh} L ${cx + hw - cr} ${cy - hh} Q ${cx + hw} ${cy - hh} ${cx + hw} ${cy - hh + cr} L ${cx + hw} ${cy + hh - cr} Q ${cx + hw} ${cy + hh} ${cx + hw - cr} ${cy + hh} L ${cx - hw + cr} ${cy + hh} Q ${cx - hw} ${cy + hh} ${cx - hw} ${cy + hh - cr} L ${cx - hw} ${cy - hh + cr} Q ${cx - hw} ${cy - hh} ${cx - hw + cr} ${cy - hh} Z`;
    }
    case 'oval':
      return `M ${cx + hw} ${cy} A ${hw} ${hh} 0 1 1 ${cx - hw} ${cy} A ${hw} ${hh} 0 1 1 ${cx + hw} ${cy} Z`;
    case 'heart': {
      const topY = cy - hh * 0.4;
      const botY = cy + hh;
      const leftX = cx - hw;
      const rightX = cx + hw;
      const cp1x = cx - hw * 0.2;
      const cp1y = cy - hh * 0.9;
      const cp2x = cx + hw * 0.2;
      const cp2y = cy - hh * 0.9;
      return `M ${cx} ${botY} C ${cx - hw * 1.2} ${cy} ${leftX} ${topY} ${cp1x} ${cp1y} C ${cp1x} ${topY - hh * 0.3} ${cx} ${topY - hh * 0.2} ${cx} ${topY + hh * 0.1} C ${cx} ${topY - hh * 0.2} ${cp2x} ${topY - hh * 0.3} ${cp2x} ${cp1y} C ${rightX} ${topY} ${cx + hw * 1.2} ${cy} ${cx} ${botY} Z`;
    }
    case 'star': {
      const points = 5;
      const outerR = Math.min(hw, hh);
      const innerR = outerR * 0.4;
      let d = '';
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (Math.PI / points) * i - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        d += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
      }
      return d + 'Z';
    }
    case 'polygon': {
      const sides = 6;
      const outerR = Math.min(hw, hh);
      let d = '';
      for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
        const x = cx + outerR * Math.cos(angle);
        const y = cy + outerR * Math.sin(angle);
        d += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
      }
      return d + 'Z';
    }
  }
}

export function DieCutTemplateGenerator() {
  const [shape, setShape] = useState<ShapeType>('rounded-rect');
  const [widthMm, setWidthMm] = useState(90);
  const [heightMm, setHeightMm] = useState(55);
  const [cornerRadius, setCornerRadius] = useState(8);
  const [showFold, setShowFold] = useState(false);
  const [bleedMm] = useState(3);
  const [safeMm] = useState(5);

  const SCALE = 3;
  const svgW = widthMm * SCALE;
  const svgH = heightMm * SCALE;
  const cx = svgW / 2;
  const cy = svgH / 2;
  const padding = 30 * SCALE / 3;

  const outerW = (widthMm + bleedMm * 2) * SCALE;
  const outerH = (heightMm + bleedMm * 2) * SCALE;
  const innerW = (widthMm - safeMm * 2) * SCALE;
  const innerH = (heightMm - safeMm * 2) * SCALE;

  const cutPath = generateShapePath(shape, cx, cy, svgW, svgH, cornerRadius * SCALE / 3);
  const bleedPath = generateShapePath(shape, cx, cy, outerW, outerH, (cornerRadius + bleedMm) * SCALE / 3);
  const safePath = generateShapePath(shape, cx, cy, innerW, innerH, Math.max(0, cornerRadius - safeMm) * SCALE / 3);

  const totalW = outerW + padding * 2;
  const totalH = outerH + padding * 2;
  const offsetX = (totalW - outerW) / 2;
  const offsetY = (totalH - outerH) / 2;

  const exportSVG = () => {
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" width="${totalW}" height="${totalH}">
  <rect width="${totalW}" height="${totalH}" fill="white"/>
  <g transform="translate(${offsetX}, ${offsetY})">
    <!-- Bleed line (green) -->
    <path d="${bleedPath}" fill="none" stroke="#22C55E" stroke-width="1.5" stroke-dasharray="8,4"/>
    <!-- Cut line (red) -->
    <path d="${cutPath}" fill="none" stroke="#EF4444" stroke-width="2"/>
    <!-- Safe zone (blue) -->
    <path d="${safePath}" fill="none" stroke="#3B82F6" stroke-width="1" stroke-dasharray="4,3"/>
    ${showFold ? `<!-- Fold line (blue dashed) -->
    <line x1="${offsetX + 10}" y1="${offsetY + totalH / 2 - offsetY}" x2="${offsetX + totalW - 20}" y2="${offsetY + totalH / 2 - offsetY}" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,3"/>` : ''}
    <!-- Center marks -->
    <line x1="${cx - 8}" y1="${cy}" x2="${cx + 8}" y2="${cy}" stroke="#374151" stroke-width="0.5"/>
    <line x1="${cx}" y1="${cy - 8}" x2="${cx}" y2="${cy + 8}" stroke="#374151" stroke-width="0.5"/>
    <!-- Dimensions -->
    <text x="${cx}" y="${totalH - 5}" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="Arial">${widthMm}mm × ${heightMm}mm</text>
  </g>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `die-cut-${shape}-${widthMm}x${heightMm}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Scissors className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-900">Die-Cut Template Generator</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
        <div className="grid grid-cols-3 gap-2">
          {SHAPES.map((s) => (
            <button
              key={s.type}
              onClick={() => setShape(s.type)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                shape === s.type
                  ? 'bg-red-100 text-red-700 border border-red-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Width (mm)</label>
          <input
            type="number"
            value={widthMm}
            onChange={(e) => setWidthMm(Math.max(10, Number(e.target.value) || 10))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (mm)</label>
          <input
            type="number"
            value={heightMm}
            onChange={(e) => setHeightMm(Math.max(10, Number(e.target.value) || 10))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {(shape === 'rounded-rect' || shape === 'oval') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Corner Radius (mm)</label>
          <input
            type="number"
            value={cornerRadius}
            onChange={(e) => setCornerRadius(Math.max(0, Number(e.target.value) || 0))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={showFold}
          onChange={(e) => setShowFold(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
        />
        Show fold line (horizontal center)
      </label>

      {/* SVG Preview */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 overflow-auto">
        <p className="text-xs font-medium text-gray-500 mb-3 text-center">Template Preview</p>
        <div className="flex justify-center">
          <svg
            viewBox={`0 0 ${totalW} ${totalH}`}
            style={{ width: Math.min(totalW, 500), maxHeight: 300 }}
            className="border border-gray-200 bg-white rounded-lg"
          >
            <g transform={`translate(${offsetX}, ${offsetY})`}>
              {/* Bleed */}
              <path d={bleedPath} fill="none" stroke="#22C55E" strokeWidth={1.5} strokeDasharray="8,4" />
              {/* Cut */}
              <path d={cutPath} fill="none" stroke="#EF4444" strokeWidth={2} />
              {/* Safe */}
              <path d={safePath} fill="none" stroke="#3B82F6" strokeWidth={1} strokeDasharray="4,3" />

              {showFold && (
                <line
                  x1={10}
                  y1={totalH / 2 - offsetY}
                  x2={totalW - 20}
                  y2={totalH / 2 - offsetY}
                  stroke="#3B82F6"
                  strokeWidth={1.5}
                  strokeDasharray="6,3"
                />
              )}

              {/* Center marks */}
              <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="#374151" strokeWidth={0.5} />
              <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke="#374151" strokeWidth={0.5} />

              {/* Dimensions */}
              <text x={cx} y={totalH - 5} textAnchor="middle" fill="#6B7280" fontSize={9} fontFamily="Arial">
                {widthMm}mm × {heightMm}mm
              </text>
            </g>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-red-500 inline-block" />
            Cut
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-green-500 inline-block border-t border-dashed border-green-500" />
            Bleed (3mm)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-blue-500 inline-block" style={{ borderTop: '1px dashed #3B82F6' }} />
            Safe (5mm)
          </span>
          {showFold && (
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 inline-block" style={{ borderTop: '1.5px dashed #3B82F6' }} />
              Fold
            </span>
          )}
        </div>
      </div>

      <button
        onClick={exportSVG}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
      >
        <Download className="w-4 h-4" />
        Export SVG Template
      </button>
    </div>
  );
}
