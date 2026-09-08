import { Request, Response, NextFunction } from 'express';
import { sendError } from '@shared/utils/http';

/**
 * Validates the :id route param for GET /api/users/:id.
 */
export function validateUserIdParam(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;

  if (!/^u[1-9]\d*$/.test(id)) {
    sendError(res, 400, 'id must be a valid user id (e.g. u1).');
    return;
  }

  next();
}
