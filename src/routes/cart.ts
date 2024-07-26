import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import { clearCart, getAllCarts, getCart } from '../controllers/cart';

const cartRouter = express();

cartRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_ALL_CART),
  authorizeCRUD('cart'),
  getAllCarts,
);
cartRouter.post(
  '/',
  authenticate,
  authorize(Permissions.VIEW_CART),
  authorizeCRUD('cart'),
  getCart,
);

cartRouter.delete(
  '/clear',
  authenticate,
  authorize(Permissions.CLEAR_CART),
  authorizeCRUD('cart'),
  clearCart,
);

export default cartRouter;
