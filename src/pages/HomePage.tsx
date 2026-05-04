import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Trust } from '../components/sections/Trust';
import { Features } from '../components/sections/Features';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Download } from '../components/sections/Download';
import { FinalCTA } from '../components/sections/FinalCTA';
import { NeighborhoodStrip } from '../components/sections/NeighborhoodStrip';
import { useSEO } from '../hooks/useSEO';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function HomePage() {
  useSEO({
    title: 'Your Sure Home Near Campus',
    description: 'Find verified student housing, match with roommates, and discover trusted listings around Lead City University, Ibadan.',
    canonical: '/',
  });

  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <NeighborhoodStrip />
        <Features />
        <HowItWorks />
        <Download />
        <FinalCTA />
      </main>
      <Footer />
    </motion.div>
  );
}
