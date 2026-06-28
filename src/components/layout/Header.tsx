'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Phone, Mail, Search, ShoppingCart, ChevronDown,
  ChevronRight, LogIn, ArrowRight, Tag, Percent, Truck,
} from 'lucide-react';
import { NAV_LINKS, CATEGORY_BAR, CATEGORY_MEGA_DATA } from '@/lib/constants';
import Logo from '@/components/ui/Logo';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

const PROMOS = [
  'Free delivery on orders above ₹5,000',
  'Get 20% off on first order — Use code WELCOME20',
  'Business cards starting at ₹99',
  'Free design templates for every product',
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const categoryBarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const itemCount = useCartStore((s) => s.getItemCount());
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMOS.length);
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryBarRef.current && !categoryBarRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
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

  const handleCategoryEnter = (label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(label);
  };

  const handleCategoryLeave = () => {
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const currentDropdown = activeDropdown ? CATEGORY_MEGA_DATA[activeDropdown] : null;

  return (
    <>
      {/* Promo Banner - Rotating */}
      <div className="bg-slate-900 text-white text-xs hidden md:block">
        <Container>
          <div className="flex items-center justify-between h-8">
            <div className="flex items-center gap-4">
              <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <Phone className="w-3 h-3" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@printorbit.in" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <Mail className="w-3 h-3" />
                <span>info@printorbit.in</span>
              </a>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={promoIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-medium"
              >
                {PROMOS[promoIndex]}
              </motion.span>
            </AnimatePresence>
            <div className="flex items-center gap-3">
              <Link href="/sample-kit" className="hover:text-white/80 transition-colors">Sample Kit</Link>
              <span className="text-white/30">|</span>
              <Link href="/corporate" className="hover:text-white/80 transition-colors">Corporate</Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white shadow-md py-2 backdrop-blur-xl border-slate-100'
            : 'bg-white py-3 border-slate-100'
        }`}
      >
        <Container>
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Logo />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1">
              {NAV_LINKS.filter(l => l.label !== 'Products').map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div ref={searchRef} className="relative hidden lg:block">
              <form onSubmit={handleSearch}>
                <div className={`flex items-center gap-2 border rounded-full transition-all duration-200 ${
                  searchFocused
                    ? 'border-primary bg-white shadow-lg shadow-primary/10 w-72 ring-2 ring-primary/10'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 w-56'
                }`}>
                  <Search className="w-4 h-4 text-slate-400 ml-3.5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    className="bg-transparent outline-none text-sm text-dark placeholder:text-slate-400 w-full py-2 pr-3"
                  />
                </div>
              </form>

              <AnimatePresence>
                {searchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 mt-2 z-50"
                  >
                    {!searchQuery ? (
                      <div className="p-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Popular Searches</p>
                        <div className="flex flex-wrap gap-1.5">
                          {['Business Cards', 'Flyers', 'Brochures', 'Banners', 'Stickers', 'T-Shirts', 'Mugs', 'Labels'].map((term) => (
                            <button
                              key={term}
                              onClick={() => { window.location.href = `/products?q=${encodeURIComponent(term)}`; }}
                              className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-100 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Categories</p>
                          {['Business Cards', 'Flyers', 'Banners', 'Packaging'].map((cat) => (
                            <Link
                              key={cat}
                              href={`/products?category=${cat.toLowerCase().replace(/ /g, '-')}`}
                              className="flex items-center gap-2 py-1.5 text-xs text-slate-500 hover:text-primary transition-colors"
                              onClick={() => setSearchFocused(false)}
                            >
                              {cat}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4">
                        <button
                          onClick={handleSearch}
                          className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Search className="w-4 h-4" />
                          Search for &ldquo;{searchQuery}&rdquo;
                        </button>
                        <div className="mt-2 pt-2 border-t border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Suggested</p>
                          {['Premium Business Cards', 'A5 Flyers', 'Vinyl Banners'].filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).map((s) => (
                            <Link
                              key={s}
                              href={`/products?q=${encodeURIComponent(s)}`}
                              className="block px-3 py-1.5 text-xs text-slate-500 hover:text-primary transition-colors"
                              onClick={() => setSearchFocused(false)}
                            >
                              {s}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <Link href="/products" className="lg:hidden p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-lg">
                <Search className="w-5 h-5" />
              </Link>

              <Link href="/cart" className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-lg relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {user ? (
                <Link href="/account" className="hidden sm:flex items-center gap-2 px-2.5 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{user.full_name?.[0] || 'U'}</span>
                  </div>
                </Link>
              ) : (
                <Link href="/auth/login" className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}

              <Link href="/quote/request" className="hidden sm:block">
                <Button variant="primary" size="sm">
                  Get a Quote
                </Button>
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-slate-600 hover:text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Category Bar — Vistaprint Style with Per-Category Dropdowns */}
      <div
        ref={categoryBarRef}
        className="hidden lg:block bg-white border-b border-slate-100 sticky top-[60px] z-40"
        onMouseLeave={handleCategoryLeave}
      >
        <Container>
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide py-0">
            {CATEGORY_BAR.map((cat) => {
              const hasDropdown = cat.label !== 'View All' && CATEGORY_MEGA_DATA[cat.label];
              const isActive = activeDropdown === cat.label;

              if (!hasDropdown) {
                return (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="px-4 py-3 text-xs font-semibold text-slate-600 hover:text-primary whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-primary"
                  >
                    {cat.label}
                  </Link>
                );
              }

              return (
                <button
                  key={cat.label}
                  onMouseEnter={() => handleCategoryEnter(cat.label)}
                  onClick={() => setActiveDropdown(isActive ? null : cat.label)}
                  className={`px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? 'text-primary border-primary'
                      : 'text-slate-600 hover:text-primary border-transparent hover:border-primary'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Container>

        {/* Dropdown Panel */}
        <AnimatePresence>
          {currentDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="bg-white border-b border-slate-100 shadow-lg"
              onMouseEnter={() => handleCategoryEnter(activeDropdown!)}
              onMouseLeave={handleCategoryLeave}
            >
              <Container>
                <div className="py-6">
                  <div className="grid grid-cols-5 gap-6">
                    {currentDropdown.columns.map((col) => (
                      <div key={col.title}>
                        <h3 className="text-xs font-bold text-dark mb-3">{col.title}</h3>
                        <ul className="space-y-2.5">
                          {col.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="text-xs text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item.name}
                                {item.isNew && (
                                  <span className="px-1.5 py-0.5 bg-primary text-white text-[8px] font-bold rounded uppercase leading-none">
                                    NEW
                                  </span>
                                )}
                              </Link>
                              {item.description && (
                                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{item.description}</p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* See All Link */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={currentDropdown.seeAllHref}
                      className="text-sm font-bold text-dark hover:text-primary transition-colors flex items-center gap-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      See All {currentDropdown.seeAllLabel}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden fixed inset-x-0 top-0 z-40 max-h-screen overflow-y-auto pt-16"
          >
            <Container>
              <div className="py-4 space-y-1">
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none text-sm text-dark placeholder:text-slate-400 w-full" />
                  </div>
                </form>

                {CATEGORY_BAR.filter(c => c.label !== 'View All').map((cat) => {
                  const dropdown = CATEGORY_MEGA_DATA[cat.label];
                  return (
                    <div key={cat.label}>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                        onClick={() => setMobileAccordion(mobileAccordion === cat.label ? null : cat.label)}
                      >
                        <span>{cat.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === cat.label ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileAccordion === cat.label && dropdown && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="pl-6 pb-2 space-y-0.5">
                              {dropdown.columns.map((col) => (
                                <div key={col.title}>
                                  <p className="px-3 py-2 text-xs font-bold text-dark uppercase">{col.title}</p>
                                  {col.items.slice(0, 4).map((item) => (
                                    <Link key={item.name} href={item.href} className="block px-3 py-1.5 text-sm text-slate-500 hover:text-primary" onClick={() => setMobileOpen(false)}>
                                      {item.name}
                                      {item.isNew && <span className="ml-1.5 px-1 py-0.5 bg-primary text-white text-[8px] font-bold rounded">NEW</span>}
                                      {item.description && <span className="ml-1 text-[10px] text-slate-400">- {item.description}</span>}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <hr className="border-slate-100 my-3" />

                {NAV_LINKS.filter(l => l.label !== 'Products').map((link) => (
                  <Link key={link.href} href={link.href} className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                ))}

                <div className="flex gap-3 pt-4 pb-6">
                  <Link href="/auth/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full" size="md">Sign In</Button>
                  </Link>
                  <Link href="/quote/request" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="primary" className="w-full" size="md">Get a Quote</Button>
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
