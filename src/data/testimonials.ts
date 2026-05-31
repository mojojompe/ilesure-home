export interface Testimonial {
  id: string;
  name: string;
  role: string;
  university: string;
  quote: string;
  rating: number;
  initials: string;
  avatarColor: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Adaeze Okonkwo',
    role: '300L, Law',
    university: 'key locations',
    quote: 'iléSure helped me find a verified self-con just 5 minutes from school within 3 days. The distance info and power ratings were spot on!',
    rating: 5,
    initials: 'AO',
    avatarColor: '#C9962A',
  },
  {
    id: 't2',
    name: 'Tunde Fashola',
    role: '200L, Economics',
    university: 'key locations',
    quote: 'The roommate matching feature is genuinely impressive. My roommate and I scored 84% compatible, and it showed. No conflicts so far.',
    rating: 5,
    initials: 'TF',
    avatarColor: '#5C3317',
  },
  {
    id: 't3',
    name: 'Ngozi Eze',
    role: 'Postgraduate, MBA',
    university: 'University of Nigeria',
    quote: "I was skeptical at first, but every listing had the kind of detail I was looking for, water, generator hours, road access. This is exactly what we needed.",
    rating: 5,
    initials: 'NE',
    avatarColor: '#A0714F',
  },
  {
    id: 't4',
    name: 'Emeka Chukwu',
    role: '400L, Engineering',
    university: 'key locations',
    quote: 'Joined the waitlist and got notified about a 2-bedroom flat in Toll Gate within two weeks. Saved me weeks of stressful searching.',
    rating: 5,
    initials: 'EC',
    avatarColor: '#C9962A',
  },
  {
    id: 't5',
    name: 'Fatimah Bello',
    role: '100L, Medicine',
    university: 'key locations',
    quote: 'As a fresher, I had no idea how to find a safe place Anywhere. iléSure made it easy, verified agents, clear pricing, no hidden fees.',
    rating: 5,
    initials: 'FB',
    avatarColor: '#5C3317',
  },
];
