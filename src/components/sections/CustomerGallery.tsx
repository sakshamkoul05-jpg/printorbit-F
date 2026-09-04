'use client';

import { motion } from 'motion/react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const gallery = [
  { emoji: '💼', label: 'Business Cards' },
  { emoji: '📦', label: 'Custom Packaging' },
  { emoji: '🏷️', label: 'Sticker Sheets' },
  { emoji: '👕', label: 'Branded Apparel' },
  { emoji: '☕', label: 'Coffee Cups' },
  { emoji: '🛍️', label: 'Paper Bags' },
  { emoji: '📋', label: 'Brochures' },
  { emoji: '🎯', label: 'Flyers' },
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
              <div className="bg-white rounded-4 p-4 text-center border border-light cursor-pointer">
                <span className="fs-2 mb-2 d-block">{item.emoji}</span>
                <span className="fw-medium text-muted" style={{ fontSize: '12px' }}>{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
