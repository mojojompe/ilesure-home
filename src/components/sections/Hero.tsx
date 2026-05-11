import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Shield } from 'lucide-react';
import { PillButton } from '../ui/PillButton';
import { WaitlistModal } from '../ui/WaitlistModal';
import { useNavigate } from 'react-router-dom';
import BlurText from '../ui/BlurText';

const neighborhoods = ['Toll Gate', 'Bodija', 'Soka', 'New Garage', 'Akala-Express'];

const rotatingTexts = [
  "Your Sure Home",
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
        className="relative min-h-screen flex flex-col items-center pt-24 pb-0 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% -10%, #FEF9EE 0%, #FDFAF3 35%, #FAFAF8 70%, #F7F6F2 100%)',
        }}
      >
        {/* ── Home texture overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='rgba(201,150,42,0.1)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center',
          }}
        />

        {/* ── Soft radial glow blobs ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-mustard/6 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute -bottom-20 left-0 w-80 h-80 bg-brown/4 rounded-full blur-[80px] pointer-events-none z-0" />
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-mustard/5 rounded-full blur-[80px] pointer-events-none z-0" />

        {/* ── CONTENT ── */}
        <div className="relative z-10 w-full flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">

          {/* Rotating Text (No background) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.45 }}
            className="h-8 overflow-hidden relative flex items-center justify-center mb-2"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-brown font-extrabold text-sm tracking-widest uppercase flex items-center gap-2"
              >
                {rotatingTexts[textIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Heading — BlurText */}
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-brown leading-tight tracking-tight max-w-4xl py-10">
            <BlurText
              text="Find Your Sure Home Near Campus"
              delay={80}
              stepDuration={0.3}
              highlightWords={['Sure', 'Home']}
              highlightClass="text-gradient-mustard"
              className="justify-center"
            />
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="mt-4 text-brown-light text-base sm:text-lg leading-relaxed max-w-lg"
          >
            Find verified apartments, your perfect space or roommate, near you.
            Transparent, trusted, and stress-free.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-6 flex flex-wrap gap-3 items-center justify-center"
          >
            <motion.button
              onClick={() => setWaitlistOpen(true)}
              className="group relative px-7 py-3.5 rounded-pill bg-mustard text-white font-bold shadow-float-mustard text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative flex items-center gap-2">
                Find Your Space
                <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            <PillButton
              variant="outline-brown"
              size="md"
              onClick={() => navigate('/discover')}
            >
              Learn More
            </PillButton>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
          >
            <div className="flex items-center gap-1.5 text-sm text-brown-light">
              <Shield size={14} className="text-mustard" strokeWidth={2} />
              <span>All agents verified</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-brown-light/30 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-sm text-brown-light">
              <MapPin size={14} className="text-mustard" strokeWidth={2} />
              <span className="hidden sm:inline">{neighborhoods.join(' · ')}</span>
              <span className="sm:hidden">Ibadan, Nigeria</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-brown-light/30 hidden sm:block" />
            <div className="flex -space-x-2 items-center">
              {['JE', 'RK', 'AA', 'OB'].map((init, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: i % 2 === 0 ? '#C9962A' : '#5C3317' }}
                >
                  {init}
                </div>
              ))}
              <span className="ml-2.5 text-sm text-brown-light px-2">50+ students</span>
            </div>
          </motion.div>

          {/* ── ILLUSTRATION ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="relative w-full max-w-md mt-10 mx-auto"
          >
            {/* Floating badge — left */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.45 }}
              className="absolute -left-4 sm:left-2 top-8 bg-white rounded-clay shadow-clay px-3 py-2.5 z-20 flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-clay-sm bg-mustard-50 flex items-center justify-center flex-shrink-0">
                <Shield size={14} className="text-mustard" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-brown leading-none">Verified</p>
                <p className="text-[10px] text-brown-light mt-0.5">Agent Approved</p>
              </div>
            </motion.div>

            {/* Floating badge — right */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.65, duration: 0.45 }}
              className="absolute -right-4 sm:right-2 top-8 bg-white rounded-clay shadow-clay px-3 py-2.5 z-20"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <p className="text-[11px] font-bold text-brown">5 mins from LCU</p>
              </div>
              <p className="text-[10px] text-brown-light mt-0.5">₦350,000/yr · 1-bed</p>
            </motion.div>

            
            {/* Illustration — hero.png with multiply blend to strip background */}
            <motion.img
              src="/illustrations/hero.png"
              alt="iléSure — verified student housing platform"
              className="w-full h-auto relative z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ mixBlendMode: 'multiply' }}
            />

            {/* Glow beneath illustration */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-2xl pointer-events-none z-0"
              style={{ background: 'radial-gradient(ellipse, rgba(201,150,42,0.18) 0%, transparent 70%)' }}
            />
          </motion.div>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
