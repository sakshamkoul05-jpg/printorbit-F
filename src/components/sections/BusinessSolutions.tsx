'use client';

import { motion } from 'motion/react';
import { Briefcase, CreditCard, FileText, Users, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

const solutions = [
  { icon: Briefcase, title: 'Startup Kit', description: 'Complete branding package for new businesses - cards, letterheads, envelopes', color: 'primary' },
  { icon: CreditCard, title: 'Corporate Cards', description: 'Premium business cards with special finishes for professionals', color: 'accent' },
  { icon: FileText, title: 'Marketing Materials', description: 'Flyers, brochures, banners for your marketing campaigns', color: 'success' },
  { icon: Users, title: 'Event Materials', description: 'Badges, programs, signage for conferences and events', color: 'primary' },
];

export default function BusinessSolutions() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <SectionHeader
          badge="Solutions"
          title="Business Solutions"
          description="Tailored printing solutions for every business need"
        />

        <div className="row g-4 mt-3">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.title}
              className="col-12 col-sm-6 col-lg-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bg-slate-50 rounded-4 p-4 h-100 border border-transparent">
                <div className={`rounded-4 d-flex align-items-center justify-content-center mb-3 ${
                  solution.color === 'primary' ? 'bg-primary' :
                  solution.color === 'accent' ? 'bg-accent' : 'bg-success'
                }`} style={{ width: '48px', height: '48px', backgroundColor: solution.color === 'primary' ? 'rgba(var(--bs-primary-rgb), 0.1)' : solution.color === 'accent' ? 'rgba(var(--bs-accent-rgb), 0.1)' : 'rgba(var(--bs-success-rgb), 0.1)' }}>
                  <solution.icon size={24} className={
                    solution.color === 'primary' ? 'text-primary' :
                    solution.color === 'accent' ? 'text-accent' : 'text-success'
                  } />
                </div>
                <h3 className="fw-semibold font-heading text-dark mb-2">{solution.title}</h3>
                <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>{solution.description}</p>
                <div className="d-flex align-items-center gap-1 mt-3 text-primary fw-medium" style={{ fontSize: '14px' }}>
                  Learn more <ArrowRight size={16} />
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
          <Link href="/quote/request" className="text-primary fw-medium d-inline-flex align-items-center gap-2 text-decoration-none">
            Get Custom Solution <ArrowRight size={16} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
