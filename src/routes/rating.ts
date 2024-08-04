import {
  createRatingBodySchema,
  editRatingBodySchema,
  ratingCRParamsSchema,
  ratingUDParamsSchema,
} from './../schema/rating';
import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqParams } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createRating,
  deleteRating,
  editRating,
  getSpecificRating,
  getTargetRatings,
} from '../controllers/rating';

const ratingRouter = express();

//Routes for Authenticated User
ratingRouter.get(
  '/specific-rating/:targetId',
  authenticate,
  validateReqParams(ratingCRParamsSchema),
  authorizeCRUD,
  getSpecificRating,
);

ratingRouter.get(
  '/:targetId',
  validateReqParams(ratingCRParamsSchema),
  getTargetRatings,
);

ratingRouter.post(
  '/:targetId',
  validateReqParams(ratingCRParamsSchema),
  validateReqBody(createRatingBodySchema),
  authenticate,
  authorize(Permissions.ADD_REVIEW),
  authorizeCRUD,
  createRating,
);

ratingRouter.patch(
  '/:ratingId',
  validateReqParams(ratingUDParamsSchema),
  validateReqBody(editRatingBodySchema),
  authenticate,
  authorize(Permissions.EDIT_REVIEW),
  authorizeCRUD,
  editRating,
);

ratingRouter.delete(
  '/:ratingId',
  validateReqParams(ratingUDParamsSchema),
  authenticate,
  authorize(Permissions.DELETE_MENU_ITEM),
  authorizeCRUD,
  deleteRating,
);
export default ratingRouter;
