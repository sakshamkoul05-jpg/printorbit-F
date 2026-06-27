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
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          badge="Industries"
          title="Solutions for Every Industry"
          description="Specialized printing solutions tailored to your industry needs"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="bg-slate-50 rounded-2xl p-6 h-full hover:bg-white hover:border-primary/30 hover:shadow-xl border border-transparent transition-all duration-400 group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  industry.color === 'primary' ? 'bg-primary/10 group-hover:bg-primary' :
                  industry.color === 'accent' ? 'bg-accent/10 group-hover:bg-accent' : 'bg-success/10 group-hover:bg-success'
                } transition-colors`}>
                  <industry.icon className={`w-6 h-6 ${
                    industry.color === 'primary' ? 'text-primary group-hover:text-white' :
                    industry.color === 'accent' ? 'text-accent group-hover:text-white' : 'text-success group-hover:text-white'
                  } transition-colors`} />
                </div>
                <h3 className="font-semibold font-heading text-dark mb-2 group-hover:text-primary transition-colors">{industry.name}</h3>
                <p className="text-sm text-muted leading-relaxed">{industry.description}</p>
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
          <Link href="/clients" className="text-primary font-medium hover:text-primary-dark transition-colors inline-flex items-center gap-2">
            View All Industries <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
