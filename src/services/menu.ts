import MenuModel from '../models/menu';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IMenu, { ICreateMenu, IEditMenu } from '../interfaces/menu';
import MenuItemServices from './menuItem';

const logger = loggerWithNameSpace('Menu Service');

export default class MenuService {
  /**
   * Retrieves all menus with their corresponding menu items.
   *
   * @return {Promise<Array<IMenu> | null>} An array of menus with their menu items, or null if no menus are found.
   */
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
  /**
   * Retrieves the menu for a specific restaurant.
   *
   * @param {string} restaurantId - The ID of the restaurant.
   * @return {Promise<IMenu | null>} The menu for the restaurant, or null if not found.
   */
  static async getMenu(restaurantId: string) {
    const menu = await MenuModel.getMenu(restaurantId);
    if (!menu) {
      logger.error(`Menu of restaurantId ${restaurantId} not found`);
      return null;
    }
    logger.info(`Menu of restaurantId ${restaurantId} found`);
    return menu;
  }
  /**
   * Retrieves the menu items for a specific restaurant.
   *
   * @param {string} restaurantId - The ID of the restaurant.
   * @return {Promise<Array<IMenuItems> | null>} The menu items for the restaurant, or null if not found.
   */
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

  /**
   * Creates a new menu in the database with the provided restaurant ID and menu data.
   *
   * @param {string} restaurantId - The ID of the restaurant.
   * @param {ICreateMenu} menuData - The data of the new menu.
   * @return {Promise<IMenu>} A promise that resolves to the newly created menu with its ID.
   * @throws {ModelError} If the menu could not be created in the database.
   */
  static async createMenu(restaurantId: string, menuData: ICreateMenu) {
    const queryResult = await MenuModel.createMenu(restaurantId, menuData)!;
    if (!queryResult) {
      logger.error('Could not create new menu');
      throw new ModelError('Could not create menu');
    }

    return { ...menuData, id: queryResult.id } as IMenu;
  }

  /**
   * Edits a menu in the database with the provided menu ID and updated data.
   *
   * @param {string} menuId - The ID of the menu to be edited.
   * @param {IEditMenu} editMenuData - The updated data for the menu.
   * @return {Promise<IMenu>} A promise that resolves to the edited menu with its ID.
   * @throws {ModelError} If the menu could not be edited in the database.
   */
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

  /**
   * Deletes a menu from the database based on the provided menu ID.
   *
   * @param {string} menuId - The ID of the menu to be deleted.
   * @return {boolean} A boolean indicating whether the menu was successfully deleted.
   */
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
