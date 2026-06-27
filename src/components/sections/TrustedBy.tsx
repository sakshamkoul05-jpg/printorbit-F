'use client';

import { motion } from 'motion/react';
import Container from '@/components/ui/Container';

const brands = [
  'TechCorp', 'GreenEarth', 'MedCare', 'EduLearn', 'RetailMax',
  'Hotel Grand', 'FoodieHub', 'AutoPlus', 'BuildRight', 'FashionHub',
];

export default function TrustedBy() {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted uppercase tracking-wider font-medium">Trusted by leading brands</p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-slate-300 hover:text-slate-500 transition-colors font-heading font-bold text-xl"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
