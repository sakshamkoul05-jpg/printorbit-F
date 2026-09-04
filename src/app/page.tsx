'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Package,
  Headphones,
  Grid3X3,
  Truck,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  ArrowRight,
} from 'lucide-react';

const heroSlides = [
  {
    title: 'DIWALI GIFT HAMPERS',
    subtitle: 'Lock in your bulk orders now and save more. Curated hampers start at ₹599. No minimum required.',
    cta: 'Lock In Your Order',
    href: '/products?category=gift-hampers',
    bg: 'linear-gradient(to right, #8B0000, #DC143C)',
  },
  {
    title: 'CUSTOM PRINTING & CORPORATE GIFTING SOLUTIONS',
    subtitle: 'Creative, customisable, and cost-effective',
    cta: 'Explore Corporate Gifts',
    href: '/products?category=corporate-gifts',
    bg: 'linear-gradient(to right, #1a1a2e, #16213e)',
  },
  {
    title: 'T-SHIRTS & MORE',
    subtitle: 'Your team. Your logo. Your vibe. Tees from ₹345',
    cta: 'Build Your Brand',
    href: '/products?category=apparel',
    bg: 'linear-gradient(to right, #0F0F0F, #2E2E2E)',
  },
  {
    title: 'SIPPERS & WATER BOTTLES',
    subtitle: 'Sip smart, Sip personalised, custom sippers start at ₹245. No minimum required.',
    cta: 'Customise Your Bottle',
    href: '/products?category=drinkware',
    bg: 'linear-gradient(to right, #1B3A4B, #065A82)',
  },
  {
    title: 'DESIGN YOUR OWN',
    subtitle: 'Use our free online design tool',
    cta: 'Open Design Studio',
    href: '/design-studio',
    bg: 'linear-gradient(to right, #3D0C02, #8B0000)',
  },
];

const trustItems = [
  { icon: Package, title: 'Personalisable Products', desc: 'All products can be customised with your logo or name.' },
  { icon: Headphones, title: 'Exceptional Support', desc: 'Best-in-industry support for our customers.' },
  { icon: Grid3X3, title: 'Wide Portfolio', desc: 'Over 100 product types to give you plenty of choices.' },
  { icon: Truck, title: 'On-Time Delivery', desc: 'We fulfil all orders on time and honour our commitments.' },
  { icon: ShoppingBag, title: 'Single Order', desc: 'Order a single item before placing a bulk order.' },
];

const popularCategories = [
  { name: 'APPARELS', href: '/products?category=apparel' },
  { name: 'DRINKWARE', href: '/products?category=drinkware' },
  { name: 'BAGS', href: '/products?category=bags' },
  { name: 'LUNCH BOXES', href: '/products?category=drinkware' },
  { name: 'ELECTRONIC GADGETS', href: '/products?category=gadgets' },
  { name: 'DESK ACCESSORIES', href: '/products?category=stationery' },
  { name: 'AWARDS', href: '/products?category=awards' },
  { name: 'LAPTOP SLEEVES', href: '/products?category=gadgets' },
];

const apparelSubcats = [
  { name: 'T-SHIRTS', href: '/products?category=apparel' },
  { name: 'JACKETS & HOODIES', href: '/products?category=apparel' },
  { name: 'FORMAL SHIRTS', href: '/products?category=apparel' },
  { name: 'CAPS', href: '/products?category=apparel' },
];

const promiseItems = [
  { label: 'Engraving', color: '#ED1C24' },
  { label: 'Lamination', color: '#0F0F0F' },
  { label: 'Laser', color: '#2E2E2E' },
  { label: 'Packaging', color: '#8B0000' },
];

const trendingCategories = [
  { name: 'Office Supplies', icon: '📦' },
  { name: 'Kits & Hampers', icon: '🎁' },
  { name: 'Apparel', icon: '👕' },
  { name: 'Gadgets', icon: '🔌' },
  { name: 'Corporate Gifts', icon: '💼' },
  { name: 'Drinkware', icon: '🥤' },
];

const blogPosts = [
  {
    title: 'A Comprehensive Guide to Paper Types & Printing Essentials',
    readTime: '10 min read',
    color: '#F5E6D3',
  },
  {
    title: 'How to Design a T-Shirt for Your Brand',
    readTime: '17 min read',
    color: '#E8D5E0',
  },
  {
    title: "PrintStop's Comprehensive Guide to Customisation Options",
    readTime: '10 min read',
    color: '#D5E8D4',
  },
];

const testimonials = [
  {
    quote: 'PrintStop delivered exceptional quality corporate gifts for our annual event. The team was incredibly helpful and delivered on time. Highly recommended!',
    name: 'Priya Sharma',
    company: 'Marketing Head, TechVista',
  },
  {
    quote: 'We order branded apparel for our entire team every quarter. The print quality and fabric are consistently excellent. A reliable partner for all our needs.',
    name: 'Rahul Mehta',
    company: 'HR Manager, FinServ Solutions',
  },
  {
    quote: 'From desk accessories to drinkware, every product we have ordered has been top-notch. The single order option is perfect for sampling before bulk orders.',
    name: 'Anjali Patel',
    company: 'Operations Lead, GreenEarth',
  },
];

const clientLogos = [
  'Bajaj Allianz', 'Birla Opus', 'Capgemini', 'Dr Reddys', 'HDFC Ergo',
  'Kotak', 'L&T Finance', 'Niva Bupa', 'Siemens', 'Tech Mahindra',
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="min-vh-100" style={{ backgroundColor: '#F4F2EF' }}>
      {/* HERO BANNER CAROUSEL */}
      <div className="position-relative w-100 overflow-hidden" style={{ height: '640px' }}>
        {heroSlides.map((slide, i) => (
          <div
            key={slide.title}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              opacity: i === currentSlide ? 1 : 0,
              zIndex: i === currentSlide ? 10 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <div className="w-100 h-100" style={{ background: slide.bg }} />
            <div className="container h-100">
              <div className="position-relative h-100 d-flex flex-column justify-content-center" style={{ maxWidth: '42rem', zIndex: 10 }}>
                <h2 className="fw-bold text-white mb-3" style={{ fontSize: '3.5rem', lineHeight: 1.1 }}>
                  {slide.title}
                </h2>
                <p className="text-white mb-4" style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '28rem' }}>
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="d-none d-sm-inline-flex align-items-center justify-content-center text-decoration-none fw-semibold px-4 py-2 rounded-pill"
                  style={{ backgroundColor: '#fff', color: '#0F0F0F', width: 'fit-content', fontSize: '0.875rem' }}
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="position-absolute bottom-4 start-50 translate-middle-x d-flex gap-2" style={{ zIndex: 20 }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="rounded-circle border-0"
              style={{
                width: 12, height: 12,
                backgroundColor: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.4)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="position-absolute top-50 start-0 translate-middle-y d-flex align-items-center justify-content-center border-0 rounded-circle"
          style={{ zIndex: 20, width: 40, height: 40, marginLeft: '1rem', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="position-absolute top-50 end-0 translate-middle-y d-flex align-items-center justify-content-center border-0 rounded-circle"
          style={{ zIndex: 20, width: 40, height: 40, marginRight: '1rem', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* WHY CHOOSE OUR SERVICES */}
      <div className="bg-white border-bottom" style={{ borderColor: '#E5E5E5' }}>
        <div className="container py-5">
          <h2 className="fs-3 fw-bold text-center mb-4" style={{ color: '#0F0F0F' }}>
            Why Choose Our Services
          </h2>
          <div className="row g-4">
            {trustItems.map((item) => (
              <div key={item.title} className="col-6 col-sm-4 col-md">
                <div className="d-flex flex-column align-items-center text-center gap-2 p-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: 48, height: 48, backgroundColor: '#F4F2EF' }}>
                    <item.icon size={24} color="#ED1C24" />
                  </div>
                  <h3 className="fw-bold mb-0" style={{ fontSize: '0.875rem', color: '#0F0F0F' }}>{item.title}</h3>
                  <p className="mb-0" style={{ fontSize: '0.75rem', color: '#2E2E2E', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRIED, TESTED & MOST LOVED */}
      <div style={{ backgroundColor: '#F5F0E1' }}>
        <div className="container py-5">
          <h2 className="fs-3 fw-bold text-center mb-4" style={{ color: '#0F0F0F' }}>
            Tried, Tested &amp; Most Loved
          </h2>
          <div className="row g-3">
            {popularCategories.map((cat) => (
              <div key={cat.name} className="col-6 col-sm-4 col-md-3">
                <Link
                  href={cat.href}
                  className="text-decoration-none bg-white rounded-3 d-block overflow-hidden"
                  style={{ border: '1px solid #E5E5E5' }}
                >
                  <div className="d-flex align-items-center justify-content-center" style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, #F5F0E1, #E8E0D0)' }}>
                    <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: 80, height: 80, backgroundColor: '#E5E5E5' }}>
                      <Package size={32} color="#2E2E2E" />
                    </div>
                  </div>
                  <div className="p-2 text-center">
                    <h3 className="fw-bold mb-0" style={{ fontSize: '0.875rem', color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CORPORATE APPAREL */}
      <div className="bg-white">
        <div className="container py-5">
          <div className="row align-items-center g-4 mb-5">
            <div className="col-md-6">
              <h2 className="fs-2 fw-bold mb-3" style={{ color: '#0F0F0F', lineHeight: 1.2 }}>
                Corporate Apparel That Speaks Your Brand
              </h2>
              <p className="mb-3" style={{ fontSize: '1rem', color: '#2E2E2E', lineHeight: 1.6 }}>
                From formal shirts to casual tees, explore our range of customised apparel. Perfect for employee wear, giveaways, or corporate gifting.
              </p>
              <Link href="/products?category=apparel" className="d-inline-flex align-items-center gap-1 text-decoration-none fw-semibold" style={{ color: '#ED1C24', fontSize: '0.875rem' }}>
                View Range <ArrowRight size={16} />
              </Link>
            </div>
            <div className="col-md-6">
              <div className="rounded-4 d-flex align-items-center justify-content-center" style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, #F5F0E1, #E8E0D0)', maxWidth: '28rem', marginLeft: 'auto' }}>
                <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: 128, height: 128, backgroundColor: '#E5E5E5' }}>
                  <Package size={48} color="#2E2E2E" />
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3">
            {apparelSubcats.map((cat) => (
              <div key={cat.name} className="col-6 col-md-3">
                <Link
                  href={cat.href}
                  className="text-decoration-none bg-white d-block text-center p-4 rounded-3"
                  style={{ border: '1px solid #E5E5E5' }}
                >
                  <h3 className="fw-bold mb-0" style={{ fontSize: '0.875rem', color: '#0F0F0F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {cat.name}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BULK ORDER BANNER */}
      <div style={{ backgroundColor: '#0F0F0F' }}>
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
            <h2 className="fw-bold text-white text-center text-md-start mb-0" style={{ fontSize: '1.5rem', maxWidth: '32rem' }}>
              Ordering Branded Merchandise in Bulk? We&apos;ve Got You Covered
            </h2>
            <Link
              href="/contact"
              className="d-inline-flex align-items-center justify-content-center text-decoration-none fw-semibold px-4 py-2 rounded-pill flex-shrink-0"
              style={{ backgroundColor: '#ED1C24', color: '#fff' }}
            >
              Let&apos;s Discuss
            </Link>
          </div>
        </div>
      </div>

      {/* PRINTSTOP'S PROMISE */}
      <div className="bg-white">
        <div className="container py-5">
          <div className="text-center mb-4">
            <h2 className="fs-3 fw-bold mb-3" style={{ color: '#0F0F0F' }}>
              PrintStop&apos;s Promise: Printing at its Best. Period.
            </h2>
            <p style={{ color: '#2E2E2E', maxWidth: '48rem', margin: '0 auto', lineHeight: 1.6 }}>
              We use the latest technology and highest quality materials to deliver products that exceed your expectations.
            </p>
            <Link href="/products" className="d-inline-flex align-items-center gap-1 text-decoration-none fw-semibold mt-2" style={{ color: '#ED1C24', fontSize: '0.875rem' }}>
              Continue exploring <ArrowRight size={16} />
            </Link>
          </div>

          <div className="row g-3 mt-4">
            {promiseItems.map((item) => (
              <div key={item.label} className="col-6 col-md-3">
                <div className="rounded-3 overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                  <div style={{ aspectRatio: '4/3', backgroundColor: item.color }} />
                  <div className="p-3 text-center bg-white">
                    <h3 className="fw-bold mb-0" style={{ fontSize: '0.875rem', color: '#0F0F0F' }}>{item.label}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRENDING CATEGORIES */}
      <div style={{ backgroundColor: '#F4F2EF' }}>
        <div className="container py-5">
          <div className="row g-4 align-items-start">
            <div className="col-md-5">
              <h2 className="fs-3 fw-bold mb-2" style={{ color: '#0F0F0F', lineHeight: 1.2 }}>
                These categories are getting all the love!
              </h2>
              <p style={{ color: '#2E2E2E' }}>
                Explore our most popular product categories loved by businesses across India.
              </p>
            </div>
            <div className="col-md-7">
              <div className="row g-3">
                {trendingCategories.map((cat) => (
                  <div key={cat.name} className="col-6">
                    <Link
                      href={`/products?category=${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="d-flex align-items-center gap-3 bg-white text-decoration-none rounded-3 px-4 py-3"
                      style={{ border: '1px solid #E5E5E5' }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                      <span className="fw-semibold" style={{ fontSize: '0.875rem', color: '#0F0F0F' }}>{cat.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOG SECTION */}
      <div className="bg-white">
        <div className="container py-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="fs-3 fw-bold mb-0" style={{ color: '#0F0F0F' }}>
              Print Tales &amp; Pro Tips
            </h2>
            <Link href="/blog" className="d-inline-flex align-items-center gap-1 text-decoration-none fw-semibold" style={{ color: '#ED1C24', fontSize: '0.875rem' }}>
              Read PS Blogs <ArrowRight size={16} />
            </Link>
          </div>

          <div className="row g-4">
            {blogPosts.map((post) => (
              <div key={post.title} className="col-md-4">
                <article className="bg-white rounded-3 overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                  <div style={{ aspectRatio: '16/10', backgroundColor: post.color }} />
                  <div className="p-4">
                    <p className="mb-2 fw-medium" style={{ fontSize: '0.75rem', color: '#2E2E2E' }}>{post.readTime}</p>
                    <h3 className="fw-bold mb-0" style={{ fontSize: '1rem', color: '#0F0F0F', lineHeight: 1.4 }}>
                      {post.title}
                    </h3>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ backgroundColor: '#F4F2EF' }}>
        <div className="container py-5">
          <div className="text-center mb-4">
            <h2 className="fs-3 fw-bold mb-3" style={{ color: '#0F0F0F' }}>
              Our customers speak for us
            </h2>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
              <div className="d-flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} fill="#ED1C24" color="#ED1C24" />
                ))}
              </div>
              <span className="fw-semibold" style={{ fontSize: '0.875rem', color: '#0F0F0F' }}>rating on Google</span>
            </div>
            <p style={{ color: '#2E2E2E', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.6 }}>
              Across our years of experience, we have provided printing solutions for more than 100+ clients from every professions.
            </p>
            <Link href="/testimonials" className="d-inline-flex align-items-center gap-1 text-decoration-none fw-semibold mt-2" style={{ color: '#ED1C24', fontSize: '0.875rem' }}>
              Read Testimonials <ArrowRight size={16} />
            </Link>
          </div>

          <div className="row g-4 mt-3">
            {testimonials.map((t) => (
              <div key={t.name} className="col-md-4">
                <div className="bg-white rounded-3 p-4 d-flex flex-column h-100" style={{ border: '1px solid #E5E5E5' }}>
                  <Quote size={32} style={{ color: 'rgba(237,28,36,0.3)' }} className="mb-3" />
                  <p className="flex-grow-1 mb-4" style={{ fontSize: '0.875rem', color: '#2E2E2E', lineHeight: 1.6, fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="fw-bold mb-0" style={{ fontSize: '0.875rem', color: '#0F0F0F' }}>{t.name}</p>
                    <p className="mb-0" style={{ fontSize: '0.75rem', color: '#2E2E2E' }}>{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CLIENT LOGOS MARQUEE */}
      <div className="bg-white overflow-hidden" style={{ borderTop: '1px solid #E5E5E5' }}>
        <div className="py-4">
          <div className="marquee-content">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={`${logo}-${i}`} className="mx-4 d-flex align-items-center justify-content-center">
                <span className="fw-bold text-nowrap" style={{ fontSize: '1rem', color: '#2E2E2E', opacity: 0.5, letterSpacing: '-0.02em' }}>
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO TEXT */}
      <div style={{ backgroundColor: '#F4F2EF' }}>
        <div className="container py-5">
          <div className="mx-auto" style={{ maxWidth: '56rem' }}>
            <div className="mb-4">
              <h2 className="fs-4 fw-bold mb-3" style={{ color: '#0F0F0F' }}>
                Corporate Gifting, Printing &amp; Merchandise for Businesses
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#2E2E2E', lineHeight: 1.6 }}>
                PrintStop is India&apos;s leading online platform for corporate gifting, custom printing, and branded merchandise. We offer a wide range of products including customised apparel, drinkware, bags, electronic gadgets, desk accessories, and more. Whether you need bulk orders for employee onboarding, festival gifting, or promotional events, PrintStop has you covered with premium quality products at competitive prices.
              </p>
            </div>
            <div className="mb-4">
              <h2 className="fs-4 fw-bold mb-3" style={{ color: '#0F0F0F' }}>
                Why Buy Corporate Diwali Gifts from PrintOrbit?
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#2E2E2E', lineHeight: 1.6 }}>
                Diwali is the perfect occasion to strengthen relationships with employees, clients, and business partners through thoughtful gifting. PrintStop offers a curated collection of Diwali gift hampers that combine traditional warmth with modern branding. From premium chocolate boxes to customised drinkware sets, our hampers start at just ₹599 with no minimum order required.
              </p>
            </div>
            <div>
              <h2 className="fs-4 fw-bold mb-3" style={{ color: '#0F0F0F' }}>
                Bulk Printing and Merchandise Delivery Across Multiple Locations in India
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#2E2E2E', lineHeight: 1.6 }}>
                PrintStop provides seamless bulk printing and merchandise delivery services across multiple locations in India. Whether your team is spread across Mumbai, Delhi, Bangalore, Chennai, Hyderabad, or any other city, we ensure consistent quality and timely delivery to all your offices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
