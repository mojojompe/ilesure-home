import { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, Smartphone, Bell, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

import { WaitlistModal } from '../ui/WaitlistModal';

export function Download() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <section id="download" className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brown rounded-clay-lg overflow-hidden relative">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-mustard/10 translate-x-1/2 -translate-y-1/3 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-mustard/10 -translate-x-1/3 translate-y-1/2 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-10 md:p-16">
              {/* Left — Text + Buttons */}
              <div className="flex flex-col gap-8">
                <ScrollReveal direction="left">
                  <div className="flex flex-col gap-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard/15 border border-mustard/25 text-mustard text-xs font-bold uppercase tracking-widest w-fit">
                      <Bell size={12} strokeWidth={2.5} />
                      Coming Soon
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                      Take iléSure wherever you go
                    </h2>
                    <p className="text-cream-300 text-base leading-relaxed">
                      The iléSure mobile app is coming to iOS and Android. Browse listings, chat with agents, and manage your roommate matching, all from your phone.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={0.15}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* App Store button */}
                    <button
                      onClick={() => setWaitlistOpen(true)}
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-clay-sm px-5 py-3.5 transition-all duration-200 group"
                    >
                      <Apple size={22} className="text-white flex-shrink-0" strokeWidth={1.8} />
                      <div className="text-left">
                        <p className="text-[10px] text-cream-300 font-medium">Download on the</p>
                        <p className="text-sm font-bold text-white">App Store</p>
                      </div>
                      <ChevronRight size={14} className="text-cream-300 group-hover:text-mustard transition-colors ml-auto" />
                    </button>

                    {/* Google Play button */}
                    <button
                      onClick={() => setWaitlistOpen(true)}
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-clay-sm px-5 py-3.5 transition-all duration-200 group"
                    >
                      <Smartphone size={22} className="text-white flex-shrink-0" strokeWidth={1.8} />
                      <div className="text-left">
                        <p className="text-[10px] text-cream-300 font-medium">Get it on</p>
                        <p className="text-sm font-bold text-white">Google Play</p>
                      </div>
                      <ChevronRight size={14} className="text-cream-300 group-hover:text-mustard transition-colors ml-auto" />
                    </button>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={0.25}>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['AO', 'TF', 'NE'].map((init, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-brown flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: i % 2 === 0 ? '#C9962A' : '#A0714F' }}
                        >
                          {init}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-cream-300">
                      <span className="text-mustard font-semibold">500+ students</span> already on the waitlist
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right — Phone mockup */}
              <ScrollReveal direction="right">
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center justify-center"
                >
                  <img
                    src="/illustrations/phone.png"
                    alt="iléSure mobile app mockup"
                    className="w-full max-w-xs drop-shadow-2xl"
                  />
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
