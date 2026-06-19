import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stores = [
  {
    badge: '/icons/app-store-in-ios.png',
    store: 'App Store',
    sub: 'Download on the',
    alt: 'Apple App Store',
    href: '#',
  },
  {
    badge: '/icons/play-store.png',
    store: 'Google Play',
    sub: 'Get it on',
    alt: 'Google Play Store',
    href: '#',
  },
];


export function AppDownloadModal({ isOpen, onClose }: AppDownloadModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="app-dl-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-brown-dark/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* ── Modal ── */}
          <motion.div
            key="app-dl-modal"
            initial={{ opacity: 0, scale: 0.88, y: 48 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 48 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-sm relative overflow-hidden rounded-clay-lg shadow-clay-lg"
              style={{ background: 'linear-gradient(155deg, #1a0d05 0%, #3D2210 55%, #0e0603 100%)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top mustard accent bar */}
              <div
                className="h-1.5 w-full"
                style={{ background: 'linear-gradient(90deg, #F5C842 0%, #C9962A 100%)' }}
              />


              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(201,150,42,0.22) 0%, transparent 70%)',
                  transform: 'translate(30%, -30%)',
                }}
              />


              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(253,246,227,0.7)' }}
                aria-label="Close"
              >
                <X size={15} strokeWidth={2.5} />
              </button>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center px-7 pt-8 pb-8 gap-6">


                {/* Copy */}
                <div className="text-center flex flex-col gap-2">
                  <h2 className="text-xl font-extrabold text-white leading-tight">
                    Connect with your matches
                  </h2>
                  <p style={{ color: 'rgba(253,246,227,0.65)' }} className="text-sm leading-relaxed">
                    Download the{' '}
                    <span
                      className="font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #F5C842, #C9962A)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      iléSure app
                    </span>{' '}
                    to chat, schedule viewings, and move in with your perfect roommate.
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(253,246,227,0.35)' }}>
                    Available on
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
                </div>

                {/* Store buttons */}
                <div className="flex flex-col w-full gap-3">
                  {stores.map(({ badge, store, sub, alt, href }, i) => (
                    <motion.a
                      key={store}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                      className="flex items-center gap-4 rounded-clay-sm px-5 py-4 group relative overflow-hidden w-full"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.13)',
                      }}
                      whileHover={{
                        y: -3,
                        background: 'rgba(255,255,255,0.13)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Hover shimmer sweep */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                        style={{
                          background:
                            'linear-gradient(105deg, transparent 30%, rgba(245,200,66,0.08) 50%, transparent 70%)',
                        }}
                      />

                      <img
                        src={badge}
                        alt={alt}
                        className="w-9 h-9 object-contain flex-shrink-0"
                      />

                      <div className="text-left flex-1">
                        <p className="text-[10px] font-medium" style={{ color: 'rgba(253,246,227,0.55)' }}>
                          {sub}
                        </p>
                        <p className="text-base font-bold text-white">{store}</p>
                      </div>

                      <ChevronRight
                        size={16}
                        strokeWidth={2.5}
                        className="flex-shrink-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-mustard"
                        style={{ color: 'rgba(253,246,227,0.35)' }}
                      />
                    </motion.a>
                  ))}
                </div>

                {/* Footer note */}
                <p className="text-[10px] font-medium tracking-wide text-center" style={{ color: 'rgba(253,246,227,0.35)' }}>
                  COMING SOON · BE FIRST IN LINE
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
