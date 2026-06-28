'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star, Eye, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWish, removeItem: removeWish, productIds } = useWishlistStore();
  const isWished = productIds.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      product_id: product.id,
      product_name: product.name,
      product_image: product.image_urls?.[0] || '/placeholder.jpg',
      quantity: product.min_quantity || 100,
      material: product.materials?.[0]?.name || 'Standard',
      size: product.sizes?.[0]?.name || 'Standard',
      finish: product.finishes?.[0]?.name || 'Matte',
      unit_price: product.base_price,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWished) {
      removeWish(product.id);
    } else {
      addWish(product.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover">
          {/* Image */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
            {product.image_urls?.[0] ? (
              <img
                src={product.image_urls[0]}
                alt={product.name}
                className="w-full h-full object-cover img-zoom"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">📦</span>
                  </div>
                  <p className="text-xs text-muted">{product.name}</p>
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.customizable && (
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-white rounded-full">
                  Customizable
                </span>
              )}
              {product.template_available && (
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent text-white rounded-full">
                  Templates
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isWished
                  ? 'bg-red text-white'
                  : 'bg-white/90 text-slate-400 hover:text-red hover:bg-white'
              }`}
            >
              <Heart className="w-4 h-4" fill={isWished ? 'currentColor' : 'none'} />
            </button>

            {/* Hover Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="absolute bottom-3 left-3 right-3 flex gap-2"
            >
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </button>
              <Link
                href={`/products/${product.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 flex items-center justify-center bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center gap-1 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-[10px] text-muted ml-1">(4.8)</span>
            </div>

            <h3 className="font-semibold text-dark text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs text-muted mb-3 line-clamp-1">
              {product.short_description || product.description}
            </p>

            <div className="flex items-end justify-between">
              <div>
                <span className="text-lg font-bold text-primary">{formatPrice(product.base_price)}</span>
                <span className="text-[10px] text-muted block">
                  Min. {product.min_quantity} pcs
                </span>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-primary transition-colors">
                View Details
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
