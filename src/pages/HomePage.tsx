import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Trust } from '../components/sections/Trust';
import { Features } from '../components/sections/Features';
import { FeatureShowcase } from '../components/sections/FeatureShowcase';
import { RoommateMatchingQuiz } from '../components/sections/RoommateMatchingQuiz';
import { SocialProofWall } from '../components/sections/SocialProofWall';
import { About } from '../components/sections/About';
import { MissionVision } from '../components/sections/MissionVision';
import { HowItWorks } from '../components/sections/HowItWorks';
import { WebApp } from '../components/sections/WebApp';
import { Download } from '../components/sections/Download';
import { FAQ } from '../components/sections/FAQ';
import { FinalCTA } from '../components/sections/FinalCTA';

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Features />
        <FeatureShowcase />
        <WebApp />
        <RoommateMatchingQuiz />
        <SocialProofWall />
        <About />
        <MissionVision />
        <HowItWorks />
        <Download />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
