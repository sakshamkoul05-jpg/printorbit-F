import { Metadata } from 'next';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import ProductCard from '@/components/products/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products | PrintOrbit',
  description: 'Browse our premium range of printing products - business cards, banners, stationery, labels, packaging and more.',
};

const SAMPLE_PRODUCTS = PRODUCT_CATEGORIES.map((cat, i) => ({
  id: `prod-${i}`,
  category_id: `cat-${i}`,
  name: `${cat.name} - Premium Collection`,
  slug: cat.slug,
  description: cat.description,
  short_description: cat.description,
  base_price: 499 + i * 100,
  min_quantity: 50,
  max_quantity: 10000,
  materials: [],
  finishes: [],
  sizes: [],
  customizable: true,
  template_available: i % 2 === 0,
  image_urls: [],
  gallery_urls: [],
  specs: {},
  is_active: true,
  created_at: new Date().toISOString(),
}));

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Collection</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Products</h1>
        <p className="text-white-dim max-w-xl">
          Explore our complete range of premium printing products.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="card-3d rounded-2xl p-5 sticky top-24">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gold" />
              Filters
            </h3>

            {/* Search */}
            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white-dim" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="mb-5">
              <h4 className="text-xs uppercase tracking-wider text-white-dim mb-3">Categories</h4>
              <div className="space-y-2">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-2.5 text-sm text-white-muted hover:text-gold cursor-pointer transition-colors">
                    <input type="checkbox" className="rounded border-gold/20 bg-black-light text-gold focus:ring-gold/30" />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-5">
              <h4 className="text-xs uppercase tracking-wider text-white-dim mb-3">Price Range</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 text-sm bg-black-light border border-gold/10 rounded-lg text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30"
                />
                <span className="text-white-dim">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 text-sm bg-black-light border border-gold/10 rounded-lg text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30"
                />
              </div>
            </div>

            {/* Customizable */}
            <div>
              <label className="flex items-center gap-2.5 text-sm text-white-muted hover:text-gold cursor-pointer transition-colors">
                <input type="checkbox" className="rounded border-gold/20 bg-black-light text-gold focus:ring-gold/30" />
                Customizable Only
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-white-dim">Showing {SAMPLE_PRODUCTS.length} products</p>
            <select className="text-sm bg-black-light border border-gold/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-gold/30">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
