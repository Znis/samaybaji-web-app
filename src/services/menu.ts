import MenuModel from '../models/menu';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IMenu, { ICreateMenu, IEditMenu } from '../interfaces/menu';
import MenuItemServices from './menuItem';

const logger = loggerWithNameSpace('Menu Service');

export default class MenuService {
  static async getAllMenus() {
    const menus = await MenuModel.getAllMenus();
    if (!menus) {
      return null;
    }
    const menuWithmenuItems = await Promise.all(
      menus.map(async (menu) => {
        const menuItems = await MenuItemServices.getMenuItemsByMenuId(menu.id);
        return { ...menu, menuItems: menuItems };
      }),
    );
    logger.info('All Menus Found');
    return menuWithmenuItems;
  }
  static async getMenu(restaurantId: string) {
    const menu = await MenuModel.getMenu(restaurantId);
    if (!menu) {
      logger.error(`Menu of restaurantId ${restaurantId} not found`);
      return null;
    }
    logger.info(`Menu of restaurantId ${restaurantId} found`);
    return menu;
  }
  static async getMenuItems(restaurantId: string) {
    const menu = await MenuModel.getMenu(restaurantId);
    if (!menu) {
      logger.error(`Menu of restaurantId ${restaurantId} not found`);
      return null;
    }
    const menuItems = await MenuItemServices.getMenuItemsByMenuId(menu.id);
    logger.info(`Menu of restaurantId ${restaurantId} found`);
    return menuItems;
  }

  static async createMenu(restaurantId: string, menuData: ICreateMenu) {
    const queryResult = await MenuModel.createMenu(restaurantId, menuData)!;
    if (!queryResult) {
      logger.error('Could not create new menu');
      throw new ModelError('Could not create menu');
    }

    return { ...menuData, id: queryResult.id } as IMenu;
  }

  static async editMenu(menuId: string, editMenuData: IEditMenu) {
    const queryResult = await MenuModel.editMenu(menuId, editMenuData)!;
    if (!queryResult) {
      logger.error(`Could not edit menu with menuId ${menuId}`);
      throw new ModelError('Could not edit Menu');
    }
    logger.info(`Menu with menuId ${menuId} updated`);

    return {
      ...editMenuData,
      id: menuId,
    } as IMenu;
  }

  static async deleteMenu(menuId: string) {
    const queryResult = await MenuModel.deleteMenu(menuId)!;
    if (!queryResult) {
      logger.error(`Could not delete menu with menuId ${menuId}`);
      throw new ModelError('Could not delete Menu');
    }
    logger.info(`Menu with menuId ${menuId} deleted`);

    return true;
  }
}
