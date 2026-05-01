import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PageHero } from '../components/sections/PageHero';
import { About } from '../components/sections/About';
import { MissionVision } from '../components/sections/MissionVision';
import { ImpactMetrics } from '../components/sections/ImpactMetrics';
import { WaltikBuilt } from '../components/sections/WaltikBuilt';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function AboutPage() {
  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main>
        <PageHero
          eyebrow="About iléSure"
          headline="Building the Future of Student Housing in Nigeria"
          highlightWords={["Student", "Housing"]}
          subtext="Born in Ibadan. Built for every student. iléSure means 'Sure Home' in Yoruba — and that's exactly what we're committed to delivering."
          illustration="/illustrations/about_hero.png"
          illustrationAlt="iléSure team building a trusted student housing platform"
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
