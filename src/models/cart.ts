import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Cart Model');
export default class MenuModel extends BaseModel {
  /**
   * Retrieves all carts from the database.
   *
   * @return {Promise<Array<Object>>} A promise that resolves to an array of cart objects.
   */
  static getAllCarts() {
    return this.queryBuilder()
      .select('*')
      .from('carts')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves a cart from the database based on the user ID.
   *
   * @param {string} userId - The ID of the user associated with the cart.
   * @return {Promise<Object | null>} A promise that resolves to the cart object or null if not found.
   */
  static getCart(userId: string) {
    return this.queryBuilder()
      .select('*')
      .from('carts')
      .where('user_id', userId)
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
   * Creates a new cart in the database with the given user ID.
   *
   * @param {string} userId - The ID of the user associated with the cart.
   * @return {Promise<number | null>} A promise that resolves to the ID of the newly created cart or null if an error occurred.
   */
  static createCart(userId: string) {
    return this.queryBuilder()
      .insert({ userId: userId })
      .into('carts')
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
   * Deletes all items from the cart with the given ID.
   *
   * @param {string} cartId - The ID of the cart to clear.
   * @return {Promise<number | null>} A promise that resolves to the number of deleted rows or null if an error occurred.
   */
  static clearCart(cartId: string) {
    return this.queryBuilder()
      .del()
      .from('cart_items')
      .where('cart_id', cartId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
