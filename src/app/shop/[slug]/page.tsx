import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  DEPARTMENTS,
  getDepartment,
  categoryImage,
  categoryFrom,
} from '@/lib/catalog';
import ProductGridCard from '@/components/products/ProductGridCard';

export function generateStaticParams() {
  return DEPARTMENTS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) return { title: 'Not found | PrintOrbit' };
  return {
    title: `${dept.name} | Customised Printing & Corporate Gifting | PrintOrbit`,
    description: dept.description,
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) notFound();

  // A small "most loved" strip: the labelled products across the department.
  const featured = dept.categories
    .flatMap((c) => c.products)
    .filter((p) => p.labels.length > 0)
    .slice(0, 8);

  return (
    <div style={{ backgroundColor: '#F4F2EF', minHeight: '70vh' }}>
      <div className="bg-white border-bottom">
        <div className="container py-2">
          <nav className="d-flex align-items-center gap-1" style={{ fontSize: 12, color: '#6D6D6D' }}>
            <Link href="/" className="text-decoration-none" style={{ color: '#6D6D6D' }}>Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#0F0F0F', fontWeight: 600 }}>{dept.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        <h1 className="fw-bold mb-2" style={{ fontSize: '1.75rem', color: '#0F0F0F' }}>
          {dept.name}
        </h1>
        <p className="mb-4" style={{ color: '#505050', maxWidth: '68ch', fontSize: '0.9375rem' }}>
          {dept.description}
        </p>

        {/* categories */}
        <div className="row g-3 mb-5">
          {dept.categories.map((cat) => (
            <div key={cat.slug} className="col-6 col-md-4 col-lg-3">
              <Link
                href={`/category/${cat.slug}`}
                className="d-block h-100 text-decoration-none bg-white rounded-3 overflow-hidden clean-card"
              >
                <div className="position-relative img-zoom" style={{ aspectRatio: '4 / 3', backgroundColor: '#F4F2EF' }}>
                  <Image
                    src={categoryImage(cat, 480, 360)}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-3">
                  <h2 className="mb-1" style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0F0F0F' }}>
                    {cat.name}
                  </h2>
                  <div style={{ fontSize: 12, color: '#6D6D6D' }}>
                    {cat.products.length} products · from ₹{categoryFrom(cat).toLocaleString('en-IN')}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {featured.length > 0 && (
          <>
            <h2 className="fw-bold mb-3" style={{ fontSize: '1.25rem', color: '#0F0F0F' }}>
              Most loved in {dept.name}
            </h2>
            <div className="row g-3">
              {featured.map((p) => (
                <div key={p.slug} className="col-6 col-md-4 col-lg-3">
                  <ProductGridCard product={p} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
