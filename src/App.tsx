import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from './pages/HomePage';
import { ChatbotPage } from './pages/ChatbotPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { AboutPage } from './pages/AboutPage';
import { AgentsPage } from './pages/AgentsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { MouseGlow } from './components/effects/MouseGlow';
import { CookieConsentModal } from './components/layout/CookieConsentModal';

import { NoiseTextureOverlay } from './components/effects/NoiseTextureOverlay';
import { ScrollToTop } from './components/effects/ScrollToTop';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen font-sans">
      <ScrollToTop />
      {/* Global Effects */}
      <MouseGlow />
      <NoiseTextureOverlay />
      <CookieConsentModal />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
