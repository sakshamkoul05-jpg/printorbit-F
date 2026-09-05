'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DEPARTMENTS } from '@/lib/catalog';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '@/lib/constants';

const Instagram = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
const Twitter = () => <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
const Linkedin = () => <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
const Youtube = () => <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
const Facebook = () => <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
const Pinterest = () => <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146A12 12 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>;

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: Facebook },
  { label: 'X', href: 'https://x.com/', Icon: Twitter },
  { label: 'YouTube', href: 'https://www.youtube.com/', Icon: Youtube },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: Linkedin },
  { label: 'Pinterest', href: 'https://in.pinterest.com/', Icon: Pinterest },
];

const CUSTOMER_SUPPORT = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Track my Order', href: '/account' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Return & Refund Policy', href: '/policies/returns' },
  { label: 'Privacy Policy', href: '/policies/privacy' },
  { label: 'Terms & Conditions', href: '/policies/terms' },
];

const SERVICES = [
  { label: 'Design Studio', href: '/design-studio' },
  { label: 'Templates', href: '/templates' },
  { label: 'Mockup Generator', href: '/mockup-generator' },
  { label: 'Print Utilities', href: '/utilities' },
  { label: 'Bulk & Corporate Orders', href: '/corporate' },
  { label: 'Request a Quote', href: '/quote/request' },
  { label: 'Sample Kit', href: '/sample-kit' },
];

const COMPANY_INFO = [
  { label: 'About Us', href: '/about' },
  { label: 'Working with PrintOrbit', href: '/clients' },
  { label: 'PrintOrbit Blog', href: '/blog' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Testimonials', href: '/testimonials' },
];

const CURRENCIES = ['Rupees', 'USD', 'Euro', 'GBP'];

const PAYMENT_METHODS = ['Visa', 'MasterCard', 'RuPay', 'UPI', 'Amex', 'Net Banking'];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="col-6 col-lg-3">
      <h3
        className="text-white fw-semibold mb-3"
        style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}
      >
        {title}
      </h3>
      <ul className="list-unstyled mb-0">
        {links.map((l) => (
          <li key={l.label} className="mb-2">
            <Link href={l.href} className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem' }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [currency, setCurrency] = useState('Rupees');

  const allProducts = DEPARTMENTS.map((d) => ({
    label: d.name,
    href: `/shop/${d.slug}`,
  }));

  return (
    <footer style={{ backgroundColor: '#0F0F0F' }} className="text-white">
      <div className="container py-5">
        <div className="row g-4">
          <Column title="All Products" links={allProducts.slice(0, 8)} />
          <Column title="Customer Support" links={CUSTOMER_SUPPORT} />
          <Column title="Services" links={SERVICES} />

          <div className="col-6 col-lg-3">
            <h3
              className="text-white fw-semibold mb-3"
              style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
              Company Info
            </h3>
            <ul className="list-unstyled mb-4">
              {COMPANY_INFO.map((l) => (
                <li key={l.label} className="mb-2">
                  <Link href={l.href} className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="d-flex flex-wrap gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="d-flex align-items-center justify-content-center rounded-circle text-decoration-none text-white"
                  style={{ width: 34, height: 34, backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* contact strip */}
      <div className="border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="container py-3">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div className="d-flex flex-wrap align-items-center gap-4">
              <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`} className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8125rem' }}>
                {SUPPORT_PHONE}
              </a>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8125rem' }}>
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div className="d-flex align-items-center gap-2">
              <label htmlFor="currency" className="mb-0" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                Currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="form-select form-select-sm border-0"
                style={{
                  width: 120,
                  fontSize: '0.8125rem',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c} style={{ color: '#000' }}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* payments */}
      <div className="border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="container py-3">
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
            <span className="text-uppercase fw-medium" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
              We Accept
            </span>
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
              {PAYMENT_METHODS.map((m) => (
                <span
                  key={m}
                  className="px-2 py-1 border rounded"
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.55)',
                    borderColor: 'rgba(255,255,255,0.12)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    fontWeight: 500,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="container py-3 text-center">
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
            © Copyright {new Date().getFullYear()} PrintOrbit India Pvt. Ltd. All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
