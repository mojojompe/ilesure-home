import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

const agentTestimonials = [
  {
    name: 'Kunle Adeyemi',
    role: 'Property Agent',
    company: 'KA Realty, Nigeria',
    avatar: 'KA',
    content:
      "Since listing on iléSure, my inquiry volume tripled. Users find me, they're already verified, and the whole process is so much smoother. No more chasing unserious clients.",
    rating: 5,
    stat: '3x more inquiries',
    color: '#C9962A',
  },
  {
    name: 'Priscilla Okonkwo',
    role: 'Estate Manager',
    company: 'Prestige Properties Ltd',
    avatar: 'PO',
    content:
      "The analytics dashboard is a game changer. I can see exactly which listings are getting views and which aren't, so I know where to focus. My conversion rate went from 20% to nearly 60%.",
    rating: 5,
    stat: '60% conversion rate',
    color: '#5C3317',
  },
  {
    name: 'Remi Ojo',
    role: 'Independent Landlord',
    company: 'Private Landlord · Toll Gate',
    avatar: 'RO',
    content:
      "I was sceptical at first, but the KYC process gave my tenants confidence too. They trust my listing more because I'm verified. Both sides win — and I've had zero payment issues.",
    rating: 5,
    stat: 'Zero payment disputes',
    color: '#C9962A',
  },
];

export function AgentTestimonials() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-mustard/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard-50 border border-mustard-200 text-mustard text-xs font-bold uppercase tracking-widest">
              <Quote size={12} />
              Agent Stories
            </span>
            <h2 className="mt-4 text-4xl font-extrabold text-brown">
              Agents <span className="text-gradient-mustard">Love iléSure</span>
            </h2>
            <p className="mt-3 text-brown-light max-w-lg mx-auto">
              Real results from real property professionals across Nigeria.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agentTestimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-white rounded-clay p-7 shadow-clay border border-cream-200 flex flex-col gap-5 h-full"
              >
                {/* Quote icon */}
                <div
                  className="w-10 h-10 rounded-clay-sm flex items-center justify-center"
                  style={{ background: `${t.color}15` }}
                >
                  <Quote size={18} style={{ color: t.color }} />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, si) => (
                    <Star key={si} size={14} className="text-mustard fill-mustard" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-brown-light text-sm leading-relaxed flex-grow">
                  "{t.content}"
                </p>

                {/* Stat highlight */}
                <div
                  className="px-4 py-2.5 rounded-clay-sm"
                  style={{ background: `${t.color}10`, border: `1px solid ${t.color}20` }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: t.color }}>
                    Result
                  </p>
                  <p className="font-extrabold text-brown mt-0.5">{t.stat}</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-cream-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-brown text-sm">{t.name}</p>
                    <p className="text-xs text-brown-light">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
