import {
  createUserBodySchema,
  editOrdeleteUserQuerySchema,
  editUserBodySchema,
  getUserByEmailQuerySchema,
} from './../schema/users';
import { Permissions } from './../enums/permissions';
import express from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUserByEmail,
} from '../controllers/users';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqQuery } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';

const usersRouter = express();

usersRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_USER),
  authorizeCRUD,
  getAllUsers,
);
usersRouter.post(
  '/',
  validateReqQuery(getUserByEmailQuerySchema),
  authenticate,
  authorize(Permissions.VIEW_USER),
  authorizeCRUD,
  getUserByEmail,
);

usersRouter.post(
  '/register',
  validateReqBody(createUserBodySchema),
  createUser,
);

usersRouter.patch(
  '/edit/',
  validateReqQuery(editOrdeleteUserQuerySchema),
  validateReqBody(editUserBodySchema),
  authenticate,
  authorize(Permissions.EDIT_USER),
  authorizeCRUD,
  editUser,
);

usersRouter.delete(
  '/delete/',
  validateReqQuery(editOrdeleteUserQuerySchema),
  authenticate,
  authorize(Permissions.DELETE_USER),
  authorizeCRUD,
  deleteUser,
);
export default usersRouter;
