'use client';

import { useState, use, useMemo } from 'react';
import Link from 'next/link';
import {
  Star, ShoppingCart, Truck, Clock, ChevronRight, ChevronDown, Minus, Plus,
  FileText, Download, ThumbsUp, Package, Upload, Check, Info, Tag,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { formatPrice } from '@/lib/utils';

const PRODUCT_DATA: Record<string, {
  name: string; category: string; description: string; longDescription: string;
  basePrice: number; minQty: number; maxQty: number;
  materials: { name: string; price_modifier: number }[];
  sizes: { name: string; width: number; height: number; price_modifier: number }[];
  finishes: { name: string; price_modifier: number }[];
  specs: Record<string, string>; delivery: string; rating: number; reviews: number;
  image?: string;
  features?: string[];
}> = {
  'standard-business-cards': {
    name: 'Standard Business Cards', category: 'Business Cards',
    description: 'Classic business cards printed on 300gsm cardstock.',
    longDescription: 'Our standard business cards are printed on 300gsm cardstock with full-color digital printing. Perfect for everyday networking and professional use. Affordable, fast turnaround, and available in matte or glossy finish.',
    basePrice: 299, minQty: 100, maxQty: 50000,
    materials: [{ name: '300gsm', price_modifier: 0 }, { name: '350gsm', price_modifier: 30 }],
    sizes: [{ name: 'Standard (85×55)', width: 85, height: 55, price_modifier: 0 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }],
    specs: { 'Paper': '300gsm Cardstock', 'Print': 'Full Color Both Sides', 'Finish': 'Matte or Glossy', 'Size': '85 × 55 mm', 'Bleed': '3mm on all sides', 'File Format': 'PDF, AI, PSD, PNG' },
    delivery: '2-4 Business Days', rating: 4.6, reviews: 384,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=800&fit=crop',
    features: ['Printed on premium 300gsm cardstock', 'Full color both sides', 'Matte or glossy finish options', 'Fast 2-4 day turnaround', 'Free design proof before printing'],
  },
  'premium-matte-business-cards': {
    name: 'Premium Matte Business Cards', category: 'Business Cards',
    description: 'Thick 400gsm matte cards with a luxurious feel. Perfect for professionals.',
    longDescription: 'Our premium matte business cards are printed on 400gsm cardstock with a soft-touch matte lamination. These cards make a lasting impression with their substantial weight and smooth finish. Ideal for professionals, executives, and anyone who wants to convey quality and sophistication.',
    basePrice: 499, minQty: 100, maxQty: 10000,
    materials: [{ name: '350gsm', price_modifier: -50 }, { name: '400gsm', price_modifier: 0 }, { name: '450gsm', price_modifier: 50 }],
    sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }, { name: 'Slim', width: 90, height: 50, price_modifier: 20 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 25 }, { name: 'Soft Touch', price_modifier: 75 }],
    specs: { 'Paper': '400gsm Premium Cardstock', 'Print': 'Full Color Both Sides', 'Finish': 'Matte Lamination', 'Size': '85 × 55 mm', 'Bleed': '3mm on all sides', 'File Format': 'PDF, AI, PSD, PNG' },
    delivery: '3-5 Business Days', rating: 4.8, reviews: 247,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=800&fit=crop',
    features: ['Premium 400gsm thick cardstock', 'Soft-touch matte lamination', 'Luxurious tactile feel', 'Perfect for professionals', 'Available in Standard and Slim sizes'],
  },
  'metallic-foil-business-cards': {
    name: 'Metallic Foil Business Cards', category: 'Business Cards',
    description: 'Eye-catching metallic foil stamping on premium cardstock.',
    longDescription: 'Stand out with our metallic foil business cards. Choose from gold, silver, or rose gold foil stamping on thick premium cardstock. The reflective foil catches light beautifully, making your card unforgettable.',
    basePrice: 899, minQty: 100, maxQty: 5000,
    materials: [{ name: '350gsm', price_modifier: -100 }, { name: '400gsm', price_modifier: 0 }],
    finishes: [{ name: 'Gold Foil', price_modifier: 0 }, { name: 'Silver Foil', price_modifier: 0 }, { name: 'Rose Gold', price_modifier: 50 }],
    sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }],
    specs: { 'Paper': '400gsm Premium Cardstock', 'Print': 'Foil Stamping + Digital', 'Finish': 'Spot UV + Foil', 'Size': '85 × 55 mm', 'Foil Colors': 'Gold, Silver, Rose Gold', 'File Format': 'PDF, AI' },
    delivery: '5-7 Business Days', rating: 4.9, reviews: 183,
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop',
    features: ['Metallic foil stamping in Gold, Silver, Rose Gold', 'Premium 400gsm cardstock', 'Spot UV + Foil finish', 'Eye-catching reflective foil', 'Perfect for luxury branding'],
  },
  'luxury-business-cards': {
    name: 'Luxury Velvet Business Cards', category: 'Business Cards',
    description: 'Soft velvet lamination with foil accents for a premium look.',
    longDescription: 'Our luxury velvet business cards feature a soft-touch velvet lamination with optional foil accents. The tactile velvet finish gives your card a truly premium feel that recipients will remember. Available in black, navy, and burgundy velvet.',
    basePrice: 1299, minQty: 100, maxQty: 2000,
    materials: [{ name: '400gsm', price_modifier: 0 }, { name: '500gsm', price_modifier: 100 }],
    finishes: [{ name: 'Velvet Black', price_modifier: 0 }, { name: 'Velvet Navy', price_modifier: 0 }, { name: 'Velvet Burgundy', price_modifier: 50 }],
    sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }],
    specs: { 'Paper': '500gsm Premium', 'Finish': 'Velvet Lamination', 'Print': 'Full Color + Foil', 'Size': '85 × 55 mm', 'File Format': 'PDF, AI' },
    delivery: '5-7 Business Days', rating: 4.9, reviews: 127,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Soft-touch velvet lamination', 'Available in Black, Navy, Burgundy', 'Optional foil accents', '500gsm premium cardstock', 'Truly premium tactile experience'],
  },
  'magnet-business-cards': {
    name: 'Magnet Business Cards', category: 'Business Cards',
    description: 'Business cards that stick to fridges, boards, and metal surfaces.',
    longDescription: 'Never get thrown away — our magnet business cards stick to fridges, filing cabinets, and metal surfaces. Printed on flexible magnetic sheet with full-color printing. Perfect for realtors, mechanics, restaurants, and service businesses.',
    basePrice: 799, minQty: 100, maxQty: 5000,
    materials: [{ name: 'Magnetic', price_modifier: 0 }],
    finishes: [{ name: 'Glossy', price_modifier: 0 }, { name: 'Matte', price_modifier: 20 }],
    sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }],
    specs: { 'Material': 'Flexible Magnetic Sheet', 'Print': 'Full Color', 'Thickness': '0.4mm', 'Size': '85 × 55 mm', 'File Format': 'PDF, AI, PNG' },
    delivery: '3-5 Business Days', rating: 4.7, reviews: 94,
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop',
    features: ['Sticks to fridges and metal surfaces', 'Flexible magnetic sheet', 'Full-color printing', 'Never gets thrown away', 'Great for service businesses'],
  },
  'a5-flyers': {
    name: 'A5 Double-Sided Flyers', category: 'Flyers',
    description: 'Vibrant full-color A5 flyers on premium 170gsm art paper.',
    longDescription: 'Our A5 double-sided flyers are printed on premium 170gsm art paper with full-color digital printing. Perfect for promotions, events, and marketing campaigns. Available in matte or glossy finish.',
    basePrice: 299, minQty: 100, maxQty: 50000,
    materials: [{ name: '130gsm Art', price_modifier: -30 }, { name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 60 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }],
    sizes: [{ name: 'A5', width: 148, height: 210, price_modifier: 0 }, { name: 'A4', width: 210, height: 297, price_modifier: 80 }, { name: 'DL', width: 99, height: 210, price_modifier: -20 }],
    specs: { 'Paper': '170gsm Art Paper', 'Print': 'Full Color Both Sides', 'Finish': 'Matte Lamination', 'Sizes': 'A5, A4, DL', 'File Format': 'PDF, AI, PSD, PNG' },
    delivery: '2-4 Business Days', rating: 4.7, reviews: 412,
    image: 'https://images.unsplash.com/photo-1586281380183-ea4a351cc8b6?w=800&h=800&fit=crop',
    features: ['Premium 170gsm art paper', 'Full color both sides', 'Available in A5, A4, DL sizes', 'Matte or glossy finish', 'Perfect for promotions and events'],
  },
  'a4-flyers': {
    name: 'A4 Double-Sided Flyers', category: 'Flyers',
    description: 'Large format A4 flyers for maximum impact and detailed content.',
    longDescription: 'Our A4 double-sided flyers give you maximum space for your message. Printed on premium 170gsm art paper with vibrant full-color printing on both sides. Ideal for menus, event programs, product sheets, and detailed marketing materials.',
    basePrice: 499, minQty: 100, maxQty: 50000,
    materials: [{ name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 80 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 20 }],
    sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }],
    specs: { 'Paper': '170gsm Art Paper', 'Print': 'Full Color Both Sides', 'Finish': 'Matte or Glossy', 'Size': 'A4 (210 × 297 mm)', 'File Format': 'PDF, AI, PSD, PNG' },
    delivery: '2-4 Business Days', rating: 4.6, reviews: 289,
    image: 'https://images.unsplash.com/photo-1606114069123-1ef1e1c762ee?w=800&h=800&fit=crop',
    features: ['Large A4 format for maximum impact', 'Premium 170gsm art paper', 'Full color both sides', 'Ideal for menus and product sheets', 'Fast 2-4 day turnaround'],
  },
  'tri-fold-brochures': {
    name: 'Tri-Fold Brochures', category: 'Brochures',
    description: 'Popular tri-fold format perfect for marketing and information.',
    longDescription: 'Our tri-fold brochures are the most popular format for marketing collateral. Printed on premium 170gsm art paper with full-color printing. The tri-fold design gives you 6 panels to showcase your business, products, and services.',
    basePrice: 599, minQty: 50, maxQty: 10000,
    materials: [{ name: '130gsm Art', price_modifier: -50 }, { name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 100 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 30 }],
    sizes: [{ name: 'A4 (folded to DL)', width: 210, height: 297, price_modifier: 0 }],
    specs: { 'Paper': '170gsm Art Paper', 'Fold': 'Tri-Fold (6 panels)', 'Print': 'Full Color Both Sides', 'Folded Size': '99 × 210 mm', 'File Format': 'PDF, AI, PSD' },
    delivery: '3-5 Business Days', rating: 4.8, reviews: 201,
    image: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=800&h=800&fit=crop',
    features: ['6-panel tri-fold design', 'Premium 170gsm art paper', 'Full color both sides', 'Most popular brochure format', 'Perfect for marketing collateral'],
  },
  'bi-fold-brochures': {
    name: 'Bi-Fold Brochures', category: 'Brochures',
    description: 'Professional bi-fold brochures for corporate presentations.',
    longDescription: 'Our bi-fold brochures are perfect for corporate presentations, product catalogs, and detailed business information. Printed on premium paper with a clean, professional fold. The larger panels give you more space for content and imagery.',
    basePrice: 499, minQty: 50, maxQty: 10000,
    materials: [{ name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 80 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 25 }],
    sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }],
    specs: { 'Paper': '170gsm Art Paper', 'Fold': 'Bi-Fold (4 panels)', 'Print': 'Full Color Both Sides', 'Folded Size': '148 × 210 mm', 'File Format': 'PDF, AI, PSD' },
    delivery: '3-5 Business Days', rating: 4.7, reviews: 156,
    image: 'https://images.unsplash.com/photo-1606114069123-1ef1e1c762ee?w=800&h=800&fit=crop',
    features: ['4-panel bi-fold design', 'Larger panels for more content', 'Premium paper stock', 'Professional corporate look', 'Perfect for presentations'],
  },
  'vinyl-banners': {
    name: 'Vinyl Banner 3×6ft', category: 'Banners',
    description: 'Durable vinyl banner for indoor and outdoor use.',
    longDescription: 'Our vinyl banners are printed on premium 13oz or 18oz vinyl with eco-solvent inks. Weather-resistant and UV-protected, these banners are perfect for events, storefronts, and exhibitions. Includes hemmed edges and grommets.',
    basePrice: 599, minQty: 1, maxQty: 100,
    materials: [{ name: '13oz Vinyl', price_modifier: 0 }, { name: '18oz Vinyl', price_modifier: 200 }],
    finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'With Grommets', price_modifier: 50 }, { name: 'With Pole Pockets', price_modifier: 100 }],
    sizes: [{ name: '3×6 ft', width: 914, height: 1829, price_modifier: 0 }, { name: '4×8 ft', width: 1219, height: 2438, price_modifier: 300 }, { name: '6×10 ft', width: 1829, height: 3048, price_modifier: 800 }],
    specs: { 'Material': '13oz Premium Vinyl', 'Print': 'Eco-Solvent Full Color', 'Finish': 'Weather Resistant', 'Edge': 'Hemmed with Grommets', 'File Format': 'PDF, AI, PSD' },
    delivery: '3-5 Business Days', rating: 4.6, reviews: 156,
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=800&fit=crop',
    features: ['Weather-resistant and UV-protected', 'Eco-solvent inks', 'Hemmed edges with grommets', 'Indoor and outdoor use', 'Available in multiple sizes'],
  },
  'die-cut-stickers': {
    name: 'Die-Cut Vinyl Stickers', category: 'Labels & Stickers',
    description: 'Custom die-cut stickers in any shape. Waterproof vinyl.',
    longDescription: 'Create custom die-cut stickers in any shape you want. Printed on premium waterproof vinyl with strong adhesive. Perfect for product labels, branding, laptops, water bottles, and more.',
    basePrice: 199, minQty: 50, maxQty: 10000,
    materials: [{ name: 'White Vinyl', price_modifier: 0 }, { name: 'Clear Vinyl', price_modifier: 30 }, { name: 'Holographic', price_modifier: 80 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 10 }],
    sizes: [{ name: '2 inch', width: 50, height: 50, price_modifier: 0 }, { name: '3 inch', width: 75, height: 75, price_modifier: 20 }, { name: '4 inch', width: 100, height: 100, price_modifier: 40 }],
    specs: { 'Material': 'Premium Vinyl', 'Print': 'Eco-Solvent', 'Finish': 'Waterproof', 'Adhesive': 'Permanent', 'File Format': 'PDF, AI, PNG' },
    delivery: '2-4 Business Days', rating: 4.8, reviews: 523,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop',
    features: ['Custom die-cut in any shape', 'Waterproof vinyl material', 'Strong permanent adhesive', 'White, Clear, or Holographic options', 'Perfect for product labels'],
  },
  'mailer-boxes': {
    name: 'Custom Mailer Boxes', category: 'Custom Boxes',
    description: 'Branded corrugated mailer boxes with full-color printing.',
    longDescription: 'Elevate your unboxing experience with custom printed mailer boxes. Full-color printing on corrugated board with easy fold assembly. Available in kraft, white, or laminated finish.',
    basePrice: 149, minQty: 50, maxQty: 10000,
    materials: [{ name: 'E-Flute', price_modifier: 0 }, { name: 'B-Flute', price_modifier: 30 }],
    finishes: [{ name: 'Kraft', price_modifier: 0 }, { name: 'White Board', price_modifier: 20 }, { name: 'Laminated', price_modifier: 50 }],
    sizes: [{ name: 'Small', width: 150, height: 100, price_modifier: 0 }, { name: 'Medium', width: 250, height: 150, price_modifier: 60 }, { name: 'Large', width: 350, height: 250, price_modifier: 150 }],
    specs: { 'Material': 'E-Flute Corrugated', 'Print': 'Full Color Offset', 'Finish': 'Matte Lamination', 'Assembly': 'Easy Fold', 'File Format': 'PDF, AI' },
    delivery: '7-10 Business Days', rating: 4.7, reviews: 89,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=800&fit=crop',
    features: ['Full-color offset printing', 'Easy fold assembly', 'Kraft, White, or Laminated finish', 'E-Flute and B-Flute options', 'Elevate your unboxing experience'],
  },
  'cotton-tshirts': {
    name: 'Custom Cotton T-Shirts', category: 'Clothing',
    description: 'Premium 100% cotton t-shirts with custom print.',
    longDescription: 'Get custom printed t-shirts on premium 100% cotton fabric. Available in screen print, DTG (direct-to-garment), and sublimation printing. Perfect for events, teams, businesses, and promotional giveaways.',
    basePrice: 399, minQty: 20, maxQty: 5000,
    materials: [{ name: '100% Cotton', price_modifier: 0 }, { name: 'Poly-Cotton', price_modifier: -30 }, { name: 'Organic Cotton', price_modifier: 50 }],
    finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'DTG Print', price_modifier: 30 }, { name: 'Sublimation', price_modifier: 50 }],
    sizes: [{ name: 'S', width: 0, height: 0, price_modifier: 0 }, { name: 'M', width: 0, height: 0, price_modifier: 0 }, { name: 'L', width: 0, height: 0, price_modifier: 0 }, { name: 'XL', width: 0, height: 0, price_modifier: 0 }, { name: 'XXL', width: 0, height: 0, price_modifier: 20 }],
    specs: { 'Material': '100% Cotton', 'Weight': '180 GSM', 'Print': 'Screen / DTG / Sublimation', 'Sizes': 'S, M, L, XL, XXL', 'Colors': 'White, Black, Navy, Grey, Red', 'File Format': 'PNG, AI, PSD (300 DPI)' },
    delivery: '5-7 Business Days', rating: 4.5, reviews: 312,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
    features: ['Premium 100% cotton fabric', 'Screen print, DTG, or sublimation', 'Available in S to XXL', '180 GSM weight', 'Perfect for events and teams'],
  },
  'ceramic-mugs': {
    name: 'Custom Ceramic Mugs', category: 'Gifts & Mugs',
    description: 'Classic ceramic mugs with custom print. Great for gifts.',
    longDescription: 'Our custom ceramic mugs are printed with vibrant, long-lasting colors. Available in standard 11oz and large 15oz sizes. Choose standard print or upgrade to our magic heat-reveal mug that changes color when hot liquid is poured.',
    basePrice: 299, minQty: 10, maxQty: 5000,
    materials: [{ name: 'Ceramic', price_modifier: 0 }, { name: 'Glass', price_modifier: 50 }],
    finishes: [{ name: 'Standard Print', price_modifier: 0 }, { name: 'Magic (Heat Reveal)', price_modifier: 150 }],
    sizes: [{ name: '11oz', width: 0, height: 0, price_modifier: 0 }, { name: '15oz', width: 0, height: 0, price_modifier: 40 }],
    specs: { 'Material': 'Ceramic', 'Capacity': '11oz / 15oz', 'Print': 'Full Color Sublimation', 'Dishwasher Safe': 'Yes', 'Microwave Safe': 'Yes', 'File Format': 'PNG, JPG, AI' },
    delivery: '3-5 Business Days', rating: 4.7, reviews: 278,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop',
    features: ['Vibrant, long-lasting colors', '11oz and 15oz sizes', 'Dishwasher and microwave safe', 'Magic heat-reveal option available', 'Great for gifts and promotions'],
  },
  'a4-letterheads': {
    name: 'A4 Corporate Letterheads', category: 'Stationery',
    description: 'Professional A4 letterheads for businesses.',
    longDescription: 'Our A4 corporate letterheads are printed on premium 120gsm uncoated paper. Perfect for official correspondence, invoices, and business communication. Full-color printing with your logo and branding.',
    basePrice: 399, minQty: 100, maxQty: 10000,
    materials: [{ name: '100gsm', price_modifier: -30 }, { name: '120gsm', price_modifier: 0 }, { name: '160gsm', price_modifier: 40 }],
    finishes: [{ name: 'Uncoated', price_modifier: 0 }, { name: 'Wove', price_modifier: 20 }],
    sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }],
    specs: { 'Paper': '120gsm Premium', 'Print': 'Full Color', 'Size': 'A4 (210 × 297 mm)', 'Finish': 'Uncoated / Wove', 'File Format': 'PDF, AI, PSD' },
    delivery: '3-5 Business Days', rating: 4.6, reviews: 178,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Premium 120gsm uncoated paper', 'Full-color logo printing', 'Perfect for official correspondence', 'Uncoated or Wove finish', 'Professional corporate look'],
  },
  'card-holders': {
    name: 'Visiting Card Holders', category: 'Card Accessories',
    description: 'Premium metal and leather card holders for professionals.',
    longDescription: 'Keep your business cards organized and impressive with our premium card holders. Available in engraved metal, leatherite, and brushed steel finishes. Perfect for networking events and corporate gifting.',
    basePrice: 199, minQty: 10, maxQty: 5000,
    materials: [{ name: 'Metal', price_modifier: 0 }, { name: 'Leatherite', price_modifier: -30 }, { name: 'Leather', price_modifier: 50 }],
    finishes: [{ name: 'Brushed Steel', price_modifier: 0 }, { name: 'Matte Black', price_modifier: 20 }, { name: 'Gold', price_modifier: 40 }],
    sizes: [{ name: 'Standard (85×55)', width: 85, height: 55, price_modifier: 0 }],
    specs: { 'Material': 'Premium Metal / Leatherite', 'Capacity': '15-20 Cards', 'Finish': 'Engraved / Matte', 'Size': 'Standard Business Card', 'Feature': 'Engraved Logo Available' },
    delivery: '3-5 Business Days', rating: 4.7, reviews: 89,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=800&fit=crop',
    features: ['Premium metal and leather finishes', 'Holds 15-20 cards', 'Engraved logo available', 'Brushed Steel, Matte Black, Gold', 'Perfect for corporate gifting'],
  },
  'transparent-business-cards': {
    name: 'Transparent Business Cards', category: 'Business Cards',
    description: 'Clear plastic business cards for a modern look.',
    longDescription: 'Stand out with our transparent business cards. Printed on premium clear plastic (PVC) with vibrant colors that pop against the see-through background. Perfect for creative professionals, salons, and modern businesses.',
    basePrice: 799, minQty: 100, maxQty: 5000,
    materials: [{ name: 'Clear PVC', price_modifier: 0 }, { name: 'Frosted PVC', price_modifier: 30 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 20 }],
    sizes: [{ name: 'Standard (85×55)', width: 85, height: 55, price_modifier: 0 }],
    specs: { 'Material': '0.3mm Clear PVC', 'Print': 'Full Color UV', 'Finish': 'Matte / Glossy', 'Size': '85 × 55 mm', 'Feature': 'Waterproof & Durable' },
    delivery: '3-5 Business Days', rating: 4.8, reviews: 156,
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop',
    features: ['Clear PVC material', 'Full color UV printing', 'Waterproof and durable', 'Matte or Glossy finish', 'Modern see-through design'],
  },
  'polo-tshirts': {
    name: 'Custom Polo T-Shirts', category: 'Clothing',
    description: 'Premium polo shirts with custom embroidery or print.',
    longDescription: 'Get custom polo shirts for your team, events, or brand. Available in cotton pique, dry-fit, and premium pique fabrics. Choose screen print, DTG, or embroidery for your logo.',
    basePrice: 499, minQty: 20, maxQty: 5000,
    materials: [{ name: 'Cotton Pique', price_modifier: 0 }, { name: 'Dry-Fit', price_modifier: 30 }, { name: 'Premium Pique', price_modifier: 50 }],
    finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'Embroidery', price_modifier: 50 }, { name: 'DTG Print', price_modifier: 30 }],
    sizes: [{ name: 'S', width: 0, height: 0, price_modifier: 0 }, { name: 'M', width: 0, height: 0, price_modifier: 0 }, { name: 'L', width: 0, height: 0, price_modifier: 0 }, { name: 'XL', width: 0, height: 0, price_modifier: 0 }, { name: 'XXL', width: 0, height: 0, price_modifier: 20 }],
    specs: { 'Material': 'Cotton Pique', 'Weight': '220 GSM', 'Print': 'Screen / Embroidery / DTG', 'Sizes': 'S, M, L, XL, XXL', 'Colors': 'White, Black, Navy, Grey, Red' },
    delivery: '5-7 Business Days', rating: 4.6, reviews: 234,
    image: 'https://images.unsplash.com/photo-1625910513413-5fc42fba866a?w=800&h=800&fit=crop',
    features: ['Cotton Pique, Dry-Fit, or Premium Pique', 'Screen print, DTG, or embroidery', 'Available in S to XXL', '220 GSM weight', 'Perfect for teams and brands'],
  },
  'custom-caps': {
    name: 'Custom Caps & Headwear', category: 'Clothing',
    description: 'Custom embroidered caps, beanies, and visors.',
    longDescription: 'Brand your team with custom caps and headwear. Available in baseball caps, snapbacks, beanies, and visors. Premium embroidery and print options for your logo.',
    basePrice: 199, minQty: 20, maxQty: 5000,
    materials: [{ name: 'Cotton', price_modifier: 0 }, { name: 'Polyester', price_modifier: -10 }, { name: 'Wool Blend', price_modifier: 30 }],
    finishes: [{ name: 'Embroidery', price_modifier: 0 }, { name: 'Screen Print', price_modifier: -10 }],
    sizes: [{ name: 'S/M', width: 0, height: 0, price_modifier: 0 }, { name: 'L/XL', width: 0, height: 0, price_modifier: 0 }, { name: 'One Size', width: 0, height: 0, price_modifier: 0 }],
    specs: { 'Material': 'Cotton / Polyester', 'Print': 'Embroidery / Screen Print', 'Style': 'Baseball, Snapback, Beanie, Visor', 'Closure': 'Snapback / Velcro / Strap' },
    delivery: '5-7 Business Days', rating: 4.5, reviews: 178,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=800&h=800&fit=crop',
    features: ['Baseball caps, snapbacks, beanies, visors', 'Premium embroidery options', 'Cotton, Polyester, or Wool Blend', 'Multiple closure styles', 'Great for team branding'],
  },
  'custom-hoodies': {
    name: 'Custom Hoodies & Sweatshirts', category: 'Clothing',
    description: 'Printed hoodies, sweatshirts, and jackets.',
    longDescription: 'Get custom hoodies and sweatshirts for your team, brand, or event. Available in pullover, zip-up, and oversized styles. Screen print, DTG, or embroidery options.',
    basePrice: 699, minQty: 10, maxQty: 2000,
    materials: [{ name: 'Cotton Fleece', price_modifier: 0 }, { name: 'French Terry', price_modifier: 30 }, { name: 'Organic Cotton', price_modifier: 50 }],
    finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'DTG Print', price_modifier: 30 }, { name: 'Embroidery', price_modifier: 50 }],
    sizes: [{ name: 'S', width: 0, height: 0, price_modifier: 0 }, { name: 'M', width: 0, height: 0, price_modifier: 0 }, { name: 'L', width: 0, height: 0, price_modifier: 0 }, { name: 'XL', width: 0, height: 0, price_modifier: 0 }, { name: 'XXL', width: 0, height: 0, price_modifier: 30 }],
    specs: { 'Material': 'Cotton Fleece', 'Weight': '320 GSM', 'Print': 'Screen / DTG / Embroidery', 'Style': 'Pullover / Zip-Up', 'Sizes': 'S, M, L, XL, XXL' },
    delivery: '5-7 Business Days', rating: 4.6, reviews: 145,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
    features: ['Pullover, zip-up, and oversized styles', '320 GSM cotton fleece', 'Screen print, DTG, or embroidery', 'Available in S to XXL', 'Perfect for teams and brands'],
  },
  'custom-notebooks': {
    name: 'Custom Notebooks & Diaries', category: 'Stationery',
    description: 'Personalized notebooks, diaries, and planners.',
    longDescription: 'Custom notebooks and diaries with your logo or design. Available in hardcover, softcover, spiral-bound, and premium leather-bound options. Perfect for corporate gifts and branded stationery.',
    basePrice: 149, minQty: 20, maxQty: 5000,
    materials: [{ name: 'Paper', price_modifier: 0 }, { name: 'Leather', price_modifier: 100 }, { name: 'Recycled', price_modifier: -20 }],
    finishes: [{ name: 'Softcover', price_modifier: 0 }, { name: 'Hardcover', price_modifier: 50 }, { name: 'Spiral Bound', price_modifier: 20 }],
    sizes: [{ name: 'A5', width: 148, height: 210, price_modifier: 0 }, { name: 'A4', width: 210, height: 297, price_modifier: 40 }, { name: 'Pocket', width: 105, height: 148, price_modifier: -20 }],
    specs: { 'Paper': '80gsm Cream/White', 'Cover': 'Softcover / Hardcover / Leather', 'Binding': 'Perfect / Spiral / Sewn', 'Pages': '80-200 pages', 'Feature': 'Logo Foil Stamping Available' },
    delivery: '5-7 Business Days', rating: 4.7, reviews: 203,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=800&fit=crop',
    features: ['Hardcover, softcover, or spiral-bound', '80-200 page options', 'Logo foil stamping available', 'A5, A4, or Pocket sizes', 'Perfect for corporate gifts'],
  },
  'wedding-invitations': {
    name: 'Wedding Invitations & Stationery', category: 'Stationery',
    description: 'Custom wedding invitations, save the dates, and menus.',
    longDescription: 'Make your special day unforgettable with custom wedding stationery. From elegant foil-stamped invitations to rustic kraft save-the-dates, we print it all. Includes RSVP cards, menus, programmes, and thank you cards.',
    basePrice: 999, minQty: 50, maxQty: 5000,
    materials: [{ name: '300gsm Card', price_modifier: 0 }, { name: 'Cotton Paper', price_modifier: 50 }, { name: 'Handmade Paper', price_modifier: 100 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Gold Foil', price_modifier: 100 }, { name: 'Silver Foil', price_modifier: 100 }, { name: 'Embossed', price_modifier: 80 }],
    sizes: [{ name: 'A6', width: 105, height: 148, price_modifier: 0 }, { name: 'A5', width: 148, height: 210, price_modifier: 30 }, { name: '5x7 inch', width: 127, height: 178, price_modifier: 20 }],
    specs: { 'Paper': '300gsm Premium Cardstock', 'Print': 'Full Color + Foil', 'Finish': 'Matte / Foil / Embossed', 'Sizes': 'A6, A5, 5x7 inch', 'Includes': 'Envelope' },
    delivery: '5-7 Business Days', rating: 4.9, reviews: 312,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop',
    features: ['Elegant foil-stamped invitations', 'Gold, Silver, or Embossed finish', 'Includes RSVP cards and menus', 'A6, A5, or 5x7 inch sizes', 'Premium 300gsm cardstock'],
  },
  'presentation-folders': {
    name: 'Presentation Folders', category: 'Stationery',
    description: 'Custom pocket folders for business presentations.',
    longDescription: 'Professional presentation folders with custom printing. Available with single or double pockets, business card slits, and custom sizes. Perfect for corporate presentations, sales kits, and conferences.',
    basePrice: 399, minQty: 50, maxQty: 10000,
    materials: [{ name: '300gsm Card', price_modifier: 0 }, { name: '350gsm Card', price_modifier: 20 }],
    finishes: [{ name: 'Matte Lamination', price_modifier: 0 }, { name: 'Glossy Lamination', price_modifier: 15 }, { name: 'Spot UV', price_modifier: 50 }],
    sizes: [{ name: 'A4 (holds A4)', width: 240, height: 320, price_modifier: 0 }, { name: 'Letter (holds 8.5x11)', width: 240, height: 310, price_modifier: 0 }],
    specs: { 'Paper': '300gsm Premium Cardstock', 'Print': 'Full Color Both Sides', 'Pockets': 'Single / Double', 'Feature': 'Business Card Slits', 'Finish': 'Matte / Glossy Lamination' },
    delivery: '5-7 Business Days', rating: 4.7, reviews: 134,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Single or double pockets', 'Business card slits included', 'Matte, Glossy, or Spot UV finish', 'Full color both sides', 'Perfect for sales kits'],
  },
  'custom-stamps': {
    name: 'Custom Stamps & Ink', category: 'Office Supplies',
    description: 'Self-inking stamps, rubber stamps, and ink pads.',
    longDescription: 'Get custom stamps for your business. Self-inking stamps, traditional rubber stamps, pocket stamps, and name stamps. Includes stamp ink pads and refills. Perfect for offices, banks, and businesses.',
    basePrice: 249, minQty: 1, maxQty: 500,
    materials: [{ name: 'Rubber', price_modifier: 0 }, { name: 'Polymer', price_modifier: 20 }],
    finishes: [{ name: 'Self-Inking', price_modifier: 0 }, { name: 'Wood Handle', price_modifier: -30 }, { name: 'Pocket Stamp', price_modifier: 10 }],
    sizes: [{ name: 'Small (38×14mm)', width: 38, height: 14, price_modifier: 0 }, { name: 'Medium (47×18mm)', width: 47, height: 18, price_modifier: 20 }, { name: 'Large (58×22mm)', width: 58, height: 22, price_modifier: 40 }],
    specs: { 'Material': 'Premium Rubber', 'Type': 'Self-Inking / Wood / Pocket', 'Ink': 'Black / Blue / Red', 'Die Size': '38×14 to 58×22 mm', 'Refill': 'Available' },
    delivery: '2-3 Business Days', rating: 4.6, reviews: 267,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Self-inking, wood handle, or pocket stamps', 'Premium rubber material', 'Black, Blue, or Red ink', 'Multiple die sizes available', 'Ink refills available'],
  },
  'standees': {
    name: 'Standees & Display Boards', category: 'Signs & Displays',
    description: 'Portable standees, counter displays, and pop-up boards.',
    longDescription: 'Eye-catching standees for events, stores, and exhibitions. Available in roll-up, X-banner, L-banner, and counter top formats. Lightweight, portable, and easy to set up.',
    basePrice: 799, minQty: 1, maxQty: 100,
    materials: [{ name: 'Vinyl', price_modifier: 0 }, { name: 'Fabric', price_modifier: 50 }, { name: 'Polypropylene', price_modifier: -30 }],
    finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'With Stand', price_modifier: 200 }, { name: 'Premium Frame', price_modifier: 500 }],
    sizes: [{ name: 'Counter (6×12 inch)', width: 152, height: 305, price_modifier: 0 }, { name: 'Medium (24×63 inch)', width: 610, height: 1600, price_modifier: 400 }, { name: 'Large (33×80 inch)', width: 838, height: 2032, price_modifier: 800 }],
    specs: { 'Material': 'Premium Vinyl / Fabric', 'Print': 'Full Color Eco-Solvent', 'Stand': 'Roll-Up / X-Frame / L-Frame', 'Carry Case': 'Included', 'Setup': 'Tool-free' },
    delivery: '3-5 Business Days', rating: 4.7, reviews: 189,
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=800&fit=crop',
    features: ['Roll-up, X-banner, L-banner formats', 'Lightweight and portable', 'Tool-free setup', 'Carry case included', 'Counter to large formats'],
  },
  'foam-boards': {
    name: 'Foam Board Printing', category: 'Signs & Displays',
    description: 'Lightweight foam board signs for indoor use.',
    longDescription: 'Premium foam board printing for presentations, displays, and signage. Lightweight yet rigid, perfect for indoor use. Available in 5mm and 10mm thickness.',
    basePrice: 499, minQty: 1, maxQty: 100,
    materials: [{ name: '5mm Foam', price_modifier: 0 }, { name: '10mm Foam', price_modifier: 100 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 20 }],
    sizes: [{ name: 'A3', width: 297, height: 420, price_modifier: 0 }, { name: 'A2', width: 420, height: 594, price_modifier: 200 }, { name: 'A1', width: 594, height: 841, price_modifier: 400 }],
    specs: { 'Material': '5mm / 10mm Foam Board', 'Print': 'Full Color UV', 'Finish': 'Matte / Glossy', 'Use': 'Indoor Displays' },
    delivery: '2-4 Business Days', rating: 4.6, reviews: 145,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Lightweight yet rigid', '5mm or 10mm thickness', 'Full color UV printing', 'Matte or Glossy finish', 'Perfect for presentations'],
  },
  'tent-cards': {
    name: 'Tent Cards & Table Signs', category: 'Signs & Displays',
    description: 'Tri-fold tent cards for tables and counters.',
    longDescription: 'Custom tent cards and table signs for restaurants, events, and promotions. Tri-fold design that stands on tables and counters.',
    basePrice: 199, minQty: 25, maxQty: 5000,
    materials: [{ name: '300gsm Card', price_modifier: 0 }, { name: '350gsm Card', price_modifier: 10 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 10 }],
    sizes: [{ name: 'A6 Tent', width: 105, height: 148, price_modifier: 0 }, { name: 'A5 Tent', width: 148, height: 210, price_modifier: 30 }],
    specs: { 'Paper': '300gsm Cardstock', 'Print': 'Full Color Both Sides', 'Fold': 'Tri-Fold Tent', 'Use': 'Table/Counter Display' },
    delivery: '2-4 Business Days', rating: 4.5, reviews: 98,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Tri-fold tent design', 'Stands on tables and counters', 'Full color both sides', 'A6 or A5 sizes', 'Great for restaurants and events'],
  },
  'loyalty-cards': {
    name: 'Loyalty Cards', category: 'Business Cards',
    description: 'Custom loyalty and membership cards.',
    longDescription: 'Keep customers coming back with custom loyalty cards. Available in standard and mini sizes with full-color printing. Include barcode, QR code, or stamp grid.',
    basePrice: 499, minQty: 100, maxQty: 10000,
    materials: [{ name: '350gsm Card', price_modifier: 0 }, { name: 'PVC', price_modifier: 50 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }, { name: 'Spot UV', price_modifier: 40 }],
    sizes: [{ name: 'Standard (85×55)', width: 85, height: 55, price_modifier: 0 }, { name: 'Mini (70×28)', width: 70, height: 28, price_modifier: -20 }],
    specs: { 'Paper': '350gsm / PVC', 'Print': 'Full Color Both Sides', 'Feature': 'Barcode / QR Code / Stamp Grid', 'Size': 'Standard or Mini' },
    delivery: '3-5 Business Days', rating: 4.7, reviews: 167,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=800&fit=crop',
    features: ['Standard and mini sizes', 'Barcode, QR code, or stamp grid', '350gsm card or PVC', 'Full color both sides', 'Keep customers coming back'],
  },
  'gift-certificates': {
    name: 'Gift Certificates & Vouchers', category: 'Marketing',
    description: 'Custom gift certificates and vouchers.',
    longDescription: 'Professional gift certificates and vouchers for your business. Full-color printing on premium cardstock with optional foil accents.',
    basePrice: 399, minQty: 50, maxQty: 10000,
    materials: [{ name: '300gsm Card', price_modifier: 0 }, { name: '350gsm Card', price_modifier: 15 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Gold Foil', price_modifier: 80 }],
    sizes: [{ name: 'A6', width: 105, height: 148, price_modifier: 0 }, { name: 'DL', width: 99, height: 210, price_modifier: 10 }],
    specs: { 'Paper': '300gsm Premium Card', 'Print': 'Full Color + Foil', 'Feature': 'Serial Number / Barcode' },
    delivery: '3-5 Business Days', rating: 4.6, reviews: 89,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Professional gift certificates', 'Full-color premium printing', 'Optional gold foil accents', 'Serial number and barcode', 'A6 or DL sizes'],
  },
  'button-badges': {
    name: 'Button Badges & Pins', category: 'Promotional',
    description: 'Custom button badges and pin-back badges.',
    longDescription: 'Custom button badges for events, teams, and promotions. Pin-back design with full-color printing. Available in multiple sizes.',
    basePrice: 49, minQty: 50, maxQty: 10000,
    materials: [{ name: 'Metal + Paper', price_modifier: 0 }],
    finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'Mirror Finish', price_modifier: 20 }],
    sizes: [{ name: '1 inch', width: 25, height: 25, price_modifier: 0 }, { name: '1.5 inch', width: 38, height: 38, price_modifier: 10 }, { name: '2 inch', width: 50, height: 50, price_modifier: 20 }, { name: '3 inch', width: 75, height: 75, price_modifier: 40 }],
    specs: { 'Material': 'Metal + Paper', 'Print': 'Full Color', 'Back': 'Pin-Back', 'Sizes': '1" to 3"' },
    delivery: '3-5 Business Days', rating: 4.8, reviews: 312,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Pin-back design', 'Full-color printing', '1 inch to 3 inch sizes', 'Standard or Mirror finish', 'Great for events and promotions'],
  },
  'custom-keychains': {
    name: 'Custom Keychains', category: 'Promotional',
    description: 'Printed and engraved keychains.',
    longDescription: 'Custom keychains for giveaways, events, and branding. Available in acrylic, metal, and leather with print or engraving.',
    basePrice: 79, minQty: 50, maxQty: 10000,
    materials: [{ name: 'Acrylic', price_modifier: 0 }, { name: 'Metal', price_modifier: 30 }, { name: 'Leather', price_modifier: 50 }],
    finishes: [{ name: 'Print', price_modifier: 0 }, { name: 'Engraved', price_modifier: 20 }],
    sizes: [{ name: 'Standard (50mm)', width: 50, height: 50, price_modifier: 0 }, { name: 'Large (75mm)', width: 75, height: 75, price_modifier: 20 }],
    specs: { 'Material': 'Acrylic / Metal / Leather', 'Print': 'Full Color / Engraved', 'Ring': 'Included', 'Packaging': 'Individual' },
    delivery: '5-7 Business Days', rating: 4.6, reviews: 234,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Acrylic, Metal, or Leather', 'Print or Engraved options', 'Standard 50mm or Large 75mm', 'Ring included', 'Individual packaging'],
  },
  'table-covers': {
    name: 'Custom Table Covers', category: 'Events & Displays',
    description: 'Printed tablecloths, runners, and mats.',
    longDescription: 'Custom table covers for events, trade shows, and promotions. Full-color printing on polyester or cotton. Includes fitted and throw styles.',
    basePrice: 999, minQty: 1, maxQty: 100,
    materials: [{ name: 'Polyester', price_modifier: 0 }, { name: 'Cotton', price_modifier: 50 }],
    finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'Fitted', price_modifier: 100 }, { name: 'With Runner', price_modifier: 200 }],
    sizes: [{ name: '6ft Table', width: 183, height: 122, price_modifier: 0 }, { name: '8ft Table', width: 244, height: 122, price_modifier: 200 }],
    specs: { 'Material': 'Polyester / Cotton', 'Print': 'Full Color Dye Sublimation', 'Style': 'Throw / Fitted', 'Washable': 'Yes' },
    delivery: '5-7 Business Days', rating: 4.7, reviews: 123,
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=800&fit=crop',
    features: ['Full-color dye sublimation', 'Polyester or Cotton material', 'Throw or Fitted styles', 'Washable', '6ft or 8ft table sizes'],
  },
  'custom-flags': {
    name: 'Custom Flags & Banners', category: 'Events & Displays',
    description: 'Teardrop, rectangular, and table flags.',
    longDescription: 'Custom flags for events, offices, and promotions. Teardrop, rectangular, table, and pole flags. Full-color printing on polyester fabric.',
    basePrice: 499, minQty: 1, maxQty: 100,
    materials: [{ name: 'Polyester', price_modifier: 0 }],
    finishes: [{ name: 'With Pole', price_modifier: 0 }, { name: 'With Stand', price_modifier: 300 }],
    sizes: [{ name: 'Table Flag', width: 150, height: 200, price_modifier: 0 }, { name: 'Teardrop', width: 600, height: 1200, price_modifier: 300 }, { name: 'Rectangle', width: 900, height: 1500, price_modifier: 500 }],
    specs: { 'Material': 'Polyester Fabric', 'Print': 'Full Color Dye Sublimation', 'Pole': 'Fiberglass / Metal', 'Base': 'Cross / Water Bag' },
    delivery: '5-7 Business Days', rating: 4.6, reviews: 156,
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=800&fit=crop',
    features: ['Teardrop, rectangular, table flags', 'Full-color dye sublimation', 'Fiberglass or Metal pole', 'Cross or Water Bag base', 'Perfect for events and offices'],
  },
  'custom-tote-bags': {
    name: 'Custom Tote Bags', category: 'Bags & Packaging',
    description: 'Printed cotton and canvas tote bags.',
    longDescription: 'Custom tote bags for events, stores, and promotions. Available in cotton, canvas, and jute with screen print or sublimation.',
    basePrice: 149, minQty: 20, maxQty: 5000,
    materials: [{ name: 'Cotton', price_modifier: 0 }, { name: 'Canvas', price_modifier: 30 }, { name: 'Jute', price_modifier: 20 }],
    finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'Sublimation', price_modifier: 20 }],
    sizes: [{ name: 'Standard (35×40cm)', width: 350, height: 400, price_modifier: 0 }, { name: 'Large (45×50cm)', width: 450, height: 500, price_modifier: 30 }],
    specs: { 'Material': 'Cotton / Canvas / Jute', 'Print': 'Screen Print / Sublimation', 'Handle': 'Self-Fabric', 'GSM': '10-12 oz' },
    delivery: '5-7 Business Days', rating: 4.7, reviews: 289,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=800&fit=crop',
    features: ['Cotton, Canvas, or Jute material', 'Screen print or Sublimation', 'Standard or Large sizes', 'Self-Fabric handle', '10-12 oz GSM'],
  },
  'custom-umbrellas': {
    name: 'Custom Umbrellas', category: 'Promotional',
    description: 'Printed umbrellas for branding.',
    longDescription: 'Custom umbrellas with your logo or design. Compact, golf, and corporate styles. Full-color print on canopy.',
    basePrice: 599, minQty: 10, maxQty: 1000,
    materials: [{ name: 'Polyester', price_modifier: 0 }, { name: 'Nylon', price_modifier: -30 }],
    finishes: [{ name: 'Single Side Print', price_modifier: 0 }, { name: 'Double Side Print', price_modifier: 100 }],
    sizes: [{ name: 'Compact (42")', width: 0, height: 0, price_modifier: 0 }, { name: 'Golf (60")', width: 0, height: 0, price_modifier: 200 }],
    specs: { 'Material': 'Polyester / Nylon', 'Print': 'Full Color', 'Style': 'Compact / Golf / Straight', 'Auto': 'Manual / Auto Open' },
    delivery: '7-10 Business Days', rating: 4.5, reviews: 89,
    image: 'https://images.unsplash.com/photo-1521656693884-cee73588d390?w=800&h=800&fit=crop',
    features: ['Compact or Golf styles', 'Single or double side print', 'Polyester or Nylon material', 'Manual or Auto Open', 'Full-color canopy printing'],
  },
  'photo-albums': {
    name: 'Custom Photo Albums', category: 'Gifts & Photo',
    description: 'Personalized photo albums and books.',
    longDescription: 'Create custom photo albums with your photos. Hardcover, layflat, and softcover options. Perfect for weddings, families, and corporate gifts.',
    basePrice: 599, minQty: 1, maxQty: 500,
    materials: [{ name: 'Paper Pages', price_modifier: 0 }, { name: 'Layflat', price_modifier: 100 }],
    finishes: [{ name: 'Softcover', price_modifier: 0 }, { name: 'Hardcover', price_modifier: 100 }, { name: 'Layflat Hardcover', price_modifier: 200 }],
    sizes: [{ name: 'A5 (20×15cm)', width: 200, height: 150, price_modifier: 0 }, { name: 'A4 (30×20cm)', width: 300, height: 200, price_modifier: 150 }, { name: 'Square (20×20cm)', width: 200, height: 200, price_modifier: 50 }],
    specs: { 'Pages': '20-100 pages', 'Cover': 'Softcover / Hardcover', 'Paper': '250gsm Matte', 'Binding': 'Perfect / Layflat' },
    delivery: '5-7 Business Days', rating: 4.8, reviews: 234,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
    features: ['Hardcover, layflat, or softcover', '20-100 page options', '250gsm matte paper', 'Perfect or Layflat binding', 'Great for weddings and gifts'],
  },
  'photo-frames': {
    name: 'Custom Photo Frames', category: 'Gifts & Photo',
    description: 'LED, acrylic, and wooden photo frames.',
    longDescription: 'Custom photo frames with LED lighting, acrylic panels, and wooden frames. Upload your photo and we print and frame it.',
    basePrice: 499, minQty: 1, maxQty: 200,
    materials: [{ name: 'Acrylic', price_modifier: 0 }, { name: 'Wood', price_modifier: 50 }, { name: 'LED Acrylic', price_modifier: 100 }],
    finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'With LED', price_modifier: 150 }],
    sizes: [{ name: '4×6 inch', width: 102, height: 152, price_modifier: 0 }, { name: '5×7 inch', width: 127, height: 178, price_modifier: 30 }, { name: '8×10 inch', width: 203, height: 254, price_modifier: 80 }],
    specs: { 'Material': 'Acrylic / Wood / LED', 'Print': 'Photo Print', 'Size': '4×6 to 8×10 inch', 'Stand': 'Included' },
    delivery: '3-5 Business Days', rating: 4.7, reviews: 189,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Acrylic, Wood, or LED options', 'Photo print included', '4×6 to 8×10 inch sizes', 'Stand included', 'LED lighting option available'],
  },
  'custom-coasters': {
    name: 'Custom Coasters', category: 'Gifts & Promotional',
    description: 'Printed coasters in various materials.',
    longDescription: 'Custom coasters for weddings, events, and branding. Available in cork, leather, acrylic, and ceramic with full-color printing.',
    basePrice: 99, minQty: 25, maxQty: 5000,
    materials: [{ name: 'Cork', price_modifier: 0 }, { name: 'Acrylic', price_modifier: 20 }, { name: 'Ceramic', price_modifier: 30 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 10 }],
    sizes: [{ name: 'Round (3.5")', width: 89, height: 89, price_modifier: 0 }, { name: 'Square (3.5")', width: 89, height: 89, price_modifier: 0 }, { name: 'Large (4")', width: 102, height: 102, price_modifier: 15 }],
    specs: { 'Material': 'Cork / Acrylic / Ceramic', 'Print': 'Full Color', 'Shape': 'Round / Square', 'Thickness': '3mm / 5mm' },
    delivery: '3-5 Business Days', rating: 4.6, reviews: 156,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Cork, Acrylic, or Ceramic', 'Round or Square shapes', 'Full-color printing', '3mm or 5mm thickness', 'Great for weddings and events'],
  },
  'custom-pens': {
    name: 'Custom Pens', category: 'Promotional',
    description: 'Printed and engraved pens.',
    longDescription: 'Custom pens for corporate gifting and promotions. Ballpoint, rollerball, and fountain pens with logo printing or engraving.',
    basePrice: 29, minQty: 50, maxQty: 10000,
    materials: [{ name: 'Plastic', price_modifier: 0 }, { name: 'Metal', price_modifier: 30 }, { name: 'Wood', price_modifier: 20 }],
    finishes: [{ name: 'Print', price_modifier: 0 }, { name: 'Engraved', price_modifier: 15 }],
    sizes: [{ name: 'Standard', width: 0, height: 0, price_modifier: 0 }],
    specs: { 'Material': 'Plastic / Metal / Wood', 'Print': 'Logo Print / Engraved', 'Ink': 'Black / Blue', 'Type': 'Ballpoint / Rollerball' },
    delivery: '3-5 Business Days', rating: 4.5, reviews: 345,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Plastic, Metal, or Wood', 'Logo print or Engraved', 'Ballpoint or Rollerball', 'Black or Blue ink', 'Great for corporate gifting'],
  },
  'custom-calendars': {
    name: 'Custom Calendars', category: 'Stationery',
    description: 'Desk, wall, and magnet calendars.',
    longDescription: 'Custom calendars with your branding. Desk calendars, wall calendars, and fridge magnet calendars. Full-color printing.',
    basePrice: 199, minQty: 25, maxQty: 5000,
    materials: [{ name: 'Paper', price_modifier: 0 }, { name: 'Magnet', price_modifier: 20 }],
    finishes: [{ name: 'Saddle Stitch', price_modifier: 0 }, { name: 'Wire Bound', price_modifier: 20 }, { name: 'Magnet', price_modifier: 30 }],
    sizes: [{ name: 'Desk (A5)', width: 148, height: 210, price_modifier: 0 }, { name: 'Wall (A4)', width: 210, height: 297, price_modifier: 40 }, { name: 'Wall (A3)', width: 297, height: 420, price_modifier: 80 }],
    specs: { 'Paper': '250gsm Art Paper', 'Print': 'Full Color', 'Type': 'Desk / Wall / Magnet', 'Pages': '12-13 sheets' },
    delivery: '5-7 Business Days', rating: 4.6, reviews: 178,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop',
    features: ['Desk, wall, and magnet types', 'Full-color printing', '250gsm art paper', '12-13 sheets', 'Saddle Stitch, Wire Bound, or Magnet'],
  },
  'water-bottles': {
    name: 'Custom Water Bottles', category: 'Drinkware',
    description: 'Printed stainless steel and plastic bottles.',
    longDescription: 'Custom water bottles for sports, events, and branding. Stainless steel, aluminum, and BPA-free plastic with full-color print.',
    basePrice: 299, minQty: 20, maxQty: 2000,
    materials: [{ name: 'Stainless Steel', price_modifier: 0 }, { name: 'Aluminum', price_modifier: -30 }, { name: 'Plastic (BPA-free)', price_modifier: -50 }],
    finishes: [{ name: 'Print', price_modifier: 0 }, { name: 'Engraved', price_modifier: 30 }],
    sizes: [{ name: '500ml', width: 0, height: 0, price_modifier: 0 }, { name: '750ml', width: 0, height: 0, price_modifier: 30 }, { name: '1L', width: 0, height: 0, price_modifier: 60 }],
    specs: { 'Material': 'Stainless Steel / Aluminum / Plastic', 'Print': 'Screen Print / Laser Engraved', 'Capacity': '500ml / 750ml / 1L', 'Lid': 'Screw / Flip / Sport' },
    delivery: '5-7 Business Days', rating: 4.6, reviews: 234,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    features: ['Stainless Steel, Aluminum, or BPA-free Plastic', 'Screen Print or Laser Engraved', '500ml, 750ml, or 1L capacity', 'Screw, Flip, or Sport lid', 'Great for sports and events'],
  },
  'custom-tumblers': {
    name: 'Custom Tumblers', category: 'Drinkware',
    description: 'Printed travel tumblers and mugs.',
    longDescription: 'Custom tumblers for events and branding. Insulated stainless steel tumblers with full-color sublimation print.',
    basePrice: 399, minQty: 10, maxQty: 2000,
    materials: [{ name: 'Stainless Steel', price_modifier: 0 }, { name: 'Plastic', price_modifier: -50 }],
    finishes: [{ name: 'Sublimation', price_modifier: 0 }, { name: 'Screen Print', price_modifier: -20 }],
    sizes: [{ name: '12oz', width: 0, height: 0, price_modifier: 0 }, { name: '16oz', width: 0, height: 0, price_modifier: 30 }, { name: '20oz', width: 0, height: 0, price_modifier: 50 }],
    specs: { 'Material': 'Stainless Steel', 'Print': 'Sublimation / Screen Print', 'Capacity': '12oz / 16oz / 20oz', 'Insulated': 'Yes' },
    delivery: '5-7 Business Days', rating: 4.7, reviews: 189,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop',
    features: ['Insulated stainless steel', 'Sublimation or Screen Print', '12oz, 16oz, or 20oz capacity', 'Full-color print', 'Great for events and branding'],
  },
  'travel-mugs': {
    name: 'Custom Travel Mugs', category: 'Drinkware',
    description: 'Insulated travel mugs with logo.',
    longDescription: 'Custom travel mugs for commuting and events. Double-wall insulated stainless steel with your logo or design.',
    basePrice: 449, minQty: 10, maxQty: 2000,
    materials: [{ name: 'Stainless Steel', price_modifier: 0 }, { name: 'Ceramic Inner', price_modifier: 30 }],
    finishes: [{ name: 'Print', price_modifier: 0 }, { name: 'Engraved', price_modifier: 40 }],
    sizes: [{ name: '12oz', width: 0, height: 0, price_modifier: 0 }, { name: '16oz', width: 0, height: 0, price_modifier: 40 }],
    specs: { 'Material': 'Stainless Steel', 'Print': 'Screen Print / Engraved', 'Capacity': '12oz / 16oz', 'Insulated': 'Double Wall' },
    delivery: '5-7 Business Days', rating: 4.7, reviews: 156,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop',
    features: ['Double-wall insulated stainless steel', 'Screen Print or Engraved', '12oz or 16oz capacity', 'Ceramic inner option', 'Perfect for commuting'],
  },
};

const SAMPLE_REVIEWS = [
  { name: 'Priya S.', rating: 5, date: '2 weeks ago', title: 'Excellent quality!', content: 'The cards came out perfect. The matte finish feels premium and the print quality is sharp. Will definitely order again.', helpful: 24 },
  { name: 'Rahul M.', rating: 5, date: '1 month ago', title: 'Fast delivery', content: 'Ordered 500 cards, received them in 3 days. Great quality for the price. The team was very helpful with the design.', helpful: 18 },
  { name: 'Anjali P.', rating: 4, date: '3 weeks ago', title: 'Good but minor issue', content: 'Overall great cards. One minor alignment issue on a few cards but customer service resolved it quickly.', helpful: 12 },
];

const FAQ_DATA = [
  { q: 'What file formats do you accept?', a: 'We accept PDF, AI, PSD, PNG, and JPG files. For best results, we recommend PDF with vector artwork and 300 DPI resolution.' },
  { q: 'How long does delivery take?', a: 'Standard delivery is 2-7 business days depending on the product. Express delivery (1-2 days) is available at checkout for an additional fee.' },
  { q: 'Can I request a proof before printing?', a: 'Yes! We provide a digital proof for all orders above 500 pcs. You can approve or request changes before we go to print.' },
  { q: 'What is the minimum order quantity?', a: 'Minimum order quantity varies by product. Most products start at 50-100 pcs. Contact us for custom smaller orders.' },
  { q: 'Do you offer bulk discounts?', a: 'Yes! We offer volume discounts starting at 500 pieces. The more you order, the more you save — up to 44% off on large orders.' },
];

const RELATED_PRODUCTS = [
  { name: 'Premium Matte Business Cards', slug: 'premium-matte-business-cards', image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=400&fit=crop', price: 499 },
  { name: 'Metallic Foil Business Cards', slug: 'metallic-foil-business-cards', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop', price: 899 },
  { name: 'A5 Double-Sided Flyers', slug: 'a5-flyers', image: 'https://images.unsplash.com/photo-1586281380183-ea4a351cc8b6?w=400&h=400&fit=crop', price: 299 },
  { name: 'Tri-Fold Brochures', slug: 'tri-fold-brochures', image: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=400&h=400&fit=crop', price: 599 },
];

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = PRODUCT_DATA[slug];

  const [totalPrice, setTotalPrice] = useState(product?.basePrice || 499);
  const [quantity, setQuantity] = useState(product?.minQty || 100);
  const [activeTab, setActiveTab] = useState<'description' | 'templates'>('description');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWish, removeItem: removeWish, productIds } = useWishlistStore();
  const isWished = productIds.includes(slug);

  const [selectedMaterial, setSelectedMaterial] = useState(product?.materials[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]?.name || 'Standard');
  const [selectedFinish, setSelectedFinish] = useState(product?.finishes[0]?.name || 'Matte');

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const mat = product.materials.find(m => m.name === selectedMaterial);
    const size = product.sizes.find(s => s.name === selectedSize);
    const fin = product.finishes.find(f => f.name === selectedFinish);
    return product.basePrice + (mat?.price_modifier || 0) + (size?.price_modifier || 0) + (fin?.price_modifier || 0);
  }, [product, selectedMaterial, selectedSize, selectedFinish]);

  const calculatedTotal = useMemo(() => {
    return unitPrice * quantity;
  }, [unitPrice, quantity]);

  const pricingTiers = useMemo(() => {
    if (!product) return [];
    const tiers = [100, 200, 300, 500, 1000, 2000, 5000, 10000];
    const filtered = tiers.filter(t => t >= product.minQty && t <= product.maxQty);
    if (filtered.length === 0 || filtered[0] !== product.minQty) {
      filtered.unshift(product.minQty);
    }
    return filtered.map(qty => {
      let discount = 0;
      if (qty >= 10000) discount = 0.44;
      else if (qty >= 5000) discount = 0.35;
      else if (qty >= 2000) discount = 0.25;
      else if (qty >= 1000) discount = 0.15;
      else if (qty >= 500) discount = 0.10;
      else if (qty >= 300) discount = 0.05;
      else if (qty >= 200) discount = 0.03;
      const baseTotal = unitPrice * qty;
      const discounted = Math.round(baseTotal * (1 - discount));
      return { qty, total: discounted, perPiece: Math.round(discounted / qty), discount };
    });
  }, [product, unitPrice]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Container>
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
            <p className="text-gray-500 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/products" className="px-6 py-3 bg-[#ED1C24] text-white rounded font-semibold hover:bg-red-700 transition-colors inline-block">
              Browse Products
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      product_id: slug,
      product_name: product.name,
      product_image: product.image || '/placeholder.jpg',
      quantity,
      material: selectedMaterial,
      size: selectedSize,
      finish: selectedFinish,
      unit_price: unitPrice,
    });
  };

  const features = product.features || [
    'Premium quality printing',
    'Fast turnaround time',
    'Full color digital printing',
    'Free design proof',
    'Satisfaction guaranteed',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        {/* Breadcrumb */}
        <div className="py-3 border-b border-gray-200 bg-white">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#ED1C24] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-[#ED1C24] transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-gray-200 mt-4">
          {/* Left: Product Image (6 cols) */}
          <div className="lg:col-span-6 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="aspect-square bg-gray-50 border border-gray-200 rounded overflow-hidden mb-4">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">{product.name}</p>
                  </div>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 border-2 border-[#ED1C24] rounded cursor-pointer overflow-hidden">
                  {product.image && (
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details (6 cols) */}
          <div className="lg:col-span-6 p-6">
            {/* Brand */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">PrintOrbit</p>

            {/* Product Name */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Feature List */}
            <ul className="space-y-2 mb-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-[#ED1C24] mt-0.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Learn More */}
            <button className="text-sm text-[#ED1C24] font-semibold hover:underline mb-4">
              Learn More →
            </button>

            {/* Starting Price */}
            <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">Starting at</p>
              <p className="text-3xl font-bold text-[#ED1C24]">{formatPrice(product.basePrice)}</p>
              <p className="text-sm text-gray-500">for {product.minQty} pieces</p>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Truck className="w-4 h-4 text-gray-400" />
              <span>Ships out in <strong>{product.delivery}</strong></span>
            </div>

            {/* Specs Quick View */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specs).slice(0, 6).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-gray-500">{key}</span>
                    <span className="text-sm font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customise This Product + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-gray-200 mt-4">
          {/* Customise Section */}
          <div className="lg:col-span-8 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#ED1C24]" />
              Customise this product
            </h2>

            {/* Material Selection */}
            {product.materials.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Material</label>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((mat) => (
                    <button
                      key={mat.name}
                      onClick={() => setSelectedMaterial(mat.name)}
                      className={`px-4 py-2 border rounded text-sm font-medium transition-colors ${
                        selectedMaterial === mat.name
                          ? 'border-[#ED1C24] bg-[#ED1C24] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {mat.name}
                      {mat.price_modifier !== 0 && (
                        <span className="text-xs ml-1">
                          ({mat.price_modifier > 0 ? '+' : ''}{formatPrice(mat.price_modifier)})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`px-4 py-2 border rounded text-sm font-medium transition-colors ${
                        selectedSize === size.name
                          ? 'border-[#ED1C24] bg-[#ED1C24] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size.name}
                      {size.price_modifier !== 0 && (
                        <span className="text-xs ml-1">
                          ({size.price_modifier > 0 ? '+' : ''}{formatPrice(size.price_modifier)})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Finish Selection */}
            {product.finishes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Finish</label>
                <div className="flex flex-wrap gap-2">
                  {product.finishes.map((fin) => (
                    <button
                      key={fin.name}
                      onClick={() => setSelectedFinish(fin.name)}
                      className={`px-4 py-2 border rounded text-sm font-medium transition-colors ${
                        selectedFinish === fin.name
                          ? 'border-[#ED1C24] bg-[#ED1C24] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {fin.name}
                      {fin.price_modifier !== 0 && (
                        <span className="text-xs ml-1">
                          ({fin.price_modifier > 0 ? '+' : ''}{formatPrice(fin.price_modifier)})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const step = quantity >= 1000 ? 100 : quantity >= 100 ? 10 : 1;
                    const newVal = Math.max(product.minQty, quantity - step);
                    setQuantity(newVal);
                  }}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:border-[#ED1C24] hover:text-[#ED1C24] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || product.minQty;
                    setQuantity(Math.max(product.minQty, Math.min(product.maxQty, val)));
                  }}
                  className="w-24 h-10 px-3 border border-gray-300 rounded text-center text-sm font-semibold text-gray-900 focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] outline-none"
                />
                <button
                  onClick={() => {
                    const step = quantity >= 1000 ? 100 : quantity >= 100 ? 10 : 1;
                    const newVal = Math.min(product.maxQty, quantity + step);
                    setQuantity(newVal);
                  }}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:border-[#ED1C24] hover:text-[#ED1C24] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {/* Quick Quantity */}
              <div className="flex gap-2 mt-3">
                {[100, 250, 500, 1000, 2500, 5000].filter(q => q >= product.minQty && q <= product.maxQty).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuantity(q)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      quantity === q
                        ? 'bg-[#ED1C24] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {q >= 1000 ? `${q / 1000}K` : q}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Table */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Pricing Table — Volume Discounts</h3>
              <div className="border border-gray-200 rounded overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-2 font-semibold text-gray-700">Quantity</th>
                      <th className="text-right px-4 py-2 font-semibold text-gray-700">Total Price</th>
                      <th className="text-right px-4 py-2 font-semibold text-gray-700">Per Piece</th>
                      <th className="text-right px-4 py-2 font-semibold text-gray-700">Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingTiers.map((tier) => (
                      <tr
                        key={tier.qty}
                        className={`border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                          quantity === tier.qty ? 'bg-[#ED1C24]/5' : ''
                        }`}
                        onClick={() => setQuantity(tier.qty)}
                      >
                        <td className="px-4 py-3 font-medium text-gray-900">{tier.qty.toLocaleString()} Pieces</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatPrice(tier.total)}</td>
                        <td className="px-4 py-3 text-right text-gray-600">{formatPrice(tier.perPiece)}/pc</td>
                        <td className="px-4 py-3 text-right">
                          {tier.discount > 0 ? (
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                              Save {Math.round(tier.discount * 100)}%
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar (Sticky) */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

              {/* Selected Options */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Material</span>
                  <span className="font-medium text-gray-900">{selectedMaterial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Size</span>
                  <span className="font-medium text-gray-900">{selectedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Finish</span>
                  <span className="font-medium text-gray-900">{selectedFinish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quantity</span>
                  <span className="font-medium text-gray-900">{quantity.toLocaleString()} pcs</span>
                </div>
              </div>

              <hr className="border-gray-200 my-4" />

              {/* Price */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Unit Price</span>
                  <span className="font-medium text-gray-900 text-sm">{formatPrice(unitPrice)}/pc</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Subtotal</span>
                  <span className="font-medium text-gray-900 text-sm">{formatPrice(calculatedTotal)}</span>
                </div>
              </div>

              <hr className="border-gray-200 my-4" />

              <div className="flex justify-between items-baseline mb-6">
                <span className="text-base font-bold text-gray-900">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#ED1C24]">{formatPrice(calculatedTotal)}</span>
                  <span className="text-xs text-gray-500 block">{formatPrice(unitPrice)} per piece</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href={`/design-studio?product=${slug}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#ED1C24] text-white rounded font-semibold hover:bg-red-700 transition-colors"
                >
                  Personalise this product
                </Link>
                <button
                  onClick={() => {
                    handleAddToCart();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded font-semibold hover:border-gray-400 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload your own design
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#ED1C24] text-[#ED1C24] rounded font-semibold hover:bg-[#ED1C24] hover:text-white transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Customise & Buy
                </button>
              </div>

              {/* Trust Signals */}
              <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Free shipping on orders above ₹2,000</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Express delivery available</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Info className="w-3.5 h-3.5" />
                  <span>100% quality guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Tabs */}
        <div className="bg-white border border-gray-200 mt-4">
          <div className="flex border-b border-gray-200">
            {(['description', 'templates'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-[#ED1C24] border-[#ED1C24]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab === 'description' ? 'Description' : 'File Setup Templates'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">{product.longDescription}</p>
                <h4 className="text-sm font-bold text-gray-900 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#ED1C24] mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'templates' && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Download our file setup templates to ensure your artwork prints perfectly. Use these templates to set up your design with the correct bleed, trim, and safe zones.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Adobe Illustrator (.ai)', 'PDF Template', 'Photoshop (.psd)', 'Canva Template'].map((template, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded hover:border-[#ED1C24] transition-colors cursor-pointer">
                      <FileText className="w-8 h-8 text-[#ED1C24]" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{template}</p>
                        <p className="text-xs text-gray-500">Click to download</p>
                      </div>
                      <Download className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-200 mt-4">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {FAQ_DATA.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Reviews */}
        <div className="bg-white border border-gray-200 mt-4">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {SAMPLE_REVIEWS.map((review, i) => (
              <div key={i} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">{review.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{review.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{review.content}</p>
                <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#ED1C24] transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* You Might Also Like */}
        <div className="bg-white border border-gray-200 mt-4 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">You Might Also Like</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {RELATED_PRODUCTS.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/products/${rp.slug}`}
                  className="group border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-50 overflow-hidden">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{rp.name}</p>
                    <p className="text-sm font-bold text-[#ED1C24] mt-1">Starting at {formatPrice(rp.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
