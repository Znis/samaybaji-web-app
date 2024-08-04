import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import { clearCart, getAllCarts, getCartItems } from '../controllers/cart';

const cartRouter = express();

//Route for Admin Only
cartRouter.get(
  '/all',
  authenticate,
  authorize(Permissions.VIEW_ALL_CART),
  authorizeCRUD,
  getAllCarts,
);

//Routes for Authenticated User
cartRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_CART),
  authorizeCRUD,
  getCartItems,
);

cartRouter.delete(
  '/clear',
  authenticate,
  authorize(Permissions.CLEAR_CART),
  authorizeCRUD,
  clearCart,
);

export default cartRouter;
