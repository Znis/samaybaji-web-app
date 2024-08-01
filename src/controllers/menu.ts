import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import MenuService from '../services/menu';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Menu Controller');

export async function getAllMenus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menus = await MenuService.getAllMenus();
    if (!menus) {
      next(new BaseError('No Any Menus Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(menus);
  } catch (error) {
    logger.error('Menu fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}

export async function getMenuItems(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantId = req.query.restaurantId as string;
    const menuItems = await MenuService.getMenuItems(restaurantId);
    if (!menuItems) {
      logger.error(`No menu items found of restaurantId ${restaurantId}`);
      next(new BaseError('No menu Found'));
      return;
    }
    logger.info(`Menu items of restaurantId ${restaurantId} found`);
    return res.status(HttpStatusCode.OK).json(menuItems);
  } catch (error) {
    logger.error('Menu fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

export async function createMenu(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuData = req.body;
    const restaurantId = req.query.restaurantId as string;
    const response = await MenuService.createMenu(restaurantId, menuData);
    logger.info(`New menu for restaurantId ${restaurantId} created`);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Menu creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function editMenu(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuId = req.query.menuId as string;
    const menuData = req.body;
    const response = await MenuService.editMenu(menuId, menuData);
    logger.info(`Menu with menuId ${menuId} edited`);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Menu edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function deleteMenu(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuId = req.query.menuId as string;
    await MenuService.deleteMenu(menuId);
    logger.info(`Menu with menuId ${menuId} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Menu deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
