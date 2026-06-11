import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { WaitlistModal } from '../ui/WaitlistModal';
import { useNavigate } from 'react-router-dom';
import BlurText from '../ui/BlurText';

const rotatingTexts = [
  "Verified Real Estate",
  "Ilé Rẹ Tó Dájú",
  "Tabbataccen Gidanka",
  "Ezigbo Ụlọ Gị"
];

export function Hero() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% -10%, #FEF9EE 0%, #FDFAF3 35%, #FAFAF8 70%, #F7F6F2 100%)',
        }}
      >
        {/* Subtle home-icon grid watermark */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='rgba(201,150,42,0.1)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center',
          }}
        />

        {/* ── RIGHT HALF: full-bleed illustration (desktop only) ── */}
        {/* Sits directly on the section background — no box, no border */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
          className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center justify-end z-0"
          style={{ width: '50%' }}
        >
          {/* Depth layer 3 — deepest shadow blob */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 70% 50%, rgba(201,150,42,0.12) 0%, transparent 70%)',
            }}
          />
          {/* Depth layer 2 — mid shadow cast beneath image */}
          <div
            className="absolute bottom-[10%] right-[8%] w-[70%] h-[40%] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(92,51,23,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              transform: 'scaleX(1.3)',
            }}
          />
          {/* Illustration — no wrapper box */}
          <motion.img
            src="/illustrations/hero.png"
            alt="iléSure — Verified housing platform"
            className="relative w-full h-auto object-contain"
            style={{
              filter: 'drop-shadow(0px 40px 60px rgba(0,0,0,0.18)) drop-shadow(0px 10px 20px rgba(0,0,0,0.12))',
              maxHeight: '88vh',
              paddingRight: '2rem',
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Verified badge — floats over the image */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.45 }}
            className="absolute left-[8%] top-[28%] bg-brown text-white px-4 py-3 z-30 shadow-2xl rounded-xl"
          >
            <p className="text-[10px] uppercase tracking-widest text-mustard mb-1">iléSure</p>
            <p className="text-sm font-bold font-serif">Verified Listing</p>
          </motion.div>
        </motion.div>

        {/* ── LEFT: copy + CTAs ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="max-w-lg">
            {/* Rotating eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="h-6 overflow-hidden relative flex items-center justify-start mb-4 border-l-2 border-mustard pl-3"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={textIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-mustard font-bold text-xs tracking-[0.2em] uppercase flex items-center"
                >
                  {rotatingTexts[textIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black text-brown leading-[1.05] tracking-tight py-4" style={{ fontFamily: 'Georgia, serif' }}>
              <BlurText
                text="Find Your"
                delay={80}
                stepDuration={0.3}
                highlightWords={[]}
                className="justify-start"
              />
              <span className="block text-transparent bg-clip-text mt-1" style={{ backgroundImage: 'linear-gradient(135deg, #F5C842 0%, #C9962A 100%)' }}>
                Sure Home
              </span>
              <span className="block mt-1">Anywhere.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="mt-6 text-brown-light text-lg leading-relaxed max-w-md border-l border-brown-light/30 pl-4 italic"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Discover verified apartments and spaces tailored to your lifestyle.
              Transparent, trusted, and strictly verified.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-10 flex flex-wrap gap-4 items-center"
            >
              <motion.button
                onClick={() => setWaitlistOpen(true)}
                className="group relative px-8 py-4 bg-mustard text-white font-bold shadow-float-mustard text-sm uppercase tracking-wider rounded-xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative flex items-center gap-2">
                  Find Your Space
                  <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <button
                onClick={() => navigate('/discover')}
                className="px-8 py-4 border-2 border-brown text-brown font-bold text-sm uppercase tracking-wider hover:bg-brown hover:text-white transition-colors duration-300 rounded-xl"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>



      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
