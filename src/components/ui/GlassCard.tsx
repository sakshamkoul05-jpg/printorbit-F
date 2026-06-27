'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'primary';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function GlassCard({ children, className, variant = 'light', hover = true, padding = 'md' }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-400',
        {
          'glass': variant === 'light',
          'glass-dark': variant === 'dark',
          'bg-primary/10 backdrop-blur-xl border border-primary/20': variant === 'primary',
        },
        {
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        hover && 'hover:scale-[1.02] hover:shadow-xl cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
