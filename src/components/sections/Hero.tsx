'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Shield, Truck, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
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
      <div className="bg-slate-900 text-white text-center py-2">
        <Container>
          <p className="text-muted fw-medium d-flex align-items-center justify-content-center gap-2 mb-0" style={{ fontSize: '14px' }}>
            <span className="bg-accent rounded-circle d-flex align-items-center justify-content-center fw-bold text-white" style={{ width: '20px', height: '20px', fontSize: '10px' }}>%</span>
            Buy More, Save More! Flat 5% OFF on Orders ₹10,000+ | Code: <span className="fw-bold text-accent">SAVE5</span>
          </p>
        </Container>
      </div>

      {/* Hero Showcase */}
      <Container>
        <div className="py-4">
          <div className="position-relative rounded-4 overflow-hidden bg-slate-100" style={{ minHeight: '420px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="row g-0 h-100"
              >
                <div className="col-12 col-md-6 position-relative" style={{ height: '280px' }}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    unoptimized
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="position-absolute inset-0 d-none d-md-block" style={{ background: 'linear-gradient(to right, transparent, rgba(241,245,249,0.2))' }} />
                </div>

                <div className="col-12 col-md-6 p-4 d-flex flex-column justify-content-center bg-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="fs-2 fw-bold text-dark font-heading mb-3" style={{ lineHeight: 1.2 }}>
                      {slide.title}
                    </h2>
                    <p className="fs-5 text-muted mb-4">{slide.subtitle}</p>
                    <Link
                      href={slide.href}
                      className="d-inline-flex align-items-center gap-2 px-5 py-3 bg-dark text-white text-sm fw-bold rounded-3 text-decoration-none mb-4"
                    >
                      {slide.cta}
                      <ArrowRight size={16} />
                    </Link>
                    <div className="d-flex flex-wrap gap-2">
                      {slide.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 text-muted rounded-pill" style={{ fontSize: '12px', fontWeight: 500 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              className="position-absolute bg-white rounded-circle d-flex align-items-center justify-content-center shadow-lg border-0"
              style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', opacity: 0.9, zIndex: 10 }}
            >
              <ChevronLeft size={20} className="text-dark" />
            </button>
            <button
              onClick={next}
              className="position-absolute bg-white rounded-circle d-flex align-items-center justify-content-center shadow-lg border-0"
              style={{ right: '16px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', opacity: 0.9, zIndex: 10 }}
            >
              <ChevronRight size={20} className="text-dark" />
            </button>

            <div className="position-absolute d-flex gap-2" style={{ bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="rounded-pill border-0"
                  style={{
                    width: i === current ? '24px' : '10px',
                    height: '10px',
                    backgroundColor: i === current ? 'var(--bs-primary)' : '#cbd5e1',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="pb-4">
          <h2 className="fs-3 fw-bold text-dark font-heading mb-4">Explore all categories</h2>
          <div className="row g-3">
            {exploreCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                className="col"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.04 }}
              >
                <Link href={cat.href} className="d-flex flex-column align-items-center gap-2 text-decoration-none">
                  <div
                    className="bg-slate-50 rounded-4 d-flex align-items-center justify-content-center fs-3 border border-light"
                    style={{ width: '64px', height: '64px' }}
                  >
                    {cat.emoji}
                  </div>
                  <span className="text-center fw-medium text-muted" style={{ fontSize: '11px', lineHeight: 1.2 }}>
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-top border-light">
        <Container>
          <div className="py-3 d-flex align-items-center justify-content-center gap-4 flex-wrap">
            {[
              { icon: Shield, text: 'Quality Guaranteed' },
              { icon: Truck, text: 'Free Delivery ₹5,000+' },
              { icon: Clock, text: '3-5 Day Turnaround' },
              { icon: Star, text: '4.9/5 Customer Rating' },
            ].map((badge, i) => (
              <div key={i} className="d-flex align-items-center gap-2 text-muted">
                <badge.icon size={16} className="text-primary" />
                <span className="fw-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
