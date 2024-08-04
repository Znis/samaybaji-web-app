import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import ReviewService from '../services/review';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Review Controller');

/**
 * Controller function to retrieve all reviews and returns them in the response.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @return {Promise<void>} A promise that resolves when the response has been sent.
 */
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
/**
 * Controller function to retrieve the reviews made by a user for both dish and restaurant targets.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @return {Promise<void>} A promise that resolves when the response has been sent.
 * @throws {BaseError} If no reviews are found.
 */
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

/**
 * Controller function to retrieve the reviews made for a specific target ID.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @return {Promise<void>} A promise that resolves when the response has been sent.
 * @throws {BaseError} If no review is found.
 */
export async function getReviewsByTargetId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const targetId = req.params.targetId as string;

    const review = await ReviewService.getReviewsByTargetId(targetId);
    if (!review) {
      next(new BaseError('No Review Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(review);
  } catch (error) {
    logger.error('Review fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

/**
 * Controller function to create a new review and returns the created review data.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @return {Promise<void>} A promise that resolves when the response has been sent.
 */
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
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Review creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to edit an existing review based on the provided review ID and review data.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @return {Promise<void>} A promise that resolves when the response has been sent.
 */
export async function editReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const reviewId = req.params.reviewId as string;
    const reviewData = req.body;
    const response = await ReviewService.editReview(reviewId, reviewData);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Review edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to delete a review from the database based on the provided review ID.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @return {Promise<void>} A promise that resolves when the review is successfully deleted.
 * @throws {Error} If an error occurs during the deletion process.
 */
export async function deleteReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const reviewId = req.params.reviewId as string;
    await ReviewService.deleteReview(reviewId);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Review deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
