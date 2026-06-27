import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { ArrowLeft, ShoppingCart, FileText, CheckCircle, Truck, Shield, Clock } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
  return {
    title: category ? `${category.name} | PrintOrbit` : 'Product | PrintOrbit',
    description: category?.description || 'Premium printing product',
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-white-dim mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span className="text-gold/30">/</span>
        <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
        <span className="text-gold/30">/</span>
        <span className="text-white">{category.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="card-3d rounded-3xl aspect-square flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <span className="text-6xl mb-4 block opacity-20">📦</span>
            <span className="text-white-dim text-sm">{category.name}</span>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm text-white-dim hover:text-gold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-3 block">Premium Collection</span>
          <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
          <p className="text-white-dim mb-8 leading-relaxed">{category.description}</p>

          <div className="card-3d rounded-2xl p-6 mb-8">
            <span className="text-sm text-white-dim">Starting from</span>
            <div className="text-4xl font-bold text-gradient-gold mt-1">₹499</div>
            <span className="text-xs text-white-dim">*Min. order: 50 pcs</span>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-sm text-white-muted">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Quantity Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-white mb-2">Quantity</label>
            <input
              type="number"
              defaultValue={50}
              min={50}
              className="w-full px-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white focus:outline-none focus:border-gold/30 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" className="flex-1">
              <FileText className="w-5 h-5 mr-2" />
              Request Quote
            </Button>
            <Button variant="secondary" size="lg" className="flex-1">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <section className="mt-20">
        <div className="divider-gold mb-12" />
        <h2 className="text-2xl font-bold text-white mb-8">Product Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Material Options', value: 'Premium Paper, Art Paper, Matte, Glossy' },
            { label: 'Finish Options', value: 'Matte, Glossy, Lamination, UV Coating' },
            { label: 'Size Options', value: 'Standard, Custom sizes available' },
            { label: 'Min Order', value: '50 pieces' },
            { label: 'Turnaround', value: '3-5 business days' },
            { label: 'Customization', value: 'Full color, double-sided printing' },
          ].map((spec) => (
            <div key={spec.label} className="card-3d rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-white-dim">{spec.label}</span>
              <p className="text-sm font-medium text-white mt-2">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-20">
        <div className="divider-gold mb-12" />
        <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_CATEGORIES.filter((c) => c.slug !== slug)
            .slice(0, 4)
            .map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="card-3d rounded-2xl p-6 group"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-sm text-white-dim mt-2 leading-relaxed">{cat.description}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
