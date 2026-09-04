'use client';

import { motion } from 'motion/react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const finishes = [
  { name: 'Matte', description: 'Smooth, non-reflective finish for elegant look', emoji: '✨', color: 'from-slate-100 to-slate-200' },
  { name: 'Glossy', description: 'Shiny, reflective finish for vibrant colors', emoji: '💎', color: 'from-primary/10 to-primary/20' },
  { name: 'Spot UV', description: 'Raised glossy areas on matte surface', emoji: '🎯', color: 'from-accent/10 to-accent/20' },
  { name: 'Foil Stamping', description: 'Metallic foil for premium branding', emoji: '🥇', color: 'from-yellow-100 to-yellow-200' },
  { name: 'Embossing', description: 'Raised design for tactile experience', emoji: '👆', color: 'from-primary/10 to-primary/20' },
  { name: 'Debossing', description: 'Pressed design for subtle elegance', emoji: '🔽', color: 'from-slate-100 to-slate-200' },
];

const getFinishBg = (color: string) => {
  if (color === 'from-slate-100 to-slate-200') return 'linear-gradient(to bottom right, #f1f5f9, #e2e8f0)';
  if (color === 'from-primary/10 to-primary/20') return 'linear-gradient(to bottom right, rgba(var(--bs-primary-rgb), 0.1), rgba(var(--bs-primary-rgb), 0.2))';
  if (color === 'from-accent/10 to-accent/20') return 'linear-gradient(to bottom right, rgba(var(--bs-accent-rgb), 0.1), rgba(var(--bs-accent-rgb), 0.2))';
  if (color === 'from-yellow-100 to-yellow-200') return 'linear-gradient(to bottom right, #fef9c3, #fde68a)';
  return 'linear-gradient(to bottom right, #f1f5f9, #e2e8f0)';
};

export default function PremiumFinishes() {
  return (
    <section className="py-5 bg-slate-50">
      <Container>
        <SectionHeader
          badge="Finishes"
          title="Premium Finishes & Effects"
          description="Elevate your prints with our premium finishing options"
        />

        <div className="row g-4 mt-3">
          {finishes.map((finish, i) => (
            <motion.div
              key={finish.name}
              className="col-12 col-sm-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bg-white rounded-4 p-4 border border-light">
                <div
                  className="rounded-4 d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '64px', height: '64px', background: getFinishBg(finish.color) }}
                >
                  <span className="fs-3">{finish.emoji}</span>
                </div>
                <h3 className="fw-semibold font-heading text-dark mb-2">{finish.name}</h3>
                <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>{finish.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
