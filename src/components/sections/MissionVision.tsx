import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';

const cards = [
  {
    id: 'mission',
    icon: Target,
    eyebrow: 'Our Mission',
    title: 'Eliminate housing insecurity for Nigerian students',
    body: 'We exist to replace the informal, chaotic off-campus housing market with a transparent, trustworthy, and data-rich platform, starting with Ibadan and scaling across Nigeria. Every student deserves to find a safe, verified home without risking their money or their peace of mind.',
    accent: '#C9962A',
    illustration: '/illustrations/trust.png',
  },
  {
    id: 'vision',
    icon: Eye,
    eyebrow: 'Our Vision',
    title: 'The most trusted student housing platform in Africa',
    body: "We envision a future where any Nigerian university student, whether in Ibadan, Lagos, Abuja, or Port Harcourt, can find a verified, compatible, affordable home with one search. iléSure will be the home discovery layer for every student's university journey.",
    accent: '#5C3317',
    illustration: '/illustrations/mission.png',
  },
];

function MissionVisionContent() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const card = cards[activeIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative bg-white rounded-clay-lg p-10 lg:p-14 shadow-clay border border-mustard-100/50 flex flex-col gap-8 min-h-[420px] lg:min-h-[480px]">
        <div className="absolute inset-0 rounded-clay-lg overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-mustard-50/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brown-100/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 flex items-start justify-between gap-6">
          <motion.div
            key={`icon-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-18 h-18 lg:w-20 lg:h-20 rounded-clay flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${card.accent}15 0%, ${card.accent}30 100%)`,
              boxShadow: `0 10px 30px ${card.accent}30`,
            }}
          >
            <card.icon size={36} strokeWidth={1.8} style={{ color: card.accent }} />
          </motion.div>

          <div className="flex gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-8 bg-mustard' : 'bg-brown-200'
                }`}
                aria-label={`View ${cards[i].eyebrow}`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-5 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: card.accent }}
              >
                {card.eyebrow}
              </span>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-brown leading-tight">{card.title}</h3>
              <p className="text-base text-brown-light leading-relaxed">{card.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 pointer-events-none">
          <img
            src={card.illustration}
            alt=""
            className="w-24 h-24 lg:w-32 lg:h-32 object-contain opacity-60"
          />
        </div>
      </div>
    </div>
  );
}

function GlassTiltCard({ card }: { card: typeof cards[0] }) {
  const accent = card.accent;
  return (
    <ScrollReveal delay={card.id === 'mission' ? 0 : 0.15}>
      <div className="relative bg-white rounded-clay p-8 h-full shadow-clay border border-mustard-100/50 flex flex-col gap-6">
        <div className="absolute inset-0 rounded-clay overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl"
            style={{ background: `${accent}15`, translate: '50% -50%' }}
          />
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          <div
            className="w-12 h-12 rounded-clay-sm flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${accent}15 0%, ${accent}30 100%)`,
            }}
          >
            <card.icon size={24} strokeWidth={1.8} style={{ color: accent }} />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
            {card.eyebrow}
          </span>
          <h3 className="text-lg font-extrabold text-brown leading-snug">{card.title}</h3>
          <p className="text-sm text-brown-light leading-relaxed">{card.body}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function MissionVision() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <section id="mission" className="py-24 bg-cream-50 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-mustard-100/50 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brown-200/30 blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading eyebrow="Purpose" title="Why we built iléSure" align="center" />
        </ScrollReveal>

        <div className="mt-14">
          {isDesktop ? (
            <MissionVisionContent />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cards.map((card) => (
                <GlassTiltCard key={card.id} card={card} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}