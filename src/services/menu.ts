import MenuModel from '../models/menu';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IMenu, { ICreateMenuData, IEditMenuData } from '../interfaces/menu';

const logger = loggerWithNameSpace('Menu Service');

export default class MenuServices {
  static async getAllMenus() {
    const menus = await MenuModel.getAllMenus();
    if (!menus) {
      return null;
    }
    logger.info('All Menus Found');
    return menus;
  }
  static async getMenu(restaurantID: string) {
    const menu = await MenuModel.getMenu(restaurantID);
    if (!menu) {
      logger.error(`Menu of restaurantID ${restaurantID} not found`);
      return null;
    }
    logger.info(`Menu of restaurantID ${restaurantID} found`);
    return menu;
  }

  static async createMenu(restaurantID: string, menuData: ICreateMenuData) {
    const queryResult = await MenuModel.createMenu(restaurantID, menuData)!;
    if (!queryResult) {
      logger.error('Could not create new menu');
      throw new ModelError('Could not create menu');
    }

    return { ...menuData, id: queryResult.id } as IMenu;
  }

  static async editMenu(menuID: string, editMenuData: IEditMenuData) {
    const queryResult = await MenuModel.editMenu(menuID, editMenuData)!;
    if (!queryResult) {
      logger.error(`Could not edit menu with menuID ${menuID}`);
      throw new ModelError('Could not edit Menu');
    }
    logger.info(`Menu with menuID ${menuID} updated`);

    return {
      ...editMenuData,
      id: menuID,
    } as IMenu;
  }

  static async deleteMenu(menuID: string) {
    const queryResult = await MenuModel.deleteMenu(menuID)!;
    if (!queryResult) {
      logger.error(`Could not delete menu with menuID ${menuID}`);
      throw new ModelError('Could not delete Menu');
    }
    logger.info(`Menu with menuID ${menuID} deleted`);

    return true;
  }
}
