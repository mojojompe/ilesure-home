import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Download } from '../components/sections/Download';

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
    title: 'Your Sure Home Anywhere',
    description: 'Find safe and verified housing, match with roommates, and discover trusted listings around key locations in Nigeria.',
    canonical: '/',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "iléSure",
      "url": "https://ilesure.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ilesure.com/discover?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  });

  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Download />
        <NeighborhoodStrip />
      </main>
      <Footer />
    </motion.div>
  );
}
