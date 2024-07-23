import express from 'express';

import authRouter from './authenticate';
import userRouter from './users';

const router = express();

router.use('/authenticate', authRouter);
router.use('/users', userRouter);

export default router;
