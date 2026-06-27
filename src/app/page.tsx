'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, CreditCard, Image, FileText, Tag, Package, Shirt, Camera, PenTool, CheckCircle, Phone, Star, Award, Truck, Shield, Users, ChevronRight } from 'lucide-react';
import { PRODUCT_CATEGORIES, HOW_IT_WORKS, CLIENT_INDUSTRIES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  CreditCard, Image, FileText, Tag, Package, Shirt, Camera, PenTool,
};

export default function Home() {
  return (
    <>
      {/* Hero Section - Clean, solid navy, no gradient */}
      <section className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 mb-5"
            >
              <Star className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-medium text-white/80">Trusted by 5000+ businesses</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-white"
            >
              Professional Printing{' '}
              <span className="text-white/80">Solutions</span>{' '}
              for Your Business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-white/60 mb-7 max-w-xl"
            >
              From business cards to large-format banners, we deliver premium quality printing
              with fast turnaround. Serving businesses across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/products">
                <button className="bg-white text-navy px-6 py-3 rounded text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/quote/request">
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded text-sm font-medium transition-colors border border-white/20">
                  Get a Free Quote
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Subtle, professional */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {[
              { icon: Truck, text: 'Free delivery on orders above ₹5,000' },
              { icon: Shield, text: 'Quality guarantee on all products' },
              { icon: Clock, text: 'Fast turnaround: 3-5 business days' },
              { icon: Award, text: '10+ years of experience' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                <item.icon className="w-4 h-4 text-slate-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories - Clean cards, border-based */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-navy">Our Products</h2>
              <p className="text-slate-500 mt-1">Wide range of printing products for every business need</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-navy hover:text-navy-light transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCT_CATEGORIES.map((cat, i) => {
              const Icon = iconMap[cat.icon] || FileText;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/products/${cat.slug}`}
                    className="block bg-white rounded-lg border border-slate-200 p-5 hover:border-navy/30 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-navy/5 transition-colors">
                      <Icon className="w-5 h-5 text-navy" />
                    </div>
                    <h3 className="font-semibold text-navy mb-1 text-sm">{cat.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Clean step indicators */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-navy">How It Works</h2>
            <p className="text-slate-500 mt-1">Four simple steps to get your print job done</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold text-navy mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Clean, professional */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-5">Why Choose PrintOrbit?</h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                We combine cutting-edge technology with meticulous craftsmanship to deliver
                print materials that help your business stand out.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Premium quality printing',
                  'Competitive bulk pricing',
                  'Fast 3-5 day turnaround',
                  'Free design assistance',
                  'Delivery across India',
                  'Dedicated support team',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-navy flex-shrink-0" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, label: '10+', sub: 'Years Experience' },
                  { icon: Users, label: '5000+', sub: 'Happy Clients' },
                  { icon: Truck, label: '100+', sub: 'Cities Served' },
                  { icon: Star, label: '4.9', sub: 'Customer Rating' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border border-slate-100 text-center">
                    <stat.icon className="w-5 h-5 text-navy mx-auto mb-2" />
                    <div className="text-xl font-bold text-navy">{stat.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients - Clean grid */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-navy">Industries We Serve</h2>
            <p className="text-slate-500 mt-1">Trusted by businesses across diverse sectors</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CLIENT_INDUSTRIES.map((industry) => (
              <div
                key={industry}
                className="bg-white rounded-lg p-3 text-center border border-slate-200 hover:border-navy/30 transition-colors cursor-default"
              >
                <CheckCircle className="w-4 h-4 text-slate-300 mx-auto mb-1.5" />
                <span className="text-xs text-slate-600">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Professional, muted */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-navy rounded-xl p-10 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Start Your Project?</h2>
            <p className="text-white/50 max-w-xl mx-auto mb-7">
              Get a free quote for your printing requirements. Competitive prices, premium quality, fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/quote/request">
                <button className="bg-white text-navy px-6 py-3 rounded text-sm font-medium hover:bg-slate-50 transition-colors">
                  Request Free Quote
                </button>
              </Link>
              <a href="tel:+919876543210">
                <button className="bg-white/10 text-white px-6 py-3 rounded text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Us Now
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
