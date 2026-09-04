'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Building, CheckCircle, ArrowRight, Shield, Clock, Truck, Headphones,
  FileText, CreditCard, Users, Globe, Zap,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

const PLANS = [
  {
    name: 'Startup',
    minOrder: '1,000',
    discount: '5-10%',
    features: ['Standard Products', 'Online Support', '3-5 Day Delivery', 'Basic Templates'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Business',
    minOrder: '5,000',
    discount: '10-20%',
    features: ['All Products', 'Priority Support', '2-3 Day Delivery', 'Custom Templates', 'Dedicated Account Manager', 'Invoice & GST Support'],
    cta: 'Contact Sales',
    popular: true,
  },
  {
    name: 'Enterprise',
    minOrder: '25,000+',
    discount: '20-35%',
    features: ['All Products + Custom', '24/7 Phone Support', 'Express Delivery', 'Custom Design Service', 'Dedicated Account Team', 'API Integration', 'Custom Packaging', 'White-Label Options'],
    cta: 'Contact Sales',
    popular: false,
  },
];

const FEATURES = [
  { icon: Shield, title: 'Quality Guaranteed', description: '100% satisfaction guarantee on all corporate orders.' },
  { icon: Clock, title: 'Express Delivery', description: 'Priority processing and 1-2 day delivery options.' },
  { icon: CreditCard, title: 'Flexible Payment', description: 'Net 30/60 payment terms for qualifying businesses.' },
  { icon: Users, title: 'Dedicated Support', description: 'Personal account manager for all corporate clients.' },
  { icon: FileText, title: 'GST Invoicing', description: 'Complete GST-compliant invoices for input tax credit.' },
  { icon: Globe, title: 'Pan-India Delivery', description: 'Ship to multiple addresses across India.' },
];

export default function CorporatePage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', employees: '', message: '',
  });

  return (
    <div className="min-vh-100 bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark via-dark-light to-primary/90 text-white">
        <Container>
          <div className="py-16 py-md-20" style={{ maxWidth: '48rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-white/10 text-white/80 text-xs fw-medium rounded-pill mb-4">
                <Building size={12} /> Corporate Printing Solutions
              </span>
              <h1 className="display-5 fw-bold mb-4">
                Enterprise Printing,<br />
                <span className="gradient-text">Simplified</span>
              </h1>
              <p className="text-white/60 leading-relaxed" style={{ maxWidth: '36rem' }}>
                From startups to Fortune 500 companies, we provide end-to-end printing solutions with volume discounts, dedicated support, and pan-India delivery.
              </p>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Features */}
        <div className="py-16">
          <h2 className="fs-3 fw-bold text-dark text-center mb-10">Why Corporate Clients Choose PrintOrbit</h2>
          <div className="row g-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="col-12 col-md-4"
              >
                <div className="p-6 bg-white rounded-4 border border-slate-100 h-100 transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-3 d-flex align-items-center justify-content-center mb-4">
                    <feature.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-sm fw-semibold text-dark mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="pb-16">
          <h2 className="fs-3 fw-bold text-dark text-center mb-3">Corporate Pricing Plans</h2>
          <p className="text-center text-muted text-sm mb-10">Volume-based pricing that scales with your business</p>

          <div className="row g-4">
            {PLANS.map((plan) => (
              <div key={plan.name} className="col-12 col-md-4">
                <div
                  className={`position-relative bg-white rounded-4 border-2 p-6 h-100 ${
                    plan.popular ? 'border-primary shadow-lg' : 'border-slate-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="position-absolute top-0 start-50 translate-middle px-3 py-1 bg-accent text-white fw-bold rounded-pill" style={{ fontSize: '0.65rem' }}>
                      Most Popular
                    </div>
                  )}

                  <h3 className="fs-5 fw-bold text-dark">{plan.name}</h3>
                  <div className="mt-3 mb-1">
                    <span className="fs-2 fw-bold text-primary">{plan.discount}</span>
                    <span className="text-sm text-muted ms-1">discount</span>
                  </div>
                  <p className="text-xs text-muted mb-5">Min. order: {plan.minOrder} pcs</p>

                  <ul className="d-flex flex-column gap-2 mb-6 list-unstyled">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="d-flex align-items-start gap-2 text-sm text-slate-600">
                        <CheckCircle size={16} className="text-success flex-shrink-0 mt-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant={plan.popular ? 'primary' : 'outline'} className="w-100">
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="pb-20">
          <div className="mx-auto bg-white rounded-4 border border-slate-200 p-8" style={{ maxWidth: '40rem' }}>
            <h2 className="fs-4 fw-bold text-dark text-center mb-2">Get in Touch</h2>
            <p className="text-sm text-muted text-center mb-6">Tell us about your requirements and we&apos;ll get back to you within 24 hours.</p>

            <div className="d-flex flex-column gap-4">
              <div className="row g-4">
                <div className="col-6">
                  <label className="form-label text-xs fw-medium text-slate-500">Full Name *</label>
                  <input type="text" className="form-control text-sm" />
                </div>
                <div className="col-6">
                  <label className="form-label text-xs fw-medium text-slate-500">Email *</label>
                  <input type="email" className="form-control text-sm" />
                </div>
              </div>
              <div className="row g-4">
                <div className="col-6">
                  <label className="form-label text-xs fw-medium text-slate-500">Phone *</label>
                  <input type="tel" className="form-control text-sm" />
                </div>
                <div className="col-6">
                  <label className="form-label text-xs fw-medium text-slate-500">Company *</label>
                  <input type="text" className="form-control text-sm" />
                </div>
              </div>
              <div>
                <label className="form-label text-xs fw-medium text-slate-500">Estimated Monthly Order Volume</label>
                <select className="form-select text-sm">
                  <option>Select volume range</option>
                  <option>1,000 - 5,000 pieces</option>
                  <option>5,000 - 25,000 pieces</option>
                  <option>25,000 - 1,00,000 pieces</option>
                  <option>1,00,000+ pieces</option>
                </select>
              </div>
              <div>
                <label className="form-label text-xs fw-medium text-slate-500">Message</label>
                <textarea rows={4} className="form-control text-sm resize-none" placeholder="Tell us about your printing needs..." />
              </div>
              <Button variant="primary" size="lg" className="w-100">
                Submit Inquiry <ArrowRight size={16} className="ms-2" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
