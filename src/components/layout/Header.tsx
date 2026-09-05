'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Search, ShoppingCart, Headphones, User, ChevronDown, ChevronRight } from 'lucide-react';
import { DEPARTMENTS, searchProducts, type Department } from '@/lib/catalog';
import Logo from '@/components/ui/Logo';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';

/** Tabs shown inline; the rest collapse into a "More" dropdown. */
const INLINE_TABS = 11;

/** Product links listed under each category before the "+N products" link. */
const LINKS_PER_CATEGORY = 3;

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [suggestOpen, setSuggestOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const itemCount = useCartStore((s) => s.getItemCount());
  const { user } = useAuthStore();

  const inline = DEPARTMENTS.slice(0, INLINE_TABS);
  const overflow = DEPARTMENTS.slice(INLINE_TABS);
  const suggestions = query.trim().length > 1 ? searchProducts(query, 6) : [];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenTab(null);
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSuggestOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const enterTab = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenTab(id);
    setMoreOpen(false);
  }, []);

  const leaveNav = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenTab(null), 140);
  }, []);

  const active: Department | undefined = DEPARTMENTS.find((d) => d.slug === openTab);

  return (
    <>
      <header className="sticky-top border-bottom" style={{ zIndex: 1030, backgroundColor: '#FFFFFC' }}>
        {/* ---- utility row ---------------------------------------------- */}
        <div className="container">
          <div className="d-flex align-items-center gap-3" style={{ height: 68 }}>
            <button
              className="d-xl-none btn p-2 border-0"
              style={{ marginLeft: '-0.5rem', color: '#2E2E2E' }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="flex-shrink-0 text-decoration-none">
              <Logo size="md" />
            </Link>

            <div className="d-none d-lg-block flex-fill mx-auto position-relative" style={{ maxWidth: '44rem' }}>
              <form onSubmit={submitSearch}>
                <div
                  className="d-flex align-items-center rounded-pill px-3"
                  style={{ border: '1px solid #E0DED9', backgroundColor: '#fff', height: 42 }}
                >
                  <Search size={18} style={{ color: '#9A9287' }} />
                  <input
                    type="text"
                    placeholder="Product and something awesome..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSuggestOpen(true);
                    }}
                    onFocus={() => setSuggestOpen(true)}
                    onBlur={() => setTimeout(() => setSuggestOpen(false), 150)}
                    className="form-control border-0 bg-transparent shadow-none"
                    style={{ fontSize: '0.875rem' }}
                    aria-label="Search products"
                  />
                </div>
              </form>

              {suggestOpen && suggestions.length > 0 && (
                <div
                  className="position-absolute start-0 end-0 bg-white border rounded-3 shadow-lg mt-1 overflow-hidden"
                  style={{ zIndex: 1040 }}
                >
                  {suggestions.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="d-flex align-items-center justify-content-between px-3 py-2 text-decoration-none border-bottom"
                      style={{ fontSize: '0.875rem', color: '#2E2E2E' }}
                    >
                      <span>{p.name}</span>
                      <span style={{ color: '#6D6D6D', fontSize: '0.8125rem' }}>₹{p.price}</span>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={submitSearch}
                    className="btn w-100 text-start px-3 py-2 border-0"
                    style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#ED1C24' }}
                  >
                    See all results for “{query}”
                  </button>
                </div>
              )}
            </div>

            <div className="d-flex align-items-center gap-2 flex-shrink-0 ms-auto">
              <Link href="/search" className="d-lg-none btn p-2 border-0" style={{ color: '#2E2E2E' }} aria-label="Search">
                <Search size={20} />
              </Link>

              <Link
                href="/contact"
                className="d-none d-md-flex flex-column align-items-center text-decoration-none px-2"
                style={{ color: '#2E2E2E' }}
              >
                <Headphones size={18} />
                <span style={{ fontSize: 11 }}>Support</span>
              </Link>

              <Link
                href="/cart"
                className="d-flex flex-column align-items-center text-decoration-none px-2 position-relative"
                style={{ color: '#2E2E2E' }}
              >
                <ShoppingCart size={18} />
                <span className="d-none d-sm-inline" style={{ fontSize: 11 }}>Cart</span>
                {itemCount > 0 && (
                  <span
                    className="position-absolute text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      top: -4, right: 0, minWidth: 18, height: 18,
                      fontSize: 10, fontWeight: 700, backgroundColor: '#ED1C24', padding: '0 4px',
                    }}
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              <Link
                href={user ? '/account' : '/auth/login'}
                className="d-none d-sm-flex flex-column align-items-center text-decoration-none px-2"
                style={{ color: '#2E2E2E' }}
              >
                <User size={18} />
                <span style={{ fontSize: 11 }}>{user ? 'Account' : 'Sign In'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ---- department nav + mega menu --------------------------------- */}
        {/* Both live inside navRef so a mousedown on a mega-menu link is not
            treated as an outside click, which would unmount the link before
            its click event could navigate. */}
        <div ref={navRef} onMouseLeave={leaveNav}>
        <div
          className="d-none d-xl-block border-top"
          style={{ borderColor: '#EFEDE8', backgroundColor: '#FFFFFC' }}
        >
          <div className="container">
            <nav className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                {inline.map((dept) => {
                  const isOpen = openTab === dept.slug;
                  return (
                    <Link
                      key={dept.slug}
                      href={`/shop/${dept.slug}`}
                      onMouseEnter={() => enterTab(dept.slug)}
                      className="text-nowrap text-decoration-none"
                      style={{
                        padding: '13px 11px',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: isOpen ? '#ED1C24' : '#2E2E2E',
                        borderBottom: `2px solid ${isOpen ? '#ED1C24' : 'transparent'}`,
                      }}
                    >
                      {dept.navLabel}
                    </Link>
                  );
                })}
              </div>

              {overflow.length > 0 && (
                <div className="position-relative" onMouseEnter={() => { setMoreOpen(true); setOpenTab(null); }}>
                  <button
                    className="btn btn-sm border-0 text-nowrap d-flex align-items-center gap-1"
                    style={{ padding: '13px 8px', fontSize: '0.8125rem', fontWeight: 500, color: moreOpen ? '#ED1C24' : '#2E2E2E' }}
                    onClick={() => setMoreOpen((v) => !v)}
                  >
                    More
                    <ChevronDown size={13} style={{ transform: moreOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
                  </button>
                  {moreOpen && (
                    <div
                      className="position-absolute end-0 bg-white border rounded-3 shadow-lg py-2"
                      style={{ minWidth: 260, zIndex: 1040 }}
                      onMouseLeave={() => setMoreOpen(false)}
                    >
                      {overflow.map((dept) => (
                        <Link
                          key={dept.slug}
                          href={`/shop/${dept.slug}`}
                          className="d-block px-3 py-2 text-decoration-none"
                          style={{ fontSize: '0.875rem', color: '#2E2E2E' }}
                          onClick={() => setMoreOpen(false)}
                        >
                          {dept.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>

        {/* ---- mega menu --------------------------------------------------- */}
        {active && (
          <div
            className="d-none d-xl-block border-top shadow-lg"
            style={{ borderColor: '#EFEDE8', backgroundColor: '#fff' }}
            onMouseEnter={() => enterTab(active.slug)}
          >
            <div className="container py-4">
              <div className="row g-4">
                {active.categories.map((cat) => (
                  <div key={cat.slug} className="col-3">
                    <Link
                      href={`/category/${cat.slug}`}
                      className="d-block mb-2 text-decoration-none"
                      style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F0F0F' }}
                    >
                      {cat.name}
                    </Link>
                    <ul className="list-unstyled mb-0">
                      {cat.products.slice(0, LINKS_PER_CATEGORY).map((p) => (
                        <li key={p.slug} className="mb-1">
                          <Link
                            href={`/products/${p.slug}`}
                            className="text-decoration-none d-block text-truncate"
                            style={{ fontSize: '0.8125rem', color: '#6D6D6D' }}
                          >
                            {p.name}
                          </Link>
                        </li>
                      ))}
                      {cat.products.length > LINKS_PER_CATEGORY && (
                        <li>
                          <Link
                            href={`/category/${cat.slug}`}
                            className="text-decoration-none d-inline-flex align-items-center gap-1"
                            style={{ fontSize: '0.8125rem', color: '#ED1C24', fontWeight: 600 }}
                          >
                            +{cat.products.length - LINKS_PER_CATEGORY} products
                            <ChevronRight size={12} />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border-top mt-3 pt-3">
                <Link
                  href={`/shop/${active.slug}`}
                  className="text-decoration-none d-inline-flex align-items-center gap-1"
                  style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#ED1C24' }}
                >
                  View all {active.name}
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}
        </div>
      </header>

      {/* ---- mobile drawer ------------------------------------------------ */}
      {mobileOpen && (
        <div
          className="d-xl-none bg-white border-bottom position-fixed start-0 end-0 overflow-auto"
          style={{ top: 68, zIndex: 1020, maxHeight: 'calc(100vh - 68px)' }}
        >
          <div className="container py-3">
            <form onSubmit={submitSearch} className="mb-3">
              <div className="d-flex align-items-center rounded-pill px-3" style={{ border: '1px solid #E0DED9', height: 42 }}>
                <Search size={18} style={{ color: '#9A9287' }} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="form-control border-0 bg-transparent shadow-none"
                  style={{ fontSize: '0.875rem' }}
                />
              </div>
            </form>

            {DEPARTMENTS.map((dept) => (
              <div key={dept.slug} className="border-bottom">
                <button
                  className="btn w-100 d-flex align-items-center justify-content-between py-2 border-0 text-start"
                  style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2E2E2E' }}
                  onClick={() => setMobileAccordion(mobileAccordion === dept.slug ? null : dept.slug)}
                >
                  <span>{dept.name}</span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: '#9A9287',
                      transition: 'transform .2s',
                      transform: mobileAccordion === dept.slug ? 'rotate(180deg)' : 'none',
                    }}
                  />
                </button>
                {mobileAccordion === dept.slug && (
                  <div className="pb-2">
                    {dept.categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="d-block ps-3 py-2 text-decoration-none"
                        style={{ fontSize: '0.8125rem', color: '#6D6D6D' }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <Link
                      href={`/shop/${dept.slug}`}
                      className="d-block ps-3 py-2 text-decoration-none"
                      style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#ED1C24' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      View all {dept.name}
                    </Link>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-3 pb-4 d-grid gap-2">
              <Link
                href={user ? '/account' : '/auth/login'}
                onClick={() => setMobileOpen(false)}
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                style={{ fontSize: '0.875rem', fontWeight: 500 }}
              >
                <User size={16} />
                {user ? 'My Account' : 'Sign In'}
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                style={{ fontSize: '0.875rem', fontWeight: 500 }}
              >
                <Headphones size={16} />
                Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
