export interface Feature {
  id: string;
  icon: string; // lucide icon name - we import dynamically
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: 'discovery',
    icon: 'Search',
    title: 'Smart Discovery',
    description: 'Filter by distance to destination, power stability, water availability, security, and more. Find the exact User home you need.',
  },
  {
    id: 'roommate',
    icon: 'Users',
    title: 'Roommate Matching',
    description: 'Our compatibility engine scores you against potential roommates across 12 lifestyle dimensions, so you move in with the right person.',
  },
  {
    id: 'verified',
    icon: 'ShieldCheck',
    title: 'Verified Listings',
    description: 'Every agent and landlord is verified with NIN, BVN, and property documents. No fake listings, no scams, just trusted homes.',
  },
  {
    id: 'proximity',
    icon: 'MapPin',
    title: 'destination Proximity',
    description: 'Every listing shows exact distance to key locations, UI, and nearby landmarks, by walk, bike, and car.',
  },
  {
    id: 'waitlist',
    icon: 'ClipboardList',
    title: 'Waitlist System',
    description: 'Join the waitlist for your preferred corridor and budget. Get notified the moment your ideal apartment becomes available.',
  },
  {
    id: 'payments',
    icon: 'Lock',
    title: 'Secure Payments',
    description: 'Transparent fee breakdown with a flat 3% platform fee. Your payment is logged and your booking is confirmed before move-in.',
  },
];
