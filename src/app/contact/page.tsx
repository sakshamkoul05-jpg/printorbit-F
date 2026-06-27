'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import { OFFICES } from '@/lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 hero-pattern noise-overlay">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Get In Touch</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-white-dim max-w-2xl mx-auto text-lg">
            Have a question or need a premium quote? Connect with our team.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Subject *</label>
                    <input type="text" value={formData.subject} onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full px-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Message *</label>
                  <textarea value={formData.message} onChange={(e) => handleChange('message', e.target.value)} rows={5}
                    className="w-full px-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors resize-none" />
                </div>
                <Button variant="primary" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Office Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Our Offices</h2>
              <div className="space-y-5">
                {OFFICES.map((office) => (
                  <div key={office.city} className="card-3d rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">{office.city}, {office.state}</h3>
                    <div className="space-y-2 text-sm text-white-dim">
                      <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold/50" />{office.address}</p>
                      <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold/50" />{office.phone}</p>
                      <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold/50" />{office.email}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 card-3d rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-2">Need Immediate Help?</h3>
                  <p className="text-white-dim text-sm mb-4">Call us directly for urgent inquiries.</p>
                  <a href="tel:+919876543210" className="inline-flex items-center gap-2 btn-luxury px-5 py-2.5 rounded-xl text-sm font-semibold">
                    <Phone className="w-4 h-4" />
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
