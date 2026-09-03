'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard, Smartphone, Building, CheckCircle, ChevronRight, Lock,
  MapPin, Truck, Shield, Package, ArrowRight, Wallet,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'confirm';

const STEPS = [
  { id: 'address', label: 'Shipping Address', icon: MapPin },
  { id: 'shipping', label: 'Delivery', icon: Truck },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'confirm', label: 'Review', icon: CheckCircle },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>('address');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState(0);
  const { items, getTotal } = useCartStore();

  const subtotal = getTotal();
  const shippingOptions = [
    { name: 'Standard Delivery', time: '5-7 days', price: 0 },
    { name: 'Express Delivery', time: '2-3 days', price: 149 },
    { name: 'Same Day Delivery', time: 'Today', price: 399 },
  ];
  const shipping = shippingOptions[selectedShipping].price;
  const total = subtotal + shipping;

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const renderStep = () => {
    switch (step) {
      case 'address':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0F0F0F' }}>Delivery Address</h2>
            <div className="space-y-3">
              {[
                { label: 'Office - Faridabad', address: 'Sector 15, Faridabad, Haryana 121001', phone: '+91 98765 43211' },
                { label: 'Home - Dharamshala', address: 'McLeod Ganj, Dharamshala, HP 176219', phone: '+91 98765 43210' },
              ].map((addr, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAddress(i)}
                  className="w-full text-left p-4 border rounded-md transition-colors"
                  style={{
                    borderColor: selectedAddress === i ? '#ED1C24' : '#D1D5DB',
                    backgroundColor: selectedAddress === i ? '#FDF2F2' : '#FFFFFF',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>{addr.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{addr.address}</p>
                      <p className="text-xs" style={{ color: '#6B7280' }}>{addr.phone}</p>
                    </div>
                    {selectedAddress === i && (
                      <CheckCircle className="w-5 h-5 shrink-0" style={{ color: '#ED1C24' }} />
                    )}
                  </div>
                </button>
              ))}
              <button
                className="w-full p-4 border border-dashed rounded-md text-sm font-medium transition-colors"
                style={{ borderColor: '#D1D5DB', color: '#ED1C24' }}
              >
                + Add New Address
              </button>
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0F0F0F' }}>Delivery Method</h2>
            <div className="space-y-3">
              {shippingOptions.map((option, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedShipping(i)}
                  className="w-full text-left p-4 border rounded-md transition-colors"
                  style={{
                    borderColor: selectedShipping === i ? '#ED1C24' : '#D1D5DB',
                    backgroundColor: selectedShipping === i ? '#FDF2F2' : '#FFFFFF',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5" style={{ color: selectedShipping === i ? '#ED1C24' : '#9CA3AF' }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>{option.name}</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>Estimated: {option.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: '#0F0F0F' }}>
                        {option.price === 0 ? 'FREE' : formatPrice(option.price)}
                      </p>
                      {selectedShipping === i && (
                        <CheckCircle className="w-5 h-5 ml-auto" style={{ color: '#ED1C24' }} />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'payment':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0F0F0F' }}>Payment Method</h2>
            <div className="space-y-3">
              {[
                { id: 'upi', label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm', icon: Smartphone },
                { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', desc: 'All major banks', icon: Building },
                { id: 'wallet', label: 'Wallets', desc: 'Paytm, Amazon Pay, Mobikwik', icon: Wallet },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className="w-full text-left p-4 border rounded-md transition-colors"
                  style={{
                    borderColor: paymentMethod === method.id ? '#ED1C24' : '#D1D5DB',
                    backgroundColor: paymentMethod === method.id ? '#FDF2F2' : '#FFFFFF',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <method.icon className="w-5 h-5" style={{ color: paymentMethod === method.id ? '#ED1C24' : '#9CA3AF' }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>{method.label}</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>{method.desc}</p>
                      </div>
                    </div>
                    {paymentMethod === method.id && (
                      <CheckCircle className="w-5 h-5 shrink-0" style={{ color: '#ED1C24' }} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {paymentMethod === 'upi' && (
              <div className="p-4 mt-4 rounded-md" style={{ backgroundColor: '#F9FAFB' }}>
                <label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full px-4 py-2.5 bg-white rounded-md border text-sm outline-none"
                  style={{ borderColor: '#D1D5DB' }}
                />
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 mt-4 rounded-md space-y-3" style={{ backgroundColor: '#F9FAFB' }}>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: '#6B7280' }}>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-2.5 bg-white rounded-md border text-sm outline-none" style={{ borderColor: '#D1D5DB' }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: '#6B7280' }}>Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-2.5 bg-white rounded-md border text-sm outline-none" style={{ borderColor: '#D1D5DB' }} />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: '#6B7280' }}>CVV</label>
                    <input type="password" placeholder="123" className="w-full px-4 py-2.5 bg-white rounded-md border text-sm outline-none" style={{ borderColor: '#D1D5DB' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'confirm':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0F0F0F' }}>Review &amp; Confirm</h2>

            <div className="p-4 rounded-md mb-4" style={{ backgroundColor: '#F9FAFB' }}>
              <p className="text-xs font-semibold uppercase mb-3" style={{ color: '#9CA3AF' }}>Order Items</p>
              {items.map((item) => (
                <div key={`${item.product_id}-${item.material}`} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: '#E5E7EB' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: '#FFFFFF' }}>
                      <Package className="w-5 h-5" style={{ color: '#D1D5DB' }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#0F0F0F' }}>{item.product_name}</p>
                      <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{item.material} · {item.size} · {item.quantity} pcs</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>{formatPrice(item.unit_price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-md mb-4" style={{ backgroundColor: '#F9FAFB' }}>
              <p className="text-xs font-semibold uppercase mb-2" style={{ color: '#9CA3AF' }}>Delivery</p>
              <p className="text-sm" style={{ color: '#0F0F0F' }}>Office - Faridabad, Sector 15, Haryana 121001</p>
              <p className="text-xs mt-1" style={{ color: '#6B7280' }}>{shippingOptions[selectedShipping].name} ({shippingOptions[selectedShipping].time})</p>
            </div>

            <div className="p-4 rounded-md mb-4" style={{ backgroundColor: '#F9FAFB' }}>
              <p className="text-xs font-semibold uppercase mb-2" style={{ color: '#9CA3AF' }}>Payment</p>
              <p className="text-sm capitalize" style={{ color: '#0F0F0F' }}>{paymentMethod === 'upi' ? 'UPI Payment' : paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Wallet'}</p>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-md" style={{ backgroundColor: '#FDF2F2' }}>
              <input type="checkbox" defaultChecked className="w-4 h-4 mt-0.5 accent-[#ED1C24]" />
              <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                I agree to the <Link href="/terms" className="underline" style={{ color: '#ED1C24' }}>Terms of Service</Link> and <Link href="/privacy" className="underline" style={{ color: '#ED1C24' }}>Privacy Policy</Link>. I understand that my order is subject to PrintOrbit&apos;s production timelines.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F2EF' }}>
      <Container>
        <div className="py-8">
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: '#6B7280' }}>
            <Link href="/" className="hover:underline" style={{ color: '#ED1C24' }}>Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/cart" className="hover:underline" style={{ color: '#ED1C24' }}>Cart</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-medium" style={{ color: '#0F0F0F' }}>Checkout</span>
          </nav>

          <div className="flex items-center justify-center gap-0 mb-10">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => {
                    if (i <= stepIndex) setStep(s.id as CheckoutStep);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold"
                  style={{
                    backgroundColor: s.id === step ? '#ED1C24' : i < stepIndex ? '#D1FAE5' : '#F3F4F6',
                    color: s.id === step ? '#FFFFFF' : i < stepIndex ? '#065F46' : '#9CA3AF',
                  }}
                >
                  {i < stepIndex ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <s.icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="w-8 h-0.5 mx-1" style={{ backgroundColor: i < stepIndex ? '#10B981' : '#E5E7EB' }} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {renderStep()}

              <div className="flex items-center justify-between mt-8">
                {stepIndex > 0 ? (
                  <button
                    onClick={() => setStep(STEPS[stepIndex - 1].id as CheckoutStep)}
                    className="px-6 py-2.5 text-sm font-semibold rounded-md"
                    style={{ backgroundColor: '#F3F4F6', color: '#4B5563' }}
                  >
                    Back
                  </button>
                ) : (
                  <Link href="/cart" className="text-sm font-medium" style={{ color: '#ED1C24' }}>
                    &larr; Back to Cart
                  </Link>
                )}

                {step !== 'confirm' ? (
                  <Button
                    variant="primary"
                    onClick={() => setStep(STEPS[stepIndex + 1].id as CheckoutStep)}
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="primary" size="lg">
                    <Lock className="w-4 h-4 mr-2" />
                    Place Order — {formatPrice(total)}
                  </Button>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 sticky top-24 space-y-4" style={{ border: '1px solid #E5E7EB' }}>
                <h3 className="font-bold" style={{ color: '#0F0F0F' }}>Order Summary</h3>

                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.product_id}-${item.material}`} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: '#F3F4F6' }}>
                        <Package className="w-4 h-4" style={{ color: '#D1D5DB' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: '#0F0F0F' }}>{item.product_name}</p>
                        <p className="text-[10px]" style={{ color: '#9CA3AF' }}>×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-semibold shrink-0" style={{ color: '#0F0F0F' }}>{formatPrice(item.unit_price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 space-y-2" style={{ borderTop: '1px solid #E5E7EB' }}>
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: '#6B7280' }}>Subtotal</span>
                    <span className="text-xs font-semibold" style={{ color: '#0F0F0F' }}>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: '#6B7280' }}>Shipping</span>
                    <span className="text-xs font-semibold" style={{ color: shipping === 0 ? '#10B981' : '#0F0F0F' }}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2" style={{ borderTop: '1px solid #E5E7EB' }}>
                    <span className="text-sm font-bold" style={{ color: '#0F0F0F' }}>Total</span>
                    <span className="text-lg font-bold" style={{ color: '#ED1C24' }}>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-md" style={{ backgroundColor: '#D1FAE5' }}>
                  <Shield className="w-4 h-4 shrink-0" style={{ color: '#065F46' }} />
                  <p className="text-[10px] font-medium" style={{ color: '#065F46' }}>Your payment is secured with 256-bit SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
