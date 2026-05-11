import { motion } from 'framer-motion';
import { Code2, Rocket, Heart } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

const pillars = [
  {
    icon: Code2,
    title: 'Engineering',
    description: 'Crafted with modern web technologies — React, TypeScript, and native mobile — for a fast, reliable experience on every device.',
    color: '#C9962A',
    bg: 'linear-gradient(135deg, #FAF1CC, #F5E099)',
  },
  {
    icon: Rocket,
    title: 'Product',
    description: 'Every feature of iléSure is designed around one goal: making the student housing journey simple, safe, and stress-free.',
    color: '#5C3317',
    bg: 'linear-gradient(135deg, #F2E8DF, #DEBEBF)',
  },
  {
    icon: Heart,
    title: 'Community',
    description: 'iléSure is built for Nigerian university students, by people who understand the housing challenges they face every day.',
    color: '#C9962A',
    bg: 'linear-gradient(135deg, #FAF1CC, #F5E099)',
  },
];

export function WaltikBuilt() {
  return (
    <section className="py-24 bg-brown relative overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,200,66,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,200,66,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-mustard/8 blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-mustard/6 blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard/15 border border-mustard/30 text-mustard text-xs font-bold uppercase tracking-widest">
              Crafted With Purpose
            </span>
            <h2 className="mt-5 text-4xl font-extrabold text-white leading-tight">
              Built by{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #F5C842 0%, #C9962A 100%)' }}
              >
                Waltik Labs
              </span>
            </h2>
            <p className="mt-4 text-cream/70 max-w-xl mx-auto leading-relaxed">
              iléSure is a product of Waltik Labs — a Nigerian software studio that builds purposeful, community-driven digital products. We don't just build apps; we solve real problems for real people.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-clay p-7 flex flex-col gap-4"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  <div
                    className="w-12 h-12 rounded-clay-sm flex items-center justify-center"
                    style={{ background: p.bg, boxShadow: `0 8px 20px ${p.color}30` }}
                  >
                    <Icon size={22} style={{ color: p.color }} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-white text-base">{p.title}</h3>
                  <p className="text-sm text-cream/60 leading-relaxed">{p.description}</p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Waltik Labs CTA strip */}
        <ScrollReveal>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-clay-lg p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(245,200,66,0.2)' }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-clay-sm flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(245,200,66,0.2), rgba(201,150,42,0.15))' }}
              >
                <span className="text-mustard font-black text-xl">W</span>
              </div>
              <div>
                <p className="font-extrabold text-white text-lg">Waltik Labs</p>
                <p className="text-cream/60 text-sm">Building Nigeria's digital future, one product at a time.</p>
              </div>
            </div>
            <motion.a
              href="https://waltiklabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-pill font-bold text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #F5C842, #C9962A)', color: '#1a0d05' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Visit Waltik Labs →
            </motion.a>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
