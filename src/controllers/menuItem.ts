import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import MenuItemService from '../services/menuItem';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Menu Item Controller');

/**
 * Controller function to retrieve all menu items from the MenuItemService and sends them as a JSON response.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the menu items are retrieved and sent as a response.
 */
export async function getAllMenuItems(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItems = await MenuItemService.getAllMenuItems();
    if (!menuItems) {
      next(new BaseError('No Any Menu Item Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(menuItems);
  } catch (error) {
    logger.error('Menu Item fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to retrieve the popular menu items and their image sources using MinioService.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the popular menu items are retrieved and sent as a response.
 */
export async function getPopularMenuItems(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const popularMenuItems = await MenuItemService.getPopularMenuItems();
    if (!popularMenuItems) {
      next(new BaseError('Popular Menu Item not Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(popularMenuItems);
  } catch (error) {
    logger.error('Popular menu Item fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}

/**
 * Controller function to retrieve a menu item by its ID from the MenuItemService and sends it as a JSON response.
 *
 * @param {Request} req - The request object containing the menuItemId parameter.
 * @param {Response} res - The response object used to send the menu item data.
 * @param {NextFunction} next - The next function to be called if an error occurs.
 * @return {Promise<void>} A promise that resolves when the menu item is retrieved and sent as a response.
 * @throws {BaseError} If no menu item is found for the given menuItemId.
 */
export async function getMenuItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemId = req.query.menuItemId as string;
    const menuItem = await MenuItemService.getMenuItem(menuItemId);
    if (!menuItem) {
      next(new BaseError('No Menu Item Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(menuItem);
  } catch (error) {
    logger.error('Menu item fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}
/**
 * Controller function to retrieve menu items by their menu ID from the MenuItemService and sends them as a JSON response.
 *
 * @param {Request} req - The request object containing the menuId parameter.
 * @param {Response} res - The response object used to send the menu items data.
 * @param {NextFunction} next - The next function to be called if an error occurs.
 * @return {Promise<void>} A promise that resolves when the menu items are retrieved and sent as a response.
 * @throws {BaseError} If no menu items are found for the given menuId.
 */
export async function getMenuItemsByMenuId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuId = req.query.menuId as string;
    const menuItems = await MenuItemService.getMenuItemsByMenuId(menuId);
    if (!menuItems) {
      next(new BaseError('No menu items Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(menuItems);
  } catch (error) {
    logger.error('Menu items fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

/**
 * Controller function to create a new menu item based on the provided data and menu ID.
 *
 * @param {Request} req - The request object containing the menu item data and menu ID.
 * @param {Response} res - The response object used to send the created menu item data.
 * @param {NextFunction} next - The next function to be called if an error occurs.
 * @return {Promise<void>} A promise that resolves when the menu item is created and sent as a response.
 */
export async function createMenuItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemData = req.body;
    const menuId = req.query.menuId as string;
    const response = await MenuItemService.createMenuItem(menuId, menuItemData);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Menu item creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to edit a menu item by its ID with the provided data.
 *
 * @param {Request} req - The request object containing the menuItemId parameter and the menuItemData in the body.
 * @param {Response} res - The response object used to send the edited menu item data.
 * @param {NextFunction} next - The next function to be called if an error occurs.
 * @return {Promise<void>} A promise that resolves when the menu item is edited and sent as a response.
 * @throws {BaseError} If the menu item edit fails.
 */
export async function editMenuItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemId = req.params.menuItemId as string;
    const menuItemData = req.body;
    const response = await MenuItemService.editMenuItem(
      menuItemId,
      menuItemData,
    );
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Menu item edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to delete a menu item by its ID.
 *
 * @param {Request} req - The request object containing the menuItemId parameter.
 * @param {Response} res - The response object used to send the success message.
 * @param {NextFunction} next - The next function to be called if an error occurs.
 * @return {Promise<void>} A promise that resolves when the menu item is deleted.
 */
export async function deleteMenuItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemId = req.params.menuItemId as string;
    await MenuItemService.deleteMenuItem(menuItemId);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Menu item deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
