import { useEffect } from 'react';
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

  useEffect(() => {
    // Scroll to top when opening chat
    window.scrollTo(0, 0);
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
           <iframe
              src="https://www.chatbase.co/chatbot-iframe/4G95TFjKNyu5gD5mDwt4G"
              title="iléSure Support Chat"
              className="absolute inset-0 w-full h-full border-0"
              allow="microphone"
            />
        </div>
      </motion.div>
    </div>
  );
}
