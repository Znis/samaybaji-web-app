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
    const menuItemID = req.query.menuItemID as string;
    const menuItem = await MenuItemService.getMenuItem(menuItemID);
    if (!menuItem) {
      logger.error(`No Menu Item found of menuItemID ${menuItemID}`);
      next(new BaseError('No Menu Item Found'));
      return;
    }
    logger.info(`Menu Item of menuItemID ${menuItemID} found`);
    return res.status(HttpStatusCode.OK).json(menuItem);
  } catch (error) {
    logger.error('Menu item fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}
export async function getMenuItemsByMenuID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuID = req.query.menuID as string;
    const menuItems = await MenuItemService.getMenuItemsByMenuID(menuID);
    if (!menuItems) {
      logger.error(`No menu items found for menuID ${menuID}`);
      next(new BaseError('No menu items Found'));
      return;
    }
    logger.info(`Menu Items of menuID ${menuID} found`);
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
    const menuID = req.query.menuID as string;
    const response = await MenuItemService.createMenuItem(menuID, menuItemData);
    logger.info(`New menu item for menuID ${menuID} created`);
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
    const menuItemID = req.query.menuItemID as string;
    const menuItemData = req.body;
    const response = await MenuItemService.editMenuItem(
      menuItemID,
      menuItemData,
    );
    logger.info(`Menu item with menuItemID ${menuItemID} edited`);
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
    const menuItemID = req.query.menuItemD as string;
    await MenuItemService.deleteMenuItem(menuItemID);
    logger.info(`Menu item with menuItemID ${menuItemID} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Menu item deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
