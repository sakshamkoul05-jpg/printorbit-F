'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { OFFICES, PRODUCT_CATEGORIES } from '@/lib/constants';
import Container from '@/components/ui/Container';

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg font-heading">P</span>
                </div>
                <span className="text-xl font-bold text-white font-heading">PrintOrbit</span>
              </Link>
              <p className="text-sm text-white/50 mb-5 leading-relaxed max-w-sm">
                India&apos;s premium printing platform for businesses, startups, and organizations. Quality guaranteed.
              </p>
              <div className="space-y-2 text-sm text-white/50">
                {OFFICES.map((office) => (
                  <p key={office.city} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {office.city}
                  </p>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-semibold mb-4 text-white font-heading">Products</h3>
              <ul className="space-y-2.5">
                {PRODUCT_CATEGORIES.slice(0, 6).map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/products/${cat.slug}`} className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1 group">
                      {cat.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-white font-heading">Quick Links</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Portfolio', href: '/portfolio' },
                  { label: 'Our Clients', href: '/clients' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Request Quote', href: '/quote/request' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1 group">
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4 text-white font-heading">Contact Us</h3>
              <div className="space-y-4">
                {OFFICES.map((office) => (
                  <div key={office.city} className="text-sm">
                    <p className="text-white font-medium">{office.city}</p>
                    <p className="text-white/40 mt-0.5">{office.address}</p>
                    <p className="flex items-center gap-1.5 text-white/40 mt-1">
                      <Phone className="w-3 h-3" />
                      {office.phone}
                    </p>
                    <p className="flex items-center gap-1.5 text-white/40 mt-0.5">
                      <Mail className="w-3 h-3" />
                      {office.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>&copy; {new Date().getFullYear()} PrintOrbit. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/60 transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
