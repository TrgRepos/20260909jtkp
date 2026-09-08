import { Request, Response, NextFunction } from 'express';
import { sendError } from '@shared/utils/http';

const US_ZIP_PATTERN = /^\d{5}(-\d{4})?$/;

/**
 * Validates a postal code. Written when the product only supported US
 * users - never updated when `country` was added to the Profile shape.
 *
 * NOTE (intentionally left as-is - this is the Session 3.1 / Lab 3.1
 * defect the participants are meant to find and fix):
 * this always applies the US ZIP pattern, regardless of the profile's
 * `country`. A well-formed UK postcode ("SW1A 1AA"), German PLZ with a
 * leading zero pattern outside 5 digits, etc. will be rejected as
 * malformed even though nothing is actually wrong with them.
 */
function isValidPostalCode(postalCode: string): boolean {
  return US_ZIP_PATTERN.test(postalCode);
}

export function validateCreateProfile(req: Request, res: Response, next: NextFunction): void {
  const { userId, displayName, country, postalCode } = req.body;

  if (typeof userId !== 'string' || userId.trim() === '') {
    sendError(res, 400, 'userId is required.');
    return;
  }

  if (typeof displayName !== 'string' || displayName.trim() === '') {
    sendError(res, 400, 'displayName is required.');
    return;
  }

  if (typeof country !== 'string' || !/^[A-Z]{2}$/.test(country)) {
    sendError(res, 400, 'country must be a 2-letter ISO country code.');
    return;
  }

  if (typeof postalCode !== 'string' || !isValidPostalCode(postalCode)) {
    sendError(res, 400, 'postalCode is not a valid postal code.');
    return;
  }

  next();
}

/**
 * Validates the :id route param for GET /api/profiles/:id.
 */
export function validateProfileIdParam(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;

  if (!/^p[1-9]\d*$/.test(id)) {
    sendError(res, 400, 'id must be a valid profile id (e.g. p1).');
    return;
  }

  next();
}
