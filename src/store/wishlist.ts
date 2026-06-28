import { create } from 'zustand';

interface WishlistState {
  productIds: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  productIds: [],

  addItem: (id) => {
    set((state) => ({
      productIds: [...state.productIds, id],
    }));
  },

  removeItem: (id) => {
    set((state) => ({
      productIds: state.productIds.filter((pid) => pid !== id),
    }));
  },

  hasItem: (id) => get().productIds.includes(id),
}));
