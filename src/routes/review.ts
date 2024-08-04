import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqParams } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createReview,
  deleteReview,
  editReview,
  getAllReviews,
  getReviewsByTargetId,
  getReviewsByUserId,
} from '../controllers/review';
import {
  createReviewBodySchema,
  editReviewBodySchema,
  reviewCRParamsSchema,
  reviewUDParamsSchema,
} from '../schema/review';

const reviewRouter = express();

//Route for Admin Only
reviewRouter.get(
  '/all',
  authenticate,
  authorize(Permissions.VIEW_All_REVIEW),
  authorizeCRUD,
  getAllReviews,
);

//Routes for Authenticated User
reviewRouter.get(
  '/user',
  authenticate,
  authorize(Permissions.VIEW_REVIEW),
  authorizeCRUD,
  getReviewsByUserId,
);

// Route for Everyone
reviewRouter.get(
  '/:targetId',
  validateReqParams(reviewCRParamsSchema),
  getReviewsByTargetId,
);

reviewRouter.post(
  '/:targetId',
  validateReqParams(reviewCRParamsSchema),
  validateReqBody(createReviewBodySchema),
  authenticate,
  authorize(Permissions.ADD_REVIEW),
  authorizeCRUD,
  createReview,
);

reviewRouter.patch(
  '/:reviewId',
  validateReqParams(reviewUDParamsSchema),
  validateReqBody(editReviewBodySchema),
  authenticate,
  authorize(Permissions.EDIT_REVIEW),
  authorizeCRUD,
  editReview,
);

reviewRouter.delete(
  '/:reviewId',
  validateReqParams(reviewUDParamsSchema),
  authenticate,
  authorize(Permissions.DELETE_MENU_ITEM),
  authorizeCRUD,
  deleteReview,
);
export default reviewRouter;
