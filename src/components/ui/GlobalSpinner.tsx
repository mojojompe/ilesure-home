import { motion } from 'framer-motion';

export function GlobalSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-md">
      <div className="overflow-hidden py-4 px-8">
        <motion.h2 
          className="text-5xl font-black text-brown tracking-tighter drop-shadow-lg"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ x: -40, opacity: 0, filter: 'blur(12px)' }}
          animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1], 
            repeat: Infinity, 
            repeatType: 'reverse',
            repeatDelay: 0.3
          }}
        >
          ilé<span className="text-mustard">Sure</span>
        </motion.h2>
      </div>
    </div>
  );
}
