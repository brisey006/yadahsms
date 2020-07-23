import { Router } from 'express';
import { isAuthenticated } from '../config/auth';
import { addDeliveryNote } from '../controllers/sms';

const router = Router();

router.post('/', addDeliveryNote);

export default router;