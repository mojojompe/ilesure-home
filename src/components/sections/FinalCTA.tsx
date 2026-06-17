import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PillButton } from '../ui/PillButton';
import { WaitlistModal } from '../ui/WaitlistModal';

export function FinalCTA() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <section id="cta" className="py-24 relative overflow-hidden anim-gradient-morph" style={{ backgroundImage: 'linear-gradient(135deg, #C9962A 0%, #A67C1A 40%, #5C3317 100%)' }}>
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/10 -translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none anim-parallax-drift" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-black/20 translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none anim-parallax-drift" style={{ animationDelay: '-4s' }} />

        {/* Diagonal mesh texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundSize: '14px 14px',
          }}
        />

        {/* Floating CTA Illustration */}
        <img
          src="/illustrations/cta.png"
          alt=""
          aria-hidden
          className="absolute bottom-12 right-20 w-56 h-auto  pointer-events-none opacity-40 hidden lg:block"
          style={{ mixBlendMode: 'multiply' }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-7">
              {/* Icon */}
              <motion.div
                
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src='/logos/logo-nobg.png' alt='logo' className='w-12 h-12 object-contain' style={{ transform: 'translateZ(20px)' }} />
              </motion.div>

              <div className="flex flex-col gap-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  Your sure home is waiting.
                </h2>
                <p className="text-white/80 text-lg leading-relaxed max-w-xl mx-auto font-medium">
                  Join hundreds of Users who are done with the stress of off-destination housing. Be first in line when iléSure goes live.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <PillButton
                    variant="brown"
                    size="lg"
                    onClick={() => setWaitlistOpen(true)}
                    iconRight={<ChevronRight size={18} strokeWidth={2.5} />}
                    className="shadow-3d hover:shadow-3d-hover"
                  >
                    Join the Waitlist
                  </PillButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <PillButton
                    variant="ghost"
                    size="lg"
                    onClick={() => {
                      const el = document.querySelector('#how-it-works');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm"
                  >
                    See How It Works
                  </PillButton>
                </motion.div>
              </div>

              <p className="text-white/60 text-xs mt-2 font-medium tracking-wide">
                NO SPAM. JUST YOUR LAUNCH NOTIFICATION.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
