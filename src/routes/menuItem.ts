import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createMenuItem,
  deleteMenuItem,
  editMenuItem,
  getAllMenuItems,
  getMenuItem,
} from '../controllers/menuItem';
import {
  createMenuItemBodySchema,
  editMenuItemBodySchema,
} from '../schema/menuItem';

const menuItemRouter = express();

menuItemRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_ALL_MENU_ITEM),
  authorizeCRUD('menuItems'),
  getAllMenuItems,
);
menuItemRouter.post(
  '/',
  authenticate,
  authorize(Permissions.VIEW_MENU_ITEM),
  authorizeCRUD('menuItems'),
  getMenuItem,
);
menuItemRouter.post(
  '/menu',
  authenticate,
  authorize(Permissions.VIEW_MENU_ITEM),
  authorizeCRUD('menuItems'),
  getMenuItem,
);

menuItemRouter.post(
  '/create',
  validateReqBody(createMenuItemBodySchema),
  authenticate,
  authorize(Permissions.CREATE_MENU_ITEM),
  authorizeCRUD('menuItems'),
  createMenuItem,
);

menuItemRouter.patch(
  '/edit/',
  validateReqBody(editMenuItemBodySchema),
  authenticate,
  authorize(Permissions.EDIT_MENU_ITEM),
  authorizeCRUD('menuItems'),
  editMenuItem,
);

menuItemRouter.delete(
  '/delete/',
  authenticate,
  authorize(Permissions.DELETE_MENU_ITEM),
  authorizeCRUD('menuItems'),
  deleteMenuItem,
);
export default menuItemRouter;
