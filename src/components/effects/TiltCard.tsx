import { useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({ children, className = '', intensity = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [`${-intensity}deg`, `${intensity}deg`]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [`${intensity}deg`, `${-intensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 rounded-clay-sm bg-gradient-to-br from-mustard/20 to-brown/20 opacity-0 blur-sm"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{ transform: 'translateZ(-20px)' }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
}
