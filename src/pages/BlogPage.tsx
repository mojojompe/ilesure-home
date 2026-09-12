import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useSEO } from '../hooks/useSEO';
import { SparklesIcon } from '@hugeicons/react';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function BlogPage() {
  useSEO({
    title: 'The iléSure Blog',
    description: 'Insights, tips, and stories about finding your sure home in Nigeria.',
    canonical: '/blog',
  });

  return (
    <motion.div {...pageTransition} className="min-h-screen flex flex-col bg-cream text-brown relative">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center items-center px-4 py-32 sm:py-40 relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mustard-50 text-mustard text-xs font-black uppercase tracking-wider border border-mustard-200 mx-auto">
            <SparklesIcon size={14} />
            Coming Soon
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-brown tracking-tight leading-tight">
            The iléSure Blog
          </h1>
          <p className="text-lg sm:text-xl text-brown-400">
            Insights, tips, and stories about finding your sure home in Nigeria.
          </p>
          <div className="pt-8">
            <div className="clay-card p-8">
              <h3 className="text-xl font-bold text-brown mb-2">Check back later</h3>
              <p className="text-brown-400">New articles coming soon!</p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
}
