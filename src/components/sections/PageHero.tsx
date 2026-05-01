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
}

export function PageHero({
  eyebrow,
  headline,
  highlightWords = [],
  highlightClass = "text-gradient-mustard",
  subtext,
  illustration,
  illustrationAlt,
  primaryCta,
  secondaryCta,
  theme = 'light',
  illustrationBlend = false,
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
        className="relative min-h-[88vh] flex flex-col items-center pt-28 pb-0 overflow-hidden"
        style={
          isDark
            ? { background: 'linear-gradient(160deg, #1a0d05 0%, #3D2210 45%, #0e0603 100%)' }
            : {
                background: 'radial-gradient(ellipse at 50% -10%, #FEF9EE 0%, #FDFAF3 35%, #FAFAF8 70%, #F7F6F2 100%)',
              }
        }
      >
        {/* Home outline texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='${isDark ? 'rgba(245,200,66,0.06)' : 'rgba(201,150,42,0.08)'}' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E")`,
            backgroundSize: '88px 88px',
            backgroundPosition: 'center',
          }}
        />

        {/* Glow blobs */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[100px] pointer-events-none z-0"
          style={{ background: isDark ? 'rgba(201,150,42,0.12)' : 'rgba(201,150,42,0.07)' }}
        />

        <div className="relative z-10 w-full flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-pill text-xs font-bold tracking-widest border ${
                isDark
                  ? 'bg-mustard/15 border-mustard/30 text-mustard'
                  : 'bg-mustard-50 border-mustard-200 text-mustard-dark'
              }`}
            >
              {eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            className={`mt-5 text-4xl sm:text-5xl lg:text-[62px] font-extrabold leading-[1.08] tracking-tight max-w-3xl py-10 ${
              isDark ? 'text-white' : 'text-brown'
            }`}
          >
            <BlurText
              text={headline}
              delay={80}
              stepDuration={0.3}
              highlightWords={highlightWords}
              highlightClass={highlightClass}
              className="justify-center"
            />
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`mt-4 text-lg leading-relaxed max-w-2xl ${
              isDark ? 'text-cream/70' : 'text-brown-light'
            }`}
          >
            {subtext}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-7 flex flex-wrap gap-3 items-center justify-center"
          >
            {/* Primary */}
            <motion.button
              onClick={() => handleCta(primaryCta)}
              className={`group px-7 py-3.5 rounded-pill font-bold text-sm flex items-center gap-2 ${
                isDark
                  ? 'bg-gradient-to-r from-mustard-light to-mustard text-brown shadow-float-mustard'
                  : 'bg-mustard text-white shadow-float-mustard'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              {primaryCta.label}
              <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Secondary */}
            {secondaryCta && (
              <motion.button
                onClick={() => handleCta(secondaryCta)}
                className={`px-7 py-3.5 rounded-pill font-bold text-sm border-2 transition-all duration-200 ${
                  isDark
                    ? 'border-white/30 text-white/80 hover:border-white/60 hover:text-white'
                    : 'border-brown/30 text-brown hover:border-brown/60'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {secondaryCta.label}
              </motion.button>
            )}
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
            className="relative w-full max-w-md mt-10 mx-auto"
          >
            <motion.img
              src={illustration}
              alt={illustrationAlt}
              className="w-full h-auto drop-shadow-2xl relative z-10"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={illustrationBlend ? { mixBlendMode: 'multiply' } : undefined}
            />
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-2xl pointer-events-none z-0"
              style={{ background: 'radial-gradient(ellipse, rgba(201,150,42,0.18) 0%, transparent 70%)' }}
            />
          </motion.div>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
