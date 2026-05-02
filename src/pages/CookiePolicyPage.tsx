import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function CookiePolicyPage() {
  return (
    <motion.div {...pageTransition} className="min-h-screen bg-cream-50">
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-brown/5 border border-mustard/10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brown mb-6">
            Cookie Policy
          </h1>
          <p className="text-gray-500 mb-10 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-brown max-w-none text-gray-700 space-y-6">
            <p className="lead text-lg text-gray-600 font-medium">
              This Cookie Policy explains how iléSure uses cookies and similar technologies to recognize you when you visit our website.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">1. What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">2. Why do we use cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our properties.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">3. Managing Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. You can also amend your web browser controls to accept or refuse cookies.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
