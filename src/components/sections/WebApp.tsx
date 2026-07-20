
import { motion } from 'framer-motion';
import {
  Monitor, BarChart3, Users, Building2, ChevronRight,
  Shield, Globe,
} from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useState } from 'react';
import { WaitlistModal } from '../ui/WaitlistModal';

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
    description: 'Build a verified professional profile that Users trust and landlords rely on.',
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
  const [waitlistOpen, setWaitlistOpen] = useState(false);
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

          <div className="relative p-10 md:p-16 max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* ════════════════════════════════════
                Left Column — Text + CTA
            ════════════════════════════════════ */}
            <div className="flex flex-col items-center lg:items-start gap-8 lg:w-1/2 text-center lg:text-left z-10">
              <ScrollReveal direction="left">
                <div className="flex flex-col gap-4 items-center lg:items-start">
                  {/* Badge */}
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard/15 border border-mustard/30 text-mustard text-xs font-bold uppercase tracking-widest w-fit">
                    <Globe size={12} strokeWidth={2.5} />
                    'For Agents/Landlords & Companies'
                                                        </span>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    'A powerful platform'{' '}
                    <span
                      className="text-transparent bg-clip-text"
                      style={{
                        backgroundImage:
                          'linear-gradient(135deg, #F5C842 0%, #C9962A 100%)',
                      }}
                    >
                      'built for pros'
                                                              </span>
                  </h2>

                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'rgba(253,246,227,0.70)' }}
                  >
                    'Agents, landlords, and real-estate companies now have a                     dedicated web dashboard to list properties, manage inquiries,                     and grow their portfolio — all from one place.'
                                                        </p>
                </div>
              </ScrollReveal>

              {/* ── Capability cards — responsive grid ── */}
              <ScrollReveal direction="left" delay={0.12}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {capabilities.map(({ icon: Icon, title, description }, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * i, duration: 0.45 }}
                      className="flex flex-col gap-3 p-5 rounded-clay-sm text-left"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.10)',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mb-1"
                        style={{
                          background: 'linear-gradient(135deg, rgba(245,200,66,0.25) 0%, rgba(201,150,42,0.15) 100%)',
                          border: '1px solid rgba(201,150,42,0.3)',
                        }}
                      >
                        <Icon size={18} color="#F5C842" strokeWidth={2} />
                      </div>
                      <p className="text-base font-bold text-white leading-snug">{title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(253,246,227,0.65)' }}>
                        {description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              {/* ── CTA Button ── */}
              <ScrollReveal direction="left" delay={0.25}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <motion.button
                    onClick={() => setWaitlistOpen(true)}
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
                    <span>'Launch Web App'</span>
                    <ChevronRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </motion.button>
                </div>
              </ScrollReveal>
            </div>
            
            {/* ════════════════════════════════════
                Right Column — Mockup
            ════════════════════════════════════ */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end relative mt-10 lg:mt-0 w-full">
              <ScrollReveal direction="right" delay={0.3}>
                <motion.div
                  className="relative w-[320px] sm:w-[450px] lg:w-[550px] xl:w-[650px]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Glow behind the mockup */}
                  <div className="absolute inset-0 bg-mustard/15 blur-3xl rounded-full scale-90 translate-y-10" />
                  
                  <img 
                    src="/mockups/Agents_Launch.png" 
                    alt="iléSure Web App Dashboard View" 
                    className="relative w-full h-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
                  />
                </motion.div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </div>
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </section>
  );
}
