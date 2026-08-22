import { API_ENDPOINTS } from '../lib/config';

export interface WaitlistFormData {
  fullName: string;
  email: string;
  phone?: string;
  university: string;
  role?: string;
}

export interface WaitlistResponse {
  success: boolean;
  data?: {
    id: string;
    position: number;
  };
  message?: string;
  error?: {
    code: string;
    message: string;
  };
}

export async function submitToWaitlist(data: WaitlistFormData): Promise<WaitlistResponse> {
  // SECURITY-FIX TODO (H-L3): This is an unauthenticated POST carrying PII (name, email, phone).
  // The receiving endpoint MUST enforce server-side validation, input sanitization, and
  // rate-limiting / CAPTCHA to prevent spam and bot abuse — client-side validation in
  // WaitlistModal is not a security control. Owned by the backend team; endpoint URL unchanged.
  const response = await fetch(API_ENDPOINTS.waitlist.join, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getWaitlistCount(): Promise<{ success: boolean; count: number }> {
  try {
    const response = await fetch(API_ENDPOINTS.waitlist.count);
    const res = await response.json();
    const count = res.data?.totalCount ?? res.count ?? 0;
    return { success: !!res.success, count };
  } catch {
    return { success: false, count: 0 };
  }
}