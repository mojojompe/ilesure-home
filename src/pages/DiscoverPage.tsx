import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PageHero } from '../components/sections/PageHero';
import { FeatureShowcase } from '../components/sections/FeatureShowcase';
import { RoommateMatchingQuiz } from '../components/sections/RoommateMatchingQuiz';
import { InteractiveMapPreview } from '../components/sections/InteractiveMapPreview';
import { useSEO } from '../hooks/useSEO';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function DiscoverPage() {
  useSEO({
    title: 'Discover Housing Features',
    description: 'Browse verified listings, filter by price and distance, take the roommate quiz, and explore interactive maps near your campus.',
    canonical: '/discover',
  });

  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Discover iléSure"
          headline="Your Next Home is Right Here"
          highlightWords={["is", "Right", "Here"]}
          subtext="Filter by distance, price, and amenities. Every listing is verified. No scams, no surprises — just your perfect space near campus."
          illustration="/illustrations/discover_hero.png"
          illustrationAlt="Student discovering housing with map and pin"
          primaryCta={{ label: 'Browse Features', anchor: '#features' }}
          secondaryCta={{ label: 'How It Works', anchor: '#how-it-works' }}
          illustrationBlend
        />
        <FeatureShowcase />
        <RoommateMatchingQuiz />
        <InteractiveMapPreview />
      </main>
      <Footer />
    </motion.div>
  );
}
