import { createUserBodySchema, editUserBodySchema } from './../schema/users';
import { Permissions } from './../enums/permissions';
import express from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUser,
} from '../controllers/users';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';

const usersRouter = express();

usersRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_ALL_USER),
  authorizeCRUD,
  getAllUsers,
);
usersRouter.post(
  '/',
  authenticate,
  authorize(Permissions.VIEW_USER),
  authorizeCRUD,
  getUser,
);

usersRouter.post(
  '/register',
  validateReqBody(createUserBodySchema),
  createUser,
);

usersRouter.patch(
  '/edit/',
  validateReqBody(editUserBodySchema),
  authenticate,
  authorize(Permissions.EDIT_USER),
  authorizeCRUD,
  editUser,
);

usersRouter.delete(
  '/delete/',
  authenticate,
  authorize(Permissions.DELETE_USER),
  authorizeCRUD,
  deleteUser,
);
export default usersRouter;
