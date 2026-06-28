'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Truck, Clock } from 'lucide-react';
import Container from '@/components/ui/Container';

const showcaseProducts = [
  {
    title: 'Visiting Cards',
    subtitle: '100 Visiting Cards at Rs 200',
    cta: 'Shop Now',
    href: '/products/business-cards',
    bg: 'bg-gradient-to-br from-slate-100 to-slate-200',
    accent: 'from-primary to-blue-700',
    mockup: 'cards',
  },
  {
    title: 'Look professional with custom rainwear',
    subtitle: 'Starting at Rs. 655',
    cta: 'Umbrellas',
    cta2: 'Raincoats',
    href: '/products/umbrellas',
    href2: '/products/raincoats',
    bg: 'bg-gradient-to-br from-pink-100 to-rose-200',
    accent: 'from-rose-500 to-pink-600',
    mockup: 'umbrella',
  },
];

const exploreCategories = [
  { name: 'Visiting Cards', emoji: '💼', href: '/products/business-cards', bg: 'bg-blue-50' },
  { name: 'Flyers', emoji: '📄', href: '/products/flyers', bg: 'bg-green-50' },
  { name: 'Banners', emoji: '🏁', href: '/products/banners', bg: 'bg-red-50' },
  { name: 'Stickers', emoji: '🏷️', href: '/products/labels-stickers', bg: 'bg-yellow-50' },
  { name: 'T-Shirts', emoji: '👕', href: '/products/tshirts', bg: 'bg-purple-50' },
  { name: 'Mugs', emoji: '☕', href: '/products/mugs-drinkware', bg: 'bg-orange-50' },
  { name: 'Boxes', emoji: '📦', href: '/products/custom-boxes', bg: 'bg-teal-50' },
  { name: 'Letterheads', emoji: '✉️', href: '/products/letterheads', bg: 'bg-indigo-50' },
  { name: 'Caps', emoji: '🧢', href: '/products/caps', bg: 'bg-cyan-50' },
  { name: 'Brochures', emoji: '📑', href: '/products/brochures', bg: 'bg-amber-50' },
];

function CardMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Person silhouette placeholder */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-56 bg-gradient-to-t from-slate-300/40 to-transparent rounded-t-full" />
      {/* Business card stack */}
      <div className="relative z-10">
        <motion.div
          className="w-56 h-32 bg-white rounded-lg shadow-2xl border border-slate-200 p-4 rotate-[-4deg]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 mb-2" />
          <div className="w-24 h-2 bg-slate-200 rounded mb-1.5" />
          <div className="w-16 h-1.5 bg-slate-100 rounded mb-3" />
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>
        </motion.div>
        <motion.div
          className="w-56 h-32 bg-white rounded-lg shadow-xl border border-slate-200 p-4 absolute -top-3 left-4 rotate-[3deg]"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-accent/30" />
            <div className="w-20 h-2 bg-slate-200 rounded" />
          </div>
          <div className="w-28 h-1.5 bg-slate-100 rounded mb-1" />
          <div className="w-20 h-1.5 bg-slate-100 rounded" />
        </motion.div>
      </div>
    </div>
  );
}

function UmbrellaMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden">
      {/* Rain drops */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-4 bg-blue-300/40 rounded-full"
          style={{ left: `${10 + i * 7}%`, top: '-10%' }}
          animate={{ y: ['0%', '400%'], opacity: [0.8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'linear' }}
        />
      ))}
      {/* Umbrella */}
      <div className="relative z-10">
        <motion.div
          className="w-48 h-24 bg-gradient-to-b from-rose-400 to-rose-500 rounded-t-full relative"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute bottom-0 left-1/2 w-1.5 h-20 bg-slate-600 -translate-x-1/2 rounded-b" />
          <div className="absolute bottom-16 left-1/2 -translate-x-1 -translate-y-1 w-4 h-4 border-2 border-slate-600 border-t-0 border-r-0 rounded-br-full" />
        </motion.div>
        <motion.div
          className="w-40 h-20 bg-gradient-to-b from-amber-400 to-amber-500 rounded-t-full absolute -top-2 -left-6 opacity-80"
          animate={{ rotate: [2, -1, 2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div className="absolute bottom-0 left-1/2 w-1 h-16 bg-slate-500 -translate-x-1/2 rounded-b" />
        </motion.div>
      </div>
      {/* Logo placeholder */}
      <div className="absolute top-6 right-6 w-20 h-16 bg-white/60 rounded-lg flex items-center justify-center backdrop-blur-sm">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto rounded bg-sky-400/40 mb-1" />
          <div className="w-12 h-1 bg-slate-300 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-white">
      {/* Promo Banner */}
      <div className="bg-slate-900 text-white text-center py-2.5">
        <Container>
          <p className="text-sm font-medium">
            Buy More, Save More! Flat 5% OFF on Orders ₹10,000+ | Code: <span className="font-bold">SAVE5</span>
          </p>
        </Container>
      </div>

      {/* Showcase Cards */}
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {showcaseProducts.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`relative ${item.bg} rounded-2xl overflow-hidden min-h-[340px] flex`}
              >
                {/* Content */}
                <div className="flex-1 p-8 flex flex-col justify-center relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-dark font-heading mb-2 leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-sm text-slate-600 mb-5">{item.subtitle}</p>
                  <div className="flex gap-3">
                    <Link
                      href={item.href}
                      className="inline-flex px-6 py-3 bg-dark text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      {item.cta}
                    </Link>
                    {item.cta2 && (
                      <Link
                        href={item.href2!}
                        className="inline-flex px-6 py-3 bg-white text-dark text-sm font-bold rounded-lg border border-slate-200 hover:border-dark transition-colors"
                      >
                        {item.cta2}
                      </Link>
                    )}
                  </div>
                </div>
                {/* Mockup */}
                <div className="w-[45%] hidden md:block">
                  {item.mockup === 'cards' ? <CardMockup /> : <UmbrellaMockup />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      {/* Explore All Categories */}
      <Container>
        <div className="pb-12">
          <h2 className="text-2xl font-bold text-dark font-heading mb-6">Explore all categories</h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {exploreCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.04 }}
              >
                <Link
                  href={cat.href}
                  className="flex flex-col items-center gap-2 group"
                >
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
