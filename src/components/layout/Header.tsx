'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { NAV_LINKS, PRODUCT_CATEGORIES } from '@/lib/constants';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      {/* Top Bar */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 text-slate-500 hover:text-navy transition-colors text-xs">
              <Phone className="w-3 h-3" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@printorbit.in" className="hidden sm:flex items-center gap-1.5 text-slate-500 hover:text-navy transition-colors text-xs">
              <Mail className="w-3 h-3" />
              <span>info@printorbit.in</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Dharamshala</span>
            <span className="text-slate-300">|</span>
            <span>Faridabad</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-navy rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-navy tracking-tight">PrintOrbit</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-navy transition-colors flex items-center gap-1 rounded hover:bg-slate-50">
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-[520px] bg-white rounded-lg shadow-lg border border-slate-200 p-4 grid grid-cols-2 gap-1"
                    >
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/products/${cat.slug}`}
                          className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-navy transition-colors rounded"
                          onClick={() => setProductsOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {NAV_LINKS.filter(l => l.label !== 'Products').map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-navy transition-colors rounded hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-navy transition-colors rounded hover:bg-slate-50">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/cart" className="p-2 text-slate-400 hover:text-navy transition-colors rounded hover:bg-slate-50 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link href="/auth/login" className="ml-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-navy transition-colors border border-slate-200 rounded hover:border-slate-300">
                Sign In
              </Link>
              <Link href="/quote/request" className="px-4 py-2 bg-navy text-white text-sm font-medium rounded hover:bg-navy-dark transition-colors">
                Get Quote
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 text-slate-500 hover:text-navy transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-navy hover:bg-slate-50 rounded transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-slate-100 my-2" />
              <a href="tel:+919876543210" className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-500">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <div className="flex gap-2 pt-2">
                <Link href="/auth/login" className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded text-center hover:bg-slate-50">
                  Sign In
                </Link>
                <Link href="/quote/request" className="flex-1 px-4 py-2.5 bg-navy text-white text-sm font-medium rounded text-center hover:bg-navy-dark">
                  Get Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
