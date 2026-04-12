
import { Users, Building2, GraduationCap } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ClayCard } from '../ui/ClayCard';

const stats = [
  {
    id: 'students',
    icon: Users,
    value: '30+',
    label: 'Students Helped',
    sub: 'Across Lead City & UI corridors',
    color: '#C9962A',
    bg: '#FAF1CC',
  },
  {
    id: 'listings',
    icon: Building2,
    value: '10+',
    label: 'Active Listings',
    sub: 'Verified flats, self-cons & hostels',
    color: '#5C3317',
    bg: '#F2E8DF',
  },
  {
    id: 'universities',
    icon: GraduationCap,
    value: '3+',
    label: 'Universities Served',
    sub: 'LCU · UI · Polytechnic & growing',
    color: '#C9962A',
    bg: '#FAF1CC',
  },
];

export function Trust() {
  return (
    <section id="trust" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.id} delay={i * 0.12}>
              <ClayCard className="flex flex-col items-center text-center p-8 gap-4">
                {/* 3D Icon blob */}
                <div
                  className="w-16 h-16 rounded-clay-sm flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${stat.bg} 0%, ${stat.bg} 100%)`,
                    boxShadow: `0 8px 20px ${stat.color}30, inset 0 1px 0 rgba(255,255,255,0.6)`,
                  }}
                >
                  <stat.icon size={28} strokeWidth={1.8} style={{ color: stat.color }} />
                </div>
                <div>
                  <p
                    className="text-4xl font-extrabold leading-none"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-base font-bold text-brown mt-1">{stat.label}</p>
                  <p className="text-xs text-brown-light mt-1">{stat.sub}</p>
                </div>
              </ClayCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
