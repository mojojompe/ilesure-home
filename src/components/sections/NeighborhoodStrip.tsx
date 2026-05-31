import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

const neighborhoods = [
  { name: 'Toll Gate', distance: '1 min from LCU', color: '#C9962A', count: '12+' },
  { name: 'Bodija', distance: '10 mins from UI', color: '#5C3317', count: '8+' },
  { name: 'Agbowo', distance: '5 mins from UI', color: '#C9962A', count: '15+' },
  { name: 'New Garage', distance: '10 mins from LCU', color: '#5C3317', count: '6+' },
  { name: 'Soka', distance: '15 mins from LCU', color: '#C9962A', count: '9+' },
  { name: 'Ring Road', distance: '20 mins from LCU', color: '#5C3317', count: '11+' },
  { name: 'Akala-Express', distance: '15 mins from LCU', color: '#C9962A', count: '7+' },
  { name: 'Dugbe', distance: '20 mins from UI', color: '#5C3317', count: '4+' },
];

export function NeighborhoodStrip() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='rgba(201,150,42,0.05)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E")`,
          backgroundSize: '45px 45px',
          backgroundPosition: 'center',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard-50 border border-mustard-200 text-mustard text-xs font-bold uppercase tracking-widest">
              <MapPin size={12} />
              Neighborhoods We Cover
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-brown">
              Near Every destination <span className="text-gradient-mustard">in Nigeria</span>
            </h2>
            <p className="mt-2 text-brown-light max-w-xl mx-auto">
              From Toll Gate to Bodija, we've got verified listings in every User corridor.
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
                <p className="text-xs text-brown-light mt-0.5">{hood.distance}</p>
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
