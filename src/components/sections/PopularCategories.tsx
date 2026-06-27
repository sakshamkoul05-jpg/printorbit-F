'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, CreditCard, Image, FileText, Tag, Package, Shirt, Camera, PenTool } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const iconMap: Record<string, React.ElementType> = {
  CreditCard, Image, FileText, Tag, Package, Shirt, Camera, PenTool,
};

export default function PopularCategories() {
  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <SectionHeader
          badge="Categories"
          title="Popular Product Categories"
          description="Explore our wide range of printing products for every business need"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {PRODUCT_CATEGORIES.map((cat, i) => {
            const Icon = iconMap[cat.icon] || FileText;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/products/${cat.slug}`}
                  className="block bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-400 group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold font-heading text-dark mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">{cat.description}</p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
