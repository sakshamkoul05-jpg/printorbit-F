'use client';

import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const products = [
  { name: 'Premium Business Cards', price: '₹499', rating: 4.9, reviews: 234, badge: 'Best Seller', emoji: '💼' },
  { name: 'Custom Packaging Boxes', price: '₹1,299', rating: 4.8, reviews: 189, badge: 'Popular', emoji: '📦' },
  { name: 'Vinyl Sticker Sheets', price: '₹299', rating: 4.9, reviews: 567, badge: 'Trending', emoji: '🏷️' },
  { name: 'Corporate Brochures', price: '₹899', rating: 4.7, reviews: 123, badge: 'New', emoji: '📄' },
  { name: 'Branded T-Shirts', price: '₹399', rating: 4.8, reviews: 345, badge: 'Popular', emoji: '👕' },
  { name: 'Luxury Paper Bags', price: '₹599', rating: 4.9, reviews: 278, badge: 'Best Seller', emoji: '🛍️' },
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
                {/* Image */}
                <div className="position-relative" style={{ aspectRatio: '4/3', background: 'linear-gradient(to bottom right, rgba(var(--bs-primary-rgb), 0.05), rgba(var(--bs-accent-rgb), 0.05))' }}>
                  <div className="position-absolute inset-0 d-flex align-items-center justify-content-center">
                    <span className="display-6">{product.emoji}</span>
                  </div>
                  <Badge variant="accent" className="position-absolute" style={{ top: '16px', left: '16px' }}>
                    {product.badge}
                  </Badge>
                  <button className="position-absolute bg-white rounded-circle d-flex align-items-center justify-content-center border-0" style={{ top: '16px', right: '16px', width: '40px', height: '40px', opacity: 0.8, backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>
                    <Heart size={20} className="text-muted" />
                  </button>
                </div>

                {/* Content */}
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
