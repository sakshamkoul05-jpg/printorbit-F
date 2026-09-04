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
    <div className="min-vh-100 bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <Container>
          <div className="py-10 py-md-14">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mx-auto" style={{ maxWidth: '40rem' }}>
              <span className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-white/20 text-white text-xs fw-medium rounded-pill mb-4">
                <Sparkles size={12} /> {ALL_TEMPLATES.length}+ Free Templates
              </span>
              <h1 className="display-5 fw-bold mb-3">
                Design Templates for Every Product
              </h1>
              <p className="text-white/60 mb-6">
                Start with a professionally designed template. Customize colors, fonts, and layout in our free design studio.
              </p>

              {/* Search */}
              <div className="position-relative mx-auto" style={{ maxWidth: '32rem' }}>
                <Search size={20} className="position-absolute" style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control text-dark"
                  style={{ paddingLeft: '3rem', paddingRight: '1rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', borderRadius: '0.75rem' }}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Filters */}
      <div className="bg-white border-bottom border-slate-100">
        <Container>
          <div className="py-3 d-flex align-items-center gap-4 overflow-x-auto">
            <div className="d-flex align-items-center gap-2 text-xs text-muted flex-shrink-0">
              <Filter size={14} />
              Filter by:
            </div>
            <div className="d-flex gap-1">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 text-xs fw-medium rounded-pill flex-shrink-0 transition-colors ${
                    category === cat ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="vr flex-shrink-0" style={{ height: '1rem' }} />
            <div className="d-flex gap-1">
              {PRODUCTS.slice(0, 6).map((prod) => (
                <button
                  key={prod}
                  onClick={() => setProduct(prod)}
                  className={`px-3 py-1 text-xs fw-medium rounded-pill flex-shrink-0 transition-colors ${
                    product === prod ? 'bg-accent text-white' : 'bg-slate-100 text-slate-600'
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
          <div className="d-flex align-items-center justify-content-between mb-6">
            <p className="text-sm text-muted">{filtered.length} template{filtered.length !== 1 ? 's' : ''} found</p>
          </div>

          {filtered.length > 0 ? (
            <div className="row g-4">
              {filtered.map((template, i) => (
                <div key={template.id} className="col-6 col-md-4 col-lg-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      href={`/design-studio?template=${template.id}`}
                      className="group d-block bg-white rounded-4 border border-slate-200 overflow-hidden text-decoration-none transition-all h-100"
                    >
                      <div
                        className="aspect-[4/3] d-flex align-items-center justify-content-center position-relative"
                        style={{ background: template.colors[0] }}
                      >
                        <div className="text-center">
                          <div className="w-16 h-8 rounded mx-auto mb-2" style={{ background: template.colors[1] }} />
                          <div className="w-10 h-2 rounded mx-auto" style={{ background: template.colors[2] + '40' }} />
                          <div className="w-12 rounded mx-auto mt-2" style={{ height: '0.375rem', background: template.colors[2] + '20' }} />
                        </div>
                        {template.isPremium && (
                          <span className="position-absolute top-2 end-2 px-2 py-0-5 bg-accent text-white fw-bold rounded" style={{ fontSize: '0.55rem', textTransform: 'uppercase' }}>
                            PRO
                          </span>
                        )}
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary/10 opacity-0 d-flex align-items-center justify-content-center transition-opacity">
                          <span className="px-4 py-2 bg-primary text-white text-xs fw-bold rounded-3 shadow-lg">
                            Customize Template
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs fw-semibold text-dark truncate mb-1">{template.name}</p>
                        <div className="d-flex align-items-center justify-content-between">
                          <span style={{ fontSize: '0.65rem' }} className="text-muted">{template.product} · {template.category}</span>
                          <span style={{ fontSize: '0.65rem' }} className="text-muted">{template.downloads.toLocaleString()} uses</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Palette size={48} className="text-slate-300 mx-auto mb-4" />
              <h3 className="fs-5 fw-semibold text-dark mb-2">No templates found</h3>
              <p className="text-sm text-muted">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
