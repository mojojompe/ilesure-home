import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function PrivacyPolicyPage() {
  return (
    <motion.div {...pageTransition} className="min-h-screen bg-cream-50">
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-brown/5 border border-mustard/10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brown mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mb-10 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-brown max-w-none text-gray-700 space-y-6">
            <p className="lead text-lg text-gray-600 font-medium">
              At iléSure, we are committed to protecting your personal data and respecting your privacy.
              This Privacy Policy explains how we collect, use, and share your information.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, update your profile, 
              or communicate with us. This may include your name, email address, university affiliation, 
              and housing preferences.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services. Specifically, 
              we use your data to match you with potential roommates, verify your student status, and 
              communicate important updates regarding housing options.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data 
              against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <strong>Email:</strong> ilesuresupport@gmail.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
