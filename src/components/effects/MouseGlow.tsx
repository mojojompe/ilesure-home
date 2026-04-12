import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MouseGlow() {
  const glowX = useMotionValue(-100);
  const glowY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);
  
  const springConfig = { damping: 15, stiffness: 100 };
  const glowXSpring = useSpring(glowX, springConfig);
  const glowYSpring = useSpring(glowY, springConfig);

  useEffect(() => {
    const moveGlow = (e: MouseEvent) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      setIsVisible(true);
    };

    const hideGlow = () => setIsVisible(false);

    window.addEventListener('mousemove', moveGlow);
    window.addEventListener('mouseleave', hideGlow);

    return () => {
      window.removeEventListener('mousemove', moveGlow);
      window.removeEventListener('mouseleave', hideGlow);
    };
  }, [glowX, glowY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[1] hidden md:block"
      style={{ x: glowXSpring, y: glowYSpring }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      initial={{ opacity: 0 }}
    >
      <div
        className="w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, var(--color-mustard) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </motion.div>
  );
}
