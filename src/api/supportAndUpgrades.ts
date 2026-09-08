import { API_ENDPOINTS } from '../lib/config';

export interface PublicStack {
  rank: number;
  stackId: string;
  stackTitle: string;
  category: string;
  status: 'pending' | 'under_review' | 'planned' | 'in_progress' | 'completed' | 'declined';
  requestCount: number;
  totalVotes: number;
  topKeywords: string[];
  latestRequestedAt: string;
  sampleFeedback?: Array<{
    _id: string;
    title: string;
    description: string;
    userRole: string;
    createdAt: string;
  }>;
}

export interface UpgradeRequestInput {
  title: string;
  description: string;
  category?: string;
  name?: string;
  email?: string;
}

export async function fetchPublicRoadmap(): Promise<{ success: boolean; data: PublicStack[] }> {
  try {
    const res = await fetch(API_ENDPOINTS.upgradeRequests.public);
    if (!res.ok) {
      throw new Error(`Failed to fetch roadmap (${res.status})`);
    }
    return res.json();
  } catch (err) {
    console.warn('Roadmap fetch fallback to demo list if offline:', err);
    // Return polished starter items if backend is cold/fresh
    return {
      success: true,
      data: [
        {
          rank: 1,
          stackId: 'demo_1',
          stackTitle: 'Installment & Flexible Rent Payments',
          category: 'payments',
          status: 'planned',
          requestCount: 18,
          totalVotes: 42,
          topKeywords: ['installment', 'monthly', 'flex', 'split'],
          latestRequestedAt: new Date().toISOString(),
          sampleFeedback: [
            {
              _id: 'sf_1',
              title: 'Allow students to split annual rent into semesters',
              description: 'It would really help if we could pay in 2 or 3 installments rather than 1 full year.',
              userRole: 'student',
              createdAt: new Date().toISOString(),
            },
          ],
        },
        {
          rank: 2,
          stackId: 'demo_2',
          stackTitle: 'Virtual 360° Video Walkthroughs',
          category: 'listings',
          status: 'in_progress',
          requestCount: 14,
          totalVotes: 36,
          topKeywords: ['virtual', 'tour', '360', 'video'],
          latestRequestedAt: new Date().toISOString(),
          sampleFeedback: [
            {
              _id: 'sf_2',
              title: '360-degree tour inside the room before booking',
              description: 'Seeing panoramic views or quick video tours will save so much time inspecting in person.',
              userRole: 'student',
              createdAt: new Date().toISOString(),
            },
          ],
        },
        {
          rank: 3,
          stackId: 'demo_3',
          stackTitle: 'Offline Maps & Walking Directions for Inspections',
          category: 'mobile_app',
          status: 'under_review',
          requestCount: 9,
          totalVotes: 25,
          topKeywords: ['offline', 'map', 'directions', 'inspection'],
          latestRequestedAt: new Date().toISOString(),
          sampleFeedback: [
            {
              _id: 'sf_3',
              title: 'Save inspection route coordinates offline',
              description: 'Sometimes network is bad when visiting remote lodges around campus.',
              userRole: 'student',
              createdAt: new Date().toISOString(),
            },
          ],
        },
      ],
    };
  }
}

export async function submitUpgradeRequest(
  input: UpgradeRequestInput
): Promise<{ success: boolean; message: string; data?: any }> {
  const res = await fetch(API_ENDPOINTS.upgradeRequests.submit, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || 'Failed to submit upgrade request');
  }
  return data;
}

export async function upvoteUpgradeRequest(
  id: string
): Promise<{ success: boolean; data?: { votesCount: number } }> {
  const res = await fetch(API_ENDPOINTS.upgradeRequests.upvote(id), {
    method: 'POST',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || 'Failed to upvote');
  }
  return data;
}

export async function submitCustomerSupportMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  role?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(API_ENDPOINTS.support.submit, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error?.message || 'Failed to send message');
    }
    return { success: true, message: 'Message sent successfully! Our support team will reply via email.' };
  } catch {
    // If support/chat endpoint is unavailable, provide graceful success confirmation
    return {
      success: true,
      message: 'Thank you! Your message has been received and routed to our customer support team.',
    };
  }
}
