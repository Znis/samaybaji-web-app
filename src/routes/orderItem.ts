import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import { validateReqBody } from '../middleware/validator';

const orderItemRouter = express();
orderItemRouter.post(
  '/add',
  validateReqBody(cartItemArraySchema),
  authenticate,
  authorize(Permissions.ADD_ORDER_ITEM),
  authorizeCRUD,
  addCartItem,
);

orderItemRouter.patch(
  '/edit',
  validateReqBody(editCartItemSchema),
  authenticate,
  authorize(Permissions.EDIT_ORDER_ITEM),
  authorizeCRUD,
  editCartItem,
);
orderItemRouter.delete(
  '/delete',
  authenticate,
  authorize(Permissions.DELETE_ORDER_ITEM),
  authorizeCRUD,
  deleteCartItem,
);

export default orderItemRouter;
