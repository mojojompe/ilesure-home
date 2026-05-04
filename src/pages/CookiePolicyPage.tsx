import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PolicyLayout, type TOCItem } from '../components/layout/PolicyLayout';
import { useSEO } from '../hooks/useSEO';

const toc: TOCItem[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'what-are-cookies', label: 'What Are Cookies' },
  { id: 'types-of-cookies', label: 'Types of Cookies We Use' },
  { id: 'how-we-use-cookies', label: 'How We Use Cookies' },
  { id: 'third-party-cookies', label: 'Third-Party Cookies' },
  { id: 'managing-cookies', label: 'Managing Cookies' },
  { id: 'cookie-consent', label: 'Cookie Consent' },
  { id: 'updates', label: 'Updates to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

const lastUpdated = 'May 4, 2026';

export function CookiePolicyPage() {
  useSEO({
    title: 'Cookie Policy',
    description: 'Learn how iléSure uses cookies to improve your experience, including the types of cookies we use and how to manage them.',
    canonical: '/cookie-policy',
  });

  return (
    <>
      <Navbar />
      <PolicyLayout title="Cookie Policy" lastUpdated={lastUpdated} toc={toc}>
        <section id="introduction" className="mb-10">
          <p className="text-lg text-gray-600 leading-relaxed">
            This Cookie Policy explains how iléSure ("we," "our," or "us") uses cookies and similar tracking technologies when you visit our website at ilesure.com. By continuing to use our site, you consent to the use of cookies as described in this policy.
          </p>
        </section>

        <section id="what-are-cookies" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">1. What Are Cookies?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cookies are small text files that are stored on your device (computer, tablet, or smartphone) when you visit a website. They help the website remember your preferences, understand how you use the site, and improve your overall experience.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Cookies can be "persistent" (remaining on your device for a set period or until manually deleted) or "session" cookies (deleted automatically when you close your browser).
          </p>
        </section>

        <section id="types-of-cookies" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">2. Types of Cookies We Use</h2>

          <div className="space-y-6">
            <div className="bg-cream-50 rounded-clay-sm p-6 border border-cream-200">
              <h3 className="font-bold text-brown text-lg mb-2">Essential Cookies</h3>
              <p className="text-gray-600 text-sm mb-3">Required for the website to function properly.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Authentication and session management</li>
                <li>Security and fraud prevention</li>
                <li>Load balancing and performance</li>
              </ul>
              <p className="text-gray-500 text-xs mt-3">These cannot be disabled as they are necessary for the site to work.</p>
            </div>

            <div className="bg-cream-50 rounded-clay-sm p-6 border border-cream-200">
              <h3 className="font-bold text-brown text-lg mb-2">Analytics Cookies</h3>
              <p className="text-gray-600 text-sm mb-3">Help us understand how visitors interact with our website.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Page views and navigation patterns</li>
                <li>Error reporting and debugging</li>
                <li>Performance monitoring</li>
              </ul>
            </div>

            <div className="bg-cream-50 rounded-clay-sm p-6 border border-cream-200">
              <h3 className="font-bold text-brown text-lg mb-2">Preference Cookies</h3>
              <p className="text-gray-600 text-sm mb-3">Remember your settings and personalization choices.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Language and region preferences</li>
                <li>Display and accessibility settings</li>
                <li>Cookie consent preferences</li>
              </ul>
            </div>

            <div className="bg-cream-50 rounded-clay-sm p-6 border border-cream-200">
              <h3 className="font-bold text-brown text-lg mb-2">Marketing Cookies</h3>
              <p className="text-gray-600 text-sm mb-3">Used to deliver relevant advertisements and measure campaign effectiveness.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Ad targeting and personalization</li>
                <li>Campaign performance tracking</li>
                <li>Social media integration</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="how-we-use-cookies" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">3. How We Use Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>To keep you signed in and remember your session</li>
            <li>To understand how you use our platform and improve our services</li>
            <li>To remember your preferences (such as language and location)</li>
            <li>To detect and prevent fraud and abuse</li>
            <li>To analyze traffic and optimize our website performance</li>
            <li>To deliver relevant content and, where applicable, advertisements</li>
          </ul>
        </section>

        <section id="third-party-cookies" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">4. Third-Party Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Some cookies are placed by third-party services that appear on our pages. We do not control these cookies and they are governed by the privacy policies of the respective third parties. These may include:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Analytics providers</strong> — such as Google Analytics, to help us understand usage patterns</li>
            <li><strong>Social media platforms</strong> — when you share content or interact with social plugins</li>
            <li><strong>Advertising partners</strong> — to measure ad performance and deliver targeted campaigns</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            We recommend reviewing the privacy policies of these third parties for more information on their cookie practices.
          </p>
        </section>

        <section id="managing-cookies" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">5. Managing Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have several options for managing cookies:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Browser settings</strong> — Most browsers allow you to view, manage, and delete cookies through their settings. Note that blocking cookies may affect website functionality.</li>
            <li><strong>Cookie consent banner</strong> — You can adjust your preferences at any time through the cookie consent banner on our site.</li>
            <li><strong>Opt-out links</strong> — For analytics and advertising cookies, you may opt out through industry platforms such as <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-mustard underline">About Ads</a> or <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-mustard underline">Your Online Choices</a>.</li>
          </ul>
          <p className="text-gray-600 text-sm bg-amber-50 p-4 rounded-clay-sm border border-amber-200">
            Please note that disabling certain cookies may impact your experience and the functionality of our website.
          </p>
        </section>

        <section id="cookie-consent" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">6. Cookie Consent</h2>
          <p className="text-gray-700 leading-relaxed">
            When you first visit iléSure, you will be presented with a cookie consent banner. By clicking "Accept All," you consent to the use of all cookies described in this policy. You can withdraw or modify your consent at any time by clicking the "Cookie Settings" link in our website footer. Essential cookies will continue to be set even if you withdraw consent, as they are required for the website to function.
          </p>
        </section>

        <section id="updates" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">7. Updates to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. When we make significant changes, we will notify you through a prominent notice on our website or via email. We encourage you to review this policy periodically.
          </p>
        </section>

        <section id="contact" className="mb-10">
          <h2 className="text-2xl font-bold text-brown mb-4">8. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Cookie Policy or our use of cookies, please contact us:
          </p>
          <div className="bg-cream-50 rounded-clay-sm p-6 border border-cream-200">
            <p className="text-gray-700"><strong>Email:</strong> ilesuresupport@gmail.com</p>
            <p className="text-gray-700"><strong>Phone:</strong> +234 807 145 5374</p>
            <p className="text-gray-700"><strong>Location:</strong> Ibadan, Nigeria</p>
          </div>
        </section>
      </PolicyLayout>
      <Footer />
    </>
  );
}
