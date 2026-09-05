'use client';

import Link from 'next/link';
const Instagram = ({ className = "" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: 20, height: 20 }}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const Twitter = ({ className = "" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ width: 20, height: 20 }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Linkedin = ({ className = "" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ width: 20, height: 20 }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Youtube = ({ className = "" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ width: 20, height: 20 }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const Facebook = ({ className = "" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ width: 20, height: 20 }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
import { OFFICES } from '@/lib/constants';

const HELPFUL_LINKS = [
  { label: 'Help Centre', href: '/faq' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Return & Refund Policy', href: '/faq' },
  { label: 'Privacy Policy', href: '/about' },
];

const SERVICES = [
  { label: 'Design Studio', href: '/design-studio' },
  { label: 'Templates', href: '/templates' },
  { label: 'Corporate Gifts', href: '/products?category=corporate-gifts' },
];

const COMPANY_INFO = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Careers', href: '/contact' },
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

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="d-none d-md-flex justify-content-center align-items-center gap-1 pt-14 pb-8">
        {LOGO_LETTERS.map((letter, i) => (
          <span
            key={i}
            className="fw-black"
            style={{
              fontSize: '3.5rem',
              letterSpacing: '0.05em',
              color: i === 5 ? '#ff6600' : '#fff',
              fontStyle: i === 5 ? 'italic' : 'normal',
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="container pb-12">
        <div className="row g-4" style={{ rowGap: '2.5rem' }}>
          <div className="col-6 col-md-3">
            <h3 className="text-white fw-semibold mb-3" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Helpful Links
            </h3>
            <ul className="list-unstyled">
              {HELPFUL_LINKS.map((link) => (
                <li key={link.href} className="mb-2">
                  <Link href={link.href} className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h3 className="text-white fw-semibold mb-3" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Services
            </h3>
            <ul className="list-unstyled">
              {SERVICES.map((link) => (
                <li key={link.href} className="mb-2">
                  <Link href={link.href} className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h3 className="text-white fw-semibold mb-3" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Company Info
            </h3>
            <ul className="list-unstyled">
              {COMPANY_INFO.map((link) => (
                <li key={link.href} className="mb-2">
                  <Link href={link.href} className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h3 className="text-white fw-semibold mb-3" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Follow Us
            </h3>
            <div className="d-flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="d-flex align-items-center justify-content-center rounded-3 text-decoration-none"
                    style={{ width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    title={social.label}
                  >
                    <Icon className="text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="container py-4">
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
            <span className="text-uppercase fw-medium" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
              We Accept
            </span>
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="px-2 py-1 border rounded"
                  style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', opacity: 0.5, fontWeight: 500 }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
              &copy; 2025 PrintOrbit. All rights reserved.
            </span>
            <div className="d-flex align-items-center gap-4">
              <Link href="/about" className="text-decoration-none" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                Privacy Policy
              </Link>
              <Link href="/about" className="text-decoration-none" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
