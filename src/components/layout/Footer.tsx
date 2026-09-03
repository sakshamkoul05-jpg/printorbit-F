'use client';

import Link from 'next/link';
const Instagram = ({ className = "w-5 h-5" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const Twitter = ({ className = "w-5 h-5" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Linkedin = ({ className = "w-5 h-5" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Youtube = ({ className = "w-5 h-5" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const Facebook = ({ className = "w-5 h-5" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
import { OFFICES } from '@/lib/constants';

const HELPFUL_LINKS = [
  { label: 'Help Centre', href: '/help' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Return & Refund Policy', href: '/refund-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

const SERVICES = [
  { label: 'Design Studio', href: '/design-studio' },
  { label: 'Templates', href: '/templates' },
  { label: 'Corporate Gifts', href: '/corporate-gifts' },
];

const COMPANY_INFO = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Careers', href: '/careers' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Twitter/X', href: '#', icon: Twitter },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
  { label: 'YouTube', href: '#', icon: Youtube },
  { label: 'Facebook', href: '#', icon: Facebook },
];

const PAYMENT_METHODS = ['Visa', 'UPI', 'Amex', 'RuPay', 'MasterCard', 'Net Banking'];

const LOGO_LETTERS = ['P', 'R', 'I', 'N', 'T', 'O', 'R', 'B', 'I', 'T'];

const LETTER_STYLES = [
  'text-white font-black tracking-wider',
  'text-white font-black tracking-wider',
  'text-white font-black tracking-wider',
  'text-white font-black tracking-wider',
  'text-white font-black tracking-wider',
  'text-[#ff6600] font-black tracking-wider italic',
  'text-white font-black tracking-wider',
  'text-white font-black tracking-wider',
  'text-white font-black tracking-wider',
  'text-white font-black tracking-wider',
];

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white">
      {/* Top Section - Brand Logo */}
      <div className="hidden md:flex justify-center items-center gap-1 pt-14 pb-8">
        {LOGO_LETTERS.map((letter, i) => (
          <span
            key={i}
            className={`text-5xl lg:text-6xl ${LETTER_STYLES[i]}`}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Footer Columns */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Column 1 - Helpful Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">
              Helpful Links
            </h3>
            <ul className="space-y-3">
              {HELPFUL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company Info */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">
              Company Info
            </h3>
            <ul className="space-y-3">
              {COMPANY_INFO.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Social Icons */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                    title={social.label}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Row */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-white/40 text-xs uppercase tracking-wider font-medium">
            We Accept
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[11px] text-white/50 font-medium opacity-50"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/30 text-xs">
            &copy; 2024 PrintOrbit. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-white/30 text-xs hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/30 text-xs hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
