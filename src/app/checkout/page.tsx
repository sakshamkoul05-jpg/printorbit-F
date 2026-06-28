'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard, Smartphone, Building, CheckCircle, ChevronRight, Lock,
  MapPin, Truck, Shield, Package, ArrowRight, Wallet, FileText,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'confirm';

const STEPS = [
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'confirm', label: 'Confirm', icon: CheckCircle },
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
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-lg font-bold text-dark font-heading">Delivery Address</h2>

            <div className="space-y-3">
              {[
                { label: 'Office - Faridabad', address: 'Sector 15, Faridabad, Haryana 121001', phone: '+91 98765 43211' },
                { label: 'Home - Dharamshala', address: 'McLeod Ganj, Dharamshala, HP 176219', phone: '+91 98765 43210' },
              ].map((addr, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAddress(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedAddress === i
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-dark">{addr.label}</p>
                      <p className="text-xs text-muted mt-0.5">{addr.address}</p>
                      <p className="text-xs text-muted">{addr.phone}</p>
                    </div>
                    {selectedAddress === i && (
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    )}
                  </div>
                </button>
              ))}

              <button className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
                + Add New Address
              </button>
            </div>
          </motion.div>
        );

      case 'shipping':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-lg font-bold text-dark font-heading">Shipping Method</h2>

            <div className="space-y-3">
              {shippingOptions.map((option, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedShipping(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedShipping === i
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Truck className={`w-5 h-5 ${selectedShipping === i ? 'text-primary' : 'text-slate-400'}`} />
                      <div>
                        <p className="text-sm font-semibold text-dark">{option.name}</p>
                        <p className="text-xs text-muted">Estimated: {option.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-dark">
                        {option.price === 0 ? 'FREE' : formatPrice(option.price)}
                      </p>
                      {selectedShipping === i && (
                        <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 'payment':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-lg font-bold text-dark font-heading">Payment Method</h2>

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
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-primary' : 'text-slate-400'}`} />
                      <div>
                        <p className="text-sm font-semibold text-dark">{method.label}</p>
                        <p className="text-xs text-muted">{method.desc}</p>
                      </div>
                    </div>
                    {paymentMethod === method.id && (
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* UPI Input */}
            {paymentMethod === 'upi' && (
              <div className="p-4 bg-slate-50 rounded-xl">
                <label className="text-xs font-medium text-slate-500 mb-2 block">UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm outline-none focus:border-primary"
                />
              </div>
            )}

            {/* Card Input */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">CVV</label>
                    <input type="password" placeholder="123" className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );

      case 'confirm':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-lg font-bold text-dark font-heading">Review & Confirm</h2>

            {/* Order Items */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">Order Items</p>
              {items.map((item) => (
                <div key={`${item.product_id}-${item.material}`} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark">{item.product_name}</p>
                      <p className="text-[10px] text-muted">{item.material} · {item.size} · {item.quantity} pcs</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-dark">{formatPrice(item.unit_price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Delivery Info */}
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Delivery</p>
              <p className="text-sm text-dark">Office - Faridabad, Sector 15, Haryana 121001</p>
              <p className="text-xs text-muted mt-1">{shippingOptions[selectedShipping].name} ({shippingOptions[selectedShipping].time})</p>
            </div>

            {/* Payment Info */}
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Payment</p>
              <p className="text-sm text-dark capitalize">{paymentMethod === 'upi' ? 'UPI Payment' : paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Wallet'}</p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-xl">
              <input type="checkbox" defaultChecked className="w-4 h-4 mt-0.5 accent-primary" />
              <p className="text-xs text-muted leading-relaxed">
                I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. I understand that my order is subject to PrintOrbit&apos;s production timelines.
              </p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Container>
        <div className="py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/cart" className="hover:text-primary">Cart</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-dark font-medium">Checkout</span>
          </nav>

          {/* Steps */}
          <div className="flex items-center justify-center gap-0 mb-10">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => {
                    if (i <= stepIndex) setStep(s.id as CheckoutStep);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    s.id === step
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : i < stepIndex
                        ? 'bg-success/10 text-success'
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {i < stepIndex ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <s.icon className="w-4 h-4" />
                  )}
                  <span className="text-xs font-semibold hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 ${i < stepIndex ? 'bg-success' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {renderStep()}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                {stepIndex > 0 ? (
                  <button
                    onClick={() => setStep(STEPS[stepIndex - 1].id as CheckoutStep)}
                    className="px-6 py-2.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <Link href="/cart" className="px-6 py-2.5 text-sm font-medium text-primary hover:text-primary-dark">
                    ← Back to Cart
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

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-24 space-y-4">
                <h3 className="font-bold text-dark font-heading">Order Summary</h3>

                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.product_id}-${item.material}`} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4 text-slate-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-dark truncate">{item.product_name}</p>
                        <p className="text-[10px] text-muted">×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-semibold text-dark shrink-0">{formatPrice(item.unit_price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted">Subtotal</span>
                    <span className="text-xs font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted">Shipping</span>
                    <span className={`text-xs font-semibold ${shipping === 0 ? 'text-success' : ''}`}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <span className="text-sm font-bold text-dark">Total</span>
                    <span className="text-lg font-bold text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-success/5 rounded-xl">
                  <Shield className="w-4 h-4 text-success shrink-0" />
                  <p className="text-[10px] text-success font-medium">Your payment is secured with 256-bit SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
