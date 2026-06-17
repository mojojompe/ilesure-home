import { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const testimonials = [
  { name: 'Ayomip Odu', role: 'Year 2 User', avatar: 'AO', content: "I was skeptical about finding a safe place Anywhere, but iléSure made it so easy. Found a 2-bedroom just 5 minutes from LCU!", rating: 5, location: 'Bodija' },
  { name: 'Chidinma Eze', role: 'Year 3 User', avatar: 'CE', content: "The roommate matching feature connected me with my best friend! We now share a spacious apartment near Oba Otudeko.", rating: 5, location: 'Toll Gate' },
  { name: 'Emmanuel Adeyemi', role: 'Year 1 User', avatar: 'EA', content: "As a fresher, I was worried about accommodation. iléSure's verified agents gave me peace of mind. Highly recommended!", rating: 5, location: 'Agbowo' },
  { name: 'Funke Bakare', role: 'Year 4 User', avatar: 'FB', content: "The transparency in pricing and location details is unmatched. No hidden fees, no surprises. Just real listings.", rating: 5, location: 'Dugbe' },
  { name: 'Segun Olatunji', role: 'Year 2 User', avatar: 'SO', content: "Found my dream apartment within a week! The filters helped me narrow down exactly what I needed - budget, distance, amenities.", rating: 5, location: 'Ring Road' },
  { name: 'Nadia Ibrahim', role: 'Year 3 User', avatar: 'NI', content: "The verification process gave me confidence. I knew every agent was legitimate before I even contacted them.", rating: 5, location: 'Iyaganku' },
  { name: 'Kunle Adebayo', role: 'Year 1 User', avatar: 'KA', content: "Finally, a platform that understands User needs! The proximity filters saved me so much time.", rating: 5, location: 'Sabo' },
  { name: 'Amina Bello', role: 'Year 2 User', avatar: 'AB', content: "The virtual tours helped me decide without visiting. Saved me time and transport costs!", rating: 5, location: 'Molete' },
  { name: 'Tunde Afolabi', role: 'Graduating User', avatar: 'TA', content: "Finding a calm place for my final year was crucial. The serene environment filter worked like a charm.", rating: 4, location: 'Akala Express' },
];

function MasonryCard({ t }: { t: typeof testimonials[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * -12);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mouseX.set(0); mouseY.set(0); }}
      animate={{
        rotateY: hovered ? mouseX.get() : 0,
        rotateX: hovered ? mouseY.get() : 0,
        scale: hovered ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      className="mb-6 w-full"
    >
      <div className="bg-white rounded-clay p-6 shadow-clay border border-cream-200 relative overflow-hidden spotlight-card h-full flex flex-col">
        <div className="absolute -top-3 -left-2 w-10 h-10 rounded-clay-sm bg-mustard-50 flex items-center justify-center">
          <Quote size={18} className="text-mustard" />
        </div>

        <div className="flex gap-1 mb-4 mt-2 justify-end">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < t.rating ? 'text-mustard fill-mustard' : 'text-cream-300 fill-cream-300'} />
          ))}
        </div>

        <p className="text-brown text-sm leading-relaxed mb-6 flex-grow">
          "{t.content}"
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-cream-100 mt-auto">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mustard to-brown flex items-center justify-center text-white font-bold text-sm relative z-10">
              {t.avatar}
            </div>
            {/* Animating pulse behind avatar on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-mustard"
              initial={{ scale: 1, opacity: 0 }}
              animate={hovered ? { scale: [1, 1.4], opacity: [0.4, 0] } : { scale: 1, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <div>
            <p className="font-bold text-brown text-sm">{t.name}</p>
            <p className="text-[11px] text-brown-light">{t.role} · {t.location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SocialProofWall() {
  // Split into 3 columns
  const col1 = [testimonials[0], testimonials[3], testimonials[6], testimonials[0]];
  const col2 = [testimonials[1], testimonials[4], testimonials[7], testimonials[1]];
  const col3 = [testimonials[2], testimonials[5], testimonials[8], testimonials[2]];

  return (
    <section id="social-proof" className="py-24 bg-cream relative overflow-hidden h-[800px]">
      {/* Fade masks for top/bottom of the wall */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cream to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream to-transparent z-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 mb-8 pointer-events-auto flex flex-col md:flex-row items-center justify-between">
        <SectionHeading
          eyebrow="Loved by Users"
          title="Don't just take our word for it"
          align="left"
        />
        
        {/* Render the illustration from the old Testimonials section */}
        {/* <img
          src="/illustrations/testimonials.png"
          alt="Testimonial Speech Bubble"
          className="w-48 h-auto  pointer-events-none mt-8 md:mt-0 opacity-80"
          style={{ mixBlendMode: 'multiply' }}
        /> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[1200px]">

          {/* Col 1 - Fast */}
          <div className="flex flex-col gap-6 anim-scroll-up-fast">
            {[...col1, ...col1].map((t, i) => <MasonryCard key={`c1-${i}`} t={t} />)}
          </div>

          {/* Col 2 - Slow (Offset starting position) */}
          <div className="flex flex-col gap-6 anim-scroll-up-slow hidden md:flex pt-12">
            {[...col2, ...col2].map((t, i) => <MasonryCard key={`c2-${i}`} t={t} />)}
          </div>

          {/* Col 3 - Med */}
          <div className="flex flex-col gap-6 anim-scroll-up hidden lg:flex">
            {[...col3, ...col3].map((t, i) => <MasonryCard key={`c3-${i}`} t={t} />)}
          </div>

        </div>
      </div>
    </section>
  );
}
