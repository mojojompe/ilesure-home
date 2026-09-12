import { TiktokIcon, WhatsappIcon} from '@hugeicons/react';
import { InstagramIcon, NewTwitterIcon, Linkedin01Icon, Mail01Icon, Location01Icon, CallIcon } from '@hugeicons/react';
import { Link } from 'react-router-dom';

const footerLinks = {
  Explore: [
    { label: 'Home', href: '/' },
    { label: 'Discover', href: '/discover' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'About iléSure', href: '/about' },
    { label: 'For Agents', href: '/agents' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  Support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Support & Feature Wishlist', href: '/support' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Platform Disclaimer', href: '#disclaimer' },
    // BUGFIX (QA-MKT-007): the Cookie Policy promises this control by name.
    { label: 'Cookie Settings', href: '#cookie-settings' },
  ],
};

const socials = [
  { icon: WhatsappIcon, href: 'https://wa.me/2348169384301', label: 'WhatsApp' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/ilesure_technologies/', label: 'InstagramIcon' },
  { icon: NewTwitterIcon, href: 'https://x.com/ilesuresupport', label: 'NewTwitterIcon / Cancel01Icon' },
  { icon: Linkedin01Icon, href: 'https://www.linkedin.com/company/ilésure-technologies', label: 'LinkedIn' },
  { icon: TiktokIcon, href: 'https://www.tiktok.com/@ilesure.com', label: 'Tiktok' },
];

export function Footer() {
  return (
    <footer className="relative bg-brown text-cream pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Tagline at the top center */}
        <div className="mb-16 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Your Sure Home Anywhere.
          </h3>
          <p className="text-cream-300 text-sm sm:text-base mt-2 max-w-md mx-auto">
            Verified housing and roommate discovery for Nigerians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-8 xl:gap-12 w-full pb-16 border-b border-white/10">
          
          {/* Brand/Contact Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-cream-300">
              <div className="flex items-center gap-3">
                <Location01Icon size={16} className="text-mustard-onDark flex-shrink-0" />
                <span className="text-sm">Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail01Icon size={16} className="text-mustard-onDark flex-shrink-0" />
                <span className="text-sm">ilesuresupport@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <CallIcon size={16} className="text-mustard-onDark flex-shrink-0" />
                <span className="text-sm">+234 816 938 4301</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-cream-300 hover:bg-mustard hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-clay-mustard"
                >
                  <Icon size={20} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-6 text-left">
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">{heading}</h4>
              <ul className="flex flex-col gap-4">
                {links.map(link => (
                  <li key={link.label}>
                    {link.href === '#cookie-settings' ? (
                      <button
                        onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
                        className="text-cream-300 text-sm hover:text-mustard-onDark transition-colors duration-200"
                      >
                        {link.label}
                      </button>
                    ) : link.href === '#disclaimer' ? (
                      <button
                        onClick={() => window.dispatchEvent(new Event('open-disclaimer'))}
                        className="text-cream-300 text-sm hover:text-mustard-onDark transition-colors duration-200"
                      >
                        {link.label}
                      </button>
                    ) : link.href.startsWith('/') && link.href !== '#' ? (
                      <Link
                        to={link.href}
                        className="text-cream-300 text-sm hover:text-mustard-onDark transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-cream-300 text-sm hover:text-mustard-onDark transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── MASSIVE TYPOGRAPHY LOCKUP WITH LOGO ── */}
        <div className="pt-20 pb-4 flex flex-row items-center justify-center gap-4 sm:gap-8 select-none pointer-events-none w-full">
          <img src="/logos/logo-nobg.png" alt="iléSure Logo" className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain drop-shadow-xl" />
          <h2 
            className="text-[12vw] font-black leading-[0.8] tracking-tighter text-white"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ilé<span className="text-mustard-onDark">Sure</span>
          </h2>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-14 text-sm text-cream-400/60 w-full">
          <p>© {new Date().getFullYear()} iléSure Technologies. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Sponsored by</span>
            <a 
              href="https://waltiklabs.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
            >
              <img src="/waltik_bg.jpg" alt="Waltik Labs Logo" className="w-5 h-5 rounded-sm object-cover group-hover:opacity-80 transition-opacity" />
              <span className="font-semibold text-white group-hover:text-mustard-onDark transition-colors duration-200">Waltik Labs</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
