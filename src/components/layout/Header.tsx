'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, Search, ShoppingCart, User, ChevronDown, ArrowRight, Star, TrendingUp, Sparkles } from 'lucide-react';
import { NAV_LINKS, PRODUCT_CATEGORIES } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark text-white/70 text-xs hidden md:block">
        <Container>
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-5">
              <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3 h-3" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@printorbit.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3 h-3" />
                <span>info@printorbit.in</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/40">Dharamshala | Faridabad</span>
              <span className="text-primary">Free delivery on orders above ₹5,000</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 shadow-lg py-3 backdrop-blur-xl'
            : 'bg-white py-4'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-white font-bold text-lg font-heading">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-dark font-heading tracking-tight">PrintOrbit</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted -mt-0.5">Premium Printing</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Products Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors flex items-center gap-1 rounded-xl hover:bg-primary/5">
                  Products
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute top-full left-0 w-[680px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 mt-2"
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {/* Popular Products */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Star className="w-4 h-4 text-accent" />
                            <span className="text-xs font-semibold text-dark uppercase tracking-wider">Popular</span>
                          </div>
                          <div className="space-y-1">
                            {PRODUCT_CATEGORIES.slice(0, 4).map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/products/${cat.slug}`}
                                className="flex items-center gap-3 p-2 rounded-xl text-sm text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={() => setProductsOpen(false)}
                              >
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <span className="text-xs">📦</span>
                                </div>
                                <span>{cat.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* New Arrivals */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold text-dark uppercase tracking-wider">New</span>
                          </div>
                          <div className="space-y-1">
                            {PRODUCT_CATEGORIES.slice(4, 8).map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/products/${cat.slug}`}
                                className="flex items-center gap-3 p-2 rounded-xl text-sm text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={() => setProductsOpen(false)}
                              >
                                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                                  <span className="text-xs">✨</span>
                                </div>
                                <span>{cat.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Trending */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-success" />
                            <span className="text-xs font-semibold text-dark uppercase tracking-wider">Trending</span>
                          </div>
                          <div className="space-y-1">
                            {PRODUCT_CATEGORIES.slice(8, 12).map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/products/${cat.slug}`}
                                className="flex items-center gap-3 p-2 rounded-xl text-sm text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={() => setProductsOpen(false)}
                              >
                                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                                  <span className="text-xs">🔥</span>
                                </div>
                                <span>{cat.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom CTA */}
                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <Link
                          href="/products"
                          className="flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                          onClick={() => setProductsOpen(false)}
                        >
                          View All Products
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Nav Links */}
              {NAV_LINKS.filter(l => l.label !== 'Products').map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors rounded-xl hover:bg-primary/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-xl">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/cart" className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-xl relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link href="/auth/login" className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-xl">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/quote/request">
                <Button variant="primary" size="sm">
                  Get Quote
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 text-slate-600 hover:text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <Container>
              <div className="py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-slate-100 my-3" />
                <a href="tel:+919876543210" className="flex items-center gap-2 px-4 py-3 text-sm text-slate-500">
                  <Phone className="w-4 h-4 text-primary" />
                  +91 98765 43210
                </a>
                <div className="flex gap-3 pt-3">
                  <Link href="/auth/login" className="flex-1">
                    <Button variant="outline" className="w-full" size="md">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/quote/request" className="flex-1">
                    <Button variant="primary" className="w-full" size="md">
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
