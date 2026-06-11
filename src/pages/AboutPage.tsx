import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PageHero } from '../components/sections/PageHero';
import { About } from '../components/sections/About';
import { MissionVision } from '../components/sections/MissionVision';
import { ImpactMetrics } from '../components/sections/ImpactMetrics';
import { WaltikBuilt } from '../components/sections/WaltikBuilt';
import { useSEO } from '../hooks/useSEO';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function AboutPage() {
  useSEO({
    title: 'About iléSure',
    description: 'Learn about our mission to transform housing in Nigeria, our story, and the impact we are making in Nigeria.',
    canonical: '/about',
  });

  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main>
        <PageHero
          eyebrow="About iléSure"
          headline="Building the Future of safe and verified housing in Nigeria"
          highlightWords={["User", "Housing"]}
          subtext="Born in Nigeria. Built for every User. iléSure means 'Sure Home' in Yoruba — and that's exactly what we're committed to delivering."
          illustration="/illustrations/about_hero.png"
          illustrationAlt="iléSure team building a trusted housing platform"
          primaryCta={{ label: 'Our Story', anchor: '#about-story' }}
          secondaryCta={{ label: 'Our Mission', anchor: '#mission' }}
          illustrationBlend
        />
        <About />
        <MissionVision />
        <ImpactMetrics />
        <WaltikBuilt />
      </main>
      <Footer />
    </motion.div>
  );
}
