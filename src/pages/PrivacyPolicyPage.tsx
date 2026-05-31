import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PolicyLayout, type TOCItem } from '../components/layout/PolicyLayout';
import { useSEO } from '../hooks/useSEO';

const toc: TOCItem[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'legal-basis', label: 'Legal Basis for Processing' },
  { id: 'data-sharing', label: 'Data Sharing & Third Parties' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'children-privacy', label: "Children's Privacy" },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

const lastUpdated = 'May 4, 2026';

export function PrivacyPolicyPage() {
  useSEO({
    title: 'Privacy Policy',
    description: 'iléSure privacy policy — how we collect, use, protect, and share your personal data as a premium housing platform.',
    canonical: '/privacy-policy',
  });

  return (
    <>
      <Navbar />
      <PolicyLayout title="Privacy Policy" lastUpdated={lastUpdated} toc={toc}>
        <section id="introduction" className="mb-10">
          <p className="text-lg text-gray-600 leading-relaxed">
            At iléSure ("we," "our," or "us"), we are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains what information we collect, how we use it, who we share it with, and the rights you have regarding your data.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            This policy applies to all users of our website, mobile applications, and related services (collectively, the "Platform"). By using iléSure, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section id="information-we-collect" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">1. Information We Collect</h2>

          <div className="space-y-6">
            <div className="bg-cream-50 rounded-clay-sm p-6 border border-cream-200">
              <h3 className="font-bold text-brown text-lg mb-2">Information You Provide</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Name, email address, phone number</li>
                <li>University affiliation and User status</li>
                <li>Housing preferences and roommate criteria</li>
                <li>Profile photos and biographical information</li>
                <li>Messages and communications through our platform</li>
                <li>Payment and billing information (processed securely by third-party providers)</li>
              </ul>
            </div>

            <div className="bg-cream-50 rounded-clay-sm p-6 border border-cream-200">
              <h3 className="font-bold text-brown text-lg mb-2">Information Collected Automatically</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Device information (browser type, operating system, device identifiers)</li>
                <li>IP address and approximate location</li>
                <li>Usage data (pages visited, time spent, features used, clicks)</li>
                <li>Referral source and search terms used to find our site</li>
                <li>Cookies and similar tracking technologies (see our Cookie Policy)</li>
              </ul>
            </div>

            <div className="bg-cream-50 rounded-clay-sm p-6 border border-cream-200">
              <h3 className="font-bold text-brown text-lg mb-2">Information From Third Parties</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Social media profile data (when you connect or share via social platforms)</li>
                <li>Verification services (for User or agent identity confirmation)</li>
                <li>Analytics providers (aggregated usage insights)</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="how-we-use" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">We use your information to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Create and manage your account</li>
            <li>Match you with compatible roommates based on your preferences</li>
            <li>Display relevant housing listings and agent profiles</li>
            <li>Facilitate communication between Users, roommates, and agents</li>
            <li>Verify User status and agent credentials</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send important service updates, security alerts, and support messages</li>
            <li>Improve our platform through analytics and user feedback</li>
            <li>Detect and prevent fraud, abuse, and policy violations</li>
            <li>Comply with legal obligations and enforce our terms</li>
          </ul>
        </section>

        <section id="legal-basis" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">3. Legal Basis for Processing</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Under applicable data protection laws (including the Nigeria Data Protection Act), we process your personal data on the following legal bases:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Consent</strong> — Where you have given us explicit consent to process your data (e.g., marketing communications).</li>
            <li><strong>Contract</strong> — Where processing is necessary to fulfill our contractual obligations to you (e.g., providing our services).</li>
            <li><strong>Legitimate interests</strong> — Where processing is necessary for our legitimate business interests, such as improving our platform and preventing fraud, provided these do not override your rights.</li>
            <li><strong>Legal obligation</strong> — Where processing is required to comply with applicable laws.</li>
          </ul>
        </section>

        <section id="data-sharing" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">4. Data Sharing & Third Parties</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We do not sell your personal data. We may share your information with:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Service providers</strong> — Cloud hosting, payment processing, analytics, and customer support providers under strict data processing agreements.</li>
            <li><strong>Other users</strong> — Limited profile information (name, university, preferences) may be visible to potential roommate matches.</li>
            <li><strong>Agents</strong> — If you express interest in a listing, your contact details may be shared with the relevant agent.</li>
            <li><strong>Legal authorities</strong> — Where required by law, regulation, or legal process, or to protect the rights and safety of our users.</li>
            <li><strong>Business transfers</strong> — In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.</li>
          </ul>
        </section>

        <section id="data-retention" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">5. Data Retention</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We retain your personal data only as long as necessary:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Active accounts</strong> — Data is retained while your account is active and for a reasonable period thereafter.</li>
            <li><strong>Deactivated accounts</strong> — Upon request, your data will be deleted within 30 days, except where retention is required by law.</li>
            <li><strong>Transaction records</strong> — Payment and transaction data is retained for up to 7 years for tax and legal compliance.</li>
            <li><strong>Analytics data</strong> — Aggregated and anonymized data may be retained indefinitely for research and improvement purposes.</li>
          </ul>
        </section>

        <section id="data-security" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">6. Data Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These include:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Encryption of data in transit (TLS/SSL) and at rest</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls and role-based permissions for staff</li>
            <li>Secure data centers with physical and network protections</li>
            <li>Incident response procedures for data breaches</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            While we strive to protect your data, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but continuously work to enhance our safeguards.
          </p>
        </section>

        <section id="your-rights" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">7. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Depending on your jurisdiction, you may have the following rights regarding your personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Access', desc: 'Request a copy of your personal data.' },
              { title: 'Rectification', desc: 'Correct inaccurate or incomplete data.' },
              { title: 'Erasure', desc: 'Request deletion of your data ("right to be forgotten").' },
              { title: 'Portability', desc: 'Receive your data in a machine-readable format.' },
              { title: 'Restriction', desc: 'Limit how we process your data in certain circumstances.' },
              { title: 'Objection', desc: 'Object to processing based on legitimate interests.' },
              { title: 'Withdraw Consent', desc: 'Revoke previously given consent at any time.' },
              { title: 'Lodge a Complaint', desc: 'File a complaint with your local data protection authority.' },
            ].map((right) => (
              <div key={right.title} className="bg-cream-50 rounded-clay-sm p-4 border border-cream-200">
                <h3 className="font-bold text-brown text-sm">{right.title}</h3>
                <p className="text-gray-600 text-xs mt-1">{right.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed mt-6">
            To exercise any of these rights, please contact us at ilesuresupport@gmail.com. We will respond within 30 days.
          </p>
        </section>

        <section id="children-privacy" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">8. Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            iléSure is not intended for children under the age of 16. We do not knowingly collect personal data from children. If we become aware that we have inadvertently collected data from a child under 16, we will take steps to delete it promptly. If you believe a child has provided us with personal data, please contact us.
          </p>
        </section>

        <section id="changes" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">9. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you through a prominent notice on our website, via email, or through other appropriate means. The "Last updated" date at the top of this policy indicates when it was last revised.
          </p>
        </section>

        <section id="contact" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">10. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
