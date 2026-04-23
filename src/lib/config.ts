const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  waitlist: {
    join: `${API_BASE_URL}/api/v1/waitlist/landing`,
    count: `${API_BASE_URL}/api/v1/waitlist/count`,
  },
} as const;

export default API_BASE_URL;