import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PillButton } from '../ui/PillButton';
import { WaitlistModal } from '../ui/WaitlistModal';

export function FinalCTA() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <section id="cta" className="py-24 bg-mustard relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-mustard-light/30 -translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-brown/20 translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-7">
              {/* Icon */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-clay-sm bg-transparent flex items-center justify-center"
              >
                <img src='/logos/logo-nobg.png' alt='logo' className='w-16 h-16 object-contain' />
              </motion.div>

              <div className="flex flex-col gap-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  Your safe home is waiting.
                </h2>
                <p className="text-mustard-50 text-lg leading-relaxed">
                  Join thousands of students who are done with the stress of off-campus housing. Be first in line when IleSure goes live.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <PillButton
                  variant="brown"
                  size="lg"
                  onClick={() => setWaitlistOpen(true)}
                  iconRight={<ChevronRight size={18} strokeWidth={2.5} />}
                >
                  Join the Waitlist
                </PillButton>
                <PillButton
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    const el = document.querySelector('#how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-white hover:text-mustard-100"
                >
                  See How It Works
                </PillButton>
              </div>

              <p className="text-mustard-50/70 text-xs">
                No spam. Just your launch notification.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
