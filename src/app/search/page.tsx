import type { Metadata } from 'next';
import Link from 'next/link';
import { Search as SearchIcon } from 'lucide-react';
import { searchProducts, DEPARTMENTS } from '@/lib/catalog';
import ProductGridCard from '@/components/products/ProductGridCard';
import { POPULAR_SEARCHES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Search | PrintOrbit',
  description: 'Search customised printing, merchandise and corporate gifting products.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const results = searchProducts(q, 60);

  return (
    <div style={{ backgroundColor: '#F4F2EF', minHeight: '70vh' }}>
      <div className="container py-4">
        <h1 className="fw-bold mb-1" style={{ fontSize: '1.5rem', color: '#0F0F0F' }}>
          {q ? `Results for “${q}”` : 'Search products'}
        </h1>
        {q && (
          <p style={{ color: '#6D6D6D', fontSize: 14 }}>
            {results.length} {results.length === 1 ? 'product' : 'products'} found
          </p>
        )}

        {!q && (
          <div className="bg-white rounded-3 p-4 mt-3" style={{ border: '1px solid #E5E5E5' }}>
            <div className="d-flex align-items-center gap-2 mb-3" style={{ color: '#6D6D6D' }}>
              <SearchIcon size={18} />
              <span style={{ fontSize: 14 }}>Start typing in the search bar, or try a popular search:</span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="btn btn-sm text-decoration-none"
                  style={{ border: '1px solid #E0DED9', fontSize: 13, color: '#2E2E2E' }}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        )}

        {q && results.length === 0 && (
          <div className="bg-white rounded-3 p-5 text-center mt-3" style={{ border: '1px solid #E5E5E5' }}>
            <p style={{ color: '#505050' }}>
              Nothing matched “{q}”. Try a broader term, or browse a department below.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
              {DEPARTMENTS.slice(0, 8).map((d) => (
                <Link
                  key={d.slug}
                  href={`/shop/${d.slug}`}
                  className="btn btn-sm text-decoration-none"
                  style={{ border: '1px solid #E0DED9', fontSize: 13, color: '#2E2E2E' }}
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="row g-3 mt-1">
            {results.map((p) => (
              <div key={p.slug} className="col-6 col-md-4 col-lg-3">
                <ProductGridCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
