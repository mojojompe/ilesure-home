import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function InteractiveMapPreview() {
  return (
    <section className="py-24 bg-cream text-brown relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard/20 text-mustard text-xs font-bold uppercase tracking-widest mb-4">
            <Users size={12} />
            Vibrant Neighborhoods
          </span>
          <h2 className="text-4xl font-extrabold mb-4 text-brown">
            Join a Thriving{' '}
            <span className="text-mustard">Community</span>
          </h2>
          <p className="text-brown-light max-w-lg mx-auto">
            Experience the best of off-campus living with properties nestled in vibrant, student-friendly neighborhoods.
          </p>
        </motion.div>

        {/* 3D Illustration Container */}
        <motion.div
          className="relative w-full aspect-[4/3] sm:aspect-video max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-clay border-4 border-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[#FDF8F0]">
            <img 
              src="/illustrations/isometric_map.png" 
              alt="3D Student Neighborhood Community" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90 transition-transform duration-700 hover:scale-105" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
