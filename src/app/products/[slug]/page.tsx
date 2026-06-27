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
    description: category?.description || 'Professional printing product',
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const features = [
    { icon: Truck, text: 'Free delivery on orders above ₹5000' },
    { icon: Shield, text: 'Quality guarantee on all products' },
    { icon: Clock, text: 'Fast turnaround: 3-5 business days' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-printorbit-gray mb-6">
        <Link href="/" className="hover:text-printorbit-red">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-printorbit-red">Products</Link>
        <span>/</span>
        <span className="text-printorbit-navy">{category.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-printorbit-light rounded-2xl aspect-square flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-4 block">📦</span>
            <span className="text-printorbit-gray text-sm">{category.name}</span>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm text-printorbit-gray hover:text-printorbit-red mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <h1 className="text-3xl font-bold text-printorbit-navy mb-4">{category.name}</h1>
          <p className="text-printorbit-gray mb-6">{category.description}</p>

          <div className="bg-printorbit-light rounded-xl p-4 mb-6">
            <span className="text-sm text-printorbit-gray">Starting from</span>
            <div className="text-3xl font-bold text-printorbit-red">₹499</div>
            <span className="text-xs text-printorbit-gray">*Min. order: 50 pcs</span>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <feature.icon className="w-5 h-5 text-printorbit-red flex-shrink-0" />
                <span className="text-sm text-printorbit-slate">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Quantity Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-printorbit-navy mb-2">Quantity</label>
            <input
              type="number"
              defaultValue={50}
              min={50}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="lg" className="flex-1">
              <FileText className="w-5 h-5 mr-2" />
              Request Quote
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-printorbit-navy mb-6">Product Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Material Options', value: 'Premium Paper, Art Paper, Matte, Glossy' },
            { label: 'Finish Options', value: 'Matte, Glossy, Lamination, UV Coating' },
            { label: 'Size Options', value: 'Standard, Custom sizes available' },
            { label: 'Min Order', value: '50 pieces' },
            { label: 'Turnaround', value: '3-5 business days' },
            { label: 'Customization', value: 'Full color, double-sided printing' },
          ].map((spec) => (
            <div key={spec.label} className="bg-white border border-gray-100 rounded-lg p-4">
              <span className="text-sm text-printorbit-gray">{spec.label}</span>
              <p className="text-sm font-medium text-printorbit-navy mt-1">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-printorbit-navy mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_CATEGORIES.filter((c) => c.slug !== slug)
            .slice(0, 4)
            .map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group p-6 bg-white rounded-xl border border-gray-100 hover:border-printorbit-red/30 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-printorbit-navy group-hover:text-printorbit-red transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-printorbit-gray mt-1">{cat.description}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
