import express from 'express';
import { login, refresh } from '../controller/authenticate';
import { validateReqBody } from '../middleware/validator';
import { loginBodySchema, refreshTokenBodySchema } from '../schema/authenticate';

const router = express();

router.post('/login', validateReqBody(loginBodySchema), login);
router.post('/refresh', validateReqBody(refreshTokenBodySchema), refresh);

export default router;
