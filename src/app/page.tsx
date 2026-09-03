'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import {
  ArrowRight,
  Sparkles,
  Headphones,
  Layers,
  Clock,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const heroSlides = [
  {
    tag: 'Best Seller',
    title: 'Corporate Diwali Gifts',
    subtitle: 'Thoughtful gifting for your employees and clients',
    cta: 'Explore Gifts',
    href: '/products?category=corporate-gifts',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1600&q=80',
    overlay: 'from-black/70 via-black/40 to-transparent',
  },
  {
    tag: 'Popular',
    title: 'Custom Printing Solutions',
    subtitle: 'Premium quality prints for every business need',
    cta: 'View Products',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=1600&q=80',
    overlay: 'from-black/70 via-black/40 to-transparent',
  },
  {
    tag: 'New Arrivals',
    title: 'T-Shirts & More',
    subtitle: 'Branded apparel that speaks your brand identity',
    cta: 'Shop Apparel',
    href: '/products?category=apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600&q=80',
    overlay: 'from-black/70 via-black/40 to-transparent',
  },
  {
    tag: 'Trending',
    title: 'Sippers & Water Bottles',
    subtitle: 'Stay hydrated with custom branded drinkware',
    cta: 'Explore Drinkware',
    href: '/products?category=drinkware',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1600&q=80',
    overlay: 'from-black/70 via-black/40 to-transparent',
  },
];

const trustItems = [
  { icon: Sparkles, label: 'Personalisable Products' },
  { icon: Headphones, label: 'Exceptional Support' },
  { icon: Layers, label: 'Wide Portfolio (100+ product types)' },
  { icon: Clock, label: 'On-Time Delivery' },
  { icon: ShoppingCart, label: 'Single Order (order 1 item before bulk)' },
];

const popularCategories = [
  { name: 'Apparels', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
  { name: 'Drinkware', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80' },
  { name: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { name: 'Lunch Boxes', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80' },
  { name: 'Electronic Gadgets', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80' },
  { name: 'Desk Accessories', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80' },
  { name: 'Awards', image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80' },
  { name: 'Laptop Sleeves', image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&q=80' },
];

const promiseItems = [
  { label: 'Engraving', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80' },
  { label: 'Lamination', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80' },
  { label: 'Laser', image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80' },
  { label: 'Packaging', image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80' },
];

const trendingCategories = [
  'Office Supplies',
  'Kits & Hampers',
  'Apparel',
  'Gadgets',
  'Corporate Gifts',
  'Drinkware',
];

const blogPosts = [
  {
    title: 'How to Choose the Perfect Corporate Gifts for Your Team',
    excerpt: 'Discover the art of thoughtful corporate gifting that strengthens team bonds and leaves a lasting impression.',
    date: 'Aug 20, 2025',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80',
  },
  {
    title: 'Custom Apparels: Making Your Brand Wearable',
    excerpt: 'From polo shirts to hoodies, learn how branded apparel turns your team into walking ambassadors.',
    date: 'Aug 12, 2025',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  },
  {
    title: 'Sustainable Printing: Eco-Friendly Options for Your Business',
    excerpt: 'Go green with our sustainable printing materials and processes that reduce environmental impact.',
    date: 'Aug 05, 2025',
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&q=80',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Marketing Head, TechVista',
    rating: 5,
    text: 'PrintStop delivered exceptional quality corporate gifts for our annual event. The team was incredibly helpful and delivered on time. Highly recommended!',
  },
  {
    name: 'Rahul Mehta',
    role: 'HR Manager, FinServ Solutions',
    rating: 5,
    text: 'We order branded apparel for our entire team every quarter. The print quality and fabric are consistently excellent. A reliable partner for all our needs.',
  },
  {
    name: 'Anjali Patel',
    role: 'Operations Lead, GreenEarth',
    rating: 5,
    text: 'From desk accessories to drinkware, every product we have ordered has been top-notch. The single order option is perfect for sampling before bulk orders.',
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
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  /* Hero auto-rotate */
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  /* Testimonial auto-rotate */
  const nextTestimonial = useCallback(() => {
    setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <section className="min-h-screen bg-[var(--color-warm-50)]">
      {/* ============================================================ */}
      {/*  1. HERO BANNER CAROUSEL                                      */}
      {/* ============================================================ */}
      <div className="relative w-full h-[480px] md:h-[560px] lg:h-[640px] overflow-hidden bg-dark">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />

            <Container>
              <div className="relative z-10 h-full flex flex-col justify-center max-w-2xl">
                <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit mb-4">
                  {slide.tag}
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                  {slide.title}
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-6 max-w-md">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 bg-white text-dark font-semibold px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-colors w-fit"
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4" />
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
                i === currentSlide ? 'bg-primary' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ============================================================ */}
      {/*  2. WHY CHOOSE US - TRUST BAR                                 */}
      {/* ============================================================ */}
      <div className="bg-white border-b border-[var(--color-warm-100)]">
        <Container>
          <div className="py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {trustItems.map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text)] leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  3. TRIED, TESTED & MOST LOVED                                 */}
      {/* ============================================================ */}
      <div className="bg-[var(--color-warm-50)]">
        <Container>
          <div className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-dark)]">
                Tried, Tested &amp; Most Loved
              </h2>
              <p className="text-[var(--color-muted)] mt-2 text-base">
                Our most popular categories, loved by businesses across India
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {popularCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${cat.name.toLowerCase().replace(/ /g, '-')}`}
                  className="group bg-white rounded-xl border border-[var(--color-warm-100)] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#FEF3C7]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-semibold text-[var(--color-dark)] group-hover:text-primary transition-colors">
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
      {/*  4. CORPORATE APPAREL                                         */}
      {/* ============================================================ */}
      <div className="bg-white">
        <Container>
          <div className="py-16">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary-dark">
              <div className="absolute inset-0 opacity-20">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-16 py-14">
                <div className="max-w-lg">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                    Corporate Apparel That Speaks Your Brand
                  </h2>
                  <p className="text-white/80 mt-3 text-sm md:text-base">
                    From polo shirts to hoodies, jackets to caps — outfit your team in branded apparel that
                    creates a unified, professional identity.
                  </p>
                </div>
                <Link
                  href="/products?category=apparel"
                  className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-7 py-3.5 rounded-xl hover:bg-[var(--color-warm-50)] transition-colors shrink-0"
                >
                  Explore Apparel
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  5. OUR PROMISE                                               */}
      {/* ============================================================ */}
      <div className="bg-[var(--color-warm-50)]">
        <Container>
          <div className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-dark)]">
                Our Promise
              </h2>
              <p className="text-[var(--color-muted)] mt-2 text-base">
                Quality craftsmanship in every product we deliver
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {promiseItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-xl border border-[var(--color-warm-100)] overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-sm font-semibold text-[var(--color-dark)]">{item.label}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  6. TRENDING CATEGORIES                                       */}
      {/* ============================================================ */}
      <div className="bg-white">
        <Container>
          <div className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-dark)]">
                These categories are getting all the love
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {trendingCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="inline-flex items-center gap-2 bg-[var(--color-warm-50)] border border-[var(--color-warm-100)] text-[var(--color-dark)] font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  7. BLOG SECTION                                              */}
      {/* ============================================================ */}
      <div className="bg-[var(--color-warm-50)]">
        <Container>
          <div className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-dark)]">
                Print Tales &amp; Pro Tips
              </h2>
              <p className="text-[var(--color-muted)] mt-2 text-base">
                Insights, ideas, and inspiration for your branding journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <article
                  key={post.title}
                  className="bg-white rounded-xl border border-[var(--color-warm-100)] overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-[var(--color-muted)] mb-2">{post.date}</p>
                    <h3 className="text-base font-bold text-[var(--color-dark)] leading-snug mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                View All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  8. TESTIMONIALS                                              */}
      {/* ============================================================ */}
      <div className="bg-white">
        <Container>
          <div className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-dark)]">
                What Our Customers Say
              </h2>
            </div>

            <div className="max-w-3xl mx-auto relative">
              <div className="bg-[var(--color-warm-50)] rounded-2xl border border-[var(--color-warm-100)] p-8 md:p-10 text-center">
                <Quote className="w-10 h-10 text-primary/30 mx-auto mb-4" />

                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: testimonials[testimonialIdx].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-[var(--color-text)] text-base md:text-lg leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[testimonialIdx].text}&rdquo;
                </p>

                <div>
                  <p className="font-bold text-[var(--color-dark)]">
                    {testimonials[testimonialIdx].name}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {testimonials[testimonialIdx].role}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() =>
                    setTestimonialIdx(
                      (prev) => (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="w-9 h-9 rounded-full border border-[var(--color-warm-200)] flex items-center justify-center text-[var(--color-muted)] hover:border-primary hover:text-primary transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIdx(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i === testimonialIdx ? 'bg-primary' : 'bg-[var(--color-warm-200)]'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setTestimonialIdx((prev) => (prev + 1) % testimonials.length)
                  }
                  className="w-9 h-9 rounded-full border border-[var(--color-warm-200)] flex items-center justify-center text-[var(--color-muted)] hover:border-primary hover:text-primary transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/*  9. CLIENT LOGOS BAR                                           */}
      {/* ============================================================ */}
      <div className="bg-[var(--color-warm-50)] border-t border-[var(--color-warm-100)]">
        <Container>
          <div className="py-12">
            <p className="text-center text-sm text-[var(--color-muted)] uppercase tracking-widest font-medium mb-8">
              Trusted by leading brands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {clientLogos.map((logo) => (
                <div
                  key={logo}
                  className="text-[var(--color-warm-300)] hover:text-[var(--color-warm-500)] transition-colors"
                >
                  <span className="text-base md:text-lg font-bold tracking-tight whitespace-nowrap grayscale opacity-60 hover:opacity-100 transition-opacity">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
