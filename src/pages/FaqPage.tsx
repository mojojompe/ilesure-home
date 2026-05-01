import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PageHero } from '../components/sections/PageHero';
import { FAQ } from '../components/sections/FAQ';
import { SupportChannels } from '../components/sections/SupportChannels';
import { LiveSocialProofTicker } from '../components/sections/LiveSocialProofTicker';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function FaqPage() {
  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main>
        <PageHero
          eyebrow="FAQ & Support"
          headline="We've Got Answers"
          highlightWords={["Answers"]}
          subtext="Find answers to common questions or reach us directly. Our support team and AI agent are always ready to help."
          illustration="/illustrations/faq_hero.png"
          illustrationAlt="Frequently asked questions"
          primaryCta={{ label: 'Browse FAQ', anchor: '#faq' }}
          secondaryCta={{ label: 'Chat with Support', href: '/chat' }}
          illustrationBlend
        />
        <FAQ />
        <SupportChannels />
        <LiveSocialProofTicker />
      </main>
      <Footer />
    </motion.div>
  );
}
