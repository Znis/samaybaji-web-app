import express from 'express';
import { adminLogin, login, refresh } from '../controllers/authenticate';
import { validateReqBody } from '../middleware/validator';
import { loginBodySchema } from '../schema/authenticate';

const router = express();

//Route for Admin Only
router.post('/login/admin', validateReqBody(loginBodySchema), adminLogin);

//Route for Everyone
router.post('/login', validateReqBody(loginBodySchema), login);
router.post('/refresh', refresh);

export default router;
