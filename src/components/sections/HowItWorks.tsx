
import { UserPlus, SlidersHorizontal, KeyRound } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';

const steps = [
  {
    id: 'step1',
    step: '01',
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Sign up as a student in minutes. Tell us your university, budget, preferred area, and lifestyle, so we can match you with the right space and the right people.',
  },
  {
    id: 'step2',
    step: '02',
    icon: SlidersHorizontal,
    title: 'Browse & Filter',
    description: 'Explore verified listings with full infrastructure details, power hours, water source, security setup, road condition, and distance from your campus. No surprises.',
  },
  {
    id: 'step3',
    step: '03',
    icon: KeyRound,
    title: 'Book & Move In',
    description: 'Confirm your booking securely. For shared apartments, get matched with a compatible roommate before you move in. Keys handed over after payment, simple and safe.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How It Works"
            title="From search to move-in, in 3 steps"
            subtitle="IleSure simplifies your entire off-campus housing journey. No more chasing agents, no more WhatsApp groups."
            align="center"
          />
        </ScrollReveal>

        <div className="relative mt-16">
          {/* Connecting dotted line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-0.5 border-t-2 border-dashed border-mustard-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <ScrollReveal key={step.id} delay={i * 0.15}>
                <div className="relative flex flex-col items-center md:items-start gap-5 text-center md:text-left">
                  {/* Step circle + icon */}
                  <div className="relative z-10 flex flex-col items-center md:items-start gap-3">
                    {/* Number chip */}
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-mustard text-white text-xs font-extrabold shadow-clay-mustard">
                      {step.step}
                    </span>
                    {/* 3D Icon blob */}
                    <div className="icon-blob w-16 h-16">
                      <step.icon size={28} className="text-white" strokeWidth={2} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-bold text-brown">{step.title}</h3>
                    <p className="text-sm text-brown-light leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
