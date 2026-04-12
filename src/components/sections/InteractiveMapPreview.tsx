import { motion } from 'framer-motion';
import { MapPin, Navigation, Star } from 'lucide-react';

const locations = [
  { name: 'Lead City University', distance: '0.5 km', x: 45, y: 50 },
  { name: 'Toll Gate Area', distance: '1.2 km', x: 30, y: 35 },
  { name: 'Oba Otudeko Str', distance: '0.8 km', x: 60, y: 40 },
  { name: 'Bodija Market', distance: '1.5 km', x: 70, y: 55 },
  { name: 'Agbowo Area', distance: '2.0 km', x: 35, y: 65 },
  { name: 'UI Road', distance: '2.5 km', x: 25, y: 45 },
];

const properties = [
  { name: 'Crystal Heights', price: '₦450,000/yr', beds: 2, verified: true, x: 50, y: 45 },
  { name: 'Green Valley Apt', price: '₦380,000/yr', beds: 1, verified: true, x: 55, y: 55 },
  { name: 'Campus View Lodge', price: '₦520,000/yr', beds: 3, verified: false, x: 40, y: 42 },
];

export function InteractiveMapPreview() {
  return (
    <section className="py-24 bg-brown text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard/20 text-mustard text-xs font-bold uppercase tracking-widest mb-4">
            <Navigation size={12} />
            Location Map
          </span>
          <h2 className="text-4xl font-extrabold mb-4">
            Everything is Within{' '}
            <span className="text-mustard">5 Minutes</span>
          </h2>
          <p className="text-white/60 max-w-lg mx-auto">
            Properties strategically located near campus, markets, and transport hubs.
          </p>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          className="relative w-full aspect-video max-w-3xl mx-auto rounded-clay overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brown-800 to-brown-900">
            {/* Grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Roads */}
            <svg className="absolute inset-0 w-full h-full">
              <path d="M 0 50% Q 50% 30% 100% 50%" fill="none" stroke="white" strokeWidth="8" opacity="0.1" />
              <path d="M 30% 0 Q 40% 50% 30% 100%" fill="none" stroke="white" strokeWidth="6" opacity="0.1" />
              <path d="M 60% 0 Q 50% 50% 60% 100%" fill="none" stroke="white" strokeWidth="6" opacity="0.1" />
            </svg>

            {/* Location pins */}
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                className="absolute cursor-pointer"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-mustard/30 backdrop-blur-sm flex items-center justify-center">
                    <MapPin size={18} className="text-mustard" />
                  </div>
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-white rounded-clay-sm shadow-lg whitespace-nowrap"
                    initial={{ opacity: 0, y: 5 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-xs font-bold text-brown">{location.name}</p>
                    <p className="text-xs text-brown-light">{location.distance}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Property markers */}
            {properties.map((property, index) => (
              <motion.div
                key={property.name}
                className="absolute cursor-pointer"
                style={{ left: `${property.x}%`, top: `${property.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                    property.verified 
                      ? 'bg-green-500/90' 
                      : 'bg-brown-400/90'
                  }`}>
                    <Star size={16} className="text-white" />
                  </div>
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-white rounded-clay-sm shadow-xl whitespace-nowrap min-w-[140px]"
                    initial={{ opacity: 0, y: 5 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm font-bold text-brown">{property.name}</p>
                    <p className="text-xs text-mustard font-semibold">{property.price}</p>
                    <p className="text-xs text-brown-light">{property.beds}-bed apartment</p>
                    {property.verified && (
                      <span className="inline-flex items-center gap-1 mt-1 text-xs text-green-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Verified
                      </span>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* University marker */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <div className="w-20 h-20 rounded-full bg-mustard flex items-center justify-center shadow-2xl">
                <span className="text-2xl font-black text-white">LCU</span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-mustard"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
