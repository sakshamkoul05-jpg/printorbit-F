import { Metadata } from 'next';
import { CheckCircle, Users, Award, Clock, MapPin } from 'lucide-react';
import { OFFICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us | PrintOrbit',
  description: 'Learn about PrintOrbit - your premium printing partner for businesses, industries, and organizations.',
};

const stats = [
  { label: 'Years Experience', value: '10+', icon: Clock },
  { label: 'Happy Clients', value: '5000+', icon: Users },
  { label: 'Products Delivered', value: '50000+', icon: Award },
  { label: 'Cities Served', value: '100+', icon: MapPin },
];

const values = [
  'Premium quality printing with latest German technology',
  'Competitive pricing for bulk orders without compromise',
  'Fast turnaround with guaranteed on-time delivery',
  'Dedicated account manager for every client',
  'Eco-friendly printing options available',
  'Free design assistance with every order',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 hero-pattern noise-overlay">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About PrintOrbit</h1>
          <p className="text-white-dim max-w-2xl mx-auto text-lg leading-relaxed">
            Your trusted premium printing partner for businesses, industries, and organizations across India.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="divider-gold mb-16" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="card-3d rounded-2xl p-6 text-center group">
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-3 group-hover:glow-gold transition-all" />
                <div className="text-3xl font-bold text-gradient-gold">{stat.value}</div>
                <div className="text-sm text-white-dim mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Who We Are</span>
              <h2 className="text-4xl font-bold text-white mb-8">Our Story</h2>
              <div className="space-y-5 text-white-muted leading-relaxed">
                <p>
                  PrintOrbit was founded with a singular vision: to redefine the printing industry
                  with uncompromising quality and luxury craftsmanship. What began as a boutique
                  print studio has evolved into India&apos;s trusted premium printing partner.
                </p>
                <p>
                  We serve elite clientele including Fortune 500 companies, prestigious educational
                  institutions, healthcare leaders, and distinguished NGOs. Our expertise spans
                  across all dimensions of premium print.
                </p>
                <p>
                  With offices in Dharamshala and Faridabad, we deliver excellence across India
                  with precision timing and white-glove service.
                </p>
              </div>
            </div>
            <div className="card-3d rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                Why Choose Us
              </h3>
              <ul className="space-y-4">
                {values.map((value, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white-muted">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24">
        <div className="divider-gold mb-24" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Locations</span>
            <h2 className="text-4xl font-bold text-white">Our Offices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {OFFICES.map((office) => (
              <div key={office.city} className="card-3d rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-2">{office.city}</h3>
                <p className="text-sm text-gold mb-4">{office.state}</p>
                <div className="space-y-2 text-sm text-white-dim">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold/50" />
                    {office.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-4 h-4 text-gold/50 flex items-center justify-center text-xs">📞</span>
                    {office.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-4 h-4 text-gold/50 flex items-center justify-center text-xs">✉</span>
                    {office.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
