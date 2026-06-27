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
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          badge="Featured"
          title="Featured Products"
          description="Handpicked products loved by our customers"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-400">
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{product.emoji}</span>
                  </div>
                  <Badge variant="accent" className="absolute top-4 left-4">
                    {product.badge}
                  </Badge>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="text-sm font-semibold text-dark">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted">({product.reviews})</span>
                  </div>
                  <h3 className="font-semibold font-heading text-dark mb-3 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      <span className="text-xs text-muted ml-1">/ 50 pcs</span>
                    </div>
                    <Button variant="primary" size="sm" icon={<ShoppingCart className="w-4 h-4" />}>
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
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
