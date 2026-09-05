'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const finishes = [
  { name: 'Matte', description: 'Smooth, non-reflective finish for elegant look', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop' },
  { name: 'Glossy', description: 'Shiny, reflective finish for vibrant colors', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop' },
  { name: 'Spot UV', description: 'Raised glossy areas on matte surface', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop' },
  { name: 'Foil Stamping', description: 'Metallic foil for premium branding', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop' },
  { name: 'Embossing', description: 'Raised design for tactile experience', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop' },
  { name: 'Debossing', description: 'Pressed design for subtle elegance', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop' },
];

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
              <div className="bg-white rounded-4 overflow-hidden border border-light">
                <div className="position-relative" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={finish.image}
                    alt={`${finish.name} finish`}
                    fill
                    unoptimized
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="fw-semibold font-heading text-dark mb-2">{finish.name}</h3>
                  <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>{finish.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
