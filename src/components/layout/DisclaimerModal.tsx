import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';

const SHORT_TEXT = `iléSure is a listing and roommate-matching platform only. We do not own, manage, or control any property listed on this platform. iléSure does not guarantee the accuracy of any listing, and is not liable for any loss, damage, dispute, or incident arising from tenancy arrangements made through this platform. All housing agreements are strictly between tenants and landlords. Users are advised to verify all listings independently before making any payments. Use of this platform constitutes acceptance of our full Terms & Conditions.

Governed by the Oyo State Tenancy Law (2016, as amended) and the laws of the Federal Republic of Nigeria.`;

const LONG_TEXT = `1. Nature of Service
iléSure is an independent digital platform that connects Users seeking off-destination accommodation with property owners and agents listing available spaces near key locations, Nigeria, and surrounding areas of Oyo State, Nigeria. iléSure operates solely as an intermediary marketplace. We do not own, lease, manage, inspect, or control any property listed on this platform.

2. No Ownership or Agency
iléSure is not a real estate agent, property manager, or housing authority. Listings displayed on this platform are submitted by independent third-party landlords or their agents. The presence of a listing on iléSure does not constitute an endorsement, certification, or verification of that property's legal status, ownership, or habitability. House agents operating on our platform are independently responsible for compliance with the Oyo State Tenancy Law and applicable registration requirements under recent Oyo State housing reforms, including agent fee caps and mandatory registration obligations.

3. Limitation of Liability
iléSure shall not be held responsible for any loss, injury, theft, damage to personal property, disputes between tenants and landlords, wrongful eviction, uninhabitable living conditions, or any other occurrence — positive or negative — arising from a tenancy arrangement initiated through this platform. This includes but is not limited to:
• Disputes over rent payment, rent receipts, or rent increases
• Failure by landlords to maintain habitable premises
• Unlawful or forceful eviction by a landlord or their agents
• Personal safety incidents occurring on or around listed properties
• Conflict between roommates matched through the iléSure platform
Any legal disputes regarding tenancy agreements, rent collection, or eviction are governed by the Oyo State Tenancy Law (2016, as amended) and must be resolved between the relevant parties through appropriate legal channels. iléSure is not a party to any tenancy contract.

4. Verification & Due Diligence
While iléSure makes reasonable efforts to verify listings, we cannot guarantee the completeness or accuracy of all information provided by landlords or agents. Users are strongly advised to physically inspect any property, confirm ownership documents, and review a formal tenancy agreement before making any payment. Under Nigerian law, landlords are obligated to issue a rent payment receipt for all payments received. Users are encouraged to request and retain this receipt at all times as proof of payment.

5. Payments & Financial Transactions
iléSure does not collect rent or housing deposits on behalf of landlords unless explicitly facilitated through a verified in-app payment channel. Any payments made directly to a landlord, agent, or third party outside of iléSure's official payment flow are made entirely at the user's own risk. iléSure shall bear no liability for fraudulent listings or financial losses incurred outside of transactions processed through our official platform. Users are advised to be cautious of requests for payment before a physical inspection has taken place.

6. Roommate Matching
iléSure's roommate-matching feature is provided as a convenience tool to help Users find compatible co-tenants near key locations and surrounding areas. iléSure does not conduct formal background checks on individual users and cannot guarantee the conduct, character, financial reliability, or suitability of any matched individual. Users are advised to exercise personal discretion, conduct their own due diligence, and formalise any shared tenancy arrangement through a written agreement with their landlord.

7. Governing Law & Jurisdiction
This disclaimer and all platform activities are governed by the laws of the Federal Republic of Nigeria, with specific reference to:
• The Oyo State Tenancy Law (2016, as amended) — regulating landlord-tenant relationships in Nigeria and across Oyo State
• The Land Use Act (Cap L5, LFN 2004) — governing land ownership and occupancy rights in Nigeria
• The Federal Competition and Consumer Protection Act (FCCPA) 2018 — protecting consumers in digital marketplaces
• Nigerian Data Protection Act (NDPA) 2023 — governing the handling of users' personal data
Any disputes arising from the use of this platform shall be subject to the jurisdiction of competent courts in Oyo State, Nigeria.

8. Updates to This Disclaimer
iléSure reserves the right to update this disclaimer at any time in response to changes in Nigerian law, Oyo State regulations, platform operations, or geographic expansion. Users will be notified of material changes through the application. Continued use of the platform following any such update constitutes your acceptance of the revised terms.`;

export function DisclaimerModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLong, setShowLong] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Custom event listener so Footer can trigger it manually
    const handleOpen = () => {
      setIsVisible(true);
      setShowLong(true); // Open directly to long form if triggered manually
    };
    window.addEventListener('open-disclaimer', handleOpen);

    const consent = localStorage.getItem('disclaimer-accepted');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('open-disclaimer', handleOpen);
      };
    }
    
    return () => window.removeEventListener('open-disclaimer', handleOpen);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      if (!hasScrolledToBottom) {
        setHasScrolledToBottom(true);
      }
    }
  };

  const handleAccept = () => {
    if (hasScrolledToBottom) {
      localStorage.setItem('disclaimer-accepted', 'true');
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-brown/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-lg bg-[#FAFAF9] rounded-[24px] shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 pb-4 bg-white border-b border-gray-100 flex flex-col items-center flex-shrink-0">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-mustard/15 text-mustard mb-3 shadow-sm">
                <ShieldCheck size={28} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-extrabold text-brown tracking-tight">Platform Disclaimer</h3>
              <p className="text-sm text-gray-500 font-medium mt-1">Please review our terms to continue</p>
            </div>

            {/* Content Body */}
            {!showLong ? (
              <div className="p-8 flex flex-col items-center">
                <p className="text-gray-600 text-[15px] leading-relaxed text-center mb-8 whitespace-pre-line">
                  {SHORT_TEXT}
                </p>
                <button
                  onClick={() => setShowLong(true)}
                  className="flex items-center gap-2 py-3.5 px-6 bg-brown hover:bg-brown/90 text-white text-base font-bold rounded-xl transition-all shadow-lg shadow-brown/25 hover:shadow-xl hover:shadow-brown/30 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Read Full Legal Disclaimer</span>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </button>
                <p className="mt-4 text-xs text-gray-400 italic">You must read the full disclaimer to accept.</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col overflow-hidden min-h-0 relative flex-1"
              >
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-6 pb-12 custom-scrollbar"
                  onScroll={handleScroll}
                >
                  <div className="prose prose-sm prose-brown max-w-none">
                    {LONG_TEXT.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('•')) {
                        const items = paragraph.split('\n');
                        return (
                          <ul key={idx} className="list-disc pl-5 my-2 text-gray-600 leading-relaxed">
                            {items.map((item, i) => (
                              <li key={i}>{item.replace('• ', '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      
                      // Check if it's a section header (starts with number)
                      if (/^\d\./.test(paragraph)) {
                        const [header, ...body] = paragraph.split('\n');
                        return (
                          <div key={idx} className="mb-5">
                            <h4 className="text-brown font-bold text-base mb-2">{header}</h4>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{body.join('\n')}</p>
                          </div>
                        );
                      }

                      return (
                        <p key={idx} className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
                
                {/* Scroll Prompt Overlay */}
                {!hasScrolledToBottom && (
                  <div className="absolute bottom-20 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFAF9] via-[#FAFAF9]/90 to-transparent flex flex-col items-center justify-end pb-2 pointer-events-none">
                    <ChevronDown size={20} className="text-mustard animate-bounce mb-1" />
                    <span className="text-xs font-semibold text-mustard">Scroll to bottom to accept</span>
                  </div>
                )}

                {/* Footer Action */}
                <div className="p-5 bg-white border-t border-gray-100 flex-shrink-0">
                  <button
                    onClick={handleAccept}
                    disabled={!hasScrolledToBottom}
                    className={`w-full py-4 text-white text-base font-bold rounded-xl transition-all ${
                      hasScrolledToBottom 
                        ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25 active:scale-[0.98]' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    I Accept
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
