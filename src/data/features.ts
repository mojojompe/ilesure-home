export interface Feature {
  id: string;
  image: string; // path to illustration
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: 'discovery',
    image: '/illustrations/generated/feat_discovery.png',
    title: 'Smart Discovery',
    description: 'Filter by distance to destination, power stability, water availability, security, and more. Find the exact User home you need.',
  },
  {
    id: 'roommate',
    image: '/illustrations/generated/feat_roommate.png',
    title: 'Roommate Matching',
    description: 'Our compatibility engine scores you against potential roommates across 12 lifestyle dimensions, so you move in with the right person.',
  },
  {
    id: 'verified',
    image: '/illustrations/generated/feat_verified.png',
    title: 'Verified Listings',
    description: 'Every agent and landlord is verified with NIN, BVN, and property documents. No fake listings, no scams, just trusted homes.',
  },
  {
    id: 'proximity',
    image: '/illustrations/generated/feat_proximity.png',
    title: 'Destination Proximity',
    description: 'Every listing shows exact distance to key locations, UI, and nearby landmarks, by walk, bike, and car.',
  },
  {
    id: 'waitlist',
    image: '/illustrations/generated/feat_waitlist.png',
    title: 'Waitlist System',
    description: 'Join the waitlist for your preferred corridor and budget. Get notified the moment your ideal apartment becomes available.',
  },
  {
    id: 'payments',
    image: '/illustrations/generated/feat_payments.png',
    title: 'Secure Payments',
    description: 'Transparent fee breakdown with a flat 5% platform fee. Your payment is logged and your booking is confirmed before move-in.',
  },
];
