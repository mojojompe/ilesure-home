import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PageHero } from '../components/sections/PageHero';
import { FAQ } from '../components/sections/FAQ';
import { SupportChannels } from '../components/sections/SupportChannels';
import { LiveSocialProofTicker } from '../components/sections/LiveSocialProofTicker';
import { useSEO } from '../hooks/useSEO';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function FaqPage() {
  useSEO({
    title: 'Frequently Asked Questions',
    description: 'Got questions? Find answers about how iléSure works, verification, payments, and our roommate matching system.',
    canonical: '/faq',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does iléSure verify properties?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every property is manually verified by our team. Agents must pass KYC checks (Government ID, Utility Bill) before listing."
          }
        },
        {
          "@type": "Question",
          "name": "Is my payment secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all payments go through our secure Paystack integration. We hold funds in escrow until you confirm the property is as described."
          }
        }
      ]
    }
  });

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
