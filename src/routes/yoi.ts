import { Router } from 'express';
import { getYOIs } from '../controllers/yoi';
import { isAuthenticated } from '../config/auth';

const router = Router();

router.get('/', isAuthenticated, getYOIs);

export default router;