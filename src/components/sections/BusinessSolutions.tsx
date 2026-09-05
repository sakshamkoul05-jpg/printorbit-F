'use client';

import { motion } from 'motion/react';
import { Briefcase, CreditCard, FileText, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

const solutions = [
  { icon: Briefcase, title: 'Startup Kit', description: 'Complete branding package for new businesses - cards, letterheads, envelopes', color: 'primary', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop' },
  { icon: CreditCard, title: 'Corporate Cards', description: 'Premium business cards with special finishes for professionals', color: 'accent', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop' },
  { icon: FileText, title: 'Marketing Materials', description: 'Flyers, brochures, banners for your marketing campaigns', color: 'success', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop' },
  { icon: Users, title: 'Event Materials', description: 'Badges, programs, signage for conferences and events', color: 'primary', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop' },
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
              <div className="bg-slate-50 rounded-4 overflow-hidden h-100 border border-transparent">
                <div className="position-relative" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    unoptimized
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="fw-semibold font-heading text-dark mb-2">{solution.title}</h3>
                  <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>{solution.description}</p>
                  <div className="d-flex align-items-center gap-1 mt-3 text-primary fw-medium" style={{ fontSize: '14px' }}>
                    Learn more <ArrowRight size={16} />
                  </div>
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
