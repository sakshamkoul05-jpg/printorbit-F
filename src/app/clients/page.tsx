import { Metadata } from 'next';
import { CheckCircle, Building2, Heart, GraduationCap, Stethoscope, ShoppingCart, Home, Car, Hotel, Landmark } from 'lucide-react';
import { CLIENT_INDUSTRIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Clients | PrintOrbit',
  description: 'Trusted by elite businesses and organizations across diverse industries.',
};

const industryIcons: Record<string, React.ElementType> = {
  'IT & Software': Building2, 'Manufacturing': Building2, 'Healthcare': Stethoscope,
  'Education': GraduationCap, 'Retail & E-commerce': ShoppingCart, 'Real Estate': Home,
  'Hospitality': Hotel, 'NGOs & Non-profits': Heart, 'Government': Landmark, 'Automotive': Car,
};

const testimonials = [
  { name: 'Rajesh Kumar', company: 'TechCorp Solutions', content: 'Exceptional quality and impeccable service. PrintOrbit has been our exclusive printing partner for over 3 years.' },
  { name: 'Priya Sharma', company: 'GreenEarth Foundation', content: 'They understood our vision perfectly and delivered campaign materials that exceeded our expectations.' },
  { name: 'Amit Patel', company: 'Hotel Grand', content: 'The premium stationery and branding materials they create are consistently outstanding. True craftsmanship.' },
];

export default function ClientsPage() {
  return (
    <>
      <section className="relative py-24 hero-pattern noise-overlay">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Trust</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Industries We Serve</h1>
          <p className="text-white-dim max-w-2xl mx-auto text-lg">Trusted by elite businesses across diverse sectors.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CLIENT_INDUSTRIES.map((industry) => {
              const Icon = industryIcons[industry] || Building2;
              return (
                <div key={industry} className="card-3d rounded-2xl p-6 text-center group">
                  <Icon className="w-8 h-8 text-gold/50 group-hover:text-gold mx-auto mb-3 transition-colors duration-300" />
                  <h3 className="font-semibold text-white text-sm group-hover:text-gold transition-colors">{industry}</h3>
                  <CheckCircle className="w-4 h-4 text-emerald/50 group-hover:text-emerald mx-auto mt-3 transition-colors" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="divider-gold mb-24" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Testimonials</span>
            <h2 className="text-4xl font-bold text-white">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-3d rounded-2xl p-8">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-white-muted mb-6 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                <div className="border-t border-gold/10 pt-4">
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gold mt-0.5">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
