import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { WaitlistModal } from '../ui/WaitlistModal';



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

            <div className="relative p-10 md:p-16 max-w-3xl mx-auto text-center">
              {/* Center — Text + Buttons */}
              <div className="flex flex-col items-center gap-8">
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

              </div>

              </div>
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
