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
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-printorbit-navy mb-2">Our Products</h1>
        <p className="text-printorbit-gray">
          Explore our complete range of professional printing products.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-24">
            <h3 className="font-semibold text-printorbit-navy mb-3 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </h3>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-printorbit-gray" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
              />
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-printorbit-navy mb-2">Categories</h4>
              <div className="space-y-1">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-2 text-sm text-printorbit-slate hover:text-printorbit-red cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-printorbit-red focus:ring-printorbit-red" />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-printorbit-navy mb-2">Price Range</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
                />
                <span className="text-printorbit-gray">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
                />
              </div>
            </div>

            {/* Customizable */}
            <div>
              <label className="flex items-center gap-2 text-sm text-printorbit-slate hover:text-printorbit-red cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-printorbit-red focus:ring-printorbit-red" />
                Customizable Only
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-printorbit-gray">Showing {SAMPLE_PRODUCTS.length} products</p>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red">
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
