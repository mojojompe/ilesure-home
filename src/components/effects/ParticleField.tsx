import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${10 + Math.random() * 80}%`,
  delay: i * 0.4,
  duration: 4 + Math.random() * 4,
  size: 3 + Math.random() * 5,
  driftX: (Math.random() - 0.5) * 60,
  opacity: 0.4 + Math.random() * 0.5,
}));

export function ParticleField() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: p.x,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #F5C842, #C9962A)`,
          }}
          animate={{
            y: [0, -130, -200],
            x: [0, p.driftX * 0.5, p.driftX],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
