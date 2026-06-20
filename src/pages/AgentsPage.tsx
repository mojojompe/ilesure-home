import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PageHero } from '../components/sections/PageHero';
import { WebApp } from '../components/sections/WebApp';
import { PricingTiers } from '../components/sections/PricingTiers';
import { AgentTestimonials } from '../components/sections/AgentTestimonials';
import { useSEO } from '../hooks/useSEO';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function AgentsPage() {
  useSEO({
    title: 'For Agents & Landlords',
    description: 'List properties, manage inquiries, and reach thousands of verified verified tenants on iléSure. Start growing your property business.',
    canonical: '/agents',
  });

  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main>
        <PageHero
          eyebrow="For Agents & Landlords"
          headline="Grow Your Property Business with iléSure"
          highlightWords={["with", "iléSure"]}
          subtext="List properties, manage inquiries, and reach thousands of verified verified tenants — all from one powerful platform."
          illustration="/illustrations/agents_hero.png"
          illustrationAlt="Real estate professional managing properties"
          primaryCta={{ label: 'Launch Web App', href: 'https://app.ilesure.com' }}
          secondaryCta={{ label: 'View Pricing', anchor: '#pricing' }}
          theme="dark"
          bottomMockup="/mockups/Agents_Hero.png"
          bottomMockupAlt="iléSure Agents Dashboard Mockup"
          bottomMockupMaxWidth="800px"
        />

        <WebApp />
        <PricingTiers />
        <AgentTestimonials />
      </main>
      <Footer />
    </motion.div>
  );
}
