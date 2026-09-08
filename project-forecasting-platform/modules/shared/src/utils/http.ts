import { Response } from 'express';

/**
 * Shared response helpers. Both modules (users, profiles) depend on this
 * file for consistent error shapes - it's the one approved way to cross
 * from one module into shared code. Modules should never import directly
 * from each other's src/ folders (see .cursor/rules/*.mdc).
 */
export function sendError(res: Response, status: number, message: string): void {
  res.status(status).json({ error: message });
}
