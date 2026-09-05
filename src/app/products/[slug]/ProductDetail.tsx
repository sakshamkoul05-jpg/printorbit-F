'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight, Star, Truck, Upload, Palette, Mail, Plus, Minus, Check,
} from 'lucide-react';
import ProductGridCard from '@/components/products/ProductGridCard';
import { productGallery, type CatalogProduct, type Department } from '@/lib/catalog';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '@/lib/constants';
import { useCartStore } from '@/store/cart';

const FAQS = [
  {
    q: 'Do I need to order a minimum quantity?',
    a: 'No. Eligible products can be ordered from a single unit, so you can run a sample before committing to a bulk order.',
  },
  {
    q: 'Can I preview my design before placing the order?',
    a: 'Yes. Every order includes a digital proof for approval before production begins, so your brand colours and artwork print exactly as specified.',
  },
  {
    q: 'What file formats can I upload?',
    a: 'PDF, AI, PSD, PNG and JPG at 300 DPI. Keep 3 mm of bleed on all sides and text within the safe area.',
  },
  {
    q: 'Can I reorder the same design later?',
    a: 'Yes. Your designs and artwork are saved to your account, so a reorder needs no re-uploading or re-briefing.',
  },
  {
    q: 'Do you deliver to multiple locations?',
    a: 'Yes. Place one consolidated order and tell us how to split it — you get bulk pricing on the full volume with a single invoice.',
  },
];

const REVIEW_SAMPLES = [
  { name: 'Asmita Dixit', company: 'Skyline Industries Pvt. Ltd', stars: 5, text: 'Very fast and satisfactory service. The proof came through the same day and the finish was exactly as approved.' },
  { name: 'Raj Thulasidoss', company: 'eProdCast Software Pvt Ltd', stars: 4, text: 'Prompt response and great support throughout. Would like more logo colour options per product in the self-serve portal.' },
  { name: 'Yathin Kanchan', company: 'Independent', stars: 5, text: 'Liked that they confirm the design with us before printing, and it reached on time. Quality of print and paper is really good.' },
  { name: 'Meher Modi', company: 'Modi Industrial', stars: 5, text: 'Reproduction accuracy for repeat orders is unmatched. Uploading artwork is a breeze and the team corrects inconsistencies.' },
];

export default function ProductDetail({
  product,
  department,
  categoryName,
  related,
}: {
  product: CatalogProduct;
  department?: Department;
  categoryName: string;
  related: CatalogProduct[];
}) {
  const gallery = useMemo(() => productGallery(product, 900, 900), [product]);
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [tierIndex, setTierIndex] = useState(0);
  const [showAllTiers, setShowAllTiers] = useState(false);
  const [choices, setChoices] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.optionGroups.map((g) => [g.label, g.options[0].name])),
  );
  const [tab, setTab] = useState<'description' | 'templates'>('description');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const tier = product.tiers[tierIndex];
  const optionsDelta = product.optionGroups.reduce((sum, g) => {
    const chosen = g.options.find((o) => o.name === choices[g.label]);
    return sum + (chosen?.delta ?? 0);
  }, 0);
  const total = tier.price + optionsDelta;

  const visibleTiers = showAllTiers ? product.tiers : product.tiers.slice(0, 3);

  const pieces = (n: number) =>
    `${n.toLocaleString('en-IN')} ${n === 1 ? 'Piece' : 'Pieces'}`;

  const savingFor = (i: number) => {
    if (i === 0) return null;
    const baseUnit = product.tiers[0].price / product.tiers[0].qty;
    const thisUnit = product.tiers[i].price / product.tiers[i].qty;
    const pct = Math.round((1 - thisUnit / baseUnit) * 100);
    return pct > 0 ? pct : null;
  };

  const handleAdd = () => {
    // The cart models a single "material / size / finish" triple, so map the
    // first two option groups onto material and finish.
    const [materialGroup, finishGroup] = product.optionGroups;
    addItem({
      product_id: product.slug,
      product_name: product.name,
      product_image: gallery[0],
      quantity: tier.qty,
      material: materialGroup ? choices[materialGroup.label] : 'Standard',
      size,
      finish: finishGroup ? choices[finishGroup.label] : 'Standard',
      unit_price: total / tier.qty,
      customization_notes: product.optionGroups
        .map((g) => `${g.label}: ${choices[g.label]}`)
        .join(', '),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div style={{ backgroundColor: '#F4F2EF' }}>
      {/* breadcrumb */}
      <div className="bg-white border-bottom">
        <div className="container py-2">
          <nav className="d-flex align-items-center flex-wrap gap-1" style={{ fontSize: 12, color: '#6D6D6D' }}>
            <Link href="/" className="text-decoration-none" style={{ color: '#6D6D6D' }}>Home</Link>
            <ChevronRight size={12} />
            {department && (
              <>
                <Link href={`/shop/${department.slug}`} className="text-decoration-none" style={{ color: '#6D6D6D' }}>{department.name}</Link>
                <ChevronRight size={12} />
              </>
            )}
            <Link href={`/category/${product.category}`} className="text-decoration-none" style={{ color: '#6D6D6D' }}>{categoryName}</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#0F0F0F', fontWeight: 600 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          {/* ---- gallery ------------------------------------------------- */}
          <div className="col-lg-5">
            <div className="bg-white rounded-3 p-3" style={{ border: '1px solid #E5E5E5' }}>
              <div className="position-relative rounded-3 overflow-hidden" style={{ aspectRatio: '1 / 1', backgroundColor: '#F4F2EF' }}>
                <Image
                  src={gallery[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 992px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="d-flex gap-2 mt-3">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImage(i)}
                    className="position-relative rounded-2 overflow-hidden border-0 p-0"
                    style={{
                      width: 64, height: 64, flexShrink: 0,
                      outline: activeImage === i ? '2px solid #ED1C24' : '1px solid #E5E5E5',
                    }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image src={src} alt="" fill sizes="64px" style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* highlights */}
            <div className="bg-white rounded-3 p-3 mt-3" style={{ border: '1px solid #E5E5E5' }}>
              <ul className="list-unstyled mb-0">
                {product.highlights.map((h) => (
                  <li key={h} className="d-flex gap-2 mb-2" style={{ fontSize: 13, color: '#505050' }}>
                    <Check size={15} style={{ color: '#0EBA42', flexShrink: 0, marginTop: 2 }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- configurator -------------------------------------------- */}
          <div className="col-lg-4">
            <div style={{ fontSize: 12, color: '#9A9287' }}>Brand: {product.brand}</div>
            <h1 className="fw-bold mt-1 mb-2" style={{ fontSize: '1.5rem', color: '#0F0F0F' }}>
              {product.name}
            </h1>

            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="d-flex align-items-center gap-1">
                <Star size={14} fill="#F5A623" stroke="#F5A623" />
                <strong style={{ fontSize: 14 }}>{product.rating.toFixed(1)}</strong>
              </span>
              <span style={{ fontSize: 13, color: '#6D6D6D' }}>({product.reviews} Reviews)</span>
            </div>

            <div className="d-flex flex-wrap gap-4 pb-3 mb-3 border-bottom">
              <div>
                <div style={{ fontSize: 12, color: '#6D6D6D' }}>Starts at</div>
                <div className="fw-bold" style={{ fontSize: '1.25rem', color: '#0F0F0F' }}>
                  ₹ {product.price.toLocaleString('en-IN')}.00
                </div>
                <div style={{ fontSize: 12, color: '#6D6D6D' }}>{product.unit}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#6D6D6D' }}>Ships out in</div>
                <div className="fw-semibold d-flex align-items-center gap-1" style={{ fontSize: '0.9375rem', color: '#0F0F0F' }}>
                  <Truck size={15} />
                  {product.shipsInDays} Days
                </div>
                <div style={{ fontSize: 12, color: '#6D6D6D' }}>(Mon to Sat)</div>
              </div>
            </div>

            <h2 className="fw-bold mb-1" style={{ fontSize: '1rem', color: '#0F0F0F' }}>
              Customise this product
            </h2>
            <p style={{ fontSize: 13, color: '#6D6D6D' }}>
              Select from a range of options to personalise your product
            </p>

            {/* size */}
            <div className="mb-3">
              <div className="mb-2" style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Size:</div>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="btn btn-sm"
                    style={{
                      fontSize: 12,
                      border: `1px solid ${size === s ? '#ED1C24' : '#E0DED9'}`,
                      backgroundColor: size === s ? '#FEF2F2' : '#fff',
                      color: size === s ? '#ED1C24' : '#2E2E2E',
                      fontWeight: size === s ? 600 : 400,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* quantity tiers */}
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Quantity:</span>
                <button
                  className="btn btn-sm p-0 border-0 d-flex align-items-center gap-1"
                  style={{ fontSize: 12, color: '#ED1C24' }}
                  onClick={() => setShowAllTiers((v) => !v)}
                >
                  {showAllTiers ? <Minus size={12} /> : <Plus size={12} />}
                  {showAllTiers ? 'Fewer Quantities' : 'View Pricing Table'}
                </button>
              </div>
              <div className="d-flex flex-column gap-2">
                {visibleTiers.map((t, i) => {
                  const saving = savingFor(i);
                  const selected = tierIndex === i;
                  return (
                    <button
                      key={t.qty}
                      onClick={() => setTierIndex(i)}
                      className="btn d-flex align-items-center justify-content-between text-start"
                      style={{
                        border: `1px solid ${selected ? '#ED1C24' : '#E0DED9'}`,
                        backgroundColor: selected ? '#FEF2F2' : '#fff',
                        padding: '8px 12px',
                      }}
                    >
                      <span style={{ fontSize: 13, color: '#2E2E2E' }}>{pieces(t.qty)}</span>
                      <span className="d-flex align-items-center gap-2">
                        {saving && (
                          <span className="rounded-pill px-2" style={{ fontSize: 10, fontWeight: 700, backgroundColor: '#E7F8EC', color: '#0EBA42' }}>
                            Save {saving}%
                          </span>
                        )}
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0F0F0F' }}>
                          ₹ {t.price.toLocaleString('en-IN')}.00
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* option groups */}
            {product.optionGroups.map((group) => (
              <div className="mb-3" key={group.label}>
                <div className="mb-2" style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>{group.label}:</div>
                <div className="d-flex flex-wrap gap-2">
                  {group.options.map((o) => {
                    const selected = choices[group.label] === o.name;
                    return (
                      <button
                        key={o.name}
                        onClick={() => setChoices((c) => ({ ...c, [group.label]: o.name }))}
                        className="btn btn-sm d-flex flex-column align-items-start"
                        style={{
                          fontSize: 12,
                          border: `1px solid ${selected ? '#ED1C24' : '#E0DED9'}`,
                          backgroundColor: selected ? '#FEF2F2' : '#fff',
                          color: selected ? '#ED1C24' : '#2E2E2E',
                          minWidth: 92,
                        }}
                      >
                        <span style={{ fontWeight: selected ? 600 : 400 }}>{o.name}</span>
                        <span style={{ fontSize: 11, color: '#6D6D6D' }}>
                          {o.delta === 0 ? '₹ 0.00' : `+ ₹ ${o.delta}.00`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <p style={{ fontSize: 12, color: '#6D6D6D' }}>
              Need more customisation options? Email{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: '#ED1C24' }}>{SUPPORT_EMAIL}</a>{' '}
              or call <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`} style={{ color: '#ED1C24' }}>{SUPPORT_PHONE}</a>
            </p>
          </div>

          {/* ---- order summary ------------------------------------------- */}
          <div className="col-lg-3">
            <div className="bg-white rounded-3 p-3 position-sticky" style={{ border: '1px solid #E5E5E5', top: 90 }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0" style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F0F0F' }}>
                  Order Summary
                </h2>
                <Link href="/quote/request" className="d-flex align-items-center gap-1 text-decoration-none" style={{ fontSize: 12, color: '#ED1C24' }}>
                  <Mail size={12} /> Email Quote
                </Link>
              </div>

              <SummaryRow label="Size" value={size} price="-" />
              <SummaryRow label="Quantity" value={pieces(tier.qty)} price={`₹ ${tier.price.toLocaleString('en-IN')}.00`} />
              {product.optionGroups.map((g) => {
                const chosen = g.options.find((o) => o.name === choices[g.label]);
                return (
                  <SummaryRow
                    key={g.label}
                    label={g.label}
                    value={choices[g.label]}
                    price={`₹ ${(chosen?.delta ?? 0).toLocaleString('en-IN')}.00`}
                  />
                );
              })}

              <div className="border-top pt-3 mt-2">
                <div className="d-flex align-items-baseline justify-content-between">
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F0F0F' }}>Total Price</div>
                    <div style={{ fontSize: 11, color: '#6D6D6D' }}>Including shipping and taxes</div>
                  </div>
                  <div className="fw-bold" style={{ fontSize: '1.25rem', color: '#0F0F0F' }}>
                    ₹ {total.toLocaleString('en-IN')}.00
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2 mt-3">
                <Link
                  href={`/design-studio?product=${product.slug}`}
                  className="btn d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: '#ED1C24', color: '#fff', fontWeight: 600, fontSize: 14 }}
                >
                  <Palette size={16} /> Personalise this product
                </Link>
                <Link
                  href={`/design-studio?product=${product.slug}&upload=1`}
                  className="btn d-flex align-items-center justify-content-center gap-2"
                  style={{ border: '1px solid #E0DED9', color: '#2E2E2E', fontWeight: 500, fontSize: 14 }}
                >
                  <Upload size={16} /> Upload your own design
                </Link>
                <button
                  onClick={handleAdd}
                  className="btn"
                  style={{ backgroundColor: added ? '#0EBA42' : '#0F0F0F', color: '#fff', fontWeight: 600, fontSize: 14 }}
                >
                  {added ? 'Added to cart' : 'Customise & Buy'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ---- tabs ------------------------------------------------------ */}
        <div className="bg-white rounded-3 mt-4" style={{ border: '1px solid #E5E5E5' }}>
          <div className="d-flex border-bottom">
            {(['description', 'templates'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="btn border-0 rounded-0"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '14px 20px',
                  color: tab === t ? '#ED1C24' : '#6D6D6D',
                  borderBottom: `2px solid ${tab === t ? '#ED1C24' : 'transparent'}`,
                }}
              >
                {t === 'description' ? 'DESCRIPTION' : 'FILE SETUP TEMPLATES'}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === 'description' ? (
              <>
                <h2 className="fw-bold mb-3" style={{ fontSize: '1.125rem', color: '#0F0F0F' }}>
                  {product.name}: built for business printing
                </h2>
                <p style={{ color: '#505050', fontSize: '0.9375rem', lineHeight: 1.7 }}>{product.description}</p>
                <p className="mb-0" style={{ color: '#6D6D6D', fontSize: 13, lineHeight: 1.7 }}>
                  Note: we do not provide proofreading for submitted content. Artwork is printed exactly as
                  supplied, so please review spelling, grammar and design elements before uploading your final file.
                </p>
              </>
            ) : (
              <>
                <h2 className="fw-bold mb-3" style={{ fontSize: '1.125rem', color: '#0F0F0F' }}>
                  File setup templates
                </h2>
                <ul style={{ color: '#505050', fontSize: '0.9375rem', lineHeight: 1.9 }}>
                  <li>Artwork at 300 DPI in CMYK colour mode.</li>
                  <li>Keep 3 mm bleed on all sides and 5 mm safe margin for text.</li>
                  <li>Convert all fonts to outlines before exporting.</li>
                  <li>Accepted formats: PDF, AI, PSD, PNG, JPG.</li>
                  <li>For {size.toLowerCase()} orders, supply one file per print side.</li>
                </ul>
                <Link href="/utilities" className="text-decoration-none" style={{ color: '#ED1C24', fontWeight: 600, fontSize: 14 }}>
                  Open the print utilities (bleed, DPI and size calculators) →
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ---- FAQs ------------------------------------------------------ */}
        <div className="bg-white rounded-3 mt-4 p-4" style={{ border: '1px solid #E5E5E5' }}>
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
            <div>
              <h2 className="fw-bold mb-1" style={{ fontSize: '1.125rem', color: '#0F0F0F' }}>FAQs</h2>
              <p className="mb-0" style={{ fontSize: 13, color: '#6D6D6D' }}>
                Need more help or have other questions about the product?
              </p>
            </div>
            <Link href="/contact" className="btn btn-sm" style={{ border: '1px solid #E0DED9', fontSize: 13 }}>
              Contact Support
            </Link>
          </div>

          {FAQS.map((f, i) => (
            <div key={f.q} className="border-top">
              <button
                className="btn w-100 text-start border-0 d-flex align-items-center justify-content-between py-3"
                style={{ fontSize: 14, fontWeight: 600, color: '#0F0F0F' }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {f.q}
                {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {openFaq === i && (
                <p className="pb-3 mb-0" style={{ fontSize: 14, color: '#505050', lineHeight: 1.7 }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>

        {/* ---- reviews --------------------------------------------------- */}
        <div className="bg-white rounded-3 mt-4 p-4" style={{ border: '1px solid #E5E5E5' }}>
          <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
            <div className="d-flex align-items-baseline gap-2">
              <span className="fw-bold" style={{ fontSize: '2rem', color: '#0F0F0F' }}>{product.rating.toFixed(1)}</span>
              <span style={{ fontSize: 14, color: '#6D6D6D' }}>Product Review</span>
            </div>
            <span style={{ fontSize: 13, color: '#6D6D6D' }}>({product.reviews} Reviews)</span>
          </div>

          <div className="row g-3">
            {REVIEW_SAMPLES.map((r) => (
              <div key={r.name} className="col-md-6">
                <div className="h-100 rounded-3 p-3" style={{ backgroundColor: '#F9F8F6' }}>
                  <div className="d-flex gap-1 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill={i < r.stars ? '#F5A623' : 'none'}
                        stroke={i < r.stars ? '#F5A623' : '#C9C4BC'}
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: 14, color: '#2E2E2E', lineHeight: 1.6 }}>{r.text}</p>
                  <div style={{ fontSize: 12, color: '#6D6D6D' }}>
                    <strong style={{ color: '#0F0F0F' }}>{r.name}</strong> · {r.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- related --------------------------------------------------- */}
        {related.length > 0 && (
          <div className="mt-5">
            <h2 className="fw-bold mb-3" style={{ fontSize: '1.25rem', color: '#0F0F0F' }}>
              You might also like
            </h2>
            <div className="row g-3">
              {related.map((p) => (
                <div key={p.slug} className="col-6 col-md-3">
                  <ProductGridCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, price }: { label: string; value: string; price: string }) {
  return (
    <div className="d-flex align-items-start justify-content-between py-2 border-bottom">
      <div>
        <div style={{ fontSize: 11, color: '#9A9287' }}>{label}</div>
        <div style={{ fontSize: 13, color: '#2E2E2E' }}>{value}</div>
      </div>
      <div style={{ fontSize: 13, color: '#505050', whiteSpace: 'nowrap' }}>{price}</div>
    </div>
  );
}
