import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import { createMenuBodySchema, editMenuBodySchema } from '../schema/menu';
import {
  createMenu,
  deleteMenu,
  editMenu,
  getAllMenus,
  getMenuItems,
} from '../controllers/menu';

const menuRouter = express();

//for everyone
menuRouter.get('/all', getAllMenus);

menuRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_MENU),
  authorizeCRUD,
  getMenuItems,
);

menuRouter.post(
  '/create',
  validateReqBody(createMenuBodySchema),
  authenticate,
  authorize(Permissions.CREATE_MENU),
  authorizeCRUD,
  createMenu,
);

menuRouter.patch(
  '/edit/',
  validateReqBody(editMenuBodySchema),
  authenticate,
  authorize(Permissions.EDIT_MENU),
  authorizeCRUD,
  editMenu,
);

menuRouter.delete(
  '/delete/',
  authenticate,
  authorize(Permissions.DELETE_MENU),
  authorizeCRUD,
  deleteMenu,
);
export default menuRouter;
