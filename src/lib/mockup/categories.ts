import type { MockupCategory, MockupProduct } from '@/types/mockup';

// ── Categories with metadata ──
export interface CategoryDef {
  id: MockupCategory;
  label: string;
  icon: string;
  products: MockupProduct[];
  color: string;
}

export const CATEGORIES: CategoryDef[] = [
  { id: 'Business Cards', label: 'Business Cards', icon: 'CreditCard', color: '#0B57D0', products: ['business-card'] },
  { id: 'Flyers', label: 'Flyers', icon: 'FileText', color: '#FF6B00', products: ['flyer'] },
  { id: 'Posters', label: 'Posters', icon: 'Image', color: '#16A34A', products: ['poster', 'roll-up-standee', 'canvas-print'] },
  { id: 'Packaging', label: 'Packaging', icon: 'Package', color: '#7C3AED', products: ['packaging-box', 'shopping-bag'] },
  { id: 'Apparel', label: 'Apparel', icon: 'Shirt', color: '#DC2626', products: ['tshirt', 'hoodie', 'cap'] },
  { id: 'Marketing', label: 'Marketing', icon: 'Megaphone', color: '#0891B2', products: ['banner', 'brochure', 'menu'] },
  { id: 'Restaurant', label: 'Restaurant', icon: 'UtensilsCrossed', color: '#D97706', products: ['menu', 'flyer', 'poster', 'sticker'] },
  { id: 'Office', label: 'Office', icon: 'Building2', color: '#4F46E5', products: ['letterhead', 'certificate', 'notebook', 'id-card'] },
  { id: 'Promotional', label: 'Promotional', icon: 'Gift', color: '#EC4899', products: ['sticker', 'label', 'mug', 'phone-case', 'cap'] },
  { id: 'Stationery', label: 'Stationery', icon: 'Pen', color: '#14B8A6', products: ['notebook', 'invitation', 'wedding-card', 'letterhead'] },
];

// ── Product info with sizes and metadata ──
export interface ProductDef {
  id: MockupProduct;
  name: string;
  icon: string;
  defaultWidth: number;
  defaultHeight: number;
  unit: 'mm' | 'inches';
  dpi: number;
  colorMode: 'CMYK' | 'RGB';
  bleed: number;
  hasBleed: boolean;
}

export const PRODUCTS: Record<MockupProduct, ProductDef> = {
  'business-card': { id: 'business-card', name: 'Business Card', icon: 'CreditCard', defaultWidth: 85, defaultHeight: 55, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 3, hasBleed: true },
  flyer: { id: 'flyer', name: 'Flyer', icon: 'FileText', defaultWidth: 210, defaultHeight: 297, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 3, hasBleed: true },
  brochure: { id: 'brochure', name: 'Brochure', icon: 'BookOpen', defaultWidth: 297, defaultHeight: 210, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 3, hasBleed: true },
  poster: { id: 'poster', name: 'Poster', icon: 'Image', defaultWidth: 420, defaultHeight: 594, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 5, hasBleed: true },
  sticker: { id: 'sticker', name: 'Sticker', icon: 'CircleDot', defaultWidth: 50, defaultHeight: 50, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 2, hasBleed: false },
  label: { id: 'label', name: 'Label', icon: 'Tag', defaultWidth: 100, defaultHeight: 50, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 2, hasBleed: false },
  tshirt: { id: 'tshirt', name: 'T-Shirt', icon: 'Shirt', defaultWidth: 300, defaultHeight: 400, unit: 'mm', dpi: 150, colorMode: 'RGB', bleed: 0, hasBleed: false },
  hoodie: { id: 'hoodie', name: 'Hoodie', icon: 'Shirt', defaultWidth: 350, defaultHeight: 450, unit: 'mm', dpi: 150, colorMode: 'RGB', bleed: 0, hasBleed: false },
  cap: { id: 'cap', name: 'Cap', icon: 'Hat', defaultWidth: 150, defaultHeight: 80, unit: 'mm', dpi: 200, colorMode: 'RGB', bleed: 0, hasBleed: false },
  mug: { id: 'mug', name: 'Mug', icon: 'Coffee', defaultWidth: 200, defaultHeight: 90, unit: 'mm', dpi: 200, colorMode: 'RGB', bleed: 0, hasBleed: false },
  'phone-case': { id: 'phone-case', name: 'Phone Case', icon: 'Smartphone', defaultWidth: 150, defaultHeight: 75, unit: 'mm', dpi: 300, colorMode: 'RGB', bleed: 2, hasBleed: true },
  'shopping-bag': { id: 'shopping-bag', name: 'Shopping Bag', icon: 'ShoppingBag', defaultWidth: 300, defaultHeight: 400, unit: 'mm', dpi: 150, colorMode: 'CMYK', bleed: 3, hasBleed: true },
  'packaging-box': { id: 'packaging-box', name: 'Packaging Box', icon: 'Package', defaultWidth: 200, defaultHeight: 200, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 3, hasBleed: true },
  letterhead: { id: 'letterhead', name: 'Letterhead', icon: 'File', defaultWidth: 210, defaultHeight: 297, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 3, hasBleed: true },
  certificate: { id: 'certificate', name: 'Certificate', icon: 'Award', defaultWidth: 297, defaultHeight: 210, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 3, hasBleed: true },
  menu: { id: 'menu', name: 'Menu', icon: 'UtensilsCrossed', defaultWidth: 210, defaultHeight: 297, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 3, hasBleed: true },
  banner: { id: 'banner', name: 'Banner', icon: 'Flag', defaultWidth: 900, defaultHeight: 1800, unit: 'mm', dpi: 150, colorMode: 'CMYK', bleed: 5, hasBleed: true },
  'roll-up-standee': { id: 'roll-up-standee', name: 'Roll-Up Standee', icon: 'PanelTopClose', defaultWidth: 800, defaultHeight: 2000, unit: 'mm', dpi: 150, colorMode: 'CMYK', bleed: 5, hasBleed: true },
  'canvas-print': { id: 'canvas-print', name: 'Canvas Print', icon: 'Frame', defaultWidth: 300, defaultHeight: 400, unit: 'mm', dpi: 200, colorMode: 'RGB', bleed: 0, hasBleed: false },
  notebook: { id: 'notebook', name: 'Notebook', icon: 'Book', defaultWidth: 210, defaultHeight: 297, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 3, hasBleed: true },
  'id-card': { id: 'id-card', name: 'ID Card', icon: 'IdCard', defaultWidth: 85, defaultHeight: 54, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 2, hasBleed: true },
  'wedding-card': { id: 'wedding-card', name: 'Wedding Card', icon: 'Heart', defaultWidth: 150, defaultHeight: 210, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 3, hasBleed: true },
  invitation: { id: 'invitation', name: 'Invitation', icon: 'Mail', defaultWidth: 150, defaultHeight: 210, unit: 'mm', dpi: 300, colorMode: 'CMYK', bleed: 3, hasBleed: true },
};

// ── Tags for scene search/filter ──
export interface SearchFilter {
  category?: MockupCategory;
  product?: MockupProduct;
  style?: string;
  material?: string;
  color?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
  industry?: string;
}

export const STYLES = ['Modern', 'Classic', 'Minimal', 'Bold', 'Elegant', 'Vintage', 'Playful'];
export const MATERIALS = ['Matte', 'Glossy', 'Textured', 'Canvas', 'Premium'];
export const ORIENTATIONS = ['portrait', 'landscape', 'square'] as const;
export const INDUSTRIES = ['Retail', 'Food & Beverage', 'Healthcare', 'Education', 'Technology', 'Corporate', 'Event', 'Real Estate'];
