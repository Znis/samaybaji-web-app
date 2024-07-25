import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqQuery } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createRestaurant,
  deleteRestaurant,
  editRestaurant,
  getAllRestaurants,
  getRestaurantByUserEmail,
} from '../controllers/restaurant';
import {
  createOrEditOrdeleteRestaurantQuerySchema,
  createRestaurantBodySchema,
  editRestaurantBodySchema,
  getRestaurantByUserEmailQuerySchema,
} from '../schema/restaurant';

const restaurantRouter = express();

restaurantRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_RESTAURANT),
  authorizeCRUD,
  getAllRestaurants,
);
restaurantRouter.post(
  '/',
  validateReqQuery(getRestaurantByUserEmailQuerySchema),
  authenticate,
  authorize(Permissions.VIEW_RESTAURANT),
  authorizeCRUD,
  getRestaurantByUserEmail,
);

restaurantRouter.post(
  '/create',
  validateReqQuery(createOrEditOrdeleteRestaurantQuerySchema),
  validateReqBody(createRestaurantBodySchema),
  authenticate,
  authorize(Permissions.CREATE_RESTAURANT),
  authorizeCRUD,
  createRestaurant,
);

restaurantRouter.patch(
  '/edit/',
  validateReqQuery(createOrEditOrdeleteRestaurantQuerySchema),
  validateReqBody(editRestaurantBodySchema),
  authenticate,
  authorize(Permissions.EDIT_RESTAURANT),
  authorizeCRUD,
  editRestaurant,
);

restaurantRouter.delete(
  '/delete/',
  validateReqQuery(createOrEditOrdeleteRestaurantQuerySchema),
  authenticate,
  authorize(Permissions.DELETE_RESTAURANT),
  authorizeCRUD,
  deleteRestaurant,
);
export default restaurantRouter;
