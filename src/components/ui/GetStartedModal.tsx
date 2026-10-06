
import { motion, AnimatePresence } from 'framer-motion';
import { Cancel01Icon, UserIcon, Home01Icon, ArrowRight01Icon } from '@hugeicons/react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-brown-dark/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-4xl bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row min-h-[500px]"
              onClick={e => e.stopPropagation()}
            >
              {/* Left Column - Brand & Image */}
              <div className="hidden md:flex md:w-[45%] relative bg-brown flex-col p-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mustard/20 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h2
                      className="text-4xl font-black text-white leading-tight mb-4 tracking-tighter"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Your sure home <br />
                      <span className="text-mustard-onDark">awaits.</span>
                    </h2>
                    <p className="text-cream-300 text-sm leading-relaxed">
                      Join thousands of Nigerian students discovering verified housing, safe roommate matching, and zero phantom fees.
                    </p>
                  </div>

                  <div className="mt-8">
                    <img
                      src="/illustrations/generated/impact_launch.png"
                      alt="Waitlist Illustration"
                      className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="w-full md:w-[55%] bg-cream-50 relative flex flex-col max-h-[90vh] md:max-h-none overflow-y-auto overflow-x-hidden">

                {/* ── Mobile Header ── */}
                <div className="md:hidden relative bg-brown px-6 pt-8 pb-14 overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-mustard/20 to-transparent pointer-events-none" />

                  {/* Mobile Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
                    aria-label="Close modal"
                  >
                    <Cancel01Icon size={16} strokeWidth={2.5} />
                  </button>

                  <div className="relative z-10 w-2/3">
                    <h2
                      className="text-3xl font-black text-white leading-tight mb-2 tracking-tighter"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Your sure home <br />
                      <span className="text-mustard-onDark">awaits.</span>
                    </h2>
                    <p className="text-cream-300 text-xs">
                      Join thousands getting early access.
                    </p>
                  </div>

                  {/* Mobile Illustration peeking out */}
                  <img
                    src="/illustrations/generated/impact_launch.png"
                    alt=""
                    className="absolute -bottom-4 -right-4 w-36 h-auto drop-shadow-xl"
                  />
                </div>

                {/* ── Desktop Close Row ── */}
                <div className="hidden md:flex items-center justify-end px-8 pt-8 pb-4">
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white border border-cream-200 flex items-center justify-center text-brown-light hover:text-brown hover:bg-cream-100 transition-colors shadow-sm"
                    aria-label="Close modal"
                  >
                    <Cancel01Icon size={18} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Form Container */}
                <div className="px-6 md:px-8 pt-8 pb-8 md:pb-8 flex-grow flex flex-col justify-center bg-cream-50 rounded-t-3xl md:rounded-none -mt-6 md:mt-0 relative z-10 shadow-[0_-10px_40px_rgba(92,51,23,0.08)] md:shadow-none">
                   <div className="flex flex-col gap-5 w-full max-w-sm mx-auto">
                      <div className="hidden md:block mb-2 text-center">
                        <h3 className="text-2xl font-bold text-brown mb-2" style={{ fontFamily: 'Georgia, serif' }}>Get Started</h3>
                        <p className="text-sm text-brown-light">Choose how you'd like to use iléSure.</p>
                      </div>

                      <a href="https://users.ilesure.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-cream-200 rounded-xl hover:border-mustard hover:shadow-md transition-all group">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-mustard/10 flex items-center justify-center text-mustard">
                             <UserIcon size={24} strokeWidth={2} />
                           </div>
                           <div>
                             <p className="font-bold text-brown group-hover:text-mustard transition-colors">I am a Student / User</p>
                             <p className="text-xs text-brown-light">Find a home or a roommate</p>
                           </div>
                         </div>
                         <ArrowRight01Icon className="text-brown-light group-hover:text-mustard transition-colors" size={20} />
                      </a>

                      <a href="https://app.ilesure.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-cream-200 rounded-xl hover:border-mustard hover:shadow-md transition-all group">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-mustard/10 flex items-center justify-center text-mustard">
                             <Home01Icon size={24} strokeWidth={2} />
                           </div>
                           <div>
                             <p className="font-bold text-brown group-hover:text-mustard transition-colors">I am an Agent / Landlord</p>
                             <p className="text-xs text-brown-light">List properties and manage leads</p>
                           </div>
                         </div>
                         <ArrowRight01Icon className="text-brown-light group-hover:text-mustard transition-colors" size={20} />
                      </a>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
