'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { OFFICES, MEGA_MENU_DATA } from '@/lib/constants';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';

const FOOTER_PRODUCTS = MEGA_MENU_DATA.slice(0, 4).map((tab) => ({
  category: tab.label,
  items: tab.categories.slice(0, 3).flatMap((cat) => cat.items.slice(0, 2).map((item) => ({ name: item.name, href: `/products/${item.slug}` }))),
}));

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: '#',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
];

const SUPPORT_LINKS = [
  { label: 'Help Center', href: '/faq' },
  { label: 'Order Tracking', href: '/account' },
  { label: 'Returns & Refunds', href: '/refund-policy' },
  { label: 'Shipping Info', href: '/shipping' },
  { label: 'File Guidelines', href: '/file-guidelines' },
  { label: 'Sample Kit', href: '/sample-kit' },
];

const PAYMENT_METHODS = ['Visa', 'Mastercard', 'UPI', 'PayTM', 'GPay'];

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-white">
      <Container>
        {/* Main Footer */}
        <div className="pt-16 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="mb-4 inline-block">
                <Logo dark={false} />
              </Link>
              <p className="text-sm text-white/50 mb-5 leading-relaxed max-w-xs">
                India&apos;s premium online printing platform. Design, customize, and order print products for your business.
              </p>
              <div className="space-y-2 text-sm text-white/50">
                {OFFICES.map((office) => (
                  <p key={office.city} className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    {office.address}
                  </p>
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-2.5 mt-6">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary/80 transition-colors"
                    title={social.label}
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Product Columns */}
            {FOOTER_PRODUCTS.map((group) => (
              <div key={group.category}>
                <h3 className="font-semibold text-sm mb-4 text-white">{group.category}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-xs text-white/45 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Company */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-white">Company</h3>
              <ul className="space-y-2.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-white/45 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-white">Support</h3>
              <ul className="space-y-2.5">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-white/45 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-sm text-white mb-1">Stay in the loop</h3>
              <p className="text-xs text-white/45">Get exclusive offers, design tips, and printing guides delivered to your inbox.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-2.5 bg-white/10 rounded-lg border border-white/15 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary transition-colors"
              />
              <button className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/35">
              <span>&copy; {new Date().getFullYear()} PrintOrbit. All rights reserved.</span>
              <Link href="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
              <Link href="/refund-policy" className="hover:text-white/60 transition-colors">Refund Policy</Link>
              <Link href="/sitemap" className="hover:text-white/60 transition-colors">Sitemap</Link>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35 uppercase tracking-wider">We Accept</span>
              <div className="flex gap-1.5">
                {PAYMENT_METHODS.map((method) => (
                  <span key={method} className="px-2.5 py-1 bg-white/10 text-[9px] text-white/50 rounded font-medium border border-white/10">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
