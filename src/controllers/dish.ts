import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import DishService from '../services/dish';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Dish Controller');

/**
 * Controller function to retrieve all dishes from the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} A promise that resolves when the dishes are retrieved and returned.
 * @throws {BaseError} If no dishes are found.
 */
export async function getAllDishes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dishes = await DishService.getAllDishes();
    if (!dishes) {
      next(new BaseError('No Any dish Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(dishes);
  } catch (error) {
    logger.error('dish fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}

/**
 * Controller function to retrieve a dish based on the provided menu item ID.
 *
 * @param {Request} req - The request object containing the menuItemId parameter.
 * @param {Response} res - The response object used to send the dish data.
 * @param {NextFunction} next - The next function to be called if an error occurs.
 * @return {Promise<void>} A promise that resolves when the dish is retrieved and sent as a response.
 * @throws {BaseError} If no dish is found for the given menuItemId.
 */
export async function getDishByMenuItemId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemId = req.params.menuItemId as string;
    const dish = await DishService.getDishByMenuItemId(menuItemId);
    if (!dish) {
      next(new BaseError('No dish Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(dish);
  } catch (error) {
    logger.error('Dish fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}
/**
 * Controller function to retrieve a dish based on the provided dish ID.
 *
 * @param {Request} req - The request object containing the dish ID.
 * @param {Response} res - The response object used to send the dish data.
 * @param {NextFunction} next - The next function to be called if an error occurs.
 * @return {Promise<void>} A promise that resolves when the dish is retrieved and sent as a response.
 * @throws {BaseError} If no dish is found for the given dish ID.
 */
export async function getDish(req: Request, res: Response, next: NextFunction) {
  try {
    const dishId = req.params.dishId as string;
    const dish = await DishService.getDish(dishId);
    if (!dish) {
      next(new BaseError('No dish Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(dish);
  } catch (error) {
    logger.error('Dish fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

/**
 * Controller function to create a new dish in the database with the provided data.
 *
 * @param {Request} req - The request object containing the dish data and parameters.
 * @param {Response} res - The response object used to send the created dish data.
 * @param {NextFunction} next - The next function to be called if an error occurs.
 * @return {Promise<void>} A promise that resolves when the dish is created and sent as a response.
 */
export async function createDish(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dishData = req.body;
    const menuItemId = req.params.menuItemId as string;
    const restaurantId = req.query.restaurantId as string;
    const menuId = req.query.menuId as string;
    const response = await DishService.createDish(
      menuItemId,
      restaurantId,
      menuId,
      dishData,
    );
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Dish creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to edit a dish in the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} A promise that resolves when the dish is edited and sent as a response.
 * @throws {Error} If the dish edit fails.
 */
export async function editDish(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dishId = req.params.dishId as string;
    const dishData = req.body;
    const response = await DishService.editDish(dishId, dishData);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Dish edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to delete a dish from the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} A promise that resolves when the dish is deleted.
 * @throws {Error} If the dish deletion fails.
 */
export async function deleteDish(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dishId = req.params.dishId as string;
    await DishService.deleteDish(dishId);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('dish deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
