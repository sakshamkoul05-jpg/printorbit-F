'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import { OFFICES } from '@/lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-printorbit-navy text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Have a question or need a quote? Get in touch with our team.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-printorbit-navy mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-printorbit-navy mb-1">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-printorbit-navy mb-1">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-printorbit-navy mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-printorbit-navy mb-1">Subject *</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-printorbit-navy mb-1">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-printorbit-red/20 focus:border-printorbit-red"
                  />
                </div>
                <Button variant="primary" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Office Info */}
            <div>
              <h2 className="text-2xl font-bold text-printorbit-navy mb-6">Our Offices</h2>
              <div className="space-y-6">
                {OFFICES.map((office) => (
                  <div key={office.city} className="bg-printorbit-light rounded-xl p-6">
                    <h3 className="text-lg font-bold text-printorbit-navy mb-3">
                      {office.city}, {office.state}
                    </h3>
                    <div className="space-y-2 text-sm text-printorbit-slate">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-printorbit-red" />
                        {office.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-printorbit-red" />
                        {office.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-printorbit-red" />
                        {office.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-printorbit-red text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-white/90 text-sm mb-4">
                  Call us directly for urgent inquiries or bulk order discussions.
                </p>
                <a href="tel:+919876543210" className="inline-flex items-center gap-2 bg-white text-printorbit-red px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
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
