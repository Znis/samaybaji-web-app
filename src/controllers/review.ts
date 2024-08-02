import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import ReviewService from '../services/review';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Review Controller');

export async function getAllReviews(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const reviews = await ReviewService.getAllReviews();
    if (!reviews) {
      next(new BaseError('No Any Reviews Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(reviews);
  } catch (error) {
    logger.error('Review fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function getReviewsByUserId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.query.userId as string;
    const reviews = await ReviewService.getReviewsByUserId(userId);
    if (!reviews) {
      next(new BaseError('No Any Reviews Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(reviews);
  } catch (error) {
    logger.error('Review fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}

export async function getReviewsByTargetId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const targetId = req.params.targetId as string;

    const review = await ReviewService.getReviewsByTargetId(targetId);
    if (!review) {
      logger.error(`No Review found with Id ${targetId}`);
      next(new BaseError('No Review Found'));
      return;
    }
    logger.info(`Reviews for Id ${targetId} found`);
    return res.status(HttpStatusCode.OK).json(review);
  } catch (error) {
    logger.error('Review fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

export async function createReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const targetId = req.params.targetId as string;
    const userId = req.query.userId as string;
    const reviewData = req.body;
    const response = await ReviewService.createReview(
      reviewData,
      targetId,
      userId,
    );
    logger.info(`New Review for ${reviewData.targetType} created`);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Review creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function editReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const reviewId = req.params.reviewId as string;
    const reviewData = req.body;
    const response = await ReviewService.editReview(reviewId, reviewData);
    logger.info(`Review of reviewId ${reviewId} edited`);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Review edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function deleteReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const reviewId = req.params.reviewId as string;
    await ReviewService.deleteReview(reviewId);
    logger.info(`Review of reviewId ${reviewId} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Review deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
