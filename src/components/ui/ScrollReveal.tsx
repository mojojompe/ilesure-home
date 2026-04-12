import { type ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.55,
  className = '',
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 28 : 0,
      x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
