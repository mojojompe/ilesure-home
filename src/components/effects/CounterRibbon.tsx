import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterRibbonProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon?: React.ReactNode;
}

export function CounterRibbon({ 
  value, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  label,
  icon 
}: CounterRibbonProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="relative bg-white rounded-clay shadow-clay-sm p-6 overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-mustard/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={isInView ? { x: '100%' } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        
        <div className="relative flex flex-col items-center text-center gap-3">
          {icon && (
            <div className="w-12 h-12 rounded-clay-sm bg-mustard/10 flex items-center justify-center text-mustard">
              {icon}
            </div>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-brown">
              {prefix}{count.toLocaleString()}{suffix}
            </span>
            <motion.span
              className="text-lg text-mustard"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            >
              +
            </motion.span>
          </div>
          <p className="text-sm font-semibold text-brown-light">{label}</p>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-mustard/30 rounded-tl-clay-sm" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-mustard/30 rounded-tr-clay-sm" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-mustard/30 rounded-bl-clay-sm" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-mustard/30 rounded-br-clay-sm" />
      </div>
    </motion.div>
  );
}
