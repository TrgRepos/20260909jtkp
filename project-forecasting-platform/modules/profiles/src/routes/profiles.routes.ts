import { Router } from 'express';
import { listProfiles, getProfileById, createProfile } from '../controllers/profiles.controller';
import { validateProfileIdParam, validateCreateProfile } from '../validators/profiles.validator';

const router = Router();

// GET /api/profiles - list all profiles
router.get('/', listProfiles);

// GET /api/profiles/:id - return a single profile by id
router.get('/:id', validateProfileIdParam, getProfileById);

// POST /api/profiles - create a new profile
router.post('/', validateCreateProfile, createProfile);

export default router;
