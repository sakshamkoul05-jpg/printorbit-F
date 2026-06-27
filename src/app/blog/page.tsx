import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | PrintOrbit',
  description: 'Printing tips, design guides, and industry insights.',
};

const posts = [
  { id: 1, title: 'How to Choose the Perfect Paper for Your Brand', excerpt: 'Different paper types offer unique textures and finishes. Discover which paper elevates your brand.', date: '2026-06-20', tag: 'Design Tips', slug: 'choose-perfect-paper-brand' },
  { id: 2, title: 'The Ultimate Guide to Banner Printing', excerpt: 'From trade shows to storefronts, create banners that command attention.', date: '2026-06-15', tag: 'Products', slug: 'ultimate-guide-premium-banners' },
  { id: 3, title: '5 Print Materials Every Brand Needs', excerpt: 'Print marketing remains powerful. Elevate your brand with these essential materials.', date: '2026-06-10', tag: 'Marketing', slug: '5-print-materials-distinguished-brand' },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Blog</h1>
          <p className="text-white/50 max-w-xl mx-auto">Printing tips, design guides, and industry insights.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden group hover:border-navy/30 transition-colors">
                <div className="aspect-video bg-slate-50 flex items-center justify-center">
                  <span className="text-3xl text-slate-200">📝</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{post.tag}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-sm font-bold text-navy group-hover:text-navy-light transition-colors mb-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-xs text-navy hover:text-navy-light font-medium transition-colors">
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
