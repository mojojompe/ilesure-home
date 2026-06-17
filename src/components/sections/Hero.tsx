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
        className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% -10%, #FEF9EE 0%, #FDFAF3 35%, #FAFAF8 70%, #F7F6F2 100%)',
        }}
      >
        {/* Custom background grid pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-80 z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 39.5h40M39.5 0v40' stroke='rgba(201,150,42,0.08)' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
              backgroundPosition: 'center',
            }}
          />

        {/* ── CENTERED HERO COPY + CTAs ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Rotating eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="h-8 overflow-hidden relative flex items-center justify-center mb-6"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={textIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-mustard font-bold text-sm tracking-[0.2em] uppercase flex items-center"
                >
                  {rotatingTexts[textIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <h1 className="text-[11vw] sm:text-6xl md:text-[80px] lg:text-[96px] xl:text-[110px] font-black text-brown leading-[1.05] tracking-tighter py-4 text-center w-full" style={{ fontFamily: 'Georgia, serif' }}>
              <BlurText
                text="Find Your Sure Home Anywhere."
                delay={100}
                stepDuration={0.4}
                highlightWords={["Sure", "Home"]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-br from-[#F5C842] to-[#C9962A]"
                className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 w-full"
                animationFrom={{ filter: 'blur(12px)', opacity: 0, x: -50, y: 0 }}
                animationTo={[
                  { filter: 'blur(6px)', opacity: 0.5, x: -25, y: 0 },
                  { filter: 'blur(0px)', opacity: 1, x: 0, y: 0 }
                ]}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="mt-8 text-brown-light text-lg sm:text-xl leading-loose max-w-2xl italic mx-auto"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Discover verified apartments and spaces tailored to your lifestyle.
              Transparent, trusted, and strictly verified.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row gap-5 items-center justify-center w-full sm:w-auto"
            >
              <motion.button
                onClick={() => setWaitlistOpen(true)}
                className="w-full sm:w-auto group relative px-10 py-5 bg-mustard text-white font-bold shadow-float-mustard text-sm uppercase tracking-wider rounded-xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative flex items-center justify-center gap-2">
                  Get Started
                  <ChevronRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <button
                onClick={() => navigate('/discover')}
                className="w-full sm:w-auto px-10 py-5 border-2 border-brown text-brown font-bold text-sm uppercase tracking-wider hover:bg-brown hover:text-white transition-colors duration-300 rounded-xl"
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
