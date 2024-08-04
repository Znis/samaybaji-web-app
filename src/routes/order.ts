import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getOrdersByRestaurantId,
  getOrdersByUserId,
} from '../controllers/order';
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from '../middleware/validator';
import {
  createOrderSchema,
  editOrderByCustomerSchema,
  orderIdParamsSchema,
} from '../schema/order';

const orderRouter = express();

//Route for Admin Only
orderRouter.get(
  '/all',
  authenticate,
  authorize(Permissions.VIEW_ALL_ORDER),
  authorizeCRUD,
  getAllOrders,
);

//Routes for Authenticated User
orderRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_ORDER),
  authorizeCRUD,
  getOrdersByUserId,
);
orderRouter.get(
  '/restaurant',
  authenticate,
  authorize(Permissions.VIEW_ORDER),
  authorizeCRUD,
  getOrdersByRestaurantId,
);
orderRouter.post(
  '/',
  validateReqBody(createOrderSchema),
  authenticate,
  authorize(Permissions.CREATE_ORDER),
  authorizeCRUD,
  createOrder,
);

orderRouter.patch(
  '/:orderId',
  validateReqParams(orderIdParamsSchema),
  validateReqBody(editOrderByCustomerSchema),
  authenticate,
  authorize(Permissions.EDIT_ORDER),
  authorizeCRUD,
  editOrder,
);

orderRouter.delete(
  '/:orderId',
  validateReqParams(orderIdParamsSchema),
  authenticate,
  authorize(Permissions.CLEAR_CART),
  authorizeCRUD,
  deleteOrder,
);

export default orderRouter;
