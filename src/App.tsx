import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const ChatbotPage = lazy(() => import('./pages/ChatbotPage').then(module => ({ default: module.ChatbotPage })));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage').then(module => ({ default: module.DiscoverPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const AgentsPage = lazy(() => import('./pages/AgentsPage').then(module => ({ default: module.AgentsPage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then(module => ({ default: module.ReviewsPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(module => ({ default: module.FaqPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then(module => ({ default: module.TermsOfServicePage })));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then(module => ({ default: module.CookiePolicyPage })));

import { CookieConsentModal } from './components/layout/CookieConsentModal';
import { DisclaimerModal } from './components/layout/DisclaimerModal';
import { GlobalSpinner } from './components/ui/GlobalSpinner';

import { NoiseTextureOverlay } from './components/effects/NoiseTextureOverlay';
import { ScrollToTop } from './components/effects/ScrollToTop';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen font-sans">
      <ScrollToTop />
      {/* Global Effects */}
      <NoiseTextureOverlay />
      <CookieConsentModal />
      <DisclaimerModal />

      <AnimatePresence mode="wait">
        <Suspense fallback={<GlobalSpinner />}>
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
        </Suspense>
      </AnimatePresence>
    </div>
  );
}

export default App;
