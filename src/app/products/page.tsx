import { Metadata } from 'next';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import ProductCard from '@/components/products/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products | PrintOrbit',
  description: 'Browse our wide range of printing products - business cards, banners, stationery, labels, packaging and more.',
};

const SAMPLE_PRODUCTS = PRODUCT_CATEGORIES.map((cat, i) => ({
  id: `prod-${i}`,
  category_id: `cat-${i}`,
  name: `${cat.name} - Premium Quality`,
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Our Products</h1>
        <p className="text-slate-500 mt-1 text-sm">Explore our complete range of printing products.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters - Clean, minimal */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-lg border border-slate-200 p-4 sticky top-24">
            <h3 className="font-semibold text-navy mb-4 flex items-center gap-2 text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </h3>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded focus:outline-none focus:border-navy/30"
              />
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Categories</h4>
              <div className="space-y-2">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-2 text-sm text-slate-600 hover:text-navy cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-navy focus:ring-navy/20" />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Price Range</h4>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-navy/30" />
                <span className="text-slate-400">-</span>
                <input type="number" placeholder="Max" className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-navy/30" />
              </div>
            </div>

            {/* Customizable */}
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-600 hover:text-navy cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-navy focus:ring-navy/20" />
                Customizable Only
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">Showing {SAMPLE_PRODUCTS.length} products</p>
            <select className="text-sm border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:border-navy/30 text-slate-600">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
