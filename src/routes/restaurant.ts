import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqParams } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createRestaurant,
  deleteRestaurant,
  editRestaurant,
  getAllRestaurants,
  getRestaurant,
  getRestaurantInfo,
} from '../controllers/restaurant';
import {
  createRestaurantBodySchema,
  editRestaurantBodySchema,
  restaurantIdParamsSchema,
} from '../schema/restaurant';

const restaurantRouter = express();

//for everyone
restaurantRouter.get('/all', getAllRestaurants);
restaurantRouter.get(
  '/:restaurantId',
  validateReqParams(restaurantIdParamsSchema),
  getRestaurantInfo,
);

restaurantRouter.get(
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
