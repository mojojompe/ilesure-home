import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Search, Map, ShieldCheck, KeyRound } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const steps = [
  {
    id: 'discover',
    icon: Search,
    title: 'Discover your perfect space',
    desc: 'Browse hundreds of verified off-destination apartments, self-cons, and hostels near your university, updated daily.',
    image: '/illustrations/person_search.png',
  },
  {
    id: 'map',
    icon: Map,
    title: 'Explore the neighborhood map',
    desc: 'View properties interactively. Filter by distance to your destination gate, security setup, and proximity to major roads.',
    image: '/illustrations/map_preview.png',
  },
  {
    id: 'verify',
    icon: ShieldCheck,
    title: '100% verified agents only',
    desc: 'Every listing is tied to a vetted and approved agent. Say goodbye to housing scams and inflated phantom fees.',
    image: '/illustrations/trust_v2.png',
  },
  {
    id: 'book',
    icon: KeyRound,
    title: 'Book and move in safely',
    desc: 'Reserve your space securely through the platform. Pick up your keys with confidence, knowing your money is safe.',
    image: '/illustrations/person_move_in.png',
  },
];

export function FeatureShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active index based on scroll progress (0 to 1) over the 400vh container
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // 4 steps = 0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1
      const index = Math.min(Math.floor(latest * steps.length), steps.length - 1);
      setActiveIndex(index);
    });
  }, [scrollYProgress]);

  // Connector bar fill progress
  const lineFillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative bg-cream-50 h-[400vh]">
      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-24 lg:py-32">

        {/* Global animated background blobs for the sticky view */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute right-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-mustard-200/40 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], x: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-[-10%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-brown-200/30 blur-[100px]"
            animate={{ scale: [1, 1.1, 1], y: [0, -80, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">

          {/* ═══ LEFT PANEL: Text Content ═══ */}
          <div className="flex flex-col gap-8 lg:gap-10 w-full z-10 relative pt-[120px] lg:pt-20">
            <SectionHeading eyebrow="Experience" title="Everything built into one seamless experience" subtitle="Keep Scrolling..." align="left" />

            <div className="relative flex gap-8 pl-0 lg:pl-4">
              {/* Connector line */}
              <div className="absolute left-0 top-2 bottom-6 w-1 bg-cream-200 rounded-full overflow-hidden hidden md:block">
                <motion.div
                  className="w-full bg-mustard origin-top"
                  style={{ height: lineFillHeight }}
                />
              </div>

              {/* Steps list */}
              <div className="flex flex-col gap-10 w-full relative z-10">
                {steps.map((step, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={step.id}
                      className={`transition-all duration-500 relative ${isActive ? 'opacity-100 translate-x-2' : 'opacity-40 translate-x-0'}`}
                    >
                      {/* Active indicator dot */}
                      <motion.div
                        className="absolute -left-10 top-1.5 w-3 h-3 rounded-full bg-mustard border-2 border-white shadow-sm hidden md:block"
                        animate={{ scale: isActive ? 1.5 : 0, opacity: isActive ? 1 : 0 }}
                      />

                      <div className="flex items-center gap-4 mb-3">
                        <div className={`w-10 h-10 rounded-clay-sm flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-mustard text-white shadow-3d' : 'bg-white border border-cream-200 text-brown-light'}`}>
                          <step.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                        </div>
                        <h3 className={`text-xl font-bold transition-colors duration-500 ${isActive ? 'text-brown' : 'text-brown-light'}`}>
                          {step.title}
                        </h3>
                      </div>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-brown-light leading-relaxed pl-14"
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {/* Space after last step */}
                      {index === steps.length - 1 && <div className="h-24"></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══ RIGHT PANEL: 3D Image Display ═══ */}
          <div className="absolute inset-0 z-0 lg:relative lg:h-[500px] lg:w-full flex items-center justify-center perspective-1000 opacity-40 blur-[2px] lg:opacity-100 lg:blur-none pointer-events-none lg:pointer-events-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100, rotateY: 30, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, rotateY: -30, scale: 0.8 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 120, damping: 20 }}
                className="absolute lg:inset-0 top-[20%] w-full flex flex-col items-center justify-center transform-style-3d"
              >
                {/* Float animation applied to the active image */}
                <motion.img
                  src={steps[activeIndex].image}
                  alt={steps[activeIndex].title}
                  className="w-[80vw] max-w-sm lg:max-w-md h-auto drop-shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ mixBlendMode: 'multiply' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
