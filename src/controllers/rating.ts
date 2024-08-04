import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import RatingService from '../services/rating';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Rating Controller');

/**
 * Controller function to retrieve a specific rating for a given target and user.
 *
 * @param {Request} req - The request object containing the user ID and target ID.
 * @param {Response} res - The response object to send the rating data.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the rating data is sent in the response.
 */
export async function getSpecificRating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.query.userId as string;
    const targetId = req.params.targetId as string;

    const rating = await RatingService.getSpecificRating(targetId, userId);
    if (!rating) {
      next(new BaseError('No Any Rating Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(rating);
  } catch (error) {
    logger.error('Review fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to retrieve the ratings for a given target ID.
 *
 * @param {Request} req - The request object containing the target ID.
 * @param {Response} res - The response object to send the rating data.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the rating data is sent in the response.
 */
export async function getTargetRatings(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const targetId = req.params.targetId as string;
    const rating = await RatingService.getTargetRatings(targetId);
    if (!rating) {
      logger.error(`No Rating found for Id ${targetId}`);
      next(new BaseError('No Rating Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(rating);
  } catch (error) {
    logger.error('Rating fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

/**
 * Controller function to create a new rating for a target and user.
 *
 * @param {Request} req - The request object containing the target ID and user ID in the query parameters,
 * and the rating data in the request body.
 * @param {Response} res - The response object to send the created rating data.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the rating data is sent in the response.
 */
export async function createRating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const targetId = req.params.targetId as string;
    const userId = req.query.userId as string;
    const ratingData = req.body;
    const response = await RatingService.createRating(
      ratingData,
      targetId,
      userId,
    );
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Rating creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to edit a rating based on the provided ratingId and ratingData.
 *
 * @param {Request} req - The request object containing the ratingId and ratingData.
 * @param {Response} res - The response object to send the edited rating data.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the edited rating data is sent in the response.
 */
export async function editRating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ratingId = req.params.ratingId as string;
    const ratingData = req.body;
    const response = await RatingService.editRating(ratingId, ratingData);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Rating edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to delete a rating based on the provided ratingId.
 *
 * @param {Request} req - The request object containing the ratingId.
 * @param {Response} res - The response object to send the deletion status.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the rating is deleted.
 */
export async function deleteRating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ratingId = req.params.RatingId as string;
    await RatingService.deleteRating(ratingId);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Rating deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
