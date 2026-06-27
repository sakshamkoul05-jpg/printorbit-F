'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, icon, iconPosition = 'left', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed magnetic-btn',
          {
            'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30': variant === 'primary',
            'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-300': variant === 'secondary',
            'border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary focus:ring-primary/20': variant === 'outline',
            'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300': variant === 'ghost',
            'bg-accent text-white hover:bg-accent-dark focus:ring-accent shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30': variant === 'accent',
            'bg-dark text-white hover:bg-dark-light focus:ring-dark shadow-lg': variant === 'dark',
          },
          {
            'text-xs px-3 py-2 gap-1.5 rounded-lg': size === 'sm',
            'text-sm px-4 py-2.5 gap-2 rounded-xl': size === 'md',
            'text-sm px-6 py-3 gap-2 rounded-xl': size === 'lg',
            'text-base px-8 py-4 gap-2.5 rounded-xl': size === 'xl',
          },
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!isLoading && icon && iconPosition === 'left' && icon}
        {children}
        {!isLoading && icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
