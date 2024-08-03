import express from 'express';
import { adminLogin, login, refresh } from '../controllers/authenticate';
import { validateReqBody } from '../middleware/validator';
import { loginBodySchema } from '../schema/authenticate';

const router = express();

router.post('/login', validateReqBody(loginBodySchema), login);
router.post('/login/admin', validateReqBody(loginBodySchema), adminLogin);
router.post('/refresh', refresh);

export default router;
