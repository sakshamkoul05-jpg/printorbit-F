import { create } from 'zustand';

interface UIState {
  searchOpen: boolean;
  cartOpen: boolean;
  quickViewProduct: string | null;
  setSearchOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setQuickViewProduct: (id: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchOpen: false,
  cartOpen: false,
  quickViewProduct: null,

  setSearchOpen: (open) => set({ searchOpen: open }),
  setCartOpen: (open) => set({ cartOpen: open }),
  setQuickViewProduct: (id) => set({ quickViewProduct: id }),
}));
