import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const notifications = [
  { name: 'Ayomip from Bodija', action: 'just signed up!', time: '2m ago' },
  { name: 'Chidi from Toll Gate', action: 'found a roommate', time: '5m ago' },
  { name: 'Sarah from Oba Otudeko', action: 'booked a viewing', time: '8m ago' },
  { name: 'Emmanuel from Agbowo', action: 'joined the waitlist', time: '12m ago' },
  { name: 'Nadia from Dugbe', action: 'just signed up!', time: '15m ago' },
  { name: 'Tunde from Ring Road', action: 'verified his account', time: '18m ago' },
  { name: 'Ada from Challenge', action: 'found a perfect match', time: '22m ago' },
  { name: 'Kemi from Mokola', action: 'just signed up!', time: '25m ago' },
];

export function LiveSocialProofTicker() {
  return (
    <section className="py-6 bg-mustard/10 border-y border-mustard/20 overflow-hidden">
      <div className="flex">
        <motion.div
          className="flex gap-8 pr-8"
          animate={{ x: [0, -50 + '%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...notifications, ...notifications].map((notification, index) => (
            <div
              key={index}
              className="flex items-center gap-3 whitespace-nowrap flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-full bg-mustard/20 flex items-center justify-center">
                <Sparkles size={14} className="text-mustard" />
              </div>
              <span className="text-sm">
                <span className="font-bold text-brown">{notification.name}</span>{' '}
                <span className="text-brown-light">{notification.action}</span>{' '}
                <span className="text-xs text-brown/50">· {notification.time}</span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
