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
restaurantRouter.get('/all', getAllRestaurants);

restaurantRouter.post(
  '/',
  authenticate,
  authorize(Permissions.VIEW_RESTAURANT),
  authorizeCRUD,
  getRestaurant,
);

restaurantRouter.post(
  '/create',
  validateReqBody(createRestaurantBodySchema),
  authenticate,
  authorize(Permissions.CREATE_RESTAURANT),
  authorizeCRUD,
  createRestaurant,
);

restaurantRouter.patch(
  '/edit/',
  validateReqBody(editRestaurantBodySchema),
  authenticate,
  authorize(Permissions.EDIT_RESTAURANT),
  authorizeCRUD,
  editRestaurant,
);

restaurantRouter.delete(
  '/delete/',
  authenticate,
  authorize(Permissions.DELETE_RESTAURANT),
  authorizeCRUD,
  deleteRestaurant,
);
export default restaurantRouter;
