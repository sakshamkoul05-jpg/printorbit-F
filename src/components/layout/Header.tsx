'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Phone, Mail, Search, ShoppingCart, User, ChevronDown,
  ArrowRight, Star, TrendingUp, Sparkles, Package, Megaphone, Flag,
  PenLine, Shirt, Camera, ChevronRight, Heart, MapPin, LogIn,
} from 'lucide-react';
import { NAV_LINKS, MEGA_MENU_DATA, POPULAR_SEARCHES } from '@/lib/constants';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import { useUIStore } from '@/store/ui';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Megaphone, Flag, Package, PenLine, Shirt, Camera,
  CreditCard: () => <Star className="w-4 h-4" />,
  FileText: () => <Sparkles className="w-4 h-4" />,
  Image: () => <Sparkles className="w-4 h-4" />,
  RectangleHorizontal: () => <Sparkles className="w-4 h-4" />,
  Square: () => <Sparkles className="w-4 h-4" />,
  Layout: () => <Sparkles className="w-4 h-4" />,
  Box: () => <Package className="w-4 h-4" />,
  Tag: () => <Sparkles className="w-4 h-4" />,
  ShoppingBag: () => <Sparkles className="w-4 h-4" />,
  Mail: () => <Sparkles className="w-4 h-4" />,
  StickyNote: () => <Sparkles className="w-4 h-4" />,
  Coffee: () => <Sparkles className="w-4 h-4" />,
  Gift: () => <Sparkles className="w-4 h-4" />,
  Heart: () => <Heart className="w-4 h-4" />,
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const itemCount = useCartStore((s) => s.getItemCount());
  const { user } = useAuthStore();
  const { setSearchOpen } = useUIStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchFocused(false);
    }
  };

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
              <span className="text-primary font-medium">Free delivery on orders above ₹5,000</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/98 shadow-lg py-2.5 backdrop-blur-xl border-b border-slate-100/50'
            : 'bg-white py-3.5'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-white font-bold text-lg font-heading">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-dark font-heading tracking-tight">PrintOrbit</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted -mt-0.5">Premium Printing</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {/* Products Mega Menu Trigger */}
              <div ref={megaRef} className="relative">
                <button
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors flex items-center gap-1.5 rounded-xl hover:bg-primary/5"
                  onMouseEnter={() => setProductsOpen(true)}
                  onClick={() => setProductsOpen(!productsOpen)}
                >
                  <Package className="w-4 h-4" />
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-0 mt-2 overflow-hidden"
                      onMouseLeave={() => setProductsOpen(false)}
                    >
                      {/* Mega Menu Header */}
                      <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-6 py-3 border-b border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-dark">All Product Categories</span>
                          <Link
                            href="/products"
                            className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
                            onClick={() => setProductsOpen(false)}
                          >
                            View All <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      {/* 6-Column Grid */}
                      <div className="grid grid-cols-6 gap-0 p-4">
                        {MEGA_MENU_DATA.map((column) => {
                          const ColumnIcon = ICONS[column.icon] || Package;
                          return (
                            <div key={column.title} className="px-3">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                                  <ColumnIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs font-bold text-dark uppercase tracking-wider">{column.title}</span>
                              </div>
                              <div className="space-y-0.5">
                                {column.categories.map((cat) => (
                                  <div key={cat.slug} className="group">
                                    <Link
                                      href={`/products/${cat.slug}`}
                                      className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors font-medium"
                                      onClick={() => setProductsOpen(false)}
                                    >
                                      <span>{cat.name}</span>
                                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    {/* Subcategories dropdown */}
                                    <div className="hidden group-hover:block ml-4">
                                      {cat.subcategories.map((sub) => (
                                        <Link
                                          key={sub.slug}
                                          href={`/products/${sub.slug}`}
                                          className="block px-2 py-1 text-xs text-slate-500 hover:text-primary transition-colors"
                                          onClick={() => setProductsOpen(false)}
                                        >
                                          {sub.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Bottom Promo */}
                      <div className="bg-gradient-to-r from-accent/5 to-primary/5 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4 text-accent" />
                          <span className="text-sm text-slate-600">
                            <strong className="text-dark">AI Design Studio</strong> — Create stunning designs in minutes
                          </span>
                        </div>
                        <Link
                          href="/design-studio"
                          className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
                          onClick={() => setProductsOpen(false)}
                        >
                          Try Now <ArrowRight className="w-3 h-3" />
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

            {/* Desktop Search + Actions */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <form onSubmit={handleSearch}>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 ${
                    searchFocused
                      ? 'border-primary bg-white shadow-md shadow-primary/10 w-64'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 w-48'
                  }`}>
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      className="bg-transparent outline-none text-sm text-dark placeholder:text-slate-400 w-full"
                    />
                  </div>
                </form>

                {/* Search Dropdown */}
                <AnimatePresence>
                  {searchFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full right-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 mt-2 p-4 z-50"
                    >
                      {!searchQuery ? (
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Popular Searches</p>
                          <div className="flex flex-wrap gap-2">
                            {POPULAR_SEARCHES.map((term) => (
                              <button
                                key={term}
                                onClick={() => {
                                  setSearchQuery(term);
                                  window.location.href = `/products?q=${encodeURIComponent(term)}`;
                                }}
                                className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Results for &ldquo;{searchQuery}&rdquo;
                          </p>
                          <button
                            onClick={handleSearch}
                            className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Search className="w-4 h-4" />
                            Search for &ldquo;{searchQuery}&rdquo;
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <Link href="/account" className="p-2.5 text-slate-400 hover:text-red hover:bg-red/5 transition-all rounded-xl">
                <Heart className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-xl relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {user ? (
                <Link href="/account" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{user.full_name?.[0] || 'U'}</span>
                  </div>
                  <span className="hidden xl:inline">{user.full_name?.split(' ')[0] || 'Account'}</span>
                </Link>
              ) : (
                <Link href="/auth/login" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}

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
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden fixed inset-x-0 top-[73px] z-40 max-h-[calc(100vh-73px)] overflow-y-auto"
          >
            <Container>
              <div className="py-4 space-y-1">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent outline-none text-sm text-dark placeholder:text-slate-400 w-full"
                    />
                  </div>
                </form>

                {/* Products Accordion */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                    onClick={() => setMobileAccordion(mobileAccordion === 'products' ? null : 'products')}
                  >
                    <span className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Products
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'products' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'products' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 pb-2 space-y-1">
                          {MEGA_MENU_DATA.map((col) => (
                            <div key={col.title}>
                              <p className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase">{col.title}</p>
                              {col.categories.map((cat) => (
                                <Link
                                  key={cat.slug}
                                  href={`/products/${cat.slug}`}
                                  className="block px-3 py-2 text-sm text-slate-600 hover:text-primary rounded-lg"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {cat.name}
                                </Link>
                              ))}
                            </div>
                          ))}
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

                <div className="flex gap-3 pt-3 pb-4">
                  <Link href="/auth/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full" size="md">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/quote/request" className="flex-1" onClick={() => setMobileOpen(false)}>
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
