import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="text-2xl font-bold text-navy mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-8 h-8 text-slate-300" />
        </div>
        <h2 className="text-lg font-semibold text-navy mb-2">Your cart is empty</h2>
        <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
          Explore our collection and add items to your cart.
        </p>
        <Link href="/products">
          <Button variant="primary">
            Explore Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
