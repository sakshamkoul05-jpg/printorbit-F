import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  DEPARTMENTS,
  ALL_PRODUCTS,
  CATALOG_STATS,
  departmentImage,
} from '@/lib/catalog';
import ProductGridCard from '@/components/products/ProductGridCard';

export const metadata: Metadata = {
  title: 'All Products | Online Printing & Corporate Gifting | PrintOrbit',
  description:
    'Browse every PrintOrbit product across printing, branded merchandise and corporate gifting — from visiting cards to joining kits.',
};

export default function AllProductsPage() {
  const bestSellers = ALL_PRODUCTS.filter((p) => p.labels.includes('Best Seller')).slice(0, 12);

  return (
    <div style={{ backgroundColor: '#F4F2EF', minHeight: '70vh' }}>
      <div className="container py-4">
        <h1 className="fw-bold mb-2" style={{ fontSize: '1.75rem', color: '#0F0F0F' }}>
          All Products
        </h1>
        <p className="mb-4" style={{ color: '#505050', maxWidth: '68ch', fontSize: '0.9375rem' }}>
          {CATALOG_STATS.products} products across {CATALOG_STATS.categories} categories, with a
          minimum order quantity of just one on eligible products.
        </p>

        <div className="row g-3 mb-5">
          {DEPARTMENTS.map((dept) => (
            <div key={dept.slug} className="col-6 col-md-4 col-lg-3">
              <Link
                href={`/shop/${dept.slug}`}
                className="d-block h-100 text-decoration-none bg-white rounded-3 overflow-hidden clean-card"
              >
                <div className="position-relative img-zoom" style={{ aspectRatio: '4 / 3', backgroundColor: '#F4F2EF' }}>
                  <Image
                    src={departmentImage(dept, 480, 360)}
                    alt={dept.name}
                    fill
                    sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-3">
                  <h2 className="mb-1" style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0F0F0F' }}>
                    {dept.name}
                  </h2>
                  <div style={{ fontSize: 12, color: '#6D6D6D' }}>
                    {dept.categories.reduce((n, c) => n + c.products.length, 0)} products
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <h2 className="fw-bold mb-3" style={{ fontSize: '1.25rem', color: '#0F0F0F' }}>
          Best sellers
        </h2>
        <div className="row g-3">
          {bestSellers.map((p) => (
            <div key={p.slug} className="col-6 col-md-4 col-lg-3">
              <ProductGridCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
