'use client';

import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const templates = [
  { name: 'Modern Business Card', category: 'Business Cards', premium: false, emoji: '💼' },
  { name: 'Elegant Letterhead', category: 'Stationery', premium: true, emoji: '📄' },
  { name: 'Product Label', category: 'Labels', premium: false, emoji: '🏷️' },
  { name: 'Event Flyer', category: 'Marketing', premium: false, emoji: '📣' },
  { name: 'Restaurant Menu', category: 'Food & Beverage', premium: true, emoji: '🍽️' },
  { name: 'Wedding Invitation', category: 'Personal', premium: true, emoji: '💌' },
];

export default function Templates() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <SectionHeader
          badge="Templates"
          title="Professional Design Templates"
          description="Start with a template and customize it to match your brand"
        />

        <div className="row g-4 mt-3">
          {templates.map((template, i) => (
            <motion.div
              key={template.name}
              className="col-12 col-sm-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bg-slate-50 rounded-4 overflow-hidden border border-transparent">
                <div className="d-flex align-items-center justify-content-center position-relative" style={{ aspectRatio: '4/3', background: 'linear-gradient(to bottom right, rgba(var(--bs-primary-rgb), 0.05), rgba(var(--bs-accent-rgb), 0.05))' }}>
                  <span className="display-6">{template.emoji}</span>
                  {template.premium && (
                    <div className="position-absolute top-0 end-0 m-3 d-flex align-items-center gap-1 px-2 py-1 bg-accent rounded-pill">
                      <Star size={12} className="text-white" style={{ fill: 'white' }} />
                      <span className="fw-bold text-white" style={{ fontSize: '10px' }}>PRO</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className="fw-medium text-primary" style={{ fontSize: '12px' }}>{template.category}</span>
                  <h3 className="fw-semibold font-heading text-dark mt-1 mb-2">{template.name}</h3>
                  <button className="d-flex align-items-center gap-1 mt-2 text-primary fw-medium border-0 bg-transparent p-0" style={{ fontSize: '14px' }}>
                    Use Template <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-4"
        >
          <Link href="/design-studio">
            <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
              Browse All Templates
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
