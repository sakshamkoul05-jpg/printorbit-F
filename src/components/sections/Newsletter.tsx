'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-4 bg-slate-50 border-top border-light">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto text-center"
          style={{ maxWidth: '640px' }}
        >
          <h3 className="fs-4 fw-bold font-heading text-dark mb-2">Stay Updated</h3>
          <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
            Get printing tips, exclusive offers, and industry insights delivered to your inbox.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="d-flex align-items-center justify-content-center gap-2 text-success"
            >
              <CheckCircle size={20} />
              <span className="fw-medium">Thank you for subscribing!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="d-flex gap-3 mx-auto" style={{ maxWidth: '448px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-fill px-3 py-2 rounded-4 border border-light form-control"
                style={{ fontSize: '14px' }}
                required
              />
              <Button type="submit" variant="primary" icon={<Send size={16} />}>
                Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
