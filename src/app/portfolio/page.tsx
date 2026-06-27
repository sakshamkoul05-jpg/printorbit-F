import { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio | PrintOrbit',
  description: 'View our printing projects and case studies.',
};

const projects = [
  { id: 1, title: 'TechCorp Annual Report', industry: 'IT & Software', type: 'Booklets' },
  { id: 2, title: 'GreenEarth NGO Campaign', industry: 'NGOs', type: 'Banners & Posters' },
  { id: 3, title: 'Hotel Grand Stationery', industry: 'Hospitality', type: 'Business Cards' },
  { id: 4, title: 'MedCare Packaging', industry: 'Healthcare', type: 'Custom Packaging' },
  { id: 5, title: 'EduLearn Merchandise', industry: 'Education', type: 'Clothing & Merch' },
  { id: 6, title: 'RetailMax Labels', industry: 'Retail', type: 'Labels & Stickers' },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Portfolio</h1>
          <p className="text-white/50 max-w-xl mx-auto">See our work across industries and product categories.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden group hover:border-navy/30 transition-colors">
                <div className="aspect-video bg-slate-50 flex items-center justify-center">
                  <span className="text-3xl text-slate-200">📄</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{project.industry}</span>
                    <span className="text-[10px] uppercase tracking-wider bg-slate-50 text-slate-400 px-2 py-0.5 rounded">{project.type}</span>
                  </div>
                  <h3 className="text-sm font-bold text-navy group-hover:text-navy-light transition-colors">{project.title}</h3>
                  <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-navy mt-2 transition-colors">
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
