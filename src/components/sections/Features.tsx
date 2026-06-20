import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { features } from '../../data/features';
import { useTranslation } from 'react-i18next';

// Bento grid layout pattern
const bentoPattern = [
  { span: 2 },
  { span: 1 },
  { span: 1 },
  { span: 1 },
  { span: 2 },
  { span: 1 },
];

function SpotlightCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const [spotPos, setSpotPos] = useState({ x: '50%', y: '50%' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotPos({ x: `${x}%`, y: `${y}%` });
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.01 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mouseX.set(0); mouseY.set(0); }}
      className={`relative bg-white rounded-clay border border-black/5 shadow-clay overflow-hidden cursor-default transition-shadow duration-300 ${hovered ? 'shadow-3d-hover' : ''} ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 rounded-clay"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${spotPos.x} ${spotPos.y}, rgba(201,150,42,0.10), transparent 60%)`,
        }}
      />
      {hovered && <div className="absolute inset-0 anim-shimmer pointer-events-none z-0 opacity-60" />}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function Features() {
  const { t } = useTranslation();
  return (
    <section id="features" className="py-32 relative"
      style={{ background: 'radial-gradient(ellipse at 20% 80%, #FFFDF7 0%, #FDF6E3 80%, #FAF1CC 100%)' }}
    >
      {/* Container specifically to clip background overflow if necessary */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating illustrations — desktop only */}
        <img src="/illustrations/features.png" alt="Features Illustration 1" loading="lazy" width={256} height={256}
          className="absolute bottom-10 -left-12 w-64 h-auto  opacity-40 hidden lg:block"
          style={{ mixBlendMode: 'multiply' }}
        />
        <img src="/illustrations/features_2.png" alt="Features Illustration 2" loading="lazy" width={192} height={192}
          className="absolute top-20 right-4 w-48 h-auto  opacity-50 hidden lg:block"
          style={{ mixBlendMode: 'multiply' }}
        />
        <img src="/illustrations/person_search.png" alt="Person searching for housing" loading="lazy" width={192} height={192}
          className="absolute bottom-0 right-8 w-48 h-auto  opacity-80 hidden xl:block"
          style={{ mixBlendMode: 'multiply' }}
        />
        <img src="/illustrations/person_female_key.png" alt="Female person with house key" loading="lazy" width={144} height={144}
          className="absolute bottom-1/4 left-1/3 w-36 h-auto  opacity-60 hidden xl:block"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t('Features')}
            title={t('Everything you need to find your perfect space')}
            subtitle={t("iléSure goes beyond a listing board, it's a full ecosystem built around the real problems Users face finding off-destination housing in Nigeria.")}
            align="center"
          />
        </ScrollReveal>

        {/* ── Desktop: Bento Grid ── */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {features.map((feature, i) => {
            const pattern = bentoPattern[i % bentoPattern.length];
            return (
              <SpotlightCard
                key={feature.id}
                delay={i * 0.07}
                className={`flex flex-col gap-5 p-7 h-full ${pattern.span === 2 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
              >
                <motion.div
                  className="w-16 h-16 flex-shrink-0"
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                >
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-contain drop-shadow-sm" />
                </motion.div>
                <div className="flex flex-col gap-2 relative z-10">
                  <h3 className="text-xl font-bold text-brown tracking-tight">{t(feature.title)}</h3>
                  <p className="text-sm text-brown-light leading-loose">{t(feature.description)}</p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* ── Mobile: Vertical Sticky Overlap Stack ── */}
        <div className="sm:hidden mt-10 flex flex-col relative pb-20">
          {features.map((feature, i) => {
            return (
              <div
                key={feature.id}
                className="sticky w-full bg-white rounded-clay border border-black/5 p-6 flex flex-col gap-4"
                style={{
                  top: `calc(7rem + ${i * 14}px)`,
                  marginTop: i === 0 ? '0' : '2.5rem',
                  zIndex: i + 10,
                  boxShadow: '0 -10px 40px -10px rgba(0,0,0,0.05), 0 10px 20px -5px rgba(0,0,0,0.03)',
                  transformOrigin: 'top center',
                }}
              >
                {/* Number Eyebrow */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-mustard uppercase tracking-widest bg-mustard-50 px-2 py-1 rounded-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-14 h-14 flex-shrink-0">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 relative z-20">
                  <h3 className="text-xl font-bold text-brown leading-tight tracking-tight">{t(feature.title)}</h3>
                  <p className="text-[15px] text-brown-light leading-loose">{t(feature.description)}</p>
                </div>

                {/* Subtle top shading gradient to separate overlapped cards */}
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/5 to-transparent pointer-events-none rounded-t-clay opacity-40" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
