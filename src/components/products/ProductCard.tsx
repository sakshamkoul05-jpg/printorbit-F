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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="card-3d rounded-2xl overflow-hidden group shimmer block"
      >
        <div className="aspect-square bg-black-light relative overflow-hidden">
          {product.image_urls && product.image_urls[0] ? (
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
              src={product.image_urls[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/5 to-transparent">
              <span className="text-4xl opacity-20">📦</span>
            </div>
          )}
          {product.customizable && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-3 left-3 bg-gradient-to-r from-gold to-gold-dark text-black text-[10px] font-bold px-2.5 py-1 rounded-full"
            >
              CUSTOMIZABLE
            </motion.span>
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
    </motion.div>
  );
}
