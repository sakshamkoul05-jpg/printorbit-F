import Link from 'next/link';
import { ArrowRight, CreditCard, Image, FileText, Tag, Package, Shirt, Camera, PenTool, CheckCircle, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import { PRODUCT_CATEGORIES, HOW_IT_WORKS, CLIENT_INDUSTRIES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  CreditCard,
  Image,
  FileText,
  Tag,
  Package,
  Shirt,
  Camera,
  PenTool,
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-printorbit-navy via-printorbit-blue-dark to-printorbit-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Printing Solutions for{' '}
              <span className="text-printorbit-red">Businesses</span> &{' '}
              <span className="text-printorbit-red">Organizations</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              From business cards to large-format banners, we deliver premium quality printing
              with fast turnaround. Serving industries, NGOs, and organizations across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button variant="primary" size="lg">
                  Explore Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/quote/request">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-printorbit-navy">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-printorbit-red/10 -skew-x-12 transform origin-top-right hidden lg:block" />
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-printorbit-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-printorbit-navy mb-4">How It Works</h2>
            <p className="text-printorbit-gray max-w-2xl mx-auto">
              Getting your printing job done is simple. Follow these 4 easy steps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-printorbit-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-printorbit-navy mb-2">{item.title}</h3>
                <p className="text-sm text-printorbit-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-printorbit-navy mb-4">Our Products</h2>
            <p className="text-printorbit-gray max-w-2xl mx-auto">
              Wide range of printing products for every business need.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon] || FileText;
              return (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="group p-6 bg-white rounded-xl border border-gray-100 hover:border-printorbit-red/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-printorbit-red/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-printorbit-red/20 transition-colors">
                    <Icon className="w-6 h-6 text-printorbit-red" />
                  </div>
                  <h3 className="text-lg font-semibold text-printorbit-navy mb-2 group-hover:text-printorbit-red transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-printorbit-gray">{cat.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clients Industries */}
      <section className="py-16 md:py-20 bg-printorbit-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trusted by businesses and organizations across diverse sectors.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CLIENT_INDUSTRIES.map((industry) => (
              <div
                key={industry}
                className="bg-white/10 rounded-lg p-4 text-center hover:bg-printorbit-red/20 transition-colors cursor-default"
              >
                <CheckCircle className="w-5 h-5 text-printorbit-red mx-auto mb-2" />
                <span className="text-sm">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-printorbit-red to-printorbit-red-dark rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Get a free quote for your printing requirements. We offer competitive prices
              with premium quality and fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote/request">
                <Button variant="secondary" size="lg" className="bg-white text-printorbit-red hover:bg-gray-100">
                  Request Free Quote
                </Button>
              </Link>
              <a href="tel:+919876543210">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-printorbit-red">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
