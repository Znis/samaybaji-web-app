import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createDish,
  deleteDish,
  editDish,
  getAllDishes,
  getDish,
  getDishByMenuItemId,
} from '../controllers/dish';
import {
  createDishBodySchema,
  dishIdParamsSchema,
  editDishBodySchema,
  menuItemIdParamsSchema,
} from '../schema/dish';

const dishRouter = express();

//for everyone
dishRouter.get('/all', getAllDishes);

dishRouter.get('/:dishId', validateReqParams(dishIdParamsSchema), getDish);

dishRouter.get(
  '/menu-item-id/:menuItemId',
  validateReqParams(menuItemIdParamsSchema),
  getDishByMenuItemId,
);

dishRouter.post(
  '/:menuItemId',
  validateReqParams(menuItemIdParamsSchema),
  validateReqBody(createDishBodySchema),
  authenticate,
  authorize(Permissions.CREATE_MENU_ITEM),
  authorizeCRUD,
  createDish,
);

dishRouter.patch(
  '/:dishId',
  validateReqParams(dishIdParamsSchema),
  validateReqBody(editDishBodySchema),
  authenticate,
  authorize(Permissions.EDIT_MENU_ITEM),
  authorizeCRUD,
  editDish,
);

dishRouter.delete(
  '/:dishId',
  validateReqParams(dishIdParamsSchema),
  authenticate,
  authorize(Permissions.DELETE_MENU_ITEM),
  authorizeCRUD,
  deleteDish,
);
export default dishRouter;
