'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star, ChevronRight, ChevronDown, ChevronUp, Minus, Plus,
  Phone, Share2,
  Package, Shield, Truck, Clock, Award, ThumbsUp, Check,
  ShoppingCart, Upload, FileText, ArrowRight,
} from 'lucide-react';

const Facebook = ({ className = "w-5 h-5" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const Twitter = ({ className = "w-5 h-5" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Instagram = ({ className = "w-5 h-5" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const Linkedin = ({ className = "w-5 h-5" }: { className?: string }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
import { getProductBySlug, getAllProducts, type Product } from '@/lib/constants';
import { useCart } from '@/contexts/CartContext';

const categoryImageMap: Record<string, string> = {
  'Business Cards': 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&h=600&fit=crop',
  'Marketing': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&h=600&fit=crop',
  'Apparel': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
  'Gifts & Mugs': 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop',
  'Labels & Stickers': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
  'Packaging': 'https://images.unsplash.com/photo-1604147706283-d7119b3b860c?w=600&h=600&fit=crop',
  'Signs & Displays': 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&h=600&fit=crop',
  'Stationery': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop',
  'default': 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&h=600&fit=crop',
};

const reviews = [
  { name: 'Priya S.', rating: 5, date: '2 weeks ago', product: 'Standard Business Cards', title: 'Excellent quality!', content: 'The cards came out perfect. The matte finish feels premium and the print quality is sharp. Will definitely order again.', helpful: 24, verified: true },
  { name: 'Rahul M.', rating: 5, date: '1 month ago', product: 'Standard Business Cards', title: 'Fast delivery', content: 'Ordered 500 cards, received them in 3 days. Great quality for the price. The team was very helpful with the design.', helpful: 18, verified: true },
  { name: 'Anjali P.', rating: 4, date: '3 weeks ago', product: 'Standard Business Cards', title: 'Good but minor issue', content: 'Overall great cards. One minor alignment issue on a few cards but customer service resolved it quickly.', helpful: 12, verified: false },
];

const faqs = [
  { q: 'Is there any additional cost for customisation?', a: 'No, there is no additional cost for basic customisation. You can upload your design or use our free design tool at no extra charge. Premium design services may incur additional fees.' },
  { q: 'How can I buy in bulk?', a: 'Simply select your desired quantity and click "Select Options". Our system automatically applies volume discounts. For orders above 10,000 pieces, contact our sales team for custom pricing.' },
  { q: 'What if I need to modify my order?', a: 'You can modify your order before it enters production. Once the order is confirmed and production has begun, modifications may not be possible. Contact our support team immediately for any changes.' },
  { q: 'Is there a minimum order quantity?', a: 'Minimum order quantity varies by product. Most products start at 100 pieces for business cards and 20 pieces for apparel. Check the product page for specific minimums.' },
  { q: 'Can I get a sample before ordering?', a: 'Yes! You can request a physical sample before placing a bulk order. Click the "Request Sample" button on the product page. Sample charges may apply and are refunded on bulk orders.' },
];

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState('');
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'bulk' | 'reviews' | 'faq'>('overview');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPaperType, setSelectedPaperType] = useState('');
  const [selectedPrintArea, setSelectedPrintArea] = useState('');
  const [selectedPrintType, setSelectedPrintType] = useState('');
  const [selectedLamination, setSelectedLamination] = useState('');
  const [selectedCorner, setSelectedCorner] = useState('');

  const { addToCart, items } = useCart();

  useEffect(() => {
    params.then(p => {
      setSlug(p.slug);
      const found = getProductBySlug(p.slug);
      setProduct(found);
      if (found) {
        setSelectedSize(found.sizes[0]?.name || '');
        setSelectedPaperType(found.paperTypes[0] || '');
        setSelectedPrintArea(found.printAreas[0] || '');
        setSelectedPrintType(found.printTypes[0] || '');
        setSelectedLamination(found.laminationTypes[0] || '');
        setSelectedCorner(found.cornerTypes[0] || '');
      }
    });
  }, [params]);

  const allProducts = useMemo(() => getAllProducts(), []);

  const relatedProducts = useMemo(() => {
    if (!product) return allProducts.slice(0, 4);
    return allProducts.filter(p => p.slug !== product.slug).slice(0, 4);
  }, [product, allProducts]);

  const recentlyViewed = useMemo(() => {
    if (!product) return allProducts.slice(4, 8);
    return allProducts.filter(p => p.slug !== product.slug).slice(0, 4);
  }, [product, allProducts]);

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const sizeMod = product.sizes.find(s => s.name === selectedSize)?.price_modifier || 0;
    return product.basePrice + sizeMod;
  }, [product, selectedSize]);

  const totalPrice = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      product_id: product.slug,
      product_name: product.name,
      product_image: product.image || '',
      quantity,
      material: selectedPaperType || selectedSize,
      size: selectedSize,
      finish: selectedLamination || selectedPrintType,
      unit_price: unitPrice,
    });
  };

  if (!product) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="text-center">
          <Package size={64} className="mx-auto mb-4" style={{ color: '#999' }} />
          <h1 className="fs-2 fw-bold mb-2" style={{ color: '#0F0F0F' }}>Product Not Found</h1>
          <p className="mb-6" style={{ color: '#666' }}>The product you are looking for does not exist.</p>
          <Link href="/products" className="d-inline-block px-6 py-3 rounded-pill fw-semibold text-white text-decoration-none" style={{ backgroundColor: '#ED1C24' }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = categoryImageMap[product.category] || categoryImageMap['default'];
  const images = [imageUrl, imageUrl, imageUrl, imageUrl, imageUrl];

  return (
    <div style={{ backgroundColor: '#F4F2EF', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <nav className="d-flex align-items-center gap-2 text-xs" style={{ color: '#666' }}>
            <Link href="/" className="text-decoration-underline" style={{ color: '#ED1C24' }}>Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="text-decoration-underline" style={{ color: '#ED1C24' }}>{product.category}</Link>
            <ChevronRight size={12} />
            <Link href={`/products?category=${product.subcategory}`} className="text-decoration-underline" style={{ color: '#ED1C24' }}>{product.subcategory}</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#0F0F0F', fontWeight: 600 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="row g-4">
          {/* LEFT COLUMN - Image Gallery (60%) */}
          <div className="col-12 col-lg-7">
            <div className="bg-white rounded-3 p-4">
              {/* Desktop: Thumbnail strip on left, main image on right */}
              <div className="d-flex gap-4">
                {/* Thumbnail strip - vertical on desktop */}
                <div className="d-none d-md-flex flex-column gap-2" style={{ width: '5rem', flexShrink: 0 }}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIdx(i)}
                      className="rounded overflow-hidden border-2 flex-shrink-0 position-relative"
                      style={{ width: '5rem', height: '5rem', borderColor: selectedImageIdx === i ? '#ED1C24' : '#e5e5e5' }}
                    >
                      <Image src={img} alt={`${product.name} thumbnail ${i + 1}`} fill unoptimized style={{ objectFit: 'cover', opacity: selectedImageIdx === i ? 1 : 0.7 }} />
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="flex-fill rounded-3 overflow-hidden position-relative" style={{ aspectRatio: '1/1' }}>
                  <Image src={images[selectedImageIdx]} alt={product.name} fill unoptimized style={{ objectFit: 'cover' }} />
                </div>
              </div>

              {/* Mobile: Thumbnail strip on bottom */}
              <div className="d-flex d-md-none gap-2 mt-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIdx(i)}
                    className="rounded overflow-hidden border-2 flex-shrink-0 position-relative"
                    style={{ width: '4rem', height: '4rem', borderColor: selectedImageIdx === i ? '#ED1C24' : '#e5e5e5' }}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${i + 1}`} fill unoptimized style={{ objectFit: 'cover', opacity: selectedImageIdx === i ? 1 : 0.7 }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Product Configurator (40%) */}
          <div className="col-12 col-lg-5">
            <div className="bg-white rounded-3 p-6">
              {/* Brand */}
              <p className="text-xs fw-semibold text-uppercase mb-1" style={{ color: '#999', letterSpacing: '0.1em' }}>
                {product.brand}
              </p>

              {/* Product Title */}
              <h1 className="fs-3 fw-bold mb-3" style={{ color: '#0F0F0F' }}>
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-3">
                <p className="text-xs mb-1" style={{ color: '#666' }}>MRP Starting from</p>
                <div className="d-flex align-items-baseline gap-2">
                  <span className="fs-5" style={{ color: '#999', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
                  <span className="fs-2 fw-bold" style={{ color: '#ED1C24' }}>₹{product.basePrice}</span>
                </div>
              </div>

              {/* Get best price */}
              <button className="text-xs fw-semibold text-decoration-underline mb-3 border-0 bg-transparent p-0" style={{ color: '#ED1C24' }}>
                Get best price for bulk orders
              </button>

              {/* Rating */}
              <div className="d-flex align-items-center gap-2 mb-4 pb-4" style={{ borderBottom: '1px solid #eee' }}>
                <div className="d-flex align-items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} style={{ color: i < Math.floor(product.rating) ? '#f59e0b' : '#ddd', fill: i < Math.floor(product.rating) ? '#f59e0b' : 'none' }} />
                  ))}
                </div>
                <span className="text-sm fw-semibold" style={{ color: '#0F0F0F' }}>{product.rating}</span>
                <span className="text-sm" style={{ color: '#666' }}>({product.reviewCount} reviews)</span>
              </div>

              {/* SKU */}
              <p className="text-xs mb-4 pb-4" style={{ color: '#999', borderBottom: '1px solid #eee' }}>
                SKU / Code: {product.sku}
              </p>

              {/* Size dropdown */}
              {product.sizes.length > 0 && (
                <div className="mb-4">
                  <label className="form-label text-sm fw-semibold" style={{ color: '#0F0F0F' }}>Size</label>
                  <div className="position-relative">
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="form-select text-sm"
                    >
                      {product.sizes.map(s => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Paper type dropdown */}
              {product.paperTypes.length > 0 && (
                <div className="mb-4">
                  <label className="form-label text-sm fw-semibold" style={{ color: '#0F0F0F' }}>Paper Type</label>
                  <div className="position-relative">
                    <select
                      value={selectedPaperType}
                      onChange={(e) => setSelectedPaperType(e.target.value)}
                      className="form-select text-sm"
                    >
                      {product.paperTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Print Area dropdown */}
              {product.printAreas.length > 0 && (
                <div className="mb-4">
                  <label className="form-label text-sm fw-semibold" style={{ color: '#0F0F0F' }}>Print Area</label>
                  <div className="position-relative">
                    <select
                      value={selectedPrintArea}
                      onChange={(e) => setSelectedPrintArea(e.target.value)}
                      className="form-select text-sm"
                    >
                      {product.printAreas.map(a => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Print Type dropdown */}
              {product.printTypes.length > 0 && (
                <div className="mb-4">
                  <label className="form-label text-sm fw-semibold" style={{ color: '#0F0F0F' }}>Print Type</label>
                  <div className="position-relative">
                    <select
                      value={selectedPrintType}
                      onChange={(e) => setSelectedPrintType(e.target.value)}
                      className="form-select text-sm"
                    >
                      {product.printTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Lamination dropdown */}
              {product.laminationTypes.length > 0 && (
                <div className="mb-4">
                  <label className="form-label text-sm fw-semibold" style={{ color: '#0F0F0F' }}>Lamination</label>
                  <div className="position-relative">
                    <select
                      value={selectedLamination}
                      onChange={(e) => setSelectedLamination(e.target.value)}
                      className="form-select text-sm"
                    >
                      {product.laminationTypes.map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Corner dropdown */}
              {product.cornerTypes.length > 0 && (
                <div className="mb-4">
                  <label className="form-label text-sm fw-semibold" style={{ color: '#0F0F0F' }}>Corner</label>
                  <div className="position-relative">
                    <select
                      value={selectedCorner}
                      onChange={(e) => setSelectedCorner(e.target.value)}
                      className="form-select text-sm"
                    >
                      {product.cornerTypes.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-4">
                <label className="form-label text-sm fw-semibold" style={{ color: '#0F0F0F' }}>Quantity</label>
                <div className="d-flex align-items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded d-flex align-items-center justify-content-center border bg-transparent"
                    style={{ borderColor: '#ddd' }}
                  >
                    <Minus size={16} style={{ color: '#666' }} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-10 text-center text-sm fw-semibold rounded border"
                    style={{ borderColor: '#ddd', color: '#0F0F0F' }}
                    min={1}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded d-flex align-items-center justify-content-center border bg-transparent"
                    style={{ borderColor: '#ddd' }}
                  >
                    <Plus size={16} style={{ color: '#666' }} />
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#f9f9f9' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sm" style={{ color: '#666' }}>Total Price ({quantity} pcs)</span>
                  <span className="fs-4 fw-bold" style={{ color: '#ED1C24' }}>₹{totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: '#999' }}>₹{unitPrice} per piece</p>
              </div>

              {/* Buttons */}
              <div className="d-flex flex-column gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-100 py-3 rounded-pill fw-semibold text-white text-sm border-0"
                  style={{ backgroundColor: '#ED1C24' }}
                >
                  Select Options
                </button>
                <button
                  className="w-100 py-3 rounded-pill fw-semibold text-sm border-0"
                  style={{ border: '2px solid #ED1C24', color: '#ED1C24', backgroundColor: '#fff' }}
                >
                  Request Sample
                </button>
                <Link
                  href={`/design-studio?product=${slug}`}
                  className="w-100 py-3 rounded-pill fw-semibold text-white text-sm d-none d-md-flex align-items-center justify-content-center gap-2 text-decoration-none"
                  style={{ backgroundColor: '#ED1C24' }}
                >
                  Personalise
                </Link>
                <button
                  className="w-100 py-3 rounded-pill fw-semibold text-sm d-flex align-items-center justify-content-center gap-2 border bg-transparent"
                  style={{ borderColor: '#ddd', color: '#0F0F0F' }}
                >
                  <Upload size={16} />
                  Upload Design
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-100 py-3 rounded-pill fw-semibold text-sm d-flex align-items-center justify-content-center gap-2"
                  style={{ border: '2px solid #ED1C24', color: '#ED1C24', backgroundColor: '#fff' }}
                >
                  <ShoppingCart size={16} />
                  Customise & Buy
                </button>
              </div>
            </div>

            {/* Sticky sidebar below configurator */}
            <div className="bg-white rounded-3 mt-4 p-6 d-none d-lg-block" style={{ position: 'sticky', top: '20px' }}>
              {/* HOW TO ORDER */}
              <button className="w-100 py-3 rounded-pill fw-semibold text-sm text-white mb-4 border-0" style={{ backgroundColor: '#ED1C24' }}>
                HOW TO ORDER
              </button>

              {/* PRINTSTOP ADVANTAGE */}
              <div className="mb-4 pb-4" style={{ borderBottom: '1px solid #eee' }}>
                <h3 className="text-sm fw-bold mb-3" style={{ color: '#0F0F0F' }}>PRINTSTOP ADVANTAGE</h3>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-start gap-3">
                    <Shield size={20} className="mt-1 flex-shrink-0" style={{ color: '#ED1C24' }} />
                    <div>
                      <p className="text-xs fw-semibold" style={{ color: '#0F0F0F' }}>Quality Guarantee</p>
                      <p className="text-xs" style={{ color: '#666' }}>100% quality assured products</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <Truck size={20} className="mt-1 flex-shrink-0" style={{ color: '#ED1C24' }} />
                    <div>
                      <p className="text-xs fw-semibold" style={{ color: '#0F0F0F' }}>Fast Delivery</p>
                      <p className="text-xs" style={{ color: '#666' }}>Express delivery available</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <Award size={20} className="mt-1 flex-shrink-0" style={{ color: '#ED1C24' }} />
                    <div>
                      <p className="text-xs fw-semibold" style={{ color: '#0F0F0F' }}>Best Prices</p>
                      <p className="text-xs" style={{ color: '#666' }}>Competitive bulk pricing</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CANCELLATION & REFUND */}
              <div className="mb-4 pb-4" style={{ borderBottom: '1px solid #eee' }}>
                <button className="text-xs fw-semibold text-decoration-underline border-0 bg-transparent p-0" style={{ color: '#ED1C24' }}>
                  CANCELLATION & REFUND
                </button>
              </div>

              {/* Have Doubts? */}
              <div className="mb-4 pb-4" style={{ borderBottom: '1px solid #eee' }}>
                <h3 className="text-sm fw-bold mb-3" style={{ color: '#0F0F0F' }}>Have Doubts?</h3>
                <a
                  href="tel:+918097695375"
                  className="w-100 py-2 rounded-pill fw-semibold text-sm d-flex align-items-center justify-content-center gap-2 text-decoration-none"
                  style={{ border: '2px solid #ED1C24', color: '#ED1C24', backgroundColor: '#fff' }}
                >
                  <Phone size={16} />
                  Ask Our Experts
                </a>
              </div>

              {/* Share This Product */}
              <div>
                <h3 className="text-sm fw-bold mb-3" style={{ color: '#0F0F0F' }}>Share This Product</h3>
                <div className="d-flex align-items-center gap-3">
                  <button className="w-8 h-8 rounded-circle d-flex align-items-center justify-content-center border-0" style={{ backgroundColor: '#3b5998' }}>
                    <Facebook className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-circle d-flex align-items-center justify-content-center border-0" style={{ backgroundColor: '#1da1f2' }}>
                    <Twitter className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-circle d-flex align-items-center justify-content-center border-0" style={{ backgroundColor: '#e1306c' }}>
                    <Instagram className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-circle d-flex align-items-center justify-content-center border-0" style={{ backgroundColor: '#0077b5' }}>
                    <Linkedin className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-circle d-flex align-items-center justify-content-center border-0" style={{ backgroundColor: '#666' }}>
                    <Share2 size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <div className="bg-white rounded-3">
            {/* Tab Links */}
            <div className="d-flex flex-wrap gap-0 border-bottom" style={{ borderColor: '#eee' }}>
              {([
                { id: 'overview' as const, label: 'Product Overview' },
                { id: 'specifications' as const, label: 'Specifications' },
                { id: 'bulk' as const, label: 'To Order In Bulk' },
                { id: 'reviews' as const, label: 'Most Helpful Reviews' },
                { id: 'faq' as const, label: 'FAQs' },
              ]).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-6 py-4 text-sm fw-semibold border-0 bg-transparent"
                  style={{
                    color: activeTab === tab.id ? '#ED1C24' : '#666',
                    borderBottom: activeTab === tab.id ? '2px solid #ED1C24' : '2px solid transparent',
                    backgroundColor: activeTab === tab.id ? '#fff' : '#f9f9f9',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Product Overview */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="fs-4 fw-bold mb-4" style={{ color: '#0F0F0F' }}>Product Overview</h2>
                  <button className="px-4 py-2 rounded-pill text-sm fw-semibold text-white mb-4 border-0" style={{ backgroundColor: '#ED1C24' }}>
                    About Product
                  </button>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#444' }}>{product.longDescription}</p>

                  <h3 className="fs-5 fw-bold mb-4" style={{ color: '#0F0F0F' }}>Product Details</h3>
                  <div className="row g-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="col-6">
                        <div className="d-flex flex-column py-2" style={{ borderBottom: '1px solid #eee' }}>
                          <span className="text-xs" style={{ color: '#999' }}>{key}</span>
                          <span className="text-sm fw-semibold" style={{ color: '#0F0F0F' }}>{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {activeTab === 'specifications' && (
                <div>
                  <h2 className="fs-4 fw-bold mb-4" style={{ color: '#0F0F0F' }}>Specifications</h2>
                  <div className="d-flex flex-column">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="d-flex justify-content-between py-3" style={{ borderBottom: '1px solid #eee' }}>
                        <span className="text-sm" style={{ color: '#666' }}>{key}</span>
                        <span className="text-sm fw-semibold" style={{ color: '#0F0F0F' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* To Order In Bulk */}
              {activeTab === 'bulk' && (
                <div className="rounded-3 p-6" style={{ backgroundColor: '#ED1C24' }}>
                  <h2 className="fs-4 fw-bold text-white mb-3">To Order In Bulk</h2>
                  <p className="text-sm text-white mb-4">
                    Need assistance or just want to feel heard? Call us at: <strong>080-6917-9900</strong>
                  </p>
                  <a
                    href="tel:08069179900"
                    className="d-inline-flex align-items-center gap-2 px-6 py-3 rounded-pill fw-semibold text-sm text-decoration-none"
                    style={{ backgroundColor: '#fff', color: '#ED1C24' }}
                  >
                    <Phone size={16} />
                    Call Now
                  </a>
                </div>
              )}

              {/* Most Helpful Reviews */}
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="fs-4 fw-bold mb-6" style={{ color: '#0F0F0F' }}>Most Helpful Reviews</h2>
                  <div className="d-flex flex-column gap-4">
                    {reviews.map((review, i) => (
                      <div key={i} className="p-4 rounded-3" style={{ border: '1px solid #eee' }}>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <div className="d-flex align-items-center gap-3">
                            <div className="w-10 h-10 rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f0f0f0' }}>
                              <span className="text-sm fw-bold" style={{ color: '#666' }}>{review.name[0]}</span>
                            </div>
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <p className="text-sm fw-semibold" style={{ color: '#0F0F0F' }}>{review.name}</p>
                                {review.verified && (
                                  <span className="text-xs px-2 py-0 rounded-pill fw-semibold" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                                    Verified
                                  </span>
                                )}
                              </div>
                              <p className="text-xs" style={{ color: '#999' }}>{review.product}</p>
                            </div>
                          </div>
                          <span className="text-xs" style={{ color: '#999' }}>{review.date}</span>
                        </div>
                        <div className="d-flex align-items-center gap-1 mb-2">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={14} style={{ color: j < review.rating ? '#f59e0b' : '#ddd', fill: j < review.rating ? '#f59e0b' : 'none' }} />
                          ))}
                        </div>
                        <h4 className="text-sm fw-semibold mb-1" style={{ color: '#0F0F0F' }}>{review.title}</h4>
                        <p className="text-sm mb-3" style={{ color: '#444' }}>{review.content}</p>
                        <button className="d-flex align-items-center gap-2 text-xs border-0 bg-transparent p-0" style={{ color: '#666' }}>
                          <ThumbsUp size={14} />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {activeTab === 'faq' && (
                <div>
                  <h2 className="fs-4 fw-bold mb-6" style={{ color: '#0F0F0F' }}>FAQs</h2>
                  <div className="d-flex flex-column">
                    {faqs.map((faq, i) => (
                      <div key={i} style={{ borderBottom: '1px solid #eee' }}>
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-100 d-flex align-items-center justify-content-between py-4 text-start border-0 bg-transparent p-0"
                        >
                          <span className="text-sm fw-semibold pe-4" style={{ color: '#0F0F0F' }}>{faq.q}</span>
                          {openFaq === i ? (
                            <ChevronUp size={20} className="flex-shrink-0" style={{ color: '#666' }} />
                          ) : (
                            <ChevronDown size={20} className="flex-shrink-0" style={{ color: '#666' }} />
                          )}
                        </button>
                        {openFaq === i && (
                          <div className="pb-4">
                            <p className="text-sm leading-relaxed" style={{ color: '#444' }}>{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile sidebar elements */}
        <div className="d-lg-none mt-4">
          <div className="bg-white rounded-3 p-6">
            <button className="w-100 py-3 rounded-pill fw-semibold text-sm text-white mb-4 border-0" style={{ backgroundColor: '#ED1C24' }}>
              HOW TO ORDER
            </button>
            <div className="mb-4 pb-4" style={{ borderBottom: '1px solid #eee' }}>
              <h3 className="text-sm fw-bold mb-3" style={{ color: '#0F0F0F' }}>PRINTSTOP ADVANTAGE</h3>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-start gap-3">
                  <Shield size={20} className="mt-1 flex-shrink-0" style={{ color: '#ED1C24' }} />
                  <div>
                    <p className="text-xs fw-semibold" style={{ color: '#0F0F0F' }}>Quality Guarantee</p>
                    <p className="text-xs" style={{ color: '#666' }}>100% quality assured products</p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <Truck size={20} className="mt-1 flex-shrink-0" style={{ color: '#ED1C24' }} />
                  <div>
                    <p className="text-xs fw-semibold" style={{ color: '#0F0F0F' }}>Fast Delivery</p>
                    <p className="text-xs" style={{ color: '#666' }}>Express delivery available</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4 pb-4" style={{ borderBottom: '1px solid #eee' }}>
              <button className="text-xs fw-semibold text-decoration-underline border-0 bg-transparent p-0" style={{ color: '#ED1C24' }}>
                CANCELLATION & REFUND
              </button>
            </div>
            <div className="mb-4 pb-4" style={{ borderBottom: '1px solid #eee' }}>
              <h3 className="text-sm fw-bold mb-3" style={{ color: '#0F0F0F' }}>Have Doubts?</h3>
              <a
                href="tel:+918097695375"
                className="w-100 py-2 rounded-pill fw-semibold text-sm d-flex align-items-center justify-content-center gap-2 text-decoration-none"
                style={{ border: '2px solid #ED1C24', color: '#ED1C24', backgroundColor: '#fff' }}
              >
                <Phone size={16} />
                Ask Our Experts
              </a>
            </div>
            <div>
              <h3 className="text-sm fw-bold mb-3" style={{ color: '#0F0F0F' }}>Share This Product</h3>
              <div className="d-flex align-items-center gap-3">
                <button className="w-8 h-8 rounded-circle d-flex align-items-center justify-content-center border-0" style={{ backgroundColor: '#3b5998' }}>
                  <Facebook className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 rounded-circle d-flex align-items-center justify-content-center border-0" style={{ backgroundColor: '#1da1f2' }}>
                  <Twitter className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 rounded-circle d-flex align-items-center justify-content-center border-0" style={{ backgroundColor: '#e1306c' }}>
                  <Instagram className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 rounded-circle d-flex align-items-center justify-content-center border-0" style={{ backgroundColor: '#0077b5' }}>
                  <Linkedin className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 rounded-circle d-flex align-items-center justify-content-center border-0" style={{ backgroundColor: '#666' }}>
                  <Share2 size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Talk Business */}
        <div className="mt-8">
          <div className="bg-white rounded-3 p-6">
            <h2 className="fs-4 fw-bold mb-3" style={{ color: '#0F0F0F' }}>Let&apos;s Talk Business</h2>
            <p className="text-sm mb-4" style={{ color: '#444' }}>
              Whether you need 100 or 100,000 pieces, we have the capacity and expertise to deliver. Get in touch with our corporate sales team for custom orders, dedicated account management, and exclusive pricing.
            </p>
            <Link
              href="/contact"
              className="d-inline-flex align-items-center gap-2 px-6 py-3 rounded-pill fw-semibold text-sm text-white text-decoration-none"
              style={{ backgroundColor: '#ED1C24' }}
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-8">
          <div className="bg-white rounded-3 p-6">
            <h2 className="fs-4 fw-bold mb-6" style={{ color: '#0F0F0F' }}>Related Products</h2>
            <div className="row g-4">
              {relatedProducts.map((rp) => (
                <div key={rp.slug} className="col-6 col-md-3">
                  <Link
                    href={`/products/${rp.slug}`}
                    className="group rounded-3 overflow-hidden d-block text-decoration-none"
                    style={{ border: '1px solid #eee' }}
                  >
                    <div className="overflow-hidden position-relative" style={{ aspectRatio: '1/1' }}>
                      <Image src={categoryImageMap[rp.category] || categoryImageMap['default']} alt={rp.name} fill unoptimized style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="p-3">
                      <p className="text-sm fw-medium text-truncate" style={{ color: '#0F0F0F' }}>{rp.name}</p>
                      <p className="text-sm fw-bold mt-1" style={{ color: '#ED1C24' }}>Starting at ₹{rp.basePrice}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-8 mb-8">
          <div className="bg-white rounded-3 p-6">
            <h2 className="fs-4 fw-bold mb-6" style={{ color: '#0F0F0F' }}>Recently Viewed</h2>
            <div className="row g-4">
              {recentlyViewed.map((rp) => (
                <div key={rp.slug} className="col-6 col-md-3">
                  <Link
                    href={`/products/${rp.slug}`}
                    className="group rounded-3 overflow-hidden d-block text-decoration-none"
                    style={{ border: '1px solid #eee' }}
                  >
                    <div className="overflow-hidden position-relative" style={{ aspectRatio: '1/1' }}>
                      <Image src={categoryImageMap[rp.category] || categoryImageMap['default']} alt={rp.name} fill unoptimized style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="p-3">
                      <p className="text-sm fw-medium text-truncate" style={{ color: '#0F0F0F' }}>{rp.name}</p>
                      <p className="text-sm fw-bold mt-1" style={{ color: '#ED1C24' }}>Starting at ₹{rp.basePrice}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
