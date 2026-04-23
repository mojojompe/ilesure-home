import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ChatbotPage } from './pages/ChatbotPage';
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

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatbotPage />} />
      </Routes>
    </div>
  );
}

export default App;
