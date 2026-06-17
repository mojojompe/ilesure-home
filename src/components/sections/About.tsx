import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';

const highlights = [
  'Built for the key locations corridor, from Toll Gate to Akala Express',
  'Combating housing scams through rigorous agent verification',
  'Reducing roommate conflict with data-driven compatibility matching',
  'Bringing demand intelligence to landlords and agents in Nigeria',
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scroll-linked parallax for the illustration stack
  const frontImgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const backImgY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section id="about-story" ref={containerRef} className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-white rounded-full blur-[100px] opacity-60 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ═══ TEXT SIDE ═══ */}
          <div className="flex flex-col gap-8">
            <ScrollReveal direction="left">
              <SectionHeading
                eyebrow="About iléSure"
                title="More than a listing board, a trusted ecosystem"
                subtitle="iléSure means 'Sure Home' in Yoruba. We built it because finding off-destination housing in Nigeria still relies on WhatsApp forwards, printed notices, and hearsay. Users deserved better."
                align="left"
              />
            </ScrollReveal>

            <ul className="flex flex-col gap-4">
              {highlights.map((h, i) => (
                <ScrollReveal key={i} direction="left" delay={0.15 + i * 0.05}>
                  <motion.li
                    className="flex items-start gap-3 p-3 rounded-clay-sm hover:bg-white/50 transition-colors"
                  >
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1], rotate: [-20, 10, 0] }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5, type: 'spring' }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle size={20} strokeWidth={2} className="text-mustard flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <span className="text-sm text-brown-light leading-relaxed">{h}</span>
                  </motion.li>
                </ScrollReveal>
              ))}
            </ul>
          </div>

          {/* ═══ ILLUSTRATION SIDE (Parallax Depth Stack) ═══ */}
          <div className="flex items-center justify-center relative perspective-1000 hidden md:flex h-[600px]">
            <div className="relative w-full max-w-md transform-style-3d">
              {/* Back: Blurred duplicate for depth of field */}
              <motion.div
                style={{ y: backImgY, translateZ: -60, scale: 1.15, filter: 'blur(12px) opacity(0.5)' }}
                className="absolute inset-0"
              >
                <img
                  src="/illustrations/about.png"
                  alt=""
                  aria-hidden
                  className="w-full h-auto rounded-clay-lg"
                />
              </motion.div>

              {/* Front: Crisp main image */}
              <motion.div
                style={{ y: frontImgY, translateZ: 20 }}
                className="relative z-10"
              >
                <img
                  src="/illustrations/about.png"
                  alt="3D illustration of a User discovering a house"
                  className="w-full h-auto drop-shadow-2xl rounded-clay-lg border-2 border-white/50"
                />

                {/* Floating pill badge */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-clay px-5 py-3 shadow-3d border border-cream-200"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
                  viewport={{ once: true }}
                  
                >
                  <p className="text-xs font-bold text-brown">iléSure</p>
                  <p className="text-[11px] text-mustard font-semibold">Your Sure Home</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
