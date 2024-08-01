import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import RestaurantService from '../services/restaurant';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Restaurant Controller');

export async function getAllRestaurants(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurants = await RestaurantService.getAllRestaurants();
    if (!restaurants) {
      next(new BaseError('No Any Restaurant Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(restaurants);
  } catch (error) {
    logger.error('Restaurant fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function getRestaurantInfo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantId = req.params.restaurantId as string;
    const restaurant = await RestaurantService.getRestaurantInfo(restaurantId);
    if (!restaurant) {
      logger.error(`No restaurant found for restaurantId ${restaurantId}`);
      next(new BaseError('No Restaurant Found'));
      return;
    }
    logger.info(`Restaurant for restaurantId ${restaurantId} found`);
    return res.status(HttpStatusCode.OK).json(restaurant);
  } catch (error) {
    logger.error('Restaurant fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}
export async function getRestaurant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.query.userId as string;
    const restaurant = await RestaurantService.getRestaurant(userId);
    if (!restaurant) {
      logger.error(`No restaurant found for userId ${userId}`);
      next(new BaseError('No Restaurant Found'));
      return;
    }
    logger.info(`Restaurant for userId ${userId} found`);
    return res.status(HttpStatusCode.OK).json(restaurant);
  } catch (error) {
    logger.error('Restaurant fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

export async function createRestaurant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantData = req.body;
    const userId = req.query.userId as string;
    const response = await RestaurantService.createRestaurant(
      userId,
      restaurantData,
    );
    logger.info(`New restaurant for userId ${userId} created`);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Restaurant creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function editRestaurant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantId = req.query.restaurantId as string;
    const restaurantData = req.body;
    const response = await RestaurantService.editRestaurant(
      restaurantId,
      restaurantData,
    );
    logger.info(`Restaurant of restaurantId ${restaurantId} edited`);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Restaurant edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function deleteRestaurant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantId = req.query.restaurantId as string;
    await RestaurantService.deleteRestaurant(restaurantId);
    logger.info(`Restaurant of restaurantId ${restaurantId} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Restaurant deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
