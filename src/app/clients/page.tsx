import { Metadata } from 'next';
import { CheckCircle, Building2, Heart, GraduationCap, Stethoscope, ShoppingCart, Home, Car, Hotel, Landmark } from 'lucide-react';
import { CLIENT_INDUSTRIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Clients | PrintOrbit',
  description: 'Trusted by businesses and organizations across diverse industries.',
};

const industryIcons: Record<string, React.ElementType> = {
  'IT & Software': Building2,
  'Manufacturing': Building2,
  'Healthcare': Stethoscope,
  'Education': GraduationCap,
  'Retail & E-commerce': ShoppingCart,
  'Real Estate': Home,
  'Hospitality': Hotel,
  'NGOs & Non-profits': Heart,
  'Government': Landmark,
  'Automotive': Car,
};

const testimonials = [
  { name: 'Rajesh Kumar', company: 'TechCorp Solutions', content: 'Excellent quality and fast delivery. PrintOrbit has been our go-to printing partner for 3 years.' },
  { name: 'Priya Sharma', company: 'GreenEarth Foundation', content: 'They understood our NGO budget constraints and delivered amazing campaign materials at affordable prices.' },
  { name: 'Amit Patel', company: 'Hotel Grand', content: 'Professional stationery and branding materials. The quality is consistently outstanding.' },
];

export default function ClientsPage() {
  return (
    <>
      <section className="bg-printorbit-navy text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Industries We Serve</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Trusted by businesses and organizations across diverse sectors.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CLIENT_INDUSTRIES.map((industry) => {
              const Icon = industryIcons[industry] || Building2;
              return (
                <div key={industry} className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-printorbit-red/30 hover:shadow-lg transition-all">
                  <Icon className="w-8 h-8 text-printorbit-red mx-auto mb-3" />
                  <h3 className="font-semibold text-printorbit-navy text-sm">{industry}</h3>
                  <CheckCircle className="w-4 h-4 text-green-500 mx-auto mt-2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-printorbit-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-printorbit-navy text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-printorbit-slate mb-4">&ldquo;{t.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-printorbit-navy text-sm">{t.name}</p>
                  <p className="text-xs text-printorbit-gray">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
