import MenuItemModel from '../models/menuItem';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IMenuItem, {
  ICreateMenuItem,
  IEditMenuItem,
} from '../interfaces/menuItem';
import OrderItemService from './orderItem';

const logger = loggerWithNameSpace('Menu Item Service');

export default class MenuItemService {
  static async getAllMenuItems() {
    const menuItems = await MenuItemModel.getAllMenuItems();
    if (!menuItems) {
      return null;
    }
    logger.info('All Menu Items Found');
    return menuItems;
  }

  static async getMenuItem(menuItemId: string) {
    const menuItem = await MenuItemModel.getMenuItem(menuItemId);
    if (!menuItem) {
      logger.error(`Menu item with menuItemId ${menuItemId} not found`);
      return null;
    }
    logger.info(`Menu item with menuItemId ${menuItemId} found`);
    return menuItem;
  }

  static async getMenuItemsByMenuId(menuId: string) {
    const menuItems = await MenuItemModel.getMenuItemsByMenuId(menuId);
    if (!menuItems) {
      logger.error(`Menu items of menuId ${menuId} not found`);
      return null;
    }
    logger.info(`Menu items of menuId ${menuId} found`);
    return menuItems;
  }

  static async getPopularMenuItems() {
    const popularMenuItems = await MenuItemModel.getPopularMenuItems();
    if (!popularMenuItems) {
      logger.error(`No any popular menu items found`);
      return null;
    }
    logger.info(`Popular menu items found`);
    return popularMenuItems;
  }
  static async createMenuItem(menuId: string, menuItemData: ICreateMenuItem) {
    const queryResult = await MenuItemModel.createMenuItem(
      menuId,
      menuItemData,
    )!;
    if (!queryResult) {
      logger.error('Could not create new menu item');
      throw new ModelError('Could not create menu item');
    }

    return { ...menuItemData, id: queryResult.id } as IMenuItem;
  }

  static async editMenuItem(
    menuItemId: string,
    editMenuItemData: IEditMenuItem,
  ) {
    const queryResult = await MenuItemModel.editMenuItem(
      menuItemId,
      editMenuItemData,
    )!;
    if (!queryResult) {
      logger.error(`Could not edit menu item with menuItemId ${menuItemId}`);
      throw new ModelError('Could not edit Menu item');
    }
    logger.info(`Menu item with menuItemId ${menuItemId} updated`);

    return {
      ...editMenuItemData,
      id: menuItemId,
    } as IMenuItem;
  }

  static async deleteMenuItem(menuItemId: string) {
    const activeOrderItems =
      await OrderItemService.getActiveOrderItemsByMenuItemId(menuItemId);
    if (activeOrderItems!.length) {
      logger.error(
        `Could not delete menu item with menuItemId ${menuItemId} because it has active order items`,
      );
      throw new ModelError(
        'Could not delete Menu item due to active order items',
      );
    }
    const queryResult = await MenuItemModel.deleteMenuItem(menuItemId)!;
    if (!queryResult) {
      logger.error(`Could not delete menu item with menuItemId ${menuItemId}`);
      throw new ModelError('Could not delete Menu item');
    }
    logger.info(`Menu item with menuItemId ${menuItemId} deleted`);

    return true;
  }
}
