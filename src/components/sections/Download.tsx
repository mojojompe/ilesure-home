import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ChevronRight, Shield, MapPin, Star } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { WaitlistModal } from '../ui/WaitlistModal';

const orbitChips = [
  { label: 'Verified', icon: Shield, color: '#C9962A', angle: -30, radius: 140 },
  { label: '5 Star Rating', icon: Star, color: '#c9962a', angle: 60, radius: 155 },
  { label: 'Ibadan', icon: MapPin, color: '#C9962A', angle: 150, radius: 135 },
];

export function Download() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <section id="download" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className="rounded-clay-lg overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #3D2210 0%, #5C3317 40%, #271608 100%)' }}
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-mustard/10 translate-x-1/2 -translate-y-1/3 blur-3xl anim-parallax-drift" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-mustard/10 -translate-x-1/3 translate-y-1/2 blur-3xl anim-parallax-drift" style={{ animationDelay: '-9s' }} />
            {/* Diagonal stripe overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #F5C842 0px, #F5C842 1px, transparent 0px, transparent 50%)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-10 md:p-16">
              {/* Left — Text + Buttons */}
              <div className="flex flex-col gap-8">
                <ScrollReveal direction="left">
                  <div className="flex flex-col gap-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard/15 border border-mustard/25 text-mustard text-xs font-bold uppercase tracking-widest w-fit">
                      <Bell size={12} strokeWidth={2.5} />
                      Coming Soon - For Students & Individuals
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                      Take iléSure wherever you go
                    </h2>
                    <p className="text-cream-300 text-base leading-relaxed" style={{ color: 'rgba(253,246,227,0.7)' }}>
                      The iléSure mobile app is coming to iOS and Android. Browse listings, chat with agents, and manage your roommate matching — all from your phone.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={0.15}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {[
                      {
                        badge: '/icons/app-store-in-ios.png',
                        store: 'App Store',
                        sub: 'Download on the',
                        alt: 'Apple App Store',
                      },
                      {
                        badge: '/icons/play-store.png',
                        store: 'Google Play',
                        sub: 'Get it on',
                        alt: 'Google Play Store',
                      },
                    ].map(({ badge, store, sub, alt }) => (
                      <motion.button
                        key={store}
                        onClick={() => setWaitlistOpen(true)}
                        className="flex items-center gap-3 rounded-clay-sm px-5 py-3.5 group relative mt-1 overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                        whileHover={{ y: -4, background: 'rgba(255,255,255,0.15)', boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={badge}
                          alt={alt}
                          className="w-8 h-8 object-contain flex-shrink-0"
                        />
                        <div className="text-left pr-2">
                          <p className="text-[10px] font-medium" style={{ color: 'rgba(253,246,227,0.6)' }}>{sub}</p>
                          <p className="text-sm font-bold text-white">{store}</p>
                        </div>
                        <ChevronRight size={14} className="ml-auto transition-colors group-hover:text-mustard" style={{ color: 'rgba(253,246,227,0.5)' }} />
                      </motion.button>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={0.25}>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['AO', 'TF', 'NE'].map((init, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: i % 2 === 0 ? '#C9962A' : '#A0714F', borderColor: '#3D2210' }}
                        >
                          {init}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(253,246,227,0.7)' }}>
                      <span className="text-mustard font-semibold">50+ students</span> already on the waitlist
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right — 3D Phone Scene */}
              <ScrollReveal direction="right">
                <div
                  className="flex items-center justify-center relative"
                  style={{ perspective: '1000px', minHeight: '360px' }}
                >
                  {/* Glow bloom behind phone */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ filter: 'blur(60px)' }}
                  >
                    <div
                      className="w-48 h-48 rounded-full"
                      style={{ background: 'radial-gradient(circle, rgba(201,150,42,0.5), transparent 70%)' }}
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
                          left: `calc(50% + ${Math.cos(rad) * chip.radius}px)`,
                          top: `calc(50% + ${Math.sin(rad) * chip.radius}px)`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, 2, 0, -2, 0],
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.7,
                        }}
                      >
                        <chip.icon size={10} style={{ color: chip.color }} />
                        {chip.label}
                      </motion.div>
                    );
                  })}

                  {/* Phone in 3D perspective frame */}
                  <motion.div
                    style={{
                      rotateY: -20,
                      rotateX: 8,
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <img
                      src="/illustrations/phone_full.png"
                      alt="iléSure mobile app mockup"
                      className="w-full max-w-[220px] relative z-10"
                      style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }}
                    />
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
