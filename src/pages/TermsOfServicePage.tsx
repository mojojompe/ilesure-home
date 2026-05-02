import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function TermsOfServicePage() {
  return (
    <motion.div {...pageTransition} className="min-h-screen bg-cream-50">
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-brown/5 border border-mustard/10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brown mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-500 mb-10 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-brown max-w-none text-gray-700 space-y-6">
            <p className="lead text-lg text-gray-600 font-medium">
              Welcome to iléSure! By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Service.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing iléSure, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">2. User Accounts</h2>
            <p>
              To use certain features of the platform, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">3. Platform Rules</h2>
            <p>
              Users agree not to post false or misleading information, impersonate any person or entity, or use the platform for any illegal activities. Listings must accurately reflect the properties being advertised.
            </p>

            <h2 className="text-2xl font-bold text-brown mt-10 mb-4">4. Limitation of Liability</h2>
            <p>
              iléSure acts as a marketplace. We are not responsible for the actual transactions between students and landlords, nor can we guarantee the absolute safety or quality of every listing, though we do our best to verify agents.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
