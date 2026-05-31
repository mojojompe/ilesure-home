import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu11Icon, PanelLeftCloseIcon } from '@hugeicons/core-free-icons';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { PillButton } from '../ui/PillButton';
import { WaitlistModal } from '../ui/WaitlistModal';

interface NavSection {
  label: string;
  anchor: string;
}
interface NavLink {
  label: string;
  href: string;
  sections?: NavSection[];
}

const navLinks: NavLink[] = [
  {
    label: 'Discover',
    href: '/discover',
    sections: [
      { label: 'Features', anchor: '#features' },
      { label: 'How It Works', anchor: '#how-it-works' },
      { label: 'Roommate Quiz', anchor: '#roommate-quiz' },
    ],
  },
  {
    label: 'About Us',
    href: '/about',
    sections: [
      { label: 'Our Story', anchor: '#about-story' },
      { label: 'Mission & Vision', anchor: '#mission' },
      { label: 'Impact', anchor: '#impact' },
    ],
  },
  {
    label: 'For Agents',
    href: '/agents',
    sections: [
      { label: 'Platform Features', anchor: '#web-app' },
      { label: 'Pricing', anchor: '#pricing' },
    ],
  },
  {
    label: 'Reviews',
    href: '/reviews',
    sections: [
      { label: 'User Stories', anchor: '#social-proof' },
      { label: 'Share Your Story', anchor: '#submit-review' },
    ],
  },
  {
    label: 'FAQ',
    href: '/faq',
    sections: [
      { label: 'Common Questions', anchor: '#faq' },
      { label: 'Chat with Support', anchor: '#support' },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpenDropdown(null);
  }, [location.pathname]);

  const handleNavLinkClick = (href: string) => {
    navigate(href);
    setOpenDropdown(null);
  };

  const handleSectionClick = (href: string, anchor: string) => {
    navigate(href);
    setOpenDropdown(null);
    // After navigation, scroll to the anchor
    setTimeout(() => {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  };

  const isActive = (href: string) => location.pathname === href;

  const handleMouseEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4 px-4">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="transition-all duration-500"
          style={{
            width: scrolled ? 'auto' : '100%',
            maxWidth: scrolled ? '920px' : '1100px',
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
              scrolled ? 'navbar-glass' : 'navbar-transparent'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2.5 flex-shrink-0"
              >
                <img
                  src="/logos/logo.svg"
                  alt="iléSure"
                  width="36"
                  height="36"
                  className="w-9 h-9 object-contain"
                />
                <span className="text-lg font-extrabold tracking-tight text-brown">
                  ilé<span className="text-mustard">Sure</span>
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <div className={`hidden md:flex items-center rounded-pill px-2 py-1 gap-0.5 transition-all duration-700 ${
                scrolled
                  ? 'bg-cream border border-cream-200'
                  : 'bg-white/20 border border-white/30'
              }`}>
                {navLinks.map(link => (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => link.sections && handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => handleNavLinkClick(link.href)}
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-pill text-sm font-semibold transition-all duration-200 ${
                        isActive(link.href)
                          ? 'bg-mustard text-white'
                          : 'text-brown hover:bg-mustard hover:text-white'
                      }`}
                    >
                      {link.label}
                      {link.sections && (
                        <ChevronDown
                          size={13}
                          strokeWidth={2.5}
                          className={`transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {openDropdown === link.label && link.sections && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          onMouseEnter={() => { if (dropdownTimer.current) clearTimeout(dropdownTimer.current); }}
                          onMouseLeave={handleMouseLeave}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-clay shadow-clay border border-cream-200 overflow-hidden z-50 py-1.5"
                        >
                          {link.sections.map((section) => (
                            <div key={section.anchor} className="px-2 pb-1 last:pb-0">
                              <button
                                onClick={() => handleSectionClick(link.href, section.anchor)}
                                className="w-full text-left px-4 py-2 text-sm text-brown hover:bg-mustard-50 hover:text-mustard font-medium transition-colors duration-150 rounded-pill"
                              >
                                {section.label}
                              </button>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-cream shadow-2xl overflow-y-auto"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white border border-cream-200 text-brown flex items-center justify-center hover:bg-mustard hover:text-white transition-colors shadow-sm"
                  aria-label="Close menu"
                >
                  <HugeiconsIcon icon={PanelLeftCloseIcon} size={20} color="currentColor" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-col h-full pt-20 px-6 pb-8">
                <div className="flex flex-col gap-1 flex-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      {/* Page link row */}
                      <div className="flex items-center justify-between border-b border-cream-300">
                        <button
                          onClick={() => { handleNavLinkClick(link.href); }}
                          className={`py-4 text-xl font-bold transition-colors text-left flex-1 ${
                            isActive(link.href) ? 'text-mustard' : 'text-brown hover:text-mustard'
                          }`}
                        >
                          {link.label}
                        </button>
                        {link.sections && (
                          <button
                            onClick={() => setMobileOpenDropdown(mobileOpenDropdown === link.label ? null : link.label)}
                            className="p-2 text-brown-light"
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-200 ${mobileOpenDropdown === link.label ? 'rotate-180 text-mustard' : ''}`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile dropdown sections */}
                      <AnimatePresence>
                        {mobileOpenDropdown === link.label && link.sections && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 py-2 flex flex-col gap-0.5 bg-white/50 rounded-clay-sm mb-1">
                              {link.sections.map(section => (
                                <button
                                  key={section.anchor}
                                  onClick={() => { handleSectionClick(link.href, section.anchor); }}
                                  className="text-left py-2.5 text-sm font-medium text-brown-light hover:text-mustard transition-colors"
                                >
                                  → {section.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
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
