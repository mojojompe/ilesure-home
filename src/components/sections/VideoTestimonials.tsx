import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useTranslation } from "react-i18next";

const videoTestimonials = [
  {
    name: 'Tolu Akinlade',
    role: 'Year 3, LCU',
    avatar: 'TA',
    teaser: 'How I found my dream apartment in 3 days using iléSure.',
    duration: '2:14',
    rating: 5,
    thumbnail: 'linear-gradient(135deg, #FAF1CC 0%, #F5C842 40%, #C9962A 100%)',
  },
  {
    name: 'Blessing Nwosu',
    role: 'Year 1, UI',
    avatar: 'BN',
    teaser: 'As a fresher, I was scared. iléSure made it simple and safe.',
    duration: '1:47',
    rating: 5,
    thumbnail: 'linear-gradient(135deg, #F2E8DF 0%, #DEBEBF 40%, #A0714F 100%)',
  },
  {
    name: 'Ahmed Sule',
    role: 'Year 4, Poly Nigeria',
    avatar: 'AS',
    teaser: 'My roommate became my best friend — thanks to iléSure matching.',
    duration: '3:02',
    rating: 5,
    thumbnail: 'linear-gradient(135deg, #271608 0%, #5C3317 50%, #C9962A 100%)',
  },
];

export function VideoTestimonials() {
    const { t } = useTranslation();
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-mustard/8 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brown/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-mustard-50 border border-mustard-200 text-mustard text-xs font-bold uppercase tracking-widest">
              <Play size={11} className="fill-mustard" />
              {t("Watch Their Stories")}
                                      </span>
            <h2 className="mt-4 text-4xl font-extrabold text-brown">
              {t("Real Users,")} <span className="text-gradient-mustard">{t("Real Homes")}</span>
            </h2>
            <p className="mt-3 text-brown-light max-w-lg mx-auto">
              {t("Hear directly from Users who found their sure home through iléSure.")}
                                      </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoTestimonials.map((v, i) => (
            <ScrollReveal key={v.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-clay overflow-hidden shadow-clay border border-cream-200 cursor-pointer group"
              >
                {/* Thumbnail */}
                <div
                  className="relative h-48 flex items-center justify-center"
                  style={{ background: v.thumbnail }}
                >
                  {/* Duration badge */}
                  <span className="absolute top-3 right-3 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded-sm backdrop-blur-sm">
                    {v.duration}
                  </span>

                  {/* Play button */}
                  <motion.div
                    className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-float-mustard"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Play size={22} className="text-mustard fill-mustard ml-1" />
                  </motion.div>

                  {/* Coming soon overlay */}
                  <span className="absolute bottom-3 left-3 bg-mustard/90 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-pill">
                    {t("Coming Soon")}
                                                </span>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(v.rating)].map((_, si) => (
                      <Star key={si} size={12} className="text-mustard fill-mustard" />
                    ))}
                  </div>
                  <p className="font-semibold text-brown text-sm leading-snug">
                    "{v.teaser}"
                  </p>
                  <div className="flex items-center gap-2.5 pt-2 border-t border-cream-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mustard to-brown flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      {v.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-brown text-xs">{v.name}</p>
                      <p className="text-[11px] text-brown-light">{v.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
