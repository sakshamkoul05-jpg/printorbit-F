import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
  style?: React.CSSProperties;
}

export default function Container({ children, className, size = 'default', style }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-3 px-sm-4 px-lg-5',
        {
          'container': size === 'default',
          'container-narrow': size === 'narrow',
          'container-wide': size === 'wide',
        },
        className
      )}
      style={{
        maxWidth: size === 'narrow' ? '960px' : size === 'wide' ? '1400px' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
