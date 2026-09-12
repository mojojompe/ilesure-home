import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Message01Icon as MessageSquare,
  Mail01Icon as Mail,
  CallIcon as Phone,
  SentIcon as Send,
  SparklesIcon as Sparkles,
  Award01Icon as Award,
  CheckmarkCircle02Icon as CheckCircle2,
  Layers01Icon as Layers,
  ThumbsUpIcon as ThumbsUp,
  PlusSignCircleIcon as PlusCircle,
  Cancel01Icon as X,
  HelpCircleIcon as HelpCircle,
} from '@hugeicons/react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useSEO } from '../hooks/useSEO';
import {
  fetchPublicRoadmap,
  submitUpgradeRequest,
  upvoteUpgradeRequest,
  submitCustomerSupportMessage,
  type PublicStack,
} from '../api/supportAndUpgrades';


const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any },
};

export function SupportPage() {
  useSEO({
    title: 'Customer Support & Feature Wishlist',
    description:
      'Get 24/7 customer support, message our agents directly, and see frequent feature upgrades requested by the iléSure community.',
    canonical: '/support',
  });

  // Support Message Form State
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportRole, setSupportRole] = useState('student');
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSending, setSupportSending] = useState(false);
  const [supportSuccess, setSupportSuccess] = useState<string | null>(null);
  const [supportError, setSupportError] = useState<string | null>(null);

  // Upgrades / Roadmap State
  const [stacks, setStacks] = useState<PublicStack[]>([]);
  const [loadingRoadmap, setLoadingRoadmap] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  // Modal State for Submitting Feature Upgrade
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reqTitle, setReqTitle] = useState('');
  const [reqDesc, setReqDesc] = useState('');
  const [reqCategory, setReqCategory] = useState('general');
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [submittingReq, setSubmittingReq] = useState(false);
  const [reqSuccess, setReqSuccess] = useState<string | null>(null);
  const [reqError, setReqError] = useState<string | null>(null);

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      setLoadingRoadmap(true);
      const res = await fetchPublicRoadmap();
      if (res.success && res.data) {
        setStacks(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRoadmap(false);
    }
  };

  const handleSendSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportMessage) {
      setSupportError('Please fill in all required fields.');
      return;
    }
    setSupportSending(true);
    setSupportError(null);
    setSupportSuccess(null);

    try {
      const res = await submitCustomerSupportMessage({
        name: supportName,
        email: supportEmail,
        subject: supportSubject || 'Support Inquiry',
        message: supportMessage,
        role: supportRole,
      });
      setSupportSuccess(res.message);
      setSupportSubject('');
      setSupportMessage('');
    } catch (err: any) {
      setSupportError(err.message || 'Failed to send message.');
    } finally {
      setSupportSending(false);
    }
  };

  const handleUpvote = async (stack: PublicStack) => {
    if (upvotedIds.has(stack.stackId)) return;
    try {
      setUpvotedIds((prev) => new Set(prev).add(stack.stackId));
      // Locally increment
      setStacks((prev) =>
        prev.map((s) =>
          s.stackId === stack.stackId ? { ...s, totalVotes: s.totalVotes + 1 } : s
        )
      );
      if (stack.sampleFeedback?.[0]?._id) {
        await upvoteUpgradeRequest(stack.sampleFeedback[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle || !reqDesc) {
      setReqError('Please provide both a title and description.');
      return;
    }
    setSubmittingReq(true);
    setReqError(null);
    try {
      const res = await submitUpgradeRequest({
        title: reqTitle,
        description: reqDesc,
        category: reqCategory,
        name: reqName || undefined,
        email: reqEmail || undefined,
      });
      setReqSuccess(
        res.message ||
          'Your upgrade request has been submitted and added to the community roadmap!'
      );
      setReqTitle('');
      setReqDesc('');
      loadRoadmap();
      setTimeout(() => {
        setIsModalOpen(false);
        setReqSuccess(null);
      }, 2500);
    } catch (err: any) {
      setReqError(err.message || 'Failed to submit upgrade request');
    } finally {
      setSubmittingReq(false);
    }
  };

  const filteredStacks = stacks.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.status === activeFilter;
  });

  return (
    <motion.div {...pageTransition} className="min-h-screen bg-cream text-brown">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mustard-50 text-mustard text-xs font-black uppercase tracking-wider mb-4 border border-mustard-200">
            <Sparkles className="w-3.5 h-3.5" />
            Customer Support &amp; Roadmap
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brown tracking-tight leading-tight max-w-3xl mx-auto">
            We're Here For You. <br />
            <span className="text-mustard">Help, Support &amp; Community Upgrades.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brown-400 max-w-2xl mx-auto leading-relaxed">
            Reach out to our customer support team via live channels or send a direct message.
            Vote on frequent feature upgrades requested by tenants, agents, and landlords.
          </p>
        </section>

        {/* Section 1: Customer Support Channels & Direct Message */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Contact Channels */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-xl font-black text-brown mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-mustard" />
                Customer Support Channels
              </h2>

              {/* Channel 1: Live Chat */}
              <a
                href="/chat"
                className="block p-5 clay-card hover:border-mustard hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-mustard-50 flex items-center justify-center text-mustard shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-brown group-hover:text-mustard transition-colors">
                      Live AI &amp; Agent Chat
                    </h3>
                    <p className="text-xs text-brown-400 mt-1 leading-relaxed">
                      Instant 24/7 answers regarding booking, verification, payments, or inspections.
                    </p>
                    <span className="inline-block mt-2 text-xs font-bold text-mustard">
                      Start Conversation &rarr;
                    </span>
                  </div>
                </div>
              </a>

              {/* Channel 2: WhatsApp */}
              <a
                href="https://wa.me/2348169384301"
                target="_blank"
                rel="noreferrer"
                className="block p-5 clay-card hover:border-emerald-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-brown group-hover:text-emerald-600 transition-colors">
                      WhatsApp Support Line
                    </h3>
                    <p className="text-xs text-brown-400 mt-1 leading-relaxed">
                      Direct WhatsApp assistance for rapid escalation, emergency issues, or agent queries.
                    </p>
                    <span className="inline-block mt-2 text-xs font-bold text-emerald-600">
                      Message on WhatsApp &rarr;
                    </span>
                  </div>
                </div>
              </a>

              {/* Channel 3: Email */}
              <a
                href="mailto:ilesuresupport@gmail.com"
                className="block p-5 clay-card hover:border-blue-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-brown group-hover:text-blue-600 transition-colors">
                      Email Help Desk
                    </h3>
                    <p className="text-xs text-brown-400 mt-1 leading-relaxed">
                      Detailed inquiries, contract questions, and dispute resolution. Responses within 24 hrs.
                    </p>
                    <span className="inline-block mt-2 text-xs font-bold text-blue-600">
                      ilesuresupport@gmail.com &rarr;
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Right: Interactive Message Support Form */}
            <div className="lg:col-span-7 clay-card p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-black text-brown">
                  Send a Direct Message to Customer Support
                </h2>
                <p className="text-xs sm:text-sm text-brown-400 mt-1">
                  Have a question or need assistance? Fill in the details below and our team will get back to you promptly.
                </p>
              </div>

              {supportSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{supportSuccess}</span>
                </div>
              )}

              {supportError && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold mb-4">
                  {supportError}
                </div>
              )}

              <form onSubmit={handleSendSupport} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brown-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={supportName}
                      onChange={(e) => setSupportName(e.target.value)}
                      placeholder="e.g. Tunde Balogun"
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-cream-300 bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-mustard/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brown-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      placeholder="tunde@example.com"
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-cream-300 bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-mustard/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brown-700 mb-1">
                      I am a:
                    </label>
                    <select
                      value={supportRole}
                      onChange={(e) => setSupportRole(e.target.value)}
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-cream-300 bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-mustard/20"
                    >
                      <option value="student">Student / Renter</option>
                      <option value="agent">Agent</option>
                      <option value="landlord">Landlord</option>
                      <option value="visitor">Prospective User</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brown-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={supportSubject}
                      onChange={(e) => setSupportSubject(e.target.value)}
                      placeholder="e.g. Question about rent escrow"
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-cream-300 bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-mustard/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown-700 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Tell us what you need help with in detail..."
                    className="w-full text-xs sm:text-sm p-4 rounded-xl border border-cream-300 bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-mustard/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={supportSending}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-mustard hover:bg-cream text-white font-black text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {supportSending ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Section 2: Frequent Upgrades Requested by People (Community Wishlist) */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200 text-brown text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" />
                Community Wishlist
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brown">
                Frequent Upgrades Requested by People
              </h2>
              <p className="text-xs sm:text-sm text-brown-400 mt-1 max-w-xl">
                Similar feature requests are grouped into ranked stacks by automated keyword matching so nothing gets lost. Vote for what you want built next!
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-mustard hover:bg-cream text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              Request an Upgrade
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'all', label: 'All Upgrades' },
              { id: 'planned', label: 'Planned' },
              { id: 'in_progress', label: 'In Progress' },
              { id: 'completed', label: 'Delivered' },
              { id: 'under_review', label: 'Under Review' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeFilter === f.id
                    ? 'bg-brown text-white'
                    : 'bg-white border border-cream-200 text-brown-400 hover:bg-cream'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Upgrades Cards Grid */}
          {loadingRoadmap ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-cream-200">
              <div className="w-8 h-8 border-3 border-mustard border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs font-semibold text-brown-400">Loading requested upgrades...</p>
            </div>
          ) : filteredStacks.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-cream-200">
              <p className="text-sm font-bold text-brown-700">No upgrades found in this category.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-3 text-xs font-bold text-mustard hover:underline"
              >
                Be the first to submit a request &rarr;
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStacks.map((stack) => {
                const hasVoted = upvotedIds.has(stack.stackId);

                return (
                  <div
                    key={stack.stackId}
                    className="p-6 rounded-3xl bg-white border border-cream-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar: Rank & Status */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="flex items-center gap-1 text-xs font-black text-mustard bg-mustard-50 px-2.5 py-1 rounded-lg border border-mustard-200">
                          <Award className="w-3.5 h-3.5" />
                          Rank #{stack.rank}
                        </span>

                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                            stack.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : stack.status === 'in_progress'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : stack.status === 'planned'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}
                        >
                          {stack.status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-extrabold text-base sm:text-lg text-brown tracking-tight mb-2">
                        {stack.stackTitle}
                      </h3>

                      {/* Sample feedback description if available */}
                      {stack.sampleFeedback?.[0] && (
                        <p className="text-xs text-brown-400 leading-relaxed mb-4 line-clamp-3">
                          "{stack.sampleFeedback[0].description}"
                        </p>
                      )}

                      {/* Keyword tags */}
                      <div className="flex flex-wrap items-center gap-1 mb-4">
                        {stack.topKeywords.map((kw, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold text-brown bg-cream-200 px-2 py-0.5 rounded-md"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Metadata & Upvote button */}
                    <div className="pt-4 border-t border-cream-300 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-brown">
                        <Layers className="w-3.5 h-3.5 text-mustard" />
                        <span>{stack.requestCount} requests stacked</span>
                      </div>

                      <button
                        onClick={() => handleUpvote(stack)}
                        disabled={hasVoted}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          hasVoted
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-mustard-50 text-mustard hover:bg-cream'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{stack.totalVotes}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Suggest Upgrade Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-black text-brown">Request an Upgrade</h3>
                  <p className="text-xs text-brown-400 mt-0.5">
                    Tell us what you want added. Similar requests are automatically stacked and ranked!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full text-brown hover:text-brown hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {reqSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
                  {reqSuccess}
                </div>
              )}

              {reqError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold mb-4">
                  {reqError}
                </div>
              )}

              <form onSubmit={handleSubmitUpgrade} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-brown-700 mb-1">
                    Feature Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={reqTitle}
                    onChange={(e) => setReqTitle(e.target.value)}
                    placeholder="e.g. Split rent into monthly installments"
                    className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-mustard/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown-700 mb-1">
                    Category
                  </label>
                  <select
                    value={reqCategory}
                    onChange={(e) => setReqCategory(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-mustard/20"
                  >
                    <option value="payments">Payments &amp; Escrow</option>
                    <option value="listings">Listings &amp; Video Tours</option>
                    <option value="inspections">Inspection Journeys &amp; Safety</option>
                    <option value="roommates">Roommate Matching</option>
                    <option value="mobile_app">Mobile App &amp; Notifications</option>
                    <option value="general">Other / General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown-700 mb-1">
                    Detailed Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reqDesc}
                    onChange={(e) => setReqDesc(e.target.value)}
                    placeholder="Describe how this feature should work and why it would help you..."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-mustard/20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-brown-700 mb-1">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={reqName}
                      onChange={(e) => setReqName(e.target.value)}
                      placeholder="e.g. Aisha"
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-mustard/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brown-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={reqEmail}
                      onChange={(e) => setReqEmail(e.target.value)}
                      placeholder="aisha@example.com"
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-mustard/20"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-brown-400 hover:bg-neutral-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReq}
                    className="px-6 py-2.5 rounded-xl bg-mustard hover:bg-cream text-white font-bold text-xs shadow-sm transition-all"
                  >
                    {submittingReq ? 'Submitting...' : 'Submit Upgrade Idea'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
}

export default SupportPage;
