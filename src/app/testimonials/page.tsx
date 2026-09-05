import { Metadata } from 'next';
import Link from 'next/link';
import { Star, Phone, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Testimonials | PrintOrbit',
  description: 'Looking for quick and reliable printing services? Read what our happy customers say about PrintOrbit.',
};

const featuredTestimonials = [
  {
    id: 1,
    quote: 'In an age of instant service and customisation, PrintOrbit stands out with its commitment to quality and reliability. Their ability to deliver bespoke solutions at scale has made them our go-to partner for all corporate gifting needs.',
    author: 'Priya Pandey',
    designation: 'Motilal Oswal',
  },
  {
    id: 2,
    quote: 'PrintOrbit helped with a crucial and last-minute request with remarkable speed and precision. Their professionalism and attention to detail truly impressed our entire team.',
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
  { id: 1, quote: 'Easy customization with smart preview', author: 'Prashant Pardeshi', rating: 5 },
  { id: 2, quote: 'Pleasantly surprised with a happy experience', author: 'Reshma Shetty', rating: 5 },
  { id: 3, quote: 'Prompt assistance and seamless ordering', author: 'Pranay Pore', rating: 5 },
  { id: 4, quote: 'Customer support went above and beyond', author: 'Meenal Sharma', rating: 5 },
  { id: 5, quote: 'Extremely satisfied with quality and delivery', author: 'Sanket Kshirsagar', rating: 5 },
  { id: 6, quote: 'Timely delivery with consistent quality', author: 'Mohammed Momin', rating: 5 },
];

export default function TestimonialsPage() {
  return (
    <div className="min-vh-100" style={{ background: '#F4F2EF' }}>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 py-md-16">
        <h1 className="display-5 fw-bold mb-4" style={{ color: '#0F0F0F' }}>
          Our Happy Customers Love Our Products and Services
        </h1>
        <p className="fs-6 fs-md-5" style={{ color: '#505050', maxWidth: '36rem' }}>
          Looking for quick and reliable printing services?
        </p>

        {/* Stats Row */}
        <div className="mt-10 d-flex flex-wrap align-items-center gap-4 gap-md-5">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-current" style={{ color: '#ED1C24' }} />
              ))}
            </div>
            <span className="fs-2 fw-bold" style={{ color: '#0F0F0F' }}>5</span>
            <span className="text-sm" style={{ color: '#505050' }}>rating on Google</span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="fs-2 fw-bold" style={{ color: '#0F0F0F' }}>650</span>
            <span className="text-sm" style={{ color: '#505050' }}>reviews on Google</span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="fs-2 fw-bold" style={{ color: '#0F0F0F' }}>1000</span>
            <span className="text-sm" style={{ color: '#505050' }}>clients served</span>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="https://www.google.com/search?q=printorbit+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="d-inline-flex align-items-center px-6 py-3 rounded text-white fw-semibold text-sm"
            style={{ background: '#ED1C24' }}
          >
            Read Reviews
          </a>
        </div>
      </section>

      {/* What our Customers Say */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="fs-3 fw-bold mb-8" style={{ color: '#0F0F0F' }}>
          What our Customers Say
        </h2>
        <div className="row g-4">
          {featuredTestimonials.map((item) => (
            <div
              key={item.id}
              className="col-12 col-md-6"
            >
              <div
                className="rounded-3 p-6 p-md-8 border h-100"
                style={{
                  background: '#FFFFFF',
                  borderColor: '#E5E5E5',
                }}
              >
                <div className="d-flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" style={{ color: '#ED1C24' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#2E2E2E' }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-circle d-flex align-items-center justify-content-center text-white fw-bold text-sm"
                    style={{ background: '#ED1C24' }}
                  >
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm fw-semibold" style={{ color: '#0F0F0F' }}>
                      {item.author}
                    </p>
                    <p className="text-xs" style={{ color: '#6D6D6D' }}>
                      {item.designation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="fs-3 fw-bold mb-8" style={{ color: '#0F0F0F' }}>
          Awards &amp; Recognition
        </h2>
        <div className="row g-3">
          {awards.map((award) => (
            <div
              key={award.id}
              className="col-12 col-sm-6 col-lg-4"
            >
              <div
                className="rounded-3 p-5 border d-flex align-items-start gap-4 h-100"
                style={{
                  background: '#FFFFFF',
                  borderColor: '#E5E5E5',
                }}
              >
                <div
                  className="w-10 h-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ background: '#FEF2F2' }}
                >
                  <Trophy size={20} style={{ color: '#ED1C24' }} />
                </div>
                <div>
                  <p className="text-sm fw-semibold" style={{ color: '#0F0F0F' }}>
                    {award.title}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#6D6D6D' }}>
                    {award.year}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Let's Talk Business Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="rounded-3 p-8 p-md-12 d-flex flex-column flex-md-row align-items-center justify-content-between gap-6"
          style={{ background: '#0F0F0F' }}
        >
          <div className="text-center text-md-start">
            <h2 className="fs-3 fw-bold text-white mb-2">
              Let&apos;s Talk Business
            </h2>
            <p className="text-sm text-white/70">
              Get in touch for bulk orders and corporate solutions.
            </p>
          </div>
          <Link
            href="/contact"
            className="d-inline-flex align-items-center gap-2 px-6 py-3 rounded text-white fw-semibold text-sm"
            style={{ background: '#ED1C24' }}
          >
            <Phone size={16} />
            Contact Us
          </Link>
        </div>
      </section>

      {/* Testimonial Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="row g-4">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="col-12 col-sm-6 col-lg-3"
            >
              <div
                className="rounded-3 p-5 border d-flex flex-column h-100"
                style={{
                  background: '#FFFFFF',
                  borderColor: '#E5E5E5',
                }}
              >
                <div className="d-flex gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" style={{ color: '#ED1C24' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4 flex-fill" style={{ color: '#2E2E2E' }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="d-flex align-items-center gap-3 pt-3 border-top" style={{ borderColor: '#F0F0F0' }}>
                  <div
                    className="w-8 h-8 rounded-circle d-flex align-items-center justify-center text-white fw-bold"
                    style={{ fontSize: '0.75rem', background: '#ED1C24' }}
                  >
                    {item.author.charAt(0)}
                  </div>
                  <p className="text-xs fw-semibold" style={{ color: '#0F0F0F' }}>
                    {item.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
