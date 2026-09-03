'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useCartStore } from '@/store/cart';
import type { CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, material: string, size: string, finish: string, quantity: number) => void;
  removeFromCart: (productId: string, material: string, size: string, finish: string) => void;
  getTotal: () => number;
  getItemCount: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const store = useCartStore();

  const value: CartContextType = {
    items: store.items,
    addToCart: store.addItem,
    updateQuantity: store.updateQuantity,
    removeFromCart: store.removeItem,
    getTotal: store.getTotal,
    getItemCount: store.getItemCount,
    clearCart: store.clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
