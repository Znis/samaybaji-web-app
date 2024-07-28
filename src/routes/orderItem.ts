import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import { validateReqBody } from '../middleware/validator';
import {
  addOrderItem,
  deleteOrderItem,
  editOrderItem,
} from '../controllers/orderItem';
import {
  createOrderItemArraySchema,
  editOrderItemByRestaurantSchema,
} from '../schema/orderItem';

const orderItemRouter = express();
orderItemRouter.post(
  '/add',
  validateReqBody(createOrderItemArraySchema),
  authenticate,
  // authorize(Permissions.ADD_ORDER_ITEM),
  authorizeCRUD,
  addOrderItem,
);

orderItemRouter.patch(
  '/edit',
  validateReqBody(editOrderItemByRestaurantSchema),
  authenticate,
  // authorize(Permissions.EDIT_ORDER_ITEM),
  authorizeCRUD,
  editOrderItem,
);

orderItemRouter.delete(
  '/delete',
  authenticate,
  // authorize(Permissions.DELETE_ORDER_ITEM),
  authorizeCRUD,
  deleteOrderItem,
);

export default orderItemRouter;
