import { Metadata } from 'next';
import { MapPin, Award, Shield, Users, Clock, Building2, CheckCircle } from 'lucide-react';
import { OFFICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us | PrintStop',
  description: 'Learn about PrintStop - India\'s trusted printing partner for 19 years, serving 5000+ clients with ISO-certified quality.',
};

const stats = [
  { label: 'Years of Excellence', value: '19+', icon: Clock },
  { label: 'Happy Clients', value: '5,000+', icon: Users },
  { label: 'Products Delivered', value: '50,000+', icon: Award },
  { label: 'Cities Served', value: '100+', icon: MapPin },
];

const certifications = [
  { name: 'ISO 9001:2015', description: 'Quality Management System' },
  { name: 'ISO 27001:2022', description: 'Information Security Management' },
];

const clientIndustries = [
  'IT & Software', 'Manufacturing', 'Healthcare', 'Education',
  'Retail & E-commerce', 'Real Estate', 'Hospitality', 'NGOs',
  'Government', 'Automotive',
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-dark py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">About Us</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            India&apos;s Trusted Printing Partner Since 2007
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto text-sm leading-relaxed">
            PrintStop has been delivering high-quality corporate printing solutions to businesses,
            industries, and organizations across India for over 19 years.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark">{stat.value}</div>
                <div className="text-xs text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-background py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-5">Our Story</h2>
              <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>
                  Founded in 2007, PrintStop began with a simple mission: to provide businesses with
                  high-quality printing services at competitive prices. What started as a small print
                  shop has grown into one of India&apos;s most trusted full-service printing solutions providers.
                </p>
                <p>
                  Over the past 19 years, we have served over 5,000 clients across diverse industries
                  including IT companies, manufacturing firms, healthcare providers, educational
                  institutions, NGOs, and government organizations.
                </p>
                <p>
                  With our headquarters in Faridabad, Haryana and a branch in Dharamshala, Himachal
                  Pradesh, we serve clients across India with fast turnaround times and reliable delivery.
                  Our state-of-the-art printing infrastructure ensures consistent quality on every order.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-warm-100">
              <h3 className="text-lg font-bold text-dark mb-4">Why Choose PrintStop?</h3>
              <ul className="space-y-3">
                {[
                  'Premium quality printing with latest technology',
                  'Competitive pricing for bulk and corporate orders',
                  'Fast turnaround with guaranteed delivery timelines',
                  'Dedicated account manager for every client',
                  'Eco-friendly printing options available',
                  'Free design assistance and proofing',
                  'ISO 9001:2015 and ISO 27001:2022 certified',
                ].map((value, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-warm-100 rounded-lg">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">Our Mission</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                To empower businesses with high-quality, affordable printing solutions that strengthen
                their brand identity. We are committed to delivering excellence through innovation,
                reliability, and exceptional customer service.
              </p>
            </div>
            <div className="p-6 border border-warm-100 rounded-lg">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">Our Vision</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                To be India&apos;s most trusted and preferred printing partner for businesses of all sizes.
                We envision a future where every organization has access to world-class printing
                services with seamless ordering and delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-background py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-dark text-center mb-8">Certifications</h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert.name} className="bg-white rounded-lg p-6 border border-warm-100 text-center flex-1 min-w-[200px]">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-dark text-sm">{cert.name}</h4>
                <p className="text-xs text-muted mt-1">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Industries */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-dark text-center mb-3">Industries We Serve</h2>
          <p className="text-sm text-muted text-center mb-8 max-w-xl mx-auto">
            Trusted by leading organizations across diverse sectors
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {clientIndustries.map((industry) => (
              <span key={industry} className="px-4 py-2 bg-background border border-warm-100 rounded-md text-sm text-text-secondary font-medium">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-background py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-dark text-center mb-3">Our Offices</h2>
          <p className="text-sm text-muted text-center mb-8">Visit us at any of our locations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {OFFICES.map((office) => (
              <div key={office.city} className="bg-white rounded-lg p-6 border border-warm-100">
                <h3 className="text-lg font-bold text-dark mb-1">{office.city}</h3>
                <p className="text-xs text-primary font-medium mb-3">{office.state}</p>
                <div className="space-y-2 text-sm text-text-secondary">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted flex-shrink-0" />
                    {office.address}
                  </p>
                  <p>{office.phone}</p>
                  <p>{office.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
