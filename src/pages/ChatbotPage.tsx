import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';

export function ChatbotPage() {
  const navigate = useNavigate();

  useSEO({
    title: 'Chat with Support',
    description: 'Get instant help from our AI-powered support assistant. Ask questions about housing, roommates, and iléSure.',
    canonical: '/chat',
  });

  // BUGFIX (QA-MKT-013): the Chatbase iframe was rendered unconditionally, so a user
  // who clicked "Reject" on the cookie banner still loaded a third party that sets its
  // own cookies and receives the referrer. GoogleTranslate.tsx already gates on consent
  // — this mirrors it, including honouring an acceptance made later in the session.
  const [consented, setConsented] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('cookie-consent') === 'accepted'
  );

  useEffect(() => {
    // Scroll to top when opening chat
    window.scrollTo(0, 0);

    const onConsent = (e: Event) => {
      const choice = (e as CustomEvent).detail;
      setConsented(choice === 'accepted');
    };
    window.addEventListener('cookie-consent-done', onConsent as EventListener);
    return () => window.removeEventListener('cookie-consent-done', onConsent as EventListener);
  }, []);

  return (
    <div className="min-h-screen bg-cream flex flex-col pt-20">
      
      {/* ── Custom Header ── */}
      <div className="fixed top-0 inset-x-0 h-20 bg-white/80 backdrop-blur-md border-b border-cream-200 z-50 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 w-full max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center flex-shrink-0 transition-colors hover:bg-cream-200 focus:outline-none"
            aria-label="Go back"
          >
            <ChevronLeft size={20} className="text-brown" />
          </button>
          
          <div className="flex items-center gap-3">
            {/* Avatar + online dot */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-mustard/20 border border-mustard/30 flex items-center justify-center">
                <MessageSquare size={18} className="text-mustard" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
            </div>

            <div>
              <p className="text-sm font-bold text-brown leading-none">iléSure Support</p>
              <p className="text-[11px] mt-1 flex items-center gap-1 text-brown-light">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online · Powered by AI
                <Sparkles size={10} className="text-mustard ml-1" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Chatbase iframe container ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 w-full max-w-5xl mx-auto flex flex-col p-4 sm:p-6 pb-0 h-[calc(100vh-80px)]"
      >
        <div className="flex-1 rounded-t-clay-lg overflow-hidden border-x border-t border-cream-200 shadow-clay-sm relative bg-white">
           {/* Loading shimmer behind iframe */}
           <div className="absolute inset-0 bg-white anim-shimmer pointer-events-none" />
           {consented ? (
             <iframe
                src="https://www.chatbase.co/chatbot-iframe/4G95TFjKNyu5gD5mDwt4G"
                title="iléSure Support Chat"
                className="absolute inset-0 w-full h-full border-0"
                allow="microphone"
              />
           ) : (
             <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
               <MessageSquare className="w-10 h-10 text-mustard" />
               <p className="text-brown-light max-w-sm">
                 Our live chat is provided by a third party, so it needs cookie consent before it can load.
               </p>
               <button
                 onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
                 className="rounded-pill bg-brown px-5 py-2 text-sm font-semibold text-cream hover:bg-brown/90"
               >
                 Review cookie settings
               </button>
               <p className="text-sm text-brown-light">
                 Or email us at <a className="underline" href="mailto:ilesuresupport@gmail.com">ilesuresupport@gmail.com</a>
               </p>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
}
