import { useRef, useState, type ElementType } from 'react';
import { motion, useInView, useMotionValue } from 'framer-motion';
import {
  Search, Users, ShieldCheck, MapPin, ClipboardList, Lock,
} from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { features } from '../../data/features';

const iconMap: Record<string, ElementType> = {
  Search, Users, ShieldCheck, MapPin, ClipboardList, Lock,
};

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
      className={`relative bg-white rounded-clay border border-cream-200 shadow-clay overflow-hidden cursor-default transition-shadow duration-300 ${hovered ? 'shadow-3d-hover' : ''} ${className}`}
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
  return (
    <section id="features" className="py-24 relative"
      style={{ background: 'radial-gradient(ellipse at 20% 80%, #FFFDF7 0%, #FDF6E3 80%, #FAF1CC 100%)' }}
    >
      {/* Container specifically to clip background overflow if necessary */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating illustrations — desktop only */}
        <img src="/illustrations/features.png" alt="" aria-hidden
          className="absolute bottom-10 -left-12 w-64 h-auto anim-float-delayed opacity-40 hidden lg:block"
          style={{ mixBlendMode: 'multiply' }}
        />
        <img src="/illustrations/features_2.png" alt="" aria-hidden
          className="absolute top-20 right-4 w-48 h-auto anim-float opacity-50 hidden lg:block"
          style={{ mixBlendMode: 'multiply' }}
        />
        <img src="/illustrations/person_search.png" alt="" aria-hidden
          className="absolute bottom-0 right-8 w-48 h-auto anim-float opacity-80 hidden xl:block"
          style={{ mixBlendMode: 'multiply' }}
        />
        <img src="/illustrations/person_female_key.png" alt="" aria-hidden
          className="absolute bottom-1/4 left-1/3 w-36 h-auto anim-float opacity-60 hidden xl:block"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to find your perfect space"
            subtitle="iléSure goes beyond a listing board — it's a full ecosystem built around the real problems students face finding off-campus housing in Ibadan."
            align="center"
          />
        </ScrollReveal>

        {/* ── Desktop: Bento Grid ── */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Search;
            const pattern = bentoPattern[i % bentoPattern.length];
            return (
              <SpotlightCard
                key={feature.id}
                delay={i * 0.07}
                className={`flex flex-col gap-5 p-7 h-full ${pattern.span === 2 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
              >
                <motion.div
                  className="icon-blob w-14 h-14 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #F5C842 0%, #C9962A 100%)', boxShadow: '0 8px 20px rgba(201,150,42,0.3)', transformStyle: 'preserve-3d' }}
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <Icon size={24} className="text-white" strokeWidth={2} />
                </motion.div>
                <div className="flex flex-col gap-2 relative z-10">
                  <h3 className="text-base font-bold text-brown">{feature.title}</h3>
                  <p className="text-sm text-brown-light leading-relaxed">{feature.description}</p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* ── Mobile: Vertical Sticky Overlap Stack ── */}
        <div className="sm:hidden mt-10 flex flex-col relative pb-20">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Search;
            
            return (
              <div
                key={feature.id}
                className="sticky w-full bg-white rounded-clay border border-cream-200 p-6 flex flex-col gap-4"
                style={{
                  top: `calc(7rem + ${i * 14}px)`,
                  marginTop: i === 0 ? '0' : '2.5rem',
                  zIndex: i + 10,
                  boxShadow: '0 -10px 40px -10px rgba(0,0,0,0.08), 0 10px 20px -5px rgba(0,0,0,0.05)',
                  transformOrigin: 'top center',
                }}
              >
                {/* Number Eyebrow */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-mustard uppercase tracking-widest bg-mustard-50 px-2 py-1 rounded-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="w-12 h-12 rounded-clay-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #F5C842 0%, #C9962A 100%)', boxShadow: '0 4px 10px rgba(201,150,42,0.2)' }}
                  >
                    <Icon size={20} className="text-white" strokeWidth={2} />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 relative z-20">
                  <h3 className="text-xl font-bold text-brown leading-tight">{feature.title}</h3>
                  <p className="text-[15px] text-brown-light leading-relaxed">{feature.description}</p>
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
