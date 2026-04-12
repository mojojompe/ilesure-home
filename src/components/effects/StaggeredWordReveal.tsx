import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StaggeredWordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  staggerDelay?: number;
}

export function StaggeredWordReveal({ 
  text, 
  className = '',
  wordClassName = '',
  staggerDelay = 0.05 
}: StaggeredWordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: index * staggerDelay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}
