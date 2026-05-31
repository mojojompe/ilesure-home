import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PolicyLayout, type TOCItem } from '../components/layout/PolicyLayout';
import { useSEO } from '../hooks/useSEO';

const toc: TOCItem[] = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'service-description', label: 'Description of Service' },
  { id: 'eligibility', label: 'Eligibility & Accounts' },
  { id: 'user-conduct', label: 'User Conduct' },
  { id: 'listings', label: 'Listings & Agent Responsibilities' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'disclaimers', label: 'Disclaimers & Limitation of Liability' },
  { id: 'indemnification', label: 'Indemnification' },
  { id: 'termination', label: 'Termination' },
  { id: 'dispute-resolution', label: 'Dispute Resolution' },
  { id: 'changes', label: 'Changes to Terms' },
  { id: 'contact', label: 'Contact Us' },
];

const lastUpdated = 'May 4, 2026';

export function TermsOfServicePage() {
  useSEO({
    title: 'Terms of Service',
    description: 'iléSure terms of service — understand your rights, responsibilities, and obligations when using our premium housing platform.',
    canonical: '/terms-of-service',
  });

  return (
    <>
      <Navbar />
      <PolicyLayout title="Terms of Service" lastUpdated={lastUpdated} toc={toc}>
        <section id="acceptance" className="mb-10">
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to iléSure! These Terms of Service ("Terms") govern your access to and use of the iléSure website, applications, and services (collectively, the "Platform"). By accessing or using iléSure, you agree to be bound by these Terms. If you do not agree, please do not use our services.
          </p>
        </section>

        <section id="service-description" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">1. Description of Service</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            iléSure is a premium housing and roommate discovery platform designed to help university Users find verified accommodation near their destination. Our services include:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Browsing and searching for housing listings</li>
            <li>Roommate matching based on compatibility preferences</li>
            <li>Verified agent profiles and property listings</li>
            <li>Messaging and communication tools</li>
            <li>Reviews and ratings from fellow Users</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            iléServe operates as a marketplace connecting Users with housing agents and potential roommates. We do not own, manage, or lease any properties listed on the Platform.
          </p>
        </section>

        <section id="eligibility" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">2. Eligibility & Accounts</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To use iléSure, you must:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Be at least 16 years of age</li>
            <li>Be a current or prospective university User, or a verified housing agent</li>
            <li>Provide accurate, complete, and up-to-date registration information</li>
            <li>Maintain the security of your account credentials</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            You are responsible for all activities that occur under your account. If you suspect unauthorized access, notify us immediately at ilesuresupport@gmail.com.
          </p>
          <div className="bg-cream-50 rounded-clay-sm p-6 border border-cream-200">
            <h3 className="font-bold text-brown text-lg mb-2">Account Types</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li><strong>User accounts</strong> — For searching listings, finding roommates, and leaving reviews.</li>
              <li><strong>Agent accounts</strong> — For posting property listings, managing inquiries, and subscribing to premium features.</li>
            </ul>
          </div>
        </section>

        <section id="user-conduct" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">3. User Conduct</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree not to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'No False Information', desc: 'Post misleading or inaccurate listings, profiles, or reviews.' },
              { title: 'No Impersonation', desc: 'Pretend to be another person, entity, or misrepresent your affiliation.' },
              { title: 'No Illegal Activity', desc: 'Use the platform for any unlawful purpose or in violation of applicable laws.' },
              { title: 'No Harassment', desc: 'Harass, threaten, or abuse other users through messages or listings.' },
              { title: 'No Scraping', desc: 'Automatically scrape, crawl, or extract data from the Platform without permission.' },
              { title: 'No Malicious Code', desc: 'Upload viruses, malware, or any harmful code through the Platform.' },
              { title: 'No Circumvention', desc: 'Bypass or attempt to bypass any security or access controls.' },
              { title: 'No Spam', desc: 'Send unsolicited messages, advertisements, or chain communications.' },
            ].map((rule) => (
              <div key={rule.title} className="bg-red-50 rounded-clay-sm p-4 border border-red-100">
                <h3 className="font-bold text-brown text-sm">{rule.title}</h3>
                <p className="text-gray-600 text-xs mt-1">{rule.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="listings" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">4. Listings & Agent Responsibilities</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Housing agents who post listings on iléSure agree to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Provide accurate, truthful, and up-to-date property descriptions, pricing, and photos</li>
            <li>Respond to User inquiries in a timely and professional manner</li>
            <li>Comply with all applicable local housing laws and regulations</li>
            <li>Not post listings for properties they do not have the legal right to advertise</li>
            <li>Maintain valid contact information and availability details</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            iléSure may verify agent credentials and property listings, but verification does not constitute a guarantee or endorsement. Users are encouraged to conduct their own due diligence before entering into any rental agreement.
          </p>
        </section>

        <section id="intellectual-property" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">5. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The iléSure Platform, including its design, logo, content, software, and trademarks, is owned by iléSure and its licensors and is protected by intellectual property laws.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            You retain ownership of any content you post (listings, reviews, messages). By posting content, you grant iléSure a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content in connection with operating and promoting the Platform.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You may not reproduce, modify, distribute, or create derivative works from iléSure's proprietary content without prior written consent.
          </p>
        </section>

        <section id="disclaimers" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">6. Disclaimers & Limitation of Liability</h2>
          <div className="bg-amber-50 rounded-clay-sm p-6 border border-amber-200 mb-6">
            <p className="text-gray-700 leading-relaxed font-medium">
              The Platform is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            iléSure acts solely as a marketplace and intermediary. We are not responsible for:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>The actual condition, safety, or quality of listed properties</li>
            <li>Transactions, agreements, or disputes between Users and agents</li>
            <li>The accuracy of user-generated content (listings, reviews, profiles)</li>
            <li>Actions, conduct, or statements of other users</li>
            <li>Service interruptions, data loss, or unauthorized access beyond our reasonable control</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            To the maximum extent permitted by law, iléSure shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform. Our total liability shall not exceed the amount you paid to iléSure in the 12 months preceding the claim.
          </p>
        </section>

        <section id="indemnification" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">7. Indemnification</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify, defend, and hold harmless iléSure, its founders, employees, contractors, and affiliates from any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
            <li>Your use of the Platform</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Content you post or transmit through the Platform</li>
          </ul>
        </section>

        <section id="termination" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">8. Termination</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            iléSure reserves the right to suspend or terminate your account and access to the Platform at any time, with or without cause, and with or without notice, if we determine that:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>You have violated these Terms</li>
            <li>Your conduct is harmful to other users, iléSure, or third parties</li>
            <li>Required by law or regulatory authority</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Upon termination, your right to use the Platform will cease immediately. Provisions of these Terms that by their nature should survive termination will remain in effect.
          </p>
        </section>

        <section id="dispute-resolution" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">9. Governing Law & Dispute Resolution</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict of law principles.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Any disputes arising from or related to these Terms or the Platform shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be submitted to mediation in Nigeria, Nigeria. If mediation fails, disputes shall be resolved through the courts of competent jurisdiction in Oyo State, Nigeria.
          </p>
        </section>

        <section id="changes" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">10. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We may modify these Terms at any time. If we make material changes, we will notify you by email or through a prominent notice on the Platform. Your continued use of iléSure after changes are posted constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
          </p>
        </section>

        <section id="contact" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">11. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-cream-50 rounded-clay-sm p-6 border border-cream-200">
            <p className="text-gray-700"><strong>Email:</strong> ilesuresupport@gmail.com</p>
            <p className="text-gray-700"><strong>Phone:</strong> +234 807 145 5374</p>
            <p className="text-gray-700"><strong>Location:</strong> Nigeria, Nigeria</p>
          </div>
        </section>
      </PolicyLayout>
      <Footer />
    </>
  );
}
