import type { CanvasElement } from '@/app/design-studio/page';

// ============================================================
// DESIGN ENGINE - Mathematical layout system
// The AI generates content, this engine calculates positions
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
  headingFont: string;
  bodyFont: string;
}

interface LayoutTemplate {
  id: string;
  name: string;
  generate: (w: number, h: number, content: DesignContent, style: DesignStyle) => CanvasElement[];
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function id(): string {
  return `de_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function scale(basePx: number, canvasWidth: number): number {
  return Math.round(basePx * (canvasWidth / 1050));
}

function centerX(w: number, canvasWidth: number): number {
  return Math.round((canvasWidth - w) / 2);
}

function centerY(h: number, canvasHeight: number): number {
  return Math.round((canvasHeight - h) / 2);
}

// ============================================================
// DECORATIVE ELEMENT GENERATORS
// ============================================================

function decorativeCircles(w: number, h: number, color: string, count: number): CanvasElement[] {
  const circles: CanvasElement[] = [];
  const positions = [
    { x: w * 0.05, y: h * 0.08, r: Math.min(w, h) * 0.12 },
    { x: w * 0.88, y: h * 0.15, r: Math.min(w, h) * 0.08 },
    { x: w * 0.92, y: h * 0.82, r: Math.min(w, h) * 0.15 },
    { x: w * 0.08, y: h * 0.88, r: Math.min(w, h) * 0.06 },
    { x: w * 0.5, y: h * 0.05, r: Math.min(w, h) * 0.1 },
  ];
  for (let i = 0; i < Math.min(count, positions.length); i++) {
    const p = positions[i];
    circles.push({
      id: id(), type: 'circle', x: Math.round(p.x - p.r), y: Math.round(p.y - p.r),
      width: Math.round(p.r * 2), height: Math.round(p.r * 2), fill: color,
      rotation: 0, opacity: 0.08 + Math.random() * 0.07,
    });
  }
  return circles;
}

function decorativeLines(w: number, h: number, color: string, count: number): CanvasElement[] {
  const lines: CanvasElement[] = [];
  const configs = [
    { x: 0, y: h * 0.3, dx: w, dy: 0 },
    { x: 0, y: h * 0.7, dx: w, dy: 0 },
    { x: w * 0.15, y: 0, dx: 0, dy: h },
    { x: w * 0.85, y: 0, dx: 0, dy: h },
    { x: 0, y: h * 0.5, dx: w * 0.3, dy: 0 },
  ];
  for (let i = 0; i < Math.min(count, configs.length); i++) {
    const c = configs[i];
    lines.push({
      id: id(), type: 'line', x: Math.round(c.x), y: Math.round(c.y),
      width: Math.round(Math.abs(c.dx) || 2), height: Math.round(Math.abs(c.dy) || 2),
      fill: color, rotation: 0, opacity: 0.06, strokeWidth: 1,
    });
  }
  return lines;
}

function accentBar(x: number, y: number, w: number, h: number, color: string, opacity = 1): CanvasElement {
  return { id: id(), type: 'rect', x: Math.round(x), y: Math.round(y), width: Math.round(w), height: Math.round(h), fill: color, rotation: 0, opacity };
}

function textBlock(x: number, y: number, text: string, fontSize: number, color: string, font: string, weight: string, maxW?: number): CanvasElement {
  return {
    id: id(), type: 'text', x: Math.round(x), y: Math.round(y),
    width: Math.round(maxW || 600), height: Math.round(fontSize * 1.5),
    fill: color, text, fontSize: Math.round(fontSize), fontFamily: font, fontWeight: weight,
    rotation: 0, opacity: 1,
  };
}

// ============================================================
// LAYOUT TEMPLATES
// ============================================================

const LAYOUTS: Record<string, LayoutTemplate> = {
  // --- CENTERED HERO: Big title centered, subtitle below, accent bar ---
  centered: {
    id: 'centered', name: 'Centered Hero',
    generate: (w, h, content, style) => {
      const pad = scale(40, w);
      const titleSize = scale(48, w);
      const subSize = scale(18, w);
      const bodySize = scale(14, w);
      const elements: CanvasElement[] = [];

      // Background decorations
      elements.push(...decorativeCircles(w, h, style.primaryColor, 3));
      elements.push(...decorativeLines(w, h, style.secondaryColor, 2));

      // Top accent bar
      elements.push(accentBar(centerX(w * 0.3, w), pad, w * 0.3, scale(4, h), style.accentColor));

      // Tagline
      if (content.tagline) {
        elements.push(textBlock(centerX(w * 0.6, w), pad + scale(20, h), content.tagline.toUpperCase(), scale(11, w), style.accentColor, style.bodyFont, 'bold'));
      }

      // Title - centered
      const titleY = pad + scale(50, h);
      elements.push(textBlock(centerX(w * 0.8, w), titleY, content.title, titleSize, style.textColor, style.headingFont, 'bold', w * 0.8));

      // Subtitle - centered below title
      const subY = titleY + titleSize + scale(16, h);
      elements.push(textBlock(centerX(w * 0.7, w), subY, content.subtitle, subSize, style.primaryColor, style.bodyFont, 'normal', w * 0.7));

      // Body text
      if (content.body) {
        const bodyY = subY + subSize + scale(12, h);
        elements.push(textBlock(centerX(w * 0.6, w), bodyY, content.body, bodySize, style.textColor.replace('1F2937', '64748B'), style.bodyFont, 'normal', w * 0.6));
      }

      // Bottom accent bar
      elements.push(accentBar(centerX(w * 0.15, w), h - pad - scale(4, h), w * 0.15, scale(4, h), style.accentColor));

      // CTA button area
      if (content.cta) {
        const ctaY = h - pad - scale(50, h);
        const ctaW = w * 0.35;
        elements.push(accentBar(centerX(ctaW, w), ctaY, ctaW, scale(40, h), style.primaryColor));
        elements.push(textBlock(centerX(ctaW, w) + scale(16, w), ctaY + scale(10, h), content.cta, scale(14, w), '#FFFFFF', style.bodyFont, 'bold'));
      }

      return elements;
    },
  },

  // --- SPLIT: Left content, right visual block ---
  split: {
    id: 'split', name: 'Split Layout',
    generate: (w, h, content, style) => {
      const pad = scale(40, w);
      const splitX = w * 0.52;
      const titleSize = scale(42, w);
      const subSize = scale(16, w);
      const bodySize = scale(13, w);
      const elements: CanvasElement[] = [];

      // Right side visual block
      elements.push({ id: id(), type: 'rect', x: Math.round(splitX), y: 0, width: Math.round(w - splitX), height: Math.round(h), fill: style.primaryColor, rotation: 0, opacity: 1 });
      elements.push({ id: id(), type: 'rect', x: Math.round(splitX + scale(20, w)), y: Math.round(pad), width: Math.round(w - splitX - scale(40, w)), height: Math.round(h - pad * 2), fill: style.secondaryColor, rotation: 0, opacity: 0.15, radius: 12 });

      // Right side decorative elements
      const rightCenter = splitX + (w - splitX) / 2;
      elements.push({ id: id(), type: 'circle', x: Math.round(rightCenter - scale(30, w)), y: Math.round(h * 0.3), width: Math.round(scale(60, w)), height: Math.round(scale(60, w)), fill: '#FFFFFF', rotation: 0, opacity: 0.15 });
      elements.push({ id: id(), type: 'circle', x: Math.round(rightCenter - scale(18, w)), y: Math.round(h * 0.3 + scale(12, w)), width: Math.round(scale(36, w)), height: Math.round(scale(36, w)), fill: style.accentColor, rotation: 0, opacity: 0.3 });

      // Right side text
      if (content.tagline) {
        elements.push(textBlock(splitX + scale(30, w), h * 0.55, content.tagline.toUpperCase(), scale(10, w), '#FFFFFF', style.bodyFont, 'bold'));
      }
      if (content.cta) {
        elements.push(textBlock(splitX + scale(30, w), h * 0.65, content.cta, scale(13, w), '#FFFFFF', style.headingFont, 'bold'));
      }

      // Left side content
      // Accent bar
      elements.push(accentBar(pad, pad, scale(50, w), scale(4, h), style.accentColor));

      // Tagline
      if (content.tagline) {
        elements.push(textBlock(pad, pad + scale(16, h), content.tagline.toUpperCase(), scale(10, w), style.accentColor, style.bodyFont, 'bold'));
      }

      // Title
      const titleY = pad + scale(44, h);
      elements.push(textBlock(pad, titleY, content.title, titleSize, style.textColor, style.headingFont, 'bold', splitX - pad * 1.5));

      // Subtitle
      const subY = titleY + titleSize + scale(12, h);
      elements.push(textBlock(pad, subY, content.subtitle, subSize, style.primaryColor, style.bodyFont, 'normal', splitX - pad * 1.5));

      // Body
      if (content.body) {
        elements.push(textBlock(pad, subY + subSize + scale(10, h), content.body, bodySize, '#64748B', style.bodyFont, 'normal', splitX - pad * 1.5));
      }

      // Contact at bottom left
      if (content.contact) {
        elements.push(accentBar(pad, h - pad - scale(30, h), splitX - pad * 2, scale(1, h), style.secondaryColor));
        elements.push(textBlock(pad, h - pad - scale(22, h), content.contact, scale(10, w), '#64748B', style.bodyFont, 'normal', splitX - pad * 2));
      }

      return elements;
    },
  },

  // --- BOLD HEADER: Large colored header area, clean content below ---
  boldHeader: {
    id: 'boldHeader', name: 'Bold Header',
    generate: (w, h, content, style) => {
      const pad = scale(40, w);
      const headerH = h * 0.4;
      const titleSize = scale(44, w);
      const subSize = scale(16, w);
      const bodySize = scale(13, w);
      const elements: CanvasElement[] = [];

      // Header background
      elements.push({ id: id(), type: 'rect', x: 0, y: 0, width: Math.round(w), height: Math.round(headerH), fill: style.primaryColor, rotation: 0, opacity: 1 });

      // Header decorative circles
      elements.push({ id: id(), type: 'circle', x: Math.round(w - scale(100, w)), y: Math.round(-scale(30, w)), width: Math.round(scale(120, w)), height: Math.round(scale(120, w)), fill: '#FFFFFF', rotation: 0, opacity: 0.08 });
      elements.push({ id: id(), type: 'circle', x: Math.round(w - scale(60, w)), y: Math.round(headerH - scale(20, w)), width: Math.round(scale(60, w)), height: Math.round(scale(60, w)), fill: style.accentColor, rotation: 0, opacity: 0.2 });

      // Header text
      if (content.tagline) {
        elements.push(textBlock(pad, pad, content.tagline.toUpperCase(), scale(10, w), 'rgba(255,255,255,0.7)', style.bodyFont, 'bold'));
      }
      elements.push(textBlock(pad, pad + scale(24, h), content.title, titleSize, '#FFFFFF', style.headingFont, 'bold', w * 0.7));
      elements.push(textBlock(pad, pad + scale(24, h) + titleSize + scale(8, h), content.subtitle, subSize, 'rgba(255,255,255,0.85)', style.bodyFont, 'normal', w * 0.6));

      // Content area
      const contentY = headerH + scale(30, h);

      // Left accent bar
      elements.push(accentBar(pad, contentY, scale(4, h), scale(40, h), style.accentColor));

      // Body text
      if (content.body) {
        elements.push(textBlock(pad + scale(16, w), contentY, content.body, bodySize, '#374151', style.bodyFont, 'normal', w * 0.55));
      }

      // Bottom area
      if (content.contact) {
        elements.push(textBlock(pad, h - pad - scale(16, h), content.contact, scale(10, w), '#9CA3AF', style.bodyFont, 'normal', w * 0.5));
      }

      // CTA button
      if (content.cta) {
        const ctaW = w * 0.3;
        elements.push(accentBar(w - pad - ctaW, h - pad - scale(44, h), ctaW, scale(38, h), style.accentColor));
        elements.push(textBlock(w - pad - ctaW + scale(14, w), h - pad - scale(36, h), content.cta, scale(13, w), '#FFFFFF', style.bodyFont, 'bold'));
      }

      return elements;
    },
  },

  // --- GRID: Symmetric grid layout for cards/labels ---
  grid: {
    id: 'grid', name: 'Grid Layout',
    generate: (w, h, content, style) => {
      const pad = scale(30, w);
      const titleSize = scale(36, w);
      const subSize = scale(14, w);
      const elements: CanvasElement[] = [];

      // Top accent line
      elements.push(accentBar(0, 0, w, scale(5, h), style.primaryColor));

      // Title centered at top
      elements.push(textBlock(centerX(w * 0.8, w), pad + scale(10, h), content.title, titleSize, style.textColor, style.headingFont, 'bold', w * 0.8));
      elements.push(textBlock(centerX(w * 0.5, w), pad + scale(10, h) + titleSize + scale(8, h), content.subtitle, subSize, style.primaryColor, style.bodyFont, 'normal', w * 0.5));

      // Grid of 4 boxes
      const gridTop = pad + scale(10, h) + titleSize + subSize + scale(30, h);
      const gridGap = scale(12, w);
      const boxW = (w - pad * 2 - gridGap) / 2;
      const boxH = (h - gridTop - pad - scale(40, h) - gridGap) / 2;

      const gridItems = [
        { label: content.tagline || 'Quality', icon: '01' },
        { label: content.body || 'Premium', icon: '02' },
        { label: content.cta || 'Fast', icon: '03' },
        { label: content.contact || 'Contact', icon: '04' },
      ];

      gridItems.forEach((item, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const bx = pad + col * (boxW + gridGap);
        const by = gridTop + row * (boxH + gridGap);

        // Box background
        elements.push({ id: id(), type: 'rect', x: Math.round(bx), y: Math.round(by), width: Math.round(boxW), height: Math.round(boxH), fill: i === 0 ? style.primaryColor : '#F8FAFC', rotation: 0, opacity: 1, radius: 8 });

        // Number/icon
        elements.push(textBlock(bx + scale(16, w), by + scale(14, h), item.icon, scale(28, w), i === 0 ? 'rgba(255,255,255,0.2)' : style.primaryColor, style.headingFont, 'bold'));

        // Label
        elements.push(textBlock(bx + scale(16, w), by + boxH - scale(36, h), item.label, scale(13, w), i === 0 ? '#FFFFFF' : style.textColor, style.bodyFont, 'bold'));
      });

      // Bottom accent line
      elements.push(accentBar(0, h - scale(5, h), w, scale(5, h), style.accentColor));

      return elements;
    },
  },

  // --- ELEGANT: Minimal with strong typography hierarchy ---
  elegant: {
    id: 'elegant', name: 'Elegant',
    generate: (w, h, content, style) => {
      const pad = scale(50, w);
      const titleSize = scale(52, w);
      const subSize = scale(16, w);
      const bodySize = scale(13, w);
      const elements: CanvasElement[] = [];

      // Thin border frame
      const frameInset = scale(20, w);
      elements.push({ id: id(), type: 'rect', x: Math.round(frameInset), y: Math.round(frameInset), width: Math.round(w - frameInset * 2), height: Math.round(h - frameInset * 2), fill: 'transparent', stroke: style.secondaryColor, strokeWidth: 1, rotation: 0, opacity: 0.3 });

      // Top decorative line
      elements.push(accentBar(centerX(w * 0.15, w), pad, w * 0.15, scale(1.5, h), style.accentColor));

      // Tagline
      if (content.tagline) {
        elements.push(textBlock(centerX(w * 0.5, w), pad + scale(16, h), content.tagline.toUpperCase(), scale(9, w), style.accentColor, style.bodyFont, 'bold'));
      }

      // Title - large, elegant
      const titleY = pad + scale(40, h);
      elements.push(textBlock(centerX(w * 0.85, w), titleY, content.title, titleSize, style.textColor, style.headingFont, 'bold', w * 0.85));

      // Decorative divider
      elements.push(accentBar(centerX(w * 0.08, w), titleY + titleSize + scale(12, h), w * 0.08, scale(1.5, h), style.accentColor));

      // Subtitle
      const subY = titleY + titleSize + scale(28, h);
      elements.push(textBlock(centerX(w * 0.65, w), subY, content.subtitle, subSize, style.primaryColor, style.bodyFont, 'normal', w * 0.65));

      // Body
      if (content.body) {
        elements.push(textBlock(centerX(w * 0.55, w), subY + subSize + scale(14, h), content.body, bodySize, '#9CA3AF', style.bodyFont, 'normal', w * 0.55));
      }

      // Bottom decorative line
      elements.push(accentBar(centerX(w * 0.15, w), h - pad - scale(16, h), w * 0.15, scale(1.5, h), style.accentColor));

      // Contact
      if (content.contact) {
        elements.push(textBlock(centerX(w * 0.5, w), h - pad, content.contact, scale(10, w), '#9CA3AF', style.bodyFont, 'normal', w * 0.5));
      }

      return elements;
    },
  },

  // --- ASYMMETRIC: Dynamic off-center layout with overlapping elements ---
  asymmetric: {
    id: 'asymmetric', name: 'Asymmetric',
    generate: (w, h, content, style) => {
      const pad = scale(40, w);
      const titleSize = scale(40, w);
      const subSize = scale(15, w);
      const bodySize = scale(13, w);
      const elements: CanvasElement[] = [];

      // Large background circle (off-center)
      elements.push({ id: id(), type: 'circle', x: Math.round(w * 0.55), y: Math.round(-h * 0.1), width: Math.round(w * 0.6), height: Math.round(w * 0.6), fill: style.primaryColor, rotation: 0, opacity: 0.06 });

      // Accent block (top right)
      elements.push({ id: id(), type: 'rect', x: Math.round(w * 0.7), y: 0, width: Math.round(w * 0.3), height: Math.round(h), fill: style.primaryColor, rotation: 0, opacity: 1 });

      // Overlapping circle on the accent block
      elements.push({ id: id(), type: 'circle', x: Math.round(w * 0.72), y: Math.round(h * 0.2), width: Math.round(scale(80, w)), height: Math.round(scale(80, w)), fill: style.accentColor, rotation: 0, opacity: 0.3 });

      // Right side content
      elements.push(textBlock(w * 0.73, h * 0.45, content.tagline?.toUpperCase() || '', scale(9, w), 'rgba(255,255,255,0.7)', style.bodyFont, 'bold'));
      elements.push(textBlock(w * 0.73, h * 0.52, content.cta || '', scale(12, w), '#FFFFFF', style.headingFont, 'bold'));

      // Left side content
      elements.push(accentBar(pad, pad, scale(40, w), scale(3, h), style.accentColor));
      elements.push(textBlock(pad, pad + scale(14, h), content.tagline?.toUpperCase() || '', scale(9, w), style.accentColor, style.bodyFont, 'bold'));

      const titleY = pad + scale(36, h);
      elements.push(textBlock(pad, titleY, content.title, titleSize, style.textColor, style.headingFont, 'bold', w * 0.6));
      elements.push(textBlock(pad, titleY + titleSize + scale(10, h), content.subtitle, subSize, style.primaryColor, style.bodyFont, 'normal', w * 0.6));

      if (content.body) {
        elements.push(textBlock(pad, titleY + titleSize + subSize + scale(20, h), content.body, bodySize, '#64748B', style.bodyFont, 'normal', w * 0.55));
      }

      // Contact
      if (content.contact) {
        elements.push(textBlock(pad, h - pad - scale(16, h), content.contact, scale(10, w), '#9CA3AF', style.bodyFont, 'normal', w * 0.5));
      }

      return elements;
    },
  },
};

// ============================================================
// STYLE PRESET BUILDER
// ============================================================

const STYLE_MAP: Record<string, DesignStyle> = {
  modern: {
    backgroundColor: '#FFFFFF', primaryColor: '#0B57D0', secondaryColor: '#3B82F6',
    accentColor: '#FF6B00', textColor: '#1F2937', headingFont: 'Montserrat', bodyFont: 'Inter',
  },
  luxury: {
    backgroundColor: '#0F0F1A', primaryColor: '#C9A84C', secondaryColor: '#2A2A3E',
    accentColor: '#E8D48B', textColor: '#FFFFFF', headingFont: 'Playfair Display', bodyFont: 'Inter',
  },
  bold: {
    backgroundColor: '#FFFFFF', primaryColor: '#FF6B00', secondaryColor: '#EA580C',
    accentColor: '#DC2626', textColor: '#0F172A', headingFont: 'Montserrat', bodyFont: 'Inter',
  },
  minimal: {
    backgroundColor: '#FFFFFF', primaryColor: '#1F2937', secondaryColor: '#E2E8F0',
    accentColor: '#94A3B8', textColor: '#1F2937', headingFont: 'Space Grotesk', bodyFont: 'Inter',
  },
  eco: {
    backgroundColor: '#F0FDF4', primaryColor: '#16A34A', secondaryColor: '#DCFCE7',
    accentColor: '#065F46', textColor: '#1F2937', headingFont: 'Poppins', bodyFont: 'Inter',
  },
  creative: {
    backgroundColor: '#FFFFFF', primaryColor: '#7C3AED', secondaryColor: '#EC4899',
    accentColor: '#F59E0B', textColor: '#1F2937', headingFont: 'Poppins', bodyFont: 'Inter',
  },
  corporate: {
    backgroundColor: '#FFFFFF', primaryColor: '#0F172A', secondaryColor: '#3B82F6',
    accentColor: '#0B57D0', textColor: '#0F172A', headingFont: 'Montserrat', bodyFont: 'Inter',
  },
  playful: {
    backgroundColor: '#FFFBEB', primaryColor: '#F59E0B', secondaryColor: '#EF4444',
    accentColor: '#3B82F6', textColor: '#1F2937', headingFont: 'Poppins', bodyFont: 'Inter',
  },
};

// ============================================================
// MAIN ENGINE FUNCTION
// ============================================================

export function generateLayout(
  layoutId: string,
  styleId: string,
  content: DesignContent,
  canvasWidth: number,
  canvasHeight: number,
): { backgroundColor: string; elements: CanvasElement[] } {
  const layout = LAYOUTS[layoutId] || LAYOUTS.centered;
  const style = STYLE_MAP[styleId] || STYLE_MAP.modern;

  // Clamp text lengths for canvas size
  const maxTitleLen = Math.floor(canvasWidth / (scale(24, canvasWidth) * 0.55));
  const maxSubLen = Math.floor(canvasWidth / (scale(14, canvasWidth) * 0.5));

  const clampedContent: DesignContent = {
    title: content.title.slice(0, maxTitleLen),
    subtitle: content.subtitle.slice(0, maxSubLen),
    body: content.body?.slice(0, maxSubLen * 2),
    tagline: content.tagline?.slice(0, 30),
    contact: content.contact?.slice(0, maxSubLen),
    cta: content.cta?.slice(0, 25),
  };

  const elements = layout.generate(canvasWidth, canvasHeight, clampedContent, style);

  return { backgroundColor: style.backgroundColor, elements };
}

export function getLayoutIds(): string[] {
  return Object.keys(LAYOUTS);
}

export function getStyleIds(): string[] {
  return Object.keys(STYLE_MAP);
}

export { LAYOUTS, STYLE_MAP };
export type { DesignContent, DesignStyle };
