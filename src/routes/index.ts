import express from 'express';

import authRouter from './authenticate';

const router = express();

router.use('/auth', authRouter);

export default router;
