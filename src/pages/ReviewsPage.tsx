import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PageHero } from '../components/sections/PageHero';
import { Trust } from '../components/sections/Trust';
import { SocialProofWall } from '../components/sections/SocialProofWall';
import { VideoTestimonials } from '../components/sections/VideoTestimonials';
import { SubmitReviewCTA } from '../components/sections/SubmitReviewCTA';
import { useSEO } from '../hooks/useSEO';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function ReviewsPage() {
  useSEO({
    title: 'User Reviews & Stories',
    description: 'Read honest experiences from Users across Nigeria who found their sure home through iléSure.',
    canonical: '/reviews',
  });

  return (
    <motion.div {...pageTransition}>
      <Navbar />
      <main>
        <PageHero
          eyebrow="User Reviews"
          headline="Users Across Nigeria Trust iléSure"
          highlightWords={["Trust", "iléSure"]}
          subtext="Real stories from real Users who found their sure home. No filters, no scripts — just honest experiences."
          illustration="/illustrations/testimonials.png"
          illustrationAlt="Users sharing their iléSure experiences"
          primaryCta={{ label: 'Read Stories', anchor: '#social-proof' }}
          secondaryCta={{ label: 'Share Yours', anchor: '#submit-review' }}
          illustrationBlend
        />
        <Trust />
        <SocialProofWall />
        <VideoTestimonials />
        <SubmitReviewCTA />
      </main>
      <Footer />
    </motion.div>
  );
}
