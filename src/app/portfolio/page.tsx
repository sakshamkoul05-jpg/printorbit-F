import { Metadata } from 'next';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { img, pick } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Portfolio | PrintOrbit',
  description: 'View our printing projects and case studies.',
};

const projects = [
  { id: 1, title: 'TechCorp Annual Report', industry: 'IT & Software', type: 'Booklets', image: img(pick('booklets', 0), 600, 380) },
  { id: 2, title: 'GreenEarth NGO Campaign', industry: 'NGOs', type: 'Banners & Posters', image: img(pick('signages', 0), 600, 380) },
  { id: 3, title: 'Hotel Grand Stationery', industry: 'Hospitality', type: 'Business Cards', image: img(pick('visiting-cards', 1), 600, 380) },
  { id: 4, title: 'MedCare Packaging', industry: 'Healthcare', type: 'Custom Packaging', image: img(pick('gift-boxes', 0), 600, 380) },
  { id: 5, title: 'EduLearn Merchandise', industry: 'Education', type: 'Clothing & Merch', image: img(pick('round-neck-t-shirts', 0), 600, 380) },
  { id: 6, title: 'RetailMax Labels', industry: 'Retail', type: 'Labels & Stickers', image: img(pick('labels', 0), 600, 380) },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="display-5 fw-bold text-white mb-3">Our Portfolio</h1>
          <p className="text-white/50 mx-auto" style={{ maxWidth: '36rem' }}>See our work across industries and product categories.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="row g-4">
            {projects.map((project) => (
              <div key={project.id} className="col-12 col-sm-6 col-lg-4">
                <div className="bg-white rounded-3 border border-slate-200 overflow-hidden group transition-colors h-100">
                  <div className="position-relative img-zoom" style={{ aspectRatio: '16 / 10', background: '#F4F2EF' }}>
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.type}`}
                      fill
                      sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-5">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded fw-medium">{project.industry}</span>
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="bg-slate-50 text-slate-400 px-2 py-0.5 rounded">{project.type}</span>
                    </div>
                    <h3 className="text-sm fw-bold text-navy">{project.title}</h3>
                    <button className="d-flex align-items-center gap-1 text-xs text-slate-500 hover:text-navy mt-2 transition-colors">
                      View Details <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
