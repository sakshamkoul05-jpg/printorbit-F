'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';

export function useAuth() {
  const { user, isLoading, fetchUser, login, register, logout } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, isLoading, isAuthenticated: !!user, login, register, logout };
}
