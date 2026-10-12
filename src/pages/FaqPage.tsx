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
            "text": "Yes, all payments are processed by Paystack. For long-term rentals you view the property and confirm in the app that it matches the listing before you can pay. Paystack then settles the property owner directly; iléSure does not hold your rent."
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
          bottomMockup="/mockups/FAQ_Hero.png"
          bottomMockupAlt="iléSure FAQ Dashboard Mockup"
          bottomMockupMaxWidth="800px"
        />

        <FAQ />
        <SupportChannels />
        <LiveSocialProofTicker />
      </main>
      <Footer />
    </motion.div>
  );
}
