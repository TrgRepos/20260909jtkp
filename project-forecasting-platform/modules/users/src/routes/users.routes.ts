import { Router } from 'express';
import { listUsers, getUserById } from '../controllers/users.controller';
import { validateUserIdParam } from '../validators/users.validator';

const router = Router();

// GET /api/users - list all users
router.get('/', listUsers);

// GET /api/users/:id - return a single user by id
router.get('/:id', validateUserIdParam, getUserById);

export default router;
