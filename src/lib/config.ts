const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.ilesure.com';

export const API_ENDPOINTS = {
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