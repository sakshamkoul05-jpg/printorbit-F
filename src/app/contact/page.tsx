'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import { OFFICES } from '@/lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-vh-100">
      {/* Hero */}
      <section className="bg-dark py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-primary fw-semibold small text-uppercase mb-3" style={{ letterSpacing: '0.1em' }}>Contact Us</p>
          <h1 className="display-5 fw-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-warm-300 mx-auto text-sm leading-relaxed" style={{ maxWidth: '36rem' }}>
            Have a question or need a quote? Our team is here to help you with all your printing needs.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-background py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-12 col-lg-8">
              <div className="bg-white rounded-3 p-6 p-md-8 border border-warm-100">
                <h2 className="fs-4 fw-bold text-dark mb-6">Send Us a Message</h2>
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 bg-success/10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                      <Send size={24} className="text-success" />
                    </div>
                    <h3 className="fs-5 fw-bold text-dark mb-2">Message Sent!</h3>
                    <p className="text-sm text-muted">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                    <div className="row g-4">
                      <div className="col-12 col-sm-6">
                        <label className="form-label text-sm fw-medium text-dark">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="Your full name"
                          className="form-control text-sm"
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <label className="form-label text-sm fw-medium text-dark">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="you@company.com"
                          className="form-control text-sm"
                        />
                      </div>
                    </div>
                    <div className="row g-4">
                      <div className="col-12 col-sm-6">
                        <label className="form-label text-sm fw-medium text-dark">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="form-control text-sm"
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <label className="form-label text-sm fw-medium text-dark">Subject *</label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          placeholder="How can we help?"
                          className="form-control text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label text-sm fw-medium text-dark">Message *</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={5}
                        placeholder="Tell us about your printing requirements..."
                        className="form-control text-sm resize-none"
                      />
                    </div>
                    <Button type="submit" variant="primary" size="lg">
                      <Send size={16} className="me-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-4">
              {/* Contact Info */}
              <div className="bg-white rounded-3 p-6 border border-warm-100">
                <h3 className="fs-5 fw-bold text-dark mb-4">Contact Information</h3>
                <div className="d-flex flex-column gap-4">
                  <a href="tel:+919876543210" className="d-flex align-items-center gap-3 text-sm text-text-secondary hover:text-primary text-decoration-none">
                    <Phone size={16} className="text-primary flex-shrink-0" />
                    +91 98765 43210
                  </a>
                  <a href="mailto:info@printorbit.in" className="d-flex align-items-center gap-3 text-sm text-text-secondary hover:text-primary text-decoration-none">
                    <Mail size={16} className="text-primary flex-shrink-0" />
                    info@printorbit.in
                  </a>
                  <div className="d-flex align-items-center gap-3 text-sm text-text-secondary">
                    <Clock size={16} className="text-primary flex-shrink-0" />
                    <div>
                      <p className="fw-medium text-dark">Support Hours</p>
                      <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offices */}
              <div className="bg-white rounded-3 p-6 border border-warm-100">
                <h3 className="fs-5 fw-bold text-dark mb-4">Our Offices</h3>
                <div className="d-flex flex-column gap-4">
                  {OFFICES.map((office) => (
                    <div key={office.city} className="pb-4 border-bottom border-warm-100 last:border-0 last:pb-0">
                      <h4 className="fw-semibold text-dark text-sm">{office.city}, {office.state}</h4>
                      <div className="d-flex flex-column gap-1 mt-2 text-xs text-muted">
                        <p className="d-flex align-items-center gap-2">
                          <MapPin size={12} className="flex-shrink-0" />
                          {office.address}
                        </p>
                        <p>{office.phone}</p>
                        <p>{office.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Call */}
              <div className="bg-primary rounded-3 p-6 text-white">
                <h3 className="fw-bold mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-white/80 mb-4">Call us directly for urgent inquiries.</p>
                <a
                  href="tel:+919876543210"
                  className="d-inline-flex align-items-center gap-2 text-sm fw-semibold text-white hover text-decoration-none"
                >
                  <Phone size={16} />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
