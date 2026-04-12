import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Trust } from './components/sections/Trust';
import { Features } from './components/sections/Features';
import { Testimonials } from './components/sections/Testimonials';
import { About } from './components/sections/About';
import { MissionVision } from './components/sections/MissionVision';
import { HowItWorks } from './components/sections/HowItWorks';
import { Download } from './components/sections/Download';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import { InteractiveMapPreview } from './components/sections/InteractiveMapPreview';
import { RoommateMatchingQuiz } from './components/sections/RoommateMatchingQuiz';
import { MouseGlow } from './components/effects/MouseGlow';
import { ScrollProgress } from './components/effects/ScrollProgress';
import { NoiseTextureOverlay } from './components/effects/NoiseTextureOverlay';

function App() {
  return (
    <div className="min-h-screen font-sans">
      {/* Global Effects */}
      <MouseGlow />
      <ScrollProgress />
      <NoiseTextureOverlay />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Trust / Stats */}
        <Trust />

        {/* 3. Features */}
        <Features />

        {/* 4. Interactive Map */}
        <InteractiveMapPreview />

        {/* 5. Roommate Matching Quiz */}
        <RoommateMatchingQuiz />

        {/* 6. Testimonials */}
        <Testimonials />

        {/* 7. About */}
        <About />

        {/* 8. Mission & Vision */}
        <MissionVision />

        {/* 9. How It Works */}
        <HowItWorks />

        {/* 10. Download / App */}
        <Download />

        {/* 11. FAQ */}
        <FAQ />

        {/* 12. Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
