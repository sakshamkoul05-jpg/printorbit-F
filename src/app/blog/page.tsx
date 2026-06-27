import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | PrintOrbit',
  description: 'Premium printing tips, design guides, and industry insights.',
};

const posts = [
  { id: 1, title: 'How to Choose the Perfect Paper for Your Brand', excerpt: 'Different paper types offer unique textures and finishes. Discover which paper elevates your brand.', date: '2026-06-20', tag: 'Design Tips', slug: 'choose-perfect-paper-brand' },
  { id: 2, title: 'The Ultimate Guide to Premium Banner Printing', excerpt: 'From trade shows to luxury storefronts, create banners that command attention.', date: '2026-06-15', tag: 'Products', slug: 'ultimate-guide-premium-banners' },
  { id: 3, title: '5 Print Materials Every Distinguished Brand Needs', excerpt: 'Print marketing remains powerful. Elevate your brand with these essential materials.', date: '2026-06-10', tag: 'Marketing', slug: '5-print-materials-distinguished-brand' },
];

export default function BlogPage() {
  return (
    <>
      <section className="relative py-24 hero-pattern noise-overlay">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Insights</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-white-dim max-w-2xl mx-auto text-lg">Premium printing tips, design guides, and industry insights.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="card-3d rounded-2xl overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-gold/5 to-transparent flex items-center justify-center">
                  <span className="text-4xl opacity-10">📝</span>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase tracking-wider bg-gold/10 text-gold px-2.5 py-1 rounded-full font-medium">{post.tag}</span>
                    <span className="flex items-center gap-1 text-xs text-white-dim">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white group-hover:text-gold transition-colors duration-300 mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm text-white-dim mb-4 leading-relaxed">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-1.5 text-sm text-gold hover:text-gold-light font-medium transition-colors">
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
