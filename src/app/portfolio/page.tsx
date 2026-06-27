import { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio | PrintOrbit',
  description: 'View our premium printing projects and case studies.',
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
      <section className="relative py-24 hero-pattern noise-overlay">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Work</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Portfolio</h1>
          <p className="text-white-dim max-w-2xl mx-auto text-lg">See our work across industries and product categories.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="card-3d rounded-2xl overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-gold/5 to-transparent flex items-center justify-center">
                  <span className="text-4xl opacity-10">📄</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-wider bg-gold/10 text-gold px-2.5 py-1 rounded-full font-medium">{project.industry}</span>
                    <span className="text-[10px] uppercase tracking-wider bg-white/5 text-white-dim px-2.5 py-1 rounded-full">{project.type}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300">{project.title}</h3>
                  <button className="flex items-center gap-1.5 text-sm text-white-dim hover:text-gold mt-3 transition-colors">
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
