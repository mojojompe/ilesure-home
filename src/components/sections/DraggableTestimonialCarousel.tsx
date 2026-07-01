import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
];

export function DraggableTestimonialCarousel() {  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const threshold = 100;
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (info.offset.x < -threshold && currentIndex < testimonials.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    animate(x, -currentIndex * 100, { type: 'spring', stiffness: 300, damping: 30 });
  }, [currentIndex, x]);

  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-clay-sm flex items-center justify-center text-brown hover:bg-mustard hover:text-white transition-colors"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentIndex(prev => Math.min(testimonials.length - 1, prev + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-clay-sm flex items-center justify-center text-brown hover:bg-mustard hover:text-white transition-colors"
            disabled={currentIndex === testimonials.length - 1}
          >
            <ChevronRight size={20} />
          </button>

          {/* Carousel */}
          <div ref={containerRef} className="overflow-hidden mx-8">
            <motion.div
              className="flex gap-6"
              style={{ x }}
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0.1}

              onDragEnd={handleDragEnd}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`relative h-full bg-white rounded-clay shadow-clay p-6 transition-all duration-300 ${index === currentIndex ? 'ring-2 ring-mustard/30' : ''
                    }`}>
                    {/* Quote icon */}
                    <div className="absolute -top-3 -left-2 w-10 h-10 rounded-clay-sm bg-mustard flex items-center justify-center">
                      <Quote size={18} className="text-white" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-4 h-4 rounded-full bg-mustard"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-brown leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mustard to-brown flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-brown">{testimonial.name}</p>
                        <p className="text-sm text-brown-light">{testimonial.role} · {testimonial.location}</p>
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-mustard/10" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'w-8 bg-mustard'
                    : 'w-2 bg-brown/20 hover:bg-brown/40'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
