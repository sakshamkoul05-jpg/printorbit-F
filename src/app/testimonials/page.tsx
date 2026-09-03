import { Metadata } from 'next';
import Link from 'next/link';
import { Star, Phone, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Testimonials | PrintOrbit',
  description: 'Looking for quick and reliable printing services? Read what our happy customers say about PrintStop.',
};

const featuredTestimonials = [
  {
    id: 1,
    quote: 'In an age of instant service and customisation, PrintStop stands out with its commitment to quality and reliability. Their ability to deliver bespoke solutions at scale has made them our go-to partner for all corporate gifting needs.',
    author: 'Priya Pandey',
    designation: 'Motilal Oswal',
  },
  {
    id: 2,
    quote: 'PrintStop helped with a crucial and last-minute request with remarkable speed and precision. Their professionalism and attention to detail truly impressed our entire team.',
    author: 'Arun K.',
    designation: 'Accenture',
  },
];

const awards = [
  { id: 1, title: 'Best Corporate Gifting Website', year: '2025' },
  { id: 2, title: 'Best Corporate Gifting Company', year: '2025' },
  { id: 3, title: 'Top Corporate Gifting Company', year: '2025' },
  { id: 4, title: 'Best Corporate Gifting Company Award', year: '2024' },
  { id: 5, title: 'The Top Most Fastest Growing Premium Gifting Brand', year: '2023' },
];

const testimonials = [
  {
    id: 1,
    quote: 'Easy customization with smart preview',
    author: 'Prashant Pardeshi',
    rating: 5,
  },
  {
    id: 2,
    quote: 'Pleasantly surprised with a happy experience',
    author: 'Reshma Shetty',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Prompt assistance and seamless ordering',
    author: 'Pranay Pore',
    rating: 5,
  },
  {
    id: 4,
    quote: 'Customer support went above and beyond',
    author: 'Meenal Sharma',
    rating: 5,
  },
  {
    id: 5,
    quote: 'Extremely satisfied with quality and delivery',
    author: 'Sanket Kshirsagar',
    rating: 5,
  },
  {
    id: 6,
    quote: 'Timely delivery with consistent quality',
    author: 'Mohammed Momin',
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F4F2EF' }}>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#0F0F0F' }}>
          Our Happy Customers Love Our Products and Services
        </h1>
        <p className="text-base md:text-lg max-w-2xl" style={{ color: '#505050' }}>
          Looking for quick and reliable printing services?
        </p>

        {/* Stats Row */}
        <div className="mt-10 flex flex-wrap items-center gap-8 md:gap-12">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#ED1C24' }} />
              ))}
            </div>
            <span className="text-2xl font-bold" style={{ color: '#0F0F0F' }}>5</span>
            <span className="text-sm" style={{ color: '#505050' }}>rating on Google</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold" style={{ color: '#0F0F0F' }}>650</span>
            <span className="text-sm" style={{ color: '#505050' }}>reviews on Google</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold" style={{ color: '#0F0F0F' }}>1000</span>
            <span className="text-sm" style={{ color: '#505050' }}>clients served</span>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="https://www.google.com/search?q=printstop+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-md text-white font-semibold text-sm"
            style={{ background: '#ED1C24' }}
          >
            Read Reviews
          </a>
        </div>
      </section>

      {/* What our Customers Say */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold mb-8" style={{ color: '#0F0F0F' }}>
          What our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTestimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-lg p-6 md:p-8 border"
              style={{
                background: '#FFFFFF',
                borderColor: '#E5E5E5',
              }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#ED1C24' }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#2E2E2E' }}>
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: '#ED1C24' }}
                >
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>
                    {item.author}
                  </p>
                  <p className="text-xs" style={{ color: '#6D6D6D' }}>
                    {item.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold mb-8" style={{ color: '#0F0F0F' }}>
          Awards &amp; Recognition
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {awards.map((award) => (
            <div
              key={award.id}
              className="rounded-lg p-5 border flex items-start gap-4"
              style={{
                background: '#FFFFFF',
                borderColor: '#E5E5E5',
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: '#FEF2F2' }}
              >
                <Trophy className="w-5 h-5" style={{ color: '#ED1C24' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>
                  {award.title}
                </p>
                <p className="text-xs mt-1" style={{ color: '#6D6D6D' }}>
                  {award.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Let's Talk Business Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: '#0F0F0F' }}
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Let&apos;s Talk Business
            </h2>
            <p className="text-sm text-white/70">
              Get in touch for bulk orders and corporate solutions.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold text-sm"
            style={{ background: '#ED1C24' }}
          >
            <Phone className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
      </section>

      {/* Testimonial Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-lg p-5 border flex flex-col"
              style={{
                background: '#FFFFFF',
                borderColor: '#E5E5E5',
              }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#ED1C24' }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#2E2E2E' }}>
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: '#F0F0F0' }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: '#ED1C24' }}
                >
                  {item.author.charAt(0)}
                </div>
                <p className="text-xs font-semibold" style={{ color: '#0F0F0F' }}>
                  {item.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
