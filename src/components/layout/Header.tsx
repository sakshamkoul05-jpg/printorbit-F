'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Search, ShoppingCart, ChevronDown, LogIn,
  Phone, Headphones,
} from 'lucide-react';
import { NAV_LINKS, MEGA_MENU_DATA } from '@/lib/constants';
import type { MegaMenuTab } from '@/lib/constants';
import Logo from '@/components/ui/Logo';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import Container from '@/components/ui/Container';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const itemCount = useCartStore((s) => s.getItemCount());
  const { user } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
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

  const handleNavEnter = useCallback((label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(label);
  }, []);

  const handleNavLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const activeTab: MegaMenuTab | undefined = MEGA_MENU_DATA.find(
    (t) => t.id === activeDropdown
  );

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <Container>
          <div className="flex items-center gap-4 h-16">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Logo size="md" />
            </Link>

            {/* Search Bar - Desktop */}
            <div ref={searchRef} className="relative hidden lg:flex flex-1 max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="w-full">
                <div className={`flex items-center border rounded-md transition-all duration-200 ${
                  searchFocused
                    ? 'border-primary ring-1 ring-primary/20'
                    : 'border-slate-300 hover:border-slate-400'
                }`}>
                  <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Product and something awesome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    className="bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 w-full py-2.5 px-3"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white transition-colors text-sm font-medium"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Mobile search */}
              <Link
                href="/products"
                className="lg:hidden p-2 text-slate-500 hover:text-primary transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* Support */}
              <a
                href="tel:+919876543210"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-primary transition-colors rounded-md hover:bg-slate-50"
              >
                <Headphones className="w-4 h-4" />
                <span className="hidden lg:inline">Support</span>
              </a>

              {/* Cart */}
              <Link
                href="/cart"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-primary transition-colors rounded-md hover:bg-slate-50 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Login */}
              {user ? (
                <Link
                  href="/account"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors rounded-md hover:bg-slate-50"
                >
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {user.full_name?.[0] || 'U'}
                    </span>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors rounded-md"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </Container>

        {/* Navigation Bar - Desktop */}
        <div
          ref={navRef}
          className="hidden lg:block border-t border-slate-100 bg-white"
          onMouseLeave={handleNavLeave}
        >
          <Container>
            <nav className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
              {MEGA_MENU_DATA.map((tab) => {
                const isActive = activeDropdown === tab.id;
                return (
                  <button
                    key={tab.id}
                    onMouseEnter={() => handleNavEnter(tab.id)}
                    onClick={() => setActiveDropdown(isActive ? null : tab.id)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                      isActive
                        ? 'text-primary border-primary'
                        : 'text-slate-600 hover:text-primary border-transparent hover:border-primary'
                    }`}
                  >
                    {tab.label}
                    <ChevronDown
                      className={`inline-block w-3.5 h-3.5 ml-1 transition-transform ${
                        isActive ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </Container>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeTab && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="hidden lg:block border-t border-slate-100 bg-white shadow-lg"
              onMouseEnter={() => handleNavEnter(activeTab.id)}
              onMouseLeave={handleNavLeave}
            >
              <Container>
                <div className="py-6">
                  <div className="grid grid-cols-4 gap-8">
                    {activeTab.categories.map((cat) => (
                      <div key={cat.slug}>
                        <Link
                          href={`/products/${cat.slug}`}
                          className="text-sm font-bold text-slate-900 hover:text-primary transition-colors block mb-3"
                        >
                          {cat.name}
                        </Link>
                        <ul className="space-y-1.5">
                          {cat.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                href={`/products/${item.slug}`}
                                className="text-sm text-slate-500 hover:text-primary transition-colors block"
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
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <Container>
              <div className="py-4 space-y-1">
                {/* Mobile search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="flex items-center border border-slate-300 rounded-md">
                    <Search className="w-4 h-4 text-slate-400 ml-3" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 w-full py-2.5 px-3"
                    />
                  </div>
                </form>

                {/* Mobile categories accordion */}
                {MEGA_MENU_DATA.map((tab) => (
                  <div key={tab.id}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                      onClick={() =>
                        setMobileAccordion(mobileAccordion === tab.id ? null : tab.id)
                      }
                    >
                      <span>{tab.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          mobileAccordion === tab.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === tab.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 space-y-3">
                            {tab.categories.map((cat) => (
                              <div key={cat.slug}>
                                <Link
                                  href={`/products/${cat.slug}`}
                                  className="block px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {cat.name}
                                </Link>
                                <div className="space-y-0.5">
                                  {cat.items.slice(0, 5).map((item) => (
                                    <Link
                                      key={item.slug}
                                      href={`/products/${item.slug}`}
                                      className="block px-3 py-1.5 text-sm text-slate-600 hover:text-primary"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <hr className="border-slate-100 my-3" />

                {/* Quick links */}
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-4 pb-6 space-y-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Support
                  </a>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
