import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useRef } from 'react';
import { useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';

const stats = [
  {
    id: 'Users',
    img: '/illustrations/generated/trust_users.png',
    value: 30,
    suffix: '+',
    label: 'Users Helped',
    sub: 'Across Lead City corridors',
    color: '#C9962A',
    bg: 'linear-gradient(135deg, #FAF1CC 0%, #F5E099 100%)',
    delay: 0,
  },
  {
    id: 'listings',
    img: '/illustrations/generated/trust_listings.png',
    value: 10,
    suffix: '+',
    label: 'Active Listings',
    sub: 'Verified flats, self-cons & hostels',
    color: '#5C3317',
    bg: 'linear-gradient(135deg, #F2E8DF 0%, #DEBEBF 100%)',
    delay: 0.15,
  },
  {
    id: 'universities',
    img: '/illustrations/generated/trust_universities.png',
    value: 3,
    suffix: '+',
    label: 'Universities Served',
    sub: 'LCU · UI · Polytechnic & growing',
    color: '#C9962A',
    bg: 'linear-gradient(135deg, #FAF1CC 0%, #F5E099 100%)',
    delay: 0.30,
  },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 60, damping: 18 });
  const rounded = useTransform(spring, val => `${Math.round(val)}${suffix}`);

  if (isInView) count.set(target);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
      animate={isInView ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
      transition={{
        delay: stat.delay,
        duration: 0.7,
        type: 'spring',
        stiffness: 100,
        damping: 14,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '800px' }}
      className="cursor-default w-full"
    >
      <div
        className="flex flex-col items-center text-center p-8 gap-4 rounded-clay border border-cream-200 relative overflow-hidden spotlight-card transition-all duration-300 hover:shadow-3d-hover"
        style={{ background: 'white' }}
      >
        <div className="absolute inset-0 anim-shimmer opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <motion.div
          className="w-24 h-24 flex items-center justify-center flex-shrink-0 mb-2"
          animate={isInView ? { y: [0, -6, 0] } : {}}
          transition={{ delay: stat.delay + 0.4, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src={stat.img} alt={stat.label} className="w-full h-full object-contain drop-shadow-md" />
        </motion.div>

        <div>
          <p className="text-4xl font-extrabold leading-none anim-glow-pulse" style={{ color: stat.color }}>
            <CountUp target={stat.value} suffix={stat.suffix} />
          </p>
          <p className="text-base font-bold text-brown mt-1">{stat.label}</p>
          <p className="text-xs text-brown-light mt-1">{stat.sub}</p>
        </div>

        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full blur-lg pointer-events-none"
          style={{ background: `${stat.color}20` }}
        />
      </div>
    </motion.div>
  );
}

function MobileStatCard({ stat }: { stat: typeof stats[0] }) {
  return (
    <motion.div
      key={stat.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-4"
    >
      <div
        className="w-20 h-20 flex items-center justify-center flex-shrink-0 mb-2"
      >
        <img src={stat.img} alt={stat.label} className="w-full h-full object-contain drop-shadow-md" />
      </div>

      <div>
        <p className="text-4xl font-extrabold leading-none anim-glow-pulse" style={{ color: stat.color }}>
          {stat.value}{stat.suffix}
        </p>
        <p className="text-base font-bold text-brown mt-1">{stat.label}</p>
        <p className="text-xs text-brown-light mt-1">{stat.sub}</p>
      </div>
    </motion.div>
  );
}

export function Trust() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slideshow on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % stats.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="trust" className="py-16 bg-white relative overflow-hidden">
      {/* Floating Trust Illustration */}
      <img
        src="/illustrations/trust_v2.png"
        alt=""
        aria-hidden
        className="absolute -top-12 -right-4 w-52 h-auto anim-float pointer-events-none opacity-50"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Clay people decoration */}
      <img
        src="/illustrations/person_duo_celebrate.png"
        alt=""
        aria-hidden
        className="absolute bottom-0 left-4 w-40 h-auto anim-float-delayed pointer-events-none opacity-70 hidden lg:block"
        style={{ mixBlendMode: 'multiply' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-left mb-10 w-full">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard-50 border border-mustard-200 text-mustard text-xs font-bold uppercase tracking-widest">
             Trusted by Users
          </span>
        </ScrollReveal>

        {/* ── Desktop: 3-col grid ── */}
        <div
          className="hidden sm:grid grid-cols-3 gap-6"
          style={{ perspective: '800px' }}
        >
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* ── Mobile: content-switching card ── */}
        <div className="sm:hidden max-w-sm mx-auto">
          <div className="cursor-default w-full">
            <div className="flex flex-col items-center text-center p-8 gap-4 rounded-clay border border-cream-200 relative overflow-hidden spotlight-card bg-white transition-all duration-300 shadow-3d">
              <AnimatePresence mode="wait">
                <MobileStatCard stat={stats[currentIndex]} />
              </AnimatePresence>

              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full blur-lg pointer-events-none transition-all duration-300"
                style={{ background: `${stats[currentIndex].color}20` }}
              />
            </div>
          </div>

          {/* Clay pill pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {stats.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="rounded-pill transition-all duration-300 focus:outline-none"
                animate={{
                  width: i === currentIndex ? 28 : 8,
                  background: i === currentIndex ? '#C9962A' : '#E8D5B5',
                }}
                style={{ height: 8, borderRadius: 99 }}
                whileTap={{ scale: 0.85 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
