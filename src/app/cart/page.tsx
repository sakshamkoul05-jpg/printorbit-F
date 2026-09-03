'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart, Trash2, Plus, Minus, ChevronRight, Package,
  Info, CheckCircle, Shield, Truck, Tag, TruckIcon,
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

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
      <div className="min-h-screen" style={{ backgroundColor: '#F4F2EF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
              <ShoppingCart className="w-12 h-12" style={{ color: '#D1D5DB' }} />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#0F0F0F' }}>Your Cart is Empty</h1>
            <p className="text-sm mb-6" style={{ color: '#6B7280' }}>Add some products to get started with your print order.</p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: '#ED1C24' }}
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F2EF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: '#6B7280' }}>
          <Link href="/" className="hover:underline" style={{ color: '#ED1C24' }}>Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-medium" style={{ color: '#0F0F0F' }}>Your Cart</span>
        </nav>

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-8" style={{ color: '#0F0F0F' }}>
          My Cart
          <span className="font-normal text-lg ml-2" style={{ color: '#6B7280' }}>
            ({items.length} item{items.length !== 1 ? 's' : ''})
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6" style={{ border: '1px solid #E5E5E5' }}>
              {items.map((item, index) => (
                <div
                  key={`${item.product_id}-${item.material}-${item.size}-${item.finish}`}
                  className="flex gap-4 pb-6 mb-6"
                  style={{ borderBottom: index < items.length - 1 ? '1px solid #E5E5E5' : 'none' }}
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
                    {item.product_image ? (
                      <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-8 h-8" style={{ color: '#D1D5DB' }} />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold truncate" style={{ color: '#0F0F0F' }}>
                          {item.product_name}
                        </h3>
                        <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                          Brand: PrintOrbit
                        </p>
                        {item.customization_notes && (
                          <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                            Customization: {item.customization_notes}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs" style={{ color: '#6B7280' }}>Size: {item.size}</span>
                          <span className="text-xs" style={{ color: '#6B7280' }}>|</span>
                          <span className="text-xs" style={{ color: '#6B7280' }}>Material: {item.material}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product_id, item.material, item.size, item.finish)}
                        className="p-1 flex-shrink-0"
                        style={{ color: '#9CA3AF' }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center" style={{ border: '1px solid #E5E5E5' }}>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.material, item.size, item.finish, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center"
                          style={{ color: '#6B7280' }}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center text-sm font-semibold" style={{ color: '#0F0F0F', borderLeft: '1px solid #E5E5E5', borderRight: '1px solid #E5E5E5' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.material, item.size, item.finish, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center"
                          style={{ color: '#6B7280' }}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-bold" style={{ color: '#0F0F0F' }}>
                          {formatPrice(item.unit_price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Special Instructions */}
              <div className="mt-4">
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: '#ED1C24' }}
                >
                  <Info className="w-4 h-4" />
                  Special Instructions
                </button>
                {showInstructions && (
                  <textarea
                    placeholder="Add any special instructions for your order..."
                    className="w-full mt-3 p-3 text-sm"
                    rows={3}
                    style={{ border: '1px solid #E5E5E5', outline: 'none' }}
                  />
                )}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: '#ED1C24' }}
              >
                <Minus className="w-4 h-4 rotate-90" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* RIGHT - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sticky top-24" style={{ border: '1px solid #E5E5E5' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0F0F0F' }}>Total Order Value</h2>

              {/* Summary Lines */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#6B7280' }}>Product Value</span>
                  <span className="text-sm font-semibold" style={{ color: '#0F0F0F' }}>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#6B7280' }}>Discount</span>
                    <span className="text-sm font-semibold" style={{ color: '#10B981' }}>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#6B7280' }}>Delivery</span>
                  <span className="text-sm font-semibold" style={{ color: shipping === 0 ? '#10B981' : '#0F0F0F' }}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-4" style={{ borderTop: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5' }}>
                <span className="text-base font-bold" style={{ color: '#0F0F0F' }}>Total</span>
                <span className="text-xl font-bold" style={{ color: '#ED1C24' }}>{formatPrice(total)}</span>
              </div>

              {/* Coupon Section */}
              <div className="mt-4 mb-4">
                <label className="text-xs font-semibold mb-2 block" style={{ color: '#0F0F0F' }}>Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    className="flex-1 px-3 py-2 text-sm"
                    style={{ border: '1px solid #E5E5E5', outline: 'none', backgroundColor: couponApplied ? '#F9FAFB' : '#FFFFFF' }}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !couponCode}
                    className="px-4 py-2 text-sm font-semibold text-white"
                    style={{ backgroundColor: couponApplied ? '#10B981' : '#ED1C24', opacity: couponApplied || !couponCode ? 0.5 : 1 }}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs mt-2 flex items-center gap-1" style={{ color: '#10B981' }}>
                    <CheckCircle className="w-3 h-3" />
                    Coupon applied! You save {formatPrice(couponDiscount)}
                  </p>
                )}
              </div>

              {/* Important Points */}
              <div className="mb-4" style={{ borderTop: '1px solid #E5E5E5', paddingTop: '16px' }}>
                <button className="flex items-center gap-2 text-sm font-semibold w-full" style={{ color: '#0F0F0F' }}>
                  <Info className="w-4 h-4" style={{ color: '#6B7280' }} />
                  Important Points
                </button>
                <ul className="mt-2 space-y-1">
                  <li className="text-xs flex items-start gap-2" style={{ color: '#6B7280' }}>
                    <span className="mt-1">•</span>
                    Free shipping on orders above ₹5000
                  </li>
                  <li className="text-xs flex items-start gap-2" style={{ color: '#6B7280' }}>
                    <span className="mt-1">•</span>
                    Delivery within 5-7 business days
                  </li>
                  <li className="text-xs flex items-start gap-2" style={{ color: '#6B7280' }}>
                    <span className="mt-1">•</span>
                    Bulk orders may take additional time
                  </li>
                </ul>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="block w-full py-3 text-center text-sm font-semibold text-white"
                style={{ backgroundColor: '#ED1C24' }}
              >
                Checkout
              </Link>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2 p-2" style={{ backgroundColor: '#F3F4F6' }}>
                  <Shield className="w-4 h-4 flex-shrink-0" style={{ color: '#ED1C24' }} />
                  <span className="text-[10px]" style={{ color: '#6B7280' }}>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 p-2" style={{ backgroundColor: '#F3F4F6' }}>
                  <TruckIcon className="w-4 h-4 flex-shrink-0" style={{ color: '#ED1C24' }} />
                  <span className="text-[10px]" style={{ color: '#6B7280' }}>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 p-2" style={{ backgroundColor: '#F3F4F6' }}>
                  <Tag className="w-4 h-4 flex-shrink-0" style={{ color: '#ED1C24' }} />
                  <span className="text-[10px]" style={{ color: '#6B7280' }}>Best Prices</span>
                </div>
                <div className="flex items-center gap-2 p-2" style={{ backgroundColor: '#F3F4F6' }}>
                  <Package className="w-4 h-4 flex-shrink-0" style={{ color: '#ED1C24' }} />
                  <span className="text-[10px]" style={{ color: '#6B7280' }}>Quality Print</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
