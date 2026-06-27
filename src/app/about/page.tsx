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
      <section className="bg-printorbit-navy text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About PrintOrbit</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Your trusted printing partner for businesses, industries, and organizations across India.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-printorbit-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-printorbit-red mx-auto mb-2" />
                <div className="text-3xl font-bold text-printorbit-navy">{stat.value}</div>
                <div className="text-sm text-printorbit-gray">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-printorbit-navy mb-6">Our Story</h2>
              <div className="space-y-4 text-printorbit-slate">
                <p>
                  PrintOrbit was founded with a simple mission: to provide high-quality printing services
                  to businesses and organizations at competitive prices. What started as a small print shop
                  has grown into a full-service printing solutions provider.
                </p>
                <p>
                  We serve a wide range of clients including IT companies, manufacturing firms, healthcare
                  providers, educational institutions, NGOs, and government organizations. Our expertise
                  spans across all types of printing needs, from business cards to large-format banners.
                </p>
                <p>
                  With offices in Dharamshala (Himachal Pradesh) and Faridabad (Haryana), we serve clients
                  across India with fast turnaround times and reliable delivery.
                </p>
              </div>
            </div>
            <div className="bg-printorbit-light rounded-2xl p-8">
              <h3 className="text-xl font-bold text-printorbit-navy mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                {values.map((value, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-printorbit-red flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-printorbit-slate">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-16 bg-printorbit-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-printorbit-navy text-center mb-12">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {OFFICES.map((office) => (
              <div key={office.city} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-printorbit-navy mb-2">{office.city}</h3>
                <p className="text-sm text-printorbit-gray mb-1">{office.state}</p>
                <p className="text-sm text-printorbit-slate mb-3">{office.address}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-printorbit-slate">Phone: {office.phone}</p>
                  <p className="text-printorbit-slate">Email: {office.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
