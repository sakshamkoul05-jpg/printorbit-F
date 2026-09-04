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
          'd-inline-flex align-items-center justify-content-center fw-semibold transition-all disabled-opacity-50 magnetic-btn',
          {
            'bg-primary text-white shadow-lg': variant === 'primary',
            'bg-slate-100 text-slate-700': variant === 'secondary',
            'border border-2 border-slate-200 text-slate-700': variant === 'outline',
            'text-slate-600': variant === 'ghost',
            'bg-accent text-white shadow-lg': variant === 'accent',
            'bg-dark text-white shadow-lg': variant === 'dark',
          },
          {
            'px-3 py-2 gap-1 rounded-3 text-nowrap': size === 'sm',
            'px-4 py-2 gap-2 rounded-4 text-nowrap': size === 'md',
            'px-5 py-3 gap-2 rounded-4 text-nowrap': size === 'lg' || size === 'xl',
          },
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="spinner-border spinner-border-sm" fill="none" viewBox="0 0 24 24">
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
