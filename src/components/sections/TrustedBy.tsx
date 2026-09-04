'use client';

import { motion } from 'motion/react';
import Container from '@/components/ui/Container';

const brands = [
  'TechCorp', 'GreenEarth', 'MedCare', 'EduLearn', 'RetailMax',
  'Hotel Grand', 'FoodieHub', 'AutoPlus', 'BuildRight', 'FashionHub',
];

export default function TrustedBy() {
  return (
    <section className="py-3 bg-white border-top border-bottom border-light">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="text-muted text-uppercase fw-medium" style={{ letterSpacing: '0.1em' }}>Trusted by leading brands</p>
        </motion.div>

        <div className="d-flex flex-wrap align-items-center justify-content-center gap-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="font-heading fw-bold fs-4 text-muted"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
