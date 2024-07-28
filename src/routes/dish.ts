import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqQuery } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createDish,
  deleteDish,
  editDish,
  getAllDishes,
  getDish,
} from '../controllers/dish';
import {
  createDishBodySchema,
  editDishBodySchema,
  editOrDeleteDishQuerySchema,
  getOrCreateDishQuerySchema,
} from '../schema/dish';

const dishRouter = express();

//for everyone
dishRouter.get('/', getAllDishes);

dishRouter.get(
  '/:menuItemID',
  validateReqQuery(getOrCreateDishQuerySchema),
  getDish,
);

dishRouter.post(
  '/create',
  validateReqQuery(getOrCreateDishQuerySchema),
  validateReqBody(createDishBodySchema),
  authenticate,
  authorize(Permissions.CREATE_MENU_ITEM),
  authorizeCRUD,
  createDish,
);

dishRouter.patch(
  '/edit/',
  validateReqQuery(editOrDeleteDishQuerySchema),
  validateReqBody(editDishBodySchema),
  authenticate,
  authorize(Permissions.EDIT_MENU_ITEM),
  authorizeCRUD,
  editDish,
);

dishRouter.delete(
  '/delete',
  validateReqQuery(editOrDeleteDishQuerySchema),
  authenticate,
  authorize(Permissions.DELETE_MENU_ITEM),
  authorizeCRUD,
  deleteDish,
);
export default dishRouter;
