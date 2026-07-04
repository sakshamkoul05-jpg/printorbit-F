import type { SceneDef, MockupCategory, MockupProduct } from '@/types/mockup';

const bg = (colors: string[]) => colors;

// Helper to create a scene definition
function scene(
  id: string, name: string, product: MockupProduct, category: MockupCategory,
  desc: string, tags: string[], colors: string[], orientation: 'portrait' | 'landscape' | 'square',
  printableArea: { tl: [number, number]; tr: [number, number]; bl: [number, number]; br: [number, number] },
  designRender: { left: string; top: string; width: string; height: string; transform?: string; borderRadius?: string; clipPath?: string; boxShadow?: string; blendMode?: string },
  extra?: Partial<SceneDef>,
): SceneDef {
  const toObj = ([x, y]: [number, number]) => ({ x, y });
  return {
    id, name, product, category, description: desc, tags,
    background: { type: 'gradient', value: colors.join(',') },
    printableArea: { tl: toObj(printableArea.tl), tr: toObj(printableArea.tr), bl: toObj(printableArea.bl), br: toObj(printableArea.br) },
    perspectivePoints: { tl: toObj(printableArea.tl), tr: toObj(printableArea.tr), bl: toObj(printableArea.bl), br: toObj(printableArea.br) },
    mask: null,
    reflectionLayer: null,
    shadow: { angle: 45, distance: 0.5, blur: 4, opacity: 0.25, color: '#000000' },
    textureLayer: { type: 'paper', opacity: 0.06 },
    dpi: 300, width: 1200, height: 800, orientation,
    color: colors, material: 'Standard', industry: ['General'],
    renderOptions: {
      designLeft: designRender.left, designTop: designRender.top,
      designWidth: designRender.width, designHeight: designRender.height,
      designTransform: designRender.transform,
      designBorderRadius: designRender.borderRadius,
      designClipPath: designRender.clipPath,
      boxShadow: designRender.boxShadow,
      blendMode: designRender.blendMode as any,
    },
    ...extra,
  };
}

export const SCENES: SceneDef[] = [
  // ── BUSINESS CARDS ──
  scene('bc-angled', 'Angled on Desk', 'business-card', 'Business Cards', 'Professional angled view on premium wooden desk', ['modern', 'elegant', 'professional'], ['#2c1810', '#4a3020', '#3a2515'], 'landscape', { tl: [0.28, 0.22], tr: [0.72, 0.20], bl: [0.30, 0.52], br: [0.74, 0.50] }, { left: '28%', top: '22%', width: '44%', height: '28%', transform: 'perspective(1200px) rotateX(38deg) rotateY(-12deg) rotateZ(2deg)', borderRadius: '4px', boxShadow: '0 15px 40px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)' }),
  scene('bc-flat', 'Flat Lay', 'business-card', 'Business Cards', 'Clean flat lay on marble surface', ['minimal', 'clean', 'modern'], ['#f5f0e8', '#e8e0d5', '#ddd5c8'], 'landscape', { tl: [0.28, 0.30], tr: [0.72, 0.30], bl: [0.28, 0.58], br: [0.72, 0.58] }, { left: '28%', top: '30%', width: '44%', height: '28%', borderRadius: '4px', boxShadow: '0 8px 25px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)' }),
  scene('bc-elegant', 'Elegant Studio', 'business-card', 'Business Cards', 'Premium studio lighting on dark background', ['elegant', 'premium', 'dark'], ['#1a1a2e', '#16213e', '#0f3460'], 'landscape', { tl: [0.28, 0.32], tr: [0.72, 0.32], bl: [0.28, 0.60], br: [0.72, 0.60] }, { left: '28%', top: '32%', width: '44%', height: '28%', borderRadius: '4px', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(100,200,255,0.08)' }),

  // ── FLYERS ──
  scene('flyer-table', 'On Wooden Table', 'flyer', 'Flyers', 'Flyer on rustic wooden table', ['rustic', 'warm', 'natural'], ['#5c3d2a', '#7a5540', '#6b4530'], 'portrait', { tl: [0.22, 0.18], tr: [0.78, 0.16], bl: [0.24, 0.76], br: [0.80, 0.74] }, { left: '22%', top: '18%', width: '56%', height: '56%', transform: 'perspective(1000px) rotateX(35deg) rotateY(-8deg)', borderRadius: '2px', boxShadow: '0 12px 35px rgba(0,0,0,0.4)' }),
  scene('flyer-marble', 'Marble Surface', 'flyer', 'Flyers', 'Flyer on clean marble surface', ['clean', 'minimal', 'elegant'], ['#f5f0e8', '#e8e0d5', '#ddd5c8'], 'portrait', { tl: [0.22, 0.20], tr: [0.78, 0.20], bl: [0.22, 0.75], br: [0.78, 0.75] }, { left: '22%', top: '20%', width: '56%', height: '55%', borderRadius: '2px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }),

  // ── BROCHURES ──
  scene('brochure-flat', 'Tri-Fold Flat Lay', 'brochure', 'Marketing', 'Tri-fold brochure flat lay', ['corporate', 'professional'], ['#f0ebe5', '#e5ddd0', '#d8cec0'], 'landscape', { tl: [0.12, 0.15], tr: [0.88, 0.15], bl: [0.12, 0.75], br: [0.88, 0.75] }, { left: '12%', top: '15%', width: '76%', height: '60%', borderRadius: '2px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }),
  scene('brochure-angled', 'Angled View', 'brochure', 'Marketing', 'Brochure angled on desk', ['modern', 'dynamic'], ['#4a3528', '#6b4d3a', '#5c4033'], 'landscape', { tl: [0.18, 0.20], tr: [0.82, 0.22], bl: [0.20, 0.72], br: [0.84, 0.74] }, { left: '18%', top: '20%', width: '64%', height: '52%', transform: 'perspective(1000px) rotateX(28deg) rotateY(-6deg)', borderRadius: '2px', boxShadow: '0 15px 40px rgba(0,0,0,0.35)' }),

  // ── POSTERS ──
  scene('poster-gallery', 'Gallery Frame', 'poster', 'Posters', 'Framed poster on gallery wall', ['gallery', 'framed', 'professional'], ['#f5f2ed', '#e8e2d8', '#ddd5c8'], 'portrait', { tl: [0.22, 0.08], tr: [0.78, 0.10], bl: [0.20, 0.85], br: [0.76, 0.87] }, { left: '22%', top: '8%', width: '56%', height: '77%', borderRadius: '2px', boxShadow: '0 15px 50px rgba(0,0,0,0.15), 0 0 0 8px #f5f2ed, 0 0 0 10px rgba(0,0,0,0.1)' }),
  scene('poster-moody', 'Moody Dark', 'poster', 'Posters', 'Dramatic dark wall with spotlight', ['dramatic', 'dark', 'spotlight'], ['#1a1a2e', '#2a2a3e', '#1a1a2e'], 'portrait', { tl: [0.20, 0.10], tr: [0.80, 0.12], bl: [0.18, 0.85], br: [0.78, 0.87] }, { left: '20%', top: '10%', width: '60%', height: '75%', borderRadius: '2px', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(200,200,255,0.03)' }),

  // ── STICKERS ──
  scene('sticker-circle', 'Circle on Surface', 'sticker', 'Promotional', 'Round sticker on clean surface', ['circle', 'clean', 'simple'], ['#f0ece4', '#e8e0d8', '#ddd5cc'], 'square', { tl: [0.30, 0.28], tr: [0.70, 0.28], bl: [0.30, 0.68], br: [0.70, 0.68] }, { left: '30%', top: '28%', width: '40%', height: '40%', borderRadius: '50%', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }),
  scene('sticker-diecut', 'Die-Cut Pack', 'sticker', 'Promotional', 'Die-cut sticker sheet mockup', ['diecut', 'pack', 'colorful'], ['#f8f5f0', '#ede8e0', '#e0d8cc'], 'landscape', { tl: [0.10, 0.15], tr: [0.90, 0.15], bl: [0.10, 0.75], br: [0.90, 0.75] }, { left: '10%', top: '15%', width: '80%', height: '60%', borderRadius: '8px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }),

  // ── LABELS ──
  scene('label-roll', 'Label Roll', 'label', 'Promotional', 'Labels on a roll mockup', ['roll', 'industrial', 'clean'], ['#f0ece4', '#e8e0d8', '#ddd5cc'], 'landscape', { tl: [0.20, 0.25], tr: [0.80, 0.25], bl: [0.20, 0.65], br: [0.80, 0.65] }, { left: '20%', top: '25%', width: '60%', height: '40%', borderRadius: '4px', boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }),

  // ── T-SHIRTS ──
  scene('tshirt-flat', 'Centered Flat Lay', 'tshirt', 'Apparel', 'Clean flat lay on premium surface', ['flatlay', 'clean', 'minimal'], ['#f8f5f0', '#ede8e0', '#e0d8cc'], 'landscape', { tl: [0.22, 0.22], tr: [0.78, 0.22], bl: [0.22, 0.72], br: [0.78, 0.72] }, { left: '22%', top: '22%', width: '56%', height: '50%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', blendMode: 'multiply', clipPath: 'polygon(5% 0%, 95% 0%, 100% 20%, 85% 100%, 15% 100%, 0% 20%)' }),
  scene('tshirt-dark', 'Dark Studio', 'tshirt', 'Apparel', 'Dramatic studio lighting', ['dramatic', 'studio', 'dark'], ['#1a1a2e', '#2a2a3e', '#1a1a2e'], 'landscape', { tl: [0.20, 0.20], tr: [0.80, 0.20], bl: [0.20, 0.75], br: [0.80, 0.75] }, { left: '20%', top: '20%', width: '60%', height: '55%', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.4)', blendMode: 'multiply', clipPath: 'polygon(5% 0%, 95% 0%, 100% 20%, 85% 100%, 15% 100%, 0% 20%)' }),

  // ── HOODIES ──
  scene('hoodie-flat', 'Hoodie Flat Lay', 'hoodie', 'Apparel', 'Folded hoodie on surface', ['casual', 'comfortable', 'flatlay'], ['#f5f0e8', '#ede5d8', '#e0d5c5'], 'landscape', { tl: [0.15, 0.15], tr: [0.85, 0.15], bl: [0.15, 0.72], br: [0.85, 0.72] }, { left: '15%', top: '15%', width: '70%', height: '57%', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', blendMode: 'multiply', clipPath: 'polygon(3% 0%, 97% 0%, 100% 15%, 90% 100%, 10% 100%, 0% 15%)' }),

  // ── CAPS ──
  scene('cap-front', 'Cap Front View', 'cap', 'Apparel', 'Clean front-facing cap mockup', ['front', 'clean', 'casual'], ['#e8e0d5', '#d5cbbf', '#c8bfb2'], 'landscape', { tl: [0.28, 0.18], tr: [0.72, 0.18], bl: [0.28, 0.52], br: [0.72, 0.52] }, { left: '28%', top: '18%', width: '44%', height: '34%', borderRadius: '30% 30% 50% 50% / 40% 40% 30% 30%', boxShadow: '0 10px 30px rgba(0,0,0,0.18)', clipPath: 'ellipse(50% 45% at 50% 45%)' }),

  // ── MUGS ──
  scene('mug-center', 'Centered Front', 'mug', 'Promotional', 'Clean centered mug on wooden table', ['center', 'clean', 'warm'], ['#3a2515', '#5c3d2a', '#4a3020'], 'portrait', { tl: [0.28, 0.15], tr: [0.72, 0.18], bl: [0.26, 0.72], br: [0.70, 0.75] }, { left: '28%', top: '15%', width: '44%', height: '57%', borderRadius: '6px', boxShadow: '0 10px 35px rgba(0,0,0,0.35), inset 0 0 30px rgba(0,0,0,0.1)', transform: 'perspective(800px) rotateY(-3deg)' }),
  scene('mug-warm', 'Warm Coffee', 'mug', 'Promotional', 'Coffee mug with warm ambient lighting', ['warm', 'coffee', 'ambient'], ['#4a3528', '#6b4d3a', '#5c4033'], 'portrait', { tl: [0.26, 0.18], tr: [0.74, 0.20], bl: [0.24, 0.72], br: [0.72, 0.74] }, { left: '26%', top: '18%', width: '48%', height: '54%', borderRadius: '6px', boxShadow: '0 12px 40px rgba(0,0,0,0.4)', transform: 'perspective(800px) rotateY(-6deg)' }),

  // ── PHONE CASES ──
  scene('phone-flat', 'Flat Lay', 'phone-case', 'Promotional', 'Phone case flat lay on surface', ['flatlay', 'clean', 'modern'], ['#f0ece4', '#e8e0d8', '#ddd5cc'], 'portrait', { tl: [0.30, 0.12], tr: [0.70, 0.14], bl: [0.28, 0.78], br: [0.68, 0.80] }, { left: '30%', top: '12%', width: '40%', height: '66%', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }),
  scene('phone-angled', 'Angled View', 'phone-case', 'Promotional', 'Phone case angled on desk', ['angled', 'dynamic', 'sleek'], ['#4a3020', '#6b4d3a', '#5c4033'], 'portrait', { tl: [0.32, 0.15], tr: [0.68, 0.20], bl: [0.30, 0.75], br: [0.66, 0.80] }, { left: '32%', top: '15%', width: '36%', height: '60%', borderRadius: '12px', boxShadow: '0 15px 40px rgba(0,0,0,0.3)', transform: 'perspective(800px) rotateY(-12deg)' }),

  // ── SHOPPING BAGS ──
  scene('bag-flat', 'Flat Lay', 'shopping-bag', 'Packaging', 'Shopping bag flat lay', ['flatlay', 'retail', 'clean'], ['#f5f0e8', '#ede5d8', '#e0d5c5'], 'landscape', { tl: [0.15, 0.15], tr: [0.85, 0.15], bl: [0.15, 0.72], br: [0.85, 0.72] }, { left: '15%', top: '15%', width: '70%', height: '57%', borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', blendMode: 'multiply' }),

  // ── PACKAGING BOXES ──
  scene('box-isometric', 'Isometric Box', 'packaging-box', 'Packaging', '3D isometric packaging box', ['isometric', '3d', 'premium'], ['#f8f5f0', '#ede8e0', '#e0d8cc'], 'landscape', { tl: [0.18, 0.10], tr: [0.82, 0.18], bl: [0.22, 0.68], br: [0.86, 0.76] }, { left: '18%', top: '10%', width: '64%', height: '58%', boxShadow: '0 25px 60px rgba(0,0,0,0.2)', transform: 'perspective(1000px) rotateX(30deg) rotateY(-25deg)' }),

  // ── LETTERHEADS ──
  scene('letterhead-flat', 'Flat Lay', 'letterhead', 'Office', 'Letterhead on clean desk', ['corporate', 'professional', 'clean'], ['#f5f0e8', '#ede5d8', '#e0d5c5'], 'portrait', { tl: [0.20, 0.12], tr: [0.80, 0.12], bl: [0.20, 0.82], br: [0.80, 0.82] }, { left: '20%', top: '12%', width: '60%', height: '70%', borderRadius: '2px', boxShadow: '0 6px 25px rgba(0,0,0,0.1)' }),

  // ── CERTIFICATES ──
  scene('certificate-frame', 'Framed Certificate', 'certificate', 'Office', 'Certificate in elegant frame', ['formal', 'elegant', 'premium'], ['#f0ebe5', '#e5ddd0', '#d8cec0'], 'landscape', { tl: [0.10, 0.08], tr: [0.90, 0.08], bl: [0.10, 0.85], br: [0.90, 0.85] }, { left: '10%', top: '8%', width: '80%', height: '77%', borderRadius: '2px', boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 0 0 12px rgba(255,255,255,0.5)' }),

  // ── MENUS ──
  scene('menu-flat', 'Flat Lay', 'menu', 'Restaurant', 'Menu flat lay on table', ['restaurant', 'clean', 'readable'], ['#5c3d2a', '#7a5540', '#6b4530'], 'portrait', { tl: [0.18, 0.10], tr: [0.82, 0.10], bl: [0.18, 0.82], br: [0.82, 0.82] }, { left: '18%', top: '10%', width: '64%', height: '72%', borderRadius: '2px', boxShadow: '0 8px 30px rgba(0,0,0,0.25)' }),

  // ── BANNERS ──
  scene('banner-podium', 'Podium Display', 'banner', 'Marketing', 'Banner on clean podium', ['corporate', 'clean', 'wide'], ['#e8e8ed', '#d8d8e0', '#c8c8d0'], 'portrait', { tl: [0.10, 0.10], tr: [0.90, 0.10], bl: [0.10, 0.80], br: [0.90, 0.80] }, { left: '10%', top: '10%', width: '80%', height: '70%', boxShadow: '0 15px 50px rgba(0,0,0,0.12)' }),

  // ── ROLL-UP STANDEE ──
  scene('standee-display', 'Display Stand', 'roll-up-standee', 'Posters', 'Roll-up standee on display', ['exhibition', 'display', 'professional'], ['#e0dbd0', '#d0c8b8', '#c0b8a8'], 'portrait', { tl: [0.32, 0.06], tr: [0.68, 0.08], bl: [0.30, 0.85], br: [0.66, 0.87] }, { left: '32%', top: '6%', width: '36%', height: '79%', borderRadius: '2px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }),

  // ── CANVAS PRINT ──
  scene('canvas-wall', 'Wall Display', 'canvas-print', 'Posters', 'Canvas print on wall', ['wall', 'gallery', 'home'], ['#f5f2ed', '#e8e2d8', '#ddd5c8'], 'portrait', { tl: [0.20, 0.08], tr: [0.80, 0.10], bl: [0.18, 0.82], br: [0.78, 0.84] }, { left: '20%', top: '8%', width: '60%', height: '74%', borderRadius: '2px', boxShadow: '0 15px 40px rgba(0,0,0,0.15), 0 0 0 30px rgba(255,255,255,0.3), 0 0 0 32px rgba(0,0,0,0.06)' }),

  // ── NOTEBOOKS ──
  scene('notebook-open', 'Open Notebook', 'notebook', 'Stationery', 'Open notebook on desk', ['creative', 'writing', 'casual'], ['#3a2515', '#5c3d2a', '#4a3020'], 'landscape', { tl: [0.12, 0.15], tr: [0.88, 0.15], bl: [0.12, 0.72], br: [0.88, 0.72] }, { left: '12%', top: '15%', width: '76%', height: '57%', borderRadius: '3px', boxShadow: '0 15px 40px rgba(0,0,0,0.35)' }),
  scene('notebook-closed', 'Closed Notebook', 'notebook', 'Stationery', 'Closed notebook with ribbon', ['elegant', 'professional', 'clean'], ['#f0ebe5', '#e5ddd0', '#d8cec0'], 'landscape', { tl: [0.25, 0.12], tr: [0.75, 0.12], bl: [0.25, 0.70], br: [0.75, 0.70] }, { left: '25%', top: '12%', width: '50%', height: '58%', borderRadius: '4px', boxShadow: '0 10px 35px rgba(0,0,0,0.15)' }),

  // ── ID CARDS ──
  scene('idcard-flat', 'Flat Lay', 'id-card', 'Office', 'ID card flat on surface', ['corporate', 'clean', 'professional'], ['#f0ece4', '#e8e0d8', '#ddd5cc'], 'landscape', { tl: [0.28, 0.30], tr: [0.72, 0.30], bl: [0.28, 0.58], br: [0.72, 0.58] }, { left: '28%', top: '30%', width: '44%', height: '28%', borderRadius: '3px', boxShadow: '0 8px 25px rgba(0,0,0,0.12)' }),

  // ── WEDDING CARDS ──
  scene('wedding-elegant', 'Elegant Display', 'wedding-card', 'Stationery', 'Wedding card elegant display', ['wedding', 'elegant', 'luxury'], ['#f5f0e8', '#e8e0d5', '#ddd5c8'], 'portrait', { tl: [0.18, 0.12], tr: [0.82, 0.15], bl: [0.16, 0.80], br: [0.80, 0.82] }, { left: '18%', top: '12%', width: '64%', height: '68%', borderRadius: '3px', boxShadow: '0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(218,165,32,0.3)', transform: 'perspective(1000px) rotateX(5deg) rotateY(-3deg)' }),

  // ── INVITATIONS ──
  scene('invitation-set', 'Invitation Set', 'invitation', 'Stationery', 'Invitation card with envelope', ['elegant', 'formal', 'set'], ['#f5f0e8', '#e8e0d5', '#ddd5c8'], 'landscape', { tl: [0.15, 0.20], tr: [0.65, 0.22], bl: [0.14, 0.65], br: [0.64, 0.67] }, { left: '15%', top: '20%', width: '50%', height: '45%', borderRadius: '3px', boxShadow: '0 12px 35px rgba(0,0,0,0.15)' }),
];

export function getScenesByProduct(product: MockupProduct): SceneDef[] {
  return SCENES.filter(s => s.product === product);
}

export function getScenesByCategory(category: MockupCategory): SceneDef[] {
  return SCENES.filter(s => s.category === category);
}

export function searchScenes(query: string): SceneDef[] {
  const q = query.toLowerCase();
  return SCENES.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.product.replace(/-/g, ' ').includes(q) ||
    s.category.toLowerCase().includes(q) ||
    s.tags.some(t => t.includes(q)) ||
    s.color.some(c => c.toLowerCase().includes(q)) ||
    s.material.toLowerCase().includes(q) ||
    s.industry.some(i => i.toLowerCase().includes(q))
  );
}
