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
      className="card-3d rounded-2xl overflow-hidden group shimmer"
    >
      <div className="aspect-square bg-black-light relative overflow-hidden">
        {product.image_urls && product.image_urls[0] ? (
          <img
            src={product.image_urls[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/5 to-transparent">
            <span className="text-4xl opacity-20">📦</span>
          </div>
        )}
        {product.customizable && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-gold to-gold-dark text-black text-[10px] font-bold px-2.5 py-1 rounded-full">
            CUSTOMIZABLE
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-sm font-semibold text-white group-hover:text-gold transition-colors duration-300 mb-1.5 line-clamp-1">
          {product.name}
        </h3>
        {product.short_description && (
          <p className="text-xs text-white-dim mb-3 line-clamp-2 leading-relaxed">{product.short_description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gradient-gold">{formatPrice(product.base_price)}</span>
          <span className="text-xs text-white-dim">Min: {product.min_quantity} pcs</span>
        </div>
      </div>
    </Link>
  );
}
