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
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold font-heading text-dark text-sm">{benefit.title}</h4>
                    <p className="text-xs text-muted">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-4"
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h3 className="text-xl font-bold font-heading text-dark mb-6">Bulk Order Benefits</h3>
              
              <div className="space-y-4">
                {[
                  { qty: '50-100', discount: '10% OFF' },
                  { qty: '100-500', discount: '20% OFF' },
                  { qty: '500-1000', discount: '30% OFF' },
                  { qty: '1000+', discount: '40% OFF' },
                ].map((tier, i) => (
                  <div key={tier.qty} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm font-medium text-dark">{tier.qty} pieces</span>
                    <span className="text-sm font-bold text-primary">{tier.discount}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-semibold font-heading text-dark">Enterprise Solutions</span>
                </div>
                <p className="text-sm text-muted">Need 10,000+ pieces? Contact us for custom enterprise pricing and dedicated account management.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
