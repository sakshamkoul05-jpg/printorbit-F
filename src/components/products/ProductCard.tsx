import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-printorbit-red/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square bg-printorbit-light relative overflow-hidden">
        {product.image_urls && product.image_urls[0] ? (
          <img
            src={product.image_urls[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl text-printorbit-gray/30">📦</span>
          </div>
        )}
        {product.customizable && (
          <span className="absolute top-2 left-2 bg-printorbit-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            CUSTOMIZABLE
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-printorbit-navy group-hover:text-printorbit-red transition-colors mb-1 line-clamp-1">
          {product.name}
        </h3>
        {product.short_description && (
          <p className="text-xs text-printorbit-gray mb-2 line-clamp-2">{product.short_description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-printorbit-red">{formatPrice(product.base_price)}</span>
          <span className="text-xs text-printorbit-gray">Min: {product.min_quantity} pcs</span>
        </div>
      </div>
    </Link>
  );
}
