import express from 'express';

import authRouter from './authenticate';
import userRouter from './users';
import restaurantRouter from './restaurant';
import { validateReqQuery } from '../middleware/validator';
import { userIDQuerySchema } from '../schema/restaurant';
import menuRouter from './menu';
import { restaurantIDQuerySchema } from '../schema/menu';
import { menuIDQuerySchema } from '../schema/menuItem';
import menuItemRouter from './menuItem';

const router = express();

router.use('/authenticate', authRouter);
router.use('/users', validateReqQuery(userIDQuerySchema), userRouter);
router.use('/menus', validateReqQuery(restaurantIDQuerySchema), menuRouter);
router.use('/menu-items', validateReqQuery(menuIDQuerySchema), menuItemRouter);
router.use(
  '/restaurant',
  validateReqQuery(userIDQuerySchema),
  restaurantRouter,
);

export default router;
