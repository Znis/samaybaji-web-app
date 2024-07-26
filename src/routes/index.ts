import { userIDQuerySchema as userIDQuerySchemaFromCart } from './../schema/cart';
import express from 'express';

import authRouter from './authenticate';
import userRouter from './users';
import restaurantRouter from './restaurant';
import { validateReqQuery } from '../middleware/validator';
import { userIDQuerySchema as userIDQuerySchemaFromRestaurant } from '../schema/restaurant';
import { userIDQuerySchema as userIDQuerySchemaFromUsers } from '../schema/users';
import menuRouter from './menu';
import { restaurantIDQuerySchema } from '../schema/menu';
import { menuIDQuerySchema } from '../schema/menuItem';
import menuItemRouter from './menuItem';
import cartRouter from './cart';
import cartItemRouter from './cartItem';
import { cartIDQuerySchema } from '../schema/cartItem';

const router = express();

router.use('/', authRouter);
router.use('/users', validateReqQuery(userIDQuerySchemaFromUsers), userRouter);
router.use('/menus', validateReqQuery(restaurantIDQuerySchema), menuRouter);
router.use('/carts', validateReqQuery(userIDQuerySchemaFromCart), cartRouter);
router.use('/cart-items', validateReqQuery(cartIDQuerySchema), cartItemRouter);
router.use('/menu-items', validateReqQuery(menuIDQuerySchema), menuItemRouter);
router.use(
  '/restaurants',
  validateReqQuery(userIDQuerySchemaFromRestaurant),
  restaurantRouter,
);

export default router;
