'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary via-primary-dark to-dark rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white">Start your project today</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Get a free quote for your printing requirements. Competitive prices, premium quality, fast delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote/request">
                <Button variant="accent" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                  Request Free Quote
                </Button>
              </Link>
              <a href="tel:+919876543210">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10" icon={<Phone className="w-5 h-5" />}>
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
