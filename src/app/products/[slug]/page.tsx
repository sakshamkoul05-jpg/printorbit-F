'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { ArrowLeft, ShoppingCart, FileText, CheckCircle, Truck, Shield, Clock } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

interface ProductPageProps {
  params: Promise<{ slug: string }>;
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
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-white-dim mb-8"
      >
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span className="text-gold/30">/</span>
        <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
        <span className="text-gold/30">/</span>
        <span className="text-white">{category.name}</span>
      </motion.nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="card-3d rounded-3xl aspect-square flex items-center justify-center overflow-hidden"
        >
          <div className="text-center">
            <span className="text-6xl mb-4 block opacity-20">📦</span>
            <span className="text-white-dim text-sm">{category.name}</span>
          </div>
        </motion.div>

        {/* Product Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/products" className="inline-flex items-center gap-1 text-sm text-white-dim hover:text-gold mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>

            <span className="text-xs uppercase tracking-[0.3em] text-gold mb-3 block">Premium Collection</span>
            <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-white-dim mb-8 leading-relaxed">{category.description}</p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="card-3d rounded-2xl p-6 mb-8"
            >
              <span className="text-sm text-white-dim">Starting from</span>
              <div className="text-4xl font-bold text-gradient-gold mt-1">₹499</div>
              <span className="text-xs text-white-dim">*Min. order: 50 pcs</span>
            </motion.div>

            {/* Features */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-4 mb-8"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-sm text-white-muted">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="lg" className="flex-1">
                <FileText className="w-5 h-5 mr-2" />
                Request Quote
              </Button>
              <Button variant="secondary" size="lg" className="flex-1">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Specifications */}
      <section className="mt-20">
        <div className="divider-gold mb-12" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-8"
        >
          Product Specifications
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            { label: 'Material Options', value: 'Premium Paper, Art Paper, Matte, Glossy' },
            { label: 'Finish Options', value: 'Matte, Glossy, Lamination, UV Coating' },
            { label: 'Size Options', value: 'Standard, Custom sizes available' },
            { label: 'Min Order', value: '50 pieces' },
            { label: 'Turnaround', value: '3-5 business days' },
            { label: 'Customization', value: 'Full color, double-sided printing' },
          ].map((spec) => (
            <motion.div key={spec.label} variants={fadeUp} className="card-3d rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-white-dim">{spec.label}</span>
              <p className="text-sm font-medium text-white mt-2">{spec.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Related Products */}
      <section className="mt-20">
        <div className="divider-gold mb-12" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-8"
        >
          Related Products
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PRODUCT_CATEGORIES.filter((c) => c.slug !== slug)
            .slice(0, 4)
            .map((cat) => (
              <motion.div key={cat.slug} variants={fadeUp}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="card-3d rounded-2xl p-6 group block"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white-dim mt-2 leading-relaxed">{cat.description}</p>
                </Link>
              </motion.div>
            ))}
        </motion.div>
      </section>
    </div>
  );
}
