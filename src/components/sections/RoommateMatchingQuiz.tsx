import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Zap, ArrowRight, Wallet, PiggyBank, Coins, PartyPopper, BookOpen, Scale, Moon, Sparkles, Sunrise, RefreshCw, Minus } from 'lucide-react';

const questions = [
  {
    id: 'budget',
    question: 'What\'s your monthly budget range?',
    options: [
      { label: '₦50k - ₦80k', value: 'budget-low', icon: Wallet },
      { label: '₦80k - ₦120k', value: 'budget-mid', icon: Coins },
      { label: '₦120k+', value: 'budget-high', icon: PiggyBank },
    ],
  },
  {
    id: 'lifestyle',
    question: 'What\'s your lifestyle preference?',
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
    question: 'What\'s your sleep schedule like?',
    options: [
      { label: 'Early Bird', value: 'early', icon: Sunrise },
      { label: 'Night Owl', value: 'late', icon: Moon },
      { label: 'Flexible', value: 'flexible-sleep', icon: RefreshCw },
    ],
  },
];

const matchProfiles = [
  { name: 'Tunde A.', match: 94, traits: ['Study Focused', 'Night Owl', 'Clean'], avatar: 'TA' },
  { name: 'Ada M.', match: 89, traits: ['Balanced', 'Early Bird', 'Tidy'], avatar: 'AM' },
  { name: 'Segun K.', match: 85, traits: ['Party', 'Flexible', 'Flexible'], avatar: 'SK' },
];

export function RoommateMatchingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 500);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className="py-24 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Floating Quiz Illustration */}
      <img
        src="/illustrations/quiz.png"
        alt="Matching Quiz Pieces"
        className="absolute top-auto max-w-[25vw] md:max-w-[40vw] lg:max-w-none opacity-15 md:opacity-30 lg:opacity-100 bottom-16 -left-10 w-64 h-auto anim-float pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 w-full"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard/10 text-mustard text-xs font-bold uppercase tracking-widest mb-4">
            <Users size={12} />
            Roommate Matching
          </span>
          <h2 className="text-4xl font-extrabold text-brown mb-4">
            Find Your{' '}
            <span className="text-mustard">Perfect Match</span>
          </h2>
          <p className="text-brown-light max-w-lg">
            Answer a few questions and we'll find compatible roommates based on lifestyle, budget, and preferences.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-clay shadow-clay-lg p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-cream">
            <motion.div
              className="h-full bg-mustard"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <p className="text-sm text-mustard font-semibold mb-2">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                  <h3 className="text-2xl font-bold text-brown">
                    {questions[currentQuestion].question}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={`p-4 rounded-clay-sm border-2 text-left transition-all duration-200 flex items-center gap-4 ${
                          answers[questions[currentQuestion].id] === option.value
                            ? 'border-mustard bg-mustard/5'
                            : 'border-cream-200 hover:border-mustard/50 hover:bg-cream'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-12 h-12 rounded-clay-sm bg-mustard/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={24} className="text-mustard" />
                        </div>
                        <span className="font-semibold text-brown">{option.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-mustard/20 flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <Zap size={32} className="text-mustard" />
                </motion.div>

                <h3 className="text-2xl font-bold text-brown mb-2">
                  We Found Your Matches!
                </h3>
                <p className="text-brown-light mb-8">
                  Based on your preferences, here are compatible roommates
                </p>

                <div className="space-y-4">
                  {matchProfiles.map((profile, index) => (
                    <motion.div
                      key={profile.name}
                      className="flex items-center gap-4 p-4 rounded-clay-sm bg-cream/50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mustard to-brown flex items-center justify-center text-white font-bold text-lg">
                        {profile.avatar}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-brown">{profile.name}</p>
                        <div className="flex gap-2 mt-1">
                          {profile.traits.map((trait, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-mustard/10 text-mustard">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-mustard">{profile.match}%</span>
                        <p className="text-xs text-brown-light">match</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="mt-8 px-8 py-3 rounded-pill bg-mustard text-white font-bold inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect with Matches <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-mustard/5 -z-10" />
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-brown/5 -z-10" />
        </motion.div>

        {!showResults && currentQuestion === 0 && (
          <motion.p
            className="text-center text-sm text-brown-light mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Takes only 30 seconds
          </motion.p>
        )}
      </div>
    </section>
  );
}
