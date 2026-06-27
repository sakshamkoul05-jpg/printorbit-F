'use client';

import { motion } from 'motion/react';
import { Award, Users, Truck, Star, Shield, Clock, CheckCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const stats = [
  { icon: Award, value: '10+', label: 'Years Experience' },
  { icon: Users, value: '5000+', label: 'Happy Clients' },
  { icon: Truck, value: '100+', label: 'Cities Served' },
  { icon: Star, value: '4.9', label: 'Customer Rating' },
];

const features = [
  'Premium quality printing with latest technology',
  'Competitive bulk pricing for businesses',
  'Fast 3-5 day turnaround guaranteed',
  'Free design assistance included',
  'Delivery across India',
  'Dedicated support team',
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              badge="Why Us"
              title="Why Choose PrintOrbit?"
              description="We combine cutting-edge technology with meticulous craftsmanship"
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-slate-600">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-primary/5 transition-colors group"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold font-heading text-dark">{stat.value}</div>
                  <div className="text-sm text-muted mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 bg-primary/5 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold font-heading text-dark">100% Quality Guarantee</h4>
                  <p className="text-sm text-muted">If you&apos;re not satisfied, we&apos;ll reprint for free</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
