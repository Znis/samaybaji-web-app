import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import { validateReqBody } from '../middleware/validator';
import cartItemSchema, { editCartItemSchema } from '../schema/cartItem';
import {
  addCartItem,
  deleteCartItem,
  editCartItem,
} from '../controllers/cartItem';

const cartRouter = express();
cartRouter.post(
  '/add-item',
  validateReqBody(cartItemSchema),
  authenticate,
  authorize(Permissions.ADD_CART_ITEM),
  authorizeCRUD('cartItem'),
  addCartItem,
);

cartRouter.patch(
  '/edit-item',
  validateReqBody(editCartItemSchema),
  authenticate,
  authorize(Permissions.EDIT_CART_ITEM),
  authorizeCRUD('cartItem'),
  editCartItem,
);
cartRouter.delete(
  '/delete-item',
  authenticate,
  authorize(Permissions.DELETE_CART_ITEM),
  authorizeCRUD('cartItem'),
  deleteCartItem,
);
