import { Request, Response } from 'express';
import { sendError } from '@shared/utils/http';
import { users } from '../data/users';

export function listUsers(req: Request, res: Response): void {
  res.status(200).json(users);
}

export function getUserById(req: Request, res: Response): void {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    sendError(res, 404, `User with id ${id} not found.`);
    return;
  }

  res.status(200).json(user);
}
