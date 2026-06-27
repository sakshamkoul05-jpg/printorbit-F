import Link from 'next/link';
import { Phone, Mail, MapPin, Globe, ExternalLink, Share2, MessageCircle } from 'lucide-react';
import { OFFICES, PRODUCT_CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold/10">
      {/* Gold divider */}
      <div className="divider-gold" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
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
            <p className="text-sm text-white-dim mb-6 leading-relaxed">
              Premium printing solutions for businesses, industries, and organizations. Crafted with precision, delivered with excellence.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, Share2, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-black-light border border-gold/10 flex items-center justify-center text-white-dim hover:text-gold hover:border-gold/30 hover:shadow-[0_0_15px_rgba(212,168,83,0.1)] transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Products
            </h3>
            <ul className="space-y-3">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/products/${cat.slug}`} className="text-sm text-white-dim hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-gold transition-all duration-300" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Our Clients', href: '/clients' },
                { label: 'Blog', href: '/blog' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Request Quote', href: '/quote/request' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white-dim hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-gold transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Our Offices
            </h3>
            <div className="space-y-6">
              {OFFICES.map((office) => (
                <div key={office.city} className="p-4 rounded-xl bg-black-light border border-gold/5 hover:border-gold/20 transition-colors">
                  <p className="text-white font-medium text-sm mb-2">{office.city}, {office.state}</p>
                  <div className="space-y-1.5 text-xs text-white-dim">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-gold/50 flex-shrink-0" />
                      {office.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-gold/50 flex-shrink-0" />
                      {office.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-gold/50 flex-shrink-0" />
                      {office.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white-dim">
          <p>&copy; {new Date().getFullYear()} PrintOrbit. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
