import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Shield, Star, Sparkles } from 'lucide-react';
import { PillButton } from '../ui/PillButton';
import { WaitlistModal } from '../ui/WaitlistModal';
import { TypewriterText } from '../effects/TypewriterText';
import { useMagnetic } from '../../hooks/useMagnetic';

export function Hero() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const magneticRef = useRef<HTMLButtonElement>(null);
  const setMagneticRef = useMagnetic({ strength: 0.3 });

  useEffect(() => {
    if (magneticRef.current) {
      setMagneticRef(magneticRef.current);
    }
  }, [setMagneticRef]);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-hero-grad"
      >
        {/* Static blobs */}
        <div className="section-blob w-96 h-96 bg-mustard top-0 right-0 translate-x-1/3 -translate-y-1/4" />
        <div className="section-blob w-72 h-72 bg-brown-light bottom-0 left-0 -translate-x-1/4 translate-y-1/4" />
        <div className="section-blob w-48 h-48 bg-mustard-light top-1/2 left-1/4" style={{ opacity: 0.10 }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left — Content */}
            <div className="flex flex-col gap-6">
              {/* Badge pill */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard-50 border border-mustard-200 text-mustard-dark text-xs font-bold tracking-widest">
                  Student Housing, Reimagined
                </span>
              </motion.div>

              {/* Heading with typewriter effect */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold text-brown leading-[1.08] tracking-tight"
              >
                <TypewriterText 
                  text="Find Your" 
                  className="block"
                />
                <span className="block text-gradient-mustard">
                  <TypewriterText 
                    text="Safe Home" 
                    delay={0.6}
                  />
                </span>
                <TypewriterText 
                  text="Near Campus" 
                  className="block"
                  delay={1.2}
                />
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="text-brown-light text-lg leading-relaxed max-w-lg"
              >
                Verified apartments near Lead City University. Find your perfect space or your perfect roommate — with transparency, trust, and zero stress.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.6 }}
                className="flex flex-wrap gap-3 items-center"
              >
                <motion.button
                  ref={magneticRef}
                  onClick={() => setWaitlistOpen(true)}
                  className="group relative px-8 py-4 rounded-pill bg-mustard text-white font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative flex items-center gap-2">
                    Find Your Space
                    <ChevronRight 
                      size={18} 
                      strokeWidth={2.5} 
                      className="group-hover:translate-x-1 transition-transform" 
                    />
                  </span>
                </motion.button>
                <PillButton
                  variant="outline-brown"
                  size="lg"
                  onClick={() => {
                    const el = document.querySelector('#how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </PillButton>
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <div className="flex items-center gap-2 text-sm text-brown-light">
                  <Shield size={15} className="text-mustard" strokeWidth={2} />
                  <span>All agents verified</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-brown-light/40" />
                <div className="flex items-center gap-2 text-sm text-brown-light">
                  <MapPin size={15} className="text-mustard" strokeWidth={2} />
                  <span>Toll Gate · Oba Otudeko · Bodija</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-brown-light/40" />
                <div className="flex -space-x-2 items-center">
                  {['AO','TF','NE','EC'].map((init, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: i % 2 === 0 ? '#C9962A' : '#5C3317' }}
                    >
                      {init}
                    </div>
                  ))}
                  <span className="ml-3 text-sm text-brown-light px-3">50+ students</span>
                </div>
              </motion.div>
            </div>

            {/* Right — Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
              className="flex items-center justify-center relative"
            >
              <div className="relative w-full max-w-lg">
                <div className="relative z-10">
                  <img
                    src="/illustrations/hero.png"
                    alt="3D claymorphic illustration of a house with students and map pins"
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="absolute -left-4 top-1/4 bg-white rounded-clay shadow-clay px-4 py-3"
                >
                  <div className="w-9 h-9 rounded-clay-sm bg-mustard-50 flex items-center justify-center">
                    <Shield size={18} className="text-mustard" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brown">Verified</p>
                    <p className="text-[11px] text-brown-light">Agent Approved</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -right-4 bottom-1/3 bg-white rounded-clay shadow-clay px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <p className="text-xs font-bold text-brown">5 mins from LCU</p>
                  </div>
                  <p className="text-[11px] text-brown-light mt-0.5">₦350,000/yr · 1-bed</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
