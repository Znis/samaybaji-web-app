import express from 'express';

import authRouter from './authenticate';
import userRouter from './users';
import restaurantRouter from './restaurant';

const router = express();

router.use('/authenticate', authRouter);
router.use('/users', userRouter);
router.use('/restaurant', restaurantRouter);

export default router;
