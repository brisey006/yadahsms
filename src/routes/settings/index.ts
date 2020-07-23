import { Router } from 'express';
const router = Router();

import imageSettings from './image-settings';

router.use('/image', imageSettings);

export default router;