'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const posts = [
  { id: 1, title: 'How to Choose the Perfect Paper for Your Brand', excerpt: 'Different paper types offer unique textures and finishes. Discover which paper elevates your brand.', date: '2026-06-20', tag: 'Design Tips', slug: 'choose-perfect-paper-brand', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=320&fit=crop' },
  { id: 2, title: 'The Ultimate Guide to Banner Printing', excerpt: 'From trade shows to storefronts, create banners that command attention.', date: '2026-06-15', tag: 'Products', slug: 'ultimate-guide-banners', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=320&fit=crop' },
  { id: 3, title: '5 Print Materials Every Brand Needs', excerpt: 'Print marketing remains powerful. Elevate your brand with these essential materials.', date: '2026-06-10', tag: 'Marketing', slug: '5-print-materials-brand', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=320&fit=crop' },
];

export default function LatestBlogs() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <SectionHeader
          badge="Blog"
          title="Latest Insights"
          description="Printing tips, design guides, and industry insights"
        />

        <div className="row g-4 mt-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              className="col-12 col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="text-decoration-none">
                <div className="bg-slate-50 rounded-4 overflow-hidden border border-transparent">
                  <div className="position-relative" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="fw-medium text-primary px-2 py-1 rounded-pill" style={{ fontSize: '12px', backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)' }}>{post.tag}</span>
                      <span className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '12px' }}>
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="fw-semibold font-heading text-dark mb-2">{post.title}</h3>
                    <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>{post.excerpt}</p>
                    <div className="d-flex align-items-center gap-1 mt-3 text-primary fw-medium" style={{ fontSize: '14px' }}>
                      Read More <ArrowRight size={16} />
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
          className="text-center mt-4"
        >
          <Link href="/blog" className="text-primary fw-medium d-inline-flex align-items-center gap-2 text-decoration-none">
            View All Articles <ArrowRight size={16} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
