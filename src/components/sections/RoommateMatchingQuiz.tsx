import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowRight, Wallet, PiggyBank, Coins, PartyPopper, BookOpen, Scale, Moon, Sparkles, Sunrise, RefreshCw, Minus, Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '../../lib/config';
import { AppDownloadModal } from '../ui/AppDownloadModal';

const questions = [
  {
    id: 'budget',
    question: "What's your monthly budget range?",
    options: [
      { label: '₦50k - ₦80k', value: 'budget-low', icon: Wallet },
      { label: '₦80k - ₦120k', value: 'budget-mid', icon: Coins },
      { label: '₦120k+', value: 'budget-high', icon: PiggyBank },
    ],
  },
  {
    id: 'lifestyle',
    question: "What's your lifestyle preference?",
    options: [
      { label: 'Party Animal', value: 'party', icon: PartyPopper },
      { label: 'Study Focused', value: 'study', icon: BookOpen },
      { label: 'Balanced', value: 'balanced', icon: Scale },
      { label: 'Quiet & Private', value: 'quiet', icon: Moon },
    ],
  },
  {
    id: 'cleanliness',
    question: 'How would you describe your cleanliness?',
    options: [
      { label: 'Spotless', value: 'very-clean', icon: Sparkles },
      { label: 'Generally Tidy', value: 'tidy', icon: Minus },
      { label: 'Flexible', value: 'flexible', icon: RefreshCw },
    ],
  },
  {
    id: 'sleep',
    question: "What's your sleep schedule like?",
    options: [
      { label: 'Early Bird', value: 'early', icon: Sunrise },
      { label: 'Night Owl', value: 'late', icon: Moon },
      { label: 'Flexible', value: 'flexible-sleep', icon: RefreshCw },
    ],
  },
];

export function RoommateMatchingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [appDownloadOpen, setAppDownloadOpen] = useState(false);

  useEffect(() => {
    if (showResults && answers.budget) {
      fetchMatches();
    }
  }, [showResults]);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.roommate.matches);
      const data = await response.json();
      if (data.matches) {
        setMatches(data.matches);
      }
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    }
    setLoading(false);
  };

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 500);
    }
  };

  const getMatchProfiles = () => {
    if (matches.length > 0) return matches;
    return [
      { id: '1', name: 'Tunde A.', match: 94, avatar: 'TA', traits: ['Study Focused', 'Night Owl', 'Clean'] },
      { id: '2', name: 'Ada M.', match: 89, avatar: 'AM', traits: ['Balanced', 'Early Bird', 'Tidy'] },
      { id: '3', name: 'Segun K.', match: 85, avatar: 'SK', traits: ['Party', 'Flexible', 'Flexible'] },
    ];
  };

  return (
    <section id="roommate" className="py-16 px-4 bg-cream">
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mustard/10 text-mustard text-sm font-medium mb-4">
            <Users size={16} />
            <span>Roommate Matching</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brown">Find Your Perfect Match</h2>
          <p className="text-brown-light mt-2">Answer a few questions and we'll find compatible roommates</p>
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="questions"
              className="clay-card p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= currentQuestion ? 'bg-mustard' : 'bg-clay-border'
                    }`}
                  />
                ))}
              </div>

              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <p className="text-lg font-semibold text-brown mb-6">{questions[currentQuestion].question}</p>

                <div className="grid grid-cols-2 gap-3">
                  {questions[currentQuestion].options.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className="p-4 rounded-clay-sm border-2 border-clay-border hover:border-mustard hover:bg-mustard/5 transition-all flex flex-col items-center gap-2"
                      >
                        <Icon className="w-6 h-6 text-mustard" />
                        <span className="text-sm font-medium text-brown">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <div className="mt-6 text-center text-sm text-brown-light">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              className="clay-card p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-center mb-6">
                <Users className="w-12 h-12 text-mustard mx-auto mb-3" />
                <h3 className="text-xl font-bold text-brown">Your Matches</h3>
                <p className="text-sm text-brown-light">Based on your preferences</p>
              </div>

              <div className="flex flex-col gap-3 max-h-[340px] overflow-y-auto no-scrollbar pr-1">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-mustard" />
                  </div>
                ) : (
                  getMatchProfiles().map((profile: any) => (
                    <motion.div
                      key={profile.id}
                      className="flex items-center gap-3 p-4 rounded-clay-sm bg-cream/50 min-w-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-mustard to-brown flex items-center justify-center text-white font-bold text-base">
                        {profile.avatar}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="font-bold text-brown truncate">{profile.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profile.traits.map((trait: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-mustard/10 text-mustard whitespace-nowrap">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xl font-extrabold text-mustard">{profile.match}%</span>
                        <p className="text-xs text-brown-light">match</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <motion.button
                className="mt-8 px-8 py-3 rounded-pill bg-mustard text-white font-bold inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAppDownloadOpen(true)}
              >
                Connect with Matches <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AppDownloadModal isOpen={appDownloadOpen} onClose={() => setAppDownloadOpen(false)} />
      </motion.div>
    </section>
  );
}