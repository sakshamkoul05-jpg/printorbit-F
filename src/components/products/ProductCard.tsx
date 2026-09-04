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
      className="position-relative"
    >
      <Link href={`/products/${product.slug}`} className="d-block text-decoration-none">
        <div className="bg-white rounded-3 overflow-hidden" style={{ border: '1px solid #f1f5f9' }}>
          <div className="position-relative" style={{ aspectRatio: '4/3', background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)', overflow: 'hidden' }}>
            {product.image_urls?.[0] ? (
              <img
                src={product.image_urls[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 d-flex align-items-center justify-content-center rounded-3" style={{ width: '4rem', height: '4rem', backgroundColor: 'rgba(13,110,253,0.1)' }}>
                    <span style={{ fontSize: '1.5rem' }}>📦</span>
                  </div>
                  <p className="mb-0" style={{ fontSize: '0.75rem', color: '#6c757d' }}>{product.name}</p>
                </div>
              </div>
            )}

            <div className="position-absolute d-flex flex-column" style={{ top: '0.75rem', left: '0.75rem', gap: '0.375rem' }}>
              {product.customizable && (
                <span className="d-inline-block text-center" style={{ padding: '0.25rem 0.625rem', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'var(--bs-primary, #0d6efd)', color: 'var(--bs-white)', borderRadius: '9999px' }}>
                  Customizable
                </span>
              )}
              {product.template_available && (
                <span className="d-inline-block text-center" style={{ padding: '0.25rem 0.625rem', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#6f42c1', color: 'var(--bs-white)', borderRadius: '9999px' }}>
                  Templates
                </span>
              )}
            </div>

            <button
              onClick={handleWishlist}
              className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
              style={{
                top: '0.75rem',
                right: '0.75rem',
                width: '2rem',
                height: '2rem',
                backgroundColor: isWished ? 'var(--bs-red, #dc3545)' : 'rgba(255,255,255,0.9)',
                color: isWished ? 'var(--bs-white)' : '#94a3b8',
                transition: 'all 0.15s',
                border: 'none',
              }}
            >
              <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="position-absolute d-flex gap-2"
              style={{ bottom: '0.75rem', left: '0.75rem', right: '0.75rem' }}
            >
              <button
                onClick={handleAddToCart}
                className="flex-fill d-flex align-items-center justify-content-center gap-2"
                style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--bs-primary, #0d6efd)', color: 'var(--bs-white)', fontSize: '0.75rem', fontWeight: 600, borderRadius: '0.75rem', transition: 'background-color 0.15s', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: 'none' }}
              >
                <ShoppingCart size={14} />
                Add to Cart
              </button>
              <Link
                href={`/products/${product.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="d-flex align-items-center justify-content-center text-decoration-none"
                style={{ width: '2.25rem', height: '2.25rem', backgroundColor: 'var(--bs-white)', color: '#475569', borderRadius: '0.75rem', transition: 'background-color 0.15s', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              >
                <Eye size={16} />
              </Link>
            </motion.div>
          </div>

          <div className="p-3">
            <div className="d-flex align-items-center mb-1" style={{ gap: '0.25rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-warning" fill="#ffc107" />
              ))}
              <span style={{ fontSize: '10px', color: '#6c757d', marginLeft: '0.25rem' }}>(4.8)</span>
            </div>

            <h3 className="mb-1" style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.875rem', transition: 'color 0.15s', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {product.name}
            </h3>

            <p className="mb-2" style={{ fontSize: '0.75rem', color: '#6c757d', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {product.short_description || product.description}
            </p>

            <div className="d-flex align-items-end justify-content-between">
              <div>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--bs-primary, #0d6efd)' }}>{formatPrice(product.base_price)}</span>
                <span className="d-block" style={{ fontSize: '10px', color: '#6c757d' }}>
                  Min. {product.min_quantity} pcs
                </span>
              </div>
              <span className="d-inline-flex align-items-center" style={{ fontSize: '0.75rem', color: '#94a3b8', gap: '0.25rem', transition: 'color 0.15s' }}>
                View Details
                <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
