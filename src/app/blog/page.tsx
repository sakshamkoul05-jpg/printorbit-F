import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | PrintOrbit',
  description: 'Get inspired by our stories, explore branding trends, and learn why corporate gifting builds stronger teams.',
};

const posts = [
  {
    id: 1,
    title: "PrintStop's Comprehensive Guide to Customisation Options",
    excerpt: 'Explore the wide range of customisation options available at PrintStop to create unique branded products for your business.',
    date: 'January 31, 2025',
    slug: 'comprehensive-guide-customisation',
    image: '/blog/customisation-guide.jpg',
  },
  {
    id: 2,
    title: 'PrintStop: The Best Corporate Gifting Website in India',
    excerpt: 'Discover why PrintStop is rated as the best corporate gifting platform in India for businesses of all sizes.',
    date: 'May 27, 2025',
    slug: 'best-corporate-gifting-website',
    image: '/blog/corporate-gifting-website.jpg',
  },
  {
    id: 3,
    title: 'Corporate Gifting for Your Employees',
    excerpt: 'Learn how thoughtful corporate gifts boost employee morale, strengthen loyalty, and build a positive workplace culture.',
    date: 'May 13, 2025',
    slug: 'corporate-gifting-employees',
    image: '/blog/employee-gifting.jpg',
  },
  {
    id: 4,
    title: 'Top 10 Corporate Gifts for 2025',
    excerpt: 'Stay ahead with our curated list of the top 10 corporate gifting trends that will make your brand stand out in 2025.',
    date: 'October 1, 2025',
    slug: 'top-10-corporate-gifts-2025',
    image: '/blog/top-10-gifts.jpg',
  },
  {
    id: 5,
    title: 'How to Choose the Perfect Corporate Gift',
    excerpt: 'A step-by-step guide to selecting the ideal corporate gift that leaves a lasting impression on clients and partners.',
    date: 'September 25, 2025',
    slug: 'perfect-corporate-gift',
    image: '/blog/perfect-gift.jpg',
  },
  {
    id: 6,
    title: 'Best Corporate Diwali Gift Ideas to Leave a Lasting Impression',
    excerpt: 'Make this Diwali memorable with our top corporate gift ideas that blend tradition with modern branding.',
    date: 'August 11, 2025',
    slug: 'diwali-gift-ideas',
    image: '/blog/diwali-gifts.jpg',
  },
  {
    id: 7,
    title: 'How to Design a T-Shirt for Your Brand',
    excerpt: 'A complete guide to designing custom t-shirts that perfectly represent your brand identity and leave a mark.',
    date: 'May 5, 2025',
    slug: 'design-tshirt-brand',
    image: '/blog/tshirt-design.jpg',
  },
  {
    id: 8,
    title: 'What is a Corporate Gifting Platform?',
    excerpt: 'Understand what a corporate gifting platform offers and how it can streamline your gifting strategy for maximum impact.',
    date: 'March 14, 2025',
    slug: 'what-is-corporate-gifting-platform',
    image: '/blog/gifting-platform.jpg',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F4F2EF' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm" style={{ color: '#6D6D6D' }}>
          <Link href="/" className="hover:underline" style={{ color: '#2E2E2E' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#2E2E2E' }}>Blog</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#0F0F0F' }}>
          Print Tales &amp; Insights
        </h1>
        <p className="text-base md:text-lg max-w-3xl" style={{ color: '#505050' }}>
          Get inspired by our stories, explore branding trends, and learn why corporate gifting builds stronger teams.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg overflow-hidden border"
              style={{
                background: '#FFFFFF',
                borderColor: '#E5E5E5',
              }}
            >
              <div
                className="w-full h-48 flex items-center justify-center"
                style={{ background: '#F4F2EF' }}
              >
                <span className="text-sm" style={{ color: '#9CA3AF' }}>
                  Image Placeholder
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4" style={{ color: '#9CA3AF' }} />
                  <span className="text-xs" style={{ color: '#9CA3AF' }}>
                    {post.date}
                  </span>
                </div>
                <h2
                  className="text-base font-bold mb-2 leading-snug"
                  style={{ color: '#0F0F0F' }}
                >
                  {post.title}
                </h2>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: '#505050' }}>
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium"
                  style={{ color: '#ED1C24' }}
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
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

      {/* Our Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#0F0F0F' }}>
          Our Services
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/corporate"
            className="inline-flex items-center px-5 py-3 rounded-md text-sm font-medium border"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E5E5',
              color: '#2E2E2E',
            }}
          >
            Corporate Gifting
          </Link>
          <Link
            href="/products/personalised-gifts"
            className="inline-flex items-center px-5 py-3 rounded-md text-sm font-medium border"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E5E5',
              color: '#2E2E2E',
            }}
          >
            Personalised Gifts
          </Link>
          <Link
            href="/corporate/diwali-gifts"
            className="inline-flex items-center px-5 py-3 rounded-md text-sm font-medium border"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E5E5',
              color: '#2E2E2E',
            }}
          >
            Diwali Gifts
          </Link>
        </div>
      </section>

      {/* SEO Text Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0F0F0F' }}>
            Corporate Gifting: Building Stronger Teams and Lasting Impressions
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#505050' }}>
            Corporate gifting has evolved from a simple courtesy into a strategic tool for building and
            maintaining meaningful business relationships. In today&apos;s competitive landscape, companies
            that invest in thoughtful, customised gifts see measurable improvements in employee engagement,
            client retention, and brand loyalty. At PrintStop, we understand that every gift tells a story
            about your brand, and we are committed to helping you make that story count.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#505050' }}>
            Whether you are looking to appreciate your employees, strengthen relationships with clients, or
            create a memorable brand experience at events, our extensive range of corporate gifts covers every
            occasion. From premium desk accessories and tech gadgets to personalised apparel and gourmet
            hampers, PrintStop offers thousands of products that can be customised with your logo, brand
            colours, and messaging. Our state-of-the-art printing and engraving technology ensures that every
            product reflects the quality and professionalism your brand stands for.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#505050' }}>
            What sets PrintStop apart as the best corporate gifting platform in India is our end-to-end
            service approach. We handle everything from design consultation and product sampling to bulk
            production and timely delivery across the country. Our dedicated account managers work closely
            with you to understand your gifting objectives, recommend the best products within your budget,
            and ensure a seamless ordering experience from start to finish. With over 1000 satisfied corporate
            clients and a 4.8-star rating on Google, PrintStop has earned the trust of leading companies
            across industries including IT, finance, manufacturing, and healthcare.
          </p>
        </div>
      </section>
    </div>
  );
}
