import type { CanvasElement } from '@/app/design-studio/page';

// ============================================================
// DESIGN ENGINE v3 - Fixed templates, no content duplication
// Every text element appears EXACTLY ONCE
// ============================================================

let _id = 0;
function uid(): string { return `de${++_id}`; }

function s(base: number, cw: number): number { return Math.round(base * (cw / 1050)); }
function cx(w: number, cw: number): number { return Math.round((cw - w) / 2); }

function R(x: number, y: number, w: number, h: number, fill: string, opacity = 1, radius?: number): CanvasElement {
  return { id: uid(), type: 'rect', x: Math.round(x), y: Math.round(y), width: Math.round(w), height: Math.round(h), fill, rotation: 0, opacity, ...(radius ? { radius } : {}) } as any;
}

function C(x: number, y: number, r: number, fill: string, opacity = 1): CanvasElement {
  return { id: uid(), type: 'circle', x: Math.round(x - r), y: Math.round(y - r), width: Math.round(r * 2), height: Math.round(r * 2), fill, rotation: 0, opacity };
}

function T(x: number, y: number, text: string, size: number, color: string, font: string, weight: string, maxW?: number, opacity = 1): CanvasElement {
  return { id: uid(), type: 'text', x: Math.round(x), y: Math.round(y), width: Math.round(maxW || 600), height: Math.round(size * 1.4), fill: color, rotation: 0, opacity, text, fontSize: Math.round(size), fontFamily: font, fontWeight: weight } as any;
}

function HL(x: number, y: number, w: number, color: string, sw = 1, op = 1): CanvasElement {
  return { id: uid(), type: 'line', x: Math.round(x), y: Math.round(y), width: Math.round(w), height: 0, fill: color, rotation: 0, opacity: op, strokeWidth: sw } as any;
}

function VL(x: number, y: number, h: number, color: string, sw = 1, op = 1): CanvasElement {
  return { id: uid(), type: 'line', x: Math.round(x), y: Math.round(y), width: 0, height: Math.round(h), fill: color, rotation: 0, opacity: op, strokeWidth: sw } as any;
}

// ============================================================
// PALETTES
// ============================================================

interface P { bg: string; pri: string; sec: string; acc: string; dark: string; light: string; muted: string; white: string; }

const PAL: Record<string, P> = {
  modern:   { bg: '#FFFFFF', pri: '#0B57D0', sec: '#DBEAFE', acc: '#FF6B00', dark: '#1F2937', light: '#F8FAFC', muted: '#64748B', white: '#FFFFFF' },
  luxury:   { bg: '#0A0A14', pri: '#C9A84C', sec: '#1A1A2E', acc: '#E8D48B', dark: '#F5F5F5', light: '#2A2A3E', muted: 'rgba(255,255,255,0.5)', white: '#FFFFFF' },
  bold:     { bg: '#FFFFFF', pri: '#FF6B00', sec: '#FFF7ED', acc: '#DC2626', dark: '#0F172A', light: '#F8FAFC', muted: '#64748B', white: '#FFFFFF' },
  minimal:  { bg: '#FFFFFF', pri: '#1F2937', sec: '#E2E8F0', acc: '#94A3B8', dark: '#1F2937', light: '#F1F5F9', muted: '#CBD5E1', white: '#FFFFFF' },
  eco:      { bg: '#F0FDF4', pri: '#16A34A', sec: '#DCFCE7', acc: '#065F46', dark: '#1F2937', light: '#ECFDF5', muted: '#86EFAC', white: '#FFFFFF' },
  creative: { bg: '#FFFFFF', pri: '#7C3AED', sec: '#EDE9FE', acc: '#EC4899', dark: '#1F2937', light: '#F5F3FF', muted: '#A78BFA', white: '#FFFFFF' },
  corporate:{ bg: '#FFFFFF', pri: '#0F172A', sec: '#CBD5E1', acc: '#0B57D0', dark: '#0F172A', light: '#F8FAFC', muted: '#94A3B8', white: '#FFFFFF' },
  playful:  { bg: '#FFFBEB', pri: '#F59E0B', sec: '#FEF3C7', acc: '#EF4444', dark: '#1F2937', light: '#FFFEF5', muted: '#FCD34D', white: '#FFFFFF' },
  medical:  { bg: '#FFFFFF', pri: '#0284C7', sec: '#E0F2FE', acc: '#EA580C', dark: '#0C4A6E', light: '#F0F9FF', muted: '#7DD3FC', white: '#FFFFFF' },
  food:     { bg: '#FFF7ED', pri: '#EA580C', sec: '#FFEDD5', acc: '#DC2626', dark: '#1C1917', light: '#FFF7ED', muted: '#FB923C', white: '#FFFFFF' },
  fashion:  { bg: '#FDF4FF', pri: '#A855F7', sec: '#FAE8FF', acc: '#EC4899', dark: '#1F2937', light: '#FAF5FF', muted: '#D8B4FE', white: '#FFFFFF' },
  tech:     { bg: '#F0F9FF', pri: '#0284C7', sec: '#E0F2FE', acc: '#06B6D4', dark: '#0F172A', light: '#F0F9FF', muted: '#38BDF8', white: '#FFFFFF' },
  sports:   { bg: '#FFFFFF', pri: '#DC2626', sec: '#FEE2E2', acc: '#1D4ED8', dark: '#1F2937', light: '#FEF2F2', muted: '#FCA5A5', white: '#FFFFFF' },
  beauty:   { bg: '#FFF1F2', pri: '#E11D48', sec: '#FFE4E6', acc: '#BE185D', dark: '#1F2937', light: '#FFF1F2', muted: '#FDA4AF', white: '#FFFFFF' },
};

// ============================================================
// VISITING CARD TEMPLATES
// ============================================================

// SPLIT: Left = text, Right = colored panel with decorative shapes ONLY
function tpl_vc_split(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];
  const pad = s(36, w);
  const sx = Math.round(w * 0.56); // split line

  // RIGHT PANEL - colored with decorative shapes, NO text
  e.push(R(sx, 0, w - sx, h, p.pri));
  // Decorative overlapping circles
  e.push(C(sx + (w - sx) * 0.5, h * 0.3, Math.min(w - sx, h) * 0.24, '#FFFFFF', 0.07));
  e.push(C(sx + (w - sx) * 0.65, h * 0.65, Math.min(w - sx, h) * 0.16, '#FFFFFF', 0.05));
  e.push(C(sx + (w - sx) * 0.35, h * 0.7, Math.min(w - sx, h) * 0.11, p.acc, 0.14));
  // Accent lines on panel
  e.push(HL(sx + s(18, w), h * 0.5, (w - sx) * 0.55, '#FFFFFF', 1, 0.12));
  e.push(HL(sx + s(18, w), h * 0.52, (w - sx) * 0.35, '#FFFFFF', 1, 0.08));
  // Small dots cluster
  e.push(C(sx + (w - sx) * 0.8, h * 0.15, s(4, w), p.acc, 0.2));
  e.push(C(sx + (w - sx) * 0.85, h * 0.18, s(3, w), '#FFFFFF', 0.15));

  // LEFT PANEL - white with all text content
  e.push(R(0, 0, sx, h, p.bg));
  // Subtle corner accents
  e.push(C(w * 0.05, h * 0.05, s(12, w), p.pri, 0.04));
  e.push(C(w * 0.03, h * 0.95, s(8, w), p.acc, 0.06));

  // Vertical accent bar
  e.push(R(pad, pad, s(3, h), s(44, h), p.acc));

  // Tagline
  if (c.tagline) e.push(T(pad + s(10, w), pad + s(2, h), c.tagline.toUpperCase(), s(7, w), p.acc, 'Montserrat', 'bold'));

  // Title - BIG and bold
  const ts = s(30, w);
  e.push(T(pad, pad + s(22, h), c.title, ts, p.dark, 'Montserrat', 'bold', sx - pad * 2));

  // Subtitle
  const sy = pad + s(22, h) + Math.round(ts * 1.4) + s(6, h);
  e.push(T(pad, sy, c.subtitle, s(12, w), p.pri, 'Inter', 'normal', sx - pad * 2));

  // Body
  if (c.body) e.push(T(pad, sy + s(18, h), c.body, s(9, w), p.muted, 'Inter', 'normal', sx - pad * 2));

  // Contact section at bottom
  if (c.contact) {
    const cy = h - pad - s(10, h);
    e.push(HL(pad, cy, sx - pad * 2, p.sec, 1, 0.3));
    e.push(T(pad, cy + s(6, h), c.contact, s(8, w), p.muted, 'Inter', 'normal', sx - pad * 2, 0.7));
  }

  return e;
}

// ELEGANT: Double border, centered, luxury feel
function tpl_vc_elegant(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];
  const pad = s(44, w);

  e.push(R(0, 0, w, h, p.bg));

  // Double border frame
  const f1 = s(14, w);
  e.push(R(f1, f1, w - f1 * 2, h - f1 * 2, 'transparent', 0.25));
  e[e.length - 1].stroke = p.pri; (e[e.length - 1] as any).strokeWidth = 1.5;
  const f2 = s(18, w);
  e.push(R(f2, f2, w - f2 * 2, h - f2 * 2, 'transparent', 0.12));
  e[e.length - 1].stroke = p.pri; (e[e.length - 1] as any).strokeWidth = 0.5;

  // Corner accent marks
  const cs = s(16, w);
  [[f2, f2], [w - f2 - cs, f2], [f2, h - f2 - cs], [w - f2 - cs, h - f2 - cs]].forEach(([x, y]) => {
    e.push(HL(x, y, cs, p.acc, 2, 0.4));
    e.push(VL(x, y, cs, p.acc, 2, 0.4));
  });

  // Top divider
  e.push(R(cx(w * 0.1, w), pad, w * 0.1, s(1.5, h), p.acc));

  // Tagline
  if (c.tagline) e.push(T(cx(w * 0.4, w), pad + s(10, h), c.tagline.toUpperCase(), s(7, w), p.acc, 'Playfair Display', 'bold'));

  // Title - large elegant
  const ts = s(34, w);
  const ty = pad + s(26, h);
  e.push(T(cx(w * 0.75, w), ty, c.title, ts, p.dark, 'Playfair Display', 'bold', w * 0.75));

  // Gold divider under title
  e.push(R(cx(w * 0.05, w), ty + Math.round(ts * 1.4) + s(10, h), w * 0.05, s(1.5, h), p.acc));
  e.push(C(cx(w * 0.05, w) + w * 0.025, ty + Math.round(ts * 1.4) + s(10, h) + s(0.75, h), s(2, w), p.acc));

  // Subtitle
  const sy = ty + Math.round(ts * 1.4) + s(24, h);
  e.push(T(cx(w * 0.55, w), sy, c.subtitle, s(12, w), p.muted, 'Inter', 'normal', w * 0.55));

  // Body
  if (c.body) e.push(T(cx(w * 0.45, w), sy + s(18, h), c.body, s(9, w), p.muted, 'Inter', 'normal', w * 0.45));

  // Bottom divider
  e.push(R(cx(w * 0.1, w), h - pad - s(14, h), w * 0.1, s(1.5, h), p.acc));

  // Contact
  if (c.contact) e.push(T(cx(w * 0.5, w), h - pad - s(2, h), c.contact, s(8, w), p.muted, 'Inter', 'normal', w * 0.5, 0.5));

  return e;
}

// ASYMMETRIC: Dynamic off-center, creative
function tpl_vc_asymmetric(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];
  const pad = s(32, w);

  e.push(R(0, 0, w, h, p.bg));

  // Right partial panel
  e.push(R(Math.round(w * 0.68), 0, Math.round(w * 0.32), h, p.pri));
  // Panel decorations
  e.push(C(Math.round(w * 0.78), h * 0.25, s(30, w), '#FFFFFF', 0.06));
  e.push(C(Math.round(w * 0.85), h * 0.7, s(20, w), p.acc, 0.12));
  e.push(HL(Math.round(w * 0.71), h * 0.5, w * 0.22, '#FFFFFF', 1, 0.1));

  // Accent bar top
  e.push(R(pad, pad, s(40, w), s(3, h), p.acc));

  // Tagline
  if (c.tagline) e.push(T(pad, pad + s(12, h), c.tagline.toUpperCase(), s(7, w), p.acc, 'Montserrat', 'bold'));

  // Title
  const ts = s(28, w);
  e.push(T(pad, pad + s(28, h), c.title, ts, p.dark, 'Montserrat', 'bold', w * 0.58));

  // Subtitle
  e.push(T(pad, pad + s(28, h) + Math.round(ts * 1.4) + s(6, h), c.subtitle, s(11, w), p.pri, 'Inter', 'normal', w * 0.55));

  // Body
  if (c.body) e.push(T(pad, pad + s(28, h) + Math.round(ts * 1.4) + s(26, h), c.body, s(9, w), p.muted, 'Inter', 'normal', w * 0.5));

  // Decorative cluster
  e.push(C(w * 0.4, h * 0.78, s(10, w), p.pri, 0.06));
  e.push(C(w * 0.45, h * 0.85, s(7, w), p.acc, 0.08));

  // Contact
  if (c.contact) e.push(T(pad, h - pad - s(10, h), c.contact, s(8, w), p.muted, 'Inter', 'normal', w * 0.5, 0.7));

  return e;
}

// BOLD HEADER: Big colored header, content below
function tpl_flyer_bold(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];
  const pad = s(40, w);
  const headerH = Math.round(h * 0.36);

  e.push(R(0, 0, w, h, p.bg));

  // Header
  e.push(R(0, 0, w, headerH, p.pri));
  e.push(C(w * 0.82, h * 0.06, s(45, w), '#FFFFFF', 0.06));
  e.push(C(w * 0.88, h * 0.1, s(22, w), '#FFFFFF', 0.08));
  e.push(C(w * 0.12, h * 0.28, s(18, w), p.acc, 0.15));
  e.push(HL(w * 0.65, h * 0.13, w * 0.28, '#FFFFFF', 1, 0.1));

  if (c.tagline) e.push(T(pad, pad, c.tagline.toUpperCase(), s(8, w), 'rgba(255,255,255,0.6)', 'Montserrat', 'bold'));
  e.push(T(pad, pad + s(16, h), c.title, s(38, w), '#FFFFFF', 'Montserrat', 'bold', w * 0.58));
  e.push(T(pad, pad + s(16, h) + s(38, w) * 1.4 + s(4, h), c.subtitle, s(13, w), 'rgba(255,255,255,0.85)', 'Inter', 'normal', w * 0.52));

  // Content below header
  const cy = headerH + s(20, h);
  e.push(R(pad, cy, s(3, h), s(28, h), p.acc));
  if (c.body) e.push(T(pad + s(12, w), cy, c.body, s(10, w), '#374151', 'Inter', 'normal', w * 0.55));

  // Feature boxes
  const bx = cy + s(40, h);
  const bw = (w - pad * 2 - s(10, w)) / 2;
  const bh = s(42, h);

  e.push(R(pad, bx, bw, bh, p.light, 1, 6));
  e.push(R(pad, bx, s(3, h), bh, p.pri, 1));
  e.push(T(pad + s(12, w), bx + s(8, h), 'Premium Quality', s(10, w), p.dark, 'Inter', 'bold'));
  e.push(T(pad + s(12, w), bx + s(22, h), 'Latest technology', s(8, w), p.muted, 'Inter', 'normal'));

  e.push(R(pad + bw + s(10, w), bx, bw, bh, p.light, 1, 6));
  e.push(R(pad + bw + s(10, w), bx, s(3, h), bh, p.acc, 1));
  e.push(T(pad + bw + s(22, w), bx + s(8, h), 'Fast Delivery', s(10, w), p.dark, 'Inter', 'bold'));
  e.push(T(pad + bw + s(22, w), bx + s(22, h), 'Quick turnaround', s(8, w), p.muted, 'Inter', 'normal'));

  // Bottom
  e.push(R(0, h - s(36, h), w, s(36, h), p.pri, 0.04));
  if (c.contact) e.push(T(pad, h - s(22, h), c.contact, s(9, w), p.muted, 'Inter', 'normal', w * 0.5, 0.7));

  return e;
}

// CENTERED: Symmetrical, clean
function tpl_centered(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];
  const pad = s(48, w);

  e.push(R(0, 0, w, h, p.bg));

  // Decorative circles
  e.push(C(w * 0.88, h * 0.1, Math.min(w, h) * 0.14, p.pri, 0.05));
  e.push(C(w * 0.92, h * 0.06, Math.min(w, h) * 0.08, p.acc, 0.07));
  e.push(C(w * 0.08, h * 0.88, Math.min(w, h) * 0.12, p.pri, 0.04));
  // Accent lines
  e.push(HL(0, h * 0.22, w * 0.08, p.acc, 2, 0.12));
  e.push(HL(w * 0.92, h * 0.78, w * 0.08, p.acc, 2, 0.12));

  // Border frame
  const fi = s(14, w);
  e.push(R(fi, fi, w - fi * 2, h - fi * 2, 'transparent', 0.15));
  e[e.length - 1].stroke = p.sec; (e[e.length - 1] as any).strokeWidth = 1;

  // Top accent
  e.push(R(cx(w * 0.12, w), pad, w * 0.12, s(3, h), p.acc));

  if (c.tagline) e.push(T(cx(w * 0.5, w), pad + s(10, h), c.tagline.toUpperCase(), s(8, w), p.acc, 'Montserrat', 'bold'));

  const ts = s(44, w);
  const ty = pad + s(26, h);
  e.push(T(cx(w * 0.8, w), ty, c.title, ts, p.dark, 'Montserrat', 'bold', w * 0.8));

  // Divider
  e.push(R(cx(w * 0.05, w), ty + Math.round(ts * 1.4) + s(10, h), w * 0.05, s(2, h), p.acc));
  e.push(C(cx(w * 0.05, w) + w * 0.025, ty + Math.round(ts * 1.4) + s(10, h) + s(1, h), s(2.5, w), p.acc));

  const sy = ty + Math.round(ts * 1.4) + s(24, h);
  e.push(T(cx(w * 0.6, w), sy, c.subtitle, s(14, w), p.pri, 'Inter', 'normal', w * 0.6));
  if (c.body) e.push(T(cx(w * 0.5, w), sy + s(18, h), c.body, s(10, w), p.muted, 'Inter', 'normal', w * 0.5));

  // Bottom
  e.push(R(cx(w * 0.12, w), h - pad - s(14, h), w * 0.12, s(2, h), p.pri, 0.3));
  if (c.contact) e.push(T(cx(w * 0.5, w), h - pad - s(2, h), c.contact, s(8, w), p.muted, 'Inter', 'normal', w * 0.5, 0.6));

  return e;
}

// GRID: 4 boxes
function tpl_grid(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];
  const pad = s(28, w);

  e.push(R(0, 0, w, h, p.bg));
  e.push(R(0, 0, w, s(5, h), p.pri));

  const ts = s(30, w);
  e.push(T(cx(w * 0.7, w), pad + s(8, h), c.title, ts, p.dark, 'Montserrat', 'bold', w * 0.7));
  e.push(T(cx(w * 0.5, w), pad + s(8, h) + Math.round(ts * 1.4) + s(6, h), c.subtitle, s(12, w), p.pri, 'Inter', 'normal', w * 0.5));
  e.push(R(cx(w * 0.06, w), pad + s(8, h) + Math.round(ts * 1.4) + s(24, h), w * 0.06, s(2, h), p.acc));

  const gt = pad + s(8, h) + Math.round(ts * 1.4) + s(38, h);
  const gg = s(8, w);
  const bw = (w - pad * 2 - gg) / 2;
  const bh = (h - gt - pad - s(32, h) - gg) / 2;

  const items = [
    { n: '01', t: 'Design', d: c.tagline || 'Professional' },
    { n: '02', t: 'Quality', d: 'Premium materials' },
    { n: '03', t: 'Speed', d: 'Fast turnaround' },
    { n: '04', t: 'Contact', d: c.contact || 'Reach us' },
  ];

  items.forEach((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = pad + col * (bw + gg);
    const by = gt + row * (bh + gg);
    const isPrimary = i === 0;

    e.push(R(bx, by, bw, bh, isPrimary ? p.pri : p.light, 1, 6));
    e.push(T(bx + s(12, w), by + s(10, h), it.n, s(22, w), isPrimary ? 'rgba(255,255,255,0.15)' : p.pri, 'Montserrat', 'bold'));
    e.push(HL(bx + s(12, w), by + bh - s(28, h), s(28, w), isPrimary ? 'rgba(255,255,255,0.3)' : p.acc, 2, 0.5));
    e.push(T(bx + s(12, w), by + bh - s(22, h), it.t, s(11, w), isPrimary ? '#FFFFFF' : p.dark, 'Inter', 'bold'));
    e.push(T(bx + s(12, w), by + bh - s(10, h), it.d.slice(0, 18), s(8, w), isPrimary ? 'rgba(255,255,255,0.7)' : p.muted, 'Inter', 'normal'));
  });

  e.push(R(0, h - s(5, h), w, s(5, h), p.acc));
  return e;
}

// ============================================================
// FLYER TEMPLATES
// ============================================================

function tpl_flyer_centered(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];
  const pad = s(50, w);

  e.push(R(0, 0, w, h, p.bg));

  // Background decorations
  e.push(C(w * 0.85, h * 0.08, Math.min(w, h) * 0.12, p.pri, 0.04));
  e.push(C(w * 0.9, h * 0.05, Math.min(w, h) * 0.06, p.acc, 0.06));
  e.push(C(w * 0.06, h * 0.92, Math.min(w, h) * 0.1, p.pri, 0.03));
  e.push(HL(0, h * 0.2, w * 0.06, p.acc, 2, 0.1));
  e.push(HL(w * 0.94, h * 0.8, w * 0.06, p.acc, 2, 0.1));

  // Border
  const fi = s(12, w);
  e.push(R(fi, fi, w - fi * 2, h - fi * 2, 'transparent', 0.12));
  e[e.length - 1].stroke = p.sec; (e[e.length - 1] as any).strokeWidth = 0.5;

  // Top accent
  e.push(R(cx(w * 0.1, w), pad, w * 0.1, s(3, h), p.acc));

  if (c.tagline) e.push(T(cx(w * 0.5, w), pad + s(10, h), c.tagline.toUpperCase(), s(8, w), p.acc, 'Montserrat', 'bold'));

  const ts = s(48, w);
  const ty = pad + s(28, h);
  e.push(T(cx(w * 0.85, w), ty, c.title, ts, p.dark, 'Montserrat', 'bold', w * 0.85));

  // Divider
  e.push(R(cx(w * 0.05, w), ty + Math.round(ts * 1.4) + s(12, h), w * 0.05, s(2, h), p.acc));
  e.push(C(cx(w * 0.05, w) + w * 0.025, ty + Math.round(ts * 1.4) + s(12, h) + s(1, h), s(2.5, w), p.acc));

  const sy = ty + Math.round(ts * 1.4) + s(28, h);
  e.push(T(cx(w * 0.65, w), sy, c.subtitle, s(15, w), p.pri, 'Inter', 'normal', w * 0.65));
  if (c.body) e.push(T(cx(w * 0.55, w), sy + s(20, h), c.body, s(11, w), p.muted, 'Inter', 'normal', w * 0.55));

  // Bottom
  e.push(R(cx(w * 0.1, w), h - pad - s(16, h), w * 0.1, s(2, h), p.pri, 0.3));
  if (c.contact) e.push(T(cx(w * 0.5, w), h - pad - s(4, h), c.contact, s(9, w), p.muted, 'Inter', 'normal', w * 0.5, 0.6));

  return e;
}

// ============================================================
// BANNER TEMPLATES
// ============================================================

function tpl_banner_bold(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];
  const pad = s(50, w);

  e.push(R(0, 0, w, h, p.pri));

  // Background decorations
  e.push(C(w * 0.2, h * 0.3, Math.min(w, h) * 0.4, '#FFFFFF', 0.04));
  e.push(C(w * 0.8, h * 0.7, Math.min(w, h) * 0.35, '#FFFFFF', 0.03));
  e.push(C(w * 0.5, h * 0.5, Math.min(w, h) * 0.25, p.acc, 0.08));
  e.push(HL(0, h * 0.2, w * 0.1, '#FFFFFF', 1, 0.1));
  e.push(HL(w * 0.9, h * 0.8, w * 0.1, '#FFFFFF', 1, 0.1));

  if (c.tagline) e.push(T(pad, pad, c.tagline.toUpperCase(), s(10, w), 'rgba(255,255,255,0.6)', 'Montserrat', 'bold'));
  e.push(T(pad, pad + s(22, h), c.title, s(52, w), '#FFFFFF', 'Montserrat', 'bold', w * 0.7));
  e.push(T(pad, pad + s(22, h) + s(52, w) * 1.4 + s(8, h), c.subtitle, s(16, w), 'rgba(255,255,255,0.85)', 'Inter', 'normal', w * 0.6));
  if (c.body) e.push(T(pad, h * 0.6, c.body, s(12, w), 'rgba(255,255,255,0.7)', 'Inter', 'normal', w * 0.5));
  if (c.contact) e.push(T(pad, h - pad - s(8, h), c.contact, s(10, w), 'rgba(255,255,255,0.6)', 'Inter', 'normal', w * 0.5, 0.6));

  return e;
}

// ============================================================
// POSTER TEMPLATES
// ============================================================

function tpl_poster_dramatic(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];
  const pad = s(50, w);

  e.push(R(0, 0, w, h, p.dark));

  // Dramatic circles
  e.push(C(w * 0.5, h * 0.35, Math.min(w, h) * 0.35, p.pri, 0.08));
  e.push(C(w * 0.5, h * 0.35, Math.min(w, h) * 0.25, p.pri, 0.1));
  e.push(C(w * 0.5, h * 0.35, Math.min(w, h) * 0.15, p.acc, 0.12));
  e.push(HL(0, h * 0.15, w * 0.06, p.pri, 1, 0.2));
  e.push(HL(w * 0.94, h * 0.85, w * 0.06, p.pri, 1, 0.2));

  if (c.tagline) e.push(T(cx(w * 0.5, w), pad + s(10, h), c.tagline.toUpperCase(), s(9, w), p.pri, 'Montserrat', 'bold'));
  const ts = s(56, w);
  const ty = pad + s(32, h);
  e.push(T(cx(w * 0.85, w), ty, c.title, ts, '#FFFFFF', 'Montserrat', 'bold', w * 0.85));

  e.push(HL(cx(w * 0.08, w), ty + Math.round(ts * 1.4) + s(12, h), w * 0.08, p.pri, 2, 0.6));

  const sy = ty + Math.round(ts * 1.4) + s(28, h);
  e.push(T(cx(w * 0.6, w), sy, c.subtitle, s(14, w), p.muted, 'Inter', 'normal', w * 0.6));
  if (c.body) e.push(T(cx(w * 0.5, w), sy + s(20, h), c.body, s(11, w), 'rgba(255,255,255,0.5)', 'Inter', 'normal', w * 0.5));
  if (c.contact) e.push(T(cx(w * 0.5, w), h - pad - s(8, h), c.contact, s(9, w), p.muted, 'Inter', 'normal', w * 0.5, 0.5));

  return e;
}

// ============================================================
// T-SHIRT TEMPLATES
// ============================================================

function tpl_tshirt_bold(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];

  e.push(R(0, 0, w, h, p.bg));

  // Geometric background
  e.push(C(w * 0.5, h * 0.45, Math.min(w, h) * 0.35, p.pri, 0.06));
  e.push(R(w * 0.2, h * 0.15, w * 0.6, h * 0.7, p.pri, 0.03, 12));
  e.push(R(w * 0.25, h * 0.2, w * 0.5, h * 0.6, p.acc, 0.04, 8));

  e.push(T(cx(w * 0.7, w), h * 0.35, c.title, s(48, w), p.dark, 'Montserrat', 'bold', w * 0.7));
  if (c.subtitle) e.push(T(cx(w * 0.5, w), h * 0.55, c.subtitle, s(14, w), p.pri, 'Inter', 'normal', w * 0.5));
  e.push(HL(cx(w * 0.12, w), h * 0.65, w * 0.12, p.acc, 3, 0.5));

  return e;
}

// ============================================================
// MUG TEMPLATE
// ============================================================

function tpl_mug_quote(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];
  const pad = s(50, w);

  e.push(R(0, 0, w, h, p.bg));

  // Elegant frame
  const fi = s(18, w);
  e.push(R(fi, fi, w - fi * 2, h - fi * 2, 'transparent', 0.2));
  e[e.length - 1].stroke = p.pri; (e[e.length - 1] as any).strokeWidth = 1.5;

  // Quote mark
  e.push(T(pad, pad + s(8, h), '\u201C', s(56, w), p.pri, 'Playfair Display', 'normal'));

  e.push(T(cx(w * 0.7, w), h * 0.35, c.title, s(24, w), p.dark, 'Playfair Display', 'bold', w * 0.7));
  if (c.subtitle) e.push(T(cx(w * 0.5, w), h * 0.35 + s(24, w) * 1.4 + s(8, h), c.subtitle, s(11, w), p.muted, 'Inter', 'italic', w * 0.5));

  e.push(HL(cx(w * 0.08, w), h - pad - s(18, h), w * 0.08, p.pri, 2, 0.4));

  return e;
}

// ============================================================
// STICKER TEMPLATE
// ============================================================

function tpl_sticker_badge(w: number, h: number, p: P, c: Content): E[] {
  const e: E[] = [];

  e.push(R(0, 0, w, h, p.bg));

  const centerX = w / 2;
  const centerY = h / 2;
  const radius = Math.min(w, h) * 0.38;

  e.push(C(centerX, centerY, radius, p.pri));
  e.push(C(centerX, centerY, radius - s(4, w), p.bg));
  e.push(C(centerX, centerY, radius - s(8, w), p.pri, 0.05));

  // Ring dots
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const dx = centerX + Math.cos(angle) * (radius - s(10, w));
    const dy = centerY + Math.sin(angle) * (radius - s(10, w));
    e.push(C(dx, dy, s(1.5, w), p.pri, 0.3));
  }

  if (c.tagline) e.push(T(cx(w * 0.4, w), centerY - s(18, h), c.tagline.toUpperCase(), s(6, w), p.pri, 'Montserrat', 'bold'));
  e.push(T(cx(w * 0.55, w), centerY - s(4, h), c.title, s(18, w), p.dark, 'Montserrat', 'bold', w * 0.55));
  if (c.subtitle) e.push(T(cx(w * 0.4, w), centerY + s(12, h), c.subtitle, s(8, w), p.muted, 'Inter', 'normal', w * 0.4));

  return e;
}

// ============================================================
// TYPES & ROUTER
// ============================================================

type E = CanvasElement;

interface Content {
  title: string;
  subtitle: string;
  body?: string;
  contact?: string;
  tagline?: string;
  cta?: string;
}

type TplFn = (w: number, h: number, p: P, c: Content) => E[];

const TEMPLATES: Record<string, TplFn[]> = {
  visiting_card: [tpl_vc_split, tpl_vc_elegant, tpl_vc_asymmetric],
  flyer: [tpl_flyer_bold, tpl_flyer_centered],
  banner: [tpl_banner_bold],
  poster: [tpl_poster_dramatic],
  tshirt: [tpl_tshirt_bold],
  mug: [tpl_mug_quote],
  sticker: [tpl_sticker_badge],
  label: [tpl_vc_split],
  design: [tpl_vc_split, tpl_flyer_bold, tpl_poster_dramatic, tpl_vc_elegant],
};

const PRODUCT_MAP: Record<string, string> = {
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

function detectProduct(pt: string): string {
  const l = pt.toLowerCase().trim();
  for (const [k, v] of Object.entries(PRODUCT_MAP)) {
    if (l.includes(k)) return v;
  }
  return 'design';
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function generateLayout(
  layoutId: string,
  styleId: string,
  content: Content,
  canvasWidth: number,
  canvasHeight: number,
  productType: string = 'design',
): { backgroundColor: string; elements: CanvasElement[] } {
  const palette = PAL[styleId] || PAL.modern;
  const pType = detectProduct(productType);
  const templates = TEMPLATES[pType] || TEMPLATES.design;

  const idx = Math.abs(hashCode(layoutId)) % templates.length;
  const template = templates[idx];

  const elements = template(canvasWidth, canvasHeight, palette, {
    title: content.title || 'YOUR DESIGN',
    subtitle: content.subtitle || '',
    body: content.body || '',
    contact: content.contact || '',
    tagline: content.tagline || '',
    cta: content.cta || '',
  });

  return { backgroundColor: palette.bg, elements };
}

export function getLayoutIds(): string[] { return Object.keys(TEMPLATES); }
export function getStyleIds(): string[] { return Object.keys(PAL); }
export { PAL as STYLE_TO_PALETTE, TEMPLATES as TEMPLATE_REGISTRY, detectProduct as detectProductType };
export type { P as Palette };
