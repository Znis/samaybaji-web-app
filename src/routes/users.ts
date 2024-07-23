import {
  createOrEditUserBodySchema,
  editOrdeleteUserQuerySchema,
} from './../schema/users';
import Permissions from './../enums/permissions';
import express from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  getUserByEmail,
} from '../controller/users';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqQuery } from '../middleware/validator';
import { authorize } from '../middleware/authorize';

const usersRouter = express();

usersRouter.post('/', authenticate, getUserByEmail);

usersRouter.post(
  '/register',
  validateReqBody(createOrEditUserBodySchema),
  authenticate,
  authorize(Permissions.create_user),
  createUser,
);

usersRouter.put(
  '/edit/',
  validateReqQuery(editOrdeleteUserQuerySchema),
  validateReqBody(createOrEditUserBodySchema),
  authenticate,
  authorize(Permissions.edit_user),
  editUser,
);

usersRouter.delete(
  '/delete/',
  validateReqQuery(editOrdeleteUserQuerySchema),
  authenticate,
  authorize(Permissions.delete_user),
  deleteUser,
);
export default usersRouter;
