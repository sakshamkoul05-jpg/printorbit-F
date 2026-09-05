'use client';

import { motion } from 'motion/react';
import { Building2, Stethoscope, GraduationCap, ShoppingCart, Home, Hotel, Heart, Landmark, Car, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

const industries = [
  { icon: Building2, name: 'IT & Software', description: 'Corporate stationery, ID cards, tech event materials', color: 'primary', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop' },
  { icon: Stethoscope, name: 'Healthcare', description: 'Medical forms, prescription pads, clinic branding', color: 'success', image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&h=300&fit=crop' },
  { icon: GraduationCap, name: 'Education', description: 'College merch, event banners, certificates', color: 'accent', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop' },
  { icon: ShoppingCart, name: 'Retail', description: 'Product labels, price tags, shopping bags', color: 'primary', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
  { icon: Hotel, name: 'Hospitality', description: 'Hotel stationery, menus, key cards', color: 'accent', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop' },
  { icon: Heart, name: 'NGOs', description: 'Campaign materials, donation receipts, event kits', color: 'success', image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&h=300&fit=crop' },
  { icon: Landmark, name: 'Government', description: 'Official letterheads, ID cards, signage', color: 'primary', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop' },
  { icon: Car, name: 'Automotive', description: 'Showroom branding, service manuals, stickers', color: 'accent', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
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
              <div className="bg-slate-50 rounded-4 overflow-hidden h-100 border border-transparent cursor-pointer">
                <div className="position-relative" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    unoptimized
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="fw-semibold font-heading text-dark mb-2">{industry.name}</h3>
                  <p className="text-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>{industry.description}</p>
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
          <Link href="/clients" className="text-primary fw-medium d-inline-flex align-items-center gap-2 text-decoration-none">
            View All Industries <ArrowRight size={16} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
