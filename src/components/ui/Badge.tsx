import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'dark' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'primary', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        {
          'bg-primary/10 text-primary': variant === 'primary',
          'bg-accent/10 text-accent': variant === 'accent',
          'bg-success/10 text-success': variant === 'success',
          'bg-dark text-white': variant === 'dark',
          'border border-slate-200 text-slate-600': variant === 'outline',
        },
        {
          'text-[10px] px-2 py-0.5 rounded-full': size === 'sm',
          'text-xs px-3 py-1 rounded-full': size === 'md',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
