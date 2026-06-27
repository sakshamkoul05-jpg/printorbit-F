'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, Search, ShoppingCart, User } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black border-b border-gold/10"
      >
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
      </motion.div>

      {/* Main Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center glow-gold"
              >
                <span className="text-black font-bold text-xl">P</span>
              </motion.div>
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
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-white-muted hover:text-gold transition-all duration-300 rounded-lg hover:bg-gold/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 text-white-muted hover:text-gold transition-colors rounded-lg hover:bg-gold/5"
              >
                <Search className="w-5 h-5" />
              </motion.button>
              <Link href="/cart" className="p-2.5 text-white-muted hover:text-gold transition-colors rounded-lg hover:bg-gold/5 relative">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    0
                  </span>
                </motion.div>
              </Link>
              <Link href="/auth/login" className="ml-2">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 bg-gradient-to-r from-gold to-gold-dark text-black text-sm font-semibold rounded-lg inline-block hover:shadow-[0_0_20px_rgba(212,168,83,0.3)] transition-all duration-300"
                >
                  Sign In
                </motion.span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 text-white-muted hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass border-t border-gold/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-sm font-medium text-white-muted hover:text-gold hover:bg-gold/5 rounded-lg transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
