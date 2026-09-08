import { ISODateString } from '@shared/types/common.types';

export interface User {
  id: string;
  email: string;
  fullName: string;
  country: string; // ISO 3166-1 alpha-2, e.g. "US", "DE", "GB"
  createdAt: ISODateString;
}
