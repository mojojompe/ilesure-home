import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans overflow-hidden">
      <Navbar />

      <main className="flex-1 flex items-center justify-center relative px-6 py-20 mt-16">
        {/* Background gradient blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mustard/20 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          className="relative z-10 flex flex-col items-center text-center max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 mb-6 rounded-3xl bg-white shadow-xl shadow-brown/5 flex items-center justify-center border border-mustard/20">
            <SearchX className="w-12 h-12 text-mustard" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-brown mb-4 tracking-tighter">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-brown mb-4">
            Page not found
          </h2>
          
          <p className="text-brown-light text-lg mb-10 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>

          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-mustard rounded-full hover:bg-mustard-dark hover:-translate-y-1 shadow-lg shadow-mustard/30 active:translate-y-0"
          >
            Back to Home
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
