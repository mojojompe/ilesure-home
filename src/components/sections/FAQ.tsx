import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { faqs } from '../../data/faqs';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <section id="faq" className="py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions? We've got answers."
            subtitle="Everything you need to know about iléSure."
            align="center"
          />
        </ScrollReveal>

        <div className="flex flex-col gap-3 mt-14">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <ScrollReveal key={faq.id} delay={i * 0.05}>
                <div
                  className={`bg-white rounded-clay border transition-all duration-200 overflow-hidden ${isOpen
                      ? 'border-mustard-200 shadow-clay-mustard'
                      : 'border-cream-200 shadow-clay-sm'
                    }`}
                >
                  {/* Question row */}
                  <button
                    id={`faq-btn-${faq.id}`}
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${faq.id}`}
                  >
                    <span className={`text-sm font-semibold transition-colors ${isOpen ? 'text-mustard' : 'text-brown'}`}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown
                        size={18}
                        strokeWidth={2.5}
                        className={isOpen ? 'text-mustard' : 'text-brown-light'}
                      />
                    </motion.div>
                  </button>

                  {/* Answer (animated) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-content-${faq.id}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <div className="px-6 pb-5 border-t border-cream-200">
                          <p className="text-sm text-brown-light leading-relaxed pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
