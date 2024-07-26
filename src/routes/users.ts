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

//for admin only
usersRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_ALL_USER),
  authorizeCRUD('users'),
  getAllUsers,
);

usersRouter.post(
  '/',
  authenticate,
  authorize(Permissions.VIEW_USER),
  authorizeCRUD('users'),
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
  authorizeCRUD('users'),
  editUser,
);

usersRouter.delete(
  '/delete/',
  authenticate,
  authorize(Permissions.DELETE_USER),
  authorizeCRUD('users'),
  deleteUser,
);
export default usersRouter;
