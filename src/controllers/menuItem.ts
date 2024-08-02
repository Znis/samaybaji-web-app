import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import MenuItemService from '../services/menuItem';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Menu Item Controller');

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

export async function getMenuItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemId = req.query.menuItemId as string;
    const menuItem = await MenuItemService.getMenuItem(menuItemId);
    if (!menuItem) {
      logger.error(`No Menu Item found of menuItemId ${menuItemId}`);
      next(new BaseError('No Menu Item Found'));
      return;
    }
    logger.info(`Menu Item of menuItemId ${menuItemId} found`);
    return res.status(HttpStatusCode.OK).json(menuItem);
  } catch (error) {
    logger.error('Menu item fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}
export async function getMenuItemsByMenuId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuId = req.query.menuId as string;
    const menuItems = await MenuItemService.getMenuItemsByMenuId(menuId);
    if (!menuItems) {
      logger.error(`No menu items found for menuId ${menuId}`);
      next(new BaseError('No menu items Found'));
      return;
    }
    logger.info(`Menu Items of menuId ${menuId} found`);
    return res.status(HttpStatusCode.OK).json(menuItems);
  } catch (error) {
    logger.error('Menu items fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

export async function createMenuItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemData = req.body;
    const menuId = req.query.menuId as string;
    const response = await MenuItemService.createMenuItem(menuId, menuItemData);
    logger.info(`New menu item for menuId ${menuId} created`);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Menu item creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
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
    logger.info(`Menu item with menuItemId ${menuItemId} edited`);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Menu item edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function deleteMenuItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemId = req.params.menuItemD as string;
    await MenuItemService.deleteMenuItem(menuItemId);
    logger.info(`Menu item with menuItemId ${menuItemId} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Menu item deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
