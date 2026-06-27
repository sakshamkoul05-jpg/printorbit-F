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
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          badge="Templates"
          title="Professional Design Templates"
          description="Start with a template and customize it to match your brand"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {templates.map((template, i) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-400 border border-transparent hover:border-primary/30">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{template.emoji}</span>
                  {template.premium && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-accent rounded-full">
                      <Star className="w-3 h-3 text-white fill-white" />
                      <span className="text-[10px] font-bold text-white">PRO</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary font-medium">{template.category}</span>
                  <h3 className="font-semibold font-heading text-dark mt-1 group-hover:text-primary transition-colors">{template.name}</h3>
                  <button className="flex items-center gap-1 mt-3 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Use Template <ArrowRight className="w-4 h-4" />
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
          className="text-center mt-12"
        >
          <Link href="/design-studio">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
              Browse All Templates
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
