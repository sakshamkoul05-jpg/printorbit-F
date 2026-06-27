'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    company: 'TechCorp Solutions',
    content: 'Exceptional quality and impeccable service. PrintOrbit has been our exclusive printing partner for over 3 years.',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    name: 'Priya Sharma',
    company: 'GreenEarth Foundation',
    content: 'They understood our vision perfectly and delivered campaign materials that exceeded our expectations.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'Amit Patel',
    company: 'Hotel Grand',
    content: 'The premium stationery and branding materials they create are consistently outstanding. True craftsmanship.',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    name: 'Neha Gupta',
    company: 'FashionHub',
    content: 'Fast turnaround, amazing quality, and great prices. Highly recommend for any business printing needs.',
    rating: 5,
    avatar: '👩‍🎨',
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <SectionHeader
          badge="Testimonials"
          title="What Our Customers Say"
          description="Join thousands of satisfied businesses who trust PrintOrbit"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-400"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold font-heading text-dark text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
