import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Cart</span>
      <h1 className="text-4xl font-bold text-white mb-10">Shopping Cart</h1>

      <div className="card-3d rounded-3xl p-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-10 h-10 text-gold/30" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-3">Your cart is empty</h2>
        <p className="text-white-dim mb-8 max-w-md mx-auto">
          Explore our premium collection and add items to your cart.
        </p>
        <Link href="/products">
          <Button variant="primary">
            Explore Collection
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
