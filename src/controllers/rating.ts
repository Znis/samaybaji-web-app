import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import RatingService from '../services/rating';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';
import { ReviewTargetType } from '../enums/review';

const logger = loggerWithNameSpace('Rating Controller');

export async function getAllRatings(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ratings = await RatingService.getAllRatings();
    if (!ratings) {
      next(new BaseError('No Any Ratings Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(ratings);
  } catch (error) {
    logger.error('Rating fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function getRatingsByUserID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userID = req.query.userID as string;
    const targetType = req.query.targetType as ReviewTargetType;

    const ratings = await RatingService.getRatingsByUserID(userID, targetType);
    if (!ratings) {
      next(new BaseError('No Any Ratings Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(ratings);
  } catch (error) {
    logger.error('Rating fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}

export async function getRating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userID = req.query.userID as string;
    const targetType = req.query.targetType as ReviewTargetType;
    const targetID = req.query.targetID as string;
    const rating = await RatingService.getRating(userID, targetType, targetID);
    if (!rating) {
      logger.error(`No Rating found for ${targetType} with ID ${targetID}`);
      next(new BaseError('No Rating Found'));
      return;
    }
    logger.info(`Rating for ${targetType} with ID ${targetID} found`);
    return res.status(HttpStatusCode.OK).json(rating);
  } catch (error) {
    logger.error('Rating fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

export async function createRating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ratingData = req.body;
    const response = await RatingService.createRating(ratingData);
    logger.info(`New Rating for ${ratingData.targetType} created`);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Rating creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function editRating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ratingID = req.query.ratingID as string;
    const ratingData = req.body;
    const response = await RatingService.editRating(ratingID, ratingData);
    logger.info(`Rating of ratingID ${ratingID} edited`);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Rating edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function deleteRating(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ratingID = req.query.RatingID as string;
    await RatingService.deleteRating(ratingID);
    logger.info(`Rating of ratingID ${ratingID} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Rating deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
