import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor, BarChart3, Users, Building2, ChevronRight,
  Shield, Zap, Star, Globe,
} from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

/* ── Feature pills orbiting the dashboard visual ── */
const orbitChips = [
  { label: 'Live Analytics', icon: BarChart3, color: '#C9962A', angle: -40,  radius: 150 },
  { label: 'Multi-listing',  icon: Building2, color: '#c9962a', angle:  55,  radius: 165 },
  { label: 'Team Access',    icon: Users,     color: '#C9962A', angle: 155,  radius: 140 },
];

/* ── Capability cards ── */
const capabilities = [
  {
    icon: Building2,
    title: 'List & Manage Properties',
    description: 'Upload unlimited listings, control availability, and showcase units with rich media galleries.',
  },
  {
    icon: Users,
    title: 'Agent & Company Profiles',
    description: 'Build a verified professional profile that students trust and landlords rely on.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Track views, inquiries, and conversion rates across all your listings in one dashboard.',
  },
  {
    icon: Shield,
    title: 'Verified & Secure',
    description: 'All accounts go through our KYC process so every deal stays safe and legitimate.',
  },
];

export function WebApp() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = capabilities.length;

  /* Auto-advance every 1.5 s */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % totalCards;
        const el = carouselRef.current;
        if (el) {
          el.scrollTo({ left: next * el.offsetWidth, behavior: 'smooth' });
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [totalCards]);
  return (
    <section id="web-app" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="rounded-clay-lg overflow-hidden relative"
          style={{
            background:
              'linear-gradient(135deg, #1a0d05 0%, #3D2210 45%, #0e0603 100%)',
          }}
        >
          {/* ── Decorative blobs ── */}
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-mustard/10 -translate-x-1/3 -translate-y-1/3 blur-3xl anim-parallax-drift" />
          <div
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-mustard/15 translate-x-1/3 translate-y-1/2 blur-3xl anim-parallax-drift"
            style={{ animationDelay: '-7s' }}
          />

          {/* ── Diagonal stripe overlay ── */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #F5C842 0px, #F5C842 1px, transparent 0px, transparent 50%)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* ── Corner glow accent ── */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(201,150,42,0.18) 0%, transparent 70%)',
              transform: 'translate(30%, -30%)',
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-10 md:p-16">

            {/* ════════════════════════════════════
                LEFT — Text + CTA
            ════════════════════════════════════ */}
            <div className="flex flex-col gap-8">
              <ScrollReveal direction="left">
                <div className="flex flex-col gap-4">
                  {/* Badge */}
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard/15 border border-mustard/30 text-mustard text-xs font-bold uppercase tracking-widest w-fit">
                    <Globe size={12} strokeWidth={2.5} />
                    For Agents/Landlords & Companies
                  </span>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    A powerful platform{' '}
                    <span
                      className="text-transparent bg-clip-text"
                      style={{
                        backgroundImage:
                          'linear-gradient(135deg, #F5C842 0%, #C9962A 100%)',
                      }}
                    >
                      built for pros
                    </span>
                  </h2>

                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'rgba(253,246,227,0.70)' }}
                  >
                    Agents, landlords, and real-estate companies now have a
                    dedicated web dashboard to list properties, manage inquiries,
                    and grow their portfolio — all from one place.
                  </p>
                </div>
              </ScrollReveal>

              {/* ── Capability cards — carousel on mobile, grid on sm+ ── */}
              <ScrollReveal direction="left" delay={0.12}>
                {/* Mobile carousel */}
                <div className="block sm:hidden">
                  <div
                    ref={carouselRef}
                    className="flex overflow-x-hidden snap-x snap-mandatory no-scrollbar"
                  >
                    {capabilities.map(({ icon: Icon, title, description }, i) => (
                      <div
                        key={title}
                        className="flex-shrink-0 w-full snap-center flex flex-col gap-3 p-4 rounded-clay-sm"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.10)',
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, rgba(245,200,66,0.25) 0%, rgba(201,150,42,0.15) 100%)',
                            border: '1px solid rgba(201,150,42,0.3)',
                          }}
                        >
                          <Icon size={16} color="#F5C842" strokeWidth={2} />
                        </div>
                        <p className="text-sm font-bold text-white leading-snug">{title}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,246,227,0.55)' }}>
                          {description}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Dot indicators */}
                  <div className="flex justify-center gap-1.5 mt-3">
                    {capabilities.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const el = carouselRef.current;
                          if (el) el.scrollTo({ left: i * el.offsetWidth, behavior: 'smooth' });
                          setActiveIndex(i);
                        }}
                        className="rounded-full transition-all duration-500"
                        style={{
                          width: activeIndex === i ? 20 : 6,
                          height: 6,
                          background: activeIndex === i ? '#C9962A' : 'rgba(255,255,255,0.25)',
                        }}
                        aria-label={`Go to card ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop 2-col grid */}
                <div className="hidden sm:grid grid-cols-2 gap-3">
                  {capabilities.map(({ icon: Icon, title, description }, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * i, duration: 0.45 }}
                      className="flex flex-col gap-2 p-4 rounded-clay-sm"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.10)',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(245,200,66,0.25) 0%, rgba(201,150,42,0.15) 100%)',
                          border: '1px solid rgba(201,150,42,0.3)',
                        }}
                      >
                        <Icon size={15} color="#F5C842" strokeWidth={2} />
                      </div>
                      <p className="text-sm font-bold text-white leading-snug">{title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,246,227,0.55)' }}>
                        {description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              {/* ── CTA Button ── */}
              <ScrollReveal direction="left" delay={0.25}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <motion.a
                    href="https://app.ilesure.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-pill font-bold text-sm px-7 py-4 group transition-all duration-300"
                    style={{
                      background:
                        'linear-gradient(135deg, #F5C842 0%, #C9962A 100%)',
                      boxShadow:
                        '0 8px 28px rgba(201,150,42,0.45), 0 2px 8px rgba(0,0,0,0.2)',
                      color: '#1a0d05',
                    }}
                    whileHover={{
                      y: -4,
                      boxShadow:
                        '0 16px 40px rgba(201,150,42,0.55), 0 4px 12px rgba(0,0,0,0.25)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Monitor size={17} strokeWidth={2.2} />
                    <span>Launch Web App</span>
                    <ChevronRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </motion.a>

                  {/* Social proof micro-tag */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {[
                        { init: 'KA', bg: '#C9962A' },
                        { init: 'PO', bg: '#A0714F' },
                        { init: 'RE', bg: '#7A5B12' },
                      ].map(({ init, bg }, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-bold text-white"
                          style={{ background: bg, borderColor: '#1a0d05' }}
                        >
                          {init}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(253,246,227,0.65)' }}>
                      <span className="text-mustard font-semibold">200+ agents</span>{' '}
                      already joined
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* ── Trust badges row ── */}
              <ScrollReveal direction="left" delay={0.32}>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Shield, label: 'KYC Verified' },
                    { icon: Zap,    label: 'Instant Setup' },
                    { icon: Star,   label: 'Free to Start' },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-semibold"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'rgba(253,246,227,0.8)',
                      }}
                    >
                      <Icon size={11} color="#C9962A" strokeWidth={2.5} />
                      {label}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* ════════════════════════════════════
                RIGHT — Floating Dashboard Scene
            ════════════════════════════════════ */}
            <ScrollReveal direction="right">
              <div
                className="flex items-center justify-center relative"
                style={{ perspective: '1000px', minHeight: '380px' }}
              >
                {/* Golden bloom glow */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ filter: 'blur(70px)' }}
                >
                  <div
                    className="w-56 h-56 rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(201,150,42,0.55), transparent 70%)',
                    }}
                  />
                </div>

                {/* Orbiting chips */}
                {orbitChips.map((chip, i) => {
                  const rad = (chip.angle * Math.PI) / 180;
                  return (
                    <motion.div
                      key={chip.label}
                      className="absolute flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-bold pointer-events-none"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        backdropFilter: 'blur(8px)',
                        left: `calc(50% + ${Math.cos(rad) * chip.radius}px)`,
                        top:  `calc(50% + ${Math.sin(rad) * chip.radius}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{ y: [0, -9, 0], rotate: [0, 2, 0, -2, 0] }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.8,
                      }}
                    >
                      <chip.icon size={10} style={{ color: chip.color }} />
                      {chip.label}
                    </motion.div>
                  );
                })}

                {/* Floating dashboard illustration */}
                <motion.div
                  style={{
                    rotateY: 18,
                    rotateX: -6,
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img
                    src="/illustrations/webapp_dashboard.png"
                    alt="iléSure web app dashboard for agents and landlords"
                    className="w-full max-w-[280px] relative z-10 rounded-clay"
                    style={{
                      filter:
                        'drop-shadow(0 30px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(201,150,42,0.25))',
                    }}
                  />
                </motion.div>

                {/* Corner accent sparkles */}
                {[
                  { top: '12%', right: '10%', size: 5, delay: '0s' },
                  { top: '70%', right: '5%',  size: 4, delay: '0.8s' },
                  { top: '25%', left: '8%',   size: 3, delay: '1.4s' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-mustard pointer-events-none"
                    style={{
                      width: s.size,
                      height: s.size,
                      top: s.top,
                      ...(s.right ? { right: s.right } : { left: s.left }),
                    }}
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: parseFloat(s.delay),
                    }}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
