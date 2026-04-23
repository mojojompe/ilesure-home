import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MouseGlow() {
  const glowX = useMotionValue(-200);
  const glowY = useMotionValue(-200);
  const trailX = useMotionValue(-200);
  const trailY = useMotionValue(-200);

  const springFast = { damping: 20, stiffness: 200 };
  const springSlow = { damping: 30, stiffness: 80 };

  const glowXSpring = useSpring(glowX, springFast);
  const glowYSpring = useSpring(glowY, springFast);
  const trailXSpring = useSpring(trailX, springSlow);
  const trailYSpring = useSpring(trailY, springSlow);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [glowX, glowY, trailX, trailY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] hidden md:block">
      {/* Primary glow — mustard */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: glowXSpring, y: glowYSpring }}
      >
        <div
          className="w-[480px] h-[480px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,150,42,0.12) 0%, rgba(245,200,66,0.06) 40%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* Trail glow — brown, delayed */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: trailXSpring, y: trailYSpring }}
      >
        <div
          className="w-[280px] h-[280px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(92,51,23,0.08) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>
    </div>
  );
}
