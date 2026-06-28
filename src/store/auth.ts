import { create } from 'zustand';
import type { Profile } from '@/types';

interface AuthState {
  user: Profile | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: Profile | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name: string; phone?: string }) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    set({ token });
    if (token) {
      localStorage.setItem('po_token', token);
    } else {
      localStorage.removeItem('po_token');
    }
  },

  login: async (email, password) => {
    const { authAPI } = await import('@/lib/api');
    const res = await authAPI.login(email, password);
    get().setToken(res.token);
    set({ user: res.user });
  },

  register: async (data) => {
    const { authAPI } = await import('@/lib/api');
    const res = await authAPI.register(data);
    get().setToken(res.token);
    set({ user: res.user });
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('po_token');
  },

  fetchUser: async () => {
    const token = get().token || localStorage.getItem('po_token');
    if (!token) {
      set({ isLoading: false });
      return;
    }
    try {
      const { authAPI } = await import('@/lib/api');
      const res = await authAPI.me(token);
      set({ user: res.user, token, isLoading: false });
    } catch {
      set({ user: null, token: null, isLoading: false });
      localStorage.removeItem('po_token');
    }
  },
}));
