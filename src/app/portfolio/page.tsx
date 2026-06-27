import { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio | PrintOrbit',
  description: 'View our completed printing projects and case studies.',
};

const projects = [
  { id: 1, title: 'TechCorp Annual Report', industry: 'IT & Software', type: 'Booklets', image: null },
  { id: 2, title: 'GreenEarth NGO Campaign', industry: 'NGOs', type: 'Banners & Posters', image: null },
  { id: 3, title: 'Hotel Grand Stationery', industry: 'Hospitality', type: 'Business Cards & Letterheads', image: null },
  { id: 4, title: 'MedCare Packaging', industry: 'Healthcare', type: 'Custom Packaging', image: null },
  { id: 5, title: 'EduLearn Merchandise', industry: 'Education', type: 'Clothing & Merchandise', image: null },
  { id: 6, title: 'RetailMax Labels', industry: 'Retail', type: 'Labels & Stickers', image: null },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-printorbit-navy text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            See our work across industries and product categories.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video bg-printorbit-light flex items-center justify-center">
                  <span className="text-3xl opacity-30">📄</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-printorbit-blue-light text-printorbit-blue px-2 py-0.5 rounded-full">{project.industry}</span>
                    <span className="text-xs bg-printorbit-red-light text-printorbit-red px-2 py-0.5 rounded-full">{project.type}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-printorbit-navy group-hover:text-printorbit-red transition-colors">{project.title}</h3>
                  <button className="flex items-center gap-1 text-sm text-printorbit-gray hover:text-printorbit-red mt-2 transition-colors">
                    View Details <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
