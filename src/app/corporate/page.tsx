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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark via-dark-light to-primary/90 text-white">
        <Container>
          <div className="py-16 md:py-20 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white/80 text-xs font-medium rounded-full mb-4">
                <Building className="w-3 h-3" /> Corporate Printing Solutions
              </span>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Enterprise Printing,<br />
                <span className="gradient-text">Simplified</span>
              </h1>
              <p className="text-white/60 leading-relaxed max-w-xl">
                From startups to Fortune 500 companies, we provide end-to-end printing solutions with volume discounts, dedicated support, and pan-India delivery.
              </p>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Features */}
        <div className="py-16">
          <h2 className="text-2xl font-bold text-dark font-heading text-center mb-10">Why Corporate Clients Choose PrintOrbit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-primary/10 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-dark mb-2">{feature.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="pb-16">
          <h2 className="text-2xl font-bold text-dark font-heading text-center mb-3">Corporate Pricing Plans</h2>
          <p className="text-center text-muted text-sm mb-10">Volume-based pricing that scales with your business</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border-2 p-6 ${
                  plan.popular ? 'border-primary shadow-xl shadow-primary/10' : 'border-slate-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white text-[10px] font-bold rounded-full uppercase">
                    Most Popular
                  </div>
                )}

                <h3 className="text-lg font-bold text-dark font-heading">{plan.name}</h3>
                <div className="mt-3 mb-1">
                  <span className="text-3xl font-bold text-primary">{plan.discount}</span>
                  <span className="text-sm text-muted ml-1">discount</span>
                </div>
                <p className="text-xs text-muted mb-5">Min. order: {plan.minOrder} pcs</p>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="pb-20">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-dark font-heading text-center mb-2">Get in Touch</h2>
            <p className="text-sm text-muted text-center mb-6">Tell us about your requirements and we&apos;ll get back to you within 24 hours.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Full Name *</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Email *</label>
                  <input type="email" className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Phone *</label>
                  <input type="tel" className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Company *</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Estimated Monthly Order Volume</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary">
                  <option>Select volume range</option>
                  <option>1,000 - 5,000 pieces</option>
                  <option>5,000 - 25,000 pieces</option>
                  <option>25,000 - 1,00,000 pieces</option>
                  <option>1,00,000+ pieces</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Message</label>
                <textarea rows={4} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary resize-none" placeholder="Tell us about your printing needs..." />
              </div>
              <Button variant="primary" size="lg" className="w-full">
                Submit Inquiry <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
