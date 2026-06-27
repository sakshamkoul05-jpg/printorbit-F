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
    <section className="py-20 bg-slate-50">
      <Container>
        <SectionHeader
          badge="Gallery"
          title="Customer Showcase"
          description="See what our customers have created with PrintOrbit"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mt-12">
          {gallery.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-400 cursor-pointer">
                <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                <span className="text-xs font-medium text-muted group-hover:text-primary transition-colors">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
