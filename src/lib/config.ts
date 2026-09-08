// BUGFIX (QA-MKT-003): this silently fell back to the PRODUCTION API whenever
// VITE_API_URL was unset — and no env file existed in this project — so every local and
// staging build posted real names, emails and phone numbers to prod, which does not
// answer. Fail loudly in development instead of quietly targeting production; keep the
// production default only for a production build.
const rawConfiguredUrl = import.meta.env.VITE_API_URL;

// BUGFIX: Prevent legacy onrender.com backend URL (set in Vercel project env)
// from pointing production traffic to the dormant Render instance.
const configuredApiUrl = rawConfiguredUrl?.includes('onrender.com')
  ? 'https://api.ilesure.com'
  : rawConfiguredUrl;

if (!configuredApiUrl && import.meta.env.DEV) {
  console.error(
    '[config] VITE_API_URL is not set. Create ilesure-home/.env.development with ' +
      'VITE_API_URL=http://localhost:4000 — falling back to localhost so this build cannot ' +
      'post real submissions to the production API.'
  );
}

// In development the fallback is localhost. Production builds use the live API https://api.ilesure.com.
const API_BASE_URL = configuredApiUrl || (import.meta.env.DEV ? 'http://localhost:4000' : 'https://api.ilesure.com');

export const API_ENDPOINTS = {
  support: {
    // Unauthenticated ticket endpoint — persists to SupportTicket server-side.
    submit: `${API_BASE_URL}/api/v1/support/chat`,
  },
  upgradeRequests: {
    public: `${API_BASE_URL}/api/v1/upgrade-requests/public`,
    submit: `${API_BASE_URL}/api/v1/upgrade-requests`,
    upvote: (id: string) => `${API_BASE_URL}/api/v1/upgrade-requests/${id}/upvote`,
  },
  waitlist: {
    join: `${API_BASE_URL}/api/v1/waitlist`,
    count: `${API_BASE_URL}/api/v1/waitlist/count`,
  },

  roommate: {
    matches: `${API_BASE_URL}/api/v1/roommate/matches`,
    profile: `${API_BASE_URL}/api/v1/roommate/profile`,
  },
} as const;

export default API_BASE_URL;