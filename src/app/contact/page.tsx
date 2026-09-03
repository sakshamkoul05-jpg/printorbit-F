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
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-dark py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Contact Us</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-warm-300 max-w-xl mx-auto text-sm leading-relaxed">
            Have a question or need a quote? Our team is here to help you with all your printing needs.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-background py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 md:p-8 border border-warm-100">
                <h2 className="text-xl font-bold text-dark mb-6">Send Us a Message</h2>
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-6 h-6 text-success" />
                    </div>
                    <h3 className="text-lg font-bold text-dark mb-2">Message Sent!</h3>
                    <p className="text-sm text-muted">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1.5">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="Your full name"
                          className="w-full px-3 py-2.5 border border-warm-200 rounded-md text-sm text-dark placeholder:text-muted-light bg-background focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1.5">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-3 py-2.5 border border-warm-200 rounded-md text-sm text-dark placeholder:text-muted-light bg-background focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2.5 border border-warm-200 rounded-md text-sm text-dark placeholder:text-muted-light bg-background focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1.5">Subject *</label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          placeholder="How can we help?"
                          className="w-full px-3 py-2.5 border border-warm-200 rounded-md text-sm text-dark placeholder:text-muted-light bg-background focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5">Message *</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={5}
                        placeholder="Tell us about your printing requirements..."
                        className="w-full px-3 py-2.5 border border-warm-200 rounded-md text-sm text-dark placeholder:text-muted-light bg-background focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                    <Button type="submit" variant="primary" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-lg p-6 border border-warm-100">
                <h3 className="text-lg font-bold text-dark mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-text-secondary hover:text-primary">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    +91 98765 43210
                  </a>
                  <a href="mailto:info@printstop.in" className="flex items-center gap-3 text-sm text-text-secondary hover:text-primary">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    info@printstop.in
                  </a>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-dark">Support Hours</p>
                      <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offices */}
              <div className="bg-white rounded-lg p-6 border border-warm-100">
                <h3 className="text-lg font-bold text-dark mb-4">Our Offices</h3>
                <div className="space-y-4">
                  {OFFICES.map((office) => (
                    <div key={office.city} className="pb-4 border-b border-warm-100 last:border-0 last:pb-0">
                      <h4 className="font-semibold text-dark text-sm">{office.city}, {office.state}</h4>
                      <div className="space-y-1 mt-1.5 text-xs text-muted">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
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
              <div className="bg-primary rounded-lg p-6 text-white">
                <h3 className="font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-white/80 mb-4">Call us directly for urgent inquiries.</p>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/90"
                >
                  <Phone className="w-4 h-4" />
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
