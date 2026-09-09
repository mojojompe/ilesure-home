import { useState } from 'react';
import { motion } from 'framer-motion';
import { SentIcon, StarIcon } from '@hugeicons/react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { API_ENDPOINTS } from '../../lib/config';

export function SubmitReviewCTA() {
  const [form, setForm] = useState({ name: '', email: '', university: '', message: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * BUGFIX (QA-MKT-004): this used to be `e.preventDefault(); setSubmitted(true);` under
   * the comment "In a real app this would POST to an API", the screen told the user
   * "Your review has been received" while ZERO requests were made and nothing was
   * stored anywhere. The submission now goes to the existing unauthenticated support
   * ticket endpoint, which persists it server-side, so the confirmation is true.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.support.submit, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Website review, ${form.rating}/5, ${form.university || 'unspecified'}`,
          message: form.message,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result?.success) {
        throw new Error(result?.error?.message || 'Submission failed');
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Review submission failed', err);
      setError('We could not send your review just now. Please try again, or email ilesuresupport@gmail.com.');
    } finally {
      setSending(false);
    }
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
              Your story helps other students find their sure home. Take 60 seconds to share.
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
                <StarIcon size={30} className="text-mustard fill-mustard" />
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
                      <StarIcon
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
                    placeholder='e.g. Tolu Akinlade'
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
                    placeholder='e.g. Lead City University'
                    className="w-full rounded-clay-sm border border-cream-200 px-4 py-3 text-sm text-brown bg-cream focus:outline-none focus:border-mustard transition-colors"
                  />
                </div>
              </div>

              {/* Required so the team can verify and reply, the receiving endpoint
                  needs an address, and an unattributable review cannot be published. */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-brown-light mb-1.5 block">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full rounded-clay-sm border border-cream-200 px-4 py-3 text-sm text-brown bg-cream focus:outline-none focus:border-mustard transition-colors"
                />
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
                  placeholder='Tell us about your experience finding housing with iléSure...'
                  className="w-full rounded-clay-sm border border-cream-200 px-4 py-3 text-sm text-brown bg-cream focus:outline-none focus:border-mustard transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="rounded-clay-sm bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
              )}

              <motion.button
                type="submit"
                disabled={sending}
                className="flex items-center justify-center gap-2 py-4 rounded-pill bg-mustard text-white font-bold shadow-float-mustard disabled:opacity-60"
                whileHover={sending ? undefined : { scale: 1.03, y: -2 }}
                whileTap={sending ? undefined : { scale: 0.97 }}
              >
                <SentIcon size={16} strokeWidth={2.5} />
                {sending ? 'Sending…' : 'Submit My Review'}
              </motion.button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
