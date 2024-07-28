import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import ReviewService from '../services/review';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';
import { ReviewTargetType } from '../enums/review';

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
export async function getReviewsByUserID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userID = req.query.userID as string;
    const targetType = req.query.targetType as ReviewTargetType;

    const reviews = await ReviewService.getReviewsByUserID(userID, targetType);
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

export async function getReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userID = req.query.userID as string;
    const targetType = req.query.targetType as ReviewTargetType;
    const targetID = req.query.targetID as string;
    const review = await ReviewService.getReview(userID, targetType, targetID);
    if (!review) {
      logger.error(`No Review found for ${targetType} with ID ${targetID}`);
      next(new BaseError('No Review Found'));
      return;
    }
    logger.info(`Review for ${targetType} with ID ${targetID} found`);
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
    const reviewData = req.body;
    const response = await ReviewService.createReview(reviewData);
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
    const reviewID = req.query.reviewID as string;
    const reviewData = req.body;
    const response = await ReviewService.editReview(reviewID, reviewData);
    logger.info(`Review of reviewID ${reviewID} edited`);
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
    const reviewID = req.query.reviewID as string;
    await ReviewService.deleteReview(reviewID);
    logger.info(`Review of reviewID ${reviewID} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Review deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
