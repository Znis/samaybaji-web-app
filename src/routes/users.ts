import {
  createUserBodySchema,
  editOrdeleteUserQuerySchema,
  editUserBodySchema,
  getUserByEmailQuerySchema,
} from './../schema/users';
import Permissions from './../enums/permissions';
import express from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUserByEmail,
} from '../controller/users';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqQuery } from '../middleware/validator';
import { authorize, authorizeUserEditOrDelete } from '../middleware/authorize';

const usersRouter = express();

usersRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_USERS),
  getAllUsers,
);
usersRouter.post(
  '/',
  validateReqQuery(getUserByEmailQuerySchema),
  authenticate,
  authorize(Permissions.VIEW_USERS),
  getUserByEmail,
);

usersRouter.post(
  '/register',
  validateReqBody(createUserBodySchema),
  authenticate,
  authorize(Permissions.ADD_USERS),
  createUser,
);

usersRouter.patch(
  '/edit/',
  validateReqQuery(editOrdeleteUserQuerySchema),
  validateReqBody(editUserBodySchema),
  authenticate,
  authorize(Permissions.EDIT_USERS),
  authorizeUserEditOrDelete,
  editUser,
);

usersRouter.delete(
  '/delete/',
  validateReqQuery(editOrdeleteUserQuerySchema),
  authenticate,
  authorize(Permissions.DELETE_USERS),
  authorizeUserEditOrDelete,
  deleteUser,
);
export default usersRouter;
