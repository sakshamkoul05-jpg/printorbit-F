'use client';

import { useState, useCallback } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debounce = useCallback(
    <V,>(fn: (v: V) => void, ms: number) => {
      let timer: ReturnType<typeof setTimeout>;
      return (v: V) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(v), ms);
      };
    },
    [delay]
  );

  const setter = useCallback(
    debounce((v: T) => setDebouncedValue(v), delay),
    [debounce]
  );

  // Sync external value changes
  useState(() => {
    setter(value);
  });

  return debouncedValue;
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ id: string; name: string; slug: string; image?: string; price?: number }[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const { productsAPI } = await import('@/lib/api');
      const res = await productsAPI.search(q);
      setResults(res.products || []);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  return { query, setQuery, results, isSearching, search };
}
