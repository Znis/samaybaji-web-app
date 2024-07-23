import express from 'express';

import authRouter from './authenticate';

const router = express();

router.use('/authenticate', authRouter);

export default router;
