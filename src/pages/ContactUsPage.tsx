import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useSEO } from '../hooks/useSEO';
import { SupportChannels } from '../components/sections/SupportChannels';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function ContactUsPage() {
  useSEO({
    title: 'Contact Us',
    description: "We'd love to hear from you. Get in touch with the iléSure team.",
    canonical: '/contact',
  });

  return (
    <motion.div {...pageTransition} className="min-h-screen flex flex-col bg-cream text-brown relative">
      <Navbar />

      <main className="flex flex-col justify-center items-center px-4 pt-32 pb-16 relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-black text-brown tracking-tight leading-tight">
            Contact Us
          </h1>
        </motion.div>
      </main>

      <SupportChannels />

      <Footer />
    </motion.div>
  );
}
