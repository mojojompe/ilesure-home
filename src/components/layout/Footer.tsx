import { TiktokIcon, WhatsappBusinessIcon, YoutubeIcon } from 'hugeicons-react';
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  Explore: [
    { label: 'Home', href: '/' },
    { label: 'Discover', href: '/discover' },
    { label: 'Reviews', href: '/reviews' },
  ],
  Company: [
    { label: 'About iléSure', href: '/about' },
    { label: 'For Agents', href: '/agents' },
    { label: 'FAQ & Support', href: '/faq' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Platform Disclaimer', href: '#disclaimer' },
  ],
};

const socials = [
  { icon: WhatsappBusinessIcon, href: '#', label: 'WhatsApp' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: TiktokIcon, href: '#', label: 'Tiktok' },
  { icon: YoutubeIcon, href: '#', label: 'Youtube' },
];

export function Footer() {
  return (
    <footer className="bg-brown text-cream pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img src="/logos/logo.svg" alt="iléSure" width="40" height="40" className="w-10 h-10 object-contain" />
              <span className="text-xl font-extrabold text-white">
                Ilé<span className="text-mustard">Sure</span>
              </span>
            </div>
            <p className="text-cream-300 text-sm leading-relaxed max-w-xs">
              Your sure home Anywhere. Verified premium housing and roommate discovery for Nigerian university Users.
            </p>
            <div className="flex flex-col gap-2 text-sm text-cream-300">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-mustard flex-shrink-0" />
                <span>Nigeria, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-mustard flex-shrink-0" />
                <span>ilesuresupport@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-mustard flex-shrink-0" />
                <span>+234 807 145 5374</span>
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-cream-300 hover:bg-mustard hover:text-white transition-all duration-200"
                >
                  <Icon size={16} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">{heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    {link.href === '#disclaimer' ? (
                      <button
                        onClick={() => window.dispatchEvent(new Event('open-disclaimer'))}
                        className="text-cream-300 text-sm hover:text-mustard transition-colors duration-200"
                      >
                        {link.label}
                      </button>
                    ) : link.href.startsWith('/') && link.href !== '#' ? (
                      <Link
                        to={link.href}
                        className="text-cream-300 text-sm hover:text-mustard transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-cream-300 text-sm hover:text-mustard transition-colors duration-200"
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

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-xs text-cream-300">
          <p>© {new Date().getFullYear()} iléSure Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Sponsored by Waltik Labs
          </p>
        </div>
      </div>
    </footer>
  );
}
