import express from 'express';

import authRouter from './authenticate';
import userRouter from './users';
import restaurantRouter from './restaurant';
import { validateReqQuery } from '../middleware/validator';
import { userIDQuerySchema } from '../schema/users';

const router = express();

router.use('/authenticate', authRouter);
router.use('/users', validateReqQuery(userIDQuerySchema), userRouter);
router.use(
  '/restaurant',
  validateReqQuery(userIDQuerySchema),
  restaurantRouter,
);

export default router;
