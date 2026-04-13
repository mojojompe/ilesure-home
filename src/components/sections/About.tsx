
import { CheckCircle } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { motion } from 'framer-motion';

const highlights = [
  'Built for the Lead City University corridor, from Toll Gate, to Soka to Akala Express',
  'Combating housing scams through rigorous agent verification',
  'Reducing roommate conflict with data-driven compatibility matching',
  'Bringing demand intelligence to landlords and agents in Ibadan',
];

export function About() {
  return (
    <section id="about" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div className="flex flex-col gap-8">
            <ScrollReveal direction="left">
              <SectionHeading
                eyebrow="About iléSure"
                title={'More than a listing board, a trusted ecosystem'}
                subtitle="iléSure means 'Safe Home' in Yoruba. We built it because finding off-campus housing in Ibadan still relies on WhatsApp forwards, printed notices, and hearsay. Students deserved better."
                align="left"
              />
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <ul className="flex flex-col gap-4">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      strokeWidth={2}
                      className="text-mustard flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-brown-light leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.25}>
              <div className="flex gap-4">
                <div className="bg-white rounded-clay p-5 shadow-clay flex-1 text-center">
                  <p className="text-2xl font-extrabold text-mustard">2025</p>
                  <p className="text-xs text-brown-light mt-1">Platform Launch</p>
                </div>
                <div className="bg-white rounded-clay p-5 shadow-clay flex-1 text-center">
                  <p className="text-2xl font-extrabold text-brown">LCU</p>
                  <p className="text-xs text-brown-light mt-1">Primary Campus</p>
                </div>
                <div className="bg-white rounded-clay p-5 shadow-clay flex-1 text-center">
                  <p className="text-2xl font-extrabold text-mustard">Ibadan</p>
                  <p className="text-xs text-brown-light mt-1">Starting City</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Illustration side */}
          <ScrollReveal direction="right">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-md">
                <img
                  src="/illustrations/about.png"
                  alt="3D illustration of a student discovering a house"
                  className="w-full h-auto drop-shadow-xl rounded-clay-lg"
                />
                {/* Decorative pill badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-clay px-5 py-3 shadow-clay">
                  <p className="text-xs font-bold text-brown">Ile Sure</p>
                  <p className="text-[11px] text-mustard font-semibold">Your Safe Home</p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
