import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { productImage, type CatalogProduct } from '@/lib/catalog';

const LABEL_COLOURS: Record<string, string> = {
  Popular: '#F75C46',
  'Best Seller': '#0EBA42',
  New: '#2E6BE6',
};

export default function ProductGridCard({ product }: { product: CatalogProduct }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="d-flex flex-column h-100 text-decoration-none bg-white rounded-3 overflow-hidden clean-card"
    >
      <div className="position-relative img-zoom" style={{ aspectRatio: '4 / 3', backgroundColor: '#F4F2EF' }}>
        <Image
          src={productImage(product, 480, 360)}
          alt={product.name}
          fill
          sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 25vw"
          style={{ objectFit: 'cover' }}
        />
        {product.labels.length > 0 && (
          <div className="position-absolute d-flex gap-1" style={{ top: 8, left: 8 }}>
            {product.labels.map((l) => (
              <span
                key={l}
                className="text-white rounded-pill px-2 py-1"
                style={{ fontSize: 10, fontWeight: 700, backgroundColor: LABEL_COLOURS[l] ?? '#2E2E2E' }}
              >
                {l}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 d-flex flex-column flex-grow-1">
        <span style={{ fontSize: 11, color: '#9A9287', letterSpacing: '0.04em' }}>{product.brand}</span>
        <h3
          className="mb-2 mt-1"
          style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F0F0F', lineHeight: 1.35 }}
        >
          {product.name}
        </h3>

        <div className="d-flex align-items-center gap-1 mb-2">
          <Star size={12} fill="#F5A623" stroke="#F5A623" />
          <span style={{ fontSize: 12, color: '#505050' }}>
            {product.rating.toFixed(1)} ({product.reviews})
          </span>
        </div>

        <div className="mt-auto">
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F0F0F' }}>
            ₹ {product.price.toLocaleString('en-IN')}.00
          </div>
          <div style={{ fontSize: 12, color: '#6D6D6D' }}>{product.unit}</div>
        </div>
      </div>
    </Link>
  );
}
