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
      <section className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Have a question or need a quote? Connect with our team.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-bold text-navy mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Subject *</label>
                    <input type="text" value={formData.subject} onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Message *</label>
                  <textarea value={formData.message} onChange={(e) => handleChange('message', e.target.value)} rows={5}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors resize-none" />
                </div>
                <Button variant="primary" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Office Info */}
            <div>
              <h2 className="text-xl font-bold text-navy mb-6">Our Offices</h2>
              <div className="space-y-4">
                {OFFICES.map((office) => (
                  <div key={office.city} className="bg-white rounded-lg p-5 border border-slate-200">
                    <h3 className="text-lg font-bold text-navy mb-2">{office.city}, {office.state}</h3>
                    <div className="space-y-1.5 text-sm text-slate-500">
                      <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" />{office.address}</p>
                      <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" />{office.phone}</p>
                      <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" />{office.email}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-slate-50 rounded-lg p-5 border border-slate-100">
                <h3 className="text-lg font-bold text-navy mb-2">Need Immediate Help?</h3>
                <p className="text-slate-500 text-sm mb-4">Call us directly for urgent inquiries.</p>
                <a href="tel:+919876543210" className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-navy-light transition-colors">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
