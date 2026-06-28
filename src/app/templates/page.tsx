'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Search, Filter, Grid3X3, Palette, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import { MEGA_MENU_DATA } from '@/lib/constants';

const ALL_TEMPLATES = [
  { id: '1', name: 'Modern Minimalist Business Card', product: 'Business Cards', category: 'Business', colors: ['#0B57D0', '#FFFFFF', '#1F2937'], isPremium: false, downloads: 1240 },
  { id: '2', name: 'Bold Creative Business Card', product: 'Business Cards', category: 'Creative', colors: ['#FF6B00', '#FFFFFF', '#0F172A'], isPremium: false, downloads: 890 },
  { id: '3', name: 'Elegant Gold Business Card', product: 'Business Cards', category: 'Luxury', colors: ['#0F172A', '#C9A84C', '#FFFFFF'], isPremium: true, downloads: 2100 },
  { id: '4', name: 'Corporate Blue Business Card', product: 'Business Cards', category: 'Corporate', colors: ['#0B57D0', '#DBEAFE', '#1F2937'], isPremium: false, downloads: 1560 },
  { id: '5', name: 'Fresh Startup Flyer', product: 'Flyers', category: 'Startup', colors: ['#16A34A', '#FFFFFF', '#0F172A'], isPremium: false, downloads: 720 },
  { id: '6', name: 'Restaurant Menu Flyer', product: 'Flyers', category: 'Restaurant', colors: ['#EA580C', '#FFFFFF', '#1F2937'], isPremium: false, downloads: 450 },
  { id: '7', name: 'Tech Company Flyer', product: 'Flyers', category: 'Technology', colors: ['#7C3AED', '#FFFFFF', '#0F172A'], isPremium: true, downloads: 340 },
  { id: '8', name: 'Eco Organic Flyer', product: 'Flyers', category: 'Eco', colors: ['#16A34A', '#FEF3C7', '#1F2937'], isPremium: false, downloads: 280 },
  { id: '9', name: 'Event Promotion Banner', product: 'Banners', category: 'Events', colors: ['#DC2626', '#FFFFFF', '#0F172A'], isPremium: false, downloads: 1800 },
  { id: '10', name: 'Sale Banner', product: 'Banners', category: 'Retail', colors: ['#FF6B00', '#FFFFFF', '#0F172A'], isPremium: false, downloads: 2200 },
  { id: '11', name: 'Grand Opening Banner', product: 'Banners', category: 'Retail', colors: ['#0B57D0', '#FFD700', '#0F172A'], isPremium: true, downloads: 980 },
  { id: '12', name: 'Product Label Classic', product: 'Labels & Stickers', category: 'Product', colors: ['#0F172A', '#FFFFFF', '#16A34A'], isPremium: false, downloads: 1400 },
  { id: '13', name: 'Wine Bottle Label', product: 'Labels & Stickers', category: 'Beverage', colors: ['#7C3A00', '#FFD700', '#FFFFFF'], isPremium: true, downloads: 560 },
  { id: '14', name: 'Kraft Sticker Set', product: 'Labels & Stickers', category: 'Eco', colors: ['#92400E', '#FEF3C7', '#16A34A'], isPremium: false, downloads: 340 },
  { id: '15', name: 'Mailchimp Box Design', product: 'Custom Boxes', category: 'E-commerce', colors: ['#FFE01B', '#0F172A', '#FFFFFF'], isPremium: false, downloads: 1100 },
  { id: '16', name: 'Gift Box Elegance', product: 'Custom Boxes', category: 'Gift', colors: ['#0F172A', '#C9A84C', '#FFFFFF'], isPremium: true, downloads: 420 },
  { id: '17', name: 'Corporate Letterhead', product: 'Letterheads', category: 'Corporate', colors: ['#0B57D0', '#FFFFFF', '#1F2937'], isPremium: false, downloads: 2500 },
  { id: '18', name: 'Minimal Letterhead', product: 'Letterheads', category: 'Minimal', colors: ['#FFFFFF', '#1F2937', '#64748B'], isPremium: false, downloads: 1800 },
  { id: '19', name: 'Team T-Shirt Design', product: 'T-Shirts', category: 'Team', colors: ['#0F172A', '#FFFFFF', '#0B57D0'], isPremium: false, downloads: 890 },
  { id: '20', name: 'Event T-Shirt', product: 'T-Shirts', category: 'Events', colors: ['#DC2626', '#FFFFFF', '#0F172A'], isPremium: false, downloads: 670 },
  { id: '21', name: 'Custom Mug Design', product: 'Mugs', category: 'Gift', colors: ['#FFFFFF', '#FF6B00', '#0F172A'], isPremium: false, downloads: 1200 },
  { id: '22', name: 'Photo Collage Mug', product: 'Mugs', category: 'Photo', colors: ['#FFFFFF', '#3B82F6', '#0F172A'], isPremium: false, downloads: 890 },
  { id: '23', name: 'Brochure Tri-Fold', product: 'Brochures', category: 'Corporate', colors: ['#0B57D0', '#FFFFFF', '#1F2937'], isPremium: false, downloads: 1600 },
  { id: '24', name: 'Product Brochure', product: 'Brochures', category: 'Product', colors: ['#16A34A', '#FFFFFF', '#0F172A'], isPremium: false, downloads: 780 },
];

const CATEGORIES = ['All', ...new Set(ALL_TEMPLATES.map((t) => t.category))];
const PRODUCTS = ['All', ...new Set(ALL_TEMPLATES.map((t) => t.product))];

export default function TemplatesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [product, setProduct] = useState('All');

  const filtered = ALL_TEMPLATES.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'All' && t.category !== category) return false;
    if (product !== 'All' && t.product !== product) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="py-10 md:py-14">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-center mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-4">
                <Sparkles className="w-3 h-3" /> {ALL_TEMPLATES.length}+ Free Templates
              </span>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
                Design Templates for Every Product
              </h1>
              <p className="text-white/60 mb-6">
                Start with a professionally designed template. Customize colors, fonts, and layout in our free design studio.
              </p>

              {/* Search */}
              <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-dark placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-slate-100">
        <Container>
          <div className="py-3 flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 text-xs text-muted shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Filter by:
            </div>
            <div className="flex gap-1">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    category === cat ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="h-4 w-px bg-slate-200 shrink-0" />
            <div className="flex gap-1">
              {PRODUCTS.slice(0, 6).map((prod) => (
                <button
                  key={prod}
                  onClick={() => setProduct(prod)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    product === prod ? 'bg-accent text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {prod}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Templates Grid */}
      <Container>
        <div className="py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted">{filtered.length} template{filtered.length !== 1 ? 's' : ''} found</p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((template, i) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={`/design-studio?template=${template.id}`}
                    className="group block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary transition-all"
                  >
                    <div
                      className="aspect-[4/3] flex items-center justify-center relative"
                      style={{ background: template.colors[0] }}
                    >
                      <div className="text-center">
                        <div className="w-16 h-8 rounded mx-auto mb-2" style={{ background: template.colors[1] }} />
                        <div className="w-10 h-2 rounded mx-auto" style={{ background: template.colors[2] + '40' }} />
                        <div className="w-12 h-1.5 rounded mx-auto mt-1.5" style={{ background: template.colors[2] + '20' }} />
                      </div>
                      {template.isPremium && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 bg-accent text-white text-[9px] font-bold rounded uppercase">
                          PRO
                        </span>
                      )}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-lg">
                          Customize Template
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-dark truncate mb-0.5">{template.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted">{template.product} · {template.category}</span>
                        <span className="text-[10px] text-muted">{template.downloads.toLocaleString()} uses</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Palette className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-dark mb-2">No templates found</h3>
              <p className="text-sm text-muted">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
