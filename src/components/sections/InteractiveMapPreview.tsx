import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ChevronRight } from 'lucide-react';
import { WaitlistModal } from '../ui/WaitlistModal';

export function InteractiveMapPreview() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <section id="map" className="relative py-32 flex items-center justify-center min-h-[600px] lg:min-h-[800px] overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/illustrations/isometric_map.png" 
            alt="3D User Neighborhood Community" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brown/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown via-brown/60 to-brown/30" />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-white/10 backdrop-blur-md border border-white/20 text-mustard text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <Users size={14} className="text-mustard" />
              Vibrant Neighborhoods
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white leading-tight tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
              Join a Thriving <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #F5C842 0%, #C9962A 100%)' }}>
                Community
              </span>
            </h2>
            <p className="text-cream-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
              Experience the best of off-destination living with properties nestled in vibrant, User-friendly neighborhoods. Safe, secure, and built for you.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              {[
                {
                  badge: '/icons/app-store-in-ios.png',
                  store: 'App Store',
                  sub: 'Download on the',
                  alt: 'Apple App Store',
                },
                {
                  badge: '/icons/play-store.png',
                  store: 'Google Play',
                  sub: 'Get it on',
                  alt: 'Google Play Store',
                },
              ].map(({ badge, store, sub, alt }) => (
                <motion.button
                  key={store}
                  onClick={() => setWaitlistOpen(true)}
                  className="flex items-center gap-3 rounded-clay-sm px-5 py-3.5 group relative mt-1 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  whileHover={{ y: -4, background: 'rgba(255,255,255,0.15)', boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={badge}
                    alt={alt}
                    className="w-8 h-8 object-contain flex-shrink-0"
                  />
                  <div className="text-left pr-2">
                    <p className="text-[10px] font-medium" style={{ color: 'rgba(253,246,227,0.6)' }}>{sub}</p>
                    <p className="text-sm font-bold text-white">{store}</p>
                  </div>
                  <ChevronRight size={14} className="ml-auto transition-colors group-hover:text-mustard" style={{ color: 'rgba(253,246,227,0.5)' }} />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
