'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Mail, Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-black border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-1 text-white-muted text-xs hover:text-gold transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@printorbit.in" className="hidden sm:flex items-center gap-1 text-white-muted text-xs hover:text-gold transition-colors">
              <Mail className="w-3 h-3" />
              <span>info@printorbit.in</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs text-white-dim">
            <span>Dharamshala</span>
            <span className="text-gold/30">|</span>
            <span>Faridabad</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="glass">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center glow-gold">
                <span className="text-black font-bold text-xl">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-white">PRINT</span>
                  <span className="text-gradient-gold">ORBIT</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white-dim -mt-1">Premium Printing</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-white-muted hover:text-gold transition-all duration-300 rounded-lg hover:bg-gold/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="p-2.5 text-white-muted hover:text-gold transition-colors rounded-lg hover:bg-gold/5">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/cart" className="p-2.5 text-white-muted hover:text-gold transition-colors rounded-lg hover:bg-gold/5 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link href="/auth/login" className="ml-2 px-5 py-2 bg-gradient-to-r from-gold to-gold-dark text-black text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,168,83,0.3)] transition-all duration-300">
                Sign In
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 text-white-muted hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-gold/10">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-white-muted hover:text-gold hover:bg-gold/5 rounded-lg transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-gold/10 my-3" />
            <a href="tel:+919876543210" className="flex items-center gap-2 px-4 py-3 text-sm text-white-muted">
              <Phone className="w-4 h-4 text-gold" />
              +91 98765 43210
            </a>
            <div className="flex gap-3 pt-3">
              <Link href="/auth/login" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-black text-sm font-semibold rounded-lg text-center">
                Sign In
              </Link>
              <Link href="/quote/request" className="flex-1 px-4 py-2.5 border border-gold/30 text-gold text-sm font-medium rounded-lg text-center hover:bg-gold/5">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
