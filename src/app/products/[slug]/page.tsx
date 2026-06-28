'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Star, ShoppingCart, Heart, Share2, Truck, Shield, Clock, RotateCcw,
  ChevronRight, ChevronDown, Minus, Plus, Check, FileText, Download,
  MessageSquare, ThumbsUp, Package, Zap, Layout, Upload, Wand2, Brain,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import ProductConfigurator from '@/components/products/ProductConfigurator';
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
  },
};

const SAMPLE_REVIEWS = [
  { name: 'Priya S.', rating: 5, date: '2 weeks ago', title: 'Excellent quality!', content: 'The cards came out perfect. The matte finish feels premium and the print quality is sharp. Will definitely order again.', helpful: 24 },
  { name: 'Rahul M.', rating: 5, date: '1 month ago', title: 'Fast delivery', content: 'Ordered 500 cards, received them in 3 days. Great quality for the price. The team was very helpful with the design.', helpful: 18 },
  { name: 'Anjali P.', rating: 4, date: '3 weeks ago', title: 'Good but minor issue', content: 'Overall great cards. One minor alignment issue on a few cards but customer service resolved it quickly.', helpful: 12 },
];

const PRODUCT_TEMPLATES = [
  { id: 't1', name: 'Modern Minimalist', category: 'Business', colors: ['#0B57D0', '#FFFFFF', '#1F2937'], isPremium: false },
  { id: 't2', name: 'Bold & Creative', category: 'Creative', colors: ['#FF6B00', '#FFFFFF', '#0F172A'], isPremium: false },
  { id: 't3', name: 'Elegant Gold', category: 'Luxury', colors: ['#0F172A', '#C9A84C', '#FFFFFF'], isPremium: true },
  { id: 't4', name: 'Corporate Blue', category: 'Corporate', colors: ['#0B57D0', '#DBEAFE', '#1F2937'], isPremium: false },
  { id: 't5', name: 'Fresh & Clean', category: 'Startup', colors: ['#16A34A', '#FFFFFF', '#0F172A'], isPremium: false },
  { id: 't6', name: 'Warm & Friendly', category: 'Restaurant', colors: ['#EA580C', '#FFFFFF', '#1F2937'], isPremium: false },
  { id: 't7', name: 'Tech & Modern', category: 'Technology', colors: ['#7C3AED', '#FFFFFF', '#0F172A'], isPremium: true },
  { id: 't8', name: 'Natural Organic', category: 'Eco', colors: ['#16A34A', '#FEF3C7', '#1F2937'], isPremium: false },
];

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = PRODUCT_DATA[slug];

  const [totalPrice, setTotalPrice] = useState(product?.basePrice || 499);
  const [quantity, setQuantity] = useState(product?.minQty || 100);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'faq' | 'templates'>('specs');
  const [showUpload, setShowUpload] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWish, removeItem: removeWish, productIds } = useWishlistStore();
  const isWished = productIds.includes(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-dark mb-2">Product Not Found</h1>
            <p className="text-muted mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/products" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors">
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
      product_image: '/placeholder.jpg',
      quantity,
      material: product.materials[0]?.name || 'Standard',
      size: product.sizes[0]?.name || 'Standard',
      finish: product.finishes[0]?.name || 'Matte',
      unit_price: Math.round(totalPrice / quantity),
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Container>
        {/* Breadcrumb */}
        <div className="py-4">
          <nav className="flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-dark font-medium">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-16">
          {/* Left: Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden mb-4">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-3">
                    <Package className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted">{product.name}</p>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-slate-100 rounded-xl border-2 border-primary/20 cursor-pointer hover:border-primary transition-colors" />
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info + Configurator */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-full">
                In Stock
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-dark font-heading">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-dark">{product.rating}</span>
              <span className="text-sm text-muted">({product.reviews} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed">{product.longDescription}</p>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] text-muted">Delivery</p>
                  <p className="text-xs font-semibold text-dark">{product.delivery}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <Shield className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] text-muted">Quality</p>
                  <p className="text-xs font-semibold text-dark">Guaranteed</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <RotateCcw className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] text-muted">Returns</p>
                  <p className="text-xs font-semibold text-dark">Easy Policy</p>
                </div>
              </div>
            </div>

            {/* Configurator */}
            <ProductConfigurator
              product={{
                id: slug,
                category_id: '1',
                name: product.name,
                slug,
                description: product.description,
                short_description: product.description,
                base_price: product.basePrice,
                min_quantity: product.minQty,
                max_quantity: product.maxQty,
                materials: product.materials,
                finishes: product.finishes,
                sizes: product.sizes,
                customizable: true,
                template_available: true,
                image_urls: [],
                gallery_urls: [],
                specs: product.specs,
                is_active: true,
                created_at: '',
              }}
              onPriceChange={(price, qty) => { setTotalPrice(price); setQuantity(qty); }}
            />

            {/* Design Options - Vistaprint Style */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-dark uppercase tracking-wide">How would you like to design?</h3>

              {/* Browse Design */}
              <Link
                href={`/templates?product=${slug}`}
                className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Layout className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-dark">Browse Design</p>
                  <p className="text-xs text-muted">Choose from hundreds of professionally designed templates</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
              </Link>

              {/* Edit Template */}
              <Link
                href={`/design-studio?product=${slug}`}
                className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Wand2 className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-dark">Edit Template</p>
                  <p className="text-xs text-muted">Start with a template and customize it to your needs</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
              </Link>

              {/* Upload Design */}
              <button
                onClick={() => setShowUpload(!showUpload)}
                className="w-full flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group text-left"
              >
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-success/20 transition-colors">
                  <Upload className="w-6 h-6 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-dark">Upload Design</p>
                  <p className="text-xs text-muted">Upload print-ready PDF, AI, PSD, or PNG files</p>
                </div>
                <ChevronRight className={`w-5 h-5 text-slate-300 group-hover:text-primary transition-colors transition-transform ${showUpload ? 'rotate-90' : ''}`} />
              </button>

              {showUpload && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mx-4 p-6 border border-dashed border-slate-300 rounded-xl text-center bg-slate-50"
                >
                  <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Download className="w-7 h-7 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-dark mb-1">Drag & drop your file here</p>
                  <p className="text-xs text-muted mb-3">or click to browse</p>
                  <p className="text-[10px] text-slate-300">PDF, AI, PSD, PNG, JPG — Max 50MB</p>
                </motion.div>
              )}

              {/* Build with Orbit AI */}
              <Link
                href={`/design-studio?product=${slug}&mode=ai`}
                className="flex items-center gap-4 p-4 border-2 border-dashed border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-dark">Build with Orbit AI</p>
                    <span className="px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold rounded uppercase">AI</span>
                  </div>
                  <p className="text-xs text-muted">Describe your design and let AI create it for you</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-400 transition-colors" />
              </Link>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => isWished ? removeWish(slug) : addWish(slug)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${
                  isWished ? 'bg-red border-red text-white' : 'border-slate-200 text-slate-400 hover:text-red hover:border-red'
                }`}
              >
                <Heart className="w-5 h-5" fill={isWished ? 'currentColor' : 'none'} />
              </button>
              <button className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tabs: Specs, Reviews, FAQ */}
        <div className="border-t border-slate-100 py-10">
          <div className="flex gap-6 border-b border-slate-100 mb-8">
            {(['specs', 'templates', 'reviews', 'faq'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-primary border-primary'
                    : 'text-muted border-transparent hover:text-dark'
                }`}
              >
                {tab === 'specs' ? 'Specifications' : tab === 'templates' ? `Templates (${PRODUCT_TEMPLATES.length})` : tab === 'reviews' ? `Reviews (${product.reviews})` : 'FAQ'}
              </button>
            ))}
          </div>

          {activeTab === 'templates' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-dark font-heading">Design Templates</h3>
                  <p className="text-sm text-muted">Start with a professionally designed template and customize it in our design studio.</p>
                </div>
                <Link href={`/templates?product=${slug}`} className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                  Browse All Templates
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCT_TEMPLATES.map((template) => (
                  <Link
                    key={template.id}
                    href={`/design-studio?template=${template.id}&product=${slug}`}
                    className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-primary transition-all"
                  >
                    <div
                      className="aspect-[3/2] flex items-center justify-center"
                      style={{ background: template.colors[0] }}
                    >
                      <div className="text-center">
                        <div className="w-12 h-6 rounded mx-auto mb-1.5" style={{ background: template.colors[1] }} />
                        <div className="w-8 h-1.5 rounded mx-auto" style={{ background: template.colors[2] + '40' }} />
                        <div className="w-10 h-1 rounded mx-auto mt-1" style={{ background: template.colors[2] + '20' }} />
                      </div>
                    </div>
                    {template.isPremium && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 bg-accent text-white text-[9px] font-bold rounded uppercase">
                        PRO
                      </span>
                    )}
                    <div className="p-3">
                      <p className="text-xs font-semibold text-dark truncate">{template.name}</p>
                      <p className="text-[10px] text-muted">{template.category}</p>
                    </div>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg shadow-lg">
                        Customize This Template
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm text-muted">{key}</span>
                  <span className="text-sm font-semibold text-dark">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-2xl">
              {SAMPLE_REVIEWS.map((review, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{review.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-dark">{review.name}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted">{review.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-dark mb-1">{review.title}</h4>
                  <p className="text-sm text-slate-600 mb-3">{review.content}</p>
                  <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3 max-w-2xl">
              {[
                { q: 'What file formats do you accept?', a: 'We accept PDF, AI, PSD, PNG, and JPG files. For best results, we recommend PDF with vector artwork and 300 DPI resolution.' },
                { q: 'How long does delivery take?', a: `${product.delivery} for standard orders. Express delivery (1-2 days) is available at checkout for an additional fee.` },
                { q: 'Can I request a proof before printing?', a: 'Yes! We provide a digital proof for all orders above 500 pcs. You can approve or request changes before we go to print.' },
                { q: 'What is the minimum order quantity?', a: `The minimum order quantity is ${product.minQty} pcs for this product. Contact us for custom smaller orders.` },
              ].map((faq, i) => (
                <details key={i} className="group p-4 bg-slate-50 rounded-xl">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-dark">
                    {faq.q}
                    <ChevronDown className="w-4 h-4 text-muted group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
