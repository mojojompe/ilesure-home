export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'faq1',
    question: 'What is iléSure?',
    answer: "iléSure (Yoruba for \"Sure Home\") is a User-focused housing discovery and roommate matching platform built for the off-destination accommodation ecosystem around key locations and other universities in Nigeria. We connect Users with verified landlords, agents, and potential roommates.",
  },
  {
    id: 'faq2',
    question: 'Who can list apartments on iléSure?',
    answer: 'Only verified agents, landlords, and registered property companies can create listings. Each lister goes through a thorough verification process including NIN, BVN, and property document checks before any listing goes live. This ensures every apartment you see is legitimate.',
  },
  {
    id: 'faq3',
    question: 'How does roommate matching work?',
    answer: 'When you express interest in a shareable apartment, you fill a detailed 12-section compatibility form covering lifestyle, sleep schedule, cleanliness, cooking habits, religious practice, and more. Our algorithm calculates a weighted compatibility score (0–100) between you and potential roommates. Contact details are only shared after both parties confirm mutual interest.',
  },
  {
    id: 'faq4',
    question: 'Is iléSure free for Users?',
    answer: 'Browsing listings, joining the waitlist, and filling your roommate profile are completely free. A small 5% platform fee (applied to the total move-in cost) is charged only when you complete a booking. For shared apartments, an additional 1% roommate matching fee applies.',
  },
  {
    id: 'faq5',
    question: 'Which areas and universities does iléSure cover?',
    answer: 'We currently focus on the key locations corridor, Toll Gate, Soka, Felele, New Garage and Akala Express, and surrounding areas in Nigeria. We are actively expanding to cover UI, Polytechnic areas, and beyond in 2026.',
  },
  {
    id: 'faq6',
    question: 'How are agents and landlords verified?',
    answer: "Every agent or landlord must provide a government-issued NIN, BVN, proof of property ownership (or tenancy agreement), a utility bill not older than 3 months, and complete a live selfie verification. Companies must additionally provide their CAC registration certificate and director details. All documents are reviewed by our admin team before approval.",
  },
  {
    id: 'faq7',
    question: 'What happens after I book an apartment?',
    answer: "Once payment is confirmed, you'll receive a booking confirmation and the apartment is tagged as booked on the agent's dashboard. For shared apartments, the listing is tagged with \"Needs Roommate\" and remains visible in the feed until all rooms are filled. The agent is notified immediately and coordinates the move-in.",
  },
  {
    id: 'faq8',
    question: 'When does the iléSure app launch?',
    answer: 'The iléSure mobile app is currently in final development. You can join our early access waitlist to be among the first Users and agents to get access when we go live. We will notify you by email and WhatsApp as soon as the app is available.',
  },
];
