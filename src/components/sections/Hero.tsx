import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { WaitlistModal } from '../ui/WaitlistModal';
import { useNavigate } from 'react-router-dom';
import BlurText from '../ui/BlurText';
import { useTranslation } from 'react-i18next';

const rotatingTexts = [
  "Verified Real Estate",
  "Ilé Rẹ Tó Dájú",
  "Tabbataccen Gidanka",
  "Ezigbo Ụlọ Gị"
];

export function Hero() {
  const { t } = useTranslation();
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
        className="relative min-h-screen flex flex-col items-center pt-24 pb-0 overflow-hidden"
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

        {/* ── HERO COPY + MOCKUP ── */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between pt-4 sm:pt-8 flex-grow">
          {/* Top - Text */}
          <div className="w-full max-w-5xl flex flex-col items-center text-center">
            {/* Rotating eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="h-8 overflow-hidden relative flex items-center justify-center mb-6 w-full"
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

            <h1 className="text-[10vw] sm:text-6xl md:text-[80px] lg:text-[80px] xl:text-[80px] font-black text-brown leading-[1.05] tracking-tighter py-4 text-center w-full" style={{ fontFamily: 'Georgia, serif' }}>
              <BlurText
                text={t('Find Your Sure Home Anywhere.')}
                delay={100}
                stepDuration={0.4}
                highlightWords={[t('Sure_highlight'), t('Home_highlight')]}
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
              {t('Discover verified apartments and spaces tailored to your lifestyle. Transparent, trusted, and strictly verified.')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row gap-5 items-center justify-center w-full sm:w-auto"
            >
              <motion.button
                onClick={() => setWaitlistOpen(true)}
                className="w-full sm:w-auto group relative px-10 py-5 bg-brown text-white font-bold shadow-float-mustard text-sm uppercase tracking-wider rounded-3xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative flex items-center justify-center gap-2">
                  {t('Get the App')}
                  <ChevronRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <button
                onClick={() => navigate('/discover')}
                className="w-full sm:w-auto px-10 py-5 border-2 border-brown text-brown font-bold text-sm uppercase tracking-wider hover:bg-brown hover:text-white transition-colors duration-300 rounded-3xl"
              >
                {t('Learn More')}
              </button>
            </motion.div>
          </div>

          {/* Bottom - Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            className="w-full flex justify-center relative mt-16 lg:mt-24 items-end flex-grow"
          >
            {/* Soft Glow Behind Mockup */}
            <div className="absolute inset-0 bg-mustard/15 blur-[100px] rounded-full scale-75 transform translate-y-10" />
            
            <img
              src="/mockups/Home_Hero.png"
              alt="iléSure App Dashboard Mockup"
              className="relative w-full max-w-[800px] h-auto object-contain object-bottom drop-shadow-[0_40px_60px_rgba(92,51,23,0.15)]"
            />
          </motion.div>
        </div>



      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
