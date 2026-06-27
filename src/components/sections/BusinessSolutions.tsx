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
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          badge="Solutions"
          title="Business Solutions"
          description="Tailored printing solutions for every business need"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-slate-50 rounded-2xl p-6 h-full hover:bg-white hover:border-primary/30 hover:shadow-xl border border-transparent transition-all duration-400">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  solution.color === 'primary' ? 'bg-primary/10 group-hover:bg-primary' :
                  solution.color === 'accent' ? 'bg-accent/10 group-hover:bg-accent' : 'bg-success/10 group-hover:bg-success'
                } transition-colors`}>
                  <solution.icon className={`w-6 h-6 ${
                    solution.color === 'primary' ? 'text-primary group-hover:text-white' :
                    solution.color === 'accent' ? 'text-accent group-hover:text-white' : 'text-success group-hover:text-white'
                  } transition-colors`} />
                </div>
                <h3 className="font-semibold font-heading text-dark mb-2 group-hover:text-primary transition-colors">{solution.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{solution.description}</p>
                <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/quote/request" className="text-primary font-medium hover:text-primary-dark transition-colors inline-flex items-center gap-2">
            Get Custom Solution <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
