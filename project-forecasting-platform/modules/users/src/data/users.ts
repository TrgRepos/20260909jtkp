import { User } from '../types/user.types';

/**
 * In-memory synthetic data - never real user data. Mirrors the pattern
 * used in Session 1.1's forecasts.ts.
 */
export const users: User[] = [
  { id: 'u1', email: 'amara.okoye@example.com', fullName: 'Amara Okoye', country: 'US', createdAt: '2025-01-10T09:00:00.000Z' },
  { id: 'u2', email: 'liam.oconnor@example.com', fullName: "Liam O'Connor", country: 'GB', createdAt: '2025-01-11T09:00:00.000Z' },
  { id: 'u3', email: 'sofia.bianchi@example.com', fullName: 'Sofia Bianchi', country: 'IT', createdAt: '2025-01-12T09:00:00.000Z' },
  { id: 'u4', email: 'jonas.weber@example.com', fullName: 'Jonas Weber', country: 'DE', createdAt: '2025-01-13T09:00:00.000Z' },
  { id: 'u5', email: 'maria.silva@example.com', fullName: 'Maria Silva', country: 'US', createdAt: '2025-01-14T09:00:00.000Z' },
];
