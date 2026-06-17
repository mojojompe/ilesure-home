import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

// National neighborhoods — no university/distance references
const neighborhoods = [
  { name: 'Victoria Island', state: 'Lagos', color: '#C9962A', count: '24+' },
  { name: 'Lekki Phase 1', state: 'Lagos', color: '#5C3317', count: '31+' },
  { name: 'Wuse 2', state: 'Abuja', color: '#C9962A', count: '18+' },
  { name: 'Maitama', state: 'Abuja', color: '#5C3317', count: '14+' },
  { name: 'Bodija', state: 'Ibadan', color: '#C9962A', count: '8+' },
  { name: 'GRA', state: 'Port Harcourt', color: '#5C3317', count: '11+' },
  { name: 'Adaeze', state: 'Enugu', color: '#C9962A', count: '6+' },
  { name: 'Ikeja GRA', state: 'Lagos', color: '#5C3317', count: '9+' },
];

export function NeighborhoodStrip() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Removed background pattern as requested */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard-50 border border-mustard-200 text-mustard text-xs font-bold uppercase tracking-widest">
              <MapPin size={12} />
              Neighborhoods We Cover
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-brown">
              Verified Areas Across <span className="text-gradient-mustard">Nigeria</span>
            </h2>
            <p className="mt-2 text-brown-light max-w-xl mx-auto">
              From Lagos to Abuja, Port Harcourt to Ibadan — verified listings in the neighbourhoods that matter most.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {neighborhoods.map((hood, i) => (
            <ScrollReveal key={hood.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-cream rounded-clay p-5 border border-cream-200 shadow-clay-sm cursor-default group transition-all duration-200 hover:shadow-clay hover:border-mustard-100"
              >
                <div
                  className="w-10 h-10 rounded-clay-sm flex items-center justify-center mb-3"
                  style={{ background: `${hood.color}15` }}
                >
                  <MapPin size={18} style={{ color: hood.color }} strokeWidth={2} />
                </div>
                <p className="font-bold text-brown text-sm">{hood.name}</p>
                {/* State label instead of proximity distance */}
                <p className="text-xs text-brown-light mt-0.5">{hood.state}</p>
                <p className="mt-2 text-xs font-bold" style={{ color: hood.color }}>
                  {hood.count} listings
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
