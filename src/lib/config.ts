// BUGFIX (QA-MKT-003): this silently fell back to the PRODUCTION API whenever
// VITE_API_URL was unset — and no env file existed in this project — so every local and
// staging build posted real names, emails and phone numbers to prod, which does not
// answer. Fail loudly in development instead of quietly targeting production; keep the
// production default only for a production build.
const configuredApiUrl = import.meta.env.VITE_API_URL;

if (!configuredApiUrl && import.meta.env.DEV) {
  console.error(
    '[config] VITE_API_URL is not set. Create ilesure-home/.env.development with ' +
      'VITE_API_URL=http://localhost:4000 — otherwise this build will send real form ' +
      'submissions to the production API.'
  );
}

const API_BASE_URL = configuredApiUrl || 'https://api.ilesure.com';

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