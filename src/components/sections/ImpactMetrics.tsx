import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, TrendingUp, Globe, Zap } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

const metrics = [
  {
    id: 'scams',
    value: '0',
    label: 'Scams Reported',
    sublabel: 'Through iléSure',
    icon: Shield,
    color: '#C9962A',
    bg: 'linear-gradient(135deg, #FAF1CC, #F5E099)',
  },
  {
    id: 'kyc',
    value: '100%',
    label: 'Agent KYC Rate',
    sublabel: 'Every agent is verified',
    icon: Zap,
    color: '#5C3317',
    bg: 'linear-gradient(135deg, #F2E8DF, #DEBEBF)',
  },
  {
    id: 'universities',
    value: '3+',
    label: 'Universities Served',
    sublabel: 'LCU · UI · Polytechnic',
    icon: TrendingUp,
    color: '#C9962A',
    bg: 'linear-gradient(135deg, #FAF1CC, #F5E099)',
  },
  {
    id: 'launch',
    value: '2026',
    label: 'Year of Launch',
    sublabel: 'Ibadan → Nigeria → Africa',
    icon: Globe,
    color: '#5C3317',
    bg: 'linear-gradient(135deg, #F2E8DF, #DEBEBF)',
  },
];

function MetricCard({ metric, index }: { metric: typeof metrics[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = metric.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, type: 'spring', stiffness: 80 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white rounded-clay p-8 shadow-clay border border-cream-200 flex flex-col items-center text-center gap-4 cursor-default"
    >
      <motion.div
        className="w-14 h-14 rounded-clay-sm flex items-center justify-center"
        style={{ background: metric.bg, boxShadow: `0 8px 20px ${metric.color}25` }}
        animate={isInView ? { rotateY: [0, 360] } : {}}
        transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
      >
        <Icon size={26} strokeWidth={1.8} style={{ color: metric.color }} />
      </motion.div>
      <div>
        <p className="text-4xl font-black" style={{ color: metric.color }}>{metric.value}</p>
        <p className="text-base font-bold text-brown mt-1">{metric.label}</p>
        <p className="text-xs text-brown-light mt-0.5">{metric.sublabel}</p>
      </div>
    </motion.div>
  );
}

function MobileMetricCard({ metric }: { metric: typeof metrics[0] }) {
  const Icon = metric.icon;

  return (
    <motion.div
      key={metric.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-4"
    >
      <div
        className="w-14 h-14 rounded-clay-sm flex items-center justify-center"
        style={{ background: metric.bg, boxShadow: `0 8px 20px ${metric.color}25` }}
      >
        <Icon size={26} strokeWidth={1.8} style={{ color: metric.color }} />
      </div>
      <div>
        <p className="text-4xl font-black" style={{ color: metric.color }}>{metric.value}</p>
        <p className="text-base font-bold text-brown mt-1">{metric.label}</p>
        <p className="text-xs text-brown-light mt-0.5">{metric.sublabel}</p>
      </div>
    </motion.div>
  );
}

export function ImpactMetrics() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="impact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(201,150,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,150,42,0.04) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard-50 border border-mustard-200 text-mustard text-xs font-bold uppercase tracking-widest">
              Our Impact
            </span>
            <h2 className="mt-4 text-4xl font-extrabold text-brown">
              Building Trust, <span className="text-gradient-mustard">One Listing at a Time</span>
            </h2>
            <p className="mt-3 text-brown-light max-w-xl mx-auto">
              iléSure is more than an app — it's a commitment to every Nigerian student who deserves a safe, honest home-finding experience.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Desktop: 4-col grid ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.id} metric={metric} index={i} />
          ))}
        </div>

        {/* ── Mobile: content-switching card ── */}
        <div className="sm:hidden max-w-sm mx-auto">
          <div className="cursor-default w-full">
            <div className="flex flex-col items-center text-center p-8 gap-4 rounded-clay border border-cream-200 relative overflow-hidden spotlight-card bg-white transition-all duration-300 shadow-3d min-h-[220px] justify-center">
              <AnimatePresence mode="wait">
                <MobileMetricCard metric={metrics[currentIndex]} />
              </AnimatePresence>

              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full blur-lg pointer-events-none transition-all duration-300"
                style={{ background: `${metrics[currentIndex].color}20` }}
              />
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {metrics.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="rounded-pill transition-all duration-300 focus:outline-none"
                animate={{
                  width: i === currentIndex ? 28 : 8,
                  background: i === currentIndex ? '#C9962A' : '#E8D5B5',
                }}
                style={{ height: 8, borderRadius: 99 }}
                whileTap={{ scale: 0.85 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
