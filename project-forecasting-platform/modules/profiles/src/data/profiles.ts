import { Profile } from '../types/profile.types';

/**
 * In-memory synthetic data - never real user data.
 * NOTE: only US-shaped postal codes are seeded here today. That's part
 * of why the EU bug in Lab 3.1 has gone unnoticed - the existing sample
 * data never exercised a non-US postal code.
 */
export const profiles: Profile[] = [
  { id: 'p1', userId: 'u1', displayName: 'Amara O.', country: 'US', postalCode: '94107', bio: 'Product manager.', createdAt: '2025-01-10T09:05:00.000Z' },
  { id: 'p2', userId: 'u5', displayName: 'Maria S.', country: 'US', postalCode: '10001-1234', bio: 'Backend engineer.', createdAt: '2025-01-14T09:05:00.000Z' },
];
