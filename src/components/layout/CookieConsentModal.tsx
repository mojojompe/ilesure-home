import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export function CookieConsentModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay so it doesn't pop up instantly on page load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: 'accepted' | 'rejected') => {
    localStorage.setItem('cookie-consent', choice);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-6 left-6 z-[100] max-w-sm w-[calc(100%-3rem)] bg-white rounded-2xl shadow-2xl border border-mustard/20 overflow-hidden"
        >
          {/* Header Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-mustard to-brown" />
          
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mustard/10 text-mustard flex-shrink-0">
                <Cookie size={20} strokeWidth={2.5} />
              </div>
              <button 
                onClick={() => handleConsent('rejected')}
                className="text-gray-400 hover:text-brown transition-colors"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <h3 className="mt-4 text-lg font-bold text-brown">We Value Your Privacy</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              We use cookies to improve your experience, personalize content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleConsent('accepted')}
                className="w-full sm:flex-1 py-2.5 px-4 bg-brown hover:bg-brown/90 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-brown/20"
              >
                Accept All
              </button>
              <button
                onClick={() => handleConsent('rejected')}
                className="w-full sm:flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-brown text-sm font-semibold rounded-lg transition-colors"
              >
                Reject
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <a href="/cookie-policy" className="text-xs text-mustard hover:text-brown transition-colors font-medium underline-offset-2 hover:underline">
                Read our Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
