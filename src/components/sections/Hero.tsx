'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Shield, Truck, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '@/components/ui/Container';

const slides = [
  {
    title: 'Visiting Cards',
    subtitle: '100 Visiting Cards at ₹200',
    cta: 'Shop Now',
    href: '/products/standard-business-cards',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
    tags: ['Premium Quality', 'Custom Designs', 'Fast Delivery'],
  },
  {
    title: 'Custom T-Shirts',
    subtitle: 'Starting at ₹149 per piece',
    cta: 'T-Shirts',
    href: '/products/cotton-tshirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80',
    tags: ['Bulk Discounts', 'Premium Cotton', 'Any Design'],
  },
  {
    title: 'Custom Packaging',
    subtitle: 'Branded boxes that wow your customers',
    cta: 'Packaging',
    href: '/products/mailer-boxes',
    image: 'https://images.unsplash.com/photo-1605630729998-3c1e5f556183?w=900&q=80',
    tags: ['Eco-Friendly', 'Full Color Print', 'Bulk Pricing'],
  },
  {
    title: 'Banners & Signage',
    subtitle: 'Vinyl banners starting at ₹599',
    cta: 'Banners',
    href: '/products/vinyl-banners',
    image: 'https://images.unsplash.com/photo-1583265627959-fb7042f6212d?w=900&q=80',
    tags: ['Weather Proof', 'Large Format', 'Same Day Print'],
  },
];

const exploreCategories = [
  { name: 'Visiting Cards', emoji: '💼', href: '/products/standard-business-cards', bg: 'bg-blue-50' },
  { name: 'Flyers', emoji: '📄', href: '/products/a5-flyers', bg: 'bg-green-50' },
  { name: 'Banners', emoji: '🏁', href: '/products/vinyl-banners', bg: 'bg-red-50' },
  { name: 'Stickers', emoji: '🏷️', href: '/products/die-cut-stickers', bg: 'bg-yellow-50' },
  { name: 'T-Shirts', emoji: '👕', href: '/products/cotton-tshirts', bg: 'bg-purple-50' },
  { name: 'Mugs', emoji: '☕', href: '/products/ceramic-mugs', bg: 'bg-orange-50' },
  { name: 'Boxes', emoji: '📦', href: '/products/mailer-boxes', bg: 'bg-teal-50' },
  { name: 'Letterheads', emoji: '✉️', href: '/products/a4-letterheads', bg: 'bg-indigo-50' },
  { name: 'Caps', emoji: '🧢', href: '/products/custom-caps', bg: 'bg-cyan-50' },
  { name: 'Brochures', emoji: '📑', href: '/products/tri-fold-brochures', bg: 'bg-amber-50' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="bg-white">
      {/* Promo Banner */}
      <div className="bg-slate-900 text-white text-center py-2.5">
        <Container>
          <p className="text-sm font-medium flex items-center justify-center gap-2">
            <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center text-[10px] font-bold">%</span>
            Buy More, Save More! Flat 5% OFF on Orders ₹10,000+ | Code: <span className="font-bold text-accent">SAVE5</span>
          </p>
        </Container>
      </div>

      {/* Hero Showcase */}
      <Container>
        <div className="py-6">
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 min-h-[420px] md:min-h-[480px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-1 md:grid-cols-2 h-full"
              >
                {/* Image */}
                <div className="relative h-[280px] md:h-auto overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-100/20 hidden md:block" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-dark font-heading mb-3 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg text-slate-600 mb-6">{slide.subtitle}</p>
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-dark text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors mb-6"
                    >
                      {slide.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="flex flex-wrap gap-2">
                      {slide.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-dark" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 text-dark" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? 'bg-primary w-6' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Explore All Categories */}
      <Container>
        <div className="pb-10">
          <h2 className="text-2xl font-bold text-dark font-heading mb-6">Explore all categories</h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {exploreCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.04 }}
              >
                <Link href={cat.href} className="flex flex-col items-center gap-2 group">
                  <div className={`w-16 h-16 ${cat.bg} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform border border-slate-100`}>
                    {cat.emoji}
                  </div>
                  <span className="text-[11px] font-medium text-slate-600 text-center leading-tight group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      {/* Trust Bar */}
      <div className="border-t border-slate-100">
        <Container>
          <div className="py-5 flex items-center justify-center gap-8 flex-wrap">
            {[
              { icon: Shield, text: 'Quality Guaranteed' },
              { icon: Truck, text: 'Free Delivery ₹5,000+' },
              { icon: Clock, text: '3-5 Day Turnaround' },
              { icon: Star, text: '4.9/5 Customer Rating' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <badge.icon className="w-4 h-4 text-primary" />
                <span className="font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
