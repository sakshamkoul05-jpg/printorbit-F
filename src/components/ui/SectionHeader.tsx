'use client';

import { motion } from 'motion/react';
import Badge from './Badge';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleGradient?: boolean;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({ badge, title, titleGradient = false, description, align = 'center', className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      {badge && (
        <Badge variant="primary" size="md" className="mb-3">
          {badge}
        </Badge>
      )}
      <h2 className={`fs-2 fs-md-1 fw-bold font-heading text-dark mb-3 ${titleGradient ? 'gradient-text' : ''}`}>
        {title}
      </h2>
      {description && (
        <p className="text-muted mx-auto fs-5" style={{ maxWidth: '640px' }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
