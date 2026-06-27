import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | PrintOrbit',
  description: 'Printing tips, design guides, and industry news from PrintOrbit.',
};

const posts = [
  {
    id: 1,
    title: 'How to Choose the Right Paper for Your Business Cards',
    excerpt: 'Different paper types offer different textures, weights, and finishes. Learn which paper is best for your brand.',
    date: '2026-06-20',
    tag: 'Design Tips',
    slug: 'choose-right-paper-business-cards',
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Banner Sizes',
    excerpt: 'From trade shows to storefronts, discover the perfect banner size for your marketing needs.',
    date: '2026-06-15',
    tag: 'Products',
    slug: 'ultimate-guide-banner-sizes',
  },
  {
    id: 3,
    title: '5 Print Marketing Materials Every Business Needs',
    excerpt: 'Still relevant in the digital age, print marketing can boost your brand visibility significantly.',
    date: '2026-06-10',
    tag: 'Marketing',
    slug: '5-print-marketing-materials-business',
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-printorbit-navy text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Printing tips, design guides, and industry news.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video bg-printorbit-light flex items-center justify-center">
                  <span className="text-3xl opacity-30">📝</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs bg-printorbit-red-light text-printorbit-red px-2 py-0.5 rounded-full">{post.tag}</span>
                    <span className="flex items-center gap-1 text-xs text-printorbit-gray">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-printorbit-navy group-hover:text-printorbit-red transition-colors mb-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm text-printorbit-gray mb-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-sm text-printorbit-red hover:text-printorbit-red-dark font-medium">
                    Read More <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
