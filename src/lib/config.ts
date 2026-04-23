const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ilesure-backend.onrender.com';

export const API_ENDPOINTS = {
  waitlist: {
    join: `${API_BASE_URL}/api/v1/waitlist/landing`,
    count: `${API_BASE_URL}/api/v1/waitlist/count`,
  },
} as const;

export default API_BASE_URL;