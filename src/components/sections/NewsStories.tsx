import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Newspaper, Building, Map } from 'lucide-react';
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

const mockStories: Story[] = [
  {
    id: '1',
    title: 'How Remote Work is Reshaping the Global Apartment Rental Market in 2026',
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
];

export function NewsStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real estate news from HousingWire via rss2json
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.housingwire.com/feed/');
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
          const apiStories = data.items.slice(0, 3).map((item: any, idx: number) => ({
            id: String(idx),
            title: item.title,
            category: item.categories && item.categories.length > 0 ? item.categories[0] : 'Real Estate',
            categoryIcon: Newspaper, 
            imageUrl: item.thumbnail || mockStories[idx].imageUrl, // Fallback image if thumbnail is missing
            source: 'HousingWire',
            date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            readTime: '5 min read',
            url: item.link
          }));
          setStories(apiStories);
        } else {
          setStories(mockStories);
        }
      } catch (error) {
        console.error('Failed to fetch real estate news:', error);
        setStories(mockStories);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="py-24 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-brown/5 border border-brown/10 text-brown text-xs font-bold uppercase tracking-widest mb-4">
                <Newspaper size={12} />
                Industry News
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-brown font-serif tracking-tight">
                Latest in Real Estate
              </h2>
              <p className="mt-4 text-brown-light text-lg">
                Stay updated with the latest trends in premium apartments, land acquisitions, and market shifts.
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-mustard hover:text-mustard-dark transition-colors uppercase tracking-widest whitespace-nowrap group">
              View All Stories
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
                  <div className="w-full h-56 bg-gray-200 rounded-clay" />
                  <div className="w-24 h-4 bg-gray-200 rounded-full" />
                  <div className="w-full h-8 bg-gray-200 rounded-sm" />
                  <div className="w-2/3 h-8 bg-gray-200 rounded-sm" />
                </div>
              ))
            : stories.map((story, i) => {
                const Icon = story.categoryIcon;
                return (
                  <ScrollReveal key={story.id} delay={i * 0.15} direction="up">
                    <motion.a
                      href={story.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col h-full rounded-clay border border-gray-100 overflow-hidden bg-white shadow-sm hover:shadow-clay transition-all duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <div className="relative h-56 overflow-hidden bg-gray-100">
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
                      <div className="p-6 flex flex-col flex-grow gap-4">
                        <h3 className="font-serif text-xl font-bold text-brown leading-snug group-hover:text-mustard transition-colors line-clamp-3">
                          {story.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between text-xs font-medium text-brown-light border-t border-gray-100 pt-4">
                          <span className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-mustard/20 flex items-center justify-center text-mustard uppercase text-[9px] font-bold">
                              {story.source.charAt(0)}
                            </span>
                            <span className="truncate max-w-[100px]">{story.source}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {story.date}
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  </ScrollReveal>
                );
              })}
        </div>
      </div>
    </section>
  );
}
