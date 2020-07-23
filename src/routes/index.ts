import { Router } from 'express';
import users from './users';
import settings from './settings';
import yoi from './yoi';
import mwp from './mwp';
import wov from './wov';
import sms from './sms';

const router = Router();

router.use('/users', users);
router.use('/settings', settings);
router.use('/yoi', yoi);
router.use('/mwp', mwp);
router.use('/wov', wov);
router.use('/sms', sms);

export default router;