import { useEffect, useState } from 'react';
import { CircleDot } from 'lucide-react';

const milestones = [
  { id: 'hero', label: 'Home', threshold: 0 },
  { id: 'features', label: 'Features', threshold: 20 },
  { id: 'how-it-works', label: 'How It Works', threshold: 50 },
  { id: 'faq', label: 'FAQ', threshold: 80 },
  { id: 'cta', label: 'Get Started', threshold: 95 },
];

export function ScrollProgress() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      for (let i = milestones.length - 1; i >= 0; i--) {
        if (scrollPercent >= milestones[i].threshold) {
          setActiveMilestone(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="flex items-center gap-3">
          <span
            className={`text-xs font-semibold transition-all duration-300 ${
              index <= activeMilestone ? 'text-mustard opacity-100' : 'text-brown-light opacity-40'
            }`}
          >
            {milestone.label}
          </span>
          <div
            className={`w-3 h-3 transition-all duration-300 ${
              index <= activeMilestone
                ? 'text-mustard'
                : 'text-brown-light/40'
            }`}
            style={{
              transform: index === activeMilestone ? 'scale(1.3)' : 'scale(1)',
            }}
          >
            <CircleDot size={12} />
          </div>
        </div>
      ))}
      <div className="w-px h-20 bg-gradient-to-b from-mustard to-transparent mt-2" />
    </div>
  );
}
