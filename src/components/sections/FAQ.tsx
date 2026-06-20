import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsLeft, MessageSquare } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { faqs } from '../../data/faqs';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export function FAQ() {
    const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  const hoveredAnswer = faqs.find(f => f.id === hoveredId)?.answer;

  return (
    <>
      <section id="faq" className="py-24 bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* ═══ LEFT COLUMN (Sticky) ═══ */}
            <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32 relative">
              <ScrollReveal>
                <SectionHeading
                  eyebrow={t("FAQ")}
                  title={t("Questions? We've got answers.")}
                  subtitle={t("Everything you need to know about iléSure.")}
                  align="left"
                />
              </ScrollReveal>

              {/* Dynamic Support/Answer Card */}
              <div className="bg-white rounded-clay p-8 shadow-clay-sm border border-cream-200 mt-4 h-[300px] flex flex-col justify-center transition-all duration-300 relative overflow-hidden">

                {/* Subtle radial bg for the card */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(201,150,42,0.06), transparent 65%)' }}
                />

                {/* Answer State (Desktop hover — slides in over the support card) */}
                <div
                  className={`hidden lg:flex flex-col gap-3 justify-center absolute inset-0 p-8 transition-all duration-300 ${
                    hoveredId ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-mustard">{t("Quick Answer")}</span>
                  <p className="text-sm text-brown-light leading-relaxed">{hoveredAnswer}</p>
                </div>

                {/* Support State (always visible on mobile; fades on desktop when hovering a question) */}
                <div
                  className={`flex flex-col gap-5 items-start transition-all duration-300 relative z-10 ${
                    hoveredId ? 'lg:opacity-0 lg:translate-y-2 lg:pointer-events-none' : 'opacity-100 translate-y-0'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #FAF1CC, #F5E099)', boxShadow: '0 6px 16px rgba(201,150,42,0.2)' }}
                  >
                    <MessageSquare size={22} className="text-mustard" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-brown">{t("Still have questions?")}</p>
                    <p className="text-sm text-brown-light leading-relaxed mt-1">
                      {t("We're here to help. Chat with our AI support agent — available 24/7.")}
                                                              </p>
                  </div>
                  <motion.button
                    onClick={() => navigate('/chat')}
                    className="group relative mt-1 flex items-center gap-2 px-6 py-3 rounded-pill font-bold text-white overflow-hidden text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #F5C842 0%, #C9962A 100%)',
                      boxShadow: '0 6px 20px rgba(201,150,42,0.35)',
                    }}
                    whileHover={{ scale: 1.04, boxShadow: '0 10px 28px rgba(201,150,42,0.5)' }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="absolute inset-0 anim-shimmer pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <MessageSquare size={16} strokeWidth={2.5} className="relative" />
                    <span className="relative">{t("Chat with Support")}</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* ═══ RIGHT COLUMN (Accordion) ═══ */}
            <div className="lg:col-span-7 flex flex-col gap-3">

              {/* Illustration — floats above the first question */}
              <div className="flex justify-end mb-[-1.5rem] relative z-10 hidden lg:flex">
                <img
                  src="/illustrations/faq.png"
                  alt="FAQ Question Mark"
                  className="w-40 h-auto  pointer-events-none opacity-80"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>

              {faqs.map((faq, i) => {
                const isOpen = openId === faq.id;
                return (
                  <ScrollReveal key={faq.id} delay={i * 0.05} direction="up">
                    <div
                      onMouseEnter={() => setHoveredId(faq.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`bg-white rounded-clay border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? 'border-mustard-200 shadow-clay-mustard'
                          : 'border-cream-200 shadow-clay-sm hover:border-mustard-100 hover:shadow-clay'
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
                          animate={{ rotate: isOpen ? 0 : 90 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                          className="flex-shrink-0"
                        >
                          <ChevronsLeft
                            size={18}
                            strokeWidth={2.5}
                            className={isOpen ? 'text-mustard' : 'text-brown-light'}
                          />
                        </motion.div>
                      </button>

                      {/* Expandable answer — on mobile always expands in-place; on desktop left card shows it */}
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
                            {/* Always show on mobile; hidden on desktop (left card handles it) */}
                            <div className="px-6 pb-5 border-t border-cream-200 lg:hidden">
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
        </div>
      </section>
    </>
  );
}
