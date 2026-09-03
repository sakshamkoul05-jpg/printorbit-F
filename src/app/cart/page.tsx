'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Package,
  ChevronRight, CheckCircle, Shield, Truck,
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
    if (couponCode.toUpperCase() === 'PRINTSTOP10') {
      setCouponApplied(true);
      setCouponDiscount(Math.round(subtotal * 0.1));
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-muted-light" />
            </div>
            <h1 className="text-2xl font-bold text-dark mb-2">Your Cart is Empty</h1>
            <p className="text-sm text-muted mb-6">Add some products to get started with your print order.</p>
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
    <div className="min-h-screen bg-background">
      <Container>
        <div className="py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-dark font-medium">Shopping Cart</span>
          </nav>

          <h1 className="text-2xl font-bold text-dark mb-8">
            Shopping Cart
            <span className="text-muted font-normal text-lg ml-2">({items.length} item{items.length !== 1 ? 's' : ''})</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-warm-100 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-warm-50 border-b border-warm-100 text-xs font-semibold text-muted uppercase tracking-wide">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Table Rows */}
                {items.map((item) => (
                  <div
                    key={`${item.product_id}-${item.material}-${item.size}-${item.finish}`}
                    className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-warm-100 last:border-0 items-center"
                  >
                    {/* Product */}
                    <div className="col-span-6 flex items-center gap-3">
                      <div className="w-14 h-14 bg-warm-50 rounded-md flex items-center justify-center shrink-0">
                        <Package className="w-6 h-6 text-muted-light" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-dark truncate">{item.product_name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="text-[10px] text-muted">{item.material}</span>
                          <span className="text-[10px] text-muted">|</span>
                          <span className="text-[10px] text-muted">{item.size}</span>
                          <span className="text-[10px] text-muted">|</span>
                          <span className="text-[10px] text-muted">{item.finish}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex items-center justify-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.material, item.size, item.finish, item.quantity - 10)}
                        className="w-7 h-7 border border-warm-200 rounded flex items-center justify-center text-muted hover:text-primary hover:border-primary"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product_id, item.material, item.size, item.finish, parseInt(e.target.value) || 1)}
                        className="w-12 h-7 px-1 text-center text-xs font-semibold border border-warm-200 rounded outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => updateQuantity(item.product_id, item.material, item.size, item.finish, item.quantity + 10)}
                        className="w-7 h-7 border border-warm-200 rounded flex items-center justify-center text-muted hover:text-primary hover:border-primary"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-2 text-right text-sm text-muted">
                      {formatPrice(item.unit_price)}
                    </div>

                    {/* Total + Remove */}
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <span className="text-sm font-bold text-dark">{formatPrice(item.unit_price * item.quantity)}</span>
                      <button
                        onClick={() => removeItem(item.product_id, item.material, item.size, item.finish)}
                        className="p-1.5 text-muted hover:text-red rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4">
                <Link href="/products" className="text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-1">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-muted hover:text-red"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-warm-100 p-6 sticky top-24 space-y-5">
                <h2 className="text-lg font-bold text-dark">Order Summary</h2>

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
                      className="flex-1 px-3 py-2 bg-background rounded-md border border-warm-200 text-sm outline-none focus:border-primary disabled:opacity-50"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode}
                      className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-dark disabled:opacity-50"
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

                {/* Summary Lines */}
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
                  <div className="border-t border-warm-100 pt-3 flex items-center justify-between">
                    <span className="text-base font-semibold text-dark">Total</span>
                    <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="p-3 bg-primary-50 rounded-md border border-primary-100">
                    <p className="text-xs text-primary font-medium">
                      Add {formatPrice(5000 - subtotal)} more for FREE shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Link href="/checkout">
                  <Button variant="primary" size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 p-2 bg-warm-50 rounded-md">
                    <Shield className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[10px] text-muted">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-warm-50 rounded-md">
                    <Truck className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[10px] text-muted">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-warm-50 rounded-md">
                    <Tag className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[10px] text-muted">Best Prices</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-warm-50 rounded-md">
                    <Package className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[10px] text-muted">Quality Print</span>
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
