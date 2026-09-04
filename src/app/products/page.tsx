'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown, ChevronRight, Share2, Heart, Star, Truck, ShoppingBag, Palette, Tag,
  CreditCard, FileText, Image as ImageIcon, Package, Shirt, Coffee, PenLine, Mail,
  BookOpen, Flag, Crown, Award, Cloud, Umbrella, Calendar, Battery, Usb, Search,
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import type { Product } from '@/types';

function GiftIcon({ className, size, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>> = {
  'gift-hampers': GiftIcon,
  'visiting-cards': CreditCard,
  'id-cards': CreditCard,
  'stationery': PenLine,
  'pens': PenLine,
  'letterheads': FileText,
  'envelopes': Mail,
  'diaries-notebooks': BookOpen,
  'calendars': Calendar,
  'apparel': Shirt,
  't-shirts': Shirt,
  'polo-t-shirts': Shirt,
  'jackets-hoodies': Shirt,
  'flyers': FileText,
  'brochures': BookOpen,
  'posters': ImageIcon,
  'banners': Flag,
  'stickers': Tag,
  'labels': Tag,
  'custom-boxes': Package,
  'corporate-gifts': Crown,
  'drinkware': Coffee,
  'water-bottles': Coffee,
  'mugs': Coffee,
  'awards': Award,
  'trophies': Award,
  'bags': ShoppingBag,
  'tote-bags': ShoppingBag,
  'backpacks': ShoppingBag,
  'gadgets': Battery,
  'power-banks': Battery,
  'usb-drives': Usb,
  'umbrellas': Umbrella,
  'raincoats': Cloud,
};

const SORT_OPTIONS = [
  { value: 'bestselling', label: 'Best Selling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
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

const ALL_PRODUCTS: Product[] = [
  { id: '1', category_id: '1', name: 'Standard Business Cards', slug: 'standard-business-cards', description: 'Classic business cards printed on 300gsm cardstock.', short_description: '300gsm classic cards', base_price: 299, min_quantity: 100, max_quantity: 50000, materials: [{ name: '300gsm', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '2', category_id: '1', name: 'Premium Matte Business Cards', slug: 'premium-matte-business-cards', description: 'Thick 400gsm matte cards.', short_description: '400gsm premium matte', base_price: 499, min_quantity: 100, max_quantity: 10000, materials: [{ name: '400gsm', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '3', category_id: '1', name: 'Metallic Foil Business Cards', slug: 'metallic-foil-business-cards', description: 'Metallic foil stamping on premium cardstock.', short_description: 'Foil stamped cards', base_price: 899, min_quantity: 100, max_quantity: 5000, materials: [{ name: '400gsm', price_modifier: 0 }], finishes: [{ name: 'Gold Foil', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '4', category_id: '1', name: 'Luxury Velvet Business Cards', slug: 'luxury-business-cards', description: 'Velvet lamination with foil accents.', short_description: 'Velvet luxury cards', base_price: 1299, min_quantity: 100, max_quantity: 2000, materials: [{ name: '500gsm', price_modifier: 0 }], finishes: [{ name: 'Velvet Black', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '5', category_id: '1', name: 'Magnet Business Cards', slug: 'magnet-business-cards', description: 'Magnetic backing cards.', short_description: 'Magnetic cards', base_price: 799, min_quantity: 100, max_quantity: 5000, materials: [{ name: 'Magnetic', price_modifier: 0 }], finishes: [{ name: 'Glossy', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '6', category_id: '2', name: 'A5 Double-Sided Flyers', slug: 'a5-flyers', description: 'Vibrant A5 flyers.', short_description: '170gsm art paper', base_price: 299, min_quantity: 100, max_quantity: 50000, materials: [{ name: '170gsm Art', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: 'A5', width: 148, height: 210, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '7', category_id: '2', name: 'A4 Double-Sided Flyers', slug: 'a4-flyers', description: 'Large format A4 flyers.', short_description: 'A4 full color', base_price: 499, min_quantity: 100, max_quantity: 50000, materials: [{ name: '170gsm Art', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '8', category_id: '3', name: 'Tri-Fold Brochures', slug: 'tri-fold-brochures', description: 'Popular tri-fold format.', short_description: 'A4 tri-fold', base_price: 599, min_quantity: 50, max_quantity: 10000, materials: [{ name: '170gsm Art', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '9', category_id: '3', name: 'Bi-Fold Brochures', slug: 'bi-fold-brochures', description: 'Professional bi-fold brochures.', short_description: 'A4 bi-fold', base_price: 499, min_quantity: 50, max_quantity: 10000, materials: [{ name: '170gsm Art', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '10', category_id: '5', name: 'Vinyl Banner 3x6ft', slug: 'vinyl-banners', description: 'Durable vinyl banner.', short_description: 'Weather-resistant vinyl', base_price: 599, min_quantity: 1, max_quantity: 100, materials: [{ name: '13oz Vinyl', price_modifier: 0 }], finishes: [{ name: 'Standard', price_modifier: 0 }], sizes: [{ name: '3x6 ft', width: 914, height: 1829, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '11', category_id: '7', name: 'Die-Cut Vinyl Stickers', slug: 'die-cut-stickers', description: 'Custom die-cut stickers.', short_description: 'Waterproof vinyl', base_price: 199, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'White Vinyl', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: '2 inch', width: 50, height: 50, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '12', category_id: '8', name: 'Custom Mailer Boxes', slug: 'mailer-boxes', description: 'Branded corrugated mailer boxes.', short_description: 'Corrugated packaging', base_price: 149, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'E-Flute', price_modifier: 0 }], finishes: [{ name: 'Kraft', price_modifier: 0 }], sizes: [{ name: 'Small', width: 150, height: 100, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '13', category_id: '11', name: 'Custom Cotton T-Shirts', slug: 'cotton-tshirts', description: '100% cotton t-shirts.', short_description: '100% cotton, custom print', base_price: 399, min_quantity: 20, max_quantity: 5000, materials: [{ name: '100% Cotton', price_modifier: 0 }], finishes: [{ name: 'Screen Print', price_modifier: 0 }], sizes: [{ name: 'M', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '14', category_id: '12', name: 'Custom Ceramic Mugs', slug: 'ceramic-mugs', description: 'Classic ceramic mugs.', short_description: '11oz ceramic', base_price: 299, min_quantity: 10, max_quantity: 5000, materials: [{ name: 'Ceramic', price_modifier: 0 }], finishes: [{ name: 'Standard Print', price_modifier: 0 }], sizes: [{ name: '11oz', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '15', category_id: '9', name: 'A4 Corporate Letterheads', slug: 'a4-letterheads', description: 'Professional letterheads.', short_description: '120gsm premium paper', base_price: 399, min_quantity: 100, max_quantity: 10000, materials: [{ name: '120gsm', price_modifier: 0 }], finishes: [{ name: 'Uncoated', price_modifier: 0 }], sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '16', category_id: '11', name: 'Custom Polo T-Shirts', slug: 'polo-tshirts', description: 'Premium polo shirts.', short_description: 'Cotton pique polos', base_price: 499, min_quantity: 20, max_quantity: 5000, materials: [{ name: 'Cotton Pique', price_modifier: 0 }], finishes: [{ name: 'Screen Print', price_modifier: 0 }], sizes: [{ name: 'M', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '17', category_id: '11', name: 'Custom Caps & Headwear', slug: 'custom-caps', description: 'Custom embroidered caps.', short_description: 'Embroidered caps', base_price: 199, min_quantity: 20, max_quantity: 5000, materials: [{ name: 'Cotton', price_modifier: 0 }], finishes: [{ name: 'Embroidery', price_modifier: 0 }], sizes: [{ name: 'One Size', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '18', category_id: '11', name: 'Custom Hoodies', slug: 'custom-hoodies', description: 'Printed hoodies.', short_description: 'Cotton fleece hoodies', base_price: 699, min_quantity: 10, max_quantity: 2000, materials: [{ name: 'Cotton Fleece', price_modifier: 0 }], finishes: [{ name: 'Screen Print', price_modifier: 0 }], sizes: [{ name: 'M', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '19', category_id: '12', name: 'Custom Water Bottles', slug: 'water-bottles', description: 'Printed steel bottles.', short_description: 'Steel & plastic bottles', base_price: 299, min_quantity: 20, max_quantity: 2000, materials: [{ name: 'Stainless Steel', price_modifier: 0 }], finishes: [{ name: 'Print', price_modifier: 0 }], sizes: [{ name: '500ml', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '20', category_id: '12', name: 'Custom Tumblers', slug: 'custom-tumblers', description: 'Printed travel tumblers.', short_description: 'Insulated tumblers', base_price: 399, min_quantity: 10, max_quantity: 2000, materials: [{ name: 'Stainless Steel', price_modifier: 0 }], finishes: [{ name: 'Sublimation', price_modifier: 0 }], sizes: [{ name: '12oz', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '21', category_id: '15', name: 'Custom Umbrellas', slug: 'custom-umbrellas', description: 'Printed umbrellas.', short_description: 'Compact & golf umbrellas', base_price: 599, min_quantity: 10, max_quantity: 1000, materials: [{ name: 'Polyester', price_modifier: 0 }], finishes: [{ name: 'Single Side Print', price_modifier: 0 }], sizes: [{ name: 'Compact', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '22', category_id: '8', name: 'Custom Tote Bags', slug: 'custom-tote-bags', description: 'Printed cotton tote bags.', short_description: 'Cotton & canvas totes', base_price: 149, min_quantity: 20, max_quantity: 5000, materials: [{ name: 'Cotton', price_modifier: 0 }], finishes: [{ name: 'Screen Print', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 350, height: 400, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '23', category_id: '12', name: 'Custom Pens', slug: 'custom-pens', description: 'Printed and engraved pens.', short_description: 'Ballpoint pens', base_price: 29, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'Plastic', price_modifier: 0 }], finishes: [{ name: 'Print', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '24', category_id: '12', name: 'Custom Calendars', slug: 'custom-calendars', description: 'Desk and wall calendars.', short_description: 'Desk & wall calendars', base_price: 199, min_quantity: 25, max_quantity: 5000, materials: [{ name: 'Paper', price_modifier: 0 }], finishes: [{ name: 'Saddle Stitch', price_modifier: 0 }], sizes: [{ name: 'Desk A5', width: 148, height: 210, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '25', category_id: '12', name: 'Custom Notebooks', slug: 'custom-notebooks', description: 'Personalised notebooks.', short_description: 'Custom cover notebooks', base_price: 149, min_quantity: 20, max_quantity: 5000, materials: [{ name: 'Paper', price_modifier: 0 }], finishes: [{ name: 'Softcover', price_modifier: 0 }], sizes: [{ name: 'A5', width: 148, height: 210, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '26', category_id: '12', name: 'Custom Trophies', slug: 'custom-trophies', description: 'Custom trophies and awards.', short_description: 'Crystal & wooden trophies', base_price: 499, min_quantity: 1, max_quantity: 200, materials: [{ name: 'Crystal', price_modifier: 0 }], finishes: [{ name: 'Engraved', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 0, height: 0, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '27', category_id: '12', name: 'Custom Keychains', slug: 'custom-keychains', description: 'Printed keychains.', short_description: 'Acrylic & metal keychains', base_price: 79, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'Acrylic', price_modifier: 0 }], finishes: [{ name: 'Print', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 50, height: 50, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '28', category_id: '12', name: 'Custom Coasters', slug: 'custom-coasters', description: 'Printed coasters.', short_description: 'Cork, acrylic & ceramic', base_price: 99, min_quantity: 25, max_quantity: 5000, materials: [{ name: 'Cork', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: 'Round 3.5"', width: 89, height: 89, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '29', category_id: '1', name: 'Loyalty Cards', slug: 'loyalty-cards', description: 'Custom loyalty cards.', short_description: 'Loyalty & membership cards', base_price: 499, min_quantity: 100, max_quantity: 10000, materials: [{ name: '350gsm Card', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '30', category_id: '1', name: 'Transparent Business Cards', slug: 'transparent-business-cards', description: 'Clear plastic cards.', short_description: 'Clear PVC cards', base_price: 799, min_quantity: 100, max_quantity: 5000, materials: [{ name: 'Clear PVC', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '31', category_id: '5', name: 'Standees & Display Boards', slug: 'standees', description: 'Portable standees.', short_description: 'Roll-up & X-banner', base_price: 799, min_quantity: 1, max_quantity: 100, materials: [{ name: 'Vinyl', price_modifier: 0 }], finishes: [{ name: 'Standard', price_modifier: 0 }], sizes: [{ name: 'Medium', width: 610, height: 1600, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '32', category_id: '5', name: 'Foam Board Printing', slug: 'foam-boards', description: 'Lightweight foam board signs.', short_description: '5mm/10mm foam board', base_price: 499, min_quantity: 1, max_quantity: 100, materials: [{ name: '5mm Foam', price_modifier: 0 }], finishes: [{ name: 'Matte', price_modifier: 0 }], sizes: [{ name: 'A3', width: 297, height: 420, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '33', category_id: '1', name: 'Visiting Card Holders', slug: 'card-holders', description: 'Premium card holders.', short_description: 'Metal & leather cases', base_price: 199, min_quantity: 10, max_quantity: 5000, materials: [{ name: 'Metal', price_modifier: 0 }], finishes: [{ name: 'Brushed Steel', price_modifier: 0 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: false, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
  { id: '34', category_id: '12', name: 'Custom Photo Albums', slug: 'photo-albums', description: 'Personalised photo albums.', short_description: 'Hardcover albums', base_price: 599, min_quantity: 1, max_quantity: 500, materials: [{ name: 'Paper Pages', price_modifier: 0 }], finishes: [{ name: 'Hardcover', price_modifier: 0 }], sizes: [{ name: 'A5', width: 200, height: 150, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [''], gallery_urls: [], specs: {}, is_active: true, created_at: '' },
];

function getProductCategorySlug(product: Product): string {
  return CATEGORY_ID_MAP[product.category_id] || '';
}

const categoryImageMap: Record<string, string> = {
  'gift-hampers': 'linear-gradient(to bottom right, #fff1f2, #fef3c7)',
  'visiting-cards': 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
  'id-cards': 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
  'pens': 'linear-gradient(to bottom right, #f0fdf4, #d1fae5)',
  'letterheads': 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
  'envelopes': 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
  'diaries-notebooks': 'linear-gradient(to bottom right, #fffbeb, #fef9c3)',
  'calendars': 'linear-gradient(to bottom right, #fffbeb, #fef9c3)',
  't-shirts': 'linear-gradient(to bottom right, #fef2f2, #fce7f3)',
  'polo-t-shirts': 'linear-gradient(to bottom right, #fef2f2, #fce7f3)',
  'jackets-hoodies': 'linear-gradient(to bottom right, #fef2f2, #fce7f3)',
  'flyers': 'linear-gradient(to bottom right, #faf5ff, #ede9fe)',
  'brochures': 'linear-gradient(to bottom right, #faf5ff, #ede9fe)',
  'posters': 'linear-gradient(to bottom right, #fff7ed, #fef3c7)',
  'banners': 'linear-gradient(to bottom right, #fff7ed, #fef3c7)',
  'stickers': 'linear-gradient(to bottom right, #f0fdfa, #cffafe)',
  'labels': 'linear-gradient(to bottom right, #f0fdfa, #cffafe)',
  'custom-boxes': 'linear-gradient(to bottom right, #fff7ed, #fef3c7)',
  'mugs': 'linear-gradient(to bottom right, #f0f9ff, #dbeafe)',
  'water-bottles': 'linear-gradient(to bottom right, #f0f9ff, #dbeafe)',
  'tote-bags': 'linear-gradient(to bottom right, #f7fee7, #dcfce7)',
  'trophies': 'linear-gradient(to bottom right, #fefce8, #fef3c7)',
  'keychains': 'linear-gradient(to bottom right, #fdf2f8, #fff1f2)',
  'coasters': 'linear-gradient(to bottom right, #fafaf9, #f5f5f4)',
  'photo-albums': 'linear-gradient(to bottom right, #f5f3ff, #ede9fe)',
};

const SIDEBAR_CATEGORIES = [
  { name: 'Visiting Cards & ID Cards', slug: 'visiting-cards', subcategories: ['Visiting Cards', 'ID Cards', 'Visiting Card Holders'] },
  { name: 'Stationery & Office Supplies', slug: 'stationery', subcategories: ['Pens', 'Letterheads', 'Envelopes', 'Diaries & Notebooks', 'Calendars'] },
  { name: 'Apparel', slug: 'apparel', subcategories: ['T-Shirts', 'Polo T-Shirts', 'Jackets & Hoodies'] },
  { name: 'Corporate Gifts', slug: 'corporate-gifts', subcategories: ['Gift Hampers', 'Custom Keychains', 'Custom Coasters'] },
  { name: 'Marketing & Promotions', slug: 'marketing', subcategories: ['Flyers', 'Brochures', 'Posters', 'Banners'] },
  { name: 'Labels, Stickers & Packaging', slug: 'labels-packaging', subcategories: ['Stickers', 'Labels', 'Custom Boxes'] },
  { name: 'Drinkware & Lunchboxes', slug: 'drinkware', subcategories: ['Mugs', 'Water Bottles', 'Tumblers'] },
  { name: 'Awards & Trophies', slug: 'awards', subcategories: ['Trophies'] },
  { name: 'Bags', slug: 'bags', subcategories: ['Tote Bags'] },
  { name: 'Gadgets & Accessories', slug: 'gadgets', subcategories: ['USB Drives', 'Power Banks'] },
  { name: 'Umbrellas & Raincoats', slug: 'umbrellas', subcategories: ['Umbrellas', 'Raincoats'] },
];

const SUBCATEGORY_TABS = [
  'Gift Hampers', 'Visiting Cards & ID Cards', 'Stationery & Office Supplies', 'Apparel',
  'Corporate Gifts', 'Marketing & Promotions', 'Labels, Stickers & Packaging', 'Drinkware & Lunchboxes',
  'Awards & Trophies', 'Bags', 'Gadgets & Accessories', 'Umbrellas & Raincoats',
];

const HOW_IT_WORKS_STEPS = [
  { icon: Palette, title: 'Customise', description: 'Choose your product and personalise it with your design, logo, or artwork.' },
  { icon: ShoppingBag, title: 'Add to Cart', description: 'Select quantity, review your order, and add it to your cart.' },
  { icon: Truck, title: 'Receive Delivery', description: 'We print and deliver your order to your doorstep across India.' },
];

const REVIEWS = [
  { name: 'Priya Sharma', company: 'TechVista Solutions', content: 'PrintOrbit delivered exceptional quality business cards. The metallic finish exceeded our expectations.', rating: 5 },
  { name: 'Rahul Mehta', company: 'GreenLeaf Organics', content: 'Our product labels are stunning. The team understood our brand perfectly and delivered on time.', rating: 5 },
  { name: 'Anjali Patel', company: 'Sparkle Events', content: 'The banners for our exhibition were vibrant and high-quality. Will definitely order again.', rating: 5 },
];

const ARTICLES = [
  { title: 'Top 10 Corporate Gift Ideas for 2024', excerpt: 'Discover trending corporate gifts that leave a lasting impression on clients and employees.', category: 'Corporate Gifting' },
  { title: 'How to Design Effective Visiting Cards', excerpt: 'Tips and tricks for creating professional business cards that stand out from the crowd.', category: 'Design Tips' },
  { title: 'Sustainable Packaging Solutions', excerpt: 'Eco-friendly packaging options that are good for your brand and the planet.', category: 'Sustainability' },
];

export default async function ProductsPage(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const searchParams = await props.searchParams;

  const initialCategory = typeof searchParams.category === 'string' ? searchParams.category : '';

  return <ProductsPageClient initialCategory={initialCategory} />;
}

function ProductsPageClient({ initialCategory }: { initialCategory: string }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'bestselling' | 'newest' | 'price_asc' | 'price_desc'>('bestselling');
  const [showSort, setShowSort] = useState(false);
  const [expandedSidebar, setExpandedSidebar] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    if (activeCategory) {
      const slug = getProductCategorySlug(p);
      if (slug !== activeCategory) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc': return a.base_price - b.base_price;
      case 'price_desc': return b.base_price - a.base_price;
      case 'newest': return Number(b.id) - Number(a.id);
      default: return 0;
    }
  });

  const toggleLike = (id: string) => {
    setLikedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeCat = activeCategory ? SIDEBAR_CATEGORIES.find((c) => c.slug === activeCategory) : null;
  const activeTabName = activeCat?.name || 'All';

  return (
    <div style={{ background: '#F4F2EF', minHeight: '100vh' }}>
      <div className="max-w-[1280px] mx-auto px-4 px-md-6">
        {/* Header Section */}
        <div className="pt-8 pb-6">
          <h1 className="display-2 fw-light" style={{ color: '#ED1C24' }}>
            Explore the Best
          </h1>
          <h2 className="fs-2 fw-bold" style={{ color: '#0F0F0F', marginTop: '0.25rem' }}>
            T-Shirts and Corporate Gifts
          </h2>
          <p className="text-muted mt-2 text-sm">
            The one-stop shop for your corporate gifting needs
          </p>
        </div>

        {/* Subcategory Tabs */}
        <div className="bg-white rounded-3 border border-gray-200 mb-6 overflow-x-auto">
          <div className="d-flex align-items-center gap-0 min-w-max">
            {SUBCATEGORY_TABS.map((tab) => {
              const isActive = activeTabName === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    const match = SIDEBAR_CATEGORIES.find((c) => c.name === tab);
                    setActiveCategory(match ? match.slug : '');
                  }}
                  className="px-4 py-3 text-xs fw-medium flex-shrink-0 border-0 bg-transparent"
                  style={{
                    borderBottom: `2px solid ${isActive ? '#ED1C24' : 'transparent'}`,
                    color: isActive ? '#ED1C24' : '#6B7280',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="d-flex gap-6 pb-12">
          {/* Filter Sidebar */}
          <aside className="d-none d-lg-block" style={{ width: '250px', flexShrink: 0 }}>
            <div className="bg-white rounded-3 border border-gray-200 p-4">
              <button
                onClick={() => setExpandedSidebar(!expandedSidebar)}
                className="d-flex align-items-center justify-content-between w-100 mb-3 border-0 bg-transparent p-0"
              >
                <span className="text-sm fw-bold uppercase" style={{ color: '#0F0F0F', letterSpacing: '0.05em' }}>Category</span>
                <ChevronDown size={16} className="text-gray-500 transition-transform" style={{ transform: expandedSidebar ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {expandedSidebar && (
                <div className="d-flex flex-column gap-1">
                  <button
                    onClick={() => setActiveCategory('')}
                    className="w-100 text-start px-3 py-2 rounded text-sm border-0 bg-transparent"
                    style={{
                      backgroundColor: !activeCategory ? 'rgba(237, 28, 36, 0.1)' : 'transparent',
                      color: !activeCategory ? '#ED1C24' : '#6B7280',
                      fontWeight: !activeCategory ? 500 : 400,
                    }}
                  >
                    All Products
                  </button>
                  {SIDEBAR_CATEGORIES.map((cat) => (
                    <div key={cat.slug}>
                      <button
                        onClick={() => setActiveCategory(cat.slug)}
                        className="w-100 text-start px-3 py-2 rounded text-sm border-0 bg-transparent"
                        style={{
                          backgroundColor: activeCategory === cat.slug ? 'rgba(237, 28, 36, 0.1)' : 'transparent',
                          color: activeCategory === cat.slug ? '#ED1C24' : '#6B7280',
                          fontWeight: activeCategory === cat.slug ? 500 : 400,
                        }}
                      >
                        {cat.name}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-fill min-w-0">
            {/* Sort Bar */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <p className="text-sm text-muted">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
                {activeCategory && (
                  <> in <span className="fw-medium" style={{ color: '#374151' }}>{activeCat?.name || activeCategory}</span></>
                )}
              </p>
              <div className="position-relative">
                <button
                  onClick={() => setShowSort(!showSort)}
                  className="d-flex align-items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-3 text-xs fw-medium text-gray-600"
                >
                  <span className="text-gray-400">SORT BY:</span> {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  <ChevronDown size={14} />
                </button>
                {showSort && (
                  <>
                    <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 40 }} onClick={() => setShowSort(false)} />
                    <div className="position-absolute end-0 mt-1 bg-white border border-gray-200 rounded-3 shadow-lg py-1" style={{ zIndex: 50, minWidth: '180px' }}>
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value as typeof sortBy); setShowSort(false); }}
                          className="w-100 text-start px-4 py-2 text-xs border-0 bg-transparent"
                          style={{
                            backgroundColor: sortBy === opt.value ? 'rgba(237, 28, 36, 0.05)' : 'transparent',
                            color: sortBy === opt.value ? '#ED1C24' : '#6B7280',
                            fontWeight: sortBy === opt.value ? 500 : 400,
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className="row g-4">
                {sortedProducts.map((product) => {
                  const catSlug = getProductCategorySlug(product);
                  const bgStyle = { background: categoryImageMap[catSlug] || 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)' };
                  const Icon = CATEGORY_ICONS[catSlug] || Package;
                  const mrp = Math.round(product.base_price * 1.4);
                  const discount = Math.round(((mrp - product.base_price) / mrp) * 100);
                  const isHovered = hoveredProduct === product.id;
                  const isLiked = likedProducts.has(product.id);

                  return (
                    <div key={product.id} className="col-12 col-sm-6 col-lg-4">
                      <Link
                        href={`/products/${product.slug}`}
                        className="bg-white rounded-3 border border-gray-200 overflow-hidden d-block text-decoration-none h-100"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        {/* Product Image */}
                        <div className="position-relative" style={{ aspectRatio: '4/3' }}>
                          <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={bgStyle}>
                            <Icon size={64} style={{ color: '#d1d5db' }} />
                          </div>
                          {/* Quick Actions */}
                          <div className="position-absolute top-3 end-3 d-flex flex-column gap-2" style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s' }}>
                            <button
                              onClick={(e) => { e.preventDefault(); }}
                              className="w-8 h-8 bg-white rounded-circle d-flex align-items-center justify-content-center border-0 shadow-sm"
                            >
                              <Share2 size={14} style={{ color: '#4B5563' }} />
                            </button>
                            <button
                              onClick={(e) => { e.preventDefault(); toggleLike(product.id); }}
                              className="w-8 h-8 bg-white rounded-circle d-flex align-items-center justify-content-center border-0 shadow-sm"
                            >
                              <Heart size={14} style={{ color: isLiked ? '#ef4444' : '#4B5563', fill: isLiked ? '#ef4444' : 'none' }} />
                            </button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-3">
                          <p className="fw-semibold text-uppercase mb-1" style={{ fontSize: '0.65rem', color: '#9CA3AF', letterSpacing: '0.05em' }}>
                            PrintStop
                          </p>
                          <h3 className="text-sm fw-semibold leading-snug mb-2 text-truncate" style={{ color: '#0F0F0F', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {product.name}
                          </h3>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="text-sm fw-bold" style={{ color: '#0F0F0F' }}>₹{product.base_price}</span>
                            <span style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>MRP</span>
                            <span style={{ fontSize: '0.65rem', color: '#9CA3AF', textDecoration: 'line-through' }}>₹{mrp}</span>
                            <span className="fw-semibold" style={{ fontSize: '0.65rem', color: '#16a34a' }}>{discount}% off</span>
                          </div>
                          <p style={{ fontSize: '0.7rem', color: '#6B7280' }} className="mb-2">
                            ₹{product.base_price} for {product.min_quantity.toLocaleString()}+ units
                          </p>
                          <div className="d-flex align-items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} size={12} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                            ))}
                            <span style={{ fontSize: '0.65rem', color: '#9CA3AF' }} className="ms-1">(120)</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3 border border-gray-200">
                <Search size={48} style={{ color: '#d1d5db' }} className="mx-auto mb-4" />
                <h3 className="fs-5 fw-semibold mb-2" style={{ color: '#0F0F0F' }}>No products found</h3>
                <p className="text-sm text-muted mb-6">Try adjusting your filter criteria</p>
                <button
                  onClick={() => setActiveCategory('')}
                  className="px-6 py-2 text-sm fw-semibold text-white border-0 rounded-3"
                  style={{ backgroundColor: '#ED1C24' }}
                >
                  View All Products
                </button>
              </div>
            )}

            {/* You Might Also Like */}
            <div className="mt-8 bg-white rounded-3 border border-gray-200 p-6">
              <h2 className="fs-5 fw-bold mb-4" style={{ color: '#0F0F0F' }}>You might also like</h2>
              <div className="row g-3">
                {PRODUCT_CATEGORIES.slice(0, 6).map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.slug] || Package;
                  return (
                    <div key={cat.slug} className="col-6 col-sm-4 col-lg-2">
                      <Link
                        href={`/products?category=${cat.slug}`}
                        className="p-3 rounded-3 border border-gray-100 text-center d-block text-decoration-none transition-colors h-100"
                      >
                        <div className="w-10 h-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" style={{ backgroundColor: 'rgba(237, 28, 36, 0.05)' }}>
                          <Icon size={20} style={{ color: '#ED1C24' }} />
                        </div>
                        <h3 className="text-xs fw-semibold mb-1" style={{ color: '#0F0F0F' }}>{cat.name}</h3>
                        <p style={{ fontSize: '0.65rem' }} className="text-muted mb-0">{cat.count}</p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* How It Works */}
            <div className="mt-8 bg-white rounded-3 border border-gray-200 p-6">
              <h2 className="fs-5 fw-bold mb-6" style={{ color: '#0F0F0F' }}>How It Works</h2>
              <div className="row g-4">
                {HOW_IT_WORKS_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="col-12 col-md-4 text-center">
                      <div className="w-14 h-14 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ backgroundColor: 'rgba(237, 28, 36, 0.1)' }}>
                        <Icon size={24} style={{ color: '#ED1C24' }} />
                      </div>
                      <h3 className="text-sm fw-bold mb-1" style={{ color: '#0F0F0F' }}>{step.title}</h3>
                      <p className="text-xs text-muted leading-relaxed">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Most Helpful Reviews */}
            <div className="mt-8 bg-white rounded-3 border border-gray-200 p-6">
              <h2 className="fs-5 fw-bold mb-4" style={{ color: '#0F0F0F' }}>Most Helpful Reviews</h2>
              <div className="row g-3">
                {REVIEWS.map((review, i) => (
                  <div key={i} className="col-12 col-md-4">
                    <div className="border border-gray-100 rounded-3 p-4 h-100">
                      <div className="d-flex align-items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: '#4B5563' }}>&ldquo;{review.content}&rdquo;</p>
                      <div>
                        <p className="text-xs fw-semibold" style={{ color: '#0F0F0F' }}>{review.name}</p>
                        <p style={{ fontSize: '0.65rem' }} className="text-muted">{review.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-8 bg-white rounded-3 border border-gray-200 p-6">
              <h2 className="fs-5 fw-bold mb-4" style={{ color: '#0F0F0F' }}>Related Articles</h2>
              <div className="row g-3">
                {ARTICLES.map((article, i) => (
                  <div key={i} className="col-12 col-md-4">
                    <Link href="#" className="group text-decoration-none">
                      <div className="rounded-3 mb-3 d-flex align-items-center justify-content-center" style={{ aspectRatio: '16/9', background: 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)' }}>
                        <FileText size={32} style={{ color: '#d1d5db' }} />
                      </div>
                      <p className="fw-semibold text-uppercase mb-1" style={{ fontSize: '0.65rem', color: '#ED1C24', letterSpacing: '0.05em' }}>{article.category}</p>
                      <h3 className="text-sm fw-semibold leading-snug mb-1" style={{ color: '#0F0F0F' }}>{article.title}</h3>
                      <p className="text-xs text-muted text-truncate">{article.excerpt}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Let's Talk Business Banner */}
            <div className="mt-8 rounded-3 p-8 text-center" style={{ backgroundColor: '#ED1C24' }}>
              <h2 className="fs-3 fw-bold text-white mb-2">Let&apos;s Talk Business</h2>
              <p className="text-white/80 text-sm mb-4">Get custom quotes for bulk orders. Our team is ready to help you.</p>
              <Link
                href="/contact"
                className="d-inline-flex align-items-center gap-2 px-6 py-2 text-sm fw-semibold text-decoration-none rounded-3"
                style={{ backgroundColor: '#ffffff', color: '#ED1C24' }}
              >
                Contact Us
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
