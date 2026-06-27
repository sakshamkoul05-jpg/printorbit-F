import Link from 'next/link';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-printorbit-navy mb-8">Shopping Cart</h1>

      {/* Empty State */}
      <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
        <ShoppingCart className="w-16 h-16 text-printorbit-gray/30 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-printorbit-navy mb-2">Your cart is empty</h2>
        <p className="text-printorbit-gray mb-6">
          Browse our products and add items to your cart to get started.
        </p>
        <Link href="/products">
          <Button variant="primary">
            Browse Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
