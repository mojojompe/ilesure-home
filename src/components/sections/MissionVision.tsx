import { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
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
    intensity: 6,
  },
  {
    id: 'vision',
    icon: Eye,
    eyebrow: 'Our Vision',
    title: 'The most trusted student housing platform in Africa',
    body: "We envision a future where any Nigerian university student, whether in Ibadan, Lagos, Abuja, or Port Harcourt, can find a verified, compatible, affordable home with one search. iléSure will be the home discovery layer for every student's university journey.",
    accent: '#5C3317',
    intensity: 8,
  },
];

function GlassTiltCard({ card, delay = 0 }: { card: typeof cards[0]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * card.intensity;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -card.intensity; // Invert Y
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); mouseX.set(0); mouseY.set(0); }}
        animate={{
          rotateY: hovered ? mouseX.get() : 0,
          rotateX: hovered ? mouseY.get() : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        className="h-full cursor-default"
      >
        <div className="relative glass-card rounded-clay p-8 h-full overflow-hidden flex flex-col gap-6 shadow-3d border-gradient-animate transition-all duration-300">
          {/* Shimmer on hover */}
          <div className={`absolute inset-0 anim-shimmer pointer-events-none transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

          {/* Large background 3D icon */}
          <motion.div
            className="absolute -right-6 -top-6 pointer-events-none opacity-[0.05]"
            style={{ translateZ: -20 }}
          >
            <card.icon size={180} strokeWidth={1} style={{ color: card.accent }} />
          </motion.div>

          {/* Top icon blob container */}
          <motion.div
            className="w-16 h-16 rounded-clay-sm flex items-center justify-center relative z-10"
            style={{
              background: `linear-gradient(135deg, ${card.accent}20 0%, ${card.accent}35 100%)`,
              boxShadow: `0 8px 20px ${card.accent}25, inset 0 1px 0 rgba(255,255,255,0.7)`,
            }}
            animate={hovered ? { translateZ: 20, rotate: [0, 5, -5, 0] } : { translateZ: 0, rotate: 0 }}
            transition={{ duration: 0.4 }}
          >
            <card.icon size={28} strokeWidth={1.8} style={{ color: 'white' }} />
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 relative z-10"
            animate={hovered ? { translateZ: 10 } : { translateZ: 0 }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: card.accent }}
            >
               {card.eyebrow}
            </span>
            <h3 className="text-xl font-extrabold text-white leading-snug">{card.title}</h3>
            <p className="text-sm text-[#fdf6e3] leading-relaxed">{card.body}</p>
          </motion.div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export function MissionVision() {
  return (
    <section id="mission" className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Background blobs for glassmorphism to show against */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-mustard-100/50 blur-[80px] pointer-events-none anim-parallax-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brown-200/30 blur-[80px] pointer-events-none anim-parallax-drift" style={{ animationDelay: '-5s' }} />

      {/* Floating Mission Illustration */}
      <img
        src="/illustrations/mission.png"
        alt=""
        aria-hidden
        className="absolute top-24 -left-16 w-56 h-auto anim-float pointer-events-none opacity-40 hidden lg:block"
        style={{ mixBlendMode: 'multiply' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Purpose"
            title="Why we built iléSure"
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {cards.map((card, i) => (
            <GlassTiltCard key={card.id} card={card} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
