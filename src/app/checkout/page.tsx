'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight, Smartphone, Building2, CreditCard, QrCode,
  Wallet, Shield, Lock, Truck, Package, CheckCircle,
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

type PaymentMethod = 'phonepe' | 'paytm' | 'razorpay' | 'upi' | 'netbanking' | 'qrcode';

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [shipDifferent, setShipDifferent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const subtotal = getTotal();
  const shipping = subtotal >= 5000 ? 0 : 199;
  const total = subtotal + shipping;

  const paymentMethods: { id: PaymentMethod; label: string; icon: typeof Smartphone }[] = [
    { id: 'phonepe', label: 'PhonePe', icon: Smartphone },
    { id: 'paytm', label: 'Paytm', icon: Wallet },
    { id: 'razorpay', label: 'Razorpay', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
    { id: 'qrcode', label: 'QR Code', icon: QrCode },
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#F4F2EF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="d-flex align-items-center gap-2 text-xs mb-6" style={{ color: '#6B7280' }}>
          <Link href="/" className="hover:underline text-decoration-none" style={{ color: '#ED1C24' }}>Home</Link>
          <ChevronRight size={12} />
          <Link href="/cart" className="hover:underline text-decoration-none" style={{ color: '#ED1C24' }}>Your Cart</Link>
          <ChevronRight size={12} />
          <span className="fw-medium" style={{ color: '#0F0F0F' }}>Check Out</span>
        </nav>

        <h1 className="fs-3 fw-bold mb-8" style={{ color: '#0F0F0F' }}>Check Out</h1>

        <div className="row g-4">
          {/* LEFT - Shipping Information */}
          <div className="col-12 col-lg-4">
            <div className="bg-white p-6" style={{ border: '1px solid #E5E5E5' }}>
              <h2 className="fs-5 fw-bold mb-4" style={{ color: '#0F0F0F' }}>Shipping Information</h2>

              <div className="d-flex flex-column gap-4">
                <div>
                  <label className="form-label text-sm fw-medium" style={{ color: '#0F0F0F' }}>Full Name</label>
                  <input type="text" placeholder="Enter your full name" className="form-control text-sm" />
                </div>

                <div>
                  <label className="form-label text-sm fw-medium" style={{ color: '#0F0F0F' }}>Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" className="form-control text-sm" />
                </div>

                <div>
                  <label className="form-label text-sm fw-medium" style={{ color: '#0F0F0F' }}>Email Address</label>
                  <input type="email" placeholder="you@example.com" className="form-control text-sm" />
                </div>

                <div>
                  <label className="form-label text-sm fw-medium" style={{ color: '#0F0F0F' }}>Address</label>
                  <textarea placeholder="Enter your full address" rows={2} className="form-control text-sm resize-none" />
                </div>

                <div className="row g-4">
                  <div className="col-6">
                    <label className="form-label text-sm fw-medium" style={{ color: '#0F0F0F' }}>City</label>
                    <input type="text" placeholder="City" className="form-control text-sm" />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-sm fw-medium" style={{ color: '#0F0F0F' }}>State</label>
                    <input type="text" placeholder="State" className="form-control text-sm" />
                  </div>
                </div>

                <div>
                  <label className="form-label text-sm fw-medium" style={{ color: '#0F0F0F' }}>ZIP / Postal Code</label>
                  <input type="text" placeholder="ZIP Code" className="form-control text-sm" />
                </div>
              </div>

              {/* Ship to different address */}
              <div className="mt-6 pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                <label className="d-flex align-items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shipDifferent}
                    onChange={(e) => setShipDifferent(e.target.checked)}
                    className="form-check-input"
                  />
                  <span className="text-sm" style={{ color: '#0F0F0F' }}>Ship to different address</span>
                </label>
              </div>

              {/* Billing Address */}
              <div className="mt-4">
                <h3 className="text-sm fw-bold mb-3" style={{ color: '#0F0F0F' }}>Billing Address</h3>
                <p className="text-xs" style={{ color: '#6B7280' }}>Same as shipping address</p>
              </div>
            </div>
          </div>

          {/* MIDDLE - Payment Method */}
          <div className="col-12 col-lg-4">
            <div className="bg-white p-6" style={{ border: '1px solid #E5E5E5' }}>
              <h2 className="fs-5 fw-bold mb-4" style={{ color: '#0F0F0F' }}>Payment Method</h2>

              <div className="d-flex flex-column gap-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className="d-flex align-items-center gap-3 p-3 cursor-pointer"
                    style={{
                      border: `1px solid ${paymentMethod === method.id ? '#ED1C24' : '#E5E5E5'}`,
                      backgroundColor: paymentMethod === method.id ? '#FDF2F2' : '#FFFFFF',
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="form-check-input"
                    />
                    <method.icon size={20} style={{ color: paymentMethod === method.id ? '#ED1C24' : '#9CA3AF' }} />
                    <span className="text-sm fw-medium" style={{ color: '#0F0F0F' }}>{method.label}</span>
                  </label>
                ))}
              </div>

              {/* Terms & Conditions */}
              <div className="mt-6 pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                <label className="d-flex align-items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="form-check-input mt-1"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                    I agree to the{' '}
                    <Link href="/terms" className="text-decoration-underline" style={{ color: '#ED1C24' }}>Terms & Conditions</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-decoration-underline" style={{ color: '#ED1C24' }}>Privacy Policy</Link>
                  </span>
                </label>
              </div>

              {/* Place Order Button */}
              <button
                className="w-100 mt-6 py-3 text-sm fw-semibold text-white border-0"
                style={{ backgroundColor: '#ED1C24', opacity: termsAccepted ? 1 : 0.5 }}
                disabled={!termsAccepted}
              >
                Place Order
              </button>

              {/* Security Note */}
              <div className="d-flex align-items-center gap-2 mt-4 p-3" style={{ backgroundColor: '#F3F4F6' }}>
                <Lock size={16} className="flex-shrink-0" style={{ color: '#10B981' }} />
                <p style={{ fontSize: '0.65rem', color: '#6B7280' }}>
                  Your payment is secured with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT - Order Summary */}
          <div className="col-12 col-lg-4">
            <div className="bg-white p-6 sticky-top" style={{ border: '1px solid #E5E5E5', top: '6rem' }}>
              <h2 className="fs-5 fw-bold mb-4" style={{ color: '#0F0F0F' }}>Order Summary</h2>

              {/* Items */}
              <div className="d-flex flex-column gap-3 mb-4" style={{ maxHeight: '12rem', overflowY: 'auto' }}>
                {items.map((item) => (
                  <div key={`${item.product_id}-${item.material}`} className="d-flex align-items-center gap-3">
                    <div className="w-10 h-10 flex-shrink-0 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#F3F4F6' }}>
                      {item.product_image ? (
                        <img src={item.product_image} alt={item.product_name} className="w-100 h-100 object-cover" />
                      ) : (
                        <Package size={16} style={{ color: '#D1D5DB' }} />
                      )}
                    </div>
                    <div className="flex-fill min-w-0">
                      <p className="text-xs fw-medium text-truncate" style={{ color: '#0F0F0F' }}>{item.product_name}</p>
                      <p style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>×{item.quantity}</p>
                    </div>
                    <p className="text-xs fw-semibold flex-shrink-0" style={{ color: '#0F0F0F' }}>
                      {formatPrice(item.unit_price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary Lines */}
              <div className="d-flex flex-column gap-3 mb-4 pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-sm" style={{ color: '#6B7280' }}>Product Value</span>
                  <span className="text-sm fw-semibold" style={{ color: '#0F0F0F' }}>{formatPrice(subtotal)}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-sm" style={{ color: '#6B7280' }}>Delivery</span>
                  <span className="text-sm fw-semibold" style={{ color: shipping === 0 ? '#10B981' : '#0F0F0F' }}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between py-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                <span className="fs-6 fw-bold" style={{ color: '#0F0F0F' }}>Total</span>
                <span className="fs-4 fw-bold" style={{ color: '#ED1C24' }}>{formatPrice(total)}</span>
              </div>

              {/* Security Badge */}
              <div className="d-flex align-items-center gap-2 p-3 mt-4" style={{ backgroundColor: '#D1FAE5' }}>
                <Shield size={16} className="flex-shrink-0" style={{ color: '#065F46' }} />
                <p className="fw-medium" style={{ fontSize: '0.65rem', color: '#065F46' }}>
                  Secure checkout with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
