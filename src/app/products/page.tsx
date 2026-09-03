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

function GiftIcon({ className }: { className?: string }) {
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

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
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
  'gift-hampers': 'bg-gradient-to-br from-rose-100 to-amber-50',
  'visiting-cards': 'bg-gradient-to-br from-blue-50 to-indigo-100',
  'id-cards': 'bg-gradient-to-br from-blue-50 to-indigo-100',
  'pens': 'bg-gradient-to-br from-green-50 to-emerald-100',
  'letterheads': 'bg-gradient-to-br from-slate-50 to-gray-100',
  'envelopes': 'bg-gradient-to-br from-slate-50 to-gray-100',
  'diaries-notebooks': 'bg-gradient-to-br from-amber-50 to-yellow-100',
  'calendars': 'bg-gradient-to-br from-amber-50 to-yellow-100',
  't-shirts': 'bg-gradient-to-br from-red-50 to-pink-100',
  'polo-t-shirts': 'bg-gradient-to-br from-red-50 to-pink-100',
  'jackets-hoodies': 'bg-gradient-to-br from-red-50 to-pink-100',
  'flyers': 'bg-gradient-to-br from-purple-50 to-violet-100',
  'brochures': 'bg-gradient-to-br from-purple-50 to-violet-100',
  'posters': 'bg-gradient-to-br from-orange-50 to-amber-100',
  'banners': 'bg-gradient-to-br from-orange-50 to-amber-100',
  'stickers': 'bg-gradient-to-br from-teal-50 to-cyan-100',
  'labels': 'bg-gradient-to-br from-teal-50 to-cyan-100',
  'custom-boxes': 'bg-gradient-to-br from-orange-50 to-amber-100',
  'mugs': 'bg-gradient-to-br from-sky-50 to-blue-100',
  'water-bottles': 'bg-gradient-to-br from-sky-50 to-blue-100',
  'tote-bags': 'bg-gradient-to-br from-lime-50 to-green-100',
  'trophies': 'bg-gradient-to-br from-yellow-50 to-amber-100',
  'keychains': 'bg-gradient-to-br from-pink-50 to-rose-100',
  'coasters': 'bg-gradient-to-br from-stone-50 to-gray-100',
  'photo-albums': 'bg-gradient-to-br from-violet-50 to-purple-100',
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
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="pt-8 pb-6">
          <h1 className="text-3xl md:text-4xl font-light" style={{ color: '#ED1C24' }}>
            Explore the Best
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
            T-Shirts and Corporate Gifts
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            The one-stop shop for your corporate gifting needs
          </p>
        </div>

        {/* Subcategory Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 overflow-x-auto">
          <div className="flex items-center gap-0 min-w-max">
            {SUBCATEGORY_TABS.map((tab) => {
              const isActive = activeTabName === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    const match = SIDEBAR_CATEGORIES.find((c) => c.name === tab);
                    setActiveCategory(match ? match.slug : '');
                  }}
                  className={`px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? 'border-[#ED1C24] text-[#ED1C24]'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-6 pb-12">
          {/* Filter Sidebar */}
          <aside className="hidden lg:block w-[250px] shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <button
                onClick={() => setExpandedSidebar(!expandedSidebar)}
                className="flex items-center justify-between w-full mb-3"
              >
                <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">Category</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSidebar ? 'rotate-180' : ''}`} />
              </button>
              {expandedSidebar && (
                <div className="space-y-0.5">
                  <button
                    onClick={() => setActiveCategory('')}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      !activeCategory ? 'bg-[#ED1C24]/10 text-[#ED1C24] font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    All Products
                  </button>
                  {SIDEBAR_CATEGORIES.map((cat) => (
                    <div key={cat.slug}>
                      <button
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          activeCategory === cat.slug ? 'bg-[#ED1C24]/10 text-[#ED1C24] font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`}
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
          <div className="flex-1 min-w-0">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
                {activeCategory && (
                  <> in <span className="font-medium text-gray-700">{activeCat?.name || activeCategory}</span></>
                )}
              </p>
              <div className="relative">
                <button
                  onClick={() => setShowSort(!showSort)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-gray-300"
                >
                  <span className="text-gray-400">SORT BY:</span> {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {showSort && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 min-w-[180px]">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value as typeof sortBy); setShowSort(false); }}
                          className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                            sortBy === opt.value ? 'bg-[#ED1C24]/5 text-[#ED1C24] font-medium' : 'text-gray-600 hover:bg-gray-50'
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

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => {
                  const catSlug = getProductCategorySlug(product);
                  const bgClass = categoryImageMap[catSlug] || 'bg-gradient-to-br from-gray-50 to-gray-100';
                  const Icon = CATEGORY_ICONS[catSlug] || Package;
                  const mrp = Math.round(product.base_price * 1.4);
                  const discount = Math.round(((mrp - product.base_price) / mrp) * 100);
                  const isHovered = hoveredProduct === product.id;
                  const isLiked = likedProducts.has(product.id);

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden group"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Product Image */}
                      <div className={`relative aspect-[4/3] ${bgClass} flex items-center justify-center`}>
                        <Icon className="w-16 h-16 text-gray-300" />
                        {/* Quick Actions */}
                        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                          <button
                            onClick={(e) => { e.preventDefault(); }}
                            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50"
                          >
                            <Share2 className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                          <button
                            onClick={(e) => { e.preventDefault(); toggleLike(product.id); }}
                            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-3">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                          PrintStop
                        </p>
                        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1.5 line-clamp-2 group-hover:text-[#ED1C24] transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-sm font-bold text-gray-900">₹{product.base_price}</span>
                          <span className="text-[10px] text-gray-400">MRP</span>
                          <span className="text-[10px] text-gray-400 line-through">₹{mrp}</span>
                          <span className="text-[10px] font-semibold text-green-600">{discount}% off</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mb-2">
                          ₹{product.base_price} for {product.min_quantity.toLocaleString()}+ units
                        </p>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-[10px] text-gray-400 ml-1">(120)</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-sm text-gray-500 mb-6">Try adjusting your filter criteria</p>
                <button
                  onClick={() => setActiveCategory('')}
                  className="px-6 py-2.5 bg-[#ED1C24] text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* You Might Also Like */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">You might also like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {PRODUCT_CATEGORIES.slice(0, 6).map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.slug] || Package;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      className="p-3 rounded-lg border border-gray-100 text-center hover:border-[#ED1C24]/30 hover:bg-red-50/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#ED1C24]/5 flex items-center justify-center mx-auto mb-2">
                        <Icon className="w-5 h-5 text-[#ED1C24]" />
                      </div>
                      <h3 className="text-xs font-semibold text-gray-900 mb-0.5">{cat.name}</h3>
                      <p className="text-[10px] text-gray-500">{cat.count}</p>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* How It Works */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {HOW_IT_WORKS_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="text-center">
                      <div className="w-14 h-14 rounded-full bg-[#ED1C24]/10 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-[#ED1C24]" />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Most Helpful Reviews */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Most Helpful Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {REVIEWS.map((review, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">&ldquo;{review.content}&rdquo;</p>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{review.name}</p>
                      <p className="text-[10px] text-gray-500">{review.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ARTICLES.map((article, i) => (
                  <Link key={i} href="#" className="group">
                    <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-[10px] font-semibold text-[#ED1C24] uppercase tracking-wider mb-1">{article.category}</p>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1 group-hover:text-[#ED1C24] transition-colors">{article.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{article.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Let's Talk Business Banner */}
            <div className="mt-8 bg-[#ED1C24] rounded-lg p-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Let&apos;s Talk Business</h2>
              <p className="text-white/80 text-sm mb-4">Get custom quotes for bulk orders. Our team is ready to help you.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#ED1C24] rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Us
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
