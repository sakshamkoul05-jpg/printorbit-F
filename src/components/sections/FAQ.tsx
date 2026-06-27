'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const faqs = [
  { question: 'What is the minimum order quantity?', answer: 'Minimum order quantity varies by product. Business cards start at 50, banners at 1, and most other products at 25-50 pieces. Contact us for specific product minimums.' },
  { question: 'How long does printing take?', answer: 'Standard turnaround is 3-5 business days after design approval. Express delivery (1-2 days) is available for most products at an additional cost.' },
  { question: 'Do you offer design services?', answer: 'Yes! We offer free basic design assistance with every order. For complex designs, our design team can create custom artwork starting at ₹500.' },
  { question: 'What file formats do you accept?', answer: 'We accept PDF, AI, PSD, EPS, JPG, PNG, and TIFF files. For best results, we recommend high-resolution PDF files with fonts outlined.' },
  { question: 'Do you ship across India?', answer: 'Yes, we deliver to all major cities across India. Free delivery is available on orders above ₹5,000. Shipping charges apply for smaller orders.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services"
        />

        <div className="max-w-3xl mx-auto mt-12">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full bg-white rounded-xl p-5 text-left border border-slate-100 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold font-heading text-dark pr-4">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-muted mt-4 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
