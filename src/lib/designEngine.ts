import type { CanvasElement } from '@/app/design-studio/page';

// ============================================================
// DESIGN ENGINE v2 - Rich professional templates
// Each template generates 15-25 elements for real visual impact
// ============================================================

interface DesignContent {
  title: string;
  subtitle: string;
  body?: string;
  tagline?: string;
  contact?: string;
  cta?: string;
}

interface DesignStyle {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  textLight: string;
  headingFont: string;
  bodyFont: string;
}

// ============================================================
// HELPERS
// ============================================================

let _id = 0;
function id(): string { return `de_${++_id}`; }

function s(base: number, canvasWidth: number): number {
  return Math.round(base * (canvasWidth / 1050));
}

function cx(w: number, canvasWidth: number): number {
  return Math.round((canvasWidth - w) / 2);
}

function cy(h: number, canvasHeight: number): number {
  return Math.round((canvasHeight - h) / 2);
}

function el(type: CanvasElement['type'], x: number, y: number, w: number, h: number, fill: string, extra?: Partial<CanvasElement>): CanvasElement {
  return { id: id(), type, x: Math.round(x), y: Math.round(y), width: Math.round(w), height: Math.round(h), fill, rotation: 0, opacity: 1, ...extra };
}

function text(x: number, y: number, text: string, size: number, color: string, font: string, weight: string, maxW?: number, opacity = 1): CanvasElement {
  return el('text', x, y, maxW || 600, size * 1.4, color, { text, fontSize: Math.round(size), fontFamily: font, fontWeight: weight, opacity });
}

function rect(x: number, y: number, w: number, h: number, fill: string, opacity = 1, radius?: number): CanvasElement {
  return el('rect', x, y, w, h, fill, { opacity, ...(radius ? { radius } : {}) } as any);
}

function circle(x: number, y: number, r: number, fill: string, opacity = 1): CanvasElement {
  return el('circle', x - r, y - r, r * 2, r * 2, fill, { opacity });
}

function line(x: number, y: number, w: number, h: number, fill: string, strokeWidth = 1, opacity = 1): CanvasElement {
  return el('line', x, y, w, h, fill, { strokeWidth, opacity } as any);
}

function hline(x: number, y: number, w: number, color: string, sw = 1, op = 1): CanvasElement {
  return line(x, y, w, 0, color, sw, op);
}

function vline(x: number, y: number, h: number, color: string, sw = 1, op = 1): CanvasElement {
  return line(x, y, 0, h, color, sw, op);
}

// ============================================================
// LAYOUT: CENTERED - Professional centered layout
// ============================================================

function centered(w: number, h: number, c: DesignContent, st: DesignStyle): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = s(50, w);

  // --- Background layer ---
  e.push(rect(0, 0, w, h, st.backgroundColor));

  // Decorative circles (top-right, bottom-left)
  e.push(circle(w * 0.88, h * 0.12, Math.min(w, h) * 0.18, st.primaryColor, 0.06));
  e.push(circle(w * 0.92, h * 0.08, Math.min(w, h) * 0.1, st.accentColor, 0.08));
  e.push(circle(w * 0.1, h * 0.88, Math.min(w, h) * 0.15, st.primaryColor, 0.05));
  e.push(circle(w * 0.06, h * 0.92, Math.min(w, h) * 0.08, st.secondaryColor, 0.07));

  // Decorative lines
  e.push(hline(0, h * 0.25, w * 0.12, st.accentColor, 2, 0.15));
  e.push(hline(w * 0.88, h * 0.75, w * 0.12, st.accentColor, 2, 0.15));
  e.push(vline(w * 0.12, 0, h * 0.08, st.primaryColor, 1, 0.1));
  e.push(vline(w * 0.88, h * 0.92, h * 0.08, st.primaryColor, 1, 0.1));

  // Thin border frame
  const fi = s(16, w);
  e.push(rect(fi, fi, w - fi * 2, h - fi * 2, 'transparent', 0.2));
  e[e.length - 1].stroke = st.secondaryColor;
  (e[e.length - 1] as any).strokeWidth = 1;

  // --- Top accent bar ---
  e.push(rect(cx(w * 0.2, w), pad - s(4, h), w * 0.2, s(3, h), st.accentColor));

  // --- Tagline ---
  if (c.tagline) {
    e.push(text(cx(w * 0.5, w), pad + s(8, h), c.tagline.toUpperCase(), s(9, w), st.accentColor, st.bodyFont, 'bold'));
  }

  // --- Title ---
  const titleSize = s(52, w);
  const titleY = pad + s(32, h);
  e.push(text(cx(w * 0.8, w), titleY, c.title, titleSize, st.textColor, st.headingFont, 'bold', w * 0.8));

  // --- Decorative divider under title ---
  e.push(rect(cx(w * 0.06, w), titleY + titleSize + s(12, h), w * 0.06, s(2.5, h), st.accentColor));
  // Small dot accent
  e.push(circle(cx(w * 0.06, w) + w * 0.03, titleY + titleSize + s(12, h) + s(1.25, h), s(3, w), st.accentColor));

  // --- Subtitle ---
  const subY = titleY + titleSize + s(28, h);
  e.push(text(cx(w * 0.65, w), subY, c.subtitle, s(16, w), st.primaryColor, st.bodyFont, 'normal', w * 0.65));

  // --- Body ---
  if (c.body) {
    const bodyY = subY + s(24, h);
    e.push(text(cx(w * 0.55, w), bodyY, c.body, s(12, w), st.textLight, st.bodyFont, 'normal', w * 0.55));
  }

  // --- Bottom section ---
  const bottomY = h - pad - s(20, h);

  // Bottom divider
  e.push(hline(pad, bottomY, w - pad * 2, st.secondaryColor, 1, 0.2));

  // Contact info
  if (c.contact) {
    e.push(text(pad, bottomY + s(8, h), c.contact, s(9, w), st.textLight, st.bodyFont, 'normal', w - pad * 2, 0.7));
  }

  // CTA badge
  if (c.cta) {
    const ctaW = s(140, w);
    const ctaH = s(32, h);
    e.push(rect(w - pad - ctaW, bottomY - ctaH - s(4, h), ctaW, ctaH, st.primaryColor, 1, 4));
    e.push(text(w - pad - ctaW + s(12, w), bottomY - ctaH - s(4, h) + s(8, h), c.cta, s(11, w), '#FFFFFF', st.bodyFont, 'bold'));
  }

  return e;
}

// ============================================================
// LAYOUT: SPLIT - Left content, right colored block
// ============================================================

function splitLayout(w: number, h: number, c: DesignContent, st: DesignStyle): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = s(44, w);
  const splitX = w * 0.55;

  // --- Right panel ---
  e.push(rect(splitX, 0, w - splitX, h, st.primaryColor));
  // Overlay pattern on right panel
  e.push(circle(splitX + (w - splitX) * 0.5, h * 0.35, Math.min(w - splitX, h) * 0.25, '#FFFFFF', 0.06));
  e.push(circle(splitX + (w - splitX) * 0.6, h * 0.7, Math.min(w - splitX, h) * 0.18, '#FFFFFF', 0.04));
  e.push(circle(splitX + (w - splitX) * 0.3, h * 0.55, Math.min(w - splitX, h) * 0.12, st.accentColor, 0.12));

  // Right panel decorative lines
  e.push(hline(splitX + s(20, w), h * 0.5, (w - splitX) * 0.6, '#FFFFFF', 1, 0.15));
  e.push(hline(splitX + s(20, w), h * 0.52, (w - splitX) * 0.4, '#FFFFFF', 1, 0.1));

  // Right content
  if (c.tagline) {
    e.push(text(splitX + s(24, w), h * 0.38, c.tagline.toUpperCase(), s(9, w), 'rgba(255,255,255,0.7)', st.bodyFont, 'bold'));
  }
  e.push(text(splitX + s(24, w), h * 0.44, c.title, s(22, w), '#FFFFFF', st.headingFont, 'bold', w - splitX - s(48, w)));
  if (c.cta) {
    e.push(text(splitX + s(24, w), h * 0.58, c.cta, s(12, w), st.accentColor, st.bodyFont, 'bold'));
    // Arrow decoration
    e.push(hline(splitX + s(24, w), h * 0.62, s(40, w), st.accentColor, 2, 0.6));
  }

  // --- Left panel background ---
  e.push(rect(0, 0, splitX, h, st.backgroundColor));

  // Left decorative elements
  e.push(circle(w * 0.08, h * 0.08, s(20, w), st.primaryColor, 0.06));
  e.push(circle(w * 0.05, h * 0.95, s(14, w), st.accentColor, 0.08));

  // Left accent bar (vertical)
  e.push(rect(pad - s(4, w), pad, s(3, h), s(50, h), st.accentColor));

  // Tagline
  if (c.tagline) {
    e.push(text(pad + s(8, w), pad + s(4, h), c.tagline.toUpperCase(), s(9, w), st.accentColor, st.bodyFont, 'bold'));
  }

  // Title
  const titleSize = s(40, w);
  const titleY = pad + s(28, h);
  e.push(text(pad, titleY, c.title, titleSize, st.textColor, st.headingFont, 'bold', splitX - pad * 1.8));

  // Subtitle
  const subY = titleY + titleSize + s(10, h);
  e.push(text(pad, subY, c.subtitle, s(14, w), st.primaryColor, st.bodyFont, 'normal', splitX - pad * 1.8));

  // Body
  if (c.body) {
    e.push(text(pad, subY + s(20, h), c.body, s(11, w), st.textLight, st.bodyFont, 'normal', splitX - pad * 1.8));
  }

  // Bottom contact section
  if (c.contact) {
    const contactY = h - pad - s(24, h);
    e.push(hline(pad, contactY, splitX - pad * 2, st.secondaryColor, 1, 0.2));
    e.push(text(pad, contactY + s(8, h), c.contact, s(9, w), st.textLight, st.bodyFont, 'normal', splitX - pad * 2, 0.7));
  }

  return e;
}

// ============================================================
// LAYOUT: BOLD HEADER - Big colored header, content below
// ============================================================

function boldHeader(w: number, h: number, c: DesignContent, st: DesignStyle): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = s(40, w);
  const headerH = h * 0.42;

  // --- Header ---
  e.push(rect(0, 0, w, headerH, st.primaryColor));

  // Header decorative elements
  e.push(circle(w * 0.85, h * 0.08, s(60, w), '#FFFFFF', 0.06));
  e.push(circle(w * 0.9, h * 0.12, s(30, w), '#FFFFFF', 0.08));
  e.push(circle(w * 0.15, h * 0.35, s(25, w), st.accentColor, 0.15));
  e.push(hline(w * 0.7, h * 0.18, w * 0.25, '#FFFFFF', 1, 0.1));
  e.push(hline(w * 0.72, h * 0.2, w * 0.15, '#FFFFFF', 1, 0.08));

  // Header content
  if (c.tagline) {
    e.push(text(pad, pad, c.tagline.toUpperCase(), s(9, w), 'rgba(255,255,255,0.65)', st.bodyFont, 'bold'));
  }
  const hTitleSize = s(42, w);
  e.push(text(pad, pad + s(22, h), c.title, hTitleSize, '#FFFFFF', st.headingFont, 'bold', w * 0.65));
  e.push(text(pad, pad + s(22, h) + hTitleSize + s(6, h), c.subtitle, s(14, w), 'rgba(255,255,255,0.85)', st.bodyFont, 'normal', w * 0.55));

  // --- Content area ---
  const contentY = headerH + s(24, h);

  // Left accent bar
  e.push(rect(pad, contentY, s(3, h), s(36, h), st.accentColor));

  // Body text
  if (c.body) {
    e.push(text(pad + s(14, w), contentY, c.body, s(12, w), '#374151', st.bodyFont, 'normal', w * 0.55));
  }

  // Feature boxes
  const boxY = contentY + s(50, h);
  const boxW = (w - pad * 2 - s(12, w)) / 2;
  const boxH = s(48, h);

  // Box 1
  e.push(rect(pad, boxY, boxW, boxH, '#F8FAFC', 1, 6));
  e.push(rect(pad, boxY, s(3, h), boxH, st.primaryColor, 1, 0));
  e.push(text(pad + s(14, w), boxY + s(8, h), 'Premium Quality', s(11, w), st.textColor, st.bodyFont, 'bold'));
  e.push(text(pad + s(14, w), boxY + s(24, h), 'Latest printing technology', s(9, w), st.textLight, st.bodyFont, 'normal'));

  // Box 2
  e.push(rect(pad + boxW + s(12, w), boxY, boxW, boxH, '#F8FAFC', 1, 6));
  e.push(rect(pad + boxW + s(12, w), boxY, s(3, h), boxH, st.accentColor, 1, 0));
  e.push(text(pad + boxW + s(26, w), boxY + s(8, h), 'Fast Delivery', s(11, w), st.textColor, st.bodyFont, 'bold'));
  e.push(text(pad + boxW + s(26, w), boxY + s(24, h), '3-5 day turnaround', s(9, w), st.textLight, st.bodyFont, 'normal'));

  // Bottom section
  const bottomY = h - pad - s(16, h);
  e.push(hline(pad, bottomY, w - pad * 2, st.secondaryColor, 1, 0.15));
  if (c.contact) {
    e.push(text(pad, bottomY + s(8, h), c.contact, s(9, w), st.textLight, st.bodyFont, 'normal', w * 0.5, 0.7));
  }
  if (c.cta) {
    const ctaW = s(120, w);
    e.push(rect(w - pad - ctaW, bottomY - s(36, h), ctaW, s(30, h), st.accentColor, 1, 4));
    e.push(text(w - pad - ctaW + s(10, w), bottomY - s(30, h), c.cta, s(10, w), '#FFFFFF', st.bodyFont, 'bold'));
  }

  return e;
}

// ============================================================
// LAYOUT: ELEGANT - Minimal with strong typography
// ============================================================

function elegant(w: number, h: number, c: DesignContent, st: DesignStyle): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = s(56, w);

  // --- Background ---
  e.push(rect(0, 0, w, h, st.backgroundColor));

  // Thin double border frame
  const fi = s(18, w);
  e.push(rect(fi, fi, w - fi * 2, h - fi * 2, 'transparent', 0.25));
  e[e.length - 1].stroke = st.secondaryColor;
  (e[e.length - 1] as any).strokeWidth = 1;
  const fi2 = s(22, w);
  e.push(rect(fi2, fi2, w - fi2 * 2, h - fi2 * 2, 'transparent', 0.12));
  e[e.length - 1].stroke = st.secondaryColor;
  (e[e.length - 1] as any).strokeWidth = 0.5;

  // Corner accents
  const cornerSize = s(20, w);
  e.push(hline(fi2, fi2, cornerSize, st.accentColor, 2, 0.5));
  e.push(vline(fi2, fi2, cornerSize, st.accentColor, 2, 0.5));
  e.push(hline(w - fi2 - cornerSize, fi2, cornerSize, st.accentColor, 2, 0.5));
  e.push(vline(w - fi2, fi2, cornerSize, st.accentColor, 2, 0.5));
  e.push(hline(fi2, h - fi2, cornerSize, st.accentColor, 2, 0.5));
  e.push(vline(fi2, h - fi2 - cornerSize, cornerSize, st.accentColor, 2, 0.5));
  e.push(hline(w - fi2 - cornerSize, h - fi2, cornerSize, st.accentColor, 2, 0.5));
  e.push(vline(w - fi2, h - fi2 - cornerSize, cornerSize, st.accentColor, 2, 0.5));

  // Top decorative divider
  e.push(rect(cx(w * 0.12, w), pad, w * 0.12, s(1.5, h), st.accentColor));

  // Tagline
  if (c.tagline) {
    e.push(text(cx(w * 0.4, w), pad + s(14, h), c.tagline.toUpperCase(), s(8, w), st.accentColor, st.bodyFont, 'bold'));
  }

  // Title - large, elegant
  const titleSize = s(56, w);
  const titleY = pad + s(36, h);
  e.push(text(cx(w * 0.85, w), titleY, c.title, titleSize, st.textColor, st.headingFont, 'bold', w * 0.85));

  // Decorative divider under title
  e.push(rect(cx(w * 0.06, w), titleY + titleSize + s(14, h), w * 0.06, s(1.5, h), st.accentColor));
  e.push(circle(cx(w * 0.06, w) + w * 0.03, titleY + titleSize + s(14, h) + s(0.75, h), s(2.5, w), st.accentColor));

  // Subtitle
  const subY = titleY + titleSize + s(30, h);
  e.push(text(cx(w * 0.6, w), subY, c.subtitle, s(15, w), st.primaryColor, st.bodyFont, 'normal', w * 0.6));

  // Body
  if (c.body) {
    e.push(text(cx(w * 0.5, w), subY + s(22, h), c.body, s(11, w), st.textLight, st.bodyFont, 'normal', w * 0.5));
  }

  // Bottom divider
  e.push(rect(cx(w * 0.12, w), h - pad - s(18, h), w * 0.12, s(1.5, h), st.accentColor));

  // Contact
  if (c.contact) {
    e.push(text(cx(w * 0.5, w), h - pad - s(6, h), c.contact, s(9, w), st.textLight, st.bodyFont, 'normal', w * 0.5, 0.6));
  }

  return e;
}

// ============================================================
// LAYOUT: ASYMMETRIC - Dynamic off-center with overlaps
// ============================================================

function asymmetric(w: number, h: number, c: DesignContent, st: DesignStyle): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = s(40, w);

  // --- Background ---
  e.push(rect(0, 0, w, h, st.backgroundColor));

  // Large decorative circle (off-center right)
  e.push(circle(w * 0.7, h * 0.3, Math.min(w, h) * 0.35, st.primaryColor, 0.05));
  e.push(circle(w * 0.75, h * 0.25, Math.min(w, h) * 0.2, st.primaryColor, 0.06));

  // Right accent panel (partial)
  e.push(rect(w * 0.72, 0, w * 0.28, h, st.primaryColor));
  // Panel pattern
  e.push(circle(w * 0.82, h * 0.3, s(40, w), '#FFFFFF', 0.06));
  e.push(circle(w * 0.88, h * 0.7, s(25, w), st.accentColor, 0.12));
  e.push(hline(w * 0.75, h * 0.5, w * 0.2, '#FFFFFF', 1, 0.1));

  // Right panel text
  if (c.tagline) {
    e.push(text(w * 0.75, h * 0.42, c.tagline.toUpperCase(), s(8, w), 'rgba(255,255,255,0.6)', st.bodyFont, 'bold'));
  }
  if (c.cta) {
    e.push(text(w * 0.75, h * 0.48, c.cta, s(13, w), '#FFFFFF', st.headingFont, 'bold'));
    e.push(hline(w * 0.75, h * 0.53, s(30, w), st.accentColor, 2, 0.6));
  }

  // --- Left content ---
  // Accent bar
  e.push(rect(pad, pad, s(40, w), s(3, h), st.accentColor));

  if (c.tagline) {
    e.push(text(pad, pad + s(12, h), c.tagline.toUpperCase(), s(9, w), st.accentColor, st.bodyFont, 'bold'));
  }

  // Title
  const titleSize = s(42, w);
  const titleY = pad + s(32, h);
  e.push(text(pad, titleY, c.title, titleSize, st.textColor, st.headingFont, 'bold', w * 0.6));

  // Subtitle
  const subY = titleY + titleSize + s(10, h);
  e.push(text(pad, subY, c.subtitle, s(14, w), st.primaryColor, st.bodyFont, 'normal', w * 0.6));

  // Body
  if (c.body) {
    e.push(text(pad, subY + s(20, h), c.body, s(11, w), st.textLight, st.bodyFont, 'normal', w * 0.55));
  }

  // Decorative elements left side
  e.push(circle(w * 0.35, h * 0.75, s(12, w), st.primaryColor, 0.08));
  e.push(circle(w * 0.4, h * 0.82, s(8, w), st.accentColor, 0.1));

  // Contact
  if (c.contact) {
    e.push(text(pad, h - pad - s(16, h), c.contact, s(9, w), st.textLight, st.bodyFont, 'normal', w * 0.5, 0.7));
  }

  return e;
}

// ============================================================
// LAYOUT: GRID - 4-box symmetric grid
// ============================================================

function gridLayout(w: number, h: number, c: DesignContent, st: DesignStyle): CanvasElement[] {
  const e: CanvasElement[] = [];
  const pad = s(30, w);

  // --- Background ---
  e.push(rect(0, 0, w, h, st.backgroundColor));

  // Top accent bar (full width)
  e.push(rect(0, 0, w, s(5, h), st.primaryColor));

  // Title area
  const titleSize = s(34, w);
  e.push(text(cx(w * 0.7, w), pad + s(10, h), c.title, titleSize, st.textColor, st.headingFont, 'bold', w * 0.7));
  e.push(text(cx(w * 0.5, w), pad + s(10, h) + titleSize + s(8, h), c.subtitle, s(13, w), st.primaryColor, st.bodyFont, 'normal', w * 0.5));

  // Decorative divider
  e.push(rect(cx(w * 0.08, w), pad + s(10, h) + titleSize + s(28, h), w * 0.08, s(2, h), st.accentColor));

  // --- 4-Box Grid ---
  const gridTop = pad + s(10, h) + titleSize + s(44, h);
  const gridGap = s(10, w);
  const boxW = (w - pad * 2 - gridGap) / 2;
  const boxH = (h - gridTop - pad - s(36, h) - gridGap) / 2;

  const features = [
    { num: '01', title: 'Design', desc: c.tagline || 'Professional' },
    { num: '02', title: 'Quality', desc: c.body || 'Premium' },
    { num: '03', title: 'Speed', desc: c.cta || 'Fast' },
    { num: '04', title: 'Contact', desc: c.contact || 'Reach us' },
  ];

  features.forEach((feat, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = pad + col * (boxW + gridGap);
    const by = gridTop + row * (boxH + gridGap);

    // Box background
    e.push(rect(bx, by, boxW, boxH, i === 0 ? st.primaryColor : '#F8FAFC', 1, 6));

    // Number
    e.push(text(bx + s(14, w), by + s(12, h), feat.num, s(24, w), i === 0 ? 'rgba(255,255,255,0.15)' : st.primaryColor, st.headingFont, 'bold'));

    // Accent line
    e.push(hline(bx + s(14, w), by + boxH - s(32, h), s(30, w), i === 0 ? 'rgba(255,255,255,0.3)' : st.accentColor, 2, 0.5));

    // Title
    e.push(text(bx + s(14, w), by + boxH - s(26, h), feat.title, s(12, w), i === 0 ? '#FFFFFF' : st.textColor, st.bodyFont, 'bold'));

    // Description
    e.push(text(bx + s(14, w), by + boxH - s(14, h), feat.desc.slice(0, 20), s(8, w), i === 0 ? 'rgba(255,255,255,0.7)' : st.textLight, st.bodyFont, 'normal'));
  });

  // Bottom accent bar
  e.push(rect(0, h - s(5, h), w, s(5, h), st.accentColor));

  return e;
}

// ============================================================
// STYLE MAP
// ============================================================

const STYLE_MAP: Record<string, DesignStyle> = {
  modern: {
    backgroundColor: '#FFFFFF', primaryColor: '#0B57D0', secondaryColor: '#DBEAFE',
    accentColor: '#FF6B00', textColor: '#1F2937', textLight: '#64748B',
    headingFont: 'Montserrat', bodyFont: 'Inter',
  },
  luxury: {
    backgroundColor: '#0F0F1A', primaryColor: '#C9A84C', secondaryColor: '#2A2A3E',
    accentColor: '#E8D48B', textColor: '#FFFFFF', textLight: 'rgba(255,255,255,0.6)',
    headingFont: 'Playfair Display', bodyFont: 'Inter',
  },
  bold: {
    backgroundColor: '#FFFFFF', primaryColor: '#FF6B00', secondaryColor: '#FED7AA',
    accentColor: '#DC2626', textColor: '#0F172A', textLight: '#64748B',
    headingFont: 'Montserrat', bodyFont: 'Inter',
  },
  minimal: {
    backgroundColor: '#FFFFFF', primaryColor: '#1F2937', secondaryColor: '#E2E8F0',
    accentColor: '#94A3B8', textColor: '#1F2937', textLight: '#94A3B8',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
  },
  eco: {
    backgroundColor: '#F0FDF4', primaryColor: '#16A34A', secondaryColor: '#DCFCE7',
    accentColor: '#065F46', textColor: '#1F2937', textLight: '#64748B',
    headingFont: 'Poppins', bodyFont: 'Inter',
  },
  creative: {
    backgroundColor: '#FFFFFF', primaryColor: '#7C3AED', secondaryColor: '#EDE9FE',
    accentColor: '#EC4899', textColor: '#1F2937', textLight: '#64748B',
    headingFont: 'Poppins', bodyFont: 'Inter',
  },
  corporate: {
    backgroundColor: '#FFFFFF', primaryColor: '#0F172A', secondaryColor: '#CBD5E1',
    accentColor: '#0B57D0', textColor: '#0F172A', textLight: '#64748B',
    headingFont: 'Montserrat', bodyFont: 'Inter',
  },
  playful: {
    backgroundColor: '#FFFBEB', primaryColor: '#F59E0B', secondaryColor: '#FEF3C7',
    accentColor: '#EF4444', textColor: '#1F2937', textLight: '#64748B',
    headingFont: 'Poppins', bodyFont: 'Inter',
  },
};

// ============================================================
// MAIN
// ============================================================

const LAYOUTS: Record<string, typeof centered> = {
  centered, split: splitLayout, boldHeader, elegant, asymmetric, grid: gridLayout,
};

export function generateLayout(
  layoutId: string,
  styleId: string,
  content: DesignContent,
  canvasWidth: number,
  canvasHeight: number,
): { backgroundColor: string; elements: CanvasElement[] } {
  const layout = LAYOUTS[layoutId] || centered;
  const style = STYLE_MAP[styleId] || STYLE_MAP.modern;

  const maxTitle = Math.floor(canvasWidth / (s(24, canvasWidth) * 0.55));
  const maxSub = Math.floor(canvasWidth / (s(14, canvasWidth) * 0.5));

  const clamped: DesignContent = {
    title: content.title.slice(0, maxTitle),
    subtitle: content.subtitle.slice(0, maxSub),
    body: content.body?.slice(0, maxSub * 2),
    tagline: content.tagline?.slice(0, 30),
    contact: content.contact?.slice(0, maxSub),
    cta: content.cta?.slice(0, 25),
  };

  const elements = layout(canvasWidth, canvasHeight, clamped, style);
  return { backgroundColor: style.backgroundColor, elements };
}

export function getLayoutIds(): string[] { return Object.keys(LAYOUTS); }
export function getStyleIds(): string[] { return Object.keys(STYLE_MAP); }
export { LAYOUTS, STYLE_MAP };
export type { DesignContent, DesignStyle };
