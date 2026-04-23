import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserPlus, SlidersHorizontal, KeyRound } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 'step1',
    step: '01',
    icon: UserPlus,
    title: 'Create Your Profile',
    description:
      'Sign up as a student in minutes. Tell us your university, budget, preferred area, and lifestyle, so we can match you with the right space and the right people.',
    person: '/illustrations/person_female_key.png',
  },
  {
    id: 'step2',
    step: '02',
    icon: SlidersHorizontal,
    title: 'Browse & Filter',
    description:
      'Explore verified listings with full infrastructure details; power hours, water source, security setup, road condition, and distance from your campus. No surprises.',
    person: '/illustrations/person_search.png',
  },
  {
    id: 'step3',
    step: '03',
    icon: KeyRound,
    title: 'Book & Move In',
    description:
      'Confirm your booking securely. For shared apartments, get matched with a compatible roommate before you move in. Keys handed over after payment, simple and safe.',
    person: '/illustrations/person_move_in.png',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        delay: index * 0.18,
        duration: 0.7,
        type: 'spring',
        stiffness: 80,
        damping: 14,
      }}
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      className="relative flex flex-col items-center md:items-start gap-5 text-center md:text-left"
    >
      {/* Large ghost step number */}
      <span
        className="absolute -top-4 -left-2 text-[120px] font-black leading-none pointer-events-none select-none hidden md:block"
        style={{ color: 'rgba(201,150,42,0.06)', lineHeight: 1 }}
      >
        {step.step}
      </span>

      {/* Step number chip + icon */}
      <div className="relative z-10 flex flex-col items-center md:items-start gap-3">
        <motion.span
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-mustard text-white text-xs font-extrabold"
          animate={isInView ? { boxShadow: ['0 0 0 0 rgba(201,150,42,0.4)', '0 0 0 14px rgba(201,150,42,0)', '0 0 0 0 rgba(201,150,42,0)'] } : {}}
          transition={{ delay: index * 0.18 + 0.5, duration: 2, repeat: Infinity }}
        >
          {step.step}
        </motion.span>

        {/* 3D icon blob */}
        <motion.div
          className="icon-blob w-16 h-16"
          initial={{ rotateY: -90, scale: 0.6 }}
          animate={isInView ? { rotateY: 0, scale: 1 } : {}}
          transition={{ delay: index * 0.18 + 0.25, duration: 0.6, type: 'spring' }}
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ rotateY: 20, scale: 1.08 }}
        >
          <step.icon size={28} className="text-white" strokeWidth={2} />
        </motion.div>
      </div>

      <div className="flex flex-col gap-2 relative z-10">
        <h3 className="text-base font-bold text-brown">{step.title}</h3>
        <p className="text-sm text-brown-light leading-relaxed">{step.description}</p>
      </div>

      {/* Clay person per step */}
      <motion.img
        src={step.person}
        alt=""
        aria-hidden
        className="w-24 h-auto mx-auto md:mx-0 mt-2 opacity-80"
        style={{ mixBlendMode: 'multiply' }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={isInView ? { opacity: 0.85, scale: 1 } : {}}
        transition={{ delay: index * 0.18 + 0.4, duration: 0.5 }}
        animate-props={{ y: [0, -8, 0] }}
      />
    </motion.div>
  );
}

export function HowItWorks() {
  const lineRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;
    const totalLength = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, { strokeDasharray: totalLength, strokeDashoffset: totalLength });
    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 1,
      },
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-cream relative overflow-hidden">
      {/* Floating How It Works Illustration */}
      <img
        src="/illustrations/how_it_works.png"
        alt=""
        aria-hidden
        className="absolute bottom-40 -right-8 w-60 h-auto anim-float-delayed pointer-events-none opacity-40 hidden lg:block"
        style={{ mixBlendMode: 'multiply' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How It Works"
            title="From search to move-in, in 3 steps"
            subtitle="iléSure simplifies your entire off-campus housing journey. No more chasing agents, no more WhatsApp groups."
            align="center"
          />
        </ScrollReveal>

        <div className="relative mt-16">
          {/* GSAP scroll-drawn connector (desktop only) */}
          <div className="hidden md:block absolute top-14 left-0 right-0 -z-0 pointer-events-none px-[16.66%]">
            <svg width="100%" height="4" viewBox="0 0 600 4" preserveAspectRatio="none">
              <path
                ref={lineRef}
                d="M0 2 Q300 2 600 2"
                fill="none"
                stroke="url(#timelineGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 8"
              />
              <defs>
                <linearGradient id="timelineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F5C842" />
                  <stop offset="100%" stopColor="#C9962A" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <StepCard key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
