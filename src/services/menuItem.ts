import MenuItemModel from '../models/menuItem';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IMenuItem, {
  ICreateMenuItem,
  IEditMenuItem,
} from '../interfaces/menuItem';

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

  static async getMenuItem(menuItemID: string) {
    const menuItem = await MenuItemModel.getMenuItem(menuItemID);
    if (!menuItem) {
      logger.error(`Menu item with menuItemID ${menuItemID} not found`);
      return null;
    }
    logger.info(`Menu item with menuItemID ${menuItemID} found`);
    return menuItem;
  }

  static async getMenuItemsByMenuID(menuID: string) {
    const menuItems = await MenuItemModel.getMenuItemsByMenuID(menuID);
    if (!menuItems) {
      logger.error(`Menu items of menuID ${menuID} not found`);
      return null;
    }
    logger.info(`Menu items of menuID ${menuID} found`);
    return menuItems;
  }

  static async createMenuItem(menuID: string, menuItemData: ICreateMenuItem) {
    const queryResult = await MenuItemModel.createMenuItem(
      menuID,
      menuItemData,
    )!;
    if (!queryResult) {
      logger.error('Could not create new menu item');
      throw new ModelError('Could not create menu item');
    }

    return { ...menuItemData, id: queryResult.id } as IMenuItem;
  }

  static async editMenuItem(
    menuItemID: string,
    editMenuItemData: IEditMenuItem,
  ) {
    const queryResult = await MenuItemModel.editMenuItem(
      menuItemID,
      editMenuItemData,
    )!;
    if (!queryResult) {
      logger.error(`Could not edit menu item with menuItemID ${menuItemID}`);
      throw new ModelError('Could not edit Menu item');
    }
    logger.info(`Menu item with menuItemID ${menuItemID} updated`);

    return {
      ...editMenuItemData,
      id: menuItemID,
    } as IMenuItem;
  }

  static async deleteMenuItem(menuItemID: string) {
    const queryResult = await MenuItemModel.deleteMenuItem(menuItemID)!;
    if (!queryResult) {
      logger.error(`Could not delete menu item with menuItemID ${menuItemID}`);
      throw new ModelError('Could not delete Menu item');
    }
    logger.info(`Menu item with menuItemID ${menuItemID} deleted`);

    return true;
  }
}
