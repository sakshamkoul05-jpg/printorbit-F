'use client';

import { motion } from 'motion/react';
import { Package, TrendingUp, Truck, Shield, CheckCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const benefits = [
  { icon: TrendingUp, title: 'Volume Discounts', description: 'Save up to 40% on bulk orders' },
  { icon: Truck, title: 'Priority Shipping', description: 'Fast tracked delivery for bulk orders' },
  { icon: Shield, title: 'Quality Assured', description: 'Same premium quality at every quantity' },
  { icon: Package, title: 'Consolidated Packaging', description: 'Eco-friendly packaging for large orders' },
];

export default function BulkPrinting() {
  return (
    <section className="py-5" style={{ background: 'linear-gradient(to bottom right, rgba(var(--bs-primary-rgb), 0.05), rgba(var(--bs-accent-rgb), 0.05))' }}>
      <Container>
        <div className="row align-items-center g-4">
          {/* Left - Content */}
          <motion.div
            className="col-12 col-lg-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              badge="Bulk Orders"
              title="Bulk Printing Made Easy"
              description="Special pricing and dedicated support for large volume orders"
              align="left"
            />

            <div className="row g-3 mt-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  className="col-12 col-sm-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-primary rounded-4 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)' }}>
                      <benefit.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="fw-semibold font-heading text-dark mb-0" style={{ fontSize: '14px' }}>{benefit.title}</h4>
                      <p className="text-muted mb-0" style={{ fontSize: '12px' }}>{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 d-flex flex-wrap gap-3"
            >
              <Link href="/quote/request">
                <Button variant="primary" size="lg">
                  Get Bulk Quote
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Stats Card */}
          <motion.div
            className="col-12 col-lg-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-4 p-4 shadow-xl border border-light">
              <h3 className="fs-4 fw-bold font-heading text-dark mb-4">Bulk Order Benefits</h3>

              <div className="d-flex flex-column gap-3">
                {[
                  { qty: '50-100', discount: '10% OFF' },
                  { qty: '100-500', discount: '20% OFF' },
                  { qty: '500-1000', discount: '30% OFF' },
                  { qty: '1000+', discount: '40% OFF' },
                ].map((tier) => (
                  <div key={tier.qty} className="d-flex align-items-center justify-content-between p-3 bg-slate-50 rounded-4">
                    <span className="fw-medium text-dark" style={{ fontSize: '14px' }}>{tier.qty} pieces</span>
                    <span className="fw-bold text-primary" style={{ fontSize: '14px' }}>{tier.discount}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-4" style={{ backgroundColor: 'rgba(var(--bs-primary-rgb), 0.05)' }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <CheckCircle size={20} className="text-primary" />
                  <span className="fw-semibold font-heading text-dark">Enterprise Solutions</span>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: '14px' }}>Need 10,000+ pieces? Contact us for custom enterprise pricing and dedicated account management.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
