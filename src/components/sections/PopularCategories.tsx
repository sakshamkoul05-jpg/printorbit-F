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
    <section className="py-5 bg-slate-50">
      <Container>
        <SectionHeader
          badge="Categories"
          title="Popular Product Categories"
          description="Explore our wide range of printing products for every business need"
        />

        <div className="row g-4 mt-3">
          {PRODUCT_CATEGORIES.map((cat, i) => {
            const Icon = iconMap[cat.icon] || FileText;
            return (
              <motion.div
                key={cat.slug}
                className="col-12 col-sm-6 col-lg-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/products/${cat.slug}`}
                  className="text-decoration-none"
                >
                  <div className="bg-white rounded-4 p-4 border border-light h-100">
                    <div className="bg-primary rounded-4 d-flex align-items-center justify-content-center mb-3" style={{ width: '56px', height: '56px', backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)' }}>
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h3 className="fw-semibold font-heading text-dark mb-2">{cat.name}</h3>
                    <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>{cat.description}</p>
                    <div className="d-flex align-items-center gap-1 mt-3 text-primary fw-medium" style={{ fontSize: '14px' }}>
                      Explore <ArrowRight size={16} />
                    </div>
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
