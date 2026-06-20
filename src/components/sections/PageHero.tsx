import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WaitlistModal } from '../ui/WaitlistModal';
import { useState } from 'react';
import BlurText from '../ui/BlurText';

interface CtaConfig {
  label: string;
  href?: string;
  anchor?: string;
  onClick?: () => void;
  variant?: 'mustard' | 'outline' | 'white';
}

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  highlightWords?: string[];
  highlightClass?: string;
  subtext: string;
  illustration: string;
  illustrationAlt: string;
  primaryCta: CtaConfig;
  secondaryCta?: CtaConfig;
  theme?: 'light' | 'dark';
  illustrationBlend?: boolean;
  bottomMockup?: string;
  bottomMockupAlt?: string;
  bottomMockupMaxWidth?: string;
}

export function PageHero({
  eyebrow,
  headline,
  highlightWords = [],
  highlightClass = "text-mustard",
  subtext,
  illustration,
  illustrationAlt,
  primaryCta,
  secondaryCta,
  theme = 'light',
  illustrationBlend = false,
  bottomMockup,
  bottomMockupAlt,
  bottomMockupMaxWidth,
}: PageHeroProps) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const handleCta = (cta: CtaConfig) => {
    if (cta.onClick) { cta.onClick(); return; }
    if (cta.href) { navigate(cta.href); }
    if (cta.anchor) {
      const el = document.querySelector(cta.anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        className={`relative min-h-[85vh] flex flex-col pt-28 overflow-hidden ${bottomMockup ? 'pb-0' : 'pb-16 justify-center'}`}
        style={
          isDark
            ? { background: 'linear-gradient(160deg, #1a0d05 0%, #3D2210 45%, #0e0603 100%)' }
            : { background: 'radial-gradient(ellipse at 50% -10%, #FEF9EE 0%, #FDFAF3 35%, #FAFAF8 70%, #F7F6F2 100%)' }
        }
      >
        {/* Outline texture */}
        <div className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 39.5h40M39.5 0v40' stroke='${isDark ? 'rgba(245,200,66,0.06)' : 'rgba(201,150,42,0.06)'}' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center',
          }}
        />

        <div className={`relative flex-grow flex items-center w-full ${bottomMockup ? 'mb-8 lg:mb-12' : ''}`}>
          {/* ── SPLIT LAYOUT RIGHT HALF ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: 'easeOut' }}
            className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center justify-end z-0 pointer-events-none"
            style={{ width: '65%' }}
          >
            {/* Depth layer — warm colour glow behind image */}
            <div
              className="absolute inset-0"
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse 80% 70% at 70% 50%, rgba(201,150,42,0.10) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse 80% 70% at 70% 50%, rgba(201,150,42,0.12) 0%, transparent 70%)',
              }}
            />
            {/* Ground shadow cast */}
            <div
              className="absolute bottom-[10%] right-[8%] w-[70%] h-[35%] rounded-full"
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse, rgba(201,150,42,0.15) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse, rgba(92,51,23,0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
                transform: 'scaleX(1.3)',
              }}
            />
            {/* The illustration itself */}
            <motion.img
              src={illustration}
              alt={illustrationAlt}
              className="relative w-full h-auto object-contain"
              style={{
                mixBlendMode: illustrationBlend || !isDark ? 'multiply' : 'normal',
                opacity: isDark ? 0.9 : 1,
                filter: isDark
                  ? 'drop-shadow(0px 40px 60px rgba(0,0,0,0.45)) drop-shadow(0px 10px 20px rgba(0,0,0,0.3))'
                  : 'drop-shadow(0px 40px 60px rgba(0,0,0,0.14)) drop-shadow(0px 10px 20px rgba(0,0,0,0.09))',
                maxHeight: '90vh',
                maxWidth: '100%',
                paddingRight: '2rem',
              }}
              
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* ── CONTENT CONTAINER ── */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex">
            
            {/* TEXT & CTAS */}
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-16 xl:px-24">
              <div className="max-w-lg">

              {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase border-l-4 ${
                  isDark
                    ? 'border-mustard text-mustard bg-mustard/10'
                    : 'border-brown text-brown bg-brown/5'
                }`}
              >
                {eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className={`mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight ${
                isDark ? 'text-white' : 'text-brown'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <BlurText
                text={headline}
                delay={80}
                stepDuration={0.3}
                highlightWords={highlightWords}
                highlightClass={highlightClass}
                className="justify-start"
              />
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={`mt-6 text-lg leading-relaxed max-w-md border-l border-opacity-30 pl-4 italic ${
                isDark ? 'text-cream/70 border-cream' : 'text-brown-light border-brown-light'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {subtext}
            </motion.p>

            {/* CTAs — all rounded-xl */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-10 flex flex-wrap gap-4 items-center"
            >
              <motion.button
                onClick={() => handleCta(primaryCta)}
                className={`group px-8 py-4 font-bold text-sm uppercase tracking-widest flex items-center gap-2 transition-all duration-300 rounded-xl ${
                  isDark
                    ? 'bg-mustard text-brown shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[2px] hover:translate-y-[2px]'
                    : 'bg-brown text-white shadow-[4px_4px_0px_0px_rgba(201,150,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(201,150,42,1)] hover:translate-x-[2px] hover:translate-y-[2px]'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {primaryCta.label}
                <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {secondaryCta && (
                <motion.button
                  onClick={() => handleCta(secondaryCta)}
                  className={`px-8 py-4 font-bold text-sm uppercase tracking-widest border-2 transition-all duration-300 rounded-xl ${
                    isDark
                      ? 'border-white/30 text-white hover:bg-white hover:text-brown'
                      : 'border-brown text-brown hover:bg-brown hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {secondaryCta.label}
                </motion.button>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        </div>

        {/* ── BOTTOM MOCKUP ── */}
        {bottomMockup && (
          <div className="w-full relative z-10 flex justify-center pb-0 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full flex justify-center"
              style={{ maxWidth: bottomMockupMaxWidth || '1000px' }}
            >
              {/* Soft glow behind the mockup */}
              <div className="absolute inset-0 bg-mustard/10 blur-[100px] rounded-full scale-[0.8] translate-y-10" />
              
              <img
                src={bottomMockup}
                alt={bottomMockupAlt || 'Dashboard Mockup'}
                className="relative w-full h-auto object-contain object-bottom"
                style={{
                  filter: isDark
                    ? 'drop-shadow(0px 30px 60px rgba(0,0,0,0.6))'
                    : 'drop-shadow(0px 30px 60px rgba(0,0,0,0.15))',
                }}
              />
            </motion.div>
          </div>
        )}
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
