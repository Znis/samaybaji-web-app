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
  getReviews,
  getReviewsByUserID,
  getSpecificReviewByUserID,
} from '../controllers/review';
import {
  createOrEditReviewBodySchema,
  getReviewByTargetIDQuerySchema,
} from '../schema/review';
import { createOrEditOrDeleteReviewQuerySchema } from '../schema/review';

const reviewRouter = express();

//for admin only
reviewRouter.get(
  '/all',
  authenticate,
  authorize(Permissions.VIEW_All_REVIEW),
  authorizeCRUD,
  getAllReviews,
);

reviewRouter.get(
  '/user',
  authenticate,
  authorize(Permissions.VIEW_REVIEW),
  authorizeCRUD,
  getReviewsByUserID,
);
reviewRouter.get(
  '/:targetID',
  authenticate,
  authorize(Permissions.VIEW_REVIEW),
  validateReqQuery(getReviewByTargetIDQuerySchema),
  authorizeCRUD,
  getSpecificReviewByUserID,
);
reviewRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_REVIEW),
  validateReqQuery(getReviewByTargetIDQuerySchema),
  authorizeCRUD,
  getReviews,
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
