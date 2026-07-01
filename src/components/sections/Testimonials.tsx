import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ayomip Odu',
    role: 'Year 2 User',
    avatar: 'AO',
    content: "I was skeptical about finding a safe place Anywhere, but iléSure made it so easy. Found a 2-bedroom just 5 minutes from LCU!",
    rating: 5,
    location: 'Bodija',
  },
  {
    name: 'Chidinma Eze',
    role: 'Year 3 User',
    avatar: 'CE',
    content: "The roommate matching feature connected me with my best friend! We now share a spacious apartment near Oba Otudeko.",
    rating: 5,
    location: 'Toll Gate',
  },
  {
    name: 'Emmanuel Adeyemi',
    role: 'Year 1 User',
    avatar: 'EA',
    content: "As a fresher, I was worried about accommodation. iléSure's verified agents gave me peace of mind. Highly recommended!",
    rating: 5,
    location: 'Agbowo',
  },
  {
    name: 'Funke Bakare',
    role: 'Year 4 User',
    avatar: 'FB',
    content: "The transparency in pricing and location details is unmatched. No hidden fees, no surprises. Just real listings.",
    rating: 5,
    location: 'Dugbe',
  },
  {
    name: 'Segun Olatunji',
    role: 'Year 2 User',
    avatar: 'SO',
    content: "Found my dream apartment within a week! The filters helped me narrow down exactly what I needed - budget, distance, amenities.",
    rating: 5,
    location: 'Ring Road',
  },
  {
    name: 'Nadia Ibrahim',
    role: 'Year 3 User',
    avatar: 'NI',
    content: "The verification process gave me confidence. I knew every agent was legitimate before I even contacted them.",
    rating: 5,
    location: 'Iyaganku',
  },
  {
    name: 'Kunle Adebayo',
    role: 'Year 1 User',
    avatar: 'KA',
    content: "Finally, a platform that understands User needs! The proximity filters saved me so much time.",
    rating: 5,
    location: 'Sabo',
  },
  {
    name: 'Amina Bello',
    role: 'Year 2 User',
    avatar: 'AB',
    content: "The virtual tours helped me decide without visiting. Saved me time and transport costs!",
    rating: 5,
    location: 'Molete',
  },
];

export function Testimonials() {  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Floating Testimonial Illustration */}
      <img
        src="/illustrations/testimonials.png"
        alt="Testimonial Speech Bubble"
        className="absolute top-auto max-w-[25vw] md:max-w-[40vw] lg:max-w-none opacity-15 md:opacity-30 lg:opacity-100 top-10 right-20 w-48 h-auto  pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 relative z-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard/10 text-mustard text-xs font-bold uppercase tracking-widest mb-4">
            <Quote size={12} />
            'Testimonials'
                                </span>
          <h2 className="text-4xl font-extrabold text-brown">
            'Loved by'{' '}
            <span className="text-mustard">'Users'</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex">
          <motion.div
            className="flex gap-6 py-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[350px] bg-white rounded-clay shadow-clay p-6 relative"
              >
                <div className="absolute -top-3 -left-2 w-10 h-10 rounded-clay-sm bg-mustard flex items-center justify-center">
                  <Quote size={18} className="text-white" />
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-mustard fill-mustard" />
                  ))}
                </div>

                <p className="text-brown leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mustard to-brown flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-brown">{testimonial.name}</p>
                    <p className="text-sm text-brown-light">{testimonial.role} · {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cream to-transparent z-10" />
      </div>
    </section>
  );
}
