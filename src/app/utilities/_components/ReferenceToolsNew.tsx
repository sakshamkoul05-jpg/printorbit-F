'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Search,
  Ruler,
  FileText,
  Scale,
  PenTool,
  LayoutGrid,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Printer,
  Download,
  RotateCcw,
} from 'lucide-react';

/* ============================================================
   1. ENVELOPE SIZE REFERENCE
   ============================================================ */

type EnvelopeSize = {
  name: string;
  category: string;
  mm: { w: number; h: number };
  inches: { w: number; h: number };
  fits: string;
  uses: string;
};

const envelopeData: EnvelopeSize[] = [
  { name: 'A0', category: 'A Series', mm: { w: 370, h: 520 }, inches: { w: 14.6, h: 20.5 }, fits: 'A0 paper (unfolded)', uses: 'Large format posters, artwork' },
  { name: 'A1', category: 'A Series', mm: { w: 260, h: 370 }, inches: { w: 10.2, h: 14.6 }, fits: 'A1 folded to A2', uses: 'Posters, large documents' },
  { name: 'A2', category: 'A Series', mm: { w: 174, h: 245 }, inches: { w: 6.9, h: 9.6 }, fits: 'A3 folded in half', uses: 'Invitations, reports' },
  { name: 'A3', category: 'A Series', mm: { w: 162, h: 229 }, inches: { w: 6.4, h: 9.0 }, fits: 'A4 folded in half', uses: 'Business mail, reports' },
  { name: 'A4', category: 'A Series', mm: { w: 110, h: 162 }, inches: { w: 4.3, h: 6.4 }, fits: 'A4 folded in thirds', uses: 'Standard letter mail' },
  { name: 'A5', category: 'A Series', mm: { w: 110, h: 162 }, inches: { w: 4.3, h: 6.4 }, fits: 'A5 paper (unfolded)', uses: 'Small invitations, cards' },
  { name: 'A6', category: 'A Series', mm: { w: 110, h: 152 }, inches: { w: 4.3, h: 6.0 }, fits: 'A4 quarter-fold', uses: 'Postcards, RSVP cards' },
  { name: 'A7', category: 'A Series', mm: { w: 102, h: 148 }, inches: { w: 4.0, h: 5.8 }, fits: 'A5 quarter-fold', uses: 'Greeting cards, small mailers' },
  { name: 'A8', category: 'A Series', mm: { w: 92, h: 130 }, inches: { w: 3.6, h: 5.1 }, fits: 'A5 eighth-fold', uses: 'Small note cards' },
  { name: 'A9', category: 'A Series', mm: { w: 81, h: 116 }, inches: { w: 3.2, h: 4.6 }, fits: 'A6 quarter-fold', uses: 'Gift enclosures' },
  { name: 'A10', category: 'A Series', mm: { w: 68, h: 102 }, inches: { w: 2.7, h: 4.0 }, fits: 'A6 eighth-fold', uses: 'Tiny enclosures, stamps' },

  { name: 'B0', category: 'B Series', mm: { w: 500, h: 707 }, inches: { w: 19.7, h: 27.8 }, fits: 'B0 paper (unfolded)', uses: 'Large format printing' },
  { name: 'B1', category: 'B Series', mm: { w: 353, h: 500 }, inches: { w: 13.9, h: 19.7 }, fits: 'B1 folded to B2', uses: 'Posters, displays' },
  { name: 'B2', category: 'B Series', mm: { w: 250, h: 353 }, inches: { w: 9.8, h: 13.9 }, fits: 'B3 folded in half', uses: 'Brochures, magazines' },
  { name: 'B3', category: 'B Series', mm: { w: 176, h: 250 }, inches: { w: 6.9, h: 9.8 }, fits: 'B4 folded in half', uses: 'Large letters, documents' },
  { name: 'B4', category: 'B Series', mm: { w: 125, h: 176 }, inches: { w: 4.9, h: 6.9 }, fits: 'B4 folded in thirds', uses: 'Standard mail, documents' },
  { name: 'B5', category: 'B Series', mm: { w: 125, h: 176 }, inches: { w: 4.9, h: 6.9 }, fits: 'B5 paper (unfolded)', uses: 'Letters, reports' },
  { name: 'B6', category: 'B Series', mm: { w: 125, h: 176 }, inches: { w: 4.9, h: 6.9 }, fits: 'B5 half-fold', uses: 'Small mail, brochures' },

  { name: 'C0', category: 'C Series', mm: { w: 324, h: 458 }, inches: { w: 12.8, h: 18.0 }, fits: 'C0 paper (unfolded)', uses: 'Large documents' },
  { name: 'C1', category: 'C Series', mm: { w: 324, h: 458 }, inches: { w: 12.8, h: 18.0 }, fits: 'A0 folded', uses: 'Large format mail' },
  { name: 'C2', category: 'C Series', mm: { w: 324, h: 458 }, inches: { w: 12.8, h: 18.0 }, fits: 'A1 folded', uses: 'Posters, large mail' },
  { name: 'C3', category: 'C Series', mm: { w: 324, h: 458 }, inches: { w: 12.8, h: 18.0 }, fits: 'A2 folded', uses: 'Large invitations' },
  { name: 'C4', category: 'C Series', mm: { w: 229, h: 324 }, inches: { w: 9.0, h: 12.8 }, fits: 'A4 unfolded (flat)', uses: 'Full A4 documents, contracts' },
  { name: 'C5', category: 'C Series', mm: { w: 162, h: 229 }, inches: { w: 6.4, h: 9.0 }, fits: 'A4 folded in half', uses: 'Standard A4 mail' },
  { name: 'C6', category: 'C Series', mm: { w: 114, h: 162 }, inches: { w: 4.5, h: 6.4 }, fits: 'A4 folded in thirds', uses: 'Standard letters' },
  { name: 'C7', category: 'C Series', mm: { w: 102, h: 148 }, inches: { w: 4.0, h: 5.8 }, fits: 'A5 folded in thirds', uses: 'Small letters, cards' },
  { name: 'C8', category: 'C Series', mm: { w: 102, h: 148 }, inches: { w: 4.0, h: 5.8 }, fits: 'A5 eighth-fold', uses: 'Note cards' },
  { name: 'C9', category: 'C Series', mm: { w: 81, h: 116 }, inches: { w: 3.2, h: 4.6 }, fits: 'A6 folded', uses: 'Small enclosures' },
  { name: 'C10', category: 'C Series', mm: { w: 68, h: 102 }, inches: { w: 2.7, h: 4.0 }, fits: 'A7 folded', uses: 'Gift tags, stamps' },

  { name: 'DL', category: 'Common', mm: { w: 110, h: 220 }, inches: { w: 4.3, h: 8.7 }, fits: 'A4 folded in thirds', uses: 'Most common business envelope' },
  { name: 'E4', category: 'Common', mm: { w: 162, h: 229 }, inches: { w: 6.4, h: 9.0 }, fits: 'A4 folded in half', uses: 'Brochures, documents' },

  { name: '3½×5½', category: 'Indian', mm: { w: 89, h: 140 }, inches: { w: 3.5, h: 5.5 }, fits: 'Small cards', uses: 'Wedding cards, greeting cards' },
  { name: '4×6', category: 'Indian', mm: { w: 102, h: 152 }, inches: { w: 4.0, h: 6.0 }, fits: 'Postcards', uses: 'Standard Indian mail' },
  { name: '4¼×5½', category: 'Indian', mm: { w: 108, h: 140 }, inches: { w: 4.25, h: 5.5 }, fits: 'Invitation cards', uses: 'Wedding invitations' },
  { name: '5×7', category: 'Indian', mm: { w: 127, h: 178 }, inches: { w: 5.0, h: 7.0 }, fits: 'A5 paper', uses: 'Formal invitations' },
  { name: '5½×8½', category: 'Indian', mm: { w: 140, h: 216 }, inches: { w: 5.5, h: 8.5 }, fits: 'A5 folded', uses: 'Standard Indian letter' },
  { name: '6×9', category: 'Indian', mm: { w: 152, h: 229 }, inches: { w: 6.0, h: 9.0 }, fits: 'A4 half-fold', uses: 'Catalogs, booklets' },
];

function EnvelopeSizeReference() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedEnvelope, setExpandedEnvelope] = useState<string | null>(null);
  const [compareEnvelope, setCompareEnvelope] = useState<EnvelopeSize | null>(null);
  const a4WidthMm = 210;
  const a4HeightMm = 297;

  const categories = ['All', ...Array.from(new Set(envelopeData.map((e) => e.category)))];

  const filtered = envelopeData.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.uses.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Ruler className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Envelope Size Reference</h2>
          <p className="text-sm text-gray-500">Complete guide to standard envelope sizes</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search envelopes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Dimensions (mm)</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Dimensions (in)</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Fits</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Common Uses</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Compare</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((env) => (
              <tr
                key={env.name}
                className={`hover:bg-gray-50 cursor-pointer transition-colors ${expandedEnvelope === env.name ? 'bg-indigo-50' : ''}`}
                onClick={() =>
                  setExpandedEnvelope(expandedEnvelope === env.name ? null : env.name)
                }
              >
                <td className="px-4 py-3 font-semibold text-gray-900">{env.name}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {env.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {env.mm.w} × {env.mm.h}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {env.inches.w} × {env.inches.h}
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">{env.fits}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{env.uses}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompareEnvelope(compareEnvelope?.name === env.name ? null : env);
                    }}
                    className={`px-2 py-1 text-xs rounded-md transition-colors ${
                      compareEnvelope?.name === env.name
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {compareEnvelope?.name === env.name ? 'Hide' : 'View vs A4'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compareEnvelope && (
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-500" />
            Visual Comparison: {compareEnvelope.name} vs A4 Paper
          </h3>
          <div className="flex items-end justify-center gap-8">
            <div className="text-center">
              <div
                className="border-2 border-indigo-400 border-dashed rounded mb-2 mx-auto"
                style={{
                  width: `${compareEnvelope.mm.w * 0.8}px`,
                  height: `${compareEnvelope.mm.h * 0.8}px`,
                  minHeight: '40px',
                }}
              />
              <p className="text-sm font-medium text-indigo-600">{compareEnvelope.name}</p>
              <p className="text-xs text-gray-500">
                {compareEnvelope.mm.w} × {compareEnvelope.mm.h} mm
              </p>
            </div>
            <div className="text-center">
              <div
                className="border-2 border-gray-300 rounded mb-2 mx-auto"
                style={{
                  width: `${a4WidthMm * 0.8}px`,
                  height: `${a4HeightMm * 0.8}px`,
                }}
              />
              <p className="text-sm font-medium text-gray-600">A4</p>
              <p className="text-xs text-gray-500">
                {a4WidthMm} × {a4HeightMm} mm
              </p>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            Area: {compareEnvelope.mm.w * compareEnvelope.mm.h} mm² (
            {((compareEnvelope.mm.w * compareEnvelope.mm.h) / (a4WidthMm * a4HeightMm) * 100).toFixed(1)}% of A4)
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400">
        Showing {filtered.length} of {envelopeData.length} envelope sizes
      </p>
    </div>
  );
}

/* ============================================================
   2. PRINT RESOLUTION REFERENCE
   ============================================================ */

type ProductDPI = {
  product: string;
  recommendedDPI: number;
  minimumDPI: number;
  colorMode: string;
  fileFormat: string;
  typicalFileSize: string;
  details: string;
};

const productDPIs: ProductDPI[] = [
  { product: 'Business Cards', recommendedDPI: 300, minimumDPI: 250, colorMode: 'CMYK', fileFormat: 'PDF/X-1a', typicalFileSize: '1-5 MB', details: 'Small format, high detail. 300 DPI ensures crisp text and sharp logos at close viewing distance.' },
  { product: 'Flyers (A5-A4)', recommendedDPI: 300, minimumDPI: 200, colorMode: 'CMYK', fileFormat: 'PDF/X-1a', typicalFileSize: '5-15 MB', details: 'Medium format promotional material. Viewed at arm\'s length, 300 DPI provides excellent quality.' },
  { product: 'Flyers (A3-A2)', recommendedDPI: 200, minimumDPI: 150, colorMode: 'CMYK', fileFormat: 'PDF/X-1a', typicalFileSize: '15-40 MB', details: 'Larger format flyers viewed from further away. 200 DPI is sufficient for most applications.' },
  { product: 'Posters (A1)', recommendedDPI: 150, minimumDPI: 100, colorMode: 'CMYK', fileFormat: 'PDF/X-1a', typicalFileSize: '30-80 MB', details: 'Large format, typically viewed from 1-2 meters. 150 DPI provides good quality at normal viewing distance.' },
  { product: 'Posters (A0+)', recommendedDPI: 100, minimumDPI: 72, colorMode: 'CMYK', fileFormat: 'PDF/X-1a', typicalFileSize: '50-150 MB', details: 'Very large format. Viewed from several meters, 100 DPI is adequate. Billboards may use as low as 30 DPI.' },
  { product: 'Banners (Indoor)', recommendedDPI: 150, minimumDPI: 100, colorMode: 'CMYK', fileFormat: 'PDF/TIFF', typicalFileSize: '20-60 MB', details: 'Indoor banners viewed at 1-3 meters. 150 DPI ensures text readability and image clarity.' },
  { product: 'Banners (Outdoor)', recommendedDPI: 72, minimumDPI: 30, colorMode: 'CMYK', fileFormat: 'PDF/TIFF', typicalFileSize: '10-30 MB', details: 'Outdoor banners viewed from 5+ meters. Lower DPI acceptable due to viewing distance.' },
  { product: 'Billboards', recommendedDPI: 30, minimumDPI: 15, colorMode: 'CMYK', fileFormat: 'PDF/TIFF', typicalFileSize: '5-20 MB', details: 'Viewed from 50+ meters. Very low DPI needed. Large images may only be 3000px wide.' },
  { product: 'T-Shirts (DTG)', recommendedDPI: 300, minimumDPI: 150, colorMode: 'RGB', fileFormat: 'PNG/TIFF', typicalFileSize: '5-20 MB', details: 'Direct-to-garment printing needs high resolution for detailed designs on fabric texture.' },
  { product: 'T-Shirts (Screen)', recommendedDPI: 150, minimumDPI: 100, colorMode: 'Spot Colors', fileFormat: 'AI/PDF', typicalFileSize: '1-5 MB', details: 'Screen printing uses spot colors. Vector files preferred. DPI less critical for solid areas.' },
  { product: 'Mugs', recommendedDPI: 300, minimumDPI: 200, colorMode: 'RGB', fileFormat: 'PNG/PDF', typicalFileSize: '2-8 MB', details: 'Small print area (approx 28×9 cm). High DPI needed for sharp text and fine details.' },
  { product: 'Stickers', recommendedDPI: 300, minimumDPI: 200, colorMode: 'CMYK', fileFormat: 'PDF/X-1a', typicalFileSize: '1-10 MB', details: 'Small format, close viewing. 300 DPI ensures clean cuts and crisp graphics.' },
  { product: 'Books (Text)', recommendedDPI: 300, minimumDPI: 250, colorMode: 'CMYK', fileFormat: 'PDF/X-4', typicalFileSize: '10-50 MB', details: 'Standard text and images in books. 300 DPI is industry standard for publication quality.' },
  { product: 'Magazines', recommendedDPI: 300, minimumDPI: 250, colorMode: 'CMYK', fileFormat: 'PDF/X-4', typicalFileSize: '20-100 MB', details: 'High-quality publication. Photography and detailed graphics require 300 DPI minimum.' },
  { product: 'Packaging (Folding Carton)', recommendedDPI: 300, minimumDPI: 250, colorMode: 'CMYK', fileFormat: 'PDF/X-4', typicalFileSize: '10-40 MB', details: 'Product packaging viewed up close. 300 DPI ensures brand quality and barcode readability.' },
  { product: 'Packaging (Flexible)', recommendedDPI: 200, minimumDPI: 150, colorMode: 'CMYK', fileFormat: 'PDF/X-4', typicalFileSize: '5-20 MB', details: 'Pouches and bags. Slightly lower DPI acceptable due to flexible viewing angles.' },
];

function PrintResolutionReference() {
  const [selectedProduct, setSelectedProduct] = useState<ProductDPI | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const simulateDPI = useCallback((dpi: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseSize = 200;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pixelSize = Math.max(1, Math.floor(300 / Math.max(dpi, 10)));

    for (let y = 0; y < baseSize; y += pixelSize) {
      for (let x = 0; x < baseSize; x += pixelSize) {
        const r = Math.min(255, 80 + (x * 0.4) + (y * 0.3) + Math.sin(x * 0.05) * 40);
        const g = Math.min(255, 120 + (x * 0.2) - (y * 0.2) + Math.cos(y * 0.05) * 30);
        const b = Math.min(255, 180 - (x * 0.3) + (y * 0.1) + Math.sin((x + y) * 0.03) * 50);
        ctx.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <FileText className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Print Resolution Reference</h2>
          <p className="text-sm text-gray-500">DPI requirements by product type</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('grid')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            viewMode === 'grid'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode('table')}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            viewMode === 'table'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Table View
        </button>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {productDPIs.map((p) => (
            <button
              key={p.product}
              onClick={() => {
                setSelectedProduct(selectedProduct?.product === p.product ? null : p);
                setTimeout(() => simulateDPI(p.recommendedDPI), 50);
              }}
              className={`text-left p-4 border rounded-lg transition-all ${
                selectedProduct?.product === p.product
                  ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 text-sm">{p.product}</span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    p.colorMode === 'CMYK'
                      ? 'bg-blue-100 text-blue-700'
                      : p.colorMode === 'RGB'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {p.colorMode}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-600">{p.recommendedDPI}</span>
                <span className="text-sm text-gray-500">DPI rec.</span>
                <span className="text-lg font-semibold text-gray-400">/</span>
                <span className="text-lg font-semibold text-gray-500">{p.minimumDPI}</span>
                <span className="text-xs text-gray-400">min</span>
              </div>
              <div className="mt-1 text-xs text-gray-400">{p.fileFormat} • ~{p.typicalFileSize}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Product</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Rec. DPI</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Min DPI</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Color</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Format</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">File Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productDPIs.map((p) => (
                <tr
                  key={p.product}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedProduct?.product === p.product ? 'bg-emerald-50' : ''
                  }`}
                  onClick={() => {
                    setSelectedProduct(selectedProduct?.product === p.product ? null : p);
                    setTimeout(() => simulateDPI(p.recommendedDPI), 50);
                  }}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{p.product}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600">{p.recommendedDPI}</td>
                  <td className="px-4 py-3 text-gray-500">{p.minimumDPI}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {p.colorMode}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{p.fileFormat}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{p.typicalFileSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProduct && (
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">{selectedProduct.product}</h3>
              <p className="text-sm text-gray-600 mb-4">{selectedProduct.details}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Recommended DPI</p>
                  <p className="text-2xl font-bold text-emerald-600">{selectedProduct.recommendedDPI}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Minimum DPI</p>
                  <p className="text-2xl font-bold text-amber-600">{selectedProduct.minimumDPI}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Color Mode</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedProduct.colorMode}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">File Format</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedProduct.fileFormat}</p>
                </div>
              </div>
            </div>
            <div className="lg:w-64">
              <p className="text-xs text-gray-500 mb-2 text-center">Quality simulation at {selectedProduct.recommendedDPI} DPI</p>
              <canvas
                ref={canvasRef}
                width={200}
                height={200}
                className="w-full border border-gray-200 rounded-lg"
              />
              <p className="text-xs text-gray-400 mt-1 text-center">Zoom in to see pixel-level detail</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   3. SUBSTRATE WEIGHT CALCULATOR
   ============================================================ */

const paperSizes: { name: string; w: number; h: number }[] = [
  { name: 'A0', w: 841, h: 1189 },
  { name: 'A1', w: 594, h: 841 },
  { name: 'A2', w: 420, h: 594 },
  { name: 'A3', w: 297, h: 420 },
  { name: 'A4', w: 210, h: 297 },
  { name: 'A5', w: 148, h: 210 },
  { name: 'A6', w: 105, h: 148 },
  { name: 'A7', w: 74, h: 105 },
  { name: 'A8', w: 52, h: 74 },
  { name: 'A9', w: 37, h: 52 },
  { name: 'A10', w: 26, h: 37 },
];

const commonPaperTypes = [
  { name: 'Newsprint', gsmRange: [35, 55], description: 'Newspapers, cheap inserts' },
  { name: 'Book Paper', gsmRange: [60, 90], description: 'Novels, manuals' },
  { name: 'Copy Paper', gsmRange: [75, 90], description: 'Everyday printing' },
  { name: 'Premium Matte', gsmRange: [100, 160], description: 'Brochures, presentations' },
  { name: 'Text/Silk', gsmRange: [100, 170], description: 'Annual reports, booklets' },
  { name: 'Cover Stock', gsmRange: [170, 250], description: 'Business cards, postcards' },
  { name: 'Cardstock', gsmRange: [250, 400], description: 'Greeting cards, packaging' },
  { name: 'Paperboard', gsmRange: [400, 600], description: 'Boxes, rigid packaging' },
  { name: 'Corrugated', gsmRange: [600, 1200], description: 'Shipping boxes' },
];

const comparisons = [
  { name: 'Tissue paper', gsm: 15, emoji: '' },
  { name: 'Newspaper', gsm: 45, emoji: '' },
  { name: 'Copy paper', gsm: 80, emoji: '' },
  { name: 'Magazine page', gsm: 115, emoji: '' },
  { name: 'Business card', gsm: 350, emoji: '' },
  { name: 'Credit card', gsm: 800, emoji: '' },
];

function SubstrateWeightCalculator() {
  const [gsm, setGsm] = useState(80);
  const [selectedSize, setSelectedSize] = useState('A4');
  const [customW, setCustomW] = useState(210);
  const [customH, setCustomH] = useState(297);
  const [isCustom, setIsCustom] = useState(false);

  const size = isCustom
    ? { name: 'Custom', w: customW, h: customH }
    : paperSizes.find((s) => s.name === selectedSize) || paperSizes[4];

  const areaM2 = (size.w * size.h) / 1000000;
  const weightPerSheet = gsm * areaM2;
  const reamWeight = weightPerSheet * 500;
  const sheetsPerKg = weightPerSheet > 0 ? 1000 / weightPerSheet : 0;

  const currentPaperType = commonPaperTypes.find(
    (t) => gsm >= t.gsmRange[0] && gsm <= t.gsmRange[1]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Scale className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Substrate Weight Calculator</h2>
          <p className="text-sm text-gray-500">Paper weight conversions and references</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paper Weight (GSM)
            </label>
            <input
              type="number"
              value={gsm}
              onChange={(e) => setGsm(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
              min={1}
              max={2000}
            />
            <input
              type="range"
              min={10}
              max={1000}
              value={Math.min(gsm, 1000)}
              onChange={(e) => setGsm(parseInt(e.target.value))}
              className="w-full mt-2 accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>10 GSM</span>
              <span>1000 GSM</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paper Size</label>
            <div className="flex items-center gap-2 mb-2">
              <select
                value={isCustom ? 'custom' : selectedSize}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setIsCustom(true);
                  } else {
                    setIsCustom(false);
                    setSelectedSize(e.target.value);
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-amber-500"
              >
                {paperSizes.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} ({s.w}×{s.h} mm)
                  </option>
                ))}
                <option value="custom">Custom Size</option>
              </select>
            </div>
            {isCustom && (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={customW}
                  onChange={(e) => setCustomW(parseInt(e.target.value) || 1)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Width mm"
                />
                <span className="self-center text-gray-400">×</span>
                <input
                  type="number"
                  value={customH}
                  onChange={(e) => setCustomH(parseInt(e.target.value) || 1)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Height mm"
                />
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-gray-900">Calculation Results</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Per Sheet</p>
                <p className="text-lg font-bold text-amber-600">
                  {weightPerSheet < 1
                    ? `${(weightPerSheet * 1000).toFixed(1)} mg`
                    : `${weightPerSheet.toFixed(3)} g`}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Per Ream (500)</p>
                <p className="text-lg font-bold text-amber-600">{reamWeight.toFixed(2)} g</p>
                <p className="text-xs text-gray-400">= {(reamWeight / 1000).toFixed(2)} kg</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Sheets/kg</p>
                <p className="text-lg font-bold text-amber-600">
                  {sheetsPerKg > 10000
                    ? `${(sheetsPerKg / 1000).toFixed(1)}k`
                    : sheetsPerKg.toFixed(0)}
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {size.name}: {size.w}×{size.h} mm = {areaM2.toFixed(6)} m²
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Comparison to Common Items</h3>
            <div className="space-y-2">
              {comparisons.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-gray-600">{item.name}</span>
                  <div className="flex-1 relative h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-amber-200 rounded-full"
                      style={{ width: `${Math.min(100, (item.gsm / 1000) * 100)}%` }}
                    />
                    <div
                      className="absolute top-0 h-full w-0.5 bg-red-500"
                      style={{ left: `${Math.min(100, (gsm / 1000) * 100)}%` }}
                    />
                  </div>
                  <span className="w-16 text-xs text-gray-500 text-right">{item.gsm} g</span>
                </div>
              ))}
              <div className="flex items-center gap-3 border-t border-gray-200 pt-2">
                <span className="w-24 text-sm font-medium text-amber-700">Your paper</span>
                <div className="flex-1 relative h-6">
                  <div
                    className="absolute top-0 h-full w-1 bg-amber-500 rounded"
                    style={{ left: `${Math.min(100, (gsm / 1000) * 100)}%` }}
                  />
                </div>
                <span className="w-16 text-sm font-medium text-amber-700 text-right">{gsm} g</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Paper Type Match</h3>
            <div className="space-y-2">
              {commonPaperTypes.map((type) => {
                const isMatch = gsm >= type.gsmRange[0] && gsm <= type.gsmRange[1];
                return (
                  <div
                    key={type.name}
                    className={`p-2 rounded-lg text-sm ${
                      isMatch
                        ? 'bg-amber-50 border border-amber-300 ring-1 ring-amber-200'
                        : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className={`font-medium ${isMatch ? 'text-amber-900' : 'text-gray-700'}`}>
                        {type.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {type.gsmRange[0]}-{type.gsmRange[1]} GSM
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{type.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   4. FILE NAMING CONVENTION GENERATOR
   ============================================================ */

type NamingConvention = 'iso' | 'simple' | 'detailed';

const productTypes = [
  'Business Card', 'Flyer', 'Poster', 'Banner', 'Brochure', 'Booklet',
  'Catalog', 'Postcard', 'Letterhead', 'Envelope', 'Sticker', 'Label',
  'Package', 'T-Shirt', 'Mug', 'Calendar', 'Newsletter', 'Report',
];

const colorModes = ['CMYK', 'RGB', 'Spot'];
const specialFinishes = ['None', 'Matte', 'Gloss', 'UV Spot', 'Foil', 'Emboss', 'Deboss', 'Laminate'];

function FileNamingGenerator() {
  const [fields, setFields] = useState({
    client: '',
    jobNumber: '',
    productType: 'Business Card',
    size: '90x55mm',
    quantity: '500',
    dueDate: '',
    revision: '01',
    colorMode: 'CMYK',
    specialFinish: 'None',
  });
  const [convention, setConvention] = useState<NamingConvention>('iso');
  const [copied, setCopied] = useState(false);

  const generateFilename = useCallback(() => {
    const today = fields.dueDate || new Date().toISOString().split('T')[0].replace(/-/g, '');
    const cleanClient = fields.client.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase();
    const cleanJob = fields.jobNumber.replace(/[^a-zA-Z0-9]/g, '');
    const cleanProduct = fields.productType.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase();
    const cleanSize = fields.size.replace(/[^a-zA-Z0-9×x]/g, '').toLowerCase();
    const finish = fields.specialFinish === 'None' ? '' : `_${fields.specialFinish.toLowerCase()}`;

    switch (convention) {
      case 'iso':
        return `${cleanClient}_${cleanJob || '000'}_${cleanProduct}_${cleanSize}_${fields.quantity}pc_${today}_r${fields.revision}_${fields.colorMode.toLowerCase()}${finish}.pdf`;
      case 'simple':
        return `${cleanClient}_${cleanProduct}_${fields.quantity}pc_r${fields.revision}.pdf`;
      case 'detailed':
        return `${cleanClient}__${cleanJob || 'JOB000'}__${cleanProduct}__${cleanSize}__${fields.quantity}pcs__${today}__rev${fields.revision}__${fields.colorMode.toLowerCase()}${finish ? `__${fields.specialFinish.toLowerCase()}` : ''}.pdf`;
      default:
        return '';
    }
  }, [fields, convention]);

  const filename = generateFilename();

  const badExample = 'final FINAL v2 REAL final card.pdf';
  const goodExample = filename;

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(filename).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [filename]);

  const updateField = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-violet-100 rounded-lg">
          <PenTool className="w-6 h-6 text-violet-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Print File Naming Convention Generator</h2>
          <p className="text-sm text-gray-500">Generate standardized, industry-compliant filenames</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Naming Convention</label>
            <div className="flex gap-2">
              {([
                { key: 'iso' as NamingConvention, label: 'ISO Style', desc: 'Structured with delimiters' },
                { key: 'simple' as NamingConvention, label: 'Simple', desc: 'Short & quick' },
                { key: 'detailed' as NamingConvention, label: 'Detailed', desc: 'Double-underscore separated' },
              ]).map((c) => (
                <button
                  key={c.key}
                  onClick={() => setConvention(c.key)}
                  className={`flex-1 p-3 rounded-lg text-left transition-all ${
                    convention === c.key
                      ? 'bg-violet-50 border-2 border-violet-400 ring-2 ring-violet-100'
                      : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">{c.label}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
              <input
                type="text"
                value={fields.client}
                onChange={(e) => updateField('client', e.target.value)}
                placeholder="Acme Corp"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Number</label>
              <input
                type="text"
                value={fields.jobNumber}
                onChange={(e) => updateField('jobNumber', e.target.value)}
                placeholder="12345"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select
                value={fields.productType}
                onChange={(e) => updateField('productType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-violet-500"
              >
                {productTypes.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <input
                type="text"
                value={fields.size}
                onChange={(e) => updateField('size', e.target.value)}
                placeholder="90x55mm"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="text"
                value={fields.quantity}
                onChange={(e) => updateField('quantity', e.target.value)}
                placeholder="500"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={fields.dueDate}
                onChange={(e) => updateField('dueDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Revision</label>
              <input
                type="text"
                value={fields.revision}
                onChange={(e) => updateField('revision', e.target.value)}
                placeholder="01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color Mode</label>
              <select
                value={fields.colorMode}
                onChange={(e) => updateField('colorMode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-violet-500"
              >
                {colorModes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Finish</label>
              <select
                value={fields.specialFinish}
                onChange={(e) => updateField('specialFinish', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-violet-500"
              >
                {specialFinishes.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Generated Filename</h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-green-400 text-sm font-mono break-all leading-relaxed">{filename}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Naming Examples</h3>
            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-red-600 mb-1 block">❌ Bad Naming</span>
                <div className="bg-red-50 p-2 rounded border border-red-200">
                  <p className="text-xs font-mono text-red-700 break-all">{badExample}</p>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-green-600 mb-1 block">✅ Good Naming</span>
                <div className="bg-green-50 p-2 rounded border border-green-200">
                  <p className="text-xs font-mono text-green-700 break-all">{goodExample}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-violet-50 rounded-lg p-4 text-xs text-violet-700 space-y-1">
            <p className="font-medium text-violet-900">Tips:</p>
            <ul className="list-disc list-inside space-y-0.5 text-violet-600">
              <li>Use underscores, not spaces</li>
              <li>Keep client names consistent</li>
              <li>Always include revision numbers</li>
              <li>Include color mode for print files</li>
              <li>Avoid special characters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   5. MULTI-PAGE LAYOUT ARRANGER
   ============================================================ */

type BindingType = 'saddle-stitch' | 'perfect-bound' | 'wire-o';

function generateImposition(pages: number): { front: number[]; back: number[] }[] {
  const sheets: { front: number[]; back: number[] }[] = [];
  const totalPages = Math.ceil(pages / 4) * 4;

  if (totalPages <= 4) {
    return [{ front: [totalPages, 1], back: [2, totalPages - 1] }];
  }

  for (let sheet = 0; sheet < totalPages / 4; sheet++) {
    const frontLeft = totalPages - sheet * 2;
    const frontRight = sheet * 2 + 1;
    const backLeft = sheet * 2 + 2;
    const backRight = totalPages - sheet * 2 - 1;
    sheets.push({
      front: [frontLeft, frontRight],
      back: [backLeft, backRight],
    });
  }

  return sheets;
}

function MultiPageLayoutArranger() {
  const [pageCount, setPageCount] = useState(16);
  const [pageWidth, setPageWidth] = useState('210');
  const [pageHeight, setPageHeight] = useState('297');
  const [paperWidth, setPaperWidth] = useState('210');
  const [paperHeight, setPaperHeight] = useState('297');
  const [binding, setBinding] = useState<BindingType>('saddle-stitch');
  const [customPages, setCustomPages] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);

  const validPages = [4, 8, 12, 16, 20, 24, 32];
  const pages = customPages ? parseInt(customPages) || 4 : pageCount;
  const sheets = generateImposition(pages);
  const totalPages = Math.ceil(pages / 4) * 4;

  const pageW = parseInt(pageWidth) || 210;
  const pageH = parseInt(pageHeight) || 297;
  const paperW = parseInt(paperWidth) || 210;
  const paperH = parseInt(paperHeight) || 297;

  const scale = Math.min(120 / pageW, 180 / pageH);

  const exportSVG = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `imposition-layout-${pages}pages.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [pages]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-cyan-100 rounded-lg">
          <LayoutGrid className="w-6 h-6 text-cyan-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Multi-Page Layout Arranger</h2>
          <p className="text-sm text-gray-500">Page imposition for booklets and catalogs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Pages</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {validPages.map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setPageCount(n);
                    setCustomPages('');
                  }}
                  className={`py-2 text-sm rounded-lg font-medium transition-colors ${
                    pageCount === n && !customPages
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={customPages}
              onChange={(e) => setCustomPages(e.target.value)}
              placeholder="Custom page count"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              min={4}
              max={200}
              step={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Page Size (mm)</label>
              <div className="flex gap-1">
                <input
                  type="number"
                  value={pageWidth}
                  onChange={(e) => setPageWidth(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                  placeholder="W"
                />
                <input
                  type="number"
                  value={pageHeight}
                  onChange={(e) => setPageHeight(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                  placeholder="H"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Paper Size (mm)</label>
              <div className="flex gap-1">
                <input
                  type="number"
                  value={paperWidth}
                  onChange={(e) => setPaperWidth(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                  placeholder="W"
                />
                <input
                  type="number"
                  value={paperHeight}
                  onChange={(e) => setPaperHeight(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                  placeholder="H"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Binding Type</label>
            <div className="space-y-2">
              {([
                { key: 'saddle-stitch' as BindingType, label: 'Saddle Stitch', desc: 'Stapled at spine' },
                { key: 'perfect-bound' as BindingType, label: 'Perfect Bound', desc: 'Glued spine' },
                { key: 'wire-o' as BindingType, label: 'Wire-O', desc: 'Wire binding' },
              ]).map((b) => (
                <label
                  key={b.key}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    binding === b.key
                      ? 'border-cyan-400 bg-cyan-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="binding"
                    checked={binding === b.key}
                    onChange={() => setBinding(b.key)}
                    className="mr-3 accent-cyan-600"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">{b.label}</span>
                    <p className="text-xs text-gray-500">{b.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={exportSVG}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export Layout as SVG
          </button>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">
                {sheets.length} Sheet{sheets.length > 1 ? 's' : ''} ({totalPages} pages total, {pages} content)
              </h3>
              <span className="text-xs text-gray-500">
                {binding === 'saddle-stitch'
                  ? 'Folded & stapled at spine'
                  : binding === 'perfect-bound'
                    ? 'Pages glued at spine edge'
                    : 'Punched for wire binding'}
              </span>
            </div>

            <svg
              ref={svgRef}
              viewBox={`0 0 ${Math.max(sheets.length * 280, 560)} 420`}
              className="w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <style>
                {`.page-box { stroke: #374151; stroke-width: 1; fill: white; }
                .page-box-back { stroke: #374151; stroke-width: 1; fill: #f9fafb; }
                .page-num { font-size: 14px; font-family: monospace; fill: #374151; text-anchor: middle; dominant-baseline: central; }
                .page-num-blank { fill: #d1d5db; }
                .sheet-label { font-size: 11px; fill: #6b7280; text-anchor: middle; }
                .fold-line { stroke: #9ca3af; stroke-width: 1; stroke-dasharray: 4,3; }
                .spine-line { stroke: #ef4444; stroke-width: 2; }
                .binding-holes { fill: none; stroke: #9ca3af; stroke-width: 1; }`}
              </style>

              {sheets.map((sheet, si) => {
                const x0 = si * 280 + 20;
                const fw = paperW * scale;
                const fh = paperH * scale;
                const pw = pageW * scale;
                const ph = pageH * scale;
                const frontPages = sheet.front;
                const backPages = sheet.back;

                return (
                  <g key={si}>
                    {/* Front of sheet */}
                    <text x={x0 + fw / 2} y={16} className="sheet-label">
                      Sheet {si + 1} Front
                    </text>
                    <rect x={x0} y={24} width={fw} height={fh} className="page-box" rx={2} />
                    <line x1={x0 + fw / 2} y1={24} x2={x0 + fw / 2} y2={24 + fh} className="fold-line" />
                    <line x1={x0 + fw / 2 - 1} y1={24} x2={x0 + fw / 2 - 1} y2={24 + fh} className="spine-line" />

                    {/* Left page (front) */}
                    <rect
                      x={x0 + (fw - pw * 2) / 2}
                      y={24 + (fh - ph) / 2}
                      width={pw}
                      height={ph}
                      className="page-box"
                      fill="#f0f9ff"
                    />
                    <text
                      x={x0 + (fw - pw * 2) / 2 + pw / 2}
                      y={24 + fh / 2}
                      className="page-num"
                    >
                      {frontPages[0]}
                    </text>

                    {/* Right page (front) */}
                    <rect
                      x={x0 + (fw - pw * 2) / 2 + pw}
                      y={24 + (fh - ph) / 2}
                      width={pw}
                      height={ph}
                      className="page-box"
                      fill="#f0f9ff"
                    />
                    <text
                      x={x0 + (fw - pw * 2) / 2 + pw + pw / 2}
                      y={24 + fh / 2}
                      className="page-num"
                    >
                      {frontPages[1]}
                    </text>

                    {/* Back of sheet */}
                    <text x={x0 + fw / 2} y={24 + fh + 24} className="sheet-label">
                      Sheet {si + 1} Back
                    </text>
                    <rect x={x0} y={24 + fh + 32} width={fw} height={fh} className="page-box-back" rx={2} />
                    <line x1={x0 + fw / 2} y1={24 + fh + 32} x2={x0 + fw / 2} y2={24 + fh * 2 + 32} className="fold-line" />
                    <line x1={x0 + fw / 2 - 1} y1={24 + fh + 32} x2={x0 + fw / 2 - 1} y2={24 + fh * 2 + 32} className="spine-line" />

                    {/* Left page (back) */}
                    <rect
                      x={x0 + (fw - pw * 2) / 2}
                      y={24 + fh + 32 + (fh - ph) / 2}
                      width={pw}
                      height={ph}
                      className="page-box"
                      fill="#fefce8"
                    />
                    <text
                      x={x0 + (fw - pw * 2) / 2 + pw / 2}
                      y={24 + fh + 32 + fh / 2}
                      className="page-num"
                    >
                      {backPages[0]}
                    </text>

                    {/* Right page (back) */}
                    <rect
                      x={x0 + (fw - pw * 2) / 2 + pw}
                      y={24 + fh + 32 + (fh - ph) / 2}
                      width={pw}
                      height={ph}
                      className="page-box"
                      fill="#fefce8"
                    />
                    <text
                      x={x0 + (fw - pw * 2) / 2 + pw + pw / 2}
                      y={24 + fh + 32 + fh / 2}
                      className="page-num"
                    >
                      {backPages[1]}
                    </text>

                    {binding === 'wire-o' && (
                      <>
                        {Array.from({ length: 5 }).map((_, hi) => {
                          const hy = 24 + fh * 2 + 32 + 40 + hi * 30;
                          return (
                            <g key={hi}>
                              <circle cx={x0 + 8} cy={hy} r={3} className="binding-holes" />
                              <circle cx={x0 + fw - 8} cy={hy} r={3} className="binding-holes" />
                            </g>
                          );
                        })}
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-xs text-blue-600 mb-1">Front Pages (Blue)</p>
              <p className="text-sm font-medium text-blue-900">Printed on front of each sheet</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <p className="text-xs text-yellow-600 mb-1">Back Pages (Yellow)</p>
              <p className="text-sm font-medium text-yellow-900">Printed on back of each sheet</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-600 mb-1">Red Line = Spine</p>
              <p className="text-sm font-medium text-gray-900">Fold/staple edge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EXPORTS
   ============================================================ */

export {
  EnvelopeSizeReference,
  PrintResolutionReference,
  SubstrateWeightCalculator,
  FileNamingGenerator,
  MultiPageLayoutArranger,
};
