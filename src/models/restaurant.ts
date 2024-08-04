import { ICreateRestaurant, IEditRestaurant } from '../interfaces/restaurant';
import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Restaurant Model');
export default class RestaurantModel extends BaseModel {
  /**
   * Retrieves all restaurants from the database.
   *
   * @return {Promise<Array<Object> | null>} A Promise that resolves to an array of restaurant objects, or null if an error occurs.
   */
  static getAllRestaurants() {
    return this.queryBuilder()
      .select('*')
      .from('restaurants')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves a restaurant from the database based on the provided user ID.
   *
   * @param {string} userId - The ID of the user associated with the restaurant.
   * @return {Promise<Object | null>} A promise that resolves to the restaurant object if found, or null if an error occurs.
   */
  static getRestaurant(userId: string) {
    return this.queryBuilder()
      .select('restaurants.*')
      .from('restaurants')
      .join('users', 'restaurants.user_id', 'users.id')
      .where('users.id', userId)
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
   * Retrieves a restaurant's information from the database based on the provided restaurant ID.
   *
   * @param {string} restaurantId - The ID of the restaurant to retrieve information for.
   * @return {Promise<Object | null>} A promise that resolves to the restaurant's information if found, or null if an error occurs.
   */
  static getRestaurantInfo(restaurantId: string) {
    return this.queryBuilder()
      .select('*')
      .from('restaurants')
      .where('id', restaurantId)
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
   * Create a new restaurant entry in the database.
   *
   * @param {string} userId - The ID of the user creating the restaurant.
   * @param {ICreateRestaurant} restaurant - The restaurant object to be created.
   * @return {Promise<any>} A promise that resolves to the ID of the newly created restaurant.
   */
  static createRestaurant(userId: string, restaurant: ICreateRestaurant) {
    return this.queryBuilder()
      .insert({ ...restaurant, userId: userId })
      .into('restaurants')
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
   * Updates a restaurant entry in the database with the given ID using the provided data.
   *
   * @param {string} restaurantId - The ID of the restaurant to update.
   * @param {IEditRestaurant} editRestaurantData - The data to update the restaurant with.
   * @return {Promise<Object | null>} A promise that resolves to the updated restaurant object if successful, or null if an error occurs.
   */
  static editRestaurant(
    restaurantId: string,
    editRestaurantData: IEditRestaurant,
  ) {
    return this.queryBuilder()
      .update(editRestaurantData)
      .from('restaurants')
      .where('id', restaurantId)
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
   * Deletes a restaurant entry from the database based on the provided ID.
   *
   * @param {string} restaurantId - The ID of the restaurant to delete.
   * @return {Promise<Object | null>} A promise that resolves to the deleted restaurant object if successful, or null if an error occurs.
   */
  static deleteRestaurant(restaurantId: string) {
    return this.queryBuilder()
      .del()
      .from('restaurants')
      .where('id', restaurantId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
