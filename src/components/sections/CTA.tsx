'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="position-relative rounded-4 p-5 p-md-5 text-center overflow-hidden"
          style={{ background: 'linear-gradient(to bottom right, var(--bs-primary), #1a1a2e, var(--bs-dark))' }}
        >
          {/* Background Effects */}
          <div className="position-absolute inset-0">
            <div className="position-absolute top-0 end-0" style={{ width: '384px', height: '384px', background: 'rgba(var(--bs-accent-rgb), 0.2)', borderRadius: '50%', filter: 'blur(96px)' }} />
            <div className="position-absolute bottom-0 start-0" style={{ width: '384px', height: '384px', background: 'rgba(var(--bs-primary-rgb), 0.2)', borderRadius: '50%', filter: 'blur(96px)' }} />
          </div>

          <div className="position-relative" style={{ zIndex: 10 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <Sparkles size={16} className="text-accent" />
              <span className="fw-medium text-white" style={{ fontSize: '14px' }}>Start your project today</span>
            </motion.div>

            <h2 className="fs-2 fs-md-1 fw-bold font-heading text-white mb-3">
              Ready to Elevate Your Brand?
            </h2>
            <p className="fs-5 text-white mx-auto mb-4" style={{ maxWidth: '640px', opacity: 0.7 }}>
              Get a free quote for your printing requirements. Competitive prices, premium quality, fast delivery.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link href="/quote/request">
                <Button variant="accent" size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
                  Request Free Quote
                </Button>
              </Link>
              <a href="tel:+919876543210">
                <Button variant="ghost" size="lg" className="text-white" icon={<Phone size={20} />}>
                  Call Us Now
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
