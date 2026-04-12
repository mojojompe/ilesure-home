import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ClayCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function ClayCard({ children, className = '', hover = true, onClick }: ClayCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -6, scale: 1.01 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`clay-card ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
