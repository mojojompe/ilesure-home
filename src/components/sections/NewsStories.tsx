import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Newspaper, Building, Map, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

interface Story {
  id: string;
  title: string;
  category: string;
  categoryIcon: any;
  imageUrl: string;
  source: string;
  date: string;
  readTime: string;
  url?: string;
}

// 6 fallback stories shown when the API is unavailable
const fallbackStories: Story[] = [
  {
    id: '1',
    title: "How Remote Work is Reshaping the Global Apartment Rental Market in 2026",
    category: 'Apartments',
    categoryIcon: Building,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    source: 'Real Estate Daily',
    date: 'May 28, 2026',
    readTime: '4 min read',
  },
  {
    id: '2',
    title: 'The Rise of Co-Living Spaces: Why Millennials Prefer Shared Premium Housing',
    category: 'Real Estate',
    categoryIcon: Newspaper,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    source: 'Property Insights',
    date: 'May 30, 2026',
    readTime: '6 min read',
  },
  {
    id: '3',
    title: 'Land Acquisition Guide: 5 Red Flags to Watch Out For Before You Buy',
    category: 'Land & Plots',
    categoryIcon: Map,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    source: 'Land Investors Weekly',
    date: 'May 31, 2026',
    readTime: '5 min read',
  },
  {
    id: '4',
    title: "Nigeria's Housing Deficit: Why PropTech Startups Are Stepping In",
    category: 'Real Estate',
    categoryIcon: Building,
    imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800',
    source: 'TechCabal',
    date: 'May 29, 2026',
    readTime: '7 min read',
  },
  {
    id: '5',
    title: 'Interest Rate Cuts Drive Renewed Buyer Confidence in Urban Property Markets',
    category: 'Market Trends',
    categoryIcon: Newspaper,
    imageUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800',
    source: 'Bloomberg Real Estate',
    date: 'May 27, 2026',
    readTime: '5 min read',
  },
  {
    id: '6',
    title: 'Smart Apartments & IoT: The Next Frontier in African Urban Living',
    category: 'Apartments',
    categoryIcon: Building,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    source: 'Africa Housing News',
    date: 'May 26, 2026',
    readTime: '4 min read',
  },
];

export function NewsStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch up to 6 stories from HousingWire via rss2json
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://www.housingwire.com/feed/'
        );
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
          // Grab up to 6; pad with fallback if fewer come back
          const raw = data.items.slice(0, 6);
          const apiStories: Story[] = raw.map((item: any, idx: number) => ({
            id: String(idx),
            title: item.title,
            category:
              item.categories && item.categories.length > 0
                ? item.categories[0]
                : 'Real Estate',
            categoryIcon: Newspaper,
            imageUrl: item.thumbnail || fallbackStories[idx % fallbackStories.length].imageUrl,
            source: 'HousingWire',
            date: new Date(item.pubDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            readTime: '5 min read',
            url: item.link,
          }));

          // Pad to 6 if fewer stories came back
          const padded =
            apiStories.length < 6
              ? [
                  ...apiStories,
                  ...fallbackStories.slice(apiStories.length),
                ]
              : apiStories;

          setStories(padded);
        } else {
          setStories(fallbackStories);
        }
      } catch {
        setStories(fallbackStories);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const totalPages = Math.max(1, Math.ceil(stories.length / itemsPerPage));
  const currentStories = stories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <section
      className="py-24 relative border-t border-brown/20"
      style={{ backgroundColor: '#3B1A08' }}
    >
      {/* Brown grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Warm centre glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,150,42,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Header ── */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/10 border border-white/20 text-mustard text-xs font-bold uppercase tracking-widest mb-4">
                <Newspaper size={12} />
                Industry News
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white font-serif tracking-tight">
                Latest in Real Estate
              </h2>
              <p className="mt-4 text-white/60 text-lg">
                Stay updated with the latest trends in premium apartments, land acquisitions, and market shifts.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Stories Grid ── */}
        <div className="w-full">
          {loading ? (
            /* Skeleton Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
                  <div className="w-full h-56 bg-white/10 rounded-clay" />
                  <div className="w-24 h-4 bg-white/10 rounded-full" />
                  <div className="w-full h-8 bg-white/10 rounded-sm" />
                  <div className="w-2/3 h-8 bg-white/10 rounded-sm" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Actual Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentStories.map((story, i) => {
                  const Icon = story.categoryIcon;
                  return (
                    <motion.a
                      key={story.id}
                      href={story.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-clay overflow-hidden bg-white shadow-sm hover:shadow-clay transition-all duration-300"
                      whileHover={{ y: -4 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-pill shadow-sm flex items-center gap-1.5">
                          <Icon size={12} className="text-mustard" />
                          <span className="text-[10px] font-bold text-brown uppercase tracking-wider">
                            {story.category}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6 flex flex-col flex-grow gap-3">
                        <h3 className="font-serif text-xl font-bold text-brown leading-snug group-hover:text-mustard transition-colors line-clamp-3">
                          {story.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between text-xs font-medium text-brown-light border-t border-gray-100 pt-5">
                          <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-mustard/20 flex items-center justify-center text-mustard uppercase text-[10px] font-bold">
                              {story.source.charAt(0)}
                            </span>
                            <span className="truncate max-w-[120px]">{story.source}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {story.date}
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.3 }}
                  className="mt-12 flex items-center justify-center gap-4"
                >
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-mustard transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white/5"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`transition-all rounded-full font-bold text-sm flex items-center justify-center ${
                          currentPage === i + 1
                            ? 'w-10 h-10 bg-mustard text-brown'
                            : 'w-10 h-10 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-mustard transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white/5"
                  >
                    <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
