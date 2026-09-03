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
    <div className="min-h-screen" style={{ backgroundColor: '#F4F2EF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: '#6B7280' }}>
          <Link href="/" className="hover:underline" style={{ color: '#ED1C24' }}>Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/cart" className="hover:underline" style={{ color: '#ED1C24' }}>Your Cart</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-medium" style={{ color: '#0F0F0F' }}>Check Out</span>
        </nav>

        <h1 className="text-2xl font-bold mb-8" style={{ color: '#0F0F0F' }}>Check Out</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - Shipping Information */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6" style={{ border: '1px solid #E5E5E5' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0F0F0F' }}>Shipping Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2.5 text-sm"
                    style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-3 py-2.5 text-sm"
                    style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 text-sm"
                    style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>Address</label>
                  <textarea
                    placeholder="Enter your full address"
                    rows={2}
                    className="w-full px-3 py-2.5 text-sm resize-none"
                    style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>City</label>
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-3 py-2.5 text-sm"
                      style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>State</label>
                    <input
                      type="text"
                      placeholder="State"
                      className="w-full px-3 py-2.5 text-sm"
                      style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F0F0F' }}>ZIP / Postal Code</label>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="w-full px-3 py-2.5 text-sm"
                    style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Ship to different address */}
              <div className="mt-6 pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shipDifferent}
                    onChange={(e) => setShipDifferent(e.target.checked)}
                    className="w-4 h-4"
                    style={{ accentColor: '#ED1C24' }}
                  />
                  <span className="text-sm" style={{ color: '#0F0F0F' }}>Ship to different address</span>
                </label>
              </div>

              {/* Billing Address */}
              <div className="mt-4">
                <h3 className="text-sm font-bold mb-3" style={{ color: '#0F0F0F' }}>Billing Address</h3>
                <p className="text-xs" style={{ color: '#6B7280' }}>Same as shipping address</p>
              </div>
            </div>
          </div>

          {/* MIDDLE - Payment Method */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6" style={{ border: '1px solid #E5E5E5' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0F0F0F' }}>Payment Method</h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center gap-3 p-3 cursor-pointer"
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
                      className="w-4 h-4"
                      style={{ accentColor: '#ED1C24' }}
                    />
                    <method.icon className="w-5 h-5" style={{ color: paymentMethod === method.id ? '#ED1C24' : '#9CA3AF' }} />
                    <span className="text-sm font-medium" style={{ color: '#0F0F0F' }}>{method.label}</span>
                  </label>
                ))}
              </div>

              {/* Terms & Conditions */}
              <div className="mt-6 pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 mt-0.5"
                    style={{ accentColor: '#ED1C24' }}
                  />
                  <span className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                    I agree to the{' '}
                    <Link href="/terms" className="underline" style={{ color: '#ED1C24' }}>Terms & Conditions</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="underline" style={{ color: '#ED1C24' }}>Privacy Policy</Link>
                  </span>
                </label>
              </div>

              {/* Place Order Button */}
              <button
                className="w-full mt-6 py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: '#ED1C24', opacity: termsAccepted ? 1 : 0.5 }}
                disabled={!termsAccepted}
              >
                Place Order
              </button>

              {/* Security Note */}
              <div className="flex items-center gap-2 mt-4 p-3" style={{ backgroundColor: '#F3F4F6' }}>
                <Lock className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                <p className="text-[10px]" style={{ color: '#6B7280' }}>
                  Your payment is secured with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sticky top-24" style={{ border: '1px solid #E5E5E5' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0F0F0F' }}>Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product_id}-${item.material}`} className="flex items-center gap-3">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
                      {item.product_image ? (
                        <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-4 h-4" style={{ color: '#D1D5DB' }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: '#0F0F0F' }}>{item.product_name}</p>
                      <p className="text-[10px]" style={{ color: '#9CA3AF' }}>×{item.quantity}</p>
                    </div>
                    <p className="text-xs font-semibold shrink-0" style={{ color: '#0F0F0F' }}>
                      {formatPrice(item.unit_price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary Lines */}
              <div className="space-y-3 mb-4 pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#6B7280' }}>Product Value</span>
                  <span className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#6B7280' }}>Delivery</span>
                  <span className="text-sm font-semibold" style={{ color: shipping === 0 ? '#10B981' : '#0F0F0F' }}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-4" style={{ borderTop: '1px solid #E5E5E5' }}>
                <span className="text-base font-bold" style={{ color: '#0F0F0F' }}>Total</span>
                <span className="text-xl font-bold" style={{ color: '#ED1C24' }}>{formatPrice(total)}</span>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 p-3 mt-4" style={{ backgroundColor: '#D1FAE5' }}>
                <Shield className="w-4 h-4 flex-shrink-0" style={{ color: '#065F46' }} />
                <p className="text-[10px] font-medium" style={{ color: '#065F46' }}>
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
