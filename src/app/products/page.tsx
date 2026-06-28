'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Search, SlidersHorizontal, Grid3X3, List, ChevronDown, X,
  CreditCard, FileText, Image, Tag, Package, Shirt, Camera, Coffee,
  PenLine, Mail, Square, Layout, ArrowUpDown,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCT_CATEGORIES, MEGA_MENU_DATA } from '@/lib/constants';
import type { Product } from '@/types';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'business-cards': CreditCard,
  'flyers-brochures': FileText,
  'banners-posters': Image,
  'labels-stickers': Tag,
  'custom-boxes': Package,
  apparel: Shirt,
  'photo-gifts': Camera,
  drinkware: Coffee,
  letterheads: PenLine,
  envelopes: Mail,
  'sign-boards': Square,
  'wall-graphics': Layout,
};

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Name A-Z' },
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1', category_id: '1', name: 'Premium Matte Business Cards', slug: 'premium-matte-business-cards',
    description: 'Thick 400gsm matte cards with a luxurious feel. Perfect for professionals who want to make a statement.',
    short_description: '400gsm premium matte finish', base_price: 499, min_quantity: 100, max_quantity: 10000,
    materials: [{ name: '350gsm', price_modifier: -50 }, { name: '400gsm', price_modifier: 0 }, { name: '450gsm', price_modifier: 50 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 25 }, { name: 'Soft Touch', price_modifier: 75 }],
    sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }, { name: 'Slim', width: 90, height: 50, price_modifier: 20 }],
    customizable: true, template_available: true, image_urls: [], gallery_urls: [],
    specs: { 'Paper': '400gsm Premium Cardstock', 'Print': 'Full Color Both Sides', 'Finish': 'Matte Lamination', 'Delivery': '3-5 Business Days' },
    is_active: true, created_at: '2024-01-01',
  },
  {
    id: '2', category_id: '1', name: 'Metallic Foil Business Cards', slug: 'metallic-foil-business-cards',
    description: 'Eye-catching metallic foil stamping on premium cardstock. Available in gold, silver, and rose gold.',
    short_description: 'Foil stamped premium cards', base_price: 899, min_quantity: 100, max_quantity: 5000,
    materials: [{ name: '350gsm', price_modifier: -100 }, { name: '400gsm', price_modifier: 0 }],
    finishes: [{ name: 'Gold Foil', price_modifier: 0 }, { name: 'Silver Foil', price_modifier: 0 }, { name: 'Rose Gold', price_modifier: 50 }],
    sizes: [{ name: 'Standard', width: 85, height: 55, price_modifier: 0 }],
    customizable: true, template_available: false, image_urls: [], gallery_urls: [],
    specs: { 'Paper': '400gsm Premium Cardstock', 'Print': 'Foil Stamping + Digital', 'Finish': 'Spot UV + Foil', 'Delivery': '5-7 Business Days' },
    is_active: true, created_at: '2024-01-02',
  },
  {
    id: '3', category_id: '2', name: 'A5 Double-Sided Flyers', slug: 'a5-double-sided-flyers',
    description: 'Vibrant full-color A5 flyers printed on premium 170gsm art paper. Ideal for promotions and events.',
    short_description: '170gsm art paper, full color', base_price: 299, min_quantity: 100, max_quantity: 50000,
    materials: [{ name: '130gsm Art', price_modifier: -30 }, { name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 60 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }],
    sizes: [{ name: 'A5', width: 148, height: 210, price_modifier: 0 }, { name: 'A4', width: 210, height: 297, price_modifier: 80 }, { name: 'DL', width: 99, height: 210, price_modifier: -20 }],
    customizable: true, template_available: true, image_urls: [], gallery_urls: [],
    specs: { 'Paper': '170gsm Art Paper', 'Print': 'Full Color Both Sides', 'Finish': 'Matte Lamination', 'Delivery': '2-4 Business Days' },
    is_active: true, created_at: '2024-01-03',
  },
  {
    id: '4', category_id: '3', name: 'Vinyl Banner 3x6ft', slug: 'vinyl-banner-3x6ft',
    description: 'Durable vinyl banner perfect for indoor and outdoor use. Weather-resistant with hemmed edges.',
    short_description: 'Weather-resistant vinyl', base_price: 599, min_quantity: 1, max_quantity: 100,
    materials: [{ name: '13oz Vinyl', price_modifier: 0 }, { name: '18oz Vinyl', price_modifier: 200 }],
    finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'With Grommets', price_modifier: 50 }, { name: 'With Pole Pockets', price_modifier: 100 }],
    sizes: [{ name: '3×6 ft', width: 914, height: 1829, price_modifier: 0 }, { name: '4×8 ft', width: 1219, height: 2438, price_modifier: 300 }, { name: '6×10 ft', width: 1829, height: 3048, price_modifier: 800 }],
    customizable: true, template_available: true, image_urls: [], gallery_urls: [],
    specs: { 'Material': '13oz Premium Vinyl', 'Print': 'Eco-Solvent Full Color', 'Finish': 'Weather Resistant', 'Delivery': '3-5 Business Days' },
    is_active: true, created_at: '2024-01-04',
  },
  {
    id: '5', category_id: '4', name: 'Die-Cut Vinyl Stickers', slug: 'die-cut-vinyl-stickers',
    description: 'Custom die-cut stickers in any shape. Waterproof vinyl with strong adhesive. Perfect for branding.',
    short_description: 'Waterproof vinyl, any shape', base_price: 199, min_quantity: 50, max_quantity: 10000,
    materials: [{ name: 'White Vinyl', price_modifier: 0 }, { name: 'Clear Vinyl', price_modifier: 30 }, { name: 'Holographic', price_modifier: 80 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 10 }],
    sizes: [{ name: '2 inch', width: 50, height: 50, price_modifier: 0 }, { name: '3 inch', width: 75, height: 75, price_modifier: 20 }, { name: '4 inch', width: 100, height: 100, price_modifier: 40 }],
    customizable: true, template_available: true, image_urls: [], gallery_urls: [],
    specs: { 'Material': 'Premium Vinyl', 'Print': 'Eco-Solvent', 'Finish': 'Waterproof', 'Delivery': '2-4 Business Days' },
    is_active: true, created_at: '2024-01-05',
  },
  {
    id: '6', category_id: '5', name: 'Custom Mailer Boxes', slug: 'custom-mailer-boxes',
    description: 'Branded corrugated mailer boxes. Full-color printing on kraft or white board. Easy assembly.',
    short_description: 'Corrugated branded packaging', base_price: 149, min_quantity: 50, max_quantity: 10000,
    materials: [{ name: 'E-Flute', price_modifier: 0 }, { name: 'B-Flute', price_modifier: 30 }],
    finishes: [{ name: 'Kraft', price_modifier: 0 }, { name: 'White Board', price_modifier: 20 }, { name: 'Laminated', price_modifier: 50 }],
    sizes: [{ name: 'Small', width: 150, height: 100, price_modifier: 0 }, { name: 'Medium', width: 250, height: 150, price_modifier: 60 }, { name: 'Large', width: 350, height: 250, price_modifier: 150 }],
    customizable: true, template_available: false, image_urls: [], gallery_urls: [],
    specs: { 'Material': 'E-Flute Corrugated', 'Print': 'Full Color Offset', 'Finish': 'Matte Lamination', 'Delivery': '7-10 Business Days' },
    is_active: true, created_at: '2024-01-06',
  },
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

  const allProducts = SAMPLE_PRODUCTS;
  const filteredProducts = allProducts.filter((p) => {
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
      <div className="bg-gradient-to-br from-dark via-dark-light to-primary/90 text-white">
        <Container>
          <div className="py-12 md:py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
                All Products
              </h1>
              <p className="text-white/60 mb-6">
                Browse our complete range of premium printing products. From business cards to packaging, we&apos;ve got you covered.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-dark placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          <div className="flex gap-6">
            {/* Sidebar Filters */}
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-64 shrink-0 hidden lg:block"
              >
                <div className="bg-white rounded-2xl border border-slate-100 p-5 sticky top-24 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-dark">Filters</h3>
                    <button
                      onClick={() => { setSelectedCategory(''); setPriceRange([0, 5000]); }}
                      className="text-xs text-primary hover:text-primary-dark"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Categories */}
                  <div>
                    <h4 className="text-sm font-semibold text-dark mb-3">Categories</h4>
                    <div className="space-y-1">
                      <button
                        onClick={() => setSelectedCategory('')}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          !selectedCategory ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        All Categories
                      </button>
                      {PRODUCT_CATEGORIES.map((cat) => {
                        const Icon = CATEGORY_ICONS[cat.slug] || Package;
                        return (
                          <button
                            key={cat.slug}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                              selectedCategory === cat.slug ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {cat.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-semibold text-dark mb-3">Price Range</h4>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min={0}
                        max={5000}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-primary"
                      />
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span>₹0</span>
                        <span>Up to ₹{priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Mega Menu Categories */}
                  <div>
                    <h4 className="text-sm font-semibold text-dark mb-3">Browse by Type</h4>
                    <div className="space-y-3">
                      {MEGA_MENU_DATA.map((col) => (
                        <div key={col.title}>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{col.title}</p>
                          {col.categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/products/${cat.slug}`}
                              className="block px-2 py-1 text-xs text-slate-500 hover:text-primary transition-colors"
                            >
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

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-primary transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>
                  <span className="text-sm text-muted">
                    {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-2 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-600 outline-none focus:border-primary cursor-pointer"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  {/* View Mode */}
                  <div className="flex bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-slate-400 hover:text-primary'}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-400 hover:text-primary'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory || search) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {PRODUCT_CATEGORIES.find(c => c.slug === selectedCategory)?.name}
                      <button onClick={() => setSelectedCategory('')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {search && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-full">
                      &ldquo;{search}&rdquo;
                      <button onClick={() => setSearch('')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <div className={viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                  : 'space-y-4'
                }>
                  {sortedProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark mb-2">No products found</h3>
                  <p className="text-sm text-muted mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => { setSelectedCategory(''); setSearch(''); setPriceRange([0, 5000]); }}
                    className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
                  >
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
