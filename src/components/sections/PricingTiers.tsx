import { motion } from 'framer-motion';
import { Check, Zap, Star, Building2 } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useState } from 'react';

const tiers = [
  {
    id: 'basic',
    name: 'Basic',
    badge: null,
    price: '₦833',
    period: '/month',
    annualPrice: '₦10,000',
    annualNote: 'billed annually',
    color: '#A0714F',
    accent: '#F2E8DF',
    icon: Building2,
    listingCap: '15 listings',
    features: [
      'Up to 15 active listing slots',
      'Priority listing visibility',
      'Detailed booking analytics',
      'Priority email support',
    ],
    cta: 'Get Started',
    ctaStyle: 'outline',
  },
  {
    id: 'pro',
    name: 'Premium',
    badge: 'Most Popular',
    price: '₦2,917',
    period: '/month',
    annualPrice: '₦35,000',
    annualNote: 'billed annually',
    color: '#319795',
    accent: '#E6FFFA',
    icon: Zap,
    listingCap: '30 listings',
    features: [
      'Up to 30 active listing slots',
      'Featured listing placement',
      'Advanced demand analytics',
      'Priority phone & email support',
    ],
    cta: 'Go Premium',
    ctaStyle: 'filled',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Best Value',
    price: '₦5,833',
    period: '/month',
    annualPrice: '₦70,000',
    annualNote: 'billed annually',
    color: '#C6A800',
    accent: '#FFFFF0',
    icon: Star,
    listingCap: '50+ listings',
    features: [
      '50+ active listing slots (unlimited)',
      'Top of discovery feed placement',
      'Full reporting & demand heatmap',
      'Dedicated account manager',
    ],
    cta: 'Start Enterprise',
    ctaStyle: 'dark',
  },
];

export function PricingTiers() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

  return (
    <section id="pricing" className="py-24 relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse at 20% 80%, #FFFDF7 0%, #FDF6E3 80%, #FAF1CC 100%)',
    }}>
      <div className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='rgba(201,150,42,0.07)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E")`,
          backgroundSize: '45px 45px',
          backgroundPosition: 'center',
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard-50 border border-mustard-200 text-mustard text-xs font-bold uppercase tracking-widest">
              Pricing
            </span>
            <h2 className="mt-4 text-4xl font-extrabold text-brown">
              Choose Your <span className="text-gradient-mustard">Growth Plan</span>
            </h2>
            <p className="mt-3 text-brown-light max-w-lg mx-auto">
              Transparent pricing. No hidden fees. Scale as your portfolio grows.
            </p>

            {/* Billing toggle */}
            <div className="mt-6 inline-flex items-center gap-1 bg-cream rounded-pill p-1 border border-cream-200">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-4 py-2 rounded-pill text-sm font-semibold transition-all duration-200 ${
                  billing === 'monthly' ? 'bg-white text-brown shadow-clay-sm' : 'text-brown-light'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`px-4 py-2 rounded-pill text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  billing === 'annual' ? 'bg-white text-brown shadow-clay-sm' : 'text-brown-light'
                }`}
              >
                Annual
                <span className="text-[10px] font-bold text-mustard bg-mustard-50 px-2 py-0.5 rounded-pill">Save 20%</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-4">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            const isPro = tier.id === 'pro';
            return (
              <ScrollReveal key={tier.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`relative rounded-clay-lg overflow-hidden border transition-all duration-300 ${
                    isPro
                      ? 'border-mustard shadow-float-mustard bg-white'
                      : 'border-cream-200 shadow-clay bg-white hover:shadow-clay-hover'
                  }`}
                >
                  {/* Popular badge */}
                  {tier.badge && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-mustard-light to-mustard" />
                  )}

                  <div className="p-8 flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-clay-sm flex items-center justify-center"
                        style={{ background: tier.accent, boxShadow: `0 6px 16px ${tier.color}20` }}
                      >
                        <Icon size={22} strokeWidth={2} style={{ color: tier.color }} />
                      </div>
                      {tier.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-mustard bg-mustard-50 px-3 py-1.5 rounded-pill border border-mustard-200">
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    {/* Name + price */}
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest" style={{ color: tier.color }}>
                        {tier.name}
                      </p>
                      <p className="text-3xl font-black text-brown mt-1">
                        {billing === 'annual' ? tier.annualPrice : tier.price}
                        <span className="text-sm font-semibold text-brown-light ml-1">
                          {billing === 'annual' ? '/year' : tier.period}
                        </span>
                      </p>
                      {billing === 'annual' && (
                        <p className="text-xs text-brown-light mt-1">{tier.annualNote}</p>
                      )}
                      <p className="mt-2 text-xs font-bold text-mustard bg-mustard-50 inline-flex px-2 py-1 rounded-sm">
                        {tier.listingCap}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="flex flex-col gap-2.5">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${tier.color}15` }}
                          >
                            <Check size={10} strokeWidth={3} style={{ color: tier.color }} />
                          </div>
                          <span className="text-sm text-brown-light leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.a
                      href="https://app.ilesure.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3.5 rounded-pill font-bold text-sm text-center transition-all duration-200 ${
                        tier.ctaStyle === 'filled'
                          ? 'bg-gradient-to-r from-mustard-light to-mustard text-white shadow-float-mustard'
                          : tier.ctaStyle === 'dark'
                          ? 'bg-brown text-white'
                          : 'border-2 border-cream-300 text-brown hover:border-mustard hover:text-mustard'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {tier.cta}
                    </motion.a>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <p className="text-center text-sm text-brown-light mt-8">
            All plans include access to basic analytics. Start with the <span className="font-semibold text-brown">Free Tier</span> today.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
