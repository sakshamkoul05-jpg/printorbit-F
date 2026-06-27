import { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ | PrintOrbit',
  description: 'Frequently asked questions about PrintOrbit printing services.',
};

const faqs = [
  {
    question: 'What is the minimum order quantity?',
    answer: 'Minimum order quantity varies by product. Business cards start at 50, banners at 1, and most other products at 25-50 pieces. Contact us for specific product minimums.',
  },
  {
    question: 'How long does printing take?',
    answer: 'Standard turnaround is 3-5 business days after design approval. Express delivery (1-2 days) is available for most products at an additional cost.',
  },
  {
    question: 'Do you offer design services?',
    answer: 'Yes! We offer free basic design assistance with every order. For complex designs, our design team can create custom artwork starting at ₹500.',
  },
  {
    question: 'What file formats do you accept?',
    answer: 'We accept PDF, AI, PSD, EPS, JPG, PNG, and TIFF files. For best results, we recommend high-resolution PDF files with fonts outlined.',
  },
  {
    question: 'Do you ship across India?',
    answer: 'Yes, we deliver to all major cities across India. Free delivery is available on orders above ₹5,000. Shipping charges apply for smaller orders.',
  },
  {
    question: 'Can I get a sample before bulk ordering?',
    answer: 'Yes, we offer digital proofs and physical samples for bulk orders (500+ pieces). Sample charges are refunded when you place the full order.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI, net banking, credit/debit cards, and bank transfers. For bulk orders, we offer credit terms to approved businesses.',
  },
  {
    question: 'Do you offer discounts for bulk orders?',
    answer: 'Yes! We offer tiered pricing with increasing discounts for larger quantities. Contact us for a custom quote on your bulk requirements.',
  },
  {
    question: 'What is your return policy?',
    answer: 'If there are any printing defects or errors on our part, we will reprint the order at no additional cost. Custom-printed items cannot be returned unless there is a manufacturing defect.',
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes, once your order is dispatched, you will receive a tracking number via email and SMS. You can also track your order from your account dashboard.',
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-printorbit-navy text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Find answers to common questions about our printing services.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-100 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-printorbit-navy pr-4">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-printorbit-gray group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-printorbit-slate">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
