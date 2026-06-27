import { Metadata } from 'next';
import { CheckCircle, Building2, Heart, GraduationCap, Stethoscope, ShoppingCart, Home, Car, Hotel, Landmark } from 'lucide-react';
import { CLIENT_INDUSTRIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Clients | PrintOrbit',
  description: 'Trusted by businesses and organizations across diverse industries.',
};

const industryIcons: Record<string, React.ElementType> = {
  'IT & Software': Building2, 'Manufacturing': Building2, 'Healthcare': Stethoscope,
  'Education': GraduationCap, 'Retail & E-commerce': ShoppingCart, 'Real Estate': Home,
  'Hospitality': Hotel, 'NGOs & Non-profits': Heart, 'Government': Landmark, 'Automotive': Car,
};

const testimonials = [
  { name: 'Rajesh Kumar', company: 'TechCorp Solutions', content: 'Exceptional quality and great service. PrintOrbit has been our printing partner for over 3 years.' },
  { name: 'Priya Sharma', company: 'GreenEarth Foundation', content: 'They understood our vision perfectly and delivered campaign materials that exceeded expectations.' },
  { name: 'Amit Patel', company: 'Hotel Grand', content: 'The stationery and branding materials they create are consistently outstanding.' },
];

export default function ClientsPage() {
  return (
    <>
      <section className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Industries We Serve</h1>
          <p className="text-white/50 max-w-xl mx-auto">Trusted by businesses across diverse sectors.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CLIENT_INDUSTRIES.map((industry) => {
              const Icon = industryIcons[industry] || Building2;
              return (
                <div key={industry} className="bg-white rounded-lg border border-slate-200 p-5 text-center group hover:border-navy/30 transition-colors">
                  <Icon className="w-7 h-7 text-slate-300 group-hover:text-navy mx-auto mb-2 transition-colors" />
                  <h3 className="font-semibold text-navy text-sm">{industry}</h3>
                  <CheckCircle className="w-4 h-4 text-slate-300 mx-auto mt-2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-navy">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                <div className="border-t border-slate-100 pt-3">
                  <p className="font-semibold text-navy text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
