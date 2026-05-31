import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function SubmitReviewCTA() {
  const [form, setForm] = useState({ name: '', university: '', message: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would POST to an API
    setSubmitted(true);
  };

  return (
    <section id="submit-review" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(201,150,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,150,42,0.05) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard-50 border border-mustard-200 text-mustard text-xs font-bold uppercase tracking-widest">
              Share Your Experience
            </span>
            <h2 className="mt-4 text-4xl font-extrabold text-brown">
              Had a Great Experience? <span className="text-gradient-mustard">Tell Us.</span>
            </h2>
            <p className="mt-3 text-brown-light max-w-md mx-auto">
              Your story helps other Users find their sure home. Take 60 seconds to share.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-clay-lg p-12 shadow-clay border border-mustard-100 text-center flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-mustard-50 flex items-center justify-center">
                <Star size={30} className="text-mustard fill-mustard" />
              </div>
              <h3 className="text-2xl font-extrabold text-brown">Thank You!</h3>
              <p className="text-brown-light max-w-sm">
                Your review has been received. We'll feature it once our team has had a look. 🏠
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-clay-lg p-8 sm:p-10 shadow-clay border border-cream-200 flex flex-col gap-5"
            >
              {/* Rating stars */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-brown-light mb-2 block">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <motion.button
                      key={star}
                      type="button"
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setForm(f => ({ ...f, rating: star }))}
                      className="focus:outline-none"
                    >
                      <Star
                        size={28}
                        className={star <= form.rating ? 'text-mustard fill-mustard' : 'text-cream-300 fill-cream-300'}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-brown-light mb-1.5 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Tolu Akinlade"
                    className="w-full rounded-clay-sm border border-cream-200 px-4 py-3 text-sm text-brown bg-cream focus:outline-none focus:border-mustard transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-brown-light mb-1.5 block">
                    University
                  </label>
                  <input
                    type="text"
                    required
                    value={form.university}
                    onChange={e => setForm(f => ({ ...f, university: e.target.value }))}
                    placeholder="e.g. key locations"
                    className="w-full rounded-clay-sm border border-cream-200 px-4 py-3 text-sm text-brown bg-cream focus:outline-none focus:border-mustard transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-brown-light mb-1.5 block">
                  Your Story
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your experience finding housing with iléSure..."
                  className="w-full rounded-clay-sm border border-cream-200 px-4 py-3 text-sm text-brown bg-cream focus:outline-none focus:border-mustard transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                className="flex items-center justify-center gap-2 py-4 rounded-pill bg-mustard text-white font-bold shadow-float-mustard"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Send size={16} strokeWidth={2.5} />
                Submit My Review
              </motion.button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
