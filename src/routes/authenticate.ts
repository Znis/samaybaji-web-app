import express from 'express';
import { login, refresh } from '../controller/authenticate';
import { validateReqBody } from '../middleware/validator';
import { loginBodySchema } from '../schema/authenticate';

const router = express();

router.post('/login', validateReqBody(loginBodySchema), login);
router.post('/refresh', refresh);

export default router;
