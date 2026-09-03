'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
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

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const heroSlides = [
  {
    title: 'DIWALI GIFT HAMPERS',
    subtitle: 'Lock in your bulk orders now and save more. Curated hampers start at ₹599. No minimum required.',
    cta: 'Lock In Your Order',
    href: '/products?category=gift-hampers',
    bg: 'from-[#8B0000] to-[#DC143C]',
  },
  {
    title: 'CUSTOM PRINTING & CORPORATE GIFTING SOLUTIONS',
    subtitle: 'Creative, customisable, and cost-effective',
    cta: 'Explore Corporate Gifts',
    href: '/products?category=corporate-gifts',
    bg: 'from-[#1a1a2e] to-[#16213e]',
  },
  {
    title: 'T-SHIRTS & MORE',
    subtitle: 'Your team. Your logo. Your vibe. Tees from ₹345',
    cta: 'Build Your Brand',
    href: '/products?category=apparel',
    bg: 'from-[#0F0F0F] to-[#2E2E2E]',
  },
  {
    title: 'SIPPERS & WATER BOTTLES',
    subtitle: 'Sip smart, Sip personalised, custom sippers start at ₹245. No minimum required.',
    cta: 'Customise Your Bottle',
    href: '/products?category=drinkware',
    bg: 'from-[#1B3A4B] to-[#065A82]',
  },
  {
    title: 'DESIGN YOUR OWN',
    subtitle: 'Use our free online design tool',
    cta: 'Open Design Studio',
    href: '/design-studio',
    bg: 'from-[#3D0C02] to-[#8B0000]',
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
  { label: 'Engraving', color: 'bg-[#ED1C24]' },
  { label: 'Lamination', color: 'bg-[#0F0F0F]' },
  { label: 'Laser', color: 'bg-[#2E2E2E]' },
  { label: 'Packaging', color: 'bg-[#8B0000]' },
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
    color: 'bg-[#F5E6D3]',
  },
  {
    title: 'How to Design a T-Shirt for Your Brand',
    readTime: '17 min read',
    color: 'bg-[#E8D5E0]',
  },
  {
    title: "PrintStop's Comprehensive Guide to Customisation Options",
    readTime: '10 min read',
    color: 'bg-[#D5E8D4]',
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
  'Bajaj Allianz',
  'Birla Opus',
  'Capgemini',
  'Dr Reddys',
  'HDFC Ergo',
  'Kotak',
  'L&T Finance',
  'Niva Bupa',
  'Siemens',
  'Tech Mahindra',
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

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
    <section className="min-h-screen bg-[#F4F2EF]">
      {/* ============================================================ */}
      {/*  1. HERO BANNER CAROUSEL                                      */}
      {/* ============================================================ */}
      <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[640px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className={`w-full h-full bg-gradient-to-r ${slide.bg}`} />
            <Container>
              <div className="relative z-10 h-full flex flex-col justify-center max-w-2xl">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                  {slide.title}
                </h2>
                <p className="text-white/90 text-base md:text-lg mb-6 max-w-md">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="hidden sm:inline-flex items-center justify-center bg-white text-[#0F0F0F] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors w-fit text-sm md:text-base"
                >
                  {slide.cta}
                </Link>
              </div>
            </Container>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ============================================================ */}
      {/*  2. WHY CHOOSE OUR SERVICES                                   */}
      {/* ============================================================ */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <Container>
          <div className="py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0F0F0F] mb-8">
              Why Choose Our Services
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {trustItems.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center gap-3 p-4">
                  <div className="w-12 h-12 rounded-full bg-[#F4F2EF] flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-[#ED1C24]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0F0F0F]">{item.title}</h3>
                  <p className="text-xs text-[#2E2E2E] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  3. TRIED, TESTED & MOST LOVED                                 */}
      {/* ============================================================ */}
      <div className="bg-[#F5F0E1]">
        <Container>
          <div className="py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0F0F0F] mb-10">
              Tried, Tested &amp; Most Loved
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {popularCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group bg-white rounded-xl border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#F5F0E1] to-[#E8E0D0] flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#E5E5E5] flex items-center justify-center">
                      <Package className="w-8 h-8 text-[#2E2E2E]" />
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-bold text-[#0F0F0F] group-hover:text-[#ED1C24] transition-colors uppercase tracking-wide">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  4. CORPORATE APPAREL THAT SPEAKS YOUR BRAND                  */}
      {/* ============================================================ */}
      <div className="bg-white">
        <Container>
          <div className="py-16">
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F0F0F] leading-tight mb-4">
                  Corporate Apparel That Speaks Your Brand
                </h2>
                <p className="text-[#2E2E2E] text-base md:text-lg leading-relaxed mb-6">
                  From formal shirts to casual tees, explore our range of customised apparel. Perfect for employee wear, giveaways, or corporate gifting.
                </p>
                <Link
                  href="/products?category=apparel"
                  className="inline-flex items-center gap-2 text-[#ED1C24] font-semibold text-sm hover:underline"
                >
                  View Range <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex-1 w-full max-w-md">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#F5F0E1] to-[#E8E0D0] flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-[#E5E5E5] flex items-center justify-center">
                    <Package className="w-12 h-12 text-[#2E2E2E]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {apparelSubcats.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group bg-white rounded-xl border border-[#E5E5E5] p-6 text-center hover:shadow-md transition-shadow"
                >
                  <h3 className="text-sm font-bold text-[#0F0F0F] group-hover:text-[#ED1C24] transition-colors uppercase tracking-wide">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  5. LOOKING FOR CORPORATE GIFTS? BANNER                       */}
      {/* ============================================================ */}
      <div className="bg-[#0F0F0F]">
        <Container>
          <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center md:text-left max-w-2xl">
              Ordering Branded Merchandise in Bulk? We&apos;ve Got You Covered
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#ED1C24] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#d11a1f] transition-colors shrink-0"
            >
              Let&apos;s Discuss
            </Link>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  6. PRINTSTOP'S PROMISE                                        */}
      {/* ============================================================ */}
      <div className="bg-white">
        <Container>
          <div className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F0F0F] mb-4">
                PrintStop&apos;s Promise: Printing at its Best. Period.
              </h2>
              <p className="text-[#2E2E2E] max-w-3xl mx-auto text-base leading-relaxed mb-4">
                We use the latest technology and highest quality materials to deliver products that exceed your expectations. From engraving to lamination, every process is handled with precision and care.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[#ED1C24] font-semibold text-sm hover:underline"
              >
                Continue exploring <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
              {promiseItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl overflow-hidden border border-[#E5E5E5]"
                >
                  <div className={`aspect-[4/3] ${item.color}`} />
                  <div className="p-4 text-center bg-white">
                    <h3 className="text-sm font-bold text-[#0F0F0F]">{item.label}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  7. THESE CATEGORIES ARE GETTING ALL THE LOVE!                 */}
      {/* ============================================================ */}
      <div className="bg-[#F4F2EF]">
        <Container>
          <div className="py-16">
            <div className="flex flex-col md:flex-row items-start gap-12">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] leading-tight mb-3">
                  These categories are getting all the love!
                </h2>
                <p className="text-[#2E2E2E] text-base">
                  Explore our most popular product categories loved by businesses across India.
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 gap-4">
                  {trendingCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={`/products?category=${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="flex items-center gap-3 bg-white border border-[#E5E5E5] rounded-xl px-5 py-4 hover:shadow-md transition-shadow"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-sm font-semibold text-[#0F0F0F]">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  8. BLOG SECTION - PRINT TALES & PRO TIPS                      */}
      {/* ============================================================ */}
      <div className="bg-white">
        <Container>
          <div className="py-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F]">
                Print Tales &amp; Pro Tips
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#ED1C24] font-semibold text-sm hover:underline"
              >
                Read PS Blogs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <article
                  key={post.title}
                  className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className={`aspect-[16/10] ${post.color}`} />
                  <div className="p-5">
                    <p className="text-xs text-[#2E2E2E] mb-2 font-medium">{post.readTime}</p>
                    <h3 className="text-base font-bold text-[#0F0F0F] leading-snug">
                      {post.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  9. TESTIMONIALS                                               */}
      {/* ============================================================ */}
      <div className="bg-[#F4F2EF]">
        <Container>
          <div className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] mb-4">
                Our customers speak for us
              </h2>
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ED1C24] text-[#ED1C24]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#0F0F0F]">rating on Google</span>
              </div>
              <p className="text-[#2E2E2E] max-w-2xl mx-auto text-base leading-relaxed mb-4">
                Across our years of experience, we have provided printing solutions for more than 100+ clients from every professions.
              </p>
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 text-[#ED1C24] font-semibold text-sm hover:underline"
              >
                Read Testimonials <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-xl border border-[#E5E5E5] p-6 flex flex-col"
                >
                  <Quote className="w-8 h-8 text-[#ED1C24]/30 mb-4" />
                  <p className="text-[#2E2E2E] text-sm leading-relaxed italic flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-bold text-[#0F0F0F] text-sm">{t.name}</p>
                    <p className="text-xs text-[#2E2E2E]">{t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  10. CLIENT LOGOS MARQUEE                                       */}
      {/* ============================================================ */}
      <div className="bg-white border-t border-[#E5E5E5] overflow-hidden">
        <div className="py-10">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="mx-8 flex items-center justify-center"
              >
                <span className="text-base md:text-lg font-bold text-[#2E2E2E] opacity-50 whitespace-nowrap tracking-tight">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  11. SEO TEXT SECTION                                           */}
      {/* ============================================================ */}
      <div className="bg-[#F4F2EF]">
        <Container>
          <div className="py-16 max-w-4xl mx-auto space-y-10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0F0F0F] mb-4">
                Corporate Gifting, Printing &amp; Merchandise for Businesses
              </h2>
              <p className="text-[#2E2E2E] text-sm leading-relaxed">
                PrintStop is India&apos;s leading online platform for corporate gifting, custom printing, and branded merchandise. We offer a wide range of products including customised apparel, drinkware, bags, electronic gadgets, desk accessories, and more. Whether you need bulk orders for employee onboarding, festival gifting, or promotional events, PrintStop has you covered with premium quality products at competitive prices. Our easy-to-use design studio lets you personalise products with your brand logo, making corporate gifting effortless and impactful.
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0F0F0F] mb-4">
                Why Buy Corporate Diwali Gifts from PrintOrbit?
              </h2>
              <p className="text-[#2E2E2E] text-sm leading-relaxed">
                Diwali is the perfect occasion to strengthen relationships with employees, clients, and business partners through thoughtful gifting. PrintStop offers a curated collection of Diwali gift hampers that combine traditional warmth with modern branding. From premium chocolate boxes to customised drinkware sets, our hampers start at just ₹599 with no minimum order required. Each gift can be personalised with your company logo, making it a meaningful and memorable gesture. Our dedicated corporate gifting team ensures timely delivery and hassle-free bulk ordering across India.
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0F0F0F] mb-4">
                Bulk Printing and Merchandise Delivery Across Multiple Locations in India
              </h2>
              <p className="text-[#2E2E2E] text-sm leading-relaxed">
                PrintStop provides seamless bulk printing and merchandise delivery services across multiple locations in India. Whether your team is spread across Mumbai, Delhi, Bangalore, Chennai, Hyderabad, or any other city, we ensure consistent quality and timely delivery to all your offices. Our pan-India logistics network handles orders of all sizes, from single samples to thousands of units. With our centralised ordering system, you can manage corporate gifting and merchandise needs for multiple branches from a single dashboard. We also offer custom packaging and branded unboxing experiences to make your corporate gifts truly special.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
