import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { ArrowLeft, ShoppingCart, FileText, Truck, Shield, Clock } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
  return {
    title: category ? `${category.name} | PrintOrbit` : 'Product | PrintOrbit',
    description: category?.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const features = [
    { icon: Truck, text: 'Free delivery on orders above ₹5,000' },
    { icon: Shield, text: 'Quality guarantee on all products' },
    { icon: Clock, text: 'Fast turnaround: 3-5 business days' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-navy transition-colors">Products</Link>
        <span>/</span>
        <span className="text-navy">{category.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-slate-50 rounded-lg aspect-square flex items-center justify-center border border-slate-200">
          <div className="text-center">
            <span className="text-4xl mb-2 block text-slate-200">📦</span>
            <span className="text-slate-400 text-sm">{category.name}</span>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <Link href="/products" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-navy mb-4 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Products
          </Link>

          <h1 className="text-2xl font-bold text-navy mb-2">{category.name}</h1>
          <p className="text-slate-500 mb-5 text-sm">{category.description}</p>

          <div className="bg-slate-50 rounded-lg p-4 mb-5 border border-slate-100">
            <span className="text-xs text-slate-400">Starting from</span>
            <div className="text-2xl font-bold text-navy">₹499</div>
            <span className="text-xs text-slate-400">*Min. order: 50 pcs</span>
          </div>

          {/* Features */}
          <div className="space-y-2.5 mb-5">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <feature.icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-sm text-slate-600">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-navy mb-1.5">Quantity</label>
            <input
              type="number"
              defaultValue={50}
              min={50}
              className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-navy/30"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="lg" className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Request Quote
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-navy mb-4">Product Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: 'Material Options', value: 'Premium Paper, Art Paper, Matte, Glossy' },
            { label: 'Finish Options', value: 'Matte, Glossy, Lamination, UV Coating' },
            { label: 'Size Options', value: 'Standard, Custom sizes available' },
            { label: 'Min Order', value: '50 pieces' },
            { label: 'Turnaround', value: '3-5 business days' },
            { label: 'Customization', value: 'Full color, double-sided printing' },
          ].map((spec) => (
            <div key={spec.label} className="bg-white border border-slate-200 rounded-lg p-3">
              <span className="text-xs text-slate-400 uppercase tracking-wider">{spec.label}</span>
              <p className="text-sm font-medium text-navy mt-1">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-navy mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRODUCT_CATEGORIES.filter((c) => c.slug !== slug).slice(0, 4).map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="block bg-white rounded-lg border border-slate-200 p-4 hover:border-navy/30 transition-colors group"
            >
              <h3 className="font-semibold text-navy text-sm group-hover:text-navy-light transition-colors">{cat.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
