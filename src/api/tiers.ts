import { API_ENDPOINTS } from '../lib/config';

/** One entry of the public GET /api/v1/tiers catalogue (only the fields the site uses). */
export interface PublicTier {
  id: string;
  name: string;
  price?: number;
  priceMonthly?: number;
  priceYearly?: number;
  popular?: boolean;
  active?: boolean;
  features?: {
    maxListings?: number;
    analytics?: string;
    support?: string;
    visibility?: string;
  };
}

/**
 * Fallback used until (or if) the live catalogue loads. Mirrors the backend seed
 * (IleSure_Backend/src/scripts/seedTiers.ts). KEEP IN SYNC with it.
 */
export const FALLBACK_TIERS: PublicTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    priceMonthly: 15000,
    priceYearly: 144000,
    features: {
      maxListings: 15,
      analytics: 'Detailed Booking Analytics',
      support: 'Priority Email Support',
      visibility: 'Priority Listing Visibility',
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    priceMonthly: 35000,
    priceYearly: 336000,
    popular: true,
    features: {
      maxListings: 30,
      analytics: 'Advanced Demand Analytics',
      support: 'Priority Phone + Email Support',
      visibility: 'Featured Placement & Gold Badge',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceMonthly: 70000,
    priceYearly: 672000,
    features: {
      maxListings: 50,
      analytics: 'Full Reporting & Demand Heatmap',
      support: 'Dedicated Account Manager',
      visibility: 'Top of Discovery Feed Placement',
    },
  },
];

/** Paid, active tiers from the live catalogue, or null when it cannot be read. */
export async function fetchPublicTiers(signal?: AbortSignal): Promise<PublicTier[] | null> {
  try {
    const res = await fetch(API_ENDPOINTS.tiers.list, { signal });
    if (!res.ok) return null;
    const body = await res.json();
    const tiers: PublicTier[] | undefined = body?.data?.tiers;
    if (!Array.isArray(tiers)) return null;
    const paid = tiers.filter(
      (t) => t && typeof t.id === 'string' && t.active !== false && (t.priceMonthly ?? t.price ?? 0) > 0,
    );
    return paid.length > 0 ? paid : null;
  } catch {
    return null;
  }
}
