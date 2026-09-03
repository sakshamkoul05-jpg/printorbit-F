'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Headphones,
  User,
  ChevronDown,
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
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const itemCount = useCartStore((s) => s.getItemCount());
  const { user } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <Container>
          <div className="flex items-center gap-3 h-16">
            {/* Mobile hamburger */}
            <button
              className="xl:hidden p-2 -ml-2 text-gray-600 hover:text-[#ED1C24] transition-colors"
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
            <div className="hidden lg:flex flex-1 max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="w-full">
                <div className="flex items-center border border-gray-300 rounded-sm hover:border-gray-400 transition-colors">
                  <input
                    type="text"
                    placeholder="Product and something awesome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400 w-full py-2.5 px-4"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 text-gray-500 hover:text-[#ED1C24] transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Mobile search */}
              <Link
                href="/products"
                className="lg:hidden p-2 text-gray-500 hover:text-[#ED1C24] transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* Support */}
              <Link
                href="/contact"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-[#ED1C24] transition-colors rounded hover:bg-gray-50"
              >
                <Headphones className="w-4 h-4" />
                <span className="hidden lg:inline">Support</span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-[#ED1C24] transition-colors rounded hover:bg-gray-50 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#ED1C24] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Login */}
              <Link
                href={user ? '/account' : '/auth/login'}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#ED1C24] transition-colors rounded hover:bg-gray-50"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </Container>

        {/* Navigation Bar - Desktop */}
        <div
          ref={navRef}
          className="hidden xl:block border-t border-gray-100 bg-white"
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
                        ? 'text-[#ED1C24] border-[#ED1C24]'
                        : 'text-gray-600 hover:text-[#ED1C24] border-transparent hover:border-[#ED1C24]'
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
        {activeTab && (
          <div
            className="hidden xl:block border-t border-gray-200 bg-white shadow-lg"
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
                        className="text-sm font-bold text-gray-900 hover:text-[#ED1C24] transition-colors block mb-3"
                      >
                        {cat.name}
                      </Link>
                      <ul className="space-y-1.5">
                        {cat.items.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={`/products/${item.slug}`}
                              className="text-sm text-gray-500 hover:text-[#ED1C24] transition-colors block"
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
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Container>
            <div className="py-4 space-y-1">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex items-center border border-gray-300 rounded-sm">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400 w-full py-2.5 px-4"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 text-gray-500"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Mobile categories accordion */}
              {MEGA_MENU_DATA.map((tab) => (
                <div key={tab.id}>
                  <button
                    className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    onClick={() =>
                      setMobileAccordion(mobileAccordion === tab.id ? null : tab.id)
                    }
                  >
                    <span>{tab.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        mobileAccordion === tab.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileAccordion === tab.id && (
                    <div className="pl-4 pb-2 space-y-3">
                      {tab.categories.map((cat) => (
                        <div key={cat.slug}>
                          <Link
                            href={`/products/${cat.slug}`}
                            className="block px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                            onClick={() => setMobileOpen(false)}
                          >
                            {cat.name}
                          </Link>
                          <div className="space-y-0.5">
                            {cat.items.map((item) => (
                              <Link
                                key={item.slug}
                                href={`/products/${item.slug}`}
                                className="block px-3 py-1.5 text-sm text-gray-600 hover:text-[#ED1C24]"
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <hr className="border-gray-100 my-3" />

              {/* Quick links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-[#ED1C24] hover:bg-gray-50 rounded transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 pb-6 space-y-2">
                <Link
                  href={user ? '/account' : '/auth/login'}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  <User className="w-4 h-4" />
                  {user ? 'My Account' : 'Login'}
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
