import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import DishService from '../services/dish';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Dish Controller');

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

export async function getDish(req: Request, res: Response, next: NextFunction) {
  try {
    const menuItemId = req.query.menuItemId as string;
    const dish = await DishService.getDish(menuItemId);
    if (!dish) {
      logger.error(`No dish found for menuItemId ${menuItemId}`);
      next(new BaseError('No dish Found'));
      return;
    }
    logger.info(`Dish for menuItemId ${menuItemId} found`);
    return res.status(HttpStatusCode.OK).json(dish);
  } catch (error) {
    logger.error('Dish fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

export async function createDish(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dishData = req.body;
    const menuItemId = req.query.menuItemId as string;
    const response = await DishService.createDish(menuItemId, dishData);
    logger.info(`New dish for menuItemId ${menuItemId} created`);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Dish creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function editDish(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dishId = req.query.dishId as string;
    const dishData = req.body;
    const response = await DishService.editDish(dishId, dishData);
    logger.info(`Dish of dishId ${dishId} edited`);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Dish edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function deleteDish(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dishId = req.query.dishId as string;
    await DishService.deleteDish(dishId);
    logger.info(`dish of dishId ${dishId} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('dish deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
