'use client';

import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const products = [
  { name: 'Premium Business Cards', price: '₹499', rating: 4.9, reviews: 234, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', alt: 'Premium watches' },
  { name: 'Custom Packaging Boxes', price: '₹1,299', rating: 4.8, reviews: 189, badge: 'Popular', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop', alt: 'Polaroid camera' },
  { name: 'Vinyl Sticker Sheets', price: '₹299', rating: 4.9, reviews: 567, badge: 'Trending', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop', alt: 'Sunglasses' },
  { name: 'Corporate Brochures', price: '₹899', rating: 4.7, reviews: 123, badge: 'New', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop', alt: 'Perfume' },
  { name: 'Branded T-Shirts', price: '₹399', rating: 4.8, reviews: 345, badge: 'Popular', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop', alt: 'Sneakers' },
  { name: 'Luxury Paper Bags', price: '₹599', rating: 4.9, reviews: 278, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', alt: 'Bag' },
];

export default function FeaturedProducts() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <SectionHeader
          badge="Featured"
          title="Featured Products"
          description="Handpicked products loved by our customers"
        />

        <div className="row g-4 mt-3">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              className="col-12 col-sm-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bg-white rounded-4 border border-light overflow-hidden">
                <div className="position-relative" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    unoptimized
                    style={{ objectFit: 'cover' }}
                  />
                  <Badge variant="accent" className="position-absolute" style={{ top: '16px', left: '16px', zIndex: 1 }}>
                    {product.badge}
                  </Badge>
                  <button className="position-absolute bg-white rounded-circle d-flex align-items-center justify-content-center border-0" style={{ top: '16px', right: '16px', width: '40px', height: '40px', opacity: 0.8, backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', zIndex: 1 }}>
                    <Heart size={20} className="text-muted" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="d-flex align-items-center gap-1">
                      <Star size={16} className="text-accent" style={{ fill: 'var(--bs-accent)' }} />
                      <span className="fw-semibold text-dark">{product.rating}</span>
                    </div>
                    <span className="text-muted">({product.reviews})</span>
                  </div>
                  <h3 className="fw-semibold font-heading text-dark mb-3">
                    {product.name}
                  </h3>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span className="fs-5 fw-bold text-primary">{product.price}</span>
                      <span className="text-muted ms-1" style={{ fontSize: '12px' }}>/ 50 pcs</span>
                    </div>
                    <Button variant="primary" size="sm" icon={<ShoppingCart size={16} />}>
                      Add to Quote
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-4"
        >
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
