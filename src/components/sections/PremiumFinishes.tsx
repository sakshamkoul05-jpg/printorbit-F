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

export default function PremiumFinishes() {
  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <SectionHeader
          badge="Finishes"
          title="Premium Finishes & Effects"
          description="Elevate your prints with our premium finishing options"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {finishes.map((finish, i) => (
            <motion.div
              key={finish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-400">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${finish.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl">{finish.emoji}</span>
                </div>
                <h3 className="font-semibold font-heading text-dark mb-2 group-hover:text-primary transition-colors">{finish.name}</h3>
                <p className="text-sm text-muted leading-relaxed">{finish.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
