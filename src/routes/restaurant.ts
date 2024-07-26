import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createRestaurant,
  deleteRestaurant,
  editRestaurant,
  getAllRestaurants,
  getRestaurant,
} from '../controllers/restaurant';
import {
  createRestaurantBodySchema,
  editRestaurantBodySchema,
} from '../schema/restaurant';

const restaurantRouter = express();

//for everyone
restaurantRouter.get('/', getAllRestaurants);

restaurantRouter.post(
  '/',
  authenticate,
  authorize(Permissions.VIEW_RESTAURANT),
  authorizeCRUD('restaurants'),
  getRestaurant,
);

restaurantRouter.post(
  '/create',
  validateReqBody(createRestaurantBodySchema),
  authenticate,
  authorize(Permissions.CREATE_RESTAURANT),
  authorizeCRUD('restaurants'),
  createRestaurant,
);

restaurantRouter.patch(
  '/edit/',
  validateReqBody(editRestaurantBodySchema),
  authenticate,
  authorize(Permissions.EDIT_RESTAURANT),
  authorizeCRUD('restaurants'),
  editRestaurant,
);

restaurantRouter.delete(
  '/delete/',
  authenticate,
  authorize(Permissions.DELETE_RESTAURANT),
  authorizeCRUD('restaurants'),
  deleteRestaurant,
);
export default restaurantRouter;
