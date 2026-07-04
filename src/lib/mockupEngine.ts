// MockupSceneEngine - renders Placeit-style mockups using HTML/CSS overlay
// No photo URLs needed - fully self-contained vector mockup scenes

export interface SceneDef {
  id: string;
  name: string;
  product: string;
  description: string;
  /** CSS for the background environment (gradient, colors) */
  background: string;
  /** CSS transform for the design overlay element */
  designTransform: string;
  /** Position of the design overlay (left, top) */
  designLeft: string;
  /** Position of the design overlay (left, top) */
  designTop: string;
  /** Width of design overlay */
  designWidth: string;
  /** Height of design overlay */
  designHeight: string;
  /** Border radius for design overlay */
  borderRadius?: string;
  /** Box shadow for the design (product shadow) */
  boxShadow?: string;
  /** Clip path for the design */
  clipPath?: string;
  /** Blend mode CSS */
  blendMode?: string;
  /** For export: 4 corner points as % for perspective warp */
  corners?: { tl: { x: number; y: number }; tr: { x: number; y: number }; bl: { x: number; y: number }; br: { x: number; y: number } };
  /** Shadow settings for export */
  shadowExport?: { angle: number; distance: number; blur: number; opacity: number };
}

// ── Scene definitions ──
export const SCENES: SceneDef[] = [
  // ── BUSINESS CARDS ──
  {
    id: 'bc-angled',
    name: 'Angled on Desk',
    product: 'Business Cards',
    description: '3D angled business card on premium desk surface',
    background: 'linear-gradient(135deg, #2c1810 0%, #4a3020 40%, #3a2515 70%, #2c1810 100%)',
    designTransform: 'perspective(1200px) rotateX(38deg) rotateY(-12deg) rotateZ(2deg) scale(1)',
    designLeft: '30%',
    designTop: '24%',
    designWidth: '42%',
    designHeight: '28%',
    borderRadius: '4px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)',
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    corners: { tl: { x: 0.30, y: 0.24 }, tr: { x: 0.72, y: 0.20 }, bl: { x: 0.32, y: 0.52 }, br: { x: 0.74, y: 0.48 } },
    shadowExport: { angle: 45, distance: 0.8, blur: 6, opacity: 0.35 },
  },
  {
    id: 'bc-flat',
    name: 'Flat Lay',
    product: 'Business Cards',
    description: 'Clean flat lay on marble surface',
    background: 'linear-gradient(160deg, #f5f0e8 0%, #e8e0d5 50%, #ddd5c8 100%)',
    designTransform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
    designLeft: '28%',
    designTop: '30%',
    designWidth: '44%',
    designHeight: '28%',
    borderRadius: '4px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
    corners: { tl: { x: 0.28, y: 0.30 }, tr: { x: 0.72, y: 0.30 }, bl: { x: 0.28, y: 0.58 }, br: { x: 0.72, y: 0.58 } },
    shadowExport: { angle: 60, distance: 0.2, blur: 3, opacity: 0.15 },
  },
  {
    id: 'bc-elegant',
    name: 'Elegant Studio',
    product: 'Business Cards',
    description: 'Premium studio lighting on dark background',
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    designTransform: 'perspective(1000px) rotateX(5deg) rotateY(0deg)',
    designLeft: '28%',
    designTop: '32%',
    designWidth: '44%',
    designHeight: '28%',
    borderRadius: '4px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(100,200,255,0.08)',
    corners: { tl: { x: 0.28, y: 0.32 }, tr: { x: 0.72, y: 0.32 }, bl: { x: 0.28, y: 0.60 }, br: { x: 0.72, y: 0.60 } },
    shadowExport: { angle: 45, distance: 0.5, blur: 5, opacity: 0.3 },
  },

  // ── T-SHIRTS ──
  {
    id: 'ts-centerd',
    name: 'Centered Flat Lay',
    product: 'T-Shirts',
    description: 'Clean flat lay on premium surface',
    background: 'linear-gradient(150deg, #f8f5f0 0%, #ede8e0 50%, #e0d8cc 100%)',
    designTransform: 'perspective(800px) rotateX(0deg)',
    designLeft: '25%',
    designTop: '25%',
    designWidth: '50%',
    designHeight: '42%',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    clipPath: 'polygon(5% 0%, 95% 0%, 100% 20%, 85% 100%, 15% 100%, 0% 20%)',
    blendMode: 'multiply',
    corners: { tl: { x: 0.25, y: 0.25 }, tr: { x: 0.75, y: 0.25 }, bl: { x: 0.25, y: 0.67 }, br: { x: 0.75, y: 0.67 } },
    shadowExport: { angle: 60, distance: 0.2, blur: 3, opacity: 0.12 },
  },
  {
    id: 'ts-dark',
    name: 'Dark Studio',
    product: 'T-Shirts',
    description: 'Dramatic studio lighting on dark background',
    background: 'linear-gradient(180deg, #1a1a2e 0%, #2a2a3e 40%, #1a1a2e 100%)',
    designTransform: 'perspective(800px) rotateX(5deg)',
    designLeft: '22%',
    designTop: '22%',
    designWidth: '56%',
    designHeight: '48%',
    borderRadius: '8px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 30px rgba(100,200,255,0.05)',
    clipPath: 'polygon(5% 0%, 95% 0%, 100% 20%, 85% 100%, 15% 100%, 0% 20%)',
    blendMode: 'multiply',
    corners: { tl: { x: 0.22, y: 0.22 }, tr: { x: 0.78, y: 0.22 }, bl: { x: 0.22, y: 0.70 }, br: { x: 0.78, y: 0.70 } },
    shadowExport: { angle: 45, distance: 0.4, blur: 4, opacity: 0.25 },
  },
  {
    id: 'ts-hanger',
    name: 'On Hanger',
    product: 'T-Shirts',
    description: 'Wooden hanger on clean background',
    background: 'linear-gradient(135deg, #f0ebe5 0%, #e5ddd0 50%, #d8cec0 100%)',
    designTransform: 'perspective(600px) rotateX(0deg)',
    designLeft: '24%',
    designTop: '18%',
    designWidth: '52%',
    designHeight: '55%',
    borderRadius: '6px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.06)',
    clipPath: 'polygon(5% 0%, 95% 0%, 100% 20%, 85% 100%, 15% 100%, 0% 20%)',
    blendMode: 'multiply',
    corners: { tl: { x: 0.24, y: 0.18 }, tr: { x: 0.76, y: 0.18 }, bl: { x: 0.24, y: 0.73 }, br: { x: 0.76, y: 0.73 } },
    shadowExport: { angle: 60, distance: 0.3, blur: 3, opacity: 0.15 },
  },

  // ── MUGS ──
  {
    id: 'mug-centered',
    name: 'Centered Front',
    product: 'Mugs',
    description: 'Clean centered mug on wooden table',
    background: 'linear-gradient(145deg, #3a2515 0%, #5c3d2a 40%, #4a3020 70%, #3a2515 100%)',
    designTransform: 'perspective(800px) rotateY(-3deg)',
    designLeft: '32%',
    designTop: '18%',
    designWidth: '36%',
    designHeight: '52%',
    borderRadius: '6px',
    boxShadow: '0 10px 35px rgba(0,0,0,0.35), inset 0 0 30px rgba(0,0,0,0.1)',
    corners: { tl: { x: 0.32, y: 0.18 }, tr: { x: 0.68, y: 0.20 }, bl: { x: 0.30, y: 0.70 }, br: { x: 0.66, y: 0.72 } },
    shadowExport: { angle: 45, distance: 0.6, blur: 5, opacity: 0.3 },
  },
  {
    id: 'mug-warm',
    name: 'Warm Coffee',
    product: 'Mugs',
    description: 'Coffee mug with warm ambient lighting',
    background: 'linear-gradient(150deg, #4a3528 0%, #6b4d3a 35%, #5c4033 65%, #4a3528 100%)',
    designTransform: 'perspective(800px) rotateY(-6deg)',
    designLeft: '30%',
    designTop: '20%',
    designWidth: '40%',
    designHeight: '50%',
    borderRadius: '6px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,180,80,0.05)',
    corners: { tl: { x: 0.30, y: 0.20 }, tr: { x: 0.70, y: 0.22 }, bl: { x: 0.28, y: 0.70 }, br: { x: 0.68, y: 0.72 } },
    shadowExport: { angle: 45, distance: 0.7, blur: 6, opacity: 0.35 },
  },
  {
    id: 'mug-shelf',
    name: 'Shelf Display',
    product: 'Mugs',
    description: 'Mug displayed on wooden shelf',
    background: 'linear-gradient(180deg, #e8e0d5 0%, #d5cbbf 50%, #c8bfb2 100%)',
    designTransform: 'perspective(800px) rotateY(-2deg)',
    designLeft: '34%',
    designTop: '20%',
    designWidth: '32%',
    designHeight: '50%',
    borderRadius: '6px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.2), inset 0 0 20px rgba(0,0,0,0.05)',
    corners: { tl: { x: 0.34, y: 0.20 }, tr: { x: 0.66, y: 0.21 }, bl: { x: 0.32, y: 0.70 }, br: { x: 0.64, y: 0.71 } },
    shadowExport: { angle: 60, distance: 0.3, blur: 3, opacity: 0.2 },
  },

  // ── POSTERS ──
  {
    id: 'poster-gallery',
    name: 'Gallery Frame',
    product: 'Posters',
    description: 'Framed poster on gallery wall',
    background: 'linear-gradient(180deg, #f5f2ed 0%, #e8e2d8 50%, #ddd5c8 100%)',
    designTransform: 'perspective(1000px) rotateX(1deg)',
    designLeft: '25%',
    designTop: '10%',
    designWidth: '50%',
    designHeight: '72%',
    borderRadius: '2px',
    boxShadow: '0 15px 50px rgba(0,0,0,0.15), 0 0 0 8px #f5f2ed, 0 0 0 10px rgba(0,0,0,0.1)',
    corners: { tl: { x: 0.25, y: 0.10 }, tr: { x: 0.75, y: 0.10 }, bl: { x: 0.25, y: 0.82 }, br: { x: 0.75, y: 0.82 } },
    shadowExport: { angle: 60, distance: 0.2, blur: 3, opacity: 0.12 },
  },
  {
    id: 'poster-moody',
    name: 'Moody Dark',
    product: 'Posters',
    description: 'Dramatic dark wall with spotlight',
    background: 'linear-gradient(180deg, #1a1a2e 0%, #2a2a3e 40%, #1a1a2e 100%)',
    designTransform: 'perspective(1000px) rotateX(2deg) rotateY(-1deg)',
    designLeft: '22%',
    designTop: '12%',
    designWidth: '56%',
    designHeight: '68%',
    borderRadius: '2px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(200,200,255,0.03)',
    corners: { tl: { x: 0.22, y: 0.12 }, tr: { x: 0.78, y: 0.12 }, bl: { x: 0.22, y: 0.80 }, br: { x: 0.78, y: 0.80 } },
    shadowExport: { angle: 45, distance: 0.3, blur: 4, opacity: 0.2 },
  },

  // ── BANNERS ──
  {
    id: 'banner-podium',
    name: 'Podium Display',
    product: 'Banners',
    description: 'Banner on clean podium',
    background: 'linear-gradient(180deg, #e8e8ed 0%, #d8d8e0 50%, #c8c8d0 100%)',
    designTransform: 'perspective(1000px) rotateX(0deg)',
    designLeft: '12%',
    designTop: '15%',
    designWidth: '76%',
    designHeight: '55%',
    boxShadow: '0 15px 50px rgba(0,0,0,0.12), 0 5px 20px rgba(0,0,0,0.06)',
    corners: { tl: { x: 0.12, y: 0.15 }, tr: { x: 0.88, y: 0.15 }, bl: { x: 0.12, y: 0.70 }, br: { x: 0.88, y: 0.70 } },
    shadowExport: { angle: 60, distance: 0.3, blur: 4, opacity: 0.15 },
  },
  {
    id: 'banner-storefront',
    name: 'Storefront',
    product: 'Banners',
    description: 'Hanging banner in storefront',
    background: 'linear-gradient(180deg, #a8a0a0 0%, #8a8280 40%, #6a6260 80%, #4a4240 100%)',
    designTransform: 'perspective(800px) rotateY(-2deg)',
    designLeft: '15%',
    designTop: '12%',
    designWidth: '70%',
    designHeight: '60%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    corners: { tl: { x: 0.15, y: 0.12 }, tr: { x: 0.85, y: 0.14 }, bl: { x: 0.14, y: 0.72 }, br: { x: 0.84, y: 0.74 } },
    shadowExport: { angle: 45, distance: 0.5, blur: 5, opacity: 0.25 },
  },

  // ── STICKERS ──
  {
    id: 'sticker-circle',
    name: 'Circle on Surface',
    product: 'Stickers',
    description: 'Round sticker on clean surface',
    background: 'linear-gradient(160deg, #f0ece4 0%, #e8e0d8 50%, #ddd5cc 100%)',
    designTransform: 'perspective(800px) rotateX(0deg)',
    designLeft: '30%',
    designTop: '28%',
    designWidth: '40%',
    designHeight: '40%',
    borderRadius: '50%',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15), 0 2px 10px rgba(0,0,0,0.08)',
    corners: { tl: { x: 0.30, y: 0.28 }, tr: { x: 0.70, y: 0.28 }, bl: { x: 0.30, y: 0.68 }, br: { x: 0.70, y: 0.68 } },
    shadowExport: { angle: 45, distance: 0.3, blur: 3, opacity: 0.15 },
  },
  {
    id: 'sticker-laptop',
    name: 'On Laptop',
    product: 'Stickers',
    description: 'Sticker on laptop mockup',
    background: 'linear-gradient(170deg, #c0c0c8 0%, #b0b0b8 50%, #a0a0a8 100%)',
    designTransform: 'perspective(800px) rotateX(15deg) rotateY(-5deg)',
    designLeft: '50%',
    designTop: '36%',
    designWidth: '30%',
    designHeight: '30%',
    borderRadius: '50%',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
    corners: { tl: { x: 0.50, y: 0.36 }, tr: { x: 0.80, y: 0.34 }, bl: { x: 0.52, y: 0.66 }, br: { x: 0.82, y: 0.64 } },
    shadowExport: { angle: 45, distance: 0.2, blur: 2, opacity: 0.12 },
  },

  // ── PACKAGING ──
  {
    id: 'box-isometric',
    name: 'Isometric Box',
    product: 'Packaging',
    description: '3D isometric packaging box',
    background: 'linear-gradient(145deg, #f8f5f0 0%, #ede8e0 40%, #e0d8cc 100%)',
    designTransform: 'perspective(1000px) rotateX(30deg) rotateY(-25deg)',
    designLeft: '20%',
    designTop: '12%',
    designWidth: '60%',
    designHeight: '55%',
    boxShadow: '0 25px 60px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.1)',
    corners: { tl: { x: 0.20, y: 0.12 }, tr: { x: 0.80, y: 0.20 }, bl: { x: 0.24, y: 0.67 }, br: { x: 0.84, y: 0.75 } },
    shadowExport: { angle: 45, distance: 0.8, blur: 8, opacity: 0.3 },
  },
  {
    id: 'box-shelf',
    name: 'On Shelf',
    product: 'Packaging',
    description: 'Packaging box on retail shelf',
    background: 'linear-gradient(180deg, #e8e0d5 0%, #d5cbbf 50%, #c8bfb2 100%)',
    designTransform: 'perspective(800px) rotateX(20deg) rotateY(-10deg)',
    designLeft: '28%',
    designTop: '15%',
    designWidth: '44%',
    designHeight: '55%',
    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
    corners: { tl: { x: 0.28, y: 0.15 }, tr: { x: 0.72, y: 0.20 }, bl: { x: 0.30, y: 0.70 }, br: { x: 0.74, y: 0.75 } },
    shadowExport: { angle: 60, distance: 0.5, blur: 5, opacity: 0.25 },
  },

  // ── BOOKS ──
  {
    id: 'book-open',
    name: 'Open Book',
    product: 'Books & Magazines',
    description: 'Open book on premium desk',
    background: 'linear-gradient(150deg, #3a2515 0%, #5c3d2a 40%, #4a3020 100%)',
    designTransform: 'perspective(1000px) rotateX(5deg) rotateY(0deg)',
    designLeft: '22%',
    designTop: '20%',
    designWidth: '56%',
    designHeight: '52%',
    borderRadius: '4px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.35)',
    corners: { tl: { x: 0.22, y: 0.20 }, tr: { x: 0.78, y: 0.20 }, bl: { x: 0.22, y: 0.72 }, br: { x: 0.78, y: 0.72 } },
    shadowExport: { angle: 45, distance: 0.5, blur: 5, opacity: 0.3 },
  },
  {
    id: 'book-vertical',
    name: 'Vertical Stand',
    product: 'Books & Magazines',
    description: 'Book standing on display',
    background: 'linear-gradient(180deg, #f0ebe5 0%, #e5ddd0 50%, #d8cec0 100%)',
    designTransform: 'perspective(800px) rotateY(-5deg)',
    designLeft: '34%',
    designTop: '10%',
    designWidth: '35%',
    designHeight: '68%',
    borderRadius: '3px',
    boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
    corners: { tl: { x: 0.34, y: 0.10 }, tr: { x: 0.69, y: 0.13 }, bl: { x: 0.33, y: 0.78 }, br: { x: 0.68, y: 0.81 } },
    shadowExport: { angle: 60, distance: 0.3, blur: 4, opacity: 0.2 },
  },

  // ── FLYERS ──
  {
    id: 'flyer-table',
    name: 'On Wooden Table',
    product: 'Flyers',
    description: 'Flyer on rustic wooden table',
    background: 'linear-gradient(145deg, #5c3d2a 0%, #7a5540 35%, #6b4530 65%, #5c3d2a 100%)',
    designTransform: 'perspective(1000px) rotateX(32deg) rotateY(-8deg)',
    designLeft: '25%',
    designTop: '20%',
    designWidth: '50%',
    designHeight: '55%',
    borderRadius: '2px',
    boxShadow: '0 12px 35px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)',
    corners: { tl: { x: 0.25, y: 0.20 }, tr: { x: 0.75, y: 0.18 }, bl: { x: 0.27, y: 0.75 }, br: { x: 0.77, y: 0.73 } },
    shadowExport: { angle: 45, distance: 0.6, blur: 5, opacity: 0.3 },
  },
  {
    id: 'flyer-marble',
    name: 'Marble Surface',
    product: 'Flyers',
    description: 'Flyer on clean marble surface',
    background: 'linear-gradient(160deg, #f5f0e8 0%, #e8e0d5 50%, #ddd5c8 100%)',
    designTransform: 'perspective(800px) rotateX(0deg)',
    designLeft: '22%',
    designTop: '22%',
    designWidth: '56%',
    designHeight: '52%',
    borderRadius: '2px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
    corners: { tl: { x: 0.22, y: 0.22 }, tr: { x: 0.78, y: 0.22 }, bl: { x: 0.22, y: 0.74 }, br: { x: 0.78, y: 0.74 } },
    shadowExport: { angle: 60, distance: 0.2, blur: 3, opacity: 0.12 },
  },

  // ── CAPS & TOTES ──
  {
    id: 'cap-front',
    name: 'Cap Front View',
    product: 'Caps & Totes',
    description: 'Clean front-facing cap mockup',
    background: 'linear-gradient(180deg, #e8e0d5 0%, #d5cbbf 50%, #c8bfb2 100%)',
    designTransform: 'perspective(800px) rotateX(18deg) rotateY(0deg)',
    designLeft: '28%',
    designTop: '20%',
    designWidth: '44%',
    designHeight: '32%',
    borderRadius: '30% 30% 50% 50% / 40% 40% 30% 30%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
    clipPath: 'ellipse(50% 45% at 50% 45%)',
    corners: { tl: { x: 0.28, y: 0.20 }, tr: { x: 0.72, y: 0.20 }, bl: { x: 0.28, y: 0.52 }, br: { x: 0.72, y: 0.52 } },
    shadowExport: { angle: 60, distance: 0.3, blur: 3, opacity: 0.18 },
  },
  {
    id: 'tote-flat',
    name: 'Tote Flat Lay',
    product: 'Caps & Totes',
    description: 'Canvas tote bag flat lay',
    background: 'linear-gradient(150deg, #f8f5f0 0%, #ede8e0 50%, #e0d8cc 100%)',
    designTransform: 'perspective(800px) rotateX(0deg)',
    designLeft: '18%',
    designTop: '18%',
    designWidth: '64%',
    designHeight: '55%',
    borderRadius: '4px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    blendMode: 'multiply',
    corners: { tl: { x: 0.18, y: 0.18 }, tr: { x: 0.82, y: 0.18 }, bl: { x: 0.18, y: 0.73 }, br: { x: 0.82, y: 0.73 } },
    shadowExport: { angle: 60, distance: 0.15, blur: 2, opacity: 0.1 },
  },
];

// ── Canvas perspective warp for export ──
// Maps a design image into a 4-corner quadrilateral
export function renderPerspectiveWarp(
  ctx: CanvasRenderingContext2D,
  designImg: HTMLImageElement,
  corners: { tl: { x: number; y: number }; tr: { x: number; y: number }; bl: { x: number; y: number }; br: { x: number; y: number } },
  canvasW: number,
  canvasH: number,
  options?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    opacity?: number;
  }
) {
  const pts = [
    corners.tl.x * canvasW, corners.tl.y * canvasH,
    corners.tr.x * canvasW, corners.tr.y * canvasH,
    corners.br.x * canvasW, corners.br.y * canvasH,
    corners.bl.x * canvasW, corners.bl.y * canvasH,
  ];

  const xs = [pts[0], pts[2], pts[4], pts[6]];
  const ys = [pts[1], pts[3], pts[5], pts[7]];
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  const dstW = maxX - minX;
  const dstH = maxY - minY;

  if (dstW <= 0 || dstH <= 0) return;

  const ntl = { x: (pts[0] - minX) / dstW, y: (pts[1] - minY) / dstH };
  const ntr = { x: (pts[2] - minX) / dstW, y: (pts[3] - minY) / dstH };
  const nbr = { x: (pts[4] - minX) / dstW, y: (pts[5] - minY) / dstH };
  const nbl = { x: (pts[6] - minX) / dstW, y: (pts[7] - minY) / dstH };

  const srcW = designImg.naturalWidth || designImg.width;
  const srcH = designImg.naturalHeight || designImg.height;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = srcW;
  tempCanvas.height = srcH;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.drawImage(designImg, 0, 0);
  const srcData = tempCtx.getImageData(0, 0, srcW, srcH).data;

  const dstImgData = ctx.createImageData(Math.ceil(dstW), Math.ceil(dstH));
  const dstData = dstImgData.data;

  const bri = (options?.brightness ?? 0) / 100;
  const con = (options?.contrast ?? 0) / 100;
  const sat = (options?.saturation ?? 0) / 100;
  const op = (options?.opacity ?? 100) / 100;

  const gIdx = (x: number, y: number) => (y * srcW + x) * 4;
  const dstW2 = Math.floor(dstW);
  const dstH2 = Math.floor(dstH);

  for (let py = 0; py < dstH2; py++) {
    const ny = py / dstH;
    const rowBase = py * dstW2 * 4;
    for (let px = 0; px < dstW2; px++) {
      const nx = px / dstW;
      const di = rowBase + px * 4;

      const topU = ntl.x + (ntr.x - ntl.x) * nx;
      const topV = ntl.y + (ntr.y - ntl.y) * nx;
      const botU = nbl.x + (nbr.x - nbl.x) * nx;
      const botV = nbl.y + (nbr.y - nbl.y) * nx;
      const u = topU + (botU - topU) * ny;
      const v = topV + (botV - topV) * ny;

      const srcX = u * srcW;
      const srcY = v * srcH;

      if (srcX < 0 || srcX >= srcW || srcY < 0 || srcY >= srcH) {
        dstData[di] = 0; dstData[di + 1] = 0; dstData[di + 2] = 0; dstData[di + 3] = 0;
        continue;
      }

      const ix = Math.floor(srcX);
      const iy = Math.floor(srcY);
      const fx = srcX - ix;
      const fy = srcY - iy;
      const ix1 = Math.min(ix + 1, srcW - 1);
      const iy1 = Math.min(iy + 1, srcH - 1);

      const i00 = gIdx(ix, iy);
      const i10 = gIdx(ix1, iy);
      const i01 = gIdx(ix, iy1);
      const i11 = gIdx(ix1, iy1);
      const w00 = (1 - fx) * (1 - fy);
      const w10 = fx * (1 - fy);
      const w01 = (1 - fx) * fy;
      const w11 = fx * fy;

      let r = srcData[i00] * w00 + srcData[i10] * w10 + srcData[i01] * w01 + srcData[i11] * w11;
      let g = srcData[i00 + 1] * w00 + srcData[i10 + 1] * w10 + srcData[i01 + 1] * w01 + srcData[i11 + 1] * w11;
      let b = srcData[i00 + 2] * w00 + srcData[i10 + 2] * w10 + srcData[i01 + 2] * w01 + srcData[i11 + 2] * w11;
      let a = srcData[i00 + 3] * w00 + srcData[i10 + 3] * w10 + srcData[i01 + 3] * w01 + srcData[i11 + 3] * w11;

      if (bri !== 0) { r = Math.min(255, Math.max(0, r + bri * 255)); g = Math.min(255, Math.max(0, g + bri * 255)); b = Math.min(255, Math.max(0, b + bri * 255)); }
      if (con !== 0) { const f = 1 + con; r = Math.min(255, Math.max(0, (r - 128) * f + 128)); g = Math.min(255, Math.max(0, (g - 128) * f + 128)); b = Math.min(255, Math.max(0, (b - 128) * f + 128)); }
      if (sat !== 0) { const gr = 0.2989 * r + 0.5870 * g + 0.1140 * b; r = Math.min(255, Math.max(0, gr + (r - gr) * (1 + sat))); g = Math.min(255, Math.max(0, gr + (g - gr) * (1 + sat))); b = Math.min(255, Math.max(0, gr + (b - gr) * (1 + sat))); }
      a = a * op;

      dstData[di] = r; dstData[di + 1] = g; dstData[di + 2] = b; dstData[di + 3] = a;
    }
  }

  const warpedCanvas = document.createElement('canvas');
  warpedCanvas.width = Math.ceil(dstW);
  warpedCanvas.height = Math.ceil(dstH);
  const warpedCtx = warpedCanvas.getContext('2d')!;
  warpedCtx.putImageData(dstImgData, 0, 0);

  ctx.drawImage(warpedCanvas, minX, minY, dstW, dstH);

  return { x: minX, y: minY, w: dstW, h: dstH };
}

// ── Shadow for canvas export ──
export function renderExportShadow(
  ctx: CanvasRenderingContext2D,
  corners: { tl: { x: number; y: number }; tr: { x: number; y: number }; bl: { x: number; y: number }; br: { x: number; y: number } },
  shadow: { angle: number; distance: number; blur: number; opacity: number },
  canvasW: number,
  canvasH: number
) {
  const cx = ((corners.tl.x + corners.tr.x + corners.bl.x + corners.br.x) / 4) * canvasW;
  const cy = ((corners.tl.y + corners.tr.y + corners.bl.y + corners.br.y) / 4) * canvasH;
  const angleRad = shadow.angle * Math.PI / 180;
  const w = (corners.tr.x - corners.tl.x + corners.br.x - corners.bl.x) / 2 * canvasW;
  const h = (corners.bl.y - corners.tl.y + corners.br.y - corners.tr.y) / 2 * canvasH;

  ctx.save();
  for (let i = 0; i < 3; i++) {
    const o = shadow.opacity * (1 - i * 0.3);
    const blr = shadow.blur * (1 + i * 0.5);
    const dist = shadow.distance * (1 + i * 0.4);
    const lx = Math.cos(angleRad) * dist * (canvasW / 100);
    const ly = Math.sin(angleRad) * dist * (canvasH / 100);
    ctx.shadowColor = `rgba(0,0,0,${o})`;
    ctx.shadowBlur = blr;
    ctx.shadowOffsetX = lx;
    ctx.shadowOffsetY = ly;
    ctx.fillStyle = 'rgba(0,0,0,0.01)';
    ctx.fillRect(cx - w / 2 + lx, cy - h / 2 + ly, w, h);
  }
  ctx.restore();
}

// ── Vignette for canvas export ──
export function renderVignette(ctx: CanvasRenderingContext2D, w: number, h: number, strength = 0.3) {
  const g = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.8);
  g.addColorStop(0, 'transparent');
  g.addColorStop(1, `rgba(0,0,0,${strength})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}
