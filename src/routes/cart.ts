import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import cartItemSchema, { editCartItemSchema } from '../schema/cartItem';
import {
  addCartItem,
  clearCart,
  deleteCartItem,
  editCartItem,
  getAllCarts,
  getCart,
} from '../controllers/cart';

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

cartRouter.post(
  '/add-item',
  validateReqBody(cartItemSchema),
  authenticate,
  authorize(Permissions.ADD_CART_ITEM),
  authorizeCRUD('cart'),
  addCartItem,
);

cartRouter.patch(
  '/edit-item',
  validateReqBody(editCartItemSchema),
  authenticate,
  authorize(Permissions.EDIT_CART_ITEM),
  authorizeCRUD('cart'),
  editCartItem,
);
cartRouter.delete(
  '/delete-item',
  authenticate,
  authorize(Permissions.DELETE_CART_ITEM),
  authorizeCRUD('cart'),
  deleteCartItem,
);
cartRouter.delete(
  '/clear-cart',
  authenticate,
  authorize(Permissions.CLEAR_CART),
  authorizeCRUD('cart'),
  clearCart,
);

export default cartRouter;
