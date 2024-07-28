import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqQuery } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createReview,
  deleteReview,
  editReview,
  getAllReviews,
  getReview,
  getReviewsByUserID,
} from '../controllers/review';
import {
  createOrEditReviewBodySchema,
  getReviewByTargetIDQuerySchema,
  getReviewQuerySchema,
} from '../schema/review';
import { createOrEditOrDeleteReviewQuerySchema } from '../schema/review';

const reviewRouter = express();

//for admin only
reviewRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_All_REVIEW),
  getAllReviews,
);

reviewRouter.get(
  '/:userID',
  authenticate,
  authorize(Permissions.VIEW_All_REVIEW),
  validateReqQuery(getReviewQuerySchema),
  getReviewsByUserID,
);

reviewRouter.get(
  '/:targetID',
  authenticate,
  authorize(Permissions.VIEW_REVIEW),
  validateReqQuery(getReviewByTargetIDQuerySchema),
  getReview,
);

reviewRouter.post(
  '/create',
  validateReqQuery(createOrEditOrDeleteReviewQuerySchema),
  validateReqBody(createOrEditReviewBodySchema),
  authenticate,
  authorize(Permissions.ADD_REVIEW),
  authorizeCRUD,
  createReview,
);

reviewRouter.patch(
  '/edit/',
  validateReqQuery(createOrEditOrDeleteReviewQuerySchema),
  validateReqBody(createOrEditReviewBodySchema),
  authenticate,
  authorize(Permissions.EDIT_REVIEW),
  authorizeCRUD,
  editReview,
);

reviewRouter.delete(
  '/delete',
  validateReqQuery(createOrEditOrDeleteReviewQuerySchema),
  authenticate,
  authorize(Permissions.DELETE_MENU_ITEM),
  authorizeCRUD,
  deleteReview,
);
export default reviewRouter;
