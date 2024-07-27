import express from 'express';
import authRouter from './authenticate';
import userRouter from './users';
import restaurantRouter from './restaurant';
import menuRouter from './menu';
import menuItemRouter from './menuItem';
import cartRouter from './cart';
import cartItemRouter from './cartItem';

const router = express();

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/menus', menuRouter);
router.use('/carts', cartRouter);
router.use('/cart-items', cartItemRouter);
router.use('/menu-items', menuItemRouter);
router.use('/restaurants', restaurantRouter);

export default router;
