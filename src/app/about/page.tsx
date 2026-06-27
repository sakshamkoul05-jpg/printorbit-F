import { Metadata } from 'next';
import { CheckCircle, Users, Award, Clock, MapPin } from 'lucide-react';
import { OFFICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us | PrintOrbit',
  description: 'Learn about PrintOrbit - your trusted printing partner for businesses, industries, and organizations.',
};

const stats = [
  { label: 'Years Experience', value: '10+', icon: Clock },
  { label: 'Happy Clients', value: '5000+', icon: Users },
  { label: 'Products Delivered', value: '50000+', icon: Award },
  { label: 'Cities Served', value: '100+', icon: MapPin },
];

const values = [
  'Premium quality printing with latest technology',
  'Competitive pricing for bulk orders',
  'Fast turnaround with guaranteed delivery',
  'Dedicated customer support',
  'Eco-friendly printing options',
  'Free design assistance',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">About PrintOrbit</h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Your trusted printing partner for businesses, industries, and organizations across India.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-navy mx-auto mb-2" />
                <div className="text-2xl font-bold text-navy">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-5">Our Story</h2>
              <div className="space-y-3 text-slate-500 text-sm">
                <p>
                  PrintOrbit was founded with a simple mission: to provide high-quality printing services
                  to businesses and organizations at competitive prices. What started as a small print shop
                  has grown into a full-service printing solutions provider.
                </p>
                <p>
                  We serve a wide range of clients including IT companies, manufacturing firms, healthcare
                  providers, educational institutions, NGOs, and government organizations.
                </p>
                <p>
                  With offices in Dharamshala (Himachal Pradesh) and Faridabad (Haryana), we serve clients
                  across India with fast turnaround times and reliable delivery.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-navy mb-4">Why Choose Us?</h3>
              <ul className="space-y-2.5">
                {values.map((value, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-navy flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-navy text-center mb-8">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {OFFICES.map((office) => (
              <div key={office.city} className="bg-white rounded-lg p-5 border border-slate-200">
                <h3 className="text-lg font-bold text-navy mb-1">{office.city}</h3>
                <p className="text-sm text-navy-light mb-3">{office.state}</p>
                <div className="space-y-1.5 text-sm text-slate-500">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
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
    </>
  );
}
