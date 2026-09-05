'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
import { img, pick } from '@/lib/images';

const heroSlides = [
  {
    title: 'DIWALI GIFT HAMPERS',
    subtitle: 'Lock in your bulk orders now and save more. Curated hampers start at ₹599. No minimum required.',
    cta: 'Lock In Your Order',
    href: '/shop/gift-hampers',
    image: img(pick('festive', 0), 1600, 720),
  },
  {
    title: 'CUSTOM PRINTING & CORPORATE GIFTING SOLUTIONS',
    subtitle: 'Creative, customisable, and cost-effective',
    cta: 'Explore Corporate Gifts',
    href: '/shop/kits-hampers',
    image: img(pick('printing', 0), 1600, 720),
  },
  {
    title: 'T-SHIRTS & MORE',
    subtitle: 'Your team. Your logo. Your vibe. Tees from ₹345',
    cta: 'Build Your Brand',
    href: '/shop/custom-clothing',
    image: img(pick('round-neck-t-shirts', 1), 1600, 720),
  },
  {
    title: 'SIPPERS & WATER BOTTLES',
    subtitle: 'Sip smart, Sip personalised. Custom sippers start at ₹245. No minimum required.',
    cta: 'Customise Your Bottle',
    href: '/category/everyday-bottles',
    image: img(pick('everyday-bottles', 2), 1600, 720),
  },
  {
    title: 'VISITING CARDS FROM ₹179',
    subtitle: 'High-definition printing on premium stocks, delivered in 3 days.',
    cta: 'Order Visiting Cards',
    href: '/category/visiting-cards',
    image: img(pick('visiting-cards', 2), 1600, 720),
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
  { name: 'APPARELS', href: '/shop/custom-clothing', image: img(pick('polo-t-shirts', 0), 480, 360) },
  { name: 'DRINKWARE', href: '/shop/drinkware-lunchboxes', image: img(pick('insulated-bottles-flasks', 0), 480, 360) },
  { name: 'BAGS', href: '/shop/bags', image: img(pick('laptop-bags', 0), 480, 360) },
  { name: 'LUNCH BOXES', href: '/category/lunch-boxes', image: img(pick('lunch-boxes', 0), 480, 360) },
  { name: 'ELECTRONIC GADGETS', href: '/shop/gadgets-accessories', image: img(pick('bluetooth-speakers', 0), 480, 360) },
  { name: 'DESK ACCESSORIES', href: '/category/desk-accessories', image: img(pick('desk-accessories', 0), 480, 360) },
  { name: 'AWARDS', href: '/shop/awards-trophies', image: img(pick('trophies', 0), 480, 360) },
  { name: 'LAPTOP SLEEVES', href: '/category/laptop-sleeves', image: img(pick('laptop-sleeves', 0), 480, 360) },
];

const apparelSubcats = [
  { name: 'T-SHIRTS', href: '/category/round-neck-t-shirts', image: img(pick('round-neck-t-shirts', 0), 400, 400) },
  { name: 'JACKETS & HOODIES', href: '/category/jackets-hoodies', image: img(pick('jackets-hoodies', 0), 400, 400) },
  { name: 'SPORTSWEAR', href: '/category/sports-apparel', image: img(pick('sports-apparel', 0), 400, 400) },
  { name: 'FORMAL SHIRTS', href: '/category/shirts', image: img(pick('shirts', 0), 400, 400) },
];

const promiseItems = [
  { label: 'Engraving', image: img(pick('trophies', 2), 480, 360) },
  { label: 'Lamination', image: img(pick('flyers-brochures', 1), 480, 360) },
  { label: 'Laser', image: img(pick('printing', 1), 480, 360) },
  { label: 'Packaging', image: img(pick('gift-boxes', 0), 480, 360) },
];

const trendingCategories = [
  { name: 'Office Supplies', href: '/shop/office-stationery', icon: '📦' },
  { name: 'Kits & Hampers', href: '/shop/kits-hampers', icon: '🎁' },
  { name: 'Apparel', href: '/shop/custom-clothing', icon: '👕' },
  { name: 'Gadgets', href: '/shop/gadgets-accessories', icon: '🔌' },
  { name: 'Corporate Gifts', href: '/shop/gift-hampers', icon: '💼' },
  { name: 'Drinkware', href: '/shop/drinkware-lunchboxes', icon: '🥤' },
];

const blogPosts = [
  {
    title: 'A Comprehensive Guide to Paper Types & Printing Essentials',
    readTime: '10 min read',
    image: img(pick('printing', 3), 600, 380),
  },
  {
    title: 'How to Design a T-Shirt for Your Brand',
    readTime: '17 min read',
    image: img(pick('round-neck-t-shirts', 3), 600, 380),
  },
  {
    title: "PrintOrbit's Comprehensive Guide to Customisation Options",
    readTime: '10 min read',
    image: img(pick('gift-boxes', 1), 600, 380),
  },
];

const testimonials = [
  {
    quote: 'PrintOrbit delivered exceptional quality corporate gifts for our annual event. The team was incredibly helpful and delivered on time. Highly recommended!',
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
            <div className="position-absolute top-0 start-0 w-100 h-100">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                unoptimized
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="w-100 h-100" style={{ position: 'absolute', top: 0, left: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2))' }} />
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
                  <div className="position-relative" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
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
              <div className="rounded-4 overflow-hidden position-relative" style={{ aspectRatio: '4/3', maxWidth: '28rem', marginLeft: 'auto' }}>
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=450&fit=crop"
                  alt="Team in branded corporate apparel"
                  fill
                  unoptimized
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          <div className="row g-3">
            {apparelSubcats.map((cat) => (
              <div key={cat.name} className="col-6 col-md-3">
                <Link
                  href={cat.href}
                  className="text-decoration-none bg-white d-block text-center rounded-3 overflow-hidden"
                  style={{ border: '1px solid #E5E5E5' }}
                >
                  <div className="position-relative" style={{ aspectRatio: '1/1' }}>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-3">
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

      {/* PRINTORBIT'S PROMISE */}
      <div className="bg-white">
        <div className="container py-5">
          <div className="text-center mb-4">
            <h2 className="fs-3 fw-bold mb-3" style={{ color: '#0F0F0F' }}>
              The PrintOrbit Promise: Printing at its Best. Period.
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
                  <div className="position-relative" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
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
                      href={cat.href}
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
              Read Our Blogs <ArrowRight size={16} />
            </Link>
          </div>

          <div className="row g-4">
            {blogPosts.map((post) => (
              <div key={post.title} className="col-md-4">
                <article className="bg-white rounded-3 overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                  <div className="position-relative" style={{ aspectRatio: '16/10' }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
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
                PrintOrbit is India&apos;s leading online platform for corporate gifting, custom printing, and branded merchandise. We offer a wide range of products including customised apparel, drinkware, bags, electronic gadgets, desk accessories, and more. Whether you need bulk orders for employee onboarding, festival gifting, or promotional events, PrintOrbit has you covered with premium quality products at competitive prices.
              </p>
            </div>
            <div className="mb-4">
              <h2 className="fs-4 fw-bold mb-3" style={{ color: '#0F0F0F' }}>
                Why Buy Corporate Diwali Gifts from PrintOrbit?
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#2E2E2E', lineHeight: 1.6 }}>
                Diwali is the perfect occasion to strengthen relationships with employees, clients, and business partners through thoughtful gifting. PrintOrbit offers a curated collection of Diwali gift hampers that combine traditional warmth with modern branding. From premium chocolate boxes to customised drinkware sets, our hampers start at just ₹599 with no minimum order required.
              </p>
            </div>
            <div>
              <h2 className="fs-4 fw-bold mb-3" style={{ color: '#0F0F0F' }}>
                Bulk Printing and Merchandise Delivery Across Multiple Locations in India
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#2E2E2E', lineHeight: 1.6 }}>
                PrintOrbit provides seamless bulk printing and merchandise delivery services across multiple locations in India. Whether your team is spread across Mumbai, Delhi, Bangalore, Chennai, Hyderabad, or any other city, we ensure consistent quality and timely delivery to all your offices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
