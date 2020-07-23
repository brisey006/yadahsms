import { Router } from 'express';
import { addImageSetting, getImageSettings, getImageSetting, updateImageSetting, deleteImageSetting } from '../../controllers/settings/image';
import { isAuthenticated, isSuperAdmin } from '../../config/auth';
const router = Router();

router.post('/', isAuthenticated, isSuperAdmin, addImageSetting);
router.get('/', isAuthenticated, getImageSettings);
router.get('/:id', isAuthenticated, getImageSetting);
router.put('/:id', isAuthenticated, updateImageSetting);
router.delete('/:id', isAuthenticated, deleteImageSetting);

export default router;