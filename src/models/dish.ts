import { ICreateDish, IEditDish } from '../interfaces/dish';
import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Dish Model');
export default class DishModel extends BaseModel {
  /**
   * Retrieves all dishes from the 'dishes' table.
   *
   * @return {Promise<any>} A promise that resolves to an array of dishes or null if there was an error.
   */
  static getAllDishes() {
    return this.queryBuilder()
      .select('*')
      .from('dishes')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves a dish from the 'dishes' table based on the provided menu item ID.
   *
   * @param {string} menuItemId - The ID of the menu item to search for.
   * @return {Promise<any>} A promise that resolves to the dish data or null if there was an error.
   */
  static getDishByMenuItemId(menuItemId: string) {
    return this.queryBuilder()
      .select('*')
      .from('dishes')
      .where('menu_item_id', menuItemId)
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
   * Retrieves a dish from the 'dishes' table based on the provided dish ID.
   *
   * @param {string} dishId - The ID of the dish to retrieve.
   * @return {Promise<any>} A promise that resolves to the dish data or null if there was an error.
   */
  static getDish(dishId: string) {
    return this.queryBuilder()
      .select('*')
      .from('dishes')
      .where('id', dishId)
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
   * Creates a new dish in the 'dishes' table with the provided data.
   *
   * @param {string} menuItemId - The ID of the menu item.
   * @param {string} restaurantId - The ID of the restaurant.
   * @param {string} menuId - The ID of the menu.
   * @param {ICreateDish} dishData - The data of the dish to be created.
   * @return {Promise<number|null>} A promise that resolves to the ID of the created dish or null if there was an error.
   */
  static createDish(
    menuItemId: string,
    restaurantId: string,
    menuId: string,
    dishData: ICreateDish,
  ) {
    return this.queryBuilder()
      .insert({
        ...dishData,
        menuItemId: menuItemId,
        restaurantId: restaurantId,
        menuId: menuId,
      })
      .into('dishes')
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
   * Updates a dish in the 'dishes' table with the provided data.
   *
   * @param {string} dishId - The ID of the dish to be updated.
   * @param {IEditDish} editDishData - The data to update the dish with.
   * @return {Promise<any|null>} A promise that resolves to the updated dish data or null if there was an error.
   */
  static editDish(dishId: string, editDishData: IEditDish) {
    return this.queryBuilder()
      .update(editDishData)
      .from('dishes')
      .where('id', dishId)
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
   * Deletes a dish from the 'dishes' table.
   *
   * @param {string} dishId - The ID of the dish to be deleted.
   * @return {Promise<any|null>} A promise that resolves to the deleted dish data or null if there was an error.
   */
  static deleteDish(dishId: string) {
    return this.queryBuilder()
      .del()
      .from('dishes')
      .where('id', dishId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
