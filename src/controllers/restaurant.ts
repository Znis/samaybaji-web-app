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

export async function getRestaurant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userID = req.query.userID as string;
    const restaurant = await RestaurantService.getRestaurant(userID);
    if (!restaurant) {
      logger.error(`No restaurant found for userID ${userID}`);
      next(new BaseError('No Restaurant Found'));
      return;
    }
    logger.info(`Restaurant for userID ${userID} found`);
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
    const userID = req.query.userID as string;
    const response = await RestaurantService.createRestaurant(
      userID,
      restaurantData,
    );
    logger.info(`New restaurant for userID ${userID} created`);
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
    const restaurantID = req.query.restaurantID as string;
    const restaurantData = req.body;
    const response = await RestaurantService.editRestaurant(
      restaurantID,
      restaurantData,
    );
    logger.info(`Restaurant of restaurantID ${restaurantID} edited`);
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
    const restaurantID = req.query.restaurantID as string;
    await RestaurantService.deleteRestaurant(restaurantID);
    logger.info(`Restaurant of restaurantID ${restaurantID} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Restaurant deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
