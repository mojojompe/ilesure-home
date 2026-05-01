import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, TrendingUp, Globe, Zap } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

const metrics = [
  {
    value: '0',
    label: 'Scams Reported',
    sublabel: 'Through iléSure',
    icon: Shield,
    color: '#C9962A',
    bg: 'linear-gradient(135deg, #FAF1CC, #F5E099)',
  },
  {
    value: '100%',
    label: 'Agent KYC Rate',
    sublabel: 'Every agent is verified',
    icon: Zap,
    color: '#5C3317',
    bg: 'linear-gradient(135deg, #F2E8DF, #DEBEBF)',
  },
  {
    value: '3+',
    label: 'Universities Served',
    sublabel: 'LCU · UI · Polytechnic',
    icon: TrendingUp,
    color: '#C9962A',
    bg: 'linear-gradient(135deg, #FAF1CC, #F5E099)',
  },
  {
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

export function ImpactMetrics() {
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
