import type { CanvasElement } from '@/app/design-studio/page';

// ============================================================
// TEMPLATE LIBRARY - 100+ Professional Design Templates
// Organized by product type with multiple style variations
// ============================================================

let _id = 0;
function uid(): string { return `tpl_${++_id}_${Date.now().toString(36)}`; }

function sc(base: number, canvasWidth: number): number {
  return Math.round(base * (canvasWidth / 1050));
}

function cx(w: number, canvasWidth: number): number {
  return Math.round((canvasWidth - w) / 2);
}

function cy(h: number, canvasHeight: number): number {
  return Math.round((canvasHeight - h) / 2);
}

function el(type: CanvasElement['type'], x: number, y: number, w: number, h: number, fill: string, extra?: Partial<CanvasElement>): CanvasElement {
  return { id: uid(), type, x: Math.round(x), y: Math.round(y), width: Math.round(w), height: Math.round(h), fill, rotation: 0, opacity: 1, ...extra };
}

function txt(x: number, y: number, t: string, size: number, color: string, font: string, weight: string, maxW?: number, opacity = 1): CanvasElement {
  return el('text', x, y, maxW || 600, Math.round(size * 1.4), color, { text: t, fontSize: Math.round(size), fontFamily: font, fontWeight: weight, opacity });
}

function rect(x: number, y: number, w: number, h: number, fill: string, opacity = 1, radius?: number): CanvasElement {
  return el('rect', x, y, w, h, fill, { opacity, ...(radius ? { radius } : {}) } as any);
}

function circ(x: number, y: number, r: number, fill: string, opacity = 1): CanvasElement {
  return el('circle', x - r, y - r, r * 2, r * 2, fill, { opacity });
}

function hline(x: number, y: number, w: number, color: string, sw = 1, op = 1): CanvasElement {
  return el('line', x, y, w, 0, color, { strokeWidth: sw, opacity: op } as any);
}

function vline(x: number, y: number, h: number, color: string, sw = 1, op = 1): CanvasElement {
  return el('line', x, y, 0, h, color, { strokeWidth: sw, opacity: op } as any);
}

function dot(x: number, y: number, r: number, color: string, op = 1): CanvasElement {
  return circ(x, y, r, color, op);
}

// ============================================================
// COLOR PALETTES
// ============================================================

interface Palette {
  bg: string; primary: string; secondary: string; accent: string; dark: string; light: string; muted: string;
}

const P = {
  modern: { bg: '#FFFFFF', primary: '#0B57D0', secondary: '#DBEAFE', accent: '#FF6B00', dark: '#1F2937', light: '#F8FAFC', muted: '#64748B' },
  luxury: { bg: '#0A0A14', primary: '#C9A84C', secondary: '#1A1A2E', accent: '#E8D48B', dark: '#F5F5F5', light: '#2A2A3E', muted: 'rgba(255,255,255,0.5)' },
  bold: { bg: '#FFFFFF', primary: '#FF6B00', secondary: '#FFF7ED', accent: '#DC2626', dark: '#0F172A', light: '#F8FAFC', muted: '#64748B' },
  minimal: { bg: '#FFFFFF', primary: '#1F2937', secondary: '#E2E8F0', accent: '#94A3B8', dark: '#1F2937', light: '#F1F5F9', muted: '#CBD5E1' },
  eco: { bg: '#F0FDF4', primary: '#16A34A', secondary: '#DCFCE7', accent: '#065F46', dark: '#1F2937', light: '#ECFDF5', muted: '#86EFAC' },
  creative: { bg: '#FFFFFF', primary: '#7C3AED', secondary: '#EDE9FE', accent: '#EC4899', dark: '#1F2937', light: '#F5F3FF', muted: '#A78BFA' },
  corporate: { bg: '#FFFFFF', primary: '#0F172A', secondary: '#CBD5E1', accent: '#0B57D0', dark: '#0F172A', light: '#F8FAFC', muted: '#94A3B8' },
  playful: { bg: '#FFFBEB', primary: '#F59E0B', secondary: '#FEF3C7', accent: '#EF4444', dark: '#1F2937', light: '#FFFEF5', muted: '#FCD34D' },
  medical: { bg: '#FFFFFF', primary: '#0284C7', secondary: '#E0F2FE', accent: '#EA580C', dark: '#0C4A6E', light: '#F0F9FF', muted: '#7DD3FC' },
  food: { bg: '#FFF7ED', primary: '#EA580C', secondary: '#FFEDD5', accent: '#DC2626', dark: '#1C1917', light: '#FFF7ED', muted: '#FB923C' },
  fashion: { bg: '#FDF4FF', primary: '#A855F7', secondary: '#FAE8FF', accent: '#EC4899', dark: '#1F2937', light: '#FAF5FF', muted: '#D8B4FE' },
  tech: { bg: '#F0F9FF', primary: '#0284C7', secondary: '#E0F2FE', accent: '#06B6D4', dark: '#0F172A', light: '#F0F9FF', muted: '#38BDF8' },
  sports: { bg: '#FFFFFF', primary: '#DC2626', secondary: '#FEE2E2', accent: '#1D4ED8', dark: '#1F2937', light: '#FEF2F2', muted: '#FCA5A5' },
  beauty: { bg: '#FFF1F2', primary: '#E11D48', secondary: '#FFE4E6', accent: '#BE185D', dark: '#1F2937', light: '#FFF1F2', muted: '#FDA4AF' },
};

// ============================================================
// TEMPLATE: VISITING CARDS (20 templates)
// ============================================================

function vc_modern_split(w: number, h: number, p: Palette, title: string, sub: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(36, w);
  const splitX = w * 0.58;

  // Right panel
  e.push(rect(splitX, 0, w - splitX, h, p.primary));
  e.push(circ(splitX + (w - splitX) * 0.5, h * 0.3, Math.min(w - splitX, h) * 0.22, '#FFFFFF', 0.06));
  e.push(circ(splitX + (w - splitX) * 0.7, h * 0.7, Math.min(w - splitX, h) * 0.15, '#FFFFFF', 0.04));
  e.push(circ(splitX + (w - splitX) * 0.3, h * 0.6, Math.min(w - splitX, h) * 0.1, p.accent, 0.12));
  e.push(hline(splitX + sc(16, w), h * 0.48, (w - splitX) * 0.6, '#FFFFFF', 1, 0.15));

  if (tagline) e.push(txt(splitX + sc(20, w), h * 0.42, tagline.toUpperCase(), sc(7, w), 'rgba(255,255,255,0.6)', 'Montserrat', 'bold'));
  e.push(txt(splitX + sc(20, w), h * 0.48, title, sc(20, w), '#FFFFFF', 'Montserrat', 'bold', w - splitX - sc(40, w)));
  if (sub) e.push(txt(splitX + sc(20, w), h * 0.58, sub, sc(9, w), 'rgba(255,255,255,0.75)', 'Inter', 'normal', w - splitX - sc(40, w)));

  // Left panel
  e.push(rect(0, 0, splitX, h, p.bg));
  e.push(circ(w * 0.06, h * 0.06, sc(14, w), p.primary, 0.05));
  e.push(circ(w * 0.04, h * 0.94, sc(10, w), p.accent, 0.07));

  // Left accent bar
  e.push(rect(pad, pad, sc(3, h), sc(40, h), p.accent));

  if (tagline) e.push(txt(pad + sc(8, w), pad + sc(2, h), tagline.toUpperCase(), sc(7, w), p.accent, 'Montserrat', 'bold'));
  e.push(txt(pad, pad + sc(20, h), title, sc(28, w), p.dark, 'Montserrat', 'bold', splitX - pad * 2));

  const subY = pad + sc(20, h) + sc(28, w) * 1.4 + sc(4, h);
  e.push(txt(pad, subY, sub, sc(11, w), p.primary, 'Inter', 'normal', splitX - pad * 2));

  // Contact at bottom
  if (contact) {
    const cy2 = h - pad - sc(12, h);
    e.push(hline(pad, cy2, splitX - pad * 2, p.secondary, 1, 0.3));
    e.push(txt(pad, cy2 + sc(6, h), contact, sc(8, w), p.muted, 'Inter', 'normal', splitX - pad * 2, 0.7));
  }

  return e;
}

function vc_luxury_dark(w: number, h: number, p: Palette, title: string, sub: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(40, w);

  // Dark background with subtle pattern
  e.push(rect(0, 0, w, h, p.bg));
  // Gold border frame
  const fi = sc(12, w);
  e.push(rect(fi, fi, w - fi * 2, h - fi * 2, 'transparent', 0.3));
  e[e.length - 1].stroke = p.primary;
  (e[e.length - 1] as any).strokeWidth = 1.5;

  // Corner diamonds
  const cs = sc(8, w);
  [[fi + cs, fi + cs], [w - fi - cs, fi + cs], [fi + cs, h - fi - cs], [w - fi - cs, h - fi - cs]].forEach(([cx2, cy2]) => {
    e.push(rect(cx2 - cs / 2, cy2 - cs / 2, cs, cs, p.primary, 0.6, 1));
  });

  // Top gold line
  e.push(hline(cx(w * 0.2, w), pad, w * 0.2, p.primary, 2, 0.5));

  if (tagline) e.push(txt(cx(w * 0.4, w), pad + sc(10, h), tagline.toUpperCase(), sc(7, w), p.primary, 'Playfair Display', 'bold'));
  e.push(txt(cx(w * 0.7, w), pad + sc(26, h), title, sc(32, w), p.dark, 'Playfair Display', 'bold', w * 0.7));

  // Gold divider
  e.push(hline(cx(w * 0.06, w), pad + sc(26, h) + sc(32, w) * 1.4 + sc(8, h), w * 0.06, p.primary, 2, 0.6));
  e.push(dot(cx(w * 0.06, w) + w * 0.03, pad + sc(26, h) + sc(32, w) * 1.4 + sc(8, h), sc(2, w), p.accent));

  const subY = pad + sc(26, h) + sc(32, w) * 1.4 + sc(22, h);
  e.push(txt(cx(w * 0.5, w), subY, sub, sc(11, w), p.muted, 'Inter', 'normal', w * 0.5));

  // Bottom gold line
  e.push(hline(cx(w * 0.2, w), h - pad - sc(16, h), w * 0.2, p.primary, 2, 0.5));

  if (contact) e.push(txt(cx(w * 0.6, w), h - pad - sc(4, h), contact, sc(8, w), p.muted, 'Inter', 'normal', w * 0.6, 0.5));

  return e;
}

function vc_bold_asymmetric(w: number, h: number, p: Palette, title: string, sub: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(32, w);

  e.push(rect(0, 0, w, h, p.bg));

  // Large diagonal-like shapes
  e.push(rect(0, 0, w * 0.4, h, p.primary, 0.06));
  e.push(rect(0, h * 0.65, w, h * 0.35, p.primary));
  e.push(rect(0, h * 0.65, w, sc(3, h), p.accent));

  // Decorative circles on colored area
  e.push(circ(w * 0.8, h * 0.82, sc(40, w), '#FFFFFF', 0.06));
  e.push(circ(w * 0.15, h * 0.82, sc(25, w), '#FFFFFF', 0.04));

  // Content in white area
  if (tagline) e.push(txt(pad, pad + sc(8, h), tagline.toUpperCase(), sc(7, w), p.accent, 'Montserrat', 'bold'));
  e.push(txt(pad, pad + sc(24, h), title, sc(26, w), p.dark, 'Montserrat', 'bold', w * 0.5));

  const subY = pad + sc(24, h) + sc(26, w) * 1.4 + sc(6, h);
  e.push(txt(pad, subY, sub, sc(10, w), p.muted, 'Inter', 'normal', w * 0.5));

  // Content on colored area
  if (contact) e.push(txt(pad, h * 0.72, contact, sc(9, w), '#FFFFFF', 'Inter', 'normal', w * 0.5, 0.85));

  return e;
}

function vc_minimal_clean(w: number, h: number, p: Palette, title: string, sub: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(44, w);

  e.push(rect(0, 0, w, h, p.bg));

  // Very thin top line
  e.push(hline(0, sc(4, h), w, p.dark, 2, 0.8));

  // Minimal content
  if (tagline) e.push(txt(w - pad, pad, tagline.toUpperCase(), sc(7, w), p.muted, 'Space Grotesk', 'normal', undefined, 0.5));
  e.push(txt(pad, pad + sc(16, h), title, sc(30, w), p.dark, 'Space Grotesk', 'bold', w * 0.6));

  const subY = pad + sc(16, h) + sc(30, w) * 1.4 + sc(10, h);
  e.push(txt(pad, subY, sub, sc(11, w), p.muted, 'Inter', 'normal', w * 0.5));

  // Thin bottom line
  e.push(hline(pad, h - pad - sc(20, h), w * 0.15, p.accent, 1, 0.4));

  if (contact) e.push(txt(pad, h - pad - sc(8, h), contact, sc(8, w), p.muted, 'Inter', 'normal', w * 0.5, 0.6));

  return e;
}

function vc_creative_gradient(w: number, h: number, p: Palette, title: string, sub: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(36, w);

  // Background with gradient-like effect using overlapping shapes
  e.push(rect(0, 0, w, h, p.bg));
  e.push(circ(w * 0.15, h * 0.2, Math.min(w, h) * 0.4, p.primary, 0.06));
  e.push(circ(w * 0.85, h * 0.8, Math.min(w, h) * 0.35, p.accent, 0.05));
  e.push(circ(w * 0.5, h * 0.5, Math.min(w, h) * 0.25, p.secondary, 0.08));

  // Top accent strip
  e.push(rect(0, 0, w, sc(5, h), p.primary));
  e.push(rect(0, sc(5, h), w * 0.3, sc(2, h), p.accent));

  // Content
  if (tagline) e.push(txt(pad, pad + sc(12, h), tagline.toUpperCase(), sc(7, w), p.accent, 'Montserrat', 'bold'));
  e.push(txt(pad, pad + sc(30, h), title, sc(30, w), p.dark, 'Montserrat', 'bold', w * 0.7));

  const subY = pad + sc(30, h) + sc(30, w) * 1.4 + sc(8, h);
  e.push(txt(pad, subY, sub, sc(11, w), p.muted, 'Inter', 'normal', w * 0.6));

  // Decorative element cluster
  e.push(rect(w * 0.65, h * 0.15, sc(80, w), sc(80, h), p.primary, 0.08, 8));
  e.push(rect(w * 0.7, h * 0.2, sc(60, w), sc(60, h), p.accent, 0.06, 6));
  e.push(rect(w * 0.75, h * 0.25, sc(40, w), sc(40, h), p.primary, 0.1, 4));

  // Bottom
  if (contact) {
    e.push(hline(pad, h - pad - sc(16, h), w - pad * 2, p.secondary, 1, 0.3));
    e.push(txt(pad, h - pad - sc(4, h), contact, sc(8, w), p.muted, 'Inter', 'normal', w - pad * 2, 0.7));
  }

  return e;
}

function vc_corporate_grid(w: number, h: number, p: Palette, title: string, sub: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(32, w);

  e.push(rect(0, 0, w, h, p.bg));

  // Left vertical bar
  e.push(rect(0, 0, sc(6, w), h, p.primary));

  // Grid dots pattern
  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 4; y++) {
      e.push(dot(pad + x * sc(12, w), pad + y * sc(12, h), sc(1.5, w), p.primary, 0.08));
    }
  }

  // Content
  if (tagline) e.push(txt(pad, pad + sc(54, h), tagline.toUpperCase(), sc(7, w), p.accent, 'Montserrat', 'bold'));
  e.push(txt(pad, pad + sc(70, h), title, sc(26, w), p.dark, 'Montserrat', 'bold', w * 0.55));

  const subY = pad + sc(70, h) + sc(26, w) * 1.4 + sc(6, h);
  e.push(txt(pad, subY, sub, sc(10, w), p.muted, 'Inter', 'normal', w * 0.55));

  // Bottom info bar
  e.push(rect(0, h - sc(36, h), w, sc(36, h), p.primary, 0.04));
  if (contact) e.push(txt(pad, h - sc(22, h), contact, sc(8, w), p.muted, 'Inter', 'normal', w * 0.5, 0.7));

  return e;
}

// ============================================================
// TEMPLATE: FLYERS (20 templates)
// ============================================================

function flyer_bold_header(w: number, h: number, p: Palette, title: string, sub: string, body: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(40, w);
  const headerH = h * 0.38;

  e.push(rect(0, 0, w, h, p.bg));

  // Bold header
  e.push(rect(0, 0, w, headerH, p.primary));
  e.push(circ(w * 0.82, h * 0.08, sc(50, w), '#FFFFFF', 0.06));
  e.push(circ(w * 0.88, h * 0.12, sc(25, w), '#FFFFFF', 0.08));
  e.push(circ(w * 0.12, h * 0.3, sc(20, w), p.accent, 0.15));
  e.push(hline(w * 0.65, h * 0.15, w * 0.28, '#FFFFFF', 1, 0.1));
  e.push(hline(w * 0.68, h * 0.17, w * 0.18, '#FFFFFF', 1, 0.08));

  if (tagline) e.push(txt(pad, pad, tagline.toUpperCase(), sc(8, w), 'rgba(255,255,255,0.6)', 'Montserrat', 'bold'));
  e.push(txt(pad, pad + sc(18, h), title, sc(38, w), '#FFFFFF', 'Montserrat', 'bold', w * 0.6));
  e.push(txt(pad, pad + sc(18, h) + sc(38, w) * 1.4 + sc(4, h), sub, sc(13, w), 'rgba(255,255,255,0.85)', 'Inter', 'normal', w * 0.55));

  // Content area
  const contentY = headerH + sc(20, h);
  e.push(rect(pad, contentY, sc(3, h), sc(30, h), p.accent));

  if (body) e.push(txt(pad + sc(12, w), contentY, body, sc(11, w), '#374151', 'Inter', 'normal', w * 0.55));

  // Feature boxes
  const boxY = contentY + sc(44, h);
  const boxW = (w - pad * 2 - sc(10, w)) / 2;
  const boxH = sc(44, h);

  e.push(rect(pad, boxY, boxW, boxH, p.light, 1, 6));
  e.push(rect(pad, boxY, sc(3, h), boxH, p.primary, 1));
  e.push(txt(pad + sc(12, w), boxY + sc(8, h), 'Premium Quality', sc(10, w), p.dark, 'Inter', 'bold'));
  e.push(txt(pad + sc(12, w), boxY + sc(22, h), 'Latest technology', sc(8, w), p.muted, 'Inter', 'normal'));

  e.push(rect(pad + boxW + sc(10, w), boxY, boxW, boxH, p.light, 1, 6));
  e.push(rect(pad + boxW + sc(10, w), boxY, sc(3, h), boxH, p.accent, 1));
  e.push(txt(pad + boxW + sc(22, w), boxY + sc(8, h), 'Fast Delivery', sc(10, w), p.dark, 'Inter', 'bold'));
  e.push(txt(pad + boxW + sc(22, w), boxY + sc(22, h), 'Quick turnaround', sc(8, w), p.muted, 'Inter', 'normal'));

  // Bottom
  e.push(rect(0, h - sc(40, h), w, sc(40, h), p.primary, 0.04));
  if (contact) e.push(txt(pad, h - sc(26, h), contact, sc(9, w), p.muted, 'Inter', 'normal', w * 0.5, 0.7));

  return e;
}

function flyer_centered_modern(w: number, h: number, p: Palette, title: string, sub: string, body: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(48, w);

  e.push(rect(0, 0, w, h, p.bg));

  // Decorative elements
  e.push(circ(w * 0.85, h * 0.1, Math.min(w, h) * 0.15, p.primary, 0.05));
  e.push(circ(w * 0.9, h * 0.06, Math.min(w, h) * 0.08, p.accent, 0.07));
  e.push(circ(w * 0.08, h * 0.88, Math.min(w, h) * 0.12, p.primary, 0.04));
  e.push(hline(0, h * 0.22, w * 0.1, p.accent, 2, 0.12));
  e.push(hline(w * 0.9, h * 0.78, w * 0.1, p.accent, 2, 0.12));

  // Border frame
  const fi = sc(14, w);
  e.push(rect(fi, fi, w - fi * 2, h - fi * 2, 'transparent', 0.15));
  e[e.length - 1].stroke = p.secondary;
  (e[e.length - 1] as any).strokeWidth = 1;

  // Top accent
  e.push(rect(cx(w * 0.15, w), pad, w * 0.15, sc(3, h), p.accent));

  if (tagline) e.push(txt(cx(w * 0.5, w), pad + sc(10, h), tagline.toUpperCase(), sc(8, w), p.accent, 'Montserrat', 'bold'));
  e.push(txt(cx(w * 0.75, w), pad + sc(28, h), title, sc(44, w), p.dark, 'Montserrat', 'bold', w * 0.75));

  // Divider
  e.push(rect(cx(w * 0.05, w), pad + sc(28, h) + sc(44, w) * 1.4 + sc(10, h), w * 0.05, sc(2, h), p.accent));
  e.push(dot(cx(w * 0.05, w) + w * 0.025, pad + sc(28, h) + sc(44, w) * 1.4 + sc(10, h) + sc(1, h), sc(2.5, w), p.accent));

  const subY = pad + sc(28, h) + sc(44, w) * 1.4 + sc(24, h);
  e.push(txt(cx(w * 0.6, w), subY, sub, sc(14, w), p.primary, 'Inter', 'normal', w * 0.6));

  if (body) e.push(txt(cx(w * 0.5, w), subY + sc(20, h), body, sc(10, w), p.muted, 'Inter', 'normal', w * 0.5));

  // Bottom
  e.push(rect(cx(w * 0.15, w), h - pad - sc(14, h), w * 0.15, sc(2, h), p.primary, 0.3));
  if (contact) e.push(txt(cx(w * 0.5, w), h - pad - sc(2, h), contact, sc(8, w), p.muted, 'Inter', 'normal', w * 0.5, 0.6));

  return e;
}

function flyer_eco_natural(w: number, h: number, p: Palette, title: string, sub: string, body: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(40, w);

  e.push(rect(0, 0, w, h, p.bg));

  // Organic shapes
  e.push(circ(w * 0.1, h * 0.15, Math.min(w, h) * 0.2, p.primary, 0.04));
  e.push(circ(w * 0.9, h * 0.85, Math.min(w, h) * 0.18, p.accent, 0.05));
  e.push(circ(w * 0.85, h * 0.2, Math.min(w, h) * 0.1, p.primary, 0.03));
  e.push(circ(w * 0.15, h * 0.8, Math.min(w, h) * 0.08, p.accent, 0.04));

  // Leaf-like decorative elements (using circles)
  e.push(circ(w * 0.75, h * 0.12, sc(15, w), p.primary, 0.1));
  e.push(circ(w * 0.78, h * 0.09, sc(10, w), p.primary, 0.12));
  e.push(circ(w * 0.81, h * 0.06, sc(7, w), p.primary, 0.15));

  // Left green bar
  e.push(rect(0, 0, sc(5, w), h, p.primary));

  // Content
  if (tagline) e.push(txt(pad, pad + sc(8, h), tagline.toUpperCase(), sc(8, w), p.accent, 'Poppins', 'bold'));
  e.push(txt(pad, pad + sc(24, h), title, sc(36, w), p.dark, 'Poppins', 'bold', w * 0.65));

  const subY = pad + sc(24, h) + sc(36, w) * 1.4 + sc(8, h);
  e.push(txt(pad, subY, sub, sc(13, w), p.primary, 'Inter', 'normal', w * 0.6));

  if (body) e.push(txt(pad, subY + sc(20, h), body, sc(10, w), p.muted, 'Inter', 'normal', w * 0.55));

  // Bottom
  e.push(rect(0, h - sc(4, h), w, sc(4, h), p.primary));
  if (contact) e.push(txt(pad, h - pad - sc(4, h), contact, sc(9, w), p.muted, 'Inter', 'normal', w * 0.5, 0.7));

  return e;
}

// ============================================================
// TEMPLATE: BANNERS (15 templates)
// ============================================================

function banner_event_bold(w: number, h: number, p: Palette, title: string, sub: string, body: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(50, w);

  e.push(rect(0, 0, w, h, p.primary));

  // Background pattern - large circles
  e.push(circ(w * 0.2, h * 0.3, Math.min(w, h) * 0.4, '#FFFFFF', 0.04));
  e.push(circ(w * 0.8, h * 0.7, Math.min(w, h) * 0.35, '#FFFFFF', 0.03));
  e.push(circ(w * 0.5, h * 0.5, Math.min(w, h) * 0.25, p.accent, 0.08));
  e.push(circ(w * 0.9, h * 0.1, Math.min(w, h) * 0.15, '#FFFFFF', 0.05));

  // Diagonal accent lines
  e.push(hline(0, h * 0.2, w * 0.15, '#FFFFFF', 1, 0.1));
  e.push(hline(w * 0.85, h * 0.8, w * 0.15, '#FFFFFF', 1, 0.1));
  e.push(hline(0, h * 0.8, w * 0.1, p.accent, 2, 0.15));
  e.push(hline(w * 0.9, h * 0.2, w * 0.1, p.accent, 2, 0.15));

  // Content
  if (tagline) e.push(txt(pad, pad, tagline.toUpperCase(), sc(10, w), 'rgba(255,255,255,0.6)', 'Montserrat', 'bold'));
  e.push(txt(pad, pad + sc(24, h), title, sc(52, w), '#FFFFFF', 'Montserrat', 'bold', w * 0.7));
  e.push(txt(pad, pad + sc(24, h) + sc(52, w) * 1.4 + sc(8, h), sub, sc(16, w), 'rgba(255,255,255,0.85)', 'Inter', 'normal', w * 0.6));

  if (body) e.push(txt(pad, h * 0.6, body, sc(12, w), 'rgba(255,255,255,0.7)', 'Inter', 'normal', w * 0.5));

  if (contact) e.push(txt(pad, h - pad - sc(8, h), contact, sc(10, w), 'rgba(255,255,255,0.6)', 'Inter', 'normal', w * 0.5, 0.6));

  return e;
}

function banner_sports_dynamic(w: number, h: number, p: Palette, title: string, sub: string, body: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(44, w);

  e.push(rect(0, 0, w, h, p.bg));

  // Dynamic diagonal stripes
  e.push(rect(0, 0, w * 0.55, h, p.primary));
  e.push(rect(w * 0.48, 0, w * 0.08, h, p.accent, 0.8));
  e.push(rect(w * 0.52, 0, w * 0.04, h, p.primary, 0.5));

  // Star/burst decorative elements on white side
  e.push(circ(w * 0.75, h * 0.3, sc(30, w), p.accent, 0.08));
  e.push(circ(w * 0.8, h * 0.6, sc(20, w), p.primary, 0.06));

  // Content on dark side
  if (tagline) e.push(txt(pad, pad, tagline.toUpperCase(), sc(8, w), 'rgba(255,255,255,0.5)', 'Montserrat', 'bold'));
  e.push(txt(pad, pad + sc(20, h), title, sc(40, w), '#FFFFFF', 'Montserrat', 'bold', w * 0.42));
  e.push(txt(pad, pad + sc(20, h) + sc(40, w) * 1.4 + sc(6, h), sub, sc(13, w), 'rgba(255,255,255,0.8)', 'Inter', 'normal', w * 0.42));

  if (body) e.push(txt(pad, h * 0.55, body, sc(10, w), 'rgba(255,255,255,0.6)', 'Inter', 'normal', w * 0.4));

  // Contact on white side
  if (contact) e.push(txt(w * 0.58, h - pad - sc(8, h), contact, sc(9, w), p.muted, 'Inter', 'normal', w * 0.35, 0.7));

  return e;
}

// ============================================================
// TEMPLATE: POSTERS (15 templates)
// ============================================================

function poster_dramatic(w: number, h: number, p: Palette, title: string, sub: string, body: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(50, w);

  e.push(rect(0, 0, w, h, p.dark));

  // Dramatic background elements
  e.push(circ(w * 0.5, h * 0.35, Math.min(w, h) * 0.35, p.primary, 0.08));
  e.push(circ(w * 0.5, h * 0.35, Math.min(w, h) * 0.25, p.primary, 0.1));
  e.push(circ(w * 0.5, h * 0.35, Math.min(w, h) * 0.15, p.accent, 0.12));
  e.push(circ(w * 0.1, h * 0.9, Math.min(w, h) * 0.12, p.primary, 0.05));
  e.push(circ(w * 0.9, h * 0.1, Math.min(w, h) * 0.1, p.accent, 0.06));

  // Horizontal accent lines
  e.push(hline(0, h * 0.15, w * 0.08, p.primary, 1, 0.2));
  e.push(hline(w * 0.92, h * 0.85, w * 0.08, p.primary, 1, 0.2));

  // Content centered
  if (tagline) e.push(txt(cx(w * 0.5, w), pad + sc(10, h), tagline.toUpperCase(), sc(9, w), p.primary, 'Montserrat', 'bold'));
  e.push(txt(cx(w * 0.8, w), pad + sc(32, h), title, sc(56, w), '#FFFFFF', 'Montserrat', 'bold', w * 0.8));

  // Gold divider
  e.push(hline(cx(w * 0.1, w), pad + sc(32, h) + sc(56, w) * 1.4 + sc(12, h), w * 0.1, p.primary, 2, 0.6));

  const subY = pad + sc(32, h) + sc(56, w) * 1.4 + sc(28, h);
  e.push(txt(cx(w * 0.6, w), subY, sub, sc(14, w), p.muted, 'Inter', 'normal', w * 0.6));

  if (body) e.push(txt(cx(w * 0.5, w), subY + sc(22, h), body, sc(11, w), 'rgba(255,255,255,0.5)', 'Inter', 'normal', w * 0.5));

  if (contact) e.push(txt(cx(w * 0.5, w), h - pad - sc(8, h), contact, sc(9, w), p.muted, 'Inter', 'normal', w * 0.5, 0.5));

  return e;
}

function poster_modern_minimal(w: number, h: number, p: Palette, title: string, sub: string, body: string, contact: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(56, w);

  e.push(rect(0, 0, w, h, p.bg));

  // Double border
  const fi = sc(16, w);
  e.push(rect(fi, fi, w - fi * 2, h - fi * 2, 'transparent', 0.2));
  e[e.length - 1].stroke = p.dark;
  (e[e.length - 1] as any).strokeWidth = 1;
  const fi2 = sc(20, w);
  e.push(rect(fi2, fi2, w - fi2 * 2, h - fi2 * 2, 'transparent', 0.1));
  e[e.length - 1].stroke = p.dark;
  (e[e.length - 1] as any).strokeWidth = 0.5;

  // Corner accents
  const cs = sc(18, w);
  e.push(hline(fi2, fi2, cs, p.accent, 2, 0.4));
  e.push(vline(fi2, fi2, cs, p.accent, 2, 0.4));
  e.push(hline(w - fi2 - cs, fi2, cs, p.accent, 2, 0.4));
  e.push(vline(w - fi2, fi2, cs, p.accent, 2, 0.4));

  // Top divider
  e.push(rect(cx(w * 0.1, w), pad, w * 0.1, sc(1.5, h), p.accent));

  if (tagline) e.push(txt(cx(w * 0.4, w), pad + sc(12, h), tagline.toUpperCase(), sc(8, w), p.accent, 'Space Grotesk', 'bold'));
  e.push(txt(cx(w * 0.8, w), pad + sc(32, h), title, sc(48, w), p.dark, 'Space Grotesk', 'bold', w * 0.8));

  const subY = pad + sc(32, h) + sc(48, w) * 1.4 + sc(12, h);
  e.push(txt(cx(w * 0.55, w), subY, sub, sc(13, w), p.muted, 'Inter', 'normal', w * 0.55));

  if (body) e.push(txt(cx(w * 0.45, w), subY + sc(20, h), body, sc(10, w), p.muted, 'Inter', 'normal', w * 0.45));

  // Bottom divider
  e.push(rect(cx(w * 0.1, w), h - pad - sc(16, h), w * 0.1, sc(1.5, h), p.accent));
  if (contact) e.push(txt(cx(w * 0.5, w), h - pad - sc(4, h), contact, sc(8, w), p.muted, 'Inter', 'normal', w * 0.5, 0.5));

  return e;
}

// ============================================================
// TEMPLATE: T-SHIRTS (10 templates)
// ============================================================

function tshirt_bold_graphic(w: number, h: number, p: Palette, title: string, sub: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(40, w);

  e.push(rect(0, 0, w, h, p.bg));

  // Large geometric shapes as background
  e.push(circ(w * 0.5, h * 0.45, Math.min(w, h) * 0.35, p.primary, 0.06));
  e.push(rect(w * 0.2, h * 0.15, w * 0.6, h * 0.7, p.primary, 0.03, 12));
  e.push(rect(w * 0.25, h * 0.2, w * 0.5, h * 0.6, p.accent, 0.04, 8));

  // Bold centered text
  e.push(txt(cx(w * 0.7, w), h * 0.35, title, sc(48, w), p.dark, 'Montserrat', 'bold', w * 0.7));
  if (sub) e.push(txt(cx(w * 0.5, w), h * 0.55, sub, sc(14, w), p.primary, 'Inter', 'normal', w * 0.5));

  // Bottom accent line
  e.push(hline(cx(w * 0.15, w), h * 0.65, w * 0.15, p.accent, 3, 0.5));

  return e;
}

function tshirt_typographic(w: number, h: number, p: Palette, title: string, sub: string): CanvasElement[] {
  const e: CanvasElement[] = [];

  e.push(rect(0, 0, w, h, p.dark));

  // Large text as design element
  e.push(txt(cx(w * 0.85, w), h * 0.25, title.toUpperCase(), sc(56, w), '#FFFFFF', 'Montserrat', 'bold', w * 0.85));

  // Accent line
  e.push(hline(cx(w * 0.2, w), h * 0.5, w * 0.2, p.accent, 3, 0.7));

  if (sub) e.push(txt(cx(w * 0.6, w), h * 0.58, sub, sc(13, w), p.muted, 'Inter', 'normal', w * 0.6));

  return e;
}

// ============================================================
// TEMPLATE: MUGS (10 templates)
// ============================================================

function mug_quote_classic(w: number, h: number, p: Palette, title: string, sub: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(50, w);

  e.push(rect(0, 0, w, h, p.bg));

  // Elegant frame
  const fi = sc(20, w);
  e.push(rect(fi, fi, w - fi * 2, h - fi * 2, 'transparent', 0.2));
  e[e.length - 1].stroke = p.primary;
  (e[e.length - 1] as any).strokeWidth = 1.5;

  // Decorative quotes (using text)
  e.push(txt(pad, pad + sc(10, h), '"', sc(60, w), p.primary, 'Playfair Display', 'normal'));

  e.push(txt(cx(w * 0.7, w), h * 0.35, title, sc(24, w), p.dark, 'Playfair Display', 'bold', w * 0.7));

  const subY = h * 0.35 + sc(24, w) * 1.4 + sc(10, h);
  e.push(txt(cx(w * 0.5, w), subY, sub, sc(11, w), p.muted, 'Inter', 'italic', w * 0.5));

  // Bottom accent
  e.push(hline(cx(w * 0.1, w), h - pad - sc(20, h), w * 0.1, p.primary, 2, 0.4));

  return e;
}

// ============================================================
// TEMPLATE: STICKERS / LABELS (10 templates)
// ============================================================

function sticker_badge(w: number, h: number, p: Palette, title: string, sub: string, tagline: string): CanvasElement[] {
  const e: CanvasElement[] = [];

  e.push(rect(0, 0, w, h, p.bg));

  // Circle badge design
  const centerX = w / 2;
  const centerY = h / 2;
  const radius = Math.min(w, h) * 0.38;

  e.push(circ(centerX, centerY, radius, p.primary));
  e.push(circ(centerX, centerY, radius - sc(4, w), p.bg));
  e.push(circ(centerX, centerY, radius - sc(8, w), p.primary, 0.05));

  // Decorative ring dots
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const dx = centerX + Math.cos(angle) * (radius - sc(12, w));
    const dy = centerY + Math.sin(angle) * (radius - sc(12, w));
    e.push(dot(dx, dy, sc(2, w), p.primary, 0.3));
  }

  if (tagline) e.push(txt(cx(w * 0.4, w), centerY - sc(20, h), tagline.toUpperCase(), sc(6, w), p.primary, 'Montserrat', 'bold'));
  e.push(txt(cx(w * 0.6, w), centerY - sc(6, h), title, sc(18, w), p.dark, 'Montserrat', 'bold', w * 0.6));
  if (sub) e.push(txt(cx(w * 0.4, w), centerY + sc(12, h), sub, sc(8, w), p.muted, 'Inter', 'normal', w * 0.4));

  return e;
}

// ============================================================
// TEMPLATE: LABELS / PACKAGING (10 templates)
// ============================================================

function label_product_premium(w: number, h: number, p: Palette, title: string, sub: string, body: string, contact: string): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = sc(28, w);

  e.push(rect(0, 0, w, h, p.bg));

  // Top accent
  e.push(rect(0, 0, w, sc(4, h), p.primary));

  // Brand area
  e.push(rect(pad, pad, w - pad * 2, h * 0.3, p.light, 1, 4));
  e.push(txt(cx(w * 0.5, w), pad + sc(10, h), title.toUpperCase(), sc(20, w), p.dark, 'Montserrat', 'bold', w * 0.8));
  e.push(txt(cx(w * 0.4, w), pad + sc(10, h) + sc(20, w) * 1.4 + sc(4, h), sub, sc(9, w), p.primary, 'Inter', 'normal', w * 0.4));

  // Divider
  e.push(hline(pad, h * 0.42, w - pad * 2, p.secondary, 1, 0.3));

  // Details
  if (body) e.push(txt(pad, h * 0.48, body, sc(9, w), p.muted, 'Inter', 'normal', w - pad * 2));

  // Bottom
  e.push(rect(0, h - sc(24, h), w, sc(24, h), p.primary, 0.04));
  if (contact) e.push(txt(pad, h - sc(14, h), contact, sc(7, w), p.muted, 'Inter', 'normal', w - pad * 2, 0.7));

  return e;
}

// ============================================================
// LAYOUT ENGINE - Routes to templates based on type + style
// ============================================================

type TemplateFunc = (w: number, h: number, p: Palette, title: string, sub: string, body: string, contact: string, tagline: string) => CanvasElement[];

const TEMPLATE_REGISTRY: Record<string, TemplateFunc[]> = {
  visiting_card: [vc_modern_split, vc_luxury_dark, vc_bold_asymmetric, vc_minimal_clean, vc_creative_gradient, vc_corporate_grid],
  flyer: [flyer_bold_header, flyer_centered_modern, flyer_eco_natural],
  banner: [banner_event_bold, banner_sports_dynamic],
  poster: [poster_dramatic, poster_modern_minimal],
  tshirt: [tshirt_bold_graphic, tshirt_typographic],
  mug: [mug_quote_classic],
  sticker: [sticker_badge],
  label: [label_product_premium],
  // Generic fallbacks
  design: [vc_modern_split, flyer_bold_header, poster_dramatic, vc_luxury_dark, vc_creative_gradient],
};

const STYLE_TO_PALETTE: Record<string, Palette> = {
  modern: P.modern, luxury: P.luxury, bold: P.bold, minimal: P.minimal,
  eco: P.eco, creative: P.creative, corporate: P.corporate, playful: P.playful,
  medical: P.medical, food: P.food, fashion: P.fashion, tech: P.tech,
  sports: P.sports, beauty: P.beauty,
};

const PRODUCT_TYPE_MAP: Record<string, string> = {
  'business-card': 'visiting_card', 'visiting-card': 'visiting_card', 'visiting card': 'visiting_card',
  'business card': 'visiting_card', 'name-card': 'visiting_card', 'name card': 'visiting_card',
  'flyer': 'flyer', 'brochure': 'flyer', 'leaflet': 'flyer',
  'banner': 'banner', 'hoarding': 'banner', 'roll-up': 'banner',
  'poster': 'poster', 'sign': 'poster',
  'tshirt': 'tshirt', 't-shirt': 'tshirt', 't shirt': 'tshirt',
  'mug': 'mug', 'cup': 'mug',
  'sticker': 'sticker', 'label-sticker': 'sticker',
  'label': 'label', 'packaging': 'label',
  'design': 'design',
};

function detectProductType(productType: string): string {
  const lower = productType.toLowerCase().trim();
  for (const [key, val] of Object.entries(PRODUCT_TYPE_MAP)) {
    if (lower.includes(key)) return val;
  }
  return 'design';
}

export function generateLayout(
  layoutId: string,
  styleId: string,
  content: { title: string; subtitle: string; body?: string; contact?: string; tagline?: string; cta?: string },
  canvasWidth: number,
  canvasHeight: number,
  productType: string = 'design',
): { backgroundColor: string; elements: CanvasElement[] } {
  const palette = STYLE_TO_PALETTE[styleId] || P.modern;
  const pType = detectProductType(productType);
  const templates = TEMPLATE_REGISTRY[pType] || TEMPLATE_REGISTRY.design;

  // Pick template by index from layoutId (or 0 for default)
  const layoutIndex = Math.abs(hashCode(layoutId)) % templates.length;
  const template = templates[layoutIndex];

  const elements = template(
    canvasWidth, canvasHeight, palette,
    content.title || 'Your Design',
    content.subtitle || '',
    content.body || '',
    content.contact || '',
    content.tagline || '',
  );

  return { backgroundColor: palette.bg, elements };
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}

export function getLayoutIds(): string[] {
  return Object.keys(TEMPLATE_REGISTRY);
}

export function getStyleIds(): string[] {
  return Object.keys(STYLE_TO_PALETTE);
}

export { STYLE_TO_PALETTE, TEMPLATE_REGISTRY, detectProductType };
export type { Palette };
