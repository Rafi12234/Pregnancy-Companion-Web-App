// Backend/routes/profile.js
import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { getMyProfile, upsertMyProfile } from '../controller/profilecontroller.js';

const router = Router();

// Require auth so each mother only sees/edits her own profile
router.get('/', auth, getMyProfile);
router.put('/', auth, upsertMyProfile);

export default router;
