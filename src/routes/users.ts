import {
  createUserBodySchema,
  editUserBodySchema,
  userIdQuerySchema,
} from './../schema/users';
import { Permissions } from './../enums/permissions';
import express from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getRoleId,
  getUser,
} from '../controllers/users';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqQuery } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';

const usersRouter = express();

//Route for Admin Only
usersRouter.get(
  '/all',
  authenticate,
  authorize(Permissions.VIEW_ALL_USER),
  authorizeCRUD,
  getAllUsers,
);

//Route for Everyone
usersRouter.get('/', validateReqQuery(userIdQuerySchema), getUser);

//Routes for Authenticated User
usersRouter.get(
  '/role',
  validateReqQuery(userIdQuerySchema),
  authenticate,
  getRoleId,
);

usersRouter.post('/', validateReqBody(createUserBodySchema), createUser);

usersRouter.patch(
  '/',
  validateReqBody(editUserBodySchema),
  authenticate,
  authorize(Permissions.EDIT_USER),
  authorizeCRUD,
  editUser,
);

usersRouter.delete(
  '/',
  authenticate,
  authorize(Permissions.DELETE_USER),
  authorizeCRUD,
  deleteUser,
);
export default usersRouter;
