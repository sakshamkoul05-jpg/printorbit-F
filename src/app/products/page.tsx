'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Search, SlidersHorizontal, Grid3X3, List, X, ChevronRight,
  CreditCard, FileText, Image, Tag, Package, Shirt, Camera, Coffee,
  PenLine, Mail, Square, Layout, ArrowUpDown, BookOpen, Flag, Crown,
  ShoppingBag, Usb, Battery,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCT_CATEGORIES, MEGA_MENU_DATA } from '@/lib/constants';
import type { Product } from '@/types';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'business-cards': CreditCard, flyers: FileText, brochures: BookOpen, posters: Image,
  banners: Flag, 'sign-boards': Square, 'labels-stickers': Tag, 'custom-boxes': Package,
  letterheads: FileText, envelopes: Mail, tshirts: Shirt, 'mugs-drinkware': Coffee,
  hoodies: Shirt, caps: Crown, 'custom-notebooks': BookOpen, 'photo-gifts': Camera,
  'usb-drives': Usb, 'power-banks': Battery, 'tote-bags': ShoppingBag, 'wall-window': Layout,
};

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Name A-Z' },
];

const ALL_PRODUCTS: Product[] = [
  // Business Cards
  { id: '1', category_id: '1', name: 'Standard Business Cards', slug: 'standard-business-cards', description: 'Classic business cards printed on 300gsm cardstock.', short_description: '300gsm classic cards', base_price: 299, min_quantity: 100, max_quantity: 50000, materials: [{ name: '300gsm', price_modifier: 0 }, { name: '350gsm', price_modifier: 30 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }], sizes: [{ name: 'Standard (85×55)', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Paper': '300gsm Cardstock', 'Print': 'Full Color Both Sides' }, is_active: true, created_at: '' },
  { id: '2', category_id: '1', name: 'Premium Matte Business Cards', slug: 'premium-matte-business-cards', description: 'Thick 400gsm matte cards with a luxurious feel.', short_description: '400gsm premium matte finish', base_price: 499, min_quantity: 100, max_quantity: 10000, materials: [{ name: '350gsm', price_modifier: -50 }, { name: '400gsm', price_modifier: 0 }, { name: '450gsm', price_modifier: 50 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 25 }, { name: 'Soft Touch', price_modifier: 75 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }, { name: 'Slim', width: 90, height: 50, price_modifier: 20 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Paper': '400gsm Premium Cardstock', 'Print': 'Full Color Both Sides' }, is_active: true, created_at: '' },
  { id: '3', category_id: '1', name: 'Metallic Foil Business Cards', slug: 'metallic-foil-business-cards', description: 'Eye-catching metallic foil stamping on premium cardstock.', short_description: 'Foil stamped premium cards', base_price: 899, min_quantity: 100, max_quantity: 5000, materials: [{ name: '350gsm', price_modifier: -100 }, { name: '400gsm', price_modifier: 0 }], finishes: [{ name: 'Gold Foil', price_modifier: 0 }, { name: 'Silver Foil', price_modifier: 0 }, { name: 'Rose Gold', price_modifier: 50 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Paper': '400gsm Premium Cardstock', 'Print': 'Foil Stamping' }, is_active: true, created_at: '' },
  { id: '4', category_id: '1', name: 'Luxury Velvet Business Cards', slug: 'luxury-business-cards', description: 'Soft velvet lamination with foil accents.', short_description: 'Velvet finish luxury cards', base_price: 1299, min_quantity: 100, max_quantity: 2000, materials: [{ name: '400gsm', price_modifier: 0 }, { name: '500gsm', price_modifier: 100 }], finishes: [{ name: 'Velvet Black', price_modifier: 0 }, { name: 'Velvet Navy', price_modifier: 0 }, { name: 'Velvet Burgundy', price_modifier: 50 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Paper': '500gsm Premium', 'Finish': 'Velvet Lamination' }, is_active: true, created_at: '' },
  { id: '5', category_id: '1', name: 'Magnet Business Cards', slug: 'magnet-business-cards', description: 'Business cards that stick to fridges and boards.', short_description: 'Magnetic backing cards', base_price: 799, min_quantity: 100, max_quantity: 5000, materials: [{ name: 'Magnetic', price_modifier: 0 }], finishes: [{ name: 'Glossy', price_modifier: 0 }, { name: 'Matte', price_modifier: 20 }], sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Material': 'Magnetic Sheet', 'Print': 'Full Color' }, is_active: true, created_at: '' },
  // Flyers
  { id: '6', category_id: '2', name: 'A5 Double-Sided Flyers', slug: 'a5-flyers', description: 'Vibrant full-color A5 flyers on premium paper.', short_description: '170gsm art paper, full color', base_price: 299, min_quantity: 100, max_quantity: 50000, materials: [{ name: '130gsm Art', price_modifier: -30 }, { name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 60 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }], sizes: [{ name: 'A5', width: 148, height: 210, price_modifier: 0 }, { name: 'A4', width: 210, height: 297, price_modifier: 80 }, { name: 'DL', width: 99, height: 210, price_modifier: -20 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Paper': '170gsm Art Paper', 'Print': 'Full Color Both Sides' }, is_active: true, created_at: '' },
  { id: '7', category_id: '2', name: 'A4 Double-Sided Flyers', slug: 'a4-flyers', description: 'Large format flyers for maximum impact.', short_description: 'A4 full color flyers', base_price: 499, min_quantity: 100, max_quantity: 50000, materials: [{ name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 80 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 20 }], sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Paper': '170gsm Art Paper', 'Print': 'Full Color Both Sides' }, is_active: true, created_at: '' },
  // Brochures
  { id: '8', category_id: '3', name: 'Tri-Fold Brochures', slug: 'tri-fold-brochures', description: 'Popular tri-fold format for marketing.', short_description: 'A4 tri-fold brochure', base_price: 599, min_quantity: 50, max_quantity: 10000, materials: [{ name: '130gsm Art', price_modifier: -50 }, { name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 100 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 30 }], sizes: [{ name: 'A4 (folded to DL)', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Paper': '170gsm Art Paper', 'Fold': 'Tri-Fold' }, is_active: true, created_at: '' },
  { id: '9', category_id: '3', name: 'Bi-Fold Brochures', slug: 'bi-fold-brochures', description: 'Professional bi-fold brochures.', short_description: 'A4 bi-fold brochure', base_price: 499, min_quantity: 50, max_quantity: 10000, materials: [{ name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 80 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 25 }], sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Paper': '170gsm Art Paper', 'Fold': 'Bi-Fold' }, is_active: true, created_at: '' },
  // Banners
  { id: '10', category_id: '5', name: 'Vinyl Banner 3×6ft', slug: 'vinyl-banners', description: 'Durable vinyl banner for indoor and outdoor use.', short_description: 'Weather-resistant vinyl', base_price: 599, min_quantity: 1, max_quantity: 100, materials: [{ name: '13oz Vinyl', price_modifier: 0 }, { name: '18oz Vinyl', price_modifier: 200 }], finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'With Grommets', price_modifier: 50 }], sizes: [{ name: '3×6 ft', width: 914, height: 1829, price_modifier: 0 }, { name: '4×8 ft', width: 1219, height: 2438, price_modifier: 300 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Material': '13oz Vinyl', 'Print': 'Eco-Solvent' }, is_active: true, created_at: '' },
  // Stickers
  { id: '11', category_id: '7', name: 'Die-Cut Vinyl Stickers', slug: 'die-cut-stickers', description: 'Custom die-cut stickers in any shape.', short_description: 'Waterproof vinyl, any shape', base_price: 199, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'White Vinyl', price_modifier: 0 }, { name: 'Clear Vinyl', price_modifier: 30 }, { name: 'Holographic', price_modifier: 80 }], finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 10 }], sizes: [{ name: '2 inch', width: 50, height: 50, price_modifier: 0 }, { name: '3 inch', width: 75, height: 75, price_modifier: 20 }, { name: '4 inch', width: 100, height: 100, price_modifier: 40 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Material': 'Premium Vinyl', 'Finish': 'Waterproof' }, is_active: true, created_at: '' },
  // Packaging
  { id: '12', category_id: '8', name: 'Custom Mailer Boxes', slug: 'mailer-boxes', description: 'Branded corrugated mailer boxes.', short_description: 'Corrugated branded packaging', base_price: 149, min_quantity: 50, max_quantity: 10000, materials: [{ name: 'E-Flute', price_modifier: 0 }, { name: 'B-Flute', price_modifier: 30 }], finishes: [{ name: 'Kraft', price_modifier: 0 }, { name: 'White Board', price_modifier: 20 }, { name: 'Laminated', price_modifier: 50 }], sizes: [{ name: 'Small', width: 150, height: 100, price_modifier: 0 }, { name: 'Medium', width: 250, height: 150, price_modifier: 60 }, { name: 'Large', width: 350, height: 250, price_modifier: 150 }], customizable: true, template_available: false, image_urls: [], gallery_urls: [], specs: { 'Material': 'E-Flute Corrugated', 'Print': 'Full Color Offset' }, is_active: true, created_at: '' },
  // T-Shirts
  { id: '13', category_id: '11', name: 'Custom Cotton T-Shirts', slug: 'cotton-tshirts', description: 'Premium 100% cotton t-shirts with custom print.', short_description: '100% cotton, custom print', base_price: 399, min_quantity: 20, max_quantity: 5000, materials: [{ name: '100% Cotton', price_modifier: 0 }, { name: 'Poly-Cotton', price_modifier: -30 }, { name: 'Organic Cotton', price_modifier: 50 }], finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'DTG Print', price_modifier: 30 }, { name: 'Sublimation', price_modifier: 50 }], sizes: [{ name: 'S', width: 0, height: 0, price_modifier: 0 }, { name: 'M', width: 0, height: 0, price_modifier: 0 }, { name: 'L', width: 0, height: 0, price_modifier: 0 }, { name: 'XL', width: 0, height: 0, price_modifier: 0 }, { name: 'XXL', width: 0, height: 0, price_modifier: 20 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Material': '100% Cotton', 'Weight': '180 GSM' }, is_active: true, created_at: '' },
  // Mugs
  { id: '14', category_id: '12', name: 'Custom Ceramic Mugs', slug: 'ceramic-mugs', description: 'Classic ceramic mugs with custom print.', short_description: '11oz ceramic, custom print', base_price: 299, min_quantity: 10, max_quantity: 5000, materials: [{ name: 'Ceramic', price_modifier: 0 }, { name: 'Glass', price_modifier: 50 }], finishes: [{ name: 'Standard Print', price_modifier: 0 }, { name: 'Magic (Heat Reveal)', price_modifier: 150 }], sizes: [{ name: '11oz', width: 0, height: 0, price_modifier: 0 }, { name: '15oz', width: 0, height: 0, price_modifier: 40 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Material': 'Ceramic', 'Capacity': '11oz / 15oz' }, is_active: true, created_at: '' },
  // Letterheads
  { id: '15', category_id: '9', name: 'A4 Corporate Letterheads', slug: 'a4-letterheads', description: 'Professional A4 letterheads for businesses.', short_description: '120gsm premium paper', base_price: 399, min_quantity: 100, max_quantity: 10000, materials: [{ name: '100gsm', price_modifier: -30 }, { name: '120gsm', price_modifier: 0 }, { name: '160gsm', price_modifier: 40 }], finishes: [{ name: 'Uncoated', price_modifier: 0 }, { name: 'Wove', price_modifier: 20 }], sizes: [{ name: 'A4', width: 210, height: 297, price_modifier: 0 }], customizable: true, template_available: true, image_urls: [], gallery_urls: [], specs: { 'Paper': '120gsm Premium', 'Print': 'Full Color' }, is_active: true, created_at: '' },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    if (selectedCategory && p.category_id !== selectedCategory) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (p.base_price < priceRange[0] || p.base_price > priceRange[1]) return false;
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="py-10 md:py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
                <Link href="/" className="hover:text-white">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">All Products</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
                {selectedCategory
                  ? PRODUCT_CATEGORIES.find(c => c.slug === selectedCategory)?.name || 'Products'
                  : 'All Products'}
              </h1>
              <p className="text-white/60 mb-6">
                Browse our complete range of premium printing products. Customize and order online.
              </p>

              {/* Search */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-dark placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Category Quick Links */}
      <div className="bg-white border-b border-slate-100">
        <Container>
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                !selectedCategory ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === cat.slug ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6">
          <div className="flex gap-6">
            {/* Sidebar Filters */}
            {showFilters && (
              <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-60 shrink-0 hidden lg:block">
                <div className="bg-white rounded-xl border border-slate-100 p-5 sticky top-24 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-dark">Filters</h3>
                    <button onClick={() => { setSelectedCategory(''); setPriceRange([0, 5000]); setSearch(''); }} className="text-xs text-primary hover:text-primary-dark">Clear All</button>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-dark mb-2">Categories</h4>
                    <div className="space-y-0.5 max-h-[400px] overflow-y-auto">
                      <button onClick={() => setSelectedCategory('')} className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${!selectedCategory ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}>
                        All Categories
                      </button>
                      {PRODUCT_CATEGORIES.map((cat) => {
                        const Icon = CATEGORY_ICONS[cat.slug] || Package;
                        return (
                          <button key={cat.slug} onClick={() => setSelectedCategory(cat.slug)} className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center gap-2 ${selectedCategory === cat.slug ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}>
                            <Icon className="w-3.5 h-3.5" />
                            <span className="flex-1">{cat.name}</span>
                            <span className="text-[10px] text-slate-400">{cat.count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-dark mb-2">Price Range</h4>
                    <input type="range" min={0} max={5000} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full accent-primary" />
                    <div className="flex items-center justify-between text-[10px] text-muted mt-1">
                      <span>₹0</span>
                      <span>Up to ₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Browse by Type */}
                  <div>
                    <h4 className="text-xs font-semibold text-dark mb-2">Browse by Type</h4>
                    <div className="space-y-2.5">
                      {MEGA_MENU_DATA.slice(0, 4).map((col) => (
                        <div key={col.id}>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{col.label}</p>
                          {col.categories.slice(0, 2).map((cat) => (
                            <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="block px-2 py-0.5 text-[11px] text-slate-500 hover:text-primary transition-colors">
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}

            {/* Main */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:border-primary transition-colors">
                    <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
                  </button>
                  <span className="text-xs text-muted">{sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none pl-3 pr-8 py-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-600 outline-none focus:border-primary cursor-pointer">
                    {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-slate-400'}`}><Grid3X3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-400'}`}><List className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory || search) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {PRODUCT_CATEGORIES.find(c => c.slug === selectedCategory)?.name}
                      <button onClick={() => setSelectedCategory('')}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {search && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                      &ldquo;{search}&rdquo;
                      <button onClick={() => setSearch('')}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                </div>
              )}

              {/* Products */}
              {sortedProducts.length > 0 ? (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
                  {sortedProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-dark mb-2">No products found</h3>
                  <p className="text-sm text-muted mb-6">Try adjusting your search or filter criteria</p>
                  <button onClick={() => { setSelectedCategory(''); setSearch(''); setPriceRange([0, 5000]); }} className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
