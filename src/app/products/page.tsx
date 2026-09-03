'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search, X, ChevronRight, ChevronDown,
  CreditCard, FileText, Image, Tag, Package, Shirt, Coffee,
  PenLine, Mail, Square, Layout, BookOpen, Flag, Crown,
  ShoppingBag, Usb, Battery, Award, Cloud, Umbrella, Calendar,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import type { Product } from '@/types';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'visiting-cards': CreditCard, 'id-cards': CreditCard, flyers: FileText,
  brochures: BookOpen, posters: Image, banners: Flag, stickers: Tag,
  labels: Tag, 'custom-boxes': Package, letterheads: FileText, envelopes: Mail,
  't-shirts': Shirt, 'polo-t-shirts': Shirt, 'jackets-hoodies': Shirt,
  mugs: Coffee, 'water-bottles': Coffee, 'tote-bags': ShoppingBag,
  'usb-drives': Usb, 'power-banks': Battery, pens: PenLine,
  trophies: Award, backpacks: ShoppingBag, 'diaries-notebooks': BookOpen,
  calendars: Calendar, umbrellas: Umbrella, raincoats: Cloud,
  'gift-hampers': Gift,
};

function Gift({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

const CATEGORY_ID_MAP: Record<string, string> = {
  '1': 'visiting-cards',
  '2': 'flyers',
  '3': 'brochures',
  '5': 'banners',
  '7': 'stickers',
  '8': 'custom-boxes',
  '9': 'letterheads',
  '11': 't-shirts',
  '12': 'mugs',
  '15': 'umbrellas',
};

const POPULAR_PRODUCTS = ['1', '6', '11', '13', '14', '28'];
const BEST_SELLER_PRODUCTS = ['2', '12', '34', '41'];

const ALL_PRODUCTS: Product[] = [
  // Business Cards
  { id: '1', category_id: '1', name: 'Standard Business Cards', slug: 'standard-business-cards', description: 'Classic business cards printed on 300gsm cardstock.', short_description: '300gsm classic cards', base_price: 299, min_quantity: 100, max_quantity: 50000, materials: [{ name: '300gsm', price_modifier: 0 }, { name: '350gsm', price_modifier: 30 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }], sizes: [{ name: 'Standard (85×55)', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '300gsm Cardstock', 'Print': 'Full Color Both Sides' }, is_active: true, created_at: '' },
  { id: '2', category_id: '1', name: 'Premium Matte Business Cards', slug: 'premium-matte-business-cards', description: 'Thick 400gsm matte cards with a luxurious feel.', short_description: '400gsm premium matte finish', base_price: 499, min_quantity: 100, max_quantity: 10000, materials: [{ name: '350gsm', price_modifier: -50 }, { name: '400gsm', price_modifier: 0 }, { name: '450gsm', price_modifier: 50 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 25 }, { name: 'Soft Touch', price_modifier: 75 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }, { name: 'Slim', width: 90, height: 50, price_modifier: 20 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '400gsm Premium Cardstock', 'Print': 'Full Color Both Sides' }, is_active: true, created_at: '' },
  { id: '3', category_id: '1', name: 'Metallic Foil Business Cards', slug: 'metallic-foil-business-cards', description: 'Eye-catching metallic foil stamping on premium cardstock.', short_description: 'Foil stamped premium cards', base_price: 899, min_quantity: 100, max_quantity: 5000, materials: [{ name: '350gsm', price_modifier: -100 }, { name: '400gsm', price_modifier: 0 }], finishes: [{ name: 'Gold Foil', price_modifier: 0 }, { name: 'Silver Foil', price_modifier: 0 }, { name: 'Rose Gold', price_modifier: 50 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '400gsm Premium Cardstock', 'Print': 'Foil Stamping' }, is_active: true, created_at: '' },
  { id: '4', category_id: '1', name: 'Luxury Velvet Business Cards', slug: 'luxury-business-cards', description: 'Soft velvet lamination with foil accents.', short_description: 'Velvet finish luxury cards', base_price: 1299, min_quantity: 100, max_quantity: 2000, materials: [{ name: '400gsm', price_modifier: 0 }, { name: '500gsm', price_modifier: 100 }], finishes: [{ name: 'Velvet Black', price_modifier: 0 }, { name: 'Velvet Navy', price_modifier: 0 }, { name: 'Velvet Burgundy', price_modifier: 50 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '500gsm Premium', 'Finish': 'Velvet Lamination' }, is_active: true, created_at: '' },
  { id: '5', category_id: '1', name: 'Magnet Business Cards', slug: 'magnet-business-cards', description: 'Business cards that stick to fridges and boards.', short_description: 'Magnetic backing cards', base_price: 799, min_quantity: 100, max_quantity: 5000, materials: [{ name: 'Magnetic', price_modifier: 0 }], finishes: [{ name: 'Glossy', price_modifier: 0 }, { name: 'Matte', price_modifier: 20 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Magnetic Sheet', 'Print': 'Full Color' }, is_active: true, created_at: '' },
  // Flyers
  { id: '6', category_id: '2', name: 'A5 Double-Sided Flyers', slug: 'a5-flyers', description: 'Vibrant full-color A5 flyers on premium paper.', short_description: '170gsm art paper, full color', base_price: 299, min_quantity: 100, max_quantity: 50000, materials: [{ name: '130gsm Art', price_modifier: -30 }, { name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 60 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }], sizes: [{ name: 'A5', width: 148, height: 210, price_modifier: 0 }, { name: 'A4', width: 210, height: 297, price_modifier: 80 }, { name: 'DL', width: 99, height: 210, price_modifier: -20 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1586281380183-ea4a351cc8b6?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '170gsm Art Paper', 'Print': 'Full Color Both Sides' }, is_active: true, created_at: '' },
  { id: '7', category_id: '2', name: 'A4 Double-Sided Flyers', slug: 'a4-flyers', description: 'Large format flyers for maximum impact.', short_description: 'A4 full color flyers', base_price: 499, min_quantity: 100, max_quantity: 50000, materials: [{ name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 80 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 20 }], sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1606114069123-1ef1e1c762ee?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '170gsm Art Paper', 'Print': 'Full Color Both Sides' }, is_active: true, created_at: '' },
  // Brochures
  { id: '8', category_id: '3', name: 'Tri-Fold Brochures', slug: 'tri-fold-brochures', description: 'Popular tri-fold format for marketing.', short_description: 'A4 tri-fold brochure', base_price: 599, min_quantity: 50, max_quantity: 10000, materials: [{ name: '130gsm Art', price_modifier: -50 }, { name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 100 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 30 }], sizes: [{ name: 'A4 (folded to DL)', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1553729784-e91953dec042?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '170gsm Art Paper', 'Fold': 'Tri-Fold' }, is_active: true, created_at: '' },
  { id: '9', category_id: '3', name: 'Bi-Fold Brochures', slug: 'bi-fold-brochures', description: 'Professional bi-fold brochures.', short_description: 'A4 bi-fold brochure', base_price: 499, min_quantity: 50, max_quantity: 10000, materials: [{ name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 80 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 25 }], sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1606114069123-1ef1e1c762ee?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '170gsm Art Paper', 'Fold': 'Bi-Fold' }, is_active: true, created_at: '' },
  // Banners
  { id: '10', category_id: '5', name: 'Vinyl Banner 3×6ft', slug: 'vinyl-banners', description: 'Durable vinyl banner for indoor and outdoor use.', short_description: 'Weather-resistant vinyl', base_price: 599, min_quantity: 1, max_quantity: 100, materials: [{ name: '13oz Vinyl', price_modifier: 0 }, { name: '18oz Vinyl', price_modifier: 200 }], finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'With Grommets', price_modifier: 50 }], sizes: [{ name: '3×6 ft', width: 914, height: 1829, price_modifier: 0 }, { name: '4×8 ft', width: 1219, height: 2438, price_modifier: 300 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': '13oz Vinyl', 'Print': 'Eco-Solvent' }, is_active: true, created_at: '' },
  // Stickers
  { id: '11', category_id: '7', name: 'Die-Cut Vinyl Stickers', slug: 'die-cut-stickers', description: 'Custom die-cut stickers in any shape.', short_description: 'Waterproof vinyl, any shape', base_price: 199, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'White Vinyl', price_modifier: 0 }, { name: 'Clear Vinyl', price_modifier: 30 }, { name: 'Holographic', price_modifier: 80 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 10 }], sizes: [{ name: '2 inch', width: 50, height: 50, price_modifier: 0 }, { name: '3 inch', width: 75, height: 75, price_modifier: 20 }, { name: '4 inch', width: 100, height: 100, price_modifier: 40 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Premium Vinyl', 'Finish': 'Waterproof' }, is_active: true, created_at: '' },
  // Packaging
  { id: '12', category_id: '8', name: 'Custom Mailer Boxes', slug: 'mailer-boxes', description: 'Branded corrugated mailer boxes.', short_description: 'Corrugated branded packaging', base_price: 149, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'E-Flute', price_modifier: 0 }, { name: 'B-Flute', price_modifier: 30 }], finishes: [{ name: 'Kraft', price_modifier: 0 }, { name: 'White Board', price_modifier: 20 }, { name: 'Laminated', price_modifier: 50 }], sizes: [{ name: 'Small', width: 150, height: 100, price_modifier: 0 }, { name: 'Medium', width: 250, height: 150, price_modifier: 60 }, { name: 'Large', width: 350, height: 250, price_modifier: 150 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'E-Flute Corrugated', 'Print': 'Full Color Offset' }, is_active: true, created_at: '' },
  // T-Shirts
  { id: '13', category_id: '11', name: 'Custom Cotton T-Shirts', slug: 'cotton-tshirts', description: 'Premium 100% cotton t-shirts with custom print.', short_description: '100% cotton, custom print', base_price: 399, min_quantity: 20, max_quantity: 5000, materials: [{ name: '100% Cotton', price_modifier: 0 }, { name: 'Poly-Cotton', price_modifier: -30 }, { name: 'Organic Cotton', price_modifier: 50 }], finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'DTG Print', price_modifier: 30 }, { name: 'Sublimation', price_modifier: 50 }], sizes: [{ name: 'S', width: 0, height: 0, price_modifier: 0 }, { name: 'M', width: 0, height: 0, price_modifier: 0 }, { name: 'L', width: 0, height: 0, price_modifier: 0 }, { name: 'XL', width: 0, height: 0, price_modifier: 0 }, { name: 'XXL', width: 0, height: 0, price_modifier: 20 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': '100% Cotton', 'Weight': '180 GSM' }, is_active: true, created_at: '' },
  // Mugs
  { id: '14', category_id: '12', name: 'Custom Ceramic Mugs', slug: 'ceramic-mugs', description: 'Classic ceramic mugs with custom print.', short_description: '11oz ceramic, custom print', base_price: 299, min_quantity: 10, max_quantity: 5000, materials: [{ name: 'Ceramic', price_modifier: 0 }, { name: 'Glass', price_modifier: 50 }], finishes: [{ name: 'Standard Print', price_modifier: 0 }, { name: 'Magic (Heat Reveal)', price_modifier: 150 }], sizes: [{ name: '11oz', width: 0, height: 0, price_modifier: 0 }, { name: '15oz', width: 0, height: 0, price_modifier: 40 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Ceramic', 'Capacity': '11oz / 15oz' }, is_active: true, created_at: '' },
  // Letterheads
  { id: '15', category_id: '9', name: 'A4 Corporate Letterheads', slug: 'a4-letterheads', description: 'Professional A4 letterheads for businesses.', short_description: '120gsm premium paper', base_price: 399, min_quantity: 100, max_quantity: 10000, materials: [{ name: '100gsm', price_modifier: -30 }, { name: '120gsm', price_modifier: 0 }, { name: '160gsm', price_modifier: 40 }], finishes: [{ name: 'Uncoated', price_modifier: 0 }, { name: 'Wove', price_modifier: 20 }], sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '120gsm Premium', 'Print': 'Full Color' }, is_active: true, created_at: '' },
  // Card Holders
  { id: '16', category_id: '1', name: 'Visiting Card Holders', slug: 'card-holders', description: 'Premium metal and leather card holders.', short_description: 'Metal & leather card cases', base_price: 199, min_quantity: 10, max_quantity: 5000, materials: [{ name: 'Metal', price_modifier: 0 }, { name: 'Leatherite', price_modifier: -30 }, { name: 'Leather', price_modifier: 50 }], finishes: [{ name: 'Brushed Steel', price_modifier: 0 }, { name: 'Matte Black', price_modifier: 20 }, { name: 'Gold', price_modifier: 40 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Premium Metal', 'Capacity': '15-20 Cards' }, is_active: true, created_at: '' },
  // Transparent Cards
  { id: '17', category_id: '1', name: 'Transparent Business Cards', slug: 'transparent-business-cards', description: 'Clear plastic business cards.', short_description: 'Clear PVC cards', base_price: 799, min_quantity: 100, max_quantity: 5000, materials: [{ name: 'Clear PVC', price_modifier: 0 }, { name: 'Frosted PVC', price_modifier: 30 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 20 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Clear PVC', 'Print': 'Full Color UV' }, is_active: true, created_at: '' },
  // Polo T-Shirts
  { id: '18', category_id: '11', name: 'Custom Polo T-Shirts', slug: 'polo-tshirts', description: 'Premium polo shirts with custom print.', short_description: 'Cotton pique polos', base_price: 499, min_quantity: 20, max_quantity: 5000, materials: [{ name: 'Cotton Pique', price_modifier: 0 }, { name: 'Dry-Fit', price_modifier: 30 }], finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'Embroidery', price_modifier: 50 }], sizes: [{ name: 'S', width: 0, height: 0, price_modifier: 0 }, { name: 'M', width: 0, height: 0, price_modifier: 0 }, { name: 'L', width: 0, height: 0, price_modifier: 0 }, { name: 'XL', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1625910513413-5fc42fba866a?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Cotton Pique', 'Print': 'Screen / Embroidery' }, is_active: true, created_at: '' },
  // Caps
  { id: '19', category_id: '11', name: 'Custom Caps & Headwear', slug: 'custom-caps', description: 'Custom embroidered caps and beanies.', short_description: 'Embroidered caps', base_price: 199, min_quantity: 20, max_quantity: 5000, materials: [{ name: 'Cotton', price_modifier: 0 }, { name: 'Polyester', price_modifier: -10 }], finishes: [{ name: 'Embroidery', price_modifier: 0 }, { name: 'Screen Print', price_modifier: -10 }], sizes: [{ name: 'S/M', width: 0, height: 0, price_modifier: 0 }, { name: 'L/XL', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Cotton', 'Print': 'Embroidery' }, is_active: true, created_at: '' },
  // Hoodies
  { id: '20', category_id: '11', name: 'Custom Hoodies & Sweatshirts', slug: 'custom-hoodies', description: 'Printed hoodies and sweatshirts.', short_description: 'Cotton fleece hoodies', base_price: 699, min_quantity: 10, max_quantity: 2000, materials: [{ name: 'Cotton Fleece', price_modifier: 0 }, { name: 'French Terry', price_modifier: 30 }], finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'DTG Print', price_modifier: 30 }], sizes: [{ name: 'S', width: 0, height: 0, price_modifier: 0 }, { name: 'M', width: 0, height: 0, price_modifier: 0 }, { name: 'L', width: 0, height: 0, price_modifier: 0 }, { name: 'XL', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Cotton Fleece', 'Weight': '320 GSM' }, is_active: true, created_at: '' },
  // Notebooks
  { id: '21', category_id: '9', name: 'Custom Notebooks & Diaries', slug: 'custom-notebooks', description: 'Personalized notebooks and diaries.', short_description: 'Custom cover notebooks', base_price: 149, min_quantity: 20, max_quantity: 5000, materials: [{ name: 'Paper', price_modifier: 0 }, { name: 'Leather', price_modifier: 100 }], finishes: [{ name: 'Softcover', price_modifier: 0 }, { name: 'Hardcover', price_modifier: 50 }], sizes: [{ name: 'A5', width: 148, height: 210, price_modifier: 0 }, { name: 'A4', width: 210, height: 297, price_modifier: 40 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '80gsm', 'Cover': 'Softcover / Hardcover' }, is_active: true, created_at: '' },
  // Wedding Invitations
  { id: '22', category_id: '9', name: 'Wedding Invitations', slug: 'wedding-invitations', description: 'Custom wedding invitations and stationery.', short_description: 'Foil & embossed invites', base_price: 999, min_quantity: 50, max_quantity: 5000, materials: [{ name: '300gsm Card', price_modifier: 0 }, { name: 'Cotton Paper', price_modifier: 50 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Gold Foil', price_modifier: 100 }], sizes: [{ name: 'A6', width: 105, height: 148, price_modifier: 0 }, { name: '5x7 inch', width: 127, height: 178, price_modifier: 20 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '300gsm Premium', 'Print': 'Full Color + Foil' }, is_active: true, created_at: '' },
  // Presentation Folders
  { id: '23', category_id: '9', name: 'Presentation Folders', slug: 'presentation-folders', description: 'Custom pocket folders.', short_description: 'Pocket folders with print', base_price: 399, min_quantity: 50, max_quantity: 10000, materials: [{ name: '300gsm Card', price_modifier: 0 }, { name: '350gsm Card', price_modifier: 20 }], finishes: [{ name: 'Matte Lamination', price_modifier: 0 }, { name: 'Glossy Lamination', price_modifier: 15 }], sizes: [{ name: 'A4', width: 240, height: 320, price_modifier: 0 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '300gsm Card', 'Pockets': 'Single / Double' }, is_active: true, created_at: '' },
  // Stamps
  { id: '24', category_id: '9', name: 'Custom Stamps & Ink', slug: 'custom-stamps', description: 'Self-inking stamps and rubber stamps.', short_description: 'Self-inking stamps', base_price: 249, min_quantity: 1, max_quantity: 500, materials: [{ name: 'Rubber', price_modifier: 0 }, { name: 'Polymer', price_modifier: 20 }], finishes: [{ name: 'Self-Inking', price_modifier: 0 }, { name: 'Wood Handle', price_modifier: -30 }], sizes: [{ name: 'Small', width: 38, height: 14, price_modifier: 0 }, { name: 'Medium', width: 47, height: 18, price_modifier: 20 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Premium Rubber', 'Ink': 'Black / Blue / Red' }, is_active: true, created_at: '' },
  // Standees
  { id: '25', category_id: '5', name: 'Standees & Display Boards', slug: 'standees', description: 'Portable standees and display boards.', short_description: 'Roll-up & X-banner standees', base_price: 799, min_quantity: 1, max_quantity: 100, materials: [{ name: 'Vinyl', price_modifier: 0 }, { name: 'Fabric', price_modifier: 50 }], finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'With Stand', price_modifier: 200 }], sizes: [{ name: 'Counter', width: 152, height: 305, price_modifier: 0 }, { name: 'Medium', width: 610, height: 1600, price_modifier: 400 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Premium Vinyl', 'Stand': 'Roll-Up / X-Frame' }, is_active: true, created_at: '' },
  // Foam Boards
  { id: '26', category_id: '5', name: 'Foam Board Printing', slug: 'foam-boards', description: 'Lightweight foam board signs.', short_description: '5mm/10mm foam board', base_price: 499, min_quantity: 1, max_quantity: 100, materials: [{ name: '5mm Foam', price_modifier: 0 }, { name: '10mm Foam', price_modifier: 100 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 20 }], sizes: [{ name: 'A3', width: 297, height: 420, price_modifier: 0 }, { name: 'A2', width: 420, height: 594, price_modifier: 200 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Foam Board', 'Print': 'Full Color UV' }, is_active: true, created_at: '' },
  // Tent Cards
  { id: '27', category_id: '5', name: 'Tent Cards & Table Signs', slug: 'tent-cards', description: 'Tri-fold tent cards.', short_description: 'Table tent cards', base_price: 199, min_quantity: 25, max_quantity: 5000, materials: [{ name: '300gsm Card', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 10 }], sizes: [{ name: 'A6 Tent', width: 105, height: 148, price_modifier: 0 }, { name: 'A5 Tent', width: 148, height: 210, price_modifier: 30 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '300gsm Cardstock', 'Fold': 'Tri-Fold Tent' }, is_active: true, created_at: '' },
  // Loyalty Cards
  { id: '28', category_id: '1', name: 'Loyalty Cards', slug: 'loyalty-cards', description: 'Custom loyalty and membership cards.', short_description: 'Loyalty & membership cards', base_price: 499, min_quantity: 100, max_quantity: 10000, materials: [{ name: '350gsm Card', price_modifier: 0 }, { name: 'PVC', price_modifier: 50 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }, { name: 'Mini', width: 70, height: 28, price_modifier: -20 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '350gsm / PVC', 'Feature': 'Barcode / QR Code' }, is_active: true, created_at: '' },
  // Gift Certificates
  { id: '29', category_id: '2', name: 'Gift Certificates & Vouchers', slug: 'gift-certificates', description: 'Custom gift certificates.', short_description: 'Gift vouchers & certificates', base_price: 399, min_quantity: 50, max_quantity: 10000, materials: [{ name: '300gsm Card', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Gold Foil', price_modifier: 80 }], sizes: [{ name: 'A6', width: 105, height: 148, price_modifier: 0 }, { name: 'DL', width: 99, height: 210, price_modifier: 10 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '300gsm Card', 'Print': 'Full Color + Foil' }, is_active: true, created_at: '' },
  // Button Badges
  { id: '30', category_id: '2', name: 'Button Badges & Pins', slug: 'button-badges', description: 'Custom button badges.', short_description: 'Pin-back badges', base_price: 49, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'Metal + Paper', price_modifier: 0 }], finishes: [{ name: 'Standard', price_modifier: 0 }], sizes: [{ name: '1 inch', width: 25, height: 25, price_modifier: 0 }, { name: '2 inch', width: 50, height: 50, price_modifier: 20 }, { name: '3 inch', width: 75, height: 75, price_modifier: 40 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Metal + Paper', 'Back': 'Pin-Back' }, is_active: true, created_at: '' },
  // Keychains
  { id: '31', category_id: '2', name: 'Custom Keychains', slug: 'custom-keychains', description: 'Printed and engraved keychains.', short_description: 'Acrylic & metal keychains', base_price: 79, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'Acrylic', price_modifier: 0 }, { name: 'Metal', price_modifier: 30 }], finishes: [{ name: 'Print', price_modifier: 0 }, { name: 'Engraved', price_modifier: 20 }], sizes: [{ name: 'Standard', width: 50, height: 50, price_modifier: 0 }, { name: 'Large', width: 75, height: 75, price_modifier: 20 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Acrylic / Metal', 'Print': 'Full Color / Engraved' }, is_active: true, created_at: '' },
  // Table Covers
  { id: '32', category_id: '5', name: 'Custom Table Covers', slug: 'table-covers', description: 'Printed tablecloths and runners.', short_description: 'Event table covers', base_price: 999, min_quantity: 1, max_quantity: 100, materials: [{ name: 'Polyester', price_modifier: 0 }, { name: 'Cotton', price_modifier: 50 }], finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'Fitted', price_modifier: 100 }], sizes: [{ name: '6ft Table', width: 183, height: 122, price_modifier: 0 }, { name: '8ft Table', width: 244, height: 122, price_modifier: 200 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Polyester', 'Print': 'Dye Sublimation' }, is_active: true, created_at: '' },
  // Flags
  { id: '33', category_id: '5', name: 'Custom Flags & Banners', slug: 'custom-flags', description: 'Teardrop and rectangular flags.', short_description: 'Event & table flags', base_price: 499, min_quantity: 1, max_quantity: 100, materials: [{ name: 'Polyester', price_modifier: 0 }], finishes: [{ name: 'With Pole', price_modifier: 0 }, { name: 'With Stand', price_modifier: 300 }], sizes: [{ name: 'Table Flag', width: 150, height: 200, price_modifier: 0 }, { name: 'Teardrop', width: 600, height: 1200, price_modifier: 300 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Polyester', 'Print': 'Dye Sublimation' }, is_active: true, created_at: '' },
  // Tote Bags
  { id: '34', category_id: '8', name: 'Custom Tote Bags', slug: 'custom-tote-bags', description: 'Printed cotton and canvas tote bags.', short_description: 'Cotton & canvas totes', base_price: 149, min_quantity: 20, max_quantity: 5000, materials: [{ name: 'Cotton', price_modifier: 0 }, { name: 'Canvas', price_modifier: 30 }], finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'Sublimation', price_modifier: 20 }], sizes: [{ name: 'Standard', width: 350, height: 400, price_modifier: 0 }, { name: 'Large', width: 450, height: 500, price_modifier: 30 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Cotton / Canvas', 'Print': 'Screen / Sublimation' }, is_active: true, created_at: '' },
  // Umbrellas
  { id: '35', category_id: '15', name: 'Custom Umbrellas', slug: 'custom-umbrellas', description: 'Printed umbrellas for branding.', short_description: 'Compact & golf umbrellas', base_price: 599, min_quantity: 10, max_quantity: 1000, materials: [{ name: 'Polyester', price_modifier: 0 }, { name: 'Nylon', price_modifier: -30 }], finishes: [{ name: 'Single Side Print', price_modifier: 0 }, { name: 'Double Side Print', price_modifier: 100 }], sizes: [{ name: 'Compact', width: 0, height: 0, price_modifier: 0 }, { name: 'Golf', width: 0, height: 0, price_modifier: 200 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1521656693884-cee73588d390?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Polyester', 'Style': 'Compact / Golf' }, is_active: true, created_at: '' },
  // Photo Albums
  { id: '36', category_id: '12', name: 'Custom Photo Albums', slug: 'photo-albums', description: 'Personalized photo albums.', short_description: 'Hardcover & layflat albums', base_price: 599, min_quantity: 1, max_quantity: 500, materials: [{ name: 'Paper Pages', price_modifier: 0 }, { name: 'Layflat', price_modifier: 100 }], finishes: [{ name: 'Softcover', price_modifier: 0 }, { name: 'Hardcover', price_modifier: 100 }, { name: 'Layflat', price_modifier: 200 }], sizes: [{ name: 'A5', width: 200, height: 150, price_modifier: 0 }, { name: 'A4', width: 300, height: 200, price_modifier: 150 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Pages': '20-100 pages', 'Cover': 'Hardcover / Softcover' }, is_active: true, created_at: '' },
  // Photo Frames
  { id: '37', category_id: '12', name: 'Custom Photo Frames', slug: 'photo-frames', description: 'LED and acrylic photo frames.', short_description: 'LED & acrylic frames', base_price: 499, min_quantity: 1, max_quantity: 200, materials: [{ name: 'Acrylic', price_modifier: 0 }, { name: 'Wood', price_modifier: 50 }, { name: 'LED Acrylic', price_modifier: 100 }], finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'With LED', price_modifier: 150 }], sizes: [{ name: '4x6 inch', width: 102, height: 152, price_modifier: 0 }, { name: '5x7 inch', width: 127, height: 178, price_modifier: 30 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Acrylic / Wood / LED', 'Print': 'Photo Print' }, is_active: true, created_at: '' },
  // Coasters
  { id: '38', category_id: '12', name: 'Custom Coasters', slug: 'custom-coasters', description: 'Printed coasters in various materials.', short_description: 'Cork, acrylic & ceramic', base_price: 99, min_quantity: 25, max_quantity: 5000, materials: [{ name: 'Cork', price_modifier: 0 }, { name: 'Acrylic', price_modifier: 20 }, { name: 'Ceramic', price_modifier: 30 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 10 }], sizes: [{ name: 'Round 3.5"', width: 89, height: 89, price_modifier: 0 }, { name: 'Square 3.5"', width: 89, height: 89, price_modifier: 0 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Cork / Acrylic / Ceramic', 'Print': 'Full Color' }, is_active: true, created_at: '' },
  // Pens
  { id: '39', category_id: '12', name: 'Custom Pens', slug: 'custom-pens', description: 'Printed and engraved pens.', short_description: 'Ballpoint & rollerball pens', base_price: 29, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'Plastic', price_modifier: 0 }, { name: 'Metal', price_modifier: 30 }, { name: 'Wood', price_modifier: 20 }], finishes: [{ name: 'Print', price_modifier: 0 }, { name: 'Engraved', price_modifier: 15 }], sizes: [{ name: 'Standard', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Plastic / Metal / Wood', 'Print': 'Logo Print / Engraved' }, is_active: true, created_at: '' },
  // Calendars
  { id: '40', category_id: '12', name: 'Custom Calendars', slug: 'custom-calendars', description: 'Desk, wall, and magnet calendars.', short_description: 'Desk & wall calendars', base_price: 199, min_quantity: 25, max_quantity: 5000, materials: [{ name: 'Paper', price_modifier: 0 }, { name: 'Magnet', price_modifier: 20 }], finishes: [{ name: 'Saddle Stitch', price_modifier: 0 }, { name: 'Wire Bound', price_modifier: 20 }], sizes: [{ name: 'Desk A5', width: 148, height: 210, price_modifier: 0 }, { name: 'Wall A4', width: 210, height: 297, price_modifier: 40 }], customizable: true, template_available: true, image_urls: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Paper': '250gsm Art Paper', 'Type': 'Desk / Wall / Magnet' }, is_active: true, created_at: '' },
  // Water Bottles
  { id: '41', category_id: '12', name: 'Custom Water Bottles', slug: 'water-bottles', description: 'Printed stainless steel bottles.', short_description: 'Steel & plastic bottles', base_price: 299, min_quantity: 20, max_quantity: 2000, materials: [{ name: 'Stainless Steel', price_modifier: 0 }, { name: 'Aluminum', price_modifier: -30 }], finishes: [{ name: 'Print', price_modifier: 0 }, { name: 'Engraved', price_modifier: 30 }], sizes: [{ name: '500ml', width: 0, height: 0, price_modifier: 0 }, { name: '750ml', width: 0, height: 0, price_modifier: 30 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Stainless Steel', 'Capacity': '500ml / 750ml' }, is_active: true, created_at: '' },
  // Tumblers
  { id: '42', category_id: '12', name: 'Custom Tumblers', slug: 'custom-tumblers', description: 'Printed travel tumblers.', short_description: 'Insulated tumblers', base_price: 399, min_quantity: 10, max_quantity: 2000, materials: [{ name: 'Stainless Steel', price_modifier: 0 }], finishes: [{ name: 'Sublimation', price_modifier: 0 }, { name: 'Screen Print', price_modifier: -20 }], sizes: [{ name: '12oz', width: 0, height: 0, price_modifier: 0 }, { name: '16oz', width: 0, height: 0, price_modifier: 30 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Stainless Steel', 'Capacity': '12oz / 16oz' }, is_active: true, created_at: '' },
  // Travel Mugs
  { id: '43', category_id: '12', name: 'Custom Travel Mugs', slug: 'travel-mugs', description: 'Insulated travel mugs.', short_description: 'Double-wall insulated', base_price: 449, min_quantity: 10, max_quantity: 2000, materials: [{ name: 'Stainless Steel', price_modifier: 0 }], finishes: [{ name: 'Print', price_modifier: 0 }, { name: 'Engraved', price_modifier: 40 }], sizes: [{ name: '12oz', width: 0, height: 0, price_modifier: 0 }, { name: '16oz', width: 0, height: 0, price_modifier: 40 }], customizable: true, template_available: false, image_urls: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=450&fit=crop'], gallery_urls: [], specs: { 'Material': 'Stainless Steel', 'Insulated': 'Double Wall' }, is_active: true, created_at: '' },
];

function getProductCategorySlug(product: Product): string {
  return CATEGORY_ID_MAP[product.category_id] || '';
}

function getRelatedCategories(currentSlug: string) {
  const cat = PRODUCT_CATEGORIES.find((c) => c.slug === currentSlug);
  if (!cat) return PRODUCT_CATEGORIES.slice(0, 6);
  const currentIdx = PRODUCT_CATEGORIES.indexOf(cat);
  const related: typeof PRODUCT_CATEGORIES = [];
  for (let i = 1; related.length < 6; i++) {
    const idx = (currentIdx + i) % PRODUCT_CATEGORIES.length;
    related.push(PRODUCT_CATEGORIES[idx]);
  }
  return related;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [showSort, setShowSort] = useState(false);

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    if (selectedCategory && getProductCategorySlug(p) !== selectedCategory) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.base_price - b.base_price;
      case 'price-high': return b.base_price - a.base_price;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const currentCat = selectedCategory
    ? PRODUCT_CATEGORIES.find((c) => c.slug === selectedCategory)
    : null;

  const relatedCategories = getRelatedCategories(selectedCategory);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <Container>
          <nav className="flex items-center gap-2 py-3 text-xs text-gray-500">
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-800 font-medium">
              {currentCat ? currentCat.name : 'All Products'}
            </span>
          </nav>
        </Container>
      </div>

      {/* Category Header */}
      <div className="bg-white border-b border-gray-100">
        <Container>
          <div className="py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {currentCat ? currentCat.name : 'All Products'}
            </h1>
            <p className="text-sm text-gray-500">
              {currentCat
                ? currentCat.description
                : 'Browse our complete range of premium printing products. Customize and order online.'}
            </p>
          </div>
        </Container>
      </div>

      {/* Category Tabs + Search + Sort */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <Container>
          <div className="flex items-center gap-4 py-3">
            {/* Category Tabs */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    !selectedCategory
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {PRODUCT_CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.slug] || Package;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search */}
            <div className="relative shrink-0 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs placeholder:text-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20 w-56 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-[var(--color-primary)] transition-colors"
              >
                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showSort && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 min-w-[160px]">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                          sortBy === opt.value
                            ? 'bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Active Filters */}
      {(selectedCategory || search) && (
        <div className="bg-white border-b border-gray-100">
          <Container>
            <div className="flex items-center gap-2 py-2.5">
              <span className="text-xs text-gray-500">Active:</span>
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--color-primary)]/5 text-[var(--color-primary)] text-xs font-medium rounded-full">
                  {PRODUCT_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  &ldquo;{search}&rdquo;
                  <button onClick={() => setSearch('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={() => { setSelectedCategory(''); setSearch(''); }}
                className="text-xs text-gray-400 hover:text-gray-600 ml-1"
              >
                Clear all
              </button>
            </div>
          </Container>
        </div>
      )}

      {/* Products Grid */}
      <Container>
        <div className="py-6">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
              {currentCat && <> in <span className="font-medium text-gray-700">{currentCat.name}</span></>}
            </p>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="clean-card group overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                    <img
                      src={product.image_urls[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Badges */}
                    {POPULAR_PRODUCTS.includes(product.id) && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-[var(--color-primary)] text-white text-[10px] font-semibold rounded">
                        Popular
                      </span>
                    )}
                    {BEST_SELLER_PRODUCTS.includes(product.id) && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-semibold rounded">
                        Best Seller
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <p className="text-[10px] font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-0.5">
                      PrintStop
                    </p>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      for {product.min_quantity.toLocaleString()} pieces
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-900">
                        &#8377;{product.base_price.toLocaleString()}
                      </p>
                      <span className="text-xs font-medium text-[var(--color-primary)] group-hover:underline">
                        Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-sm text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => { setSelectedCategory(''); setSearch(''); }}
                className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </Container>

      {/* You Might Also Like */}
      {sortedProducts.length > 0 && (
        <div className="bg-white border-t border-gray-100">
          <Container>
            <div className="py-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">You might also like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {relatedCategories.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.slug] || Package;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      className="clean-card p-4 text-center group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/5 flex items-center justify-center mx-auto mb-2 group-hover:bg-[var(--color-primary)]/10 transition-colors">
                        <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                      </div>
                      <h3 className="text-xs font-semibold text-gray-900 mb-0.5">{cat.name}</h3>
                      <p className="text-[10px] text-gray-500">{cat.count}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
