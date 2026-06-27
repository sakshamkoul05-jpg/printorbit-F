'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Star, Shield, Truck, Clock, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

const floatingProducts = [
  { name: 'Business Cards', emoji: '💼', x: '10%', y: '20%', delay: 0, rotation: -5 },
  { name: 'Packaging', emoji: '📦', x: '75%', y: '15%', delay: 0.2, rotation: 8 },
  { name: 'Stickers', emoji: '🏷️', x: '85%', y: '55%', delay: 0.4, rotation: -12 },
  { name: 'Flyers', emoji: '📄', x: '5%', y: '65%', delay: 0.6, rotation: 15 },
  { name: 'Mugs', emoji: '☕', x: '70%', y: '75%', delay: 0.8, rotation: -8 },
  { name: 'T-Shirts', emoji: '👕', x: '15%', y: '85%', delay: 1.0, rotation: 10 },
];

const trustBadges = [
  { icon: Shield, text: 'Quality Guaranteed' },
  { icon: Truck, text: 'Free Delivery' },
  { icon: Clock, text: '3-5 Day Turnaround' },
];

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 20);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 20);
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient noise-overlay" />

      {/* Animated Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6"
            >
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-sm font-medium text-primary">Trusted by 5000+ businesses</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-dark leading-[1.1] mb-6"
            >
              Premium Printing{' '}
              <span className="gradient-text">That Makes</span>{' '}
              Your Brand Stand Out
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted mb-8 max-w-xl leading-relaxed"
            >
              From business cards to luxury packaging, we deliver exceptional quality
              with fast turnaround. India&apos;s most trusted printing platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link href="/products">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                  Explore Products
                </Button>
              </Link>
              <Link href="/quote/request">
                <Button variant="outline" size="lg">
                  Get Free Quote
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <badge.icon className="w-4 h-4 text-primary" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '🧑‍💼'].map((emoji, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-lg">
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted">4.9/5 from 2000+ reviews</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Floating Mockups */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[500px] hidden lg:block"
          >
            {floatingProducts.map((product, i) => (
              <motion.div
                key={product.name}
                className="absolute"
                style={{ left: product.x, top: product.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: product.delay,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                <motion.div
                  className="glass rounded-2xl p-4 shadow-xl cursor-pointer"
                  style={{
                    x: useSpring(useTransform(mouseX, [0, 1], [0, i % 2 === 0 ? 15 : -15])),
                    y: useSpring(useTransform(mouseY, [0, 1], [0, i % 2 === 0 ? 15 : -15])),
                  }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: product.rotation,
                  }}
                  transition={{
                    y: {
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <div className="text-4xl mb-2">{product.emoji}</div>
                  <p className="text-xs font-medium text-dark whitespace-nowrap">{product.name}</p>
                </motion.div>
              </motion.div>
            ))}

            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
