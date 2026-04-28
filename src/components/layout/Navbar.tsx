import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Monitor } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu11Icon, PanelLeftCloseIcon } from '@hugeicons/core-free-icons';
import { PillButton } from '../ui/PillButton';
import { WaitlistModal } from '../ui/WaitlistModal';

const navLinks = [
  { label: 'Discover', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Agents', href: '#web-app' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4 px-4">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          /* Pill width shrinks when scrolled */
          className="transition-all duration-500"
          style={{
            width: scrolled ? 'auto' : '100%',
            maxWidth: scrolled ? '870px' : '1024px',
          }}
        >
          <motion.div
            animate={{
              paddingTop: scrolled ? '10px' : '14px',
              paddingBottom: scrolled ? '10px' : '14px',
              paddingLeft: scrolled ? '16px' : '20px',
              paddingRight: scrolled ? '16px' : '20px',
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`rounded-pill transition-all duration-400 ${
              scrolled
                ? 'navbar-glass'
                : 'navbar-transparent'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <a
                href="#"
                className="flex items-center gap-2.5 flex-shrink-0"
                onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <img
                  src="/logos/logo-nobg.png"
                  alt="iléSure Logo"
                  className="w-9 h-9 object-contain"
                />
                <span className={`text-lg font-extrabold tracking-tight transition-colors duration-400 ${scrolled ? 'text-brown' : 'text-brown'}`}>
                  Ilé<span className="text-mustard">Sure</span>
                </span>
              </a>

              {/* Desktop Nav Links — inner pill cluster */}
              <div className={`hidden md:flex items-center rounded-pill px-2 py-1 gap-1 transition-all duration-700 ${
                scrolled
                  ? 'bg-cream border border-cream-200'
                  : 'bg-white/20 border border-white/30'
              }`}>
                {navLinks.map(link => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`px-4 py-2 rounded-pill text-sm font-semibold hover:bg-mustard hover:text-white transition-all duration-200 ${
                      scrolled ? 'text-brown' : 'text-brown'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-2">
                <PillButton
                  variant="mustard"
                  size="sm"
                  onClick={() => setWaitlistOpen(true)}
                  iconRight={<ChevronRight size={15} strokeWidth={2.5} />}
                >
                  Get Early Access
                </PillButton>
              </div>

              {/* Mobile Hamburger */}
              <button
                className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  scrolled ? 'bg-cream text-brown' : 'bg-white/20 text-brown'
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <HugeiconsIcon
                  icon={menuOpen ? PanelLeftCloseIcon : Menu11Icon}
                  size={20}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </motion.div>
        </motion.nav>
      </header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-brown/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-cream shadow-2xl"
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-8">
                <div className="flex flex-col gap-2 flex-1">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.href}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left py-4 text-2xl font-bold text-brown hover:text-mustard transition-colors border-b border-cream-300"
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <PillButton
                    variant="mustard"
                    size="md"
                    fullWidth
                    onClick={() => { setMenuOpen(false); setWaitlistOpen(true); }}
                    iconRight={<ChevronRight size={18} strokeWidth={2.5} />}
                  >
                    Get Early Access
                  </PillButton>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
