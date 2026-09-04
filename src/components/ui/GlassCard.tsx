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
        'rounded-4 transition-all',
        {
          'glass': variant === 'light',
          'glass-dark': variant === 'dark',
          'bg-primary border border-primary': variant === 'primary',
        },
        {
          'p-3': padding === 'sm',
          'p-4': padding === 'md',
          'p-5': padding === 'lg',
        },
        hover && 'cursor-pointer',
        className
      )}
      style={{
        backdropFilter: variant === 'primary' ? 'blur(24px)' : undefined,
        backgroundColor: variant === 'primary' ? 'rgba(var(--bs-primary-rgb), 0.1)' : undefined,
        borderColor: variant === 'primary' ? 'rgba(var(--bs-primary-rgb), 0.2)' : undefined,
        transitionDuration: '400ms',
      }}
    >
      {children}
    </div>
  );
}
