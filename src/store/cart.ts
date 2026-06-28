import { create } from 'zustand';
import type { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, material: string, size: string, finish: string) => void;
  updateQuantity: (productId: string, material: string, size: string, finish: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    set((state) => {
      const existing = state.items.find(
        (i) =>
          i.product_id === item.product_id &&
          i.material === item.material &&
          i.size === item.size &&
          i.finish === item.finish
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    });
  },

  removeItem: (productId, material, size, finish) => {
    set((state) => ({
      items: state.items.filter(
        (i) =>
          !(
            i.product_id === productId &&
            i.material === material &&
            i.size === size &&
            i.finish === finish
          )
      ),
    }));
  },

  updateQuantity: (productId, material, size, finish, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, material, size, finish);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.product_id === productId &&
        i.material === material &&
        i.size === size &&
        i.finish === finish
          ? { ...i, quantity }
          : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => get().items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0),

  getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
