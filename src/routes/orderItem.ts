import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import { validateReqBody, validateReqParams } from '../middleware/validator';
import {
  addOrderItem,
  deleteOrderItem,
  editOrderItem,
} from '../controllers/orderItem';
import {
  createOrderItemArraySchema,
  editOrderItemByRestaurantSchema,
  orderItemIdParamsSchema,
} from '../schema/orderItem';

const orderItemRouter = express();

//Routes for Authenticated User
orderItemRouter.post(
  '/',
  validateReqBody(createOrderItemArraySchema),
  authenticate,
  authorize(Permissions.CREATE_ORDER),
  authorizeCRUD,
  addOrderItem,
);

orderItemRouter.patch(
  '/:orderItemId',
  validateReqParams(orderItemIdParamsSchema),
  validateReqBody(editOrderItemByRestaurantSchema),
  authenticate,
  authorize(Permissions.EDIT_ORDER),
  authorizeCRUD,
  editOrderItem,
);

orderItemRouter.delete(
  '/:orderItemId',
  validateReqParams(orderItemIdParamsSchema),
  authenticate,
  authorize(Permissions.CANCEL_ORDER),
  authorizeCRUD,
  deleteOrderItem,
);

export default orderItemRouter;
