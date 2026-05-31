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
  highlightClass = "text-mustard",
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
        className="relative min-h-[85vh] flex items-center pt-28 pb-16 overflow-hidden"
        style={
          isDark
            ? { background: 'linear-gradient(160deg, #1a0d05 0%, #3D2210 45%, #0e0603 100%)' }
            : { background: 'radial-gradient(ellipse at 50% -10%, #FEF9EE 0%, #FDFAF3 35%, #FAFAF8 70%, #F7F6F2 100%)' }
        }
      >
        {/* Outline texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E\")",
            backgroundSize: '45px 45px',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* ── LEFT: MAGAZINE TYPOGRAPHY ── */}
          <div className="flex flex-col items-start text-left pt-6">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className={"inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase border-l-4 \`}
              >
                {eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className={"mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight \`}
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
              className={"mt-6 text-lg leading-relaxed max-w-md border-l border-opacity-30 pl-4 italic \`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {subtext}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-10 flex flex-wrap gap-4 items-center"
            >
              <motion.button
                onClick={() => handleCta(primaryCta)}
                className={"group px-8 py-4 font-bold text-sm uppercase tracking-widest flex items-center gap-2 transition-all duration-300 \`}
                style={{ borderRadius: '0px' }}
              >
                {primaryCta.label}
                <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {secondaryCta && (
                <motion.button
                  onClick={() => handleCta(secondaryCta)}
                  className={"px-8 py-4 font-bold text-sm uppercase tracking-widest border-2 transition-all duration-300 \`}
                  style={{ borderRadius: '0px' }}
                >
                  {secondaryCta.label}
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* ── RIGHT: DEPTH EFFECT ILLUSTRATION ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
            className="relative w-full flex justify-center mt-12 lg:mt-0"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: [5, -5, 5], rotateX: [-2, 2, -2] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md group"
            >
              {/* Offset Frames for Magazine Depth */}
              <div className={"absolute inset-0 border-4 translate-x-6 translate-y-6 -z-10 transition-transform duration-500 group-hover:translate-x-8 group-hover:translate-y-8 \`} />
              
              <div className={"absolute inset-0 translate-x-3 translate-y-3 -z-5 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4 \`} />

              <div className={"relative p-4 backdrop-blur-sm border shadow-2xl overflow-visible \`}>
                <img
                  src={illustration}
                  alt={illustrationAlt}
                  className="w-full h-auto relative z-20"
                  style={{ 
                    mixBlendMode: illustrationBlend ? 'multiply' : 'normal',
                    transform: 'translateZ(50px)',
                    filter: isDark ? 'drop-shadow(10px 10px 20px rgba(0,0,0,0.5))' : 'drop-shadow(10px 10px 20px rgba(0,0,0,0.15))'
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
