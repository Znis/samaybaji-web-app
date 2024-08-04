import { ICreateMenuItem, IEditMenuItem } from '../interfaces/menuItem';
import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Menu Item Model');
export default class MenuItemModel extends BaseModel {
  /**
   * Retrieves all menu items from the 'menu_items' table.
   *
   * @return {Promise<any>} A promise that resolves to the retrieved menu items or null if an error occurs.
   */
  static getAllMenuItems() {
    return this.queryBuilder()
      .select('*')
      .from('menu_items')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }

  /**
   * Retrieves all popular menu items from the 'menu_items' table.
   *
   * @return {Promise<any>} A promise that resolves to the retrieved popular menu items or null if an error occurs.
   */
  static getPopularMenuItems() {
    return this.queryBuilder()
      .select('*')
      .from('menu_items')
      .where('is_popular', true)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves a specific menu item from the 'menu_items' table based on the provided menu item ID.
   *
   * @param {string} menuItemId - The ID of the menu item to search for.
   * @return {Promise<any>} A promise that resolves to the menu item data or null if an error occurs.
   */
  static getMenuItem(menuItemId: string) {
    return this.queryBuilder()
      .select('*')
      .from('menu_items')
      .where('id', menuItemId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves all menu items associated with a specific menu ID from the 'menu_items' table.
   *
   * @param {string} menuId - The ID of the menu to search for menu items.
   * @return {Promise<any[] | null>} A promise that resolves to an array of menu item data or null if an error occurs.
   */
  static getMenuItemsByMenuId(menuId: string) {
    return this.queryBuilder()
      .select('*')
      .from('menu_items')
      .where('menu_id', menuId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Creates a new menu item in the 'menu_items' table with the provided menu ID and menu item data.
   *
   * @param {string} menuId - The ID of the menu to associate the new menu item with.
   * @param {ICreateMenuItem} menuItemData - The data of the new menu item.
   * @return {Promise<string | null>} A promise that resolves to the ID of the newly created menu item or null if an error occurs.
   */
  static createMenuItem(menuId: string, menuItemData: ICreateMenuItem) {
    return this.queryBuilder()
      .insert({ ...menuItemData, menuId: menuId })
      .into('menu_items')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }

  /**
   * Updates a menu item with the given ID using the provided data.
   *
   * @param {string} menuItemId - The ID of the menu item to be updated.
   * @param {IEditMenuItem} editMenuItemData - The data to update the menu item with.
   * @return {Promise<IEditMenuItem | null>} A promise that resolves to the updated menu item or null if an error occurs.
   */
  static editMenuItem(menuItemId: string, editMenuItemData: IEditMenuItem) {
    return this.queryBuilder()
      .update(editMenuItemData)
      .from('menu_items')
      .where('id', menuItemId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Deletes a menu item from the 'menu_items' table based on the provided menu item ID.
   *
   * @param {string} menuItemId - The ID of the menu item to be deleted.
   * @return {Promise<number | null>} A promise that resolves to the number of rows deleted or null if an error occurs.
   */
  static deleteMenuItem(menuItemId: string) {
    return this.queryBuilder()
      .del()
      .from('menu_items')
      .where('id', menuItemId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
