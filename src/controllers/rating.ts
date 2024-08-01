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
export async function getRatingsByUserId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.query.userId as string;

    const ratings = await RatingService.getRatingsByUserId(userId);
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
export async function getSpecificRatingByUserId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.query.userId as string;
    const targetId = req.query.targetId as string;
    const targetType = req.query.targetType as ReviewTargetType;

    const rating = await RatingService.getSpecificRatingByUserId(
      userId,
      targetType,
      targetId,
    );
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
export async function getRatings(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const targetType = req.query.targetType as ReviewTargetType;
    const targetId = req.query.targetId as string;
    const rating = await RatingService.getRatings(targetType, targetId);
    if (!rating) {
      logger.error(`No Rating found for ${targetType} with Id ${targetId}`);
      next(new BaseError('No Rating Found'));
      return;
    }
    logger.info(`Rating for ${targetType} with Id ${targetId} found`);
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
    const ratingId = req.query.ratingId as string;
    const ratingData = req.body;
    const response = await RatingService.editRating(ratingId, ratingData);
    logger.info(`Rating of ratingId ${ratingId} edited`);
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
    const ratingId = req.query.RatingId as string;
    await RatingService.deleteRating(ratingId);
    logger.info(`Rating of ratingId ${ratingId} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Rating deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
