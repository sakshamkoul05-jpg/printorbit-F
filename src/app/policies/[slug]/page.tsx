import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { SUPPORT_EMAIL, SUPPORT_PHONE, REGISTERED_ADDRESS } from '@/lib/constants';

interface Policy {
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

const POLICIES: Record<string, Policy> = {
  returns: {
    title: 'Return & Refund Policy',
    intro:
      'Every order is produced to your approved digital proof. This policy sets out when a customised order can be returned, replaced or refunded.',
    sections: [
      {
        heading: 'Customised products',
        body: [
          'Because products are personalised to your artwork, they cannot be returned simply because you changed your mind after approving the proof.',
          'We print artwork exactly as supplied. We do not proofread submitted content, so please verify spelling, grammar and layout before approving.',
        ],
      },
      {
        heading: 'When we replace or refund',
        body: [
          'The delivered product does not match the approved digital proof.',
          'The product arrives damaged, defective or with a printing fault.',
          'The wrong item or wrong quantity was despatched.',
        ],
      },
      {
        heading: 'How to raise a claim',
        body: [
          `Write to ${SUPPORT_EMAIL} or call ${SUPPORT_PHONE} within 7 days of delivery, quoting your order number.`,
          'Attach photographs of the product and the packaging so we can assess the fault quickly.',
          'Approved claims are replaced free of charge, or refunded to the original payment method within 7–10 business days.',
        ],
      },
      {
        heading: 'Cancellations',
        body: [
          'An order can be cancelled at no cost any time before you approve the digital proof.',
          'Once production has started, cancellation is not possible as materials have already been committed.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    intro:
      'This policy explains what information PrintOrbit collects, why we collect it, and the choices you have.',
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'Account details you provide: name, business name, email address, phone number and delivery addresses.',
          'Order information: products ordered, artwork files you upload, and delivery preferences.',
          'Technical information: device, browser and usage data collected to keep the site secure and working.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'To produce, invoice and deliver your orders, and to provide customer support.',
          'To save your designs to your account so reorders need no re-uploading.',
          'To send order updates. Marketing email is sent only if you opt in, and you can unsubscribe at any time.',
        ],
      },
      {
        heading: 'Artwork and confidentiality',
        body: [
          'Artwork you upload is used only to fulfil your order and is not shared with third parties except the production and logistics partners handling that order.',
          'We operate to recognised information-security practices and restrict internal access to order data.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `You can request a copy, correction or deletion of your personal data by writing to ${SUPPORT_EMAIL}.`,
          'Deleting your account removes saved designs and addresses; invoices are retained where law requires.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    intro:
      'These terms govern your use of the PrintOrbit website and the orders you place through it.',
    sections: [
      {
        heading: 'Orders and pricing',
        body: [
          'Prices shown include applicable taxes and standard shipping unless stated otherwise on the product page.',
          'Quantity-tier pricing applies to the quantity actually ordered. Bulk pricing on multi-location orders applies to the consolidated volume.',
          'We may decline or cancel an order where artwork is unlawful, infringing, or technically unusable.',
        ],
      },
      {
        heading: 'Artwork and rights',
        body: [
          'You confirm you own, or are licensed to use, all logos, images and text you upload.',
          'You indemnify PrintOrbit against claims arising from artwork you supply.',
        ],
      },
      {
        heading: 'Delivery',
        body: [
          'Despatch timelines shown on each product are working-day estimates measured from proof approval, not from order placement.',
          'Delivery dates are estimates. We are not liable for delays caused by carriers or events outside our control.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          `PrintOrbit India Pvt. Ltd., ${REGISTERED_ADDRESS}.`,
          `Email ${SUPPORT_EMAIL} or call ${SUPPORT_PHONE}.`,
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) return { title: 'Not found | PrintOrbit' };
  return { title: `${policy.title} | PrintOrbit`, description: policy.intro };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) notFound();

  return (
    <div style={{ backgroundColor: '#F4F2EF', minHeight: '70vh' }}>
      <div className="bg-white border-bottom">
        <div className="container py-2">
          <nav className="d-flex align-items-center gap-1" style={{ fontSize: 12, color: '#6D6D6D' }}>
            <Link href="/" className="text-decoration-none" style={{ color: '#6D6D6D' }}>Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#0F0F0F', fontWeight: 600 }}>{policy.title}</span>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        <div className="mx-auto bg-white rounded-3 p-4 p-md-5" style={{ maxWidth: '52rem', border: '1px solid #E5E5E5' }}>
          <h1 className="fw-bold mb-3" style={{ fontSize: '1.75rem', color: '#0F0F0F' }}>
            {policy.title}
          </h1>
          <p style={{ color: '#505050', fontSize: '0.9375rem', lineHeight: 1.7 }}>{policy.intro}</p>

          {policy.sections.map((s) => (
            <section key={s.heading} className="mt-4">
              <h2 className="fw-bold mb-2" style={{ fontSize: '1.0625rem', color: '#0F0F0F' }}>
                {s.heading}
              </h2>
              <ul style={{ color: '#505050', fontSize: '0.9375rem', lineHeight: 1.8 }}>
                {s.body.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </section>
          ))}

          <p className="mt-4 mb-0" style={{ fontSize: 13, color: '#6D6D6D' }}>
            Questions about this policy? Write to{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: '#ED1C24' }}>{SUPPORT_EMAIL}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
