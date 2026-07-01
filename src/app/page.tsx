'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Printer, Layers, Zap, BookOpen, Mail, Brain, Download, Settings, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';

const categories = [
  {
    title: 'PRINTSHOP',
    subtitle: '',
    description: 'Business cards, flyers, banners, stickers & more',
    href: '/products',
    icon: Printer,
    color: 'from-blue-600 to-blue-700',
    hoverBorder: 'hover:border-blue-500',
  },
  {
    title: 'BULK PRINTING',
    subtitle: '',
    description: 'Wholesale prices on large quantity orders',
    href: '/products?bulk=true',
    icon: Layers,
    color: 'from-emerald-600 to-emerald-700',
    hoverBorder: 'hover:border-emerald-500',
  },
  {
    title: 'PRINT ON DEMAND',
    subtitle: '',
    description: 'Custom products printed & shipped per order',
    href: '/products?pod=true',
    icon: Zap,
    color: 'from-amber-500 to-orange-600',
    hoverBorder: 'hover:border-amber-500',
  },
  {
    title: 'BOOKS & MAGAZINES',
    subtitle: '',
    description: 'Professional book printing & magazine publishing',
    href: '/products?category=books',
    icon: BookOpen,
    color: 'from-purple-600 to-purple-700',
    hoverBorder: 'hover:border-purple-500',
  },
  {
    title: 'ENVELOPES',
    subtitle: 'ENVELOPEWALA',
    description: 'Custom printed envelopes in all sizes',
    href: '/products/envelopes',
    icon: Mail,
    color: 'from-rose-500 to-rose-600',
    hoverBorder: 'hover:border-rose-500',
  },
  {
    title: 'KNOWLEDGE CENTRE',
    subtitle: '',
    description: 'Printing guides, tips & industry insights',
    href: '/blog',
    icon: Brain,
    color: 'from-teal-600 to-teal-700',
    hoverBorder: 'hover:border-teal-500',
  },
  {
    title: 'DOWNLOADABLES',
    subtitle: '',
    description: 'Templates, guides & free resources',
    href: '/templates',
    icon: Download,
    color: 'from-indigo-600 to-indigo-700',
    hoverBorder: 'hover:border-indigo-500',
  },
  {
    title: 'UTILITIES',
    subtitle: '',
    description: 'Design tools, calculators & helpers',
    href: '/design-studio',
    icon: Settings,
    color: 'from-slate-600 to-slate-700',
    hoverBorder: 'hover:border-slate-500',
  },
];

export default function Home() {
  return (
    <section className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white">
        <Container>
          <div className="py-3 flex items-center justify-between">
            <p className="text-sm text-slate-300">
              India&apos;s Premium Printing Platform
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/design-studio" className="px-4 py-1.5 bg-accent text-white text-xs font-bold rounded-lg hover:bg-accent/90 transition-colors">
                Get a Quote
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Logo Area */}
      <div className="border-b border-slate-100">
        <Container>
          <div className="py-8 text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl md:text-4xl font-extrabold text-dark font-heading tracking-tight">
                Print<span className="text-primary">Orbit</span>
              </h1>
              <p className="text-xs text-muted mt-1 tracking-widest uppercase">
                India&apos;s Printing Platform
              </p>
            </Link>
          </div>
        </Container>
      </div>

      {/* Category Grid */}
      <Container>
        <div className="py-12 md:py-16">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-dark font-heading">
              Our Services
            </h2>
            <p className="text-muted mt-2">
              Choose a category to explore
            </p>
          </div>

          {/* 8-Card Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={cat.href}
                  className={`group block aspect-square border-2 border-slate-200 ${cat.hoverBorder} rounded-sm relative overflow-hidden transition-all duration-300 hover:shadow-lg`}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-4 text-center z-10">
                    <cat.icon className="w-8 h-8 md:w-10 md:h-10 text-slate-300 group-hover:text-white/80 transition-colors duration-300 mb-3" />
                    <h3 className="text-sm md:text-base lg:text-lg font-extrabold text-dark group-hover:text-white transition-colors duration-300 leading-tight">
                      {cat.title}
                    </h3>
                    {cat.subtitle && (
                      <p className="text-[10px] md:text-xs text-slate-400 group-hover:text-white/70 mt-1 font-medium tracking-wider">
                        {cat.subtitle}
                      </p>
                    )}
                    <p className="text-[10px] md:text-xs text-muted group-hover:text-white/60 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {cat.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-bold text-primary group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Explore <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom Trust Bar */}
      <div className="border-t border-slate-100 bg-slate-50">
        <Container>
          <div className="py-6 flex items-center justify-center gap-8 flex-wrap text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Quality Guaranteed
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Free Delivery ₹5,000+
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full" />
              3-5 Day Turnaround
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              4.9/5 Customer Rating
            </span>
          </div>
        </Container>
      </div>

      {/* Quick Links */}
      <div className="border-t border-slate-100">
        <Container>
          <div className="py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <Link href="/products/standard-business-cards" className="group">
                <div className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">Visiting Cards</div>
                <div className="text-xs text-muted mt-1">Starting at ₹200</div>
              </Link>
              <Link href="/products/a5-flyers" className="group">
                <div className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">Flyers</div>
                <div className="text-xs text-muted mt-1">Starting at ₹150</div>
              </Link>
              <Link href="/products/vinyl-banners" className="group">
                <div className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">Banners</div>
                <div className="text-xs text-muted mt-1">Starting at ₹599</div>
              </Link>
              <Link href="/products/cotton-tshirts" className="group">
                <div className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">T-Shirts</div>
                <div className="text-xs text-muted mt-1">Starting at ₹149</div>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
