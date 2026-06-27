'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const posts = [
  { id: 1, title: 'How to Choose the Perfect Paper for Your Brand', excerpt: 'Different paper types offer unique textures and finishes. Discover which paper elevates your brand.', date: '2026-06-20', tag: 'Design Tips', slug: 'choose-perfect-paper-brand', emoji: '📄' },
  { id: 2, title: 'The Ultimate Guide to Banner Printing', excerpt: 'From trade shows to storefronts, create banners that command attention.', date: '2026-06-15', tag: 'Products', slug: 'ultimate-guide-banners', emoji: '📣' },
  { id: 3, title: '5 Print Materials Every Brand Needs', excerpt: 'Print marketing remains powerful. Elevate your brand with these essential materials.', date: '2026-06-10', tag: 'Marketing', slug: '5-print-materials-brand', emoji: '💼' },
];

export default function LatestBlogs() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          badge="Blog"
          title="Latest Insights"
          description="Printing tips, design guides, and industry insights"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-400 border border-transparent hover:border-primary/30">
                  <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{post.emoji}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{post.tag}</span>
                      <span className="flex items-center gap-1 text-xs text-muted">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-semibold font-heading text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/blog" className="text-primary font-medium hover:text-primary-dark transition-colors inline-flex items-center gap-2">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
