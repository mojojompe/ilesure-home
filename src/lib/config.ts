// BUGFIX (QA-MKT-003): this silently fell back to the PRODUCTION API whenever
// VITE_API_URL was unset — and no env file existed in this project — so every local and
// staging build posted real names, emails and phone numbers to prod, which does not
// answer. Fail loudly in development instead of quietly targeting production; keep the
// production default only for a production build.
const configuredApiUrl = import.meta.env.VITE_API_URL;

if (!configuredApiUrl && import.meta.env.DEV) {
  console.error(
    '[config] VITE_API_URL is not set. Create ilesure-home/.env.development with ' +
      'VITE_API_URL=http://localhost:4000 — falling back to localhost so this build cannot ' +
      'post real submissions to the production API.'
  );
}

// FOLLOW-UP (QA-MKT-003): the warning above was added in an earlier round, but the value
// underneath it still resolved to production — so a developer with no env file got a red
// console message and their test submissions went to the live API anyway. Warning about a
// thing while still doing it is not a fix.
//
// In development the fallback is now localhost: a missing env file yields connection refused,
// which is a loud, local, harmless failure. Production builds are unaffected — they keep the
// production default, and a production build with VITE_API_URL unset is the one case where
// defaulting to the real API is correct.
const API_BASE_URL = configuredApiUrl || (import.meta.env.DEV ? 'http://localhost:4000' : 'https://api.ilesure.com');

export const API_ENDPOINTS = {
  support: {
    // Unauthenticated ticket endpoint — persists to SupportTicket server-side.
    submit: `${API_BASE_URL}/api/v1/support/chat`,
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