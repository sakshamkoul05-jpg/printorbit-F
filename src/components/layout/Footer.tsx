import Link from 'next/link';
import { Phone, Mail, MapPin, Globe, ExternalLink, Share2, MessageCircle } from 'lucide-react';
import { OFFICES, PRODUCT_CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-printorbit-navy text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-printorbit-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Print</span>
                <span className="text-xl font-bold text-printorbit-red">Orbit</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Professional printing services for businesses, industries, and organizations across India.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-printorbit-red transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-printorbit-red transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-printorbit-red transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-printorbit-red transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/products/${cat.slug}`} className="text-sm hover:text-printorbit-red transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-printorbit-red transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-sm hover:text-printorbit-red transition-colors">Portfolio</Link></li>
              <li><Link href="/clients" className="text-sm hover:text-printorbit-red transition-colors">Our Clients</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-printorbit-red transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-printorbit-red transition-colors">FAQ</Link></li>
              <li><Link href="/quote/request" className="text-sm hover:text-printorbit-red transition-colors">Request Quote</Link></li>
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Offices</h3>
            <div className="space-y-4">
              {OFFICES.map((office) => (
                <div key={office.city} className="text-sm">
                  <p className="text-white font-medium">{office.city}, {office.state}</p>
                  <p className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    {office.address}
                  </p>
                  <p className="flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3 flex-shrink-0" />
                    {office.phone}
                  </p>
                  <p className="flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3 flex-shrink-0" />
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} PrintOrbit. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
