import { ICreateMenu, IEditMenu } from '../interfaces/menu';
import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Menu Model');
export default class MenuModel extends BaseModel {
  /**
   * Retrieves all menus from the database.
   *
   * @return {Promise<any[] | null>} A promise that resolves to an array of menu objects, or null if an error occurred.
   */
  static getAllMenus() {
    return this.queryBuilder()
      .select('*')
      .from('menus')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves a menu from the database based on the provided restaurant ID.
   *
   * @param {string} restaurantId - The ID of the restaurant.
   * @return {Promise<object | null>} A promise that resolves to the menu object or null if an error occurred.
   */
  static getMenu(restaurantId: string) {
    return this.queryBuilder()
      .select('*')
      .from('menus')
      .where('restaurant_id', restaurantId)
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
   * Creates a new menu in the 'menus' table with the provided data.
   *
   * @param {string} restaurantId - The ID of the restaurant.
   * @param {ICreateMenu} menuData - The data of the menu to be created.
   * @return {Promise<number|null>} A promise that resolves to the ID of the created menu or null if there was an error.
   */
  static createMenu(restaurantId: string, menuData: ICreateMenu) {
    return this.queryBuilder()
      .insert({ ...menuData, restaurantId: restaurantId })
      .into('menus')
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
   * Updates a menu in the 'menus' table with the provided menu ID and edit menu data.
   *
   * @param {string} menuId - The ID of the menu to be updated.
   * @param {IEditMenu} editMenuData - The data to update the menu with.
   * @return {Promise<object | null>} A promise that resolves to the updated menu object or null if an error occurred.
   */
  static editMenu(menuId: string, editMenuData: IEditMenu) {
    return this.queryBuilder()
      .update(editMenuData)
      .from('menus')
      .where('id', menuId)
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
   * Deletes a menu from the database based on the provided menu ID.
   *
   * @param {string} menuId - The ID of the menu to be deleted.
   * @return {Promise<any | null>} A promise that resolves to the deleted menu data or null if an error occurred.
   */
  static deleteMenu(menuId: string) {
    return this.queryBuilder()
      .del()
      .from('menus')
      .where('id', menuId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
