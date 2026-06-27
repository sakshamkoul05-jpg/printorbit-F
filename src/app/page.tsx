'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, CreditCard, Image, FileText, Tag, Package, Shirt, Camera, PenTool, CheckCircle, Phone, Star, Award, Truck, Shield } from 'lucide-react';
import { PRODUCT_CATEGORIES, HOW_IT_WORKS, CLIENT_INDUSTRIES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  CreditCard, Image, FileText, Tag, Package, Shirt, Camera, PenTool,
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-pattern noise-overlay">
        {/* 3D Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [-20, 20, -20], rotateX: [0, 5, 0], rotateY: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-gradient-to-br from-gold/10 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ y: [20, -20, 20], rotateX: [0, -5, 0], rotateY: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-gradient-to-br from-gold/5 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/5"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/3"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-8"
            >
              <Star className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs font-medium text-gold">Premium Printing Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
            >
              <span className="text-white">Crafting </span>
              <span className="text-gradient-gold">Premium</span>
              <br />
              <span className="text-white">Print Materials</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-white-dim mb-10 max-w-xl leading-relaxed"
            >
              From business cards to large-format banners, we deliver luxury printing
              with uncompromising quality. Serving elite businesses and organizations across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products">
                <button className="btn-luxury px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2">
                  Explore Collection
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/quote/request">
                <button className="px-8 py-4 rounded-xl text-sm font-semibold border border-gold/30 text-gold hover:bg-gold/5 transition-all duration-300">
                  Request Quote
                </button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-gold/10"
            >
              {[
                { icon: Award, label: '10+ Years', sub: 'Experience' },
                { icon: Truck, label: '100+ Cities', sub: 'Delivery' },
                { icon: Shield, label: '5000+', sub: 'Clients' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{item.label}</p>
                    <p className="text-white-dim text-xs">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="divider-gold mb-24" />
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white-dim max-w-xl mx-auto">Four simple steps to premium printing excellence.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {HOW_IT_WORKS.map((item) => (
              <motion.div
                key={item.step}
                variants={scaleIn}
                whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="card-3d rounded-2xl p-8 text-center group cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-6 group-hover:glow-gold transition-all duration-500">
                  <span className="text-gradient-gold text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white-dim leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Collection</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h2>
            <p className="text-white-dim max-w-xl mx-auto">Premium printing products crafted for distinguished brands.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PRODUCT_CATEGORIES.map((cat, i) => {
              const Icon = iconMap[cat.icon] || FileText;
              return (
                <motion.div key={cat.slug} variants={scaleIn}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="card-3d rounded-2xl p-6 group shimmer block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-5 group-hover:glow-gold transition-all duration-500"
                    >
                      <Icon className="w-7 h-7 text-gold" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-white-dim leading-relaxed">{cat.description}</p>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="mt-4 flex items-center gap-2 text-xs text-gold"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Premium Feature */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/3 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="card-3d rounded-3xl p-12 md:p-16 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.span variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Why Choose Us</motion.span>
                <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-6">Precision Meets <span className="text-gradient-gold">Excellence</span></motion.h2>
                <motion.p variants={fadeUp} className="text-white-dim mb-8 leading-relaxed">
                  We combine cutting-edge technology with meticulous craftsmanship to deliver
                  print materials that embody luxury and professionalism.
                </motion.p>
                <div className="space-y-4">
                  {[
                    'Premium quality with latest German printing technology',
                    'Competitive pricing for bulk orders without compromise',
                    'Fast turnaround with guaranteed on-time delivery',
                    'Dedicated account manager for every client',
                  ].map((item, i) => (
                    <motion.div key={i} variants={fadeUp} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white-muted">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="relative"
              >
                <motion.div
                  animate={{ y: [-10, 10, -10], rotateX: [0, 5, 0], rotateY: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="aspect-square rounded-3xl bg-gradient-to-br from-black-card to-black-light border border-gold/10 flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-4 glow-gold-strong"
                    >
                      <span className="text-black text-4xl font-bold">P</span>
                    </motion.div>
                    <p className="text-gradient-gold text-lg font-semibold">PrintOrbit</p>
                    <p className="text-white-dim text-xs mt-1">Premium Quality</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clients Industries */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Trust</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Industries We Serve</h2>
            <p className="text-white-dim max-w-xl mx-auto">Trusted by elite businesses and organizations across diverse sectors.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          >
            {CLIENT_INDUSTRIES.map((industry) => (
              <motion.div
                key={industry}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="card-3d rounded-xl p-5 text-center group cursor-default"
              >
                <CheckCircle className="w-5 h-5 text-gold/50 group-hover:text-gold mx-auto mb-3 transition-colors" />
                <span className="text-sm text-white-muted group-hover:text-white transition-colors">{industry}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="card-3d rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5" />
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Ready to Elevate Your Brand?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white-dim max-w-2xl mx-auto mb-10 text-lg"
              >
                Get a free quote for your premium printing requirements. We offer luxury quality
                with competitive pricing and guaranteed delivery.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/quote/request">
                  <button className="btn-luxury px-10 py-4 rounded-xl text-sm font-semibold">
                    Request Free Quote
                  </button>
                </Link>
                <a href="tel:+919876543210">
                  <button className="px-10 py-4 rounded-xl text-sm font-semibold border border-gold/30 text-gold hover:bg-gold/5 transition-all duration-300 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Us Now
                  </button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
