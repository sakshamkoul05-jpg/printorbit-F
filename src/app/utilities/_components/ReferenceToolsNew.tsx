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
    <div className="d-flex flex-column gap-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#e0e7ff' }}>
          <Ruler size={24} style={{ color: '#4f46e5' }} />
        </div>
        <div>
          <h2 className="fs-4 fw-bold" style={{ color: '#111827' }}>Envelope Size Reference</h2>
          <p className="text-sm text-secondary">Complete guide to standard envelope sizes</p>
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row gap-3">
        <div className="position-relative flex-fill">
          <Search size={16} className="position-absolute" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search envelopes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control text-sm"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-select text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="table-responsive border rounded-lg">
        <table className="table text-sm mb-0">
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Name</th>
              <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Category</th>
              <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Dimensions (mm)</th>
              <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Dimensions (in)</th>
              <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Fits</th>
              <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Common Uses</th>
              <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Compare</th>
            </tr>
          </thead>
          <tbody className="border-top">
            {filtered.map((env) => (
              <tr
                key={env.name}
                className={`cursor-pointer ${expandedEnvelope === env.name ? '' : ''}`}
                style={{
                  transition: 'background-color 0.15s',
                  ...(expandedEnvelope === env.name ? { backgroundColor: '#eef2ff' } : {}),
                }}
                onClick={() =>
                  setExpandedEnvelope(expandedEnvelope === env.name ? null : env.name)
                }
              >
                <td className="px-4 py-3 fw-semibold" style={{ color: '#111827' }}>{env.name}</td>
                <td className="px-4 py-3">
                  <span className="badge rounded-pill text-bg-secondary" style={{ backgroundColor: '#f3f4f6', color: '#374151', fontWeight: 500, fontSize: '0.75rem' }}>
                    {env.category}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ color: '#374151' }}>
                  {env.mm.w} × {env.mm.h}
                </td>
                <td className="px-4 py-3" style={{ color: '#374151' }}>
                  {env.inches.w} × {env.inches.h}
                </td>
                <td className="px-4 py-3" style={{ color: '#4b5563', fontSize: '0.75rem' }}>{env.fits}</td>
                <td className="px-4 py-3" style={{ color: '#4b5563', fontSize: '0.75rem' }}>{env.uses}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompareEnvelope(compareEnvelope?.name === env.name ? null : env);
                    }}
                    className="btn btn-sm"
                    style={{
                      fontSize: '0.75rem',
                      ...(compareEnvelope?.name === env.name
                        ? { backgroundColor: '#4f46e5', color: '#fff' }
                        : { backgroundColor: '#f3f4f6', color: '#4b5563' }),
                    }}
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
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="fw-semibold mb-3 d-flex align-items-center gap-2" style={{ color: '#111827' }}>
            <Info size={16} style={{ color: '#6366f1' }} />
            Visual Comparison: {compareEnvelope.name} vs A4 Paper
          </h3>
          <div className="d-flex align-items-end justify-content-center gap-4">
            <div className="text-center">
              <div
                className="border-2 border-dashed rounded mb-2 mx-auto"
                style={{
                  borderColor: '#818cf8',
                  width: `${compareEnvelope.mm.w * 0.8}px`,
                  height: `${compareEnvelope.mm.h * 0.8}px`,
                  minHeight: '40px',
                }}
              />
              <p className="text-sm fw-medium" style={{ color: '#4f46e5' }}>{compareEnvelope.name}</p>
              <p className="text-xs text-secondary">
                {compareEnvelope.mm.w} × {compareEnvelope.mm.h} mm
              </p>
            </div>
            <div className="text-center">
              <div
                className="border rounded mb-2 mx-auto"
                style={{
                  borderColor: '#d1d5db',
                  width: `${a4WidthMm * 0.8}px`,
                  height: `${a4HeightMm * 0.8}px`,
                }}
              />
              <p className="text-sm fw-medium text-secondary">A4</p>
              <p className="text-xs text-secondary">
                {a4WidthMm} × {a4HeightMm} mm
              </p>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-secondary">
            Area: {compareEnvelope.mm.w * compareEnvelope.mm.h} mm² (
            {((compareEnvelope.mm.w * compareEnvelope.mm.h) / (a4WidthMm * a4HeightMm) * 100).toFixed(1)}% of A4)
          </div>
        </div>
      )}

      <p className="text-xs" style={{ color: '#9ca3af' }}>
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
    <div className="d-flex flex-column gap-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#d1fae5' }}>
          <FileText size={24} style={{ color: '#059669' }} />
        </div>
        <div>
          <h2 className="fs-4 fw-bold" style={{ color: '#111827' }}>Print Resolution Reference</h2>
          <p className="text-sm text-secondary">DPI requirements by product type</p>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button
          onClick={() => setViewMode('grid')}
          className="btn btn-sm"
          style={{
            ...(viewMode === 'grid'
              ? { backgroundColor: '#059669', color: '#fff' }
              : { backgroundColor: '#f3f4f6', color: '#4b5563' }),
          }}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode('table')}
          className="btn btn-sm"
          style={{
            ...(viewMode === 'table'
              ? { backgroundColor: '#059669', color: '#fff' }
              : { backgroundColor: '#f3f4f6', color: '#4b5563' }),
          }}
        >
          Table View
        </button>
      </div>

      {viewMode === 'grid' ? (
        <div className="row g-3">
          {productDPIs.map((p) => (
            <div key={p.product} className="col-12 col-sm-6 col-lg-4">
              <button
                onClick={() => {
                  setSelectedProduct(selectedProduct?.product === p.product ? null : p);
                  setTimeout(() => simulateDPI(p.recommendedDPI), 50);
                }}
                className="text-start p-4 border rounded-lg w-100"
                style={{
                  transition: 'all 0.15s',
                  ...(selectedProduct?.product === p.product
                    ? { borderColor: '#10b981', backgroundColor: '#ecfdf5', boxShadow: '0 0 0 2px #a7f3d0' }
                    : { backgroundColor: '#fff', borderColor: '#e5e7eb' }),
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fw-semibold text-sm" style={{ color: '#111827' }}>{p.product}</span>
                  <span
                    className="badge rounded-pill"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      ...(p.colorMode === 'CMYK'
                        ? { backgroundColor: '#dbeafe', color: '#1d4ed8' }
                        : p.colorMode === 'RGB'
                          ? { backgroundColor: '#f3e8ff', color: '#7c3aed' }
                          : { backgroundColor: '#ffedd5', color: '#c2410c' }),
                    }}
                  >
                    {p.colorMode}
                  </span>
                </div>
                <div className="d-flex align-items-baseline gap-2">
                  <span className="fs-3 fw-bold" style={{ color: '#059669' }}>{p.recommendedDPI}</span>
                  <span className="text-sm text-secondary">DPI rec.</span>
                  <span className="fs-5 fw-semibold" style={{ color: '#9ca3af' }}>/</span>
                  <span className="fs-5 fw-semibold text-secondary">{p.minimumDPI}</span>
                  <span className="text-xs" style={{ color: '#9ca3af' }}>min</span>
                </div>
                <div className="mt-1 text-xs" style={{ color: '#9ca3af' }}>{p.fileFormat} • ~{p.typicalFileSize}</div>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-responsive border rounded-lg">
          <table className="table text-sm mb-0">
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Product</th>
                <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Rec. DPI</th>
                <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Min DPI</th>
                <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Color</th>
                <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>Format</th>
                <th className="px-4 py-3 text-start fw-medium" style={{ color: '#4b5563' }}>File Size</th>
              </tr>
            </thead>
            <tbody className="border-top">
              {productDPIs.map((p) => (
                <tr
                  key={p.product}
                  className={`cursor-pointer ${selectedProduct?.product === p.product ? '' : ''}`}
                  style={selectedProduct?.product === p.product ? { backgroundColor: '#ecfdf5' } : {}}
                  onClick={() => {
                    setSelectedProduct(selectedProduct?.product === p.product ? null : p);
                    setTimeout(() => simulateDPI(p.recommendedDPI), 50);
                  }}
                >
                  <td className="px-4 py-3 fw-medium" style={{ color: '#111827' }}>{p.product}</td>
                  <td className="px-4 py-3 fw-bold" style={{ color: '#059669' }}>{p.recommendedDPI}</td>
                  <td className="px-4 py-3 text-secondary">{p.minimumDPI}</td>
                  <td className="px-4 py-3">
                    <span className="badge rounded-pill" style={{ fontSize: '0.75rem', backgroundColor: '#f3f4f6', color: '#4b5563' }}>
                      {p.colorMode}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: '#4b5563', fontSize: '0.75rem' }}>{p.fileFormat}</td>
                  <td className="px-4 py-3 text-secondary" style={{ fontSize: '0.75rem' }}>{p.typicalFileSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProduct && (
        <div className="border rounded-lg p-4 bg-white">
          <div className="d-flex flex-column flex-lg-row gap-4">
            <div className="flex-fill">
              <h3 className="fw-semibold mb-2" style={{ color: '#111827' }}>{selectedProduct.product}</h3>
              <p className="text-sm mb-4" style={{ color: '#4b5563' }}>{selectedProduct.details}</p>
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
                    <p className="text-xs text-secondary mb-1">Recommended DPI</p>
                    <p className="fs-3 fw-bold" style={{ color: '#059669' }}>{selectedProduct.recommendedDPI}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
                    <p className="text-xs text-secondary mb-1">Minimum DPI</p>
                    <p className="fs-3 fw-bold" style={{ color: '#d97706' }}>{selectedProduct.minimumDPI}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
                    <p className="text-xs text-secondary mb-1">Color Mode</p>
                    <p className="fs-5 fw-semibold" style={{ color: '#111827' }}>{selectedProduct.colorMode}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
                    <p className="text-xs text-secondary mb-1">File Format</p>
                    <p className="fs-5 fw-semibold" style={{ color: '#111827' }}>{selectedProduct.fileFormat}</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: '16rem' }}>
              <p className="text-xs text-secondary mb-2 text-center">Quality simulation at {selectedProduct.recommendedDPI} DPI</p>
              <canvas
                ref={canvasRef}
                width={200}
                height={200}
                className="w-100 border rounded-lg"
              />
              <p className="text-xs mt-1 text-center" style={{ color: '#9ca3af' }}>Zoom in to see pixel-level detail</p>
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
    <div className="d-flex flex-column gap-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#fef3c7' }}>
          <Scale size={24} style={{ color: '#d97706' }} />
        </div>
        <div>
          <h2 className="fs-4 fw-bold" style={{ color: '#111827' }}>Substrate Weight Calculator</h2>
          <p className="text-sm text-secondary">Paper weight conversions and references</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6 d-flex flex-column gap-3">
          <div>
            <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>
              Paper Weight (GSM)
            </label>
            <input
              type="number"
              value={gsm}
              onChange={(e) => setGsm(Math.max(1, parseInt(e.target.value) || 1))}
              className="form-control text-sm"
              min={1}
              max={2000}
            />
            <input
              type="range"
              min={10}
              max={1000}
              value={Math.min(gsm, 1000)}
              onChange={(e) => setGsm(parseInt(e.target.value))}
              className="form-range mt-2"
            />
            <div className="d-flex justify-content-between text-xs mt-1" style={{ color: '#9ca3af' }}>
              <span>10 GSM</span>
              <span>1000 GSM</span>
            </div>
          </div>

          <div>
            <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Paper Size</label>
            <div className="d-flex align-items-center gap-2 mb-2">
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
                className="form-select flex-fill text-sm"
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
              <div className="d-flex gap-2">
                <input
                  type="number"
                  value={customW}
                  onChange={(e) => setCustomW(parseInt(e.target.value) || 1)}
                  className="form-control flex-fill text-sm"
                  placeholder="Width mm"
                />
                <span className="align-self-center" style={{ color: '#9ca3af' }}>×</span>
                <input
                  type="number"
                  value={customH}
                  onChange={(e) => setCustomH(parseInt(e.target.value) || 1)}
                  className="form-control flex-fill text-sm"
                  placeholder="Height mm"
                />
              </div>
            )}
          </div>

          <div className="rounded-lg p-3 d-flex flex-column gap-2" style={{ backgroundColor: '#f9fafb' }}>
            <h3 className="fw-medium" style={{ color: '#111827' }}>Calculation Results</h3>
            <div className="row g-3 text-center">
              <div className="col-4">
                <div className="p-3 rounded-lg border" style={{ backgroundColor: '#fff', borderColor: '#e5e7eb' }}>
                  <p className="text-xs text-secondary mb-1">Per Sheet</p>
                  <p className="fs-5 fw-bold" style={{ color: '#d97706' }}>
                    {weightPerSheet < 1
                      ? `${(weightPerSheet * 1000).toFixed(1)} mg`
                      : `${weightPerSheet.toFixed(3)} g`}
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 rounded-lg border" style={{ backgroundColor: '#fff', borderColor: '#e5e7eb' }}>
                  <p className="text-xs text-secondary mb-1">Per Ream (500)</p>
                  <p className="fs-5 fw-bold" style={{ color: '#d97706' }}>{reamWeight.toFixed(2)} g</p>
                  <p className="text-xs" style={{ color: '#9ca3af' }}>= {(reamWeight / 1000).toFixed(2)} kg</p>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 rounded-lg border" style={{ backgroundColor: '#fff', borderColor: '#e5e7eb' }}>
                  <p className="text-xs text-secondary mb-1">Sheets/kg</p>
                  <p className="fs-5 fw-bold" style={{ color: '#d97706' }}>
                    {sheetsPerKg > 10000
                      ? `${(sheetsPerKg / 1000).toFixed(1)}k`
                      : sheetsPerKg.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-xs text-secondary">
              {size.name}: {size.w}×{size.h} mm = {areaM2.toFixed(6)} m²
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex flex-column gap-3">
          <div>
            <h3 className="fw-medium mb-3" style={{ color: '#111827' }}>Comparison to Common Items</h3>
            <div className="d-flex flex-column gap-2">
              {comparisons.map((item) => (
                <div key={item.name} className="d-flex align-items-center gap-3">
                  <span className="text-sm" style={{ width: '6rem', color: '#4b5563' }}>{item.name}</span>
                  <div className="flex-fill position-relative" style={{ height: '1.5rem', backgroundColor: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      className="position-absolute top-0 start-0 h-100"
                      style={{ width: `${Math.min(100, (item.gsm / 1000) * 100)}%`, backgroundColor: '#fcd34d', borderRadius: '9999px' }}
                    />
                    <div
                      className="position-absolute top-0 h-100"
                      style={{ width: '2px', backgroundColor: '#ef4444', left: `${Math.min(100, (gsm / 1000) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-end" style={{ width: '4rem', color: '#6b7280' }}>{item.gsm} g</span>
                </div>
              ))}
              <div className="d-flex align-items-center gap-3 border-top pt-2" style={{ borderColor: '#e5e7eb' }}>
                <span className="text-sm fw-medium" style={{ width: '6rem', color: '#b45309' }}>Your paper</span>
                <div className="flex-fill position-relative" style={{ height: '1.5rem' }}>
                  <div
                    className="position-absolute top-0 h-100 rounded"
                    style={{ width: '4px', backgroundColor: '#f59e0b', left: `${Math.min(100, (gsm / 1000) * 100)}%` }}
                  />
                </div>
                <span className="text-sm fw-medium text-end" style={{ width: '4rem', color: '#b45309' }}>{gsm} g</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="fw-medium mb-3" style={{ color: '#111827' }}>Paper Type Match</h3>
            <div className="d-flex flex-column gap-2">
              {commonPaperTypes.map((type) => {
                const isMatch = gsm >= type.gsmRange[0] && gsm <= type.gsmRange[1];
                return (
                  <div
                    key={type.name}
                    className="p-2 rounded-lg text-sm"
                    style={{
                      backgroundColor: isMatch ? '#fffbeb' : '#f9fafb',
                      border: isMatch ? '1px solid #fbbf24' : '1px solid #f3f4f6',
                      ...(isMatch ? { boxShadow: '0 0 0 1px #fde68a' } : {}),
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium" style={{ color: isMatch ? '#92400e' : '#374151' }}>
                        {type.name}
                      </span>
                      <span className="text-xs text-secondary">
                        {type.gsmRange[0]}-{type.gsmRange[1]} GSM
                      </span>
                    </div>
                    <p className="text-xs text-secondary mb-0">{type.description}</p>
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
    <div className="d-flex flex-column gap-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#ede9fe' }}>
          <PenTool size={24} style={{ color: '#7c3aed' }} />
        </div>
        <div>
          <h2 className="fs-4 fw-bold" style={{ color: '#111827' }}>Print File Naming Convention Generator</h2>
          <p className="text-sm text-secondary">Generate standardized, industry-compliant filenames</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8 d-flex flex-column gap-3">
          <div>
            <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Naming Convention</label>
            <div className="d-flex gap-2">
              {([
                { key: 'iso' as NamingConvention, label: 'ISO Style', desc: 'Structured with delimiters' },
                { key: 'simple' as NamingConvention, label: 'Simple', desc: 'Short & quick' },
                { key: 'detailed' as NamingConvention, label: 'Detailed', desc: 'Double-underscore separated' },
              ]).map((c) => (
                <button
                  key={c.key}
                  onClick={() => setConvention(c.key)}
                  className="flex-fill p-3 text-start rounded-lg"
                  style={{
                    transition: 'all 0.15s',
                    ...(convention === c.key
                      ? { backgroundColor: '#f5f3ff', border: '2px solid #a78bfa', boxShadow: '0 0 0 2px #ede9fe' }
                      : { backgroundColor: '#f9fafb', border: '2px solid transparent' }),
                  }}
                >
                  <span className="text-sm fw-medium" style={{ color: '#111827' }}>{c.label}</span>
                  <p className="text-xs text-secondary mb-0" style={{ marginTop: '2px' }}>{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Client Name *</label>
              <input
                type="text"
                value={fields.client}
                onChange={(e) => updateField('client', e.target.value)}
                placeholder="Acme Corp"
                className="form-control text-sm"
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Job Number</label>
              <input
                type="text"
                value={fields.jobNumber}
                onChange={(e) => updateField('jobNumber', e.target.value)}
                placeholder="12345"
                className="form-control text-sm"
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Product Type</label>
              <select
                value={fields.productType}
                onChange={(e) => updateField('productType', e.target.value)}
                className="form-select text-sm"
              >
                {productTypes.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Size</label>
              <input
                type="text"
                value={fields.size}
                onChange={(e) => updateField('size', e.target.value)}
                placeholder="90x55mm"
                className="form-control text-sm"
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Quantity</label>
              <input
                type="text"
                value={fields.quantity}
                onChange={(e) => updateField('quantity', e.target.value)}
                placeholder="500"
                className="form-control text-sm"
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Due Date</label>
              <input
                type="date"
                value={fields.dueDate}
                onChange={(e) => updateField('dueDate', e.target.value)}
                className="form-control text-sm"
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Revision</label>
              <input
                type="text"
                value={fields.revision}
                onChange={(e) => updateField('revision', e.target.value)}
                placeholder="01"
                className="form-control text-sm"
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Color Mode</label>
              <select
                value={fields.colorMode}
                onChange={(e) => updateField('colorMode', e.target.value)}
                className="form-select text-sm"
              >
                {colorModes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Special Finish</label>
              <select
                value={fields.specialFinish}
                onChange={(e) => updateField('specialFinish', e.target.value)}
                className="form-select text-sm"
              >
                {specialFinishes.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 d-flex flex-column gap-3">
          <div className="rounded-lg p-4" style={{ backgroundColor: '#111827' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h3 className="text-sm fw-medium" style={{ color: '#9ca3af' }}>Generated Filename</h3>
              <button
                onClick={copyToClipboard}
                className="btn btn-sm d-flex align-items-center gap-1"
                style={{ color: copied ? '#fff' : '#9ca3af' }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-sm font-monospace mb-0" style={{ color: '#4ade80', wordBreak: 'break-all', lineHeight: 1.6 }}>{filename}</p>
          </div>

          <div className="border rounded-lg p-4 bg-white">
            <h3 className="text-sm fw-medium mb-3" style={{ color: '#374151' }}>Naming Examples</h3>
            <div className="d-flex flex-column gap-3">
              <div>
                <span className="text-xs fw-medium mb-1 d-block" style={{ color: '#dc2626' }}>❌ Bad Naming</span>
                <div className="p-2 rounded border" style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca' }}>
                  <p className="text-xs font-monospace mb-0" style={{ color: '#b91c1c', wordBreak: 'break-all' }}>{badExample}</p>
                </div>
              </div>
              <div>
                <span className="text-xs fw-medium mb-1 d-block" style={{ color: '#16a34a' }}>✅ Good Naming</span>
                <div className="p-2 rounded border" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <p className="text-xs font-monospace mb-0" style={{ color: '#15803d', wordBreak: 'break-all' }}>{goodExample}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-4 text-xs d-flex flex-column gap-1" style={{ backgroundColor: '#f5f3ff', color: '#6d28d9' }}>
            <p className="fw-medium mb-1" style={{ color: '#5b21b6' }}>Tips:</p>
            <ul className="mb-0" style={{ paddingLeft: '1.25rem' }}>
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
    <div className="d-flex flex-column gap-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#cffafe' }}>
          <LayoutGrid size={24} style={{ color: '#0891b2' }} />
        </div>
        <div>
          <h2 className="fs-4 fw-bold" style={{ color: '#111827' }}>Multi-Page Layout Arranger</h2>
          <p className="text-sm text-secondary">Page imposition for booklets and catalogs</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-3 d-flex flex-column gap-3">
          <div>
            <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Number of Pages</label>
            <div className="row g-2 mb-2">
              {validPages.map((n) => (
                <div key={n} className="col-6 col-lg-3">
                  <button
                    onClick={() => {
                      setPageCount(n);
                      setCustomPages('');
                    }}
                    className="btn btn-sm w-100 fw-medium"
                    style={{
                      ...(pageCount === n && !customPages
                        ? { backgroundColor: '#0891b2', color: '#fff' }
                        : { backgroundColor: '#f3f4f6', color: '#374151' }),
                    }}
                  >
                    {n}
                  </button>
                </div>
              ))}
            </div>
            <input
              type="number"
              value={customPages}
              onChange={(e) => setCustomPages(e.target.value)}
              placeholder="Custom page count"
              className="form-control text-sm"
              min={4}
              max={200}
              step={4}
            />
          </div>

          <div className="row g-3">
            <div className="col-6">
              <label className="form-label fw-medium text-xs" style={{ color: '#374151' }}>Page Size (mm)</label>
              <div className="d-flex gap-1">
                <input
                  type="number"
                  value={pageWidth}
                  onChange={(e) => setPageWidth(e.target.value)}
                  className="form-control form-control-sm text-sm"
                  placeholder="W"
                />
                <input
                  type="number"
                  value={pageHeight}
                  onChange={(e) => setPageHeight(e.target.value)}
                  className="form-control form-control-sm text-sm"
                  placeholder="H"
                />
              </div>
            </div>
            <div className="col-6">
              <label className="form-label fw-medium text-xs" style={{ color: '#374151' }}>Paper Size (mm)</label>
              <div className="d-flex gap-1">
                <input
                  type="number"
                  value={paperWidth}
                  onChange={(e) => setPaperWidth(e.target.value)}
                  className="form-control form-control-sm text-sm"
                  placeholder="W"
                />
                <input
                  type="number"
                  value={paperHeight}
                  onChange={(e) => setPaperHeight(e.target.value)}
                  className="form-control form-control-sm text-sm"
                  placeholder="H"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="form-label fw-medium text-sm" style={{ color: '#374151' }}>Binding Type</label>
            <div className="d-flex flex-column gap-2">
              {([
                { key: 'saddle-stitch' as BindingType, label: 'Saddle Stitch', desc: 'Stapled at spine' },
                { key: 'perfect-bound' as BindingType, label: 'Perfect Bound', desc: 'Glued spine' },
                { key: 'wire-o' as BindingType, label: 'Wire-O', desc: 'Wire binding' },
              ]).map((b) => (
                <label
                  key={b.key}
                  className="d-flex align-items-center p-3 rounded-lg cursor-pointer"
                  style={{
                    transition: 'all 0.15s',
                    border: binding === b.key ? '2px solid #22d3ee' : '2px solid #e5e7eb',
                    backgroundColor: binding === b.key ? '#ecfeff' : '#fff',
                  }}
                >
                  <input
                    type="radio"
                    name="binding"
                    checked={binding === b.key}
                    onChange={() => setBinding(b.key)}
                    className="me-2"
                  />
                  <div>
                    <span className="text-sm fw-medium" style={{ color: '#111827' }}>{b.label}</span>
                    <p className="text-xs text-secondary mb-0">{b.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={exportSVG}
            className="btn d-flex align-items-center justify-content-center gap-2 text-sm fw-medium"
            style={{ backgroundColor: '#0891b2', color: '#fff' }}
          >
            <Download size={16} />
            Export Layout as SVG
          </button>
        </div>

        <div className="col-12 col-lg-9">
          <div className="rounded-lg p-4" style={{ backgroundColor: '#f9fafb' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 className="fw-medium" style={{ color: '#111827' }}>
                {sheets.length} Sheet{sheets.length > 1 ? 's' : ''} ({totalPages} pages total, {pages} content)
              </h3>
              <span className="text-xs text-secondary">
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
              className="w-100"
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

          <div className="row g-3 mt-4">
            <div className="col-4">
              <div className="p-3 rounded-lg text-center" style={{ backgroundColor: '#eff6ff' }}>
                <p className="text-xs mb-1" style={{ color: '#2563eb' }}>Front Pages (Blue)</p>
                <p className="text-sm fw-medium" style={{ color: '#1e3a8a' }}>Printed on front of each sheet</p>
              </div>
            </div>
            <div className="col-4">
              <div className="p-3 rounded-lg text-center" style={{ backgroundColor: '#fefce8' }}>
                <p className="text-xs mb-1" style={{ color: '#ca8a04' }}>Back Pages (Yellow)</p>
                <p className="text-sm fw-medium" style={{ color: '#713f12' }}>Printed on back of each sheet</p>
              </div>
            </div>
            <div className="col-4">
              <div className="p-3 rounded-lg text-center" style={{ backgroundColor: '#f9fafb' }}>
                <p className="text-xs mb-1" style={{ color: '#4b5563' }}>Red Line = Spine</p>
                <p className="text-sm fw-medium" style={{ color: '#111827' }}>Fold/staple edge</p>
              </div>
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
