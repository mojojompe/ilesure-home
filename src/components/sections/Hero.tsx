import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Shield } from 'lucide-react';
import { PillButton } from '../ui/PillButton';
import { WaitlistModal } from '../ui/WaitlistModal';
import { useNavigate } from 'react-router-dom';
import BlurText from '../ui/BlurText';

const neighborhoods = ['Toll Gate', 'Bodija', 'Soka', 'New Garage', 'Akala-Express'];

const rotatingTexts = [
  "Premium Real Estate",
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
        {/* ── Home texture overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='rgba(201,150,42,0.1)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E\")",
            backgroundSize: '40px 40px',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ── LEFT: MAGAZINE TYPOGRAPHY ── */}
          <div className="flex flex-col items-start text-left pt-10">
            {/* Rotating Text */}
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

            {/* Editorial Headline */}
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

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="mt-6 text-brown-light text-lg leading-relaxed max-w-md border-l border-brown-light/30 pl-4 italic" style={{ fontFamily: 'Georgia, serif' }}
            >
              Discover verified apartments and spaces tailored to your lifestyle.
              Transparent, trusted, and strictly premium.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-10 flex flex-wrap gap-4 items-center"
            >
              <motion.button
                onClick={() => setWaitlistOpen(true)}
                className="group relative px-8 py-4 bg-mustard text-white font-bold shadow-float-mustard text-sm uppercase tracking-wider"
                style={{ borderRadius: '2px' }}
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
                className="px-8 py-4 border-2 border-brown text-brown font-bold text-sm uppercase tracking-wider hover:bg-brown hover:text-white transition-colors duration-300"
                style={{ borderRadius: '2px' }}
              >
                Learn More
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT: DEPTH EFFECT ILLUSTRATION ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="relative w-full flex justify-center items-center mt-10 lg:mt-0"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md group"
            >
              {/* Back Frame (Depth) */}
              <div className="absolute inset-0 border-4 border-mustard/40 translate-x-6 translate-y-6 -z-10 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500" />
              
              {/* Back Solid Block */}
              <div className="absolute inset-0 bg-brown/5 translate-x-3 translate-y-3 -z-5 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />

              {/* Main Illustration Image with 3D Pop */}
              <div className="relative bg-white/40 p-4 backdrop-blur-sm border border-white/60 shadow-2xl overflow-visible">
                <img
                  src="/illustrations/hero.png"
                  alt="iléSure — verified premium housing platform"
                  className="w-full h-auto relative z-20"
                  style={{ 
                    mixBlendMode: 'multiply',
                    transform: 'translateZ(60px)',
                    filter: 'drop-shadow(15px 15px 25px rgba(0,0,0,0.2))'
                  }}
                />

                {/* Floating Magazine Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.45 }}
                  className="absolute -left-8 top-12 bg-brown text-white px-4 py-3 z-30 shadow-2xl"
                  style={{ transform: 'translateZ(80px)', borderRadius: '2px' }}
                >
                  <p className="text-[10px] uppercase tracking-widest text-mustard mb-1">Verified</p>
                  <p className="text-sm font-bold font-serif">Agent Approved</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
