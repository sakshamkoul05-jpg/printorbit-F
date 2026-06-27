'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-navy/30 transition-colors group"
      >
        <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden">
          {product.image_urls && product.image_urls[0] ? (
            <img
              src={product.image_urls[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-2xl text-slate-200">📦</span>
            </div>
          )}
          {product.customizable && (
            <span className="absolute top-2 left-2 bg-navy text-white text-[10px] font-medium px-2 py-0.5 rounded">
              CUSTOMIZABLE
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-navy group-hover:text-navy-light transition-colors mb-1 line-clamp-1">
            {product.name}
          </h3>
          {product.short_description && (
            <p className="text-xs text-slate-500 mb-2 line-clamp-2">{product.short_description}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-navy">{formatPrice(product.base_price)}</span>
            <span className="text-xs text-slate-400">Min: {product.min_quantity} pcs</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
