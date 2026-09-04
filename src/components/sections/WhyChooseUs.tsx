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
    <section className="py-5 bg-white">
      <Container>
        <div className="row align-items-center g-4">
          {/* Left Content */}
          <motion.div
            className="col-12 col-lg-6"
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

            <div className="row g-3 mt-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  className="col-12 col-sm-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle size={20} className="text-primary flex-shrink-0" />
                    <span className="text-muted">{feature}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            className="col-12 col-lg-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="row g-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="col-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="bg-slate-50 rounded-4 p-4 text-center">
                    <stat.icon size={32} className="text-primary mx-auto mb-2" />
                    <div className="fs-2 fw-bold font-heading text-dark">{stat.value}</div>
                    <div className="text-muted mt-1">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 rounded-4 p-4"
              style={{ backgroundColor: 'rgba(var(--bs-primary-rgb), 0.05)' }}
            >
              <div className="d-flex align-items-center gap-3">
                <Shield size={32} className="text-primary" />
                <div>
                  <h4 className="fw-semibold font-heading text-dark mb-0">100% Quality Guarantee</h4>
                  <p className="text-muted mb-0">If you&apos;re not satisfied, we&apos;ll reprint for free</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
