import { Request, Response } from 'express';
import { sendError } from '@shared/utils/http';
import { profiles } from '../data/profiles';
import { Profile } from '../types/profile.types';

export function listProfiles(req: Request, res: Response): void {
  res.status(200).json(profiles);
}

export function getProfileById(req: Request, res: Response): void {
  const { id } = req.params;
  const profile = profiles.find((p) => p.id === id);

  if (!profile) {
    sendError(res, 404, `Profile with id ${id} not found.`);
    return;
  }

  res.status(200).json(profile);
}

/**
 * POST /api/profiles
 * Creates a new profile. Validation (including postal code format) is
 * handled upstream in profiles.validator.ts - by the time a request
 * reaches this controller, req.body is assumed already valid.
 */
export function createProfile(req: Request, res: Response): void {
  const { userId, displayName, country, postalCode, bio } = req.body;

  const newProfile: Profile = {
    id: `p${profiles.length + 1}`,
    userId,
    displayName,
    country,
    postalCode,
    bio: bio ?? '',
    createdAt: new Date().toISOString(),
  };

  profiles.push(newProfile);
  res.status(201).json(newProfile);
}
