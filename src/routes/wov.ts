import { Router } from 'express';
import { isAuthenticated } from '../config/auth';
import { getAllWOV } from '../controllers/wov';

const router = Router();

router.get('/', isAuthenticated, getAllWOV);

export default router;