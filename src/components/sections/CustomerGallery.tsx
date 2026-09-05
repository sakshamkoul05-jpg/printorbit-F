'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const gallery = [
  { label: 'Business Cards', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
  { label: 'Custom Packaging', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
  { label: 'Sticker Sheets', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop' },
  { label: 'Branded Apparel', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
  { label: 'Coffee Cups', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop' },
  { label: 'Paper Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
  { label: 'Brochures', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=400&fit=crop' },
  { label: 'Flyers', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=400&fit=crop' },
];

export default function CustomerGallery() {
  return (
    <section className="py-5 bg-slate-50">
      <Container>
        <SectionHeader
          badge="Gallery"
          title="Customer Showcase"
          description="See what our customers have created with PrintOrbit"
        />

        <div className="row g-3 mt-3">
          {gallery.map((item, i) => (
            <motion.div
              key={item.label}
              className="col-6 col-sm-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="bg-white rounded-4 overflow-hidden border border-light cursor-pointer">
                <div className="position-relative" style={{ aspectRatio: '1' }}>
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    unoptimized
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-3 text-center">
                  <span className="fw-medium text-muted" style={{ fontSize: '12px' }}>{item.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
