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
    <section className="py-5 bg-slate-50">
      <Container>
        <SectionHeader
          badge="Testimonials"
          title="What Our Customers Say"
          description="Join thousands of satisfied businesses who trust PrintOrbit"
        />

        <div className="row g-4 mt-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              className="col-12 col-md-6 col-lg-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bg-white rounded-4 p-4 border border-light h-100">
                <Quote size={32} className="mb-3" style={{ color: 'rgba(var(--bs-primary-rgb), 0.2)' }} />
                <p className="text-muted mb-3" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="d-flex align-items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="text-accent" style={{ fill: 'var(--bs-accent)' }} />
                  ))}
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)' }}>
                    <span className="fs-5">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="fw-semibold font-heading text-dark mb-0" style={{ fontSize: '14px' }}>{testimonial.name}</p>
                    <p className="text-muted mb-0" style={{ fontSize: '12px' }}>{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
