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
      <header className="sticky-top bg-color border-bottom" style={{ zIndex: 50 }}>
        <div className="container">
          <div className="d-flex align-items-center gap-3" style={{ height: '64px' }}>
            <button
              className="d-xl-none btn p-2"
              style={{ marginLeft: '-0.5rem', color: '#6c757d' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="flex-shrink-0 text-decoration-none">
              <Logo size="md" />
            </Link>

            <div className="d-none d-lg-flex flex-fill mx-auto" style={{ maxWidth: '42rem' }}>
              <form onSubmit={handleSearch} className="w-100">
                <div className="d-flex align-items-center border rounded-sm" style={{ borderColor: '#dee2e6' }}>
                  <input
                    type="text"
                    placeholder="Product and something awesome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control border-0 bg-transparent"
                    style={{ boxShadow: 'none', fontSize: '0.875rem' }}
                  />
                  <button type="submit" className="btn px-3" style={{ color: '#6c757d' }} aria-label="Search">
                    <Search size={20} />
                  </button>
                </div>
              </form>
            </div>

            <div className="d-flex align-items-center gap-1 flex-shrink-0">
              <Link href="/products" className="d-lg-none btn p-2" style={{ color: '#6c757d' }}>
                <Search size={20} />
              </Link>

              <Link
                href="/contact"
                className="d-none d-md-flex align-items-center gap-1 btn btn-sm"
                style={{ color: '#6c757d', textDecoration: 'none' }}
              >
                <Headphones size={16} />
                <span className="d-none d-lg-inline">Support</span>
              </Link>

              <Link
                href="/cart"
                className="d-flex align-items-center gap-1 btn btn-sm position-relative"
                style={{ color: '#6c757d', textDecoration: 'none' }}
              >
                <ShoppingCart size={20} />
                <span className="d-none d-sm-inline">Cart</span>
                {itemCount > 0 && (
                  <span
                    className="position-absolute text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      top: '-2px', right: '-2px', minWidth: '18px', height: '18px',
                      fontSize: '10px', fontWeight: 700, backgroundColor: '#ED1C24', padding: '0 4px'
                    }}
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              <Link
                href={user ? '/account' : '/auth/login'}
                className="d-none d-sm-flex align-items-center gap-1 btn btn-sm"
                style={{ color: '#6c757d', fontWeight: 500, textDecoration: 'none' }}
              >
                <User size={16} />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={navRef}
          className="d-none d-xl-block border-top"
          style={{ borderColor: '#f8f9fa', backgroundColor: '#fff' }}
          onMouseLeave={handleNavLeave}
        >
          <div className="container">
            <nav className="d-flex align-items-center overflow-auto scrollbar-hide">
              {MEGA_MENU_DATA.map((tab) => {
                const isActive = activeDropdown === tab.id;
                return (
                  <button
                    key={tab.id}
                    onMouseEnter={() => handleNavEnter(tab.id)}
                    onClick={() => setActiveDropdown(isActive ? null : tab.id)}
                    className="btn btn-sm text-nowrap"
                    style={{
                      padding: '12px 16px', fontSize: '0.875rem', fontWeight: 500,
                      color: isActive ? '#ED1C24' : '#6c757d',
                      borderBottom: `2px solid ${isActive ? '#ED1C24' : 'transparent'}`,
                      background: 'none', border: 'none',
                      borderBottomWidth: '2px', borderBottomStyle: 'solid',
                      borderBottomColor: isActive ? '#ED1C24' : 'transparent',
                    }}
                  >
                    {tab.label}
                    <ChevronDown
                      size={14}
                      className="ms-1"
                      style={{
                        display: 'inline-block',
                        transition: 'transform 0.2s',
                        transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {activeTab && (
          <div
            className="d-none d-xl-block border-top shadow-lg"
            style={{ borderColor: '#dee2e6', backgroundColor: '#fff' }}
            onMouseEnter={() => handleNavEnter(activeTab.id)}
            onMouseLeave={handleNavLeave}
          >
            <div className="container py-4">
              <div className="row g-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {activeTab.categories.map((cat) => (
                  <div key={cat.slug}>
                    <Link
                      href={`/products/${cat.slug}`}
                      className="d-block mb-2 text-decoration-none"
                      style={{ fontSize: '0.875rem', fontWeight: 700, color: '#212529' }}
                    >
                      {cat.name}
                    </Link>
                    <ul className="list-unstyled">
                      {cat.items.map((item) => (
                        <li key={item.slug} className="mb-1">
                          <Link
                            href={`/products/${item.slug}`}
                            className="text-decoration-none d-block"
                            style={{ fontSize: '0.875rem', color: '#6c757d' }}
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
          </div>
        )}
      </header>

      {mobileOpen && (
        <div
          className="d-xl-none bg-white border-bottom position-fixed start-0 end-0 overflow-auto"
          style={{ top: '64px', zIndex: 40, maxHeight: 'calc(100vh - 64px)' }}
        >
          <div className="container py-3">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="d-flex align-items-center border rounded-sm" style={{ borderColor: '#dee2e6' }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control border-0 bg-transparent"
                  style={{ boxShadow: 'none', fontSize: '0.875rem' }}
                />
                <button type="submit" className="btn px-3" style={{ color: '#6c757d' }} aria-label="Search">
                  <Search size={20} />
                </button>
              </div>
            </form>

            {MEGA_MENU_DATA.map((tab) => (
              <div key={tab.id}>
                <button
                  className="btn w-100 d-flex align-items-center justify-content-between py-2"
                  style={{ fontSize: '0.875rem', fontWeight: 500, color: '#495057' }}
                  onClick={() => setMobileAccordion(mobileAccordion === tab.id ? null : tab.id)}
                >
                  <span>{tab.label}</span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: '#adb5bd',
                      transition: 'transform 0.2s',
                      transform: mobileAccordion === tab.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                {mobileAccordion === tab.id && (
                  <div className="ps-3 pb-2">
                    {tab.categories.map((cat) => (
                      <div key={cat.slug}>
                        <Link
                          href={`/products/${cat.slug}`}
                          className="d-block px-3 py-1 text-decoration-none"
                          style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {cat.name}
                        </Link>
                        <div>
                          {cat.items.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/products/${item.slug}`}
                              className="d-block px-3 py-1 text-decoration-none"
                              style={{ fontSize: '0.875rem', color: '#6c757d' }}
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

            <hr className="my-3" />

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="d-block px-3 py-2 text-decoration-none"
                style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6c757d' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 pb-4">
              <Link
                href={user ? '/account' : '/auth/login'}
                onClick={() => setMobileOpen(false)}
                className="d-flex align-items-center justify-content-center gap-2 w-100 btn btn-outline-secondary"
                style={{ fontSize: '0.875rem', fontWeight: 500 }}
              >
                <User size={16} />
                {user ? 'My Account' : 'Login'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
