'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Phone, Mail, Search, ShoppingCart, User, ChevronDown,
  ArrowRight, Star, TrendingUp, Sparkles, Package, Megaphone, Flag,
  PenLine, Shirt, Camera, ChevronRight, Heart, LogIn, Eye, Flame,
  Tag, Percent, Truck,
} from 'lucide-react';
import { NAV_LINKS, MEGA_MENU_DATA } from '@/lib/constants';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Megaphone, Flag, Package, PenLine, Shirt, Camera, Gift: Sparkles,
};

const PROMOS = [
  'Free delivery on orders above ₹5,000',
  'Get 20% off on first order — Use code WELCOME20',
  'Business cards starting at ₹99',
  'Design Studio — Create your design for free',
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('marketing');
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const megaRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
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

  const currentTab = MEGA_MENU_DATA.find((t) => t.id === activeTab) || MEGA_MENU_DATA[0];

  return (
    <>
      {/* Promo Banner - Rotating */}
      <div className="bg-primary text-white text-xs hidden md:block">
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
              <span className="text-white/30">|</span>
              <Link href="/design-studio" className="hover:text-white/80 transition-colors">Design Studio</Link>
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
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center shadow-md shadow-primary/20">
                <span className="text-white font-bold text-base font-heading">P</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-dark font-heading tracking-tight">PrintOrbit</span>
                <span className="text-[8px] uppercase tracking-[0.15em] text-muted -mt-0.5">India&apos;s Printing Platform</span>
              </div>
            </Link>

            {/* Products Mega Menu Trigger */}
            <div ref={megaRef} className="relative hidden lg:block">
              <button
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-dark hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                onMouseEnter={() => setProductsOpen(true)}
                onClick={() => setProductsOpen(!productsOpen)}
              >
                <Package className="w-4 h-4" />
                Products
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-[1100px] bg-white rounded-b-2xl shadow-2xl border border-slate-200 mt-0 overflow-hidden z-50"
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    {/* Tabs */}
                    <div className="flex border-b border-slate-100">
                      {MEGA_MENU_DATA.map((tab) => {
                        const TabIcon = ICONS[tab.icon] || Package;
                        return (
                          <button
                            key={tab.id}
                            onMouseEnter={() => setActiveTab(tab.id)}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold transition-colors border-b-2 ${
                              activeTab === tab.id
                                ? 'text-primary border-primary bg-primary/5'
                                : 'text-slate-500 border-transparent hover:text-dark hover:bg-slate-50'
                            }`}
                          >
                            <TabIcon className="w-3.5 h-3.5" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Content */}
                    <div className="flex">
                      {/* Left: Categories */}
                      <div className="flex-1 p-5">
                        <div className="grid grid-cols-4 gap-5">
                          {currentTab.categories.map((cat) => (
                            <div key={cat.slug}>
                              <Link
                                href={`/products/${cat.slug}`}
                                className="text-xs font-bold text-dark uppercase tracking-wider hover:text-primary transition-colors block mb-2"
                                onClick={() => setProductsOpen(false)}
                              >
                                {cat.name}
                              </Link>
                              <ul className="space-y-1">
                                {cat.items.map((item) => (
                                  <li key={item.slug}>
                                    <Link
                                      href={`/products/${item.slug}`}
                                      className="text-xs text-slate-500 hover:text-primary transition-colors block py-0.5"
                                      onClick={() => setProductsOpen(false)}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Featured + Bestsellers + Trending */}
                      <div className="w-[280px] border-l border-slate-100 p-4 space-y-4">
                        {/* Bestsellers */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Flame className="w-3.5 h-3.5 text-accent" />
                            <span className="text-[10px] font-bold text-dark uppercase tracking-wider">Bestsellers</span>
                          </div>
                          {currentTab.bestsellers.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/products/${item.slug}`}
                              className="flex items-center gap-2.5 py-1.5 text-xs text-slate-600 hover:text-primary transition-colors"
                              onClick={() => setProductsOpen(false)}
                            >
                              <div className="w-8 h-8 bg-slate-100 rounded-md shrink-0" />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-[10px] text-muted">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <hr className="border-slate-100" />

                        {/* New Arrivals */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[10px] font-bold text-dark uppercase tracking-wider">New Arrivals</span>
                          </div>
                          {currentTab.newArrivals.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/products/${item.slug}`}
                              className="flex items-center gap-2.5 py-1.5 text-xs text-slate-600 hover:text-primary transition-colors"
                              onClick={() => setProductsOpen(false)}
                            >
                              <div className="w-8 h-8 bg-primary/10 rounded-md shrink-0" />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-[10px] text-muted">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <hr className="border-slate-100" />

                        {/* Trending */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <TrendingUp className="w-3.5 h-3.5 text-success" />
                            <span className="text-[10px] font-bold text-dark uppercase tracking-wider">Trending</span>
                          </div>
                          {currentTab.trending.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/products/${item.slug}`}
                              className="flex items-center gap-2.5 py-1.5 text-xs text-slate-600 hover:text-primary transition-colors"
                              onClick={() => setProductsOpen(false)}
                            >
                              <div className="w-8 h-8 bg-success/10 rounded-md shrink-0" />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-[10px] text-muted">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Promo Card */}
                        <div className={`bg-gradient-to-r ${currentTab.promo.bg} rounded-xl p-3 text-white`}>
                          <p className="text-xs font-bold mb-0.5">{currentTab.promo.title}</p>
                          <p className="text-[10px] text-white/70 mb-2">{currentTab.promo.description}</p>
                          <Link
                            href={currentTab.promo.href}
                            className="text-[10px] font-semibold flex items-center gap-1 hover:underline"
                            onClick={() => setProductsOpen(false)}
                          >
                            Learn more <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="bg-slate-50 px-5 py-2.5 flex items-center justify-between border-t border-slate-100">
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Free shipping ₹5,000+</span>
                        <span className="flex items-center gap-1"><Percent className="w-3 h-3" /> Bulk discounts up to 35%</span>
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Use code WELCOME20</span>
                      </div>
                      <Link
                        href="/products"
                        className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
                        onClick={() => setProductsOpen(false)}
                      >
                        View All Products <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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

            {/* Search Bar - Prominent */}
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
                              <Package className="w-3 h-3" />
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
              {/* Mobile Search */}
              <Link href="/products" className="lg:hidden p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-lg">
                <Search className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-lg relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Account */}
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

              {/* CTA */}
              <Link href="/quote/request" className="hidden sm:block">
                <Button variant="primary" size="sm">
                  Get a Quote
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

                {MEGA_MENU_DATA.map((tab) => (
                  <div key={tab.id}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                      onClick={() => setMobileAccordion(mobileAccordion === tab.id ? null : tab.id)}
                    >
                      <span>{tab.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === tab.id ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === tab.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="pl-6 pb-2 space-y-0.5">
                            {tab.categories.map((cat) => (
                              <div key={cat.slug}>
                                <Link href={`/products/${cat.slug}`} className="block px-3 py-2 text-xs font-bold text-dark uppercase" onClick={() => setMobileOpen(false)}>{cat.name}</Link>
                                {cat.items.slice(0, 4).map((item) => (
                                  <Link key={item.slug} href={`/products/${item.slug}`} className="block px-3 py-1.5 text-sm text-slate-500 hover:text-primary" onClick={() => setMobileOpen(false)}>{item.name}</Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

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
