import { type ElementType } from 'react';
import {
  Search, Users, ShieldCheck, MapPin, ClipboardList, Lock,
} from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ClayCard } from '../ui/ClayCard';
import { SectionHeading } from '../ui/SectionHeading';
import { features } from '../../data/features';

const iconMap: Record<string, ElementType> = {
  Search, Users, ShieldCheck, MapPin, ClipboardList, Lock,
};

export function Features() {
  return (
    <section id="features" className="py-24 bg-cream relative overflow-hidden">
      {/* Floating Features Illustration 1 */}
      <img
        src="/illustrations/features.png"
        alt="Features Keys and House"
        className="absolute top-auto max-w-[25vw] md:max-w-[40vw] lg:max-w-none opacity-15 md:opacity-30 lg:opacity-100 bottom-10 -left-12 w-64 h-auto anim-float-delayed pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
      
      {/* Floating Features Illustration 2 */}
      <img
        src="/illustrations/features_2.png"
        alt="Features Magnifying Glass"
        className="absolute top-auto max-w-[25vw] md:max-w-[40vw] lg:max-w-none opacity-15 md:opacity-30 lg:opacity-100 top-20 right-4 w-48 h-auto anim-float pointer-events-none z-20"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Floating Features Illustration 3 */}
      <img
        src="/illustrations/features_3.png"
        alt="Features Padlock"
        className="absolute top-auto max-w-[25vw] md:max-w-[40vw] lg:max-w-none opacity-15 md:opacity-30 lg:opacity-100 bottom-10 right-10 w-52 h-auto anim-float-delayed pointer-events-none z-20"
        style={{ mixBlendMode: 'multiply' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to find your perfect space"
            subtitle="iléSure goes beyond a listing board, it's a full ecosystem built around the real problems students face finding off-campus housing in Ibadan."
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Search;
            return (
              <ScrollReveal key={feature.id} delay={i * 0.08}>
                <ClayCard className="flex flex-col gap-5 p-7 h-full">
                  {/* 3D Icon blob */}
                  <div className="icon-blob w-14 h-14 flex-shrink-0">
                    <Icon size={24} className="text-white" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-bold text-brown">{feature.title}</h3>
                    <p className="text-sm text-brown-light leading-relaxed">{feature.description}</p>
                  </div>
                </ClayCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
