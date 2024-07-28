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
    const menuItemID = req.query.menuItemID as string;
    const dish = await DishService.getDish(menuItemID);
    if (!dish) {
      logger.error(`No dish found for menuItemID ${menuItemID}`);
      next(new BaseError('No dish Found'));
      return;
    }
    logger.info(`Dish for menuItemID ${menuItemID} found`);
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
    const menuItemID = req.query.menuItemID as string;
    const response = await DishService.createDish(menuItemID, dishData);
    logger.info(`New dish for menuItemID ${menuItemID} created`);
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
    const dishID = req.query.dishID as string;
    const dishData = req.body;
    const response = await DishService.editDish(dishID, dishData);
    logger.info(`Dish of dishID ${dishID} edited`);
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
    const dishID = req.query.dishID as string;
    await DishService.deleteDish(dishID);
    logger.info(`dish of dishID ${dishID} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('dish deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
