import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import MenuService from '../services/menu';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Menu Controller');

/**
 * Controller to retrieve all menus from the MenuService.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} A promise that resolves when the menus are retrieved.
 */
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

/**
 * Controller to retrieve the menu items for a specific restaurant.
 *
 * @param {Request} req - The request object containing the restaurantId query parameter.
 * @param {Response} res - The response object used to send the menu items.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the menu items are retrieved and sent.
 */
export async function getMenuItems(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantId = req.query.restaurantId as string;
    const menuItems = await MenuService.getMenuItems(restaurantId);
    if (!menuItems) {
      next(new BaseError('No menu Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(menuItems);
  } catch (error) {
    logger.error('Menu fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

/**
 * Controller function to create a new menu for a given restaurant.
 *
 * @param {Request} req - The request object containing the menu data and restaurantId query parameter.
 * @param {Response} res - The response object used to send the created menu data.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the menu is created and sent as a response.
 */
export async function createMenu(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuData = req.body;
    const restaurantId = req.query.restaurantId as string;
    const response = await MenuService.createMenu(restaurantId, menuData);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Menu creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to edit a menu in the database with the provided menu ID and updated data.
 *
 * @param {Request} req - The request object containing the menu ID and updated menu data.
 * @param {Response} res - The response object used to send the edited menu data.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the menu is edited and sent as a response.
 */
export async function editMenu(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuId = req.query.menuId as string;
    const menuData = req.body;
    const response = await MenuService.editMenu(menuId, menuData);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Menu edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to delete a menu from the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} A promise that resolves when the menu is deleted.
 */
export async function deleteMenu(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuId = req.query.menuId as string;
    await MenuService.deleteMenu(menuId);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Menu deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
