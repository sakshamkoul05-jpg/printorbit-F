'use client';

import { motion } from 'motion/react';
import { Building2, Stethoscope, GraduationCap, ShoppingCart, Home, Hotel, Heart, Landmark, Car, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

const industries = [
  { icon: Building2, name: 'IT & Software', description: 'Corporate stationery, ID cards, tech event materials', color: 'primary' },
  { icon: Stethoscope, name: 'Healthcare', description: 'Medical forms, prescription pads, clinic branding', color: 'success' },
  { icon: GraduationCap, name: 'Education', description: 'College merch, event banners, certificates', color: 'accent' },
  { icon: ShoppingCart, name: 'Retail', description: 'Product labels, price tags, shopping bags', color: 'primary' },
  { icon: Hotel, name: 'Hospitality', description: 'Hotel stationery, menus, key cards', color: 'accent' },
  { icon: Heart, name: 'NGOs', description: 'Campaign materials, donation receipts, event kits', color: 'success' },
  { icon: Landmark, name: 'Government', description: 'Official letterheads, ID cards, signage', color: 'primary' },
  { icon: Car, name: 'Automotive', description: 'Showroom branding, service manuals, stickers', color: 'accent' },
];

export default function IndustrySolutions() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <SectionHeader
          badge="Industries"
          title="Solutions for Every Industry"
          description="Specialized printing solutions tailored to your industry needs"
        />

        <div className="row g-4 mt-3">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              className="col-12 col-sm-6 col-lg-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="bg-slate-50 rounded-4 p-4 h-100 border border-transparent cursor-pointer">
                <div className={`rounded-4 d-flex align-items-center justify-content-center mb-3 ${
                  industry.color === 'primary' ? 'bg-primary' :
                  industry.color === 'accent' ? 'bg-accent' : 'bg-success'
                }`} style={{ width: '48px', height: '48px', backgroundColor: industry.color === 'primary' ? 'rgba(var(--bs-primary-rgb), 0.1)' : industry.color === 'accent' ? 'rgba(var(--bs-accent-rgb), 0.1)' : 'rgba(var(--bs-success-rgb), 0.1)' }}>
                  <industry.icon size={24} className={
                    industry.color === 'primary' ? 'text-primary' :
                    industry.color === 'accent' ? 'text-accent' : 'text-success'
                  } />
                </div>
                <h3 className="fw-semibold font-heading text-dark mb-2">{industry.name}</h3>
                <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>{industry.description}</p>
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
          <Link href="/clients" className="text-primary fw-medium d-inline-flex align-items-center gap-2 text-decoration-none">
            View All Industries <ArrowRight size={16} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
