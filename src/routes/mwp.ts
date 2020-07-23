import { Router } from 'express';
import { isAuthenticated } from '../config/auth';
import { getAllMWP } from '../controllers/mwp';

const router = Router();

router.get('/', isAuthenticated, getAllMWP);

export default router;