import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { OFFICES, PRODUCT_CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-lg font-bold text-white">PrintOrbit</span>
            </Link>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              Professional printing services for businesses and organizations across India.
            </p>
            <div className="space-y-2 text-sm text-white/50">
              {OFFICES.map((office) => (
                <p key={office.city} className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-white/30" />
                  {office.city}
                </p>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm">Products</h3>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/products/${cat.slug}`} className="text-sm text-white/50 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Our Clients', href: '/clients' },
                { label: 'Blog', href: '/blog' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Request Quote', href: '/quote/request' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm">Contact Us</h3>
            <div className="space-y-3">
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
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} PrintOrbit. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
