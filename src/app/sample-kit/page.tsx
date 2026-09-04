'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Package, Star, CheckCircle, ArrowRight, Truck, Shield, Clock,
  Palette, Sparkles, Zap, Gift, Eye,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

const SAMPLE_KITS = [
  {
    id: 'starter',
    name: 'Starter Kit',
    price: 499,
    description: 'Perfect for small businesses starting their branding journey.',
    items: ['10 Business Cards', '10 Stickers (3 inch)', '1 Letterhead Sample'],
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional Kit',
    price: 999,
    description: 'Complete branding samples for growing businesses.',
    items: ['25 Business Cards (Premium)', '25 Stickers (Die-Cut)', '5 Letterheads', '5 Envelopes', '1 Foil Sample Card'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Kit',
    price: 1999,
    description: 'Full sample collection for large organizations.',
    items: ['50 Business Cards (All Finishes)', '50 Stickers (All Types)', '10 Letterheads', '10 Envelopes', '5 Banner Samples', '3 Packaging Samples', 'Metal Card Sample'],
    popular: false,
  },
];

const WHY_SAMPLE = [
  { icon: Eye, title: 'See & Feel Quality', description: 'Experience the actual texture, weight, and finish of our products before ordering in bulk.' },
  { icon: Palette, title: 'Compare Options', description: 'Compare different materials, finishes, and sizes side by side to make the best choice.' },
  { icon: Shield, title: 'Risk-Free', description: 'Samples are credited towards your first bulk order. Try before you commit.' },
  { icon: Truck, title: 'Free Shipping', description: 'All sample kits ship free across India. Delivered to your doorstep in 3-5 days.' },
];

export default function SampleKitPage() {
  const [selectedKit, setSelectedKit] = useState('professional');

  return (
    <div className="min-vh-100 bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark via-dark-light to-primary/90 text-white">
        <Container>
          <div className="py-16 text-center mx-auto" style={{ maxWidth: '40rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-white/10 text-white/80 text-xs fw-medium rounded-pill mb-4">
                <Gift size={12} /> Free Shipping on All Kits
              </span>
              <h1 className="display-5 fw-bold mb-4">
                Sample Kits
              </h1>
              <p className="text-white/60 leading-relaxed">
                Experience our quality firsthand. Order a sample kit and see, touch, and feel our products before placing a bulk order.
              </p>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Why Sample */}
        <div className="py-16">
          <h2 className="fs-3 fw-bold text-dark text-center mb-10">Why Order a Sample?</h2>
          <div className="row g-4">
            {WHY_SAMPLE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="col-12 col-md-6 col-lg-3"
              >
                <div className="text-center p-6 h-100">
                  <div className="w-14 h-14 bg-primary/10 rounded-4 d-flex align-items-center justify-content-center mx-auto mb-4">
                    <item.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-sm fw-semibold text-dark mb-2">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Kits */}
        <div className="pb-16">
          <div className="row g-4">
            {SAMPLE_KITS.map((kit) => (
              <div key={kit.id} className="col-12 col-md-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`position-relative bg-white rounded-4 border-2 p-6 h-100 transition-all ${
                    selectedKit === kit.id
                      ? 'border-primary shadow-lg'
                      : 'border-slate-200'
                  }`}
                >
                  {kit.popular && (
                    <div className="position-absolute top-0 start-50 translate-middle px-3 py-1 bg-accent text-white fw-bold rounded-pill" style={{ fontSize: '0.65rem' }}>
                      Most Popular
                    </div>
                  )}

                  <h3 className="fs-5 fw-bold text-dark mb-2">{kit.name}</h3>
                  <p className="text-sm text-muted mb-4">{kit.description}</p>

                  <div className="mb-6">
                    <span className="fs-2 fw-bold text-primary">{formatPrice(kit.price)}</span>
                  </div>

                  <ul className="d-flex flex-column gap-2 mb-6 list-unstyled">
                    {kit.items.map((item, i) => (
                      <li key={i} className="d-flex align-items-start gap-2 text-sm text-slate-600">
                        <CheckCircle size={16} className="text-success flex-shrink-0 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={selectedKit === kit.id ? 'primary' : 'outline'}
                    className="w-100"
                    onClick={() => setSelectedKit(kit.id)}
                  >
                    {selectedKit === kit.id ? 'Selected' : 'Select Kit'}
                  </Button>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="primary" size="lg">
              Order Sample Kit <ArrowRight size={16} className="ms-2" />
            </Button>
            <p className="text-xs text-muted mt-3">
              💡 Sample cost is credited towards your first bulk order
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
