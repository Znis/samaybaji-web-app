import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize, authorizeCRUD } from '../middleware/authorize';

const orderRouter = express();

//only for admin
orderRouter.get(
  '/all',
  authenticate,
  authorize(Permissions.VIEW_ALL_ORDER),
  authorizeCRUD,
  getAllCarts,
);

orderRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_ORDER),
  authorizeCRUD,
  getCartItems,
);

orderRouter.patch(
  '/cancel',
  authenticate,
  authorize(Permissions.EDIT_ORDER),
  authorizeCRUD,
  clearCart,
);

orderRouter.delete(
    '/delete',
    authenticate,
    authorize(Permissions.CLEAR_CART),
    authorizeCRUD,
    clearCart,
  );

export default orderRouter;
