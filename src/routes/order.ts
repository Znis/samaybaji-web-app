import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getOrdersByRestaurantID,
  getOrdersByUserID,
} from '../controllers/order';
import { validateReqBody } from '../middleware/validator';
import { createOrderSchema, editOrderByCustomerSchema } from '../schema/order';

const orderRouter = express();

//only for admin
orderRouter.get(
  '/all',
  authenticate,
  authorize(Permissions.VIEW_ALL_ORDER),
  authorizeCRUD,
  getAllOrders,
);

orderRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_ORDER),
  authorizeCRUD,
  getOrdersByUserID,
);
orderRouter.get(
  '/restaurant',
  authenticate,
  authorize(Permissions.VIEW_ORDER),
  authorizeCRUD,
  getOrdersByRestaurantID,
);
orderRouter.post(
  '/create',
  validateReqBody(createOrderSchema),
  authenticate,
  authorize(Permissions.CREATE_ORDER),
  authorizeCRUD,
  createOrder,
);

orderRouter.patch(
  '/edit',
  validateReqBody(editOrderByCustomerSchema),
  authenticate,
  authorize(Permissions.EDIT_ORDER),
  authorizeCRUD,
  editOrder,
);

orderRouter.delete(
  '/delete',
  authenticate,
  authorize(Permissions.CLEAR_CART),
  authorizeCRUD,
  deleteOrder,
);

export default orderRouter;
