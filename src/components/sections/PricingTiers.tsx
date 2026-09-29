import { motion } from 'framer-motion';
import { Tick01Icon } from '@hugeicons/react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useEffect, useState } from 'react';
import { WaitlistModal } from '../ui/WaitlistModal';
import { FALLBACK_TIERS, fetchPublicTiers, type PublicTier } from '../../api/tiers';

/**
 * Visual design per tier id. Prices, listing caps and feature lines come from the live
 * public GET /tiers catalogue (FALLBACK_TIERS, which mirrors the backend seed, until it
 * loads or if it cannot be reached). The prices used to be hard-coded here at a tenth of
 * the real ones (N1,500 / N3,500 / N7,000) under a `pro` id the backend does not have.
 */
const TIER_DESIGN: Record<string, {
  badge: string | null;
  color: string;
  accent: string;
  image: string;
  cta: string;
  ctaStyle: 'outline' | 'filled' | 'dark';
}> = {
  basic: {
    badge: null,
    color: '#A0714F',
    accent: '#F2E8DF',
    image: '/illustrations/generated/pricing_basic.png',
    cta: 'Get Started',
    ctaStyle: 'outline',
  },
  premium: {
    badge: 'Most Popular',
    color: '#319795',
    accent: '#E6FFFA',
    image: '/illustrations/generated/pricing_premium.png',
    cta: 'Go Premium',
    ctaStyle: 'filled',
  },
  enterprise: {
    badge: 'Best Value',
    color: '#C6A800',
    accent: '#FFFFF0',
    image: '/illustrations/generated/pricing_enterprise.png',
    cta: 'Start Enterprise',
    ctaStyle: 'dark',
  },
};

const naira = (n: number) => `₦${n.toLocaleString('en-NG')}`;

function toView(t: PublicTier) {
  const design = TIER_DESIGN[t.id] ?? TIER_DESIGN.basic;
  const monthly = t.priceMonthly ?? t.price ?? 0;
  const yearly = t.priceYearly ?? monthly * 12;
  const cap = t.features?.maxListings;
  const features = [
    cap ? `Up to ${cap} active listing slots` : null,
    t.features?.visibility ?? null,
    t.features?.analytics ?? null,
    t.features?.support ?? null,
  ].filter((f): f is string => !!f);
  return {
    id: t.id,
    name: t.name,
    badge: TIER_DESIGN[t.id] ? design.badge : (t.popular ? 'Most Popular' : null),
    highlighted: t.popular ?? t.id === 'premium',
    monthly,
    yearly,
    price: naira(monthly),
    period: '/month',
    annualPrice: naira(yearly),
    annualNote: 'billed annually',
    color: design.color,
    accent: design.accent,
    image: design.image,
    listingCap: cap ? `${cap} listings` : '',
    features,
    cta: TIER_DESIGN[t.id] ? design.cta : 'Get Started',
    ctaStyle: design.ctaStyle,
  };
}

export function PricingTiers() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [catalogue, setCatalogue] = useState<PublicTier[]>(FALLBACK_TIERS);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchPublicTiers(ctrl.signal).then((live) => {
      if (live) setCatalogue(live);
    });
    return () => ctrl.abort();
  }, []);

  const tiers = catalogue.map(toView);
  // Annual saving as the catalogue actually prices it (the seed is 20%), not a fixed claim.
  const savings = tiers
    .filter((t) => t.monthly > 0 && t.yearly > 0)
    .map((t) => Math.round((1 - t.yearly / (t.monthly * 12)) * 100));
  const maxSaving = savings.length ? Math.max(...savings) : 0;
  const savingLabel = maxSaving > 0
    ? (savings.every((v) => v === maxSaving) ? `Save ${maxSaving}%` : `Save up to ${maxSaving}%`)
    : null;

  return (
    <section id="pricing" className="py-24 relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse at 20% 80%, #FFFDF7 0%, #FDF6E3 80%, #FAF1CC 100%)',
    }}>
      <div className="absolute inset-0 pointer-events-none opacity-80" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 39.5h40M39.5 0v40' stroke='rgba(201,150,42,0.07)' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }} />
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
              Transparent pricing. No hidden fees. JusticeScale01Icon as your portfolio grows.
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
                {/* BUGFIX (QA-MKT-006): the badge only appears on the option it describes.
                    Its figure is computed from the tier catalogue's monthly vs yearly prices. */}
                {billing === 'annual' && savingLabel && (
                  <span className="text-[10px] font-bold text-mustard bg-mustard-50 px-2 py-0.5 rounded-pill">{savingLabel}</span>
                )}
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-4">
          {tiers.map((tier, i) => {
            const isPro = tier.highlighted;
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
                      <div className="w-16 h-16 flex items-center justify-center -ml-2">
                        <img src={tier.image} alt={tier.name} className="w-full h-full object-contain drop-shadow-sm" />
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
                      {tier.listingCap && (
                        <p className="mt-2 text-xs font-bold text-mustard bg-mustard-50 inline-flex px-2 py-1 rounded-sm">
                          {tier.listingCap}
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="flex flex-col gap-2.5">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${tier.color}15` }}
                          >
                            <Tick01Icon size={10} strokeWidth={3} style={{ color: tier.color }} />
                          </div>
                          <span className="text-sm text-brown-light leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.button
                      onClick={() => setWaitlistOpen(true)}
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
                    </motion.button>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <p className="text-center text-sm text-brown-light mt-8">
            All plans include access to basic analytics.
                                </p>
        </ScrollReveal>
      </div>
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </section>
  );
}
