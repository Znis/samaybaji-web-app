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
  createMenuItem,
  deleteMenuItem,
  editMenuItem,
  getAllMenuItems,
  getMenuItem,
  getPopularMenuItems,
} from '../controllers/menuItem';
import {
  createMenuItemBodySchema,
  editMenuItemBodySchema,
  menuItemIdParamsSchema,
  menuItemIdQuerySchema,
} from '../schema/menuItem';

const menuItemRouter = express();

//for everyone
menuItemRouter.get('/', getAllMenuItems);
menuItemRouter.get('/popular', getPopularMenuItems);

menuItemRouter.post('/', validateReqQuery(menuItemIdQuerySchema), getMenuItem);
menuItemRouter.post(
  '/',
  validateReqBody(createMenuItemBodySchema),
  authenticate,
  authorize(Permissions.CREATE_MENU_ITEM),
  authorizeCRUD,
  createMenuItem,
);

menuItemRouter.patch(
  '/:menuItemId',
  validateReqParams(menuItemIdParamsSchema),
  validateReqBody(editMenuItemBodySchema),
  authenticate,
  authorize(Permissions.EDIT_MENU_ITEM),
  authorizeCRUD,
  editMenuItem,
);

menuItemRouter.delete(
  '/:menuItemId',
  validateReqParams(menuItemIdParamsSchema),
  authenticate,
  authorize(Permissions.DELETE_MENU_ITEM),
  authorizeCRUD,
  deleteMenuItem,
);
export default menuItemRouter;
