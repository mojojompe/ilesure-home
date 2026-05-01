import { motion } from 'framer-motion';
import { MessageSquare, Mail, Phone } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useNavigate } from 'react-router-dom';

const channels = [
  {
    icon: MessageSquare,
    title: 'Chat with AI Support',
    description: "Get instant answers to any question — 24/7, no wait times. Our AI support agent knows iléSure inside out.",
    cta: 'Start Chat',
    href: '/chat',
    color: '#C9962A',
    bg: 'linear-gradient(135deg, #FAF1CC, #F5E099)',
    internal: true,
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'For detailed inquiries, partnership requests, or anything that needs a human touch. We respond within 24 hours.',
    cta: 'Send Email',
    href: 'mailto:ilesuresupport@gmail.com',
    color: '#5C3317',
    bg: 'linear-gradient(135deg, #F2E8DF, #DEBEBF)',
    internal: false,
  },
  {
    icon: Phone,
    title: 'Call or WhatsApp',
    description: 'Need to talk? Reach us directly on WhatsApp or phone during business hours (Mon–Fri, 9am–6pm WAT).',
    cta: 'WhatsApp Us',
    href: 'https://wa.me/2348071455374',
    color: '#C9962A',
    bg: 'linear-gradient(135deg, #FAF1CC, #F5E099)',
    internal: false,
  },
];

export function SupportChannels() {
  const navigate = useNavigate();

  return (
    <section id="support" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(201,150,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,150,42,0.04) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard-50 border border-mustard-200 text-mustard text-xs font-bold uppercase tracking-widest">
              Support
            </span>
            <h2 className="mt-4 text-4xl font-extrabold text-brown">
              We're Here <span className="text-gradient-mustard">For You</span>
            </h2>
            <p className="mt-3 text-brown-light max-w-lg mx-auto">
              Choose the support channel that works best for you. We're committed to responding fast.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <ScrollReveal key={ch.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white rounded-clay p-8 shadow-clay border border-cream-200 flex flex-col gap-5 h-full"
                >
                  <div
                    className="w-14 h-14 rounded-clay-sm flex items-center justify-center"
                    style={{ background: ch.bg, boxShadow: `0 8px 20px ${ch.color}25` }}
                  >
                    <Icon size={26} strokeWidth={1.8} style={{ color: ch.color }} />
                  </div>

                  <div className="flex flex-col gap-2 flex-grow">
                    <h3 className="font-bold text-brown text-lg">{ch.title}</h3>
                    <p className="text-sm text-brown-light leading-relaxed">{ch.description}</p>
                  </div>

                  <motion.button
                    onClick={() => ch.internal ? navigate(ch.href) : window.open(ch.href, '_blank')}
                    className="w-full py-3 rounded-pill font-bold text-sm transition-all duration-200 border-2"
                    style={{ borderColor: ch.color, color: ch.color }}
                    whileHover={{
                      backgroundColor: ch.color,
                      color: '#fff',
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {ch.cta}
                  </motion.button>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
