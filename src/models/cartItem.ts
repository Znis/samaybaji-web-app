import { ICreateCartItemData, IEditCartItemData } from '../interfaces/cartItem';
import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Cart Item Model');
export default class CartItemModel extends BaseModel {
  /**
   * Retrieves cart items by cart ID.
   *
   * @param {string} cartId - The ID of the cart.
   * @return {Promise<Array<Object> | null>} A promise that resolves to an array of cart items or null if there was an error.
   */
  static getCartItemsByCartId(cartId: string) {
    return this.queryBuilder()
      .select('*')
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

  /**
   * Inserts cart items into the database for a given cart ID.
   *
   * @param {string} cartId - The ID of the cart.
   * @param {ICreateCartItemData[]} cartItemData - An array of cart item data to be inserted.
   * @return {Promise<any>} A promise that resolves to the inserted data or null if there was an error.
   */
  static createCartItem(cartId: string, cartItemData: ICreateCartItemData[]) {
    return this.queryBuilder()
      .insert(
        cartItemData.map((item) => {
          return {
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            cartId: cartId,
          };
        }),
      )
      .into('cart_items')
      .returning('id')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }

  /**
   * Updates a cart item in the database with the given menu item ID, cart ID, and edit cart item data.
   *
   * @param {string} menuItemId - The ID of the menu item.
   * @param {string} cartId - The ID of the cart.
   * @param {IEditCartItemData} editCartItemData - The data to update the cart item with.
   * @return {Promise<Object | null>} A promise that resolves to the updated cart item or null if there was an error.
   */
  static editCartItem(
    menuItemId: string,
    cartId: string,
    editCartItemData: IEditCartItemData,
  ) {
    return this.queryBuilder()
      .update(editCartItemData)
      .from('cart_items')
      .where('menu_item_id', menuItemId)
      .andWhere('cart_id', cartId)
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
   * Deletes a cart item from the database.
   *
   * @param {string} menuItemId - The ID of the menu item.
   * @param {string} cartId - The ID of the cart.
   * @return {Promise<any>} A promise that resolves to the deleted data or null if there was an error.
   */
  static deleteCartItem(menuItemId: string, cartId: string) {
    return this.queryBuilder()
      .del()
      .from('cart_items')
      .where('menu_item_id', menuItemId)
      .andWhere('cart_id', cartId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
