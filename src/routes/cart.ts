import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import cartItemSchema, { editCartItemSchema } from '../schema/cartItem';

const cartRouter = express();

cartRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_ALL_CART),
  authorizeCRUD('cart'),
  getAllCart,
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
  '/delete',
  authenticate,
  authorize(Permissions.EMPTY_CART),
  authorizeCRUD('cart'),
  deleteCart,
);

export default cartRouter;
