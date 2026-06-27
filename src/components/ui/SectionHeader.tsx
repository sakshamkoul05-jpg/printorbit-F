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
        <Badge variant="primary" size="md" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold font-heading text-dark mb-4 ${titleGradient ? 'gradient-text' : ''}`}>
        {title}
      </h2>
      {description && (
        <p className="text-muted max-w-2xl mx-auto text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
