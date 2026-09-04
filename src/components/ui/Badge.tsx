import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'dark' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  style?: React.CSSProperties;
}

export default function Badge({ children, variant = 'primary', size = 'sm', className, style }: BadgeProps) {
  return (
    <span
      className={cn(
        'd-inline-flex align-items-center fw-medium',
        {
          'bg-primary text-primary': variant === 'primary',
          'bg-accent text-accent': variant === 'accent',
          'bg-success text-success': variant === 'success',
          'bg-dark text-white': variant === 'dark',
          'border border-slate-200 text-slate-600': variant === 'outline',
        },
        {
          'px-2 py-1 rounded-pill': size === 'sm',
          'px-3 py-1 rounded-pill': size === 'md',
        },
        className
      )}
      style={{
        fontSize: size === 'sm' ? '10px' : '0.75rem',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
