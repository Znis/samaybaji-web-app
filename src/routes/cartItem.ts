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
import cartItemArraySchema from '../schema/cartItem';

const cartItemRouter = express();
cartItemRouter.post(
  '/add',
  validateReqBody(cartItemArraySchema),
  authenticate,
  authorize(Permissions.ADD_CART_ITEM),
  authorizeCRUD,
  addCartItem,
);

cartItemRouter.patch(
  '/edit',
  validateReqBody(editCartItemSchema),
  authenticate,
  authorize(Permissions.EDIT_CART_ITEM),
  authorizeCRUD,
  editCartItem,
);
cartItemRouter.delete(
  '/delete',
  authenticate,
  authorize(Permissions.DELETE_CART_ITEM),
  authorizeCRUD,
  deleteCartItem,
);

export default cartItemRouter;
