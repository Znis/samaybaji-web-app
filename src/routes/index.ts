import express from 'express';
import authRouter from './authenticate';
import userRouter from './users';
import restaurantRouter from './restaurant';
import menuRouter from './menu';
import menuItemRouter from './menuItem';
import cartRouter from './cart';
import cartItemRouter from './cartItem';
import orderItemRouter from './orderItem';
import orderRouter from './order';
import dishRouter from './dish';
import reviewRouter from './review';
import ratingRouter from './rating';

const router = express();

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/menus', menuRouter);
router.use('/carts', cartRouter);
router.use('/cart-items', cartItemRouter);
router.use('/menu-items', menuItemRouter);
router.use('/restaurants', restaurantRouter);
router.use('/orders', orderRouter);
router.use('/order-items', orderItemRouter);
router.use('/dish', dishRouter);
router.use('/reviews', reviewRouter);
router.use('/ratings', ratingRouter);

export default router;
