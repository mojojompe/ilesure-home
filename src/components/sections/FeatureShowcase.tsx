import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue } from 'framer-motion';
import { Search, Map, ShieldCheck, KeyRound } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ScrollReveal } from '../ui/ScrollReveal';

const features = [
  {
    id: 'discover',
    icon: Search,
    title: 'Discover your perfect space',
    desc: 'Browse hundreds of verified off-destination apartments, self-cons, and hostels near your university, updated daily.',
    image: '/illustrations/person_search.png',
  },
  {
    id: 'map',
    icon: Map,
    title: 'Explore the neighborhood map',
    desc: 'View properties interactively. Filter by distance to your destination gate, security setup, and proximity to major roads.',
    image: '/illustrations/map_preview.png',
  },
  {
    id: 'verify',
    icon: ShieldCheck,
    title: '100% verified agents only',
    desc: 'Every listing is tied to a vetted and approved agent. Say goodbye to housing scams and inflated phantom fees.',
    image: '/illustrations/trust_v2.png',
  },
  {
    id: 'book',
    icon: KeyRound,
    title: 'Book and move in safely',
    desc: 'Reserve your space securely through the platform. Pick up your keys with confidence, knowing your money is safe.',
    image: '/illustrations/person_move_in.png',
  },
];

function SpotlightCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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
      className={`relative bg-white rounded-[2rem] border border-black/5 shadow-clay overflow-hidden cursor-default transition-shadow duration-300 ${hovered ? 'shadow-3d-hover' : ''} ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 rounded-[2rem]"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${spotPos.x} ${spotPos.y}, rgba(201,150,42,0.10), transparent 60%)`,
        }}
      />
      {hovered && <div className="absolute inset-0 anim-shimmer pointer-events-none z-0 opacity-60" />}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

export function FeatureShowcase() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16">
            <SectionHeading 
              eyebrow="Experience" 
              title="Everything built into one seamless experience" 
              subtitle="A smarter, safer way to find your next home."
            />
          </div>
        </ScrollReveal>

        {/* ── Desktop: Bento Grid (Long text cards, small image cards) ── */}
        <div className="hidden sm:grid grid-cols-3 gap-6">
          {features.map((feature, i) => {
            // Alternate layout: text left, image right OR image left, text right
            const isTextLeft = i % 2 === 0;

            const textCard = (
              <SpotlightCard key={`${feature.id}-text`} delay={i * 0.1} className="col-span-2 flex flex-col justify-center p-10 h-full group">
                <div className="w-16 h-16 rounded-2xl bg-mustard-50 flex items-center justify-center mb-8 text-mustard group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={32} strokeWidth={2} />
                </div>
                <h3 className="text-3xl font-bold text-brown mb-4">{feature.title}</h3>
                <p className="text-lg text-brown-light leading-relaxed max-w-xl">{feature.desc}</p>
              </SpotlightCard>
            );

            const imageCard = (
              <motion.div 
                key={`${feature.id}-img`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="col-span-1 h-full flex items-center justify-center p-6"
              >
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-auto max-h-72 object-contain drop-shadow-2xl hover:-translate-y-4 hover:scale-105 transition-all duration-500"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </motion.div>
            );

            return isTextLeft ? (
              <React.Fragment key={feature.id}>
                {textCard}
                {imageCard}
              </React.Fragment>
            ) : (
              <React.Fragment key={feature.id}>
                {imageCard}
                {textCard}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Mobile: Vertical Sticky Overlap Stack ── */}
        <div className="sm:hidden mt-10 flex flex-col relative pb-20">
          {features.map((feature, i) => {
            return (
              <div
                key={feature.id}
                className="sticky w-full bg-white rounded-[2rem] border border-black/5 p-8 flex flex-col gap-6"
                style={{
                  top: `calc(7rem + ${i * 14}px)`,
                  marginTop: i === 0 ? '0' : '2.5rem',
                  zIndex: i + 10,
                  boxShadow: '0 -10px 40px -10px rgba(0,0,0,0.05), 0 10px 20px -5px rgba(0,0,0,0.03)',
                  transformOrigin: 'top center',
                }}
              >
                {/* Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-mustard uppercase tracking-widest bg-mustard-50 px-3 py-1.5 rounded-md">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-mustard-50 flex items-center justify-center text-mustard">
                    <feature.icon size={24} strokeWidth={2} />
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 relative z-20">
                  <h3 className="text-2xl font-bold text-brown leading-tight tracking-tight">{feature.title}</h3>
                  <p className="text-base text-brown-light leading-relaxed">{feature.desc}</p>
                </div>

                <div className="mt-4 w-full h-48 flex items-center justify-center">
                  <img src={feature.image} alt={feature.title} className="h-full w-auto object-contain p-2 drop-shadow-xl" style={{ mixBlendMode: 'multiply' }} />
                </div>

                {/* Subtle top shading gradient to separate overlapped cards */}
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/5 to-transparent pointer-events-none rounded-t-[2rem] opacity-40" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
