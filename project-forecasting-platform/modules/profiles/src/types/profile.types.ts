import { ISODateString } from '@shared/types/common.types';

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  country: string; // ISO 3166-1 alpha-2, e.g. "US", "DE", "GB"
  postalCode: string;
  bio: string;
  createdAt: ISODateString;
}
