import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqQuery } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createRating,
  deleteRating,
  editRating,
  getAllRatings,
  getRatings,
  getRatingsByUserID,
  getSpecificRatingByUserID,
} from '../controllers/rating';
import {
  createOrEditOrDeleteRatingQuerySchema,
  createOrEditRatingBodySchema,
  getRatingByTargetIDQuerySchema,
  getRatingQuerySchema,
} from '../schema/rating';

const ratingRouter = express();

//for admin only
ratingRouter.get(
  '/all',
  authenticate,
  authorize(Permissions.VIEW_All_REVIEW),
  authorizeCRUD,
  getAllRatings,
);

ratingRouter.get(
  '/user',
  authenticate,
  authorize(Permissions.VIEW_REVIEW),
  validateReqQuery(getRatingQuerySchema),
  authorizeCRUD,
  getRatingsByUserID,
);
ratingRouter.get(
  '/:targetID',
  authenticate,
  authorize(Permissions.VIEW_REVIEW),
  validateReqQuery(getRatingByTargetIDQuerySchema),
  authorizeCRUD,
  getSpecificRatingByUserID,
);
ratingRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_REVIEW),
  validateReqQuery(getRatingByTargetIDQuerySchema),
  authorizeCRUD,
  getRatings,
);

ratingRouter.post(
  '/create',
  validateReqQuery(createOrEditOrDeleteRatingQuerySchema),
  validateReqBody(createOrEditRatingBodySchema),
  authenticate,
  authorize(Permissions.ADD_REVIEW),
  authorizeCRUD,
  createRating,
);

ratingRouter.patch(
  '/edit/',
  validateReqQuery(createOrEditOrDeleteRatingQuerySchema),
  validateReqBody(createOrEditRatingBodySchema),
  authenticate,
  authorize(Permissions.EDIT_REVIEW),
  authorizeCRUD,
  editRating,
);

ratingRouter.delete(
  '/delete',
  validateReqQuery(createOrEditOrDeleteRatingQuerySchema),
  authenticate,
  authorize(Permissions.DELETE_MENU_ITEM),
  authorizeCRUD,
  deleteRating,
);
export default ratingRouter;
