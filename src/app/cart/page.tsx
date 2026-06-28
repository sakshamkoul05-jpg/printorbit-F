'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck,
  Clock, Tag, CreditCard, Package, ChevronRight, Lock, CheckCircle,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const subtotal = getTotal();
  const shipping = subtotal >= 5000 ? 0 : 199;
  const discount = couponApplied ? couponDiscount : 0;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'PRINTORBIT10') {
      setCouponApplied(true);
      setCouponDiscount(Math.round(subtotal * 0.1));
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-slate-300" />
            </div>
            <h1 className="text-2xl font-bold text-dark font-heading mb-2">Your cart is empty</h1>
            <p className="text-muted mb-6">Add some products to get started with your print order.</p>
            <Link href="/products">
              <Button variant="primary" size="lg">
                Browse Products <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Container>
        <div className="py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-dark font-medium">Shopping Cart</span>
          </nav>

          <h1 className="text-2xl font-bold text-dark font-heading mb-8">
            Shopping Cart
            <span className="text-muted font-normal text-lg ml-2">({items.length} item{items.length !== 1 ? 's' : ''})</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.product_id}-${item.material}-${item.size}-${item.finish}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white rounded-2xl border border-slate-100 p-5"
                  >
                    <div className="flex gap-5">
                      {/* Image */}
                      <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                        <Package className="w-8 h-8 text-slate-300" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-sm font-semibold text-dark truncate">{item.product_name}</h3>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-medium rounded">
                                {item.material}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-medium rounded">
                                {item.size}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-medium rounded">
                                {item.finish}
                              </span>
                            </div>
                          </div>
                          <p className="text-lg font-bold text-primary shrink-0">
                            {formatPrice(item.unit_price * item.quantity)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product_id, item.material, item.size, item.finish, item.quantity - 10)}
                              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.product_id, item.material, item.size, item.finish, parseInt(e.target.value) || 1)}
                              className="w-16 h-8 px-2 text-center text-sm font-semibold border border-slate-200 rounded-lg outline-none focus:border-primary"
                            />
                            <button
                              onClick={() => updateQuantity(item.product_id, item.material, item.size, item.finish, item.quantity + 10)}
                              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted">
                              {formatPrice(item.unit_price)}/pc
                            </span>
                            <button
                              onClick={() => removeItem(item.product_id, item.material, item.size, item.finish)}
                              className="p-2 text-slate-400 hover:text-red hover:bg-red/5 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4">
                <Link href="/products" className="text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-1">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-red hover:text-red-dark transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-24 space-y-5">
                <h2 className="text-lg font-bold text-dark font-heading">Order Summary</h2>

                {/* Coupon */}
                <div>
                  <label className="text-xs font-semibold text-dark mb-2 block">Coupon Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                      className="flex-1 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary disabled:opacity-50"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode}
                      className="px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50"
                    >
                      {couponApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-xs text-success mt-1.5 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Coupon applied! You save {formatPrice(couponDiscount)}
                    </p>
                  )}
                </div>

                {/* Summary */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Subtotal</span>
                    <span className="text-sm font-semibold text-dark">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Shipping</span>
                    <span className={`text-sm font-semibold ${shipping === 0 ? 'text-success' : 'text-dark'}`}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  {couponApplied && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">Discount</span>
                      <span className="text-sm font-semibold text-success">-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                    <span className="text-base font-semibold text-dark">Total</span>
                    <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="p-3 bg-success/5 rounded-xl border border-success/10">
                    <p className="text-xs text-success font-medium">
                      🚚 Add {formatPrice(5000 - subtotal)} more for FREE shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Link href="/checkout">
                  <Button variant="primary" size="lg" className="w-full">
                    <Lock className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <Shield className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[10px] text-muted">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <Truck className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[10px] text-muted">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[10px] text-muted">Order Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <Tag className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[10px] text-muted">Best Prices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
