'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Mail, Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { NAV_LINKS, PRODUCT_CATEGORIES } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-printorbit-navy text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-printorbit-red transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@printorbit.in" className="hidden sm:flex items-center gap-1 hover:text-printorbit-red transition-colors">
              <Mail className="w-3 h-3" />
              <span>info@printorbit.in</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">|</span>
            <span>Dharamshala | Faridabad</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-printorbit-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <span className="text-xl font-bold text-printorbit-navy">Print</span>
              <span className="text-xl font-bold text-printorbit-red">Orbit</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-printorbit-slate hover:text-printorbit-red transition-colors rounded-md hover:bg-printorbit-red/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 text-printorbit-slate hover:text-printorbit-red transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="p-2 text-printorbit-slate hover:text-printorbit-red transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-printorbit-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <Button variant="primary" size="sm">
              <User className="w-4 h-4 mr-1" />
              Login
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-printorbit-slate"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-printorbit-slate hover:text-printorbit-red hover:bg-printorbit-red/5 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2" />
            <a href="tel:+919876543210" className="flex items-center gap-2 px-3 py-2 text-sm text-printorbit-slate">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
            <div className="flex gap-2 pt-2">
              <Button variant="primary" size="sm" className="flex-1">
                Login
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
