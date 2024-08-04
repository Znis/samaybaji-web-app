import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import RestaurantService from '../services/restaurant';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Restaurant Controller');

/**
 * Controller function to retrieve all restaurants and sends them as a JSON response.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} JSON response containing all restaurants.
 */
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
/**
 * Controller function to get restaurant information based on the provided restaurantId.
 *
 * @param {Request} req - The request object containing the restaurantId parameter.
 * @param {Response} res - The response object used to send the restaurant information.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves with the restaurant information if found.
 */
export async function getRestaurantInfo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantId = req.params.restaurantId as string;
    const restaurant = await RestaurantService.getRestaurantInfo(restaurantId);
    if (!restaurant) {
      next(new BaseError('No Restaurant Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(restaurant);
  } catch (error) {
    logger.error('Restaurant fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}
/**
 * Controller function to get a restaurant based on the provided userId.
 *
 * @param {Request} req - The request object containing the userId query parameter.
 * @param {Response} res - The response object used to send the restaurant information.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves with the restaurant information if found.
 * @throws {BaseError} If no restaurant is found for the specified userId.
 */
export async function getRestaurant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.query.userId as string;
    const restaurant = await RestaurantService.getRestaurant(userId);
    if (!restaurant) {
      next(new BaseError('No Restaurant Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(restaurant);
  } catch (error) {
    logger.error('Restaurant fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

/**
 * Controller function to create a new restaurant for a user.
 *
 * @param {Request} req - The request object containing the restaurant data and userId.
 * @param {Response} res - The response object used to send the created restaurant data.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the restaurant is created and sent as a response.
 */
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
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Restaurant creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to edit a restaurant in the database with the given ID using the provided data.
 *
 * @param {Request} req - The request object containing the restaurant ID and data to update.
 * @param {Response} res - The response object used to send the edited restaurant data.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the restaurant is edited and sent as a response.
 */
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
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Restaurant edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to delete a restaurant from the database based on the provided restaurantId.
 *
 * @param {Request} req - The request object containing the restaurantId query parameter.
 * @param {Response} res - The response object used to send the deletion status.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the restaurant is deleted.
 */
export async function deleteRestaurant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantId = req.query.restaurantId as string;
    await RestaurantService.deleteRestaurant(restaurantId);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Restaurant deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
