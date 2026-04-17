
import { Target, Eye } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ClayCard } from '../ui/ClayCard';
import { SectionHeading } from '../ui/SectionHeading';

const cards = [
  {
    id: 'mission',
    icon: Target,
    eyebrow: 'Our Mission',
    title: 'Eliminate housing insecurity for Nigerian students',
    body: 'We exist to replace the informal, chaotic off-campus housing market with a transparent, trustworthy, and data-rich platform, starting with Ibadan and scaling across Nigeria. Every student deserves to find a safe, verified home without risking their money or their peace of mind.',
    accent: '#C9962A',
    bgGrad: 'from-mustard-50 to-cream',
  },
  {
    id: 'vision',
    icon: Eye,
    eyebrow: 'Our Vision',
    title: 'The most trusted student housing platform in Africa',
    body: "We envision a future where any Nigerian university student, whether in Ibadan, Lagos, Abuja, or Port Harcourt, can find a verified, compatible, affordable home with one search. iléSure will be the home discovery layer for every student's university journey.",
    accent: '#5C3317',
    bgGrad: 'from-brown-50 to-cream',
  },
];

export function MissionVision() {
  return (
    <section id="mission" className="py-24 bg-white relative overflow-hidden">
      {/* Floating Mission Illustration */}
      <img
        src="/illustrations/mission.png"
        alt="Mission Binoculars"
        className="absolute top-auto max-w-[25vw] md:max-w-[40vw] lg:max-w-none opacity-15 md:opacity-30 lg:opacity-100 top-24 -left-16 w-56 h-auto anim-float pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Purpose"
            title="Why we built iléSure"
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {cards.map((card, i) => (
            <ScrollReveal key={card.id} delay={i * 0.15}>
              <ClayCard className={`flex flex-col gap-6 p-8 bg-gradient-to-br ${card.bgGrad} h-full`} hover={false}>
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-clay-sm flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${card.accent}20 0%, ${card.accent}35 100%)`,
                    boxShadow: `0 8px 20px ${card.accent}25, inset 0 1px 0 rgba(255,255,255,0.5)`,
                  }}
                >
                  <card.icon size={28} strokeWidth={1.8} style={{ color: card.accent }} />
                </div>

                <div className="flex flex-col gap-3">
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: card.accent }}
                  >
                    {card.eyebrow}
                  </span>
                  <h3 className="text-xl font-extrabold text-brown leading-snug">{card.title}</h3>
                  <p className="text-sm text-brown-light leading-relaxed">{card.body}</p>
                </div>
              </ClayCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
