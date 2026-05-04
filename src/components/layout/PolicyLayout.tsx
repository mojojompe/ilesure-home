import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Menu } from 'lucide-react';

export interface TOCItem {
  id: string;
  label: string;
}

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  toc: TOCItem[];
  children: React.ReactNode;
}

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export function PolicyLayout({ title, lastUpdated, toc, children }: PolicyLayoutProps) {
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    for (const item of toc) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [toc]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileTocOpen(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <motion.div {...pageTransition} className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="pt-24 sm:pt-32 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-brown mb-3 sm:mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-xs sm:text-sm"
          >
            Last updated: {lastUpdated}
          </motion.p>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Mobile TOC toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-pill border border-cream-200 text-brown text-sm font-semibold shadow-clay-sm"
            >
              <Menu size={16} />
              Table of Contents
            </button>
            {mobileTocOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-2 bg-white rounded-clay-sm border border-cream-200 shadow-clay p-4"
              >
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollTo(item.id)}
                        className={`block w-full text-left py-2 px-3 text-sm rounded-pill transition-colors ${
                          activeSection === item.id
                            ? 'bg-mustard-50 text-mustard font-semibold'
                            : 'text-gray-600 hover:bg-cream-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar TOC - desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 order-first lg:order-none">
            <nav className="sticky top-32">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brown-light mb-4">
                Contents
              </h3>
              <ul className="space-y-1">
                {toc.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`block w-full text-left py-1.5 pl-3 text-sm transition-all duration-200 border-l-2 ${
                        activeSection === item.id
                          ? 'border-mustard text-mustard font-semibold'
                          : 'border-transparent text-gray-500 hover:text-brown hover:border-cream-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-xl shadow-brown/5 border border-mustard/10 prose-custom">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-mustard text-white rounded-full shadow-clay-mustard flex items-center justify-center hover:bg-mustard-dark transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </motion.div>
  );
}
