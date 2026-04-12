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
    <section id="features" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to find your perfect space"
            subtitle="IleSure goes beyond a listing board, it's a full ecosystem built around the real problems students face finding off-campus housing in Ibadan."
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
