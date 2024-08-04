import { ICreateOrderItem, IEditOrderItem } from '../interfaces/orderItem';
import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Order Item Model');
export default class OrderItemModel extends BaseModel {
  /**
   * Retrieves all order items from the 'order_items' table.
   *
   * @return {Promise<Array<OrderItem> | null>} A promise that resolves to an array of OrderItem objects or null if an error occurs.
   */
  static getAllOrderItems() {
    return this.queryBuilder()
      .select('*')
      .from('order_items')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves a single order item from the 'order_items' table based on the provided order item ID.
   *
   * @param {string} orderItemId - The ID of the order item to retrieve.
   * @return {Promise<object | null>} A Promise that resolves to the retrieved order item object or null if an error occurs.
   */
  static getOrderItem(orderItemId: string) {
    return this.queryBuilder()
      .select('*')
      .from('order_items')
      .where('id', orderItemId)
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
   * Retrieves all order items associated with a given order ID from the 'order_items' table.
   *
   * @param {string} orderId - The ID of the order to retrieve order items for.
   * @return {Promise<Array<object> | null>} A promise that resolves to an array of order item objects or null if an error occurs.
   */
  static getOrderItemsByOrderId(orderId: string) {
    return this.queryBuilder()
      .select('*')
      .from('order_items')
      .where('order_id', orderId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves all order items associated with a given restaurant ID from the 'order_items' table.
   *
   * @param {string} restaurantId - The ID of the restaurant to retrieve order items for.
   * @return {Promise<Array<object> | null>} A promise that resolves to an array of order item objects or null if an error occurs.
   */
  static getOwnOrderItems(restaurantId: string) {
    return this.queryBuilder()
      .select('order_items.*')
      .from('order_items')
      .join('menu_items', 'order_items.menu_item_id', 'menu_items.id')
      .join('menus', 'menu_items.menu_id', 'menus.id')
      .join('restaurants', 'menus.restaurant_id', 'restaurants.id')
      .where('restaurants.id', restaurantId)
      .distinct()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
  /**
   * Retrieves active order items based on a given menu item ID.
   *
   * @param {string} menuItemId - The ID of the menu item to retrieve active order items for.
   * @return {Promise<any>} A promise that resolves to the active order items data or null if an error occurs.
   */
  static getActiveOrderItemsByMenuItemId(menuItemId: string) {
    return this.queryBuilder()
      .select('*')
      .from('order_items')
      .where('menu_item_id', menuItemId)
      .andWhere(function () {
        this.where('status', 'pending').orWhere('status', 'cooking');
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Creates an order item with the given order ID and order item data.
   *
   * @param {string} orderId - The ID of the order.
   * @param {ICreateOrderItem[]} orderItemData - The data of the order items to be created.
   * @return {Promise<number[] | null>} A promise that resolves to an array of inserted order item IDs or null if an error occurs.
   */
  static createOrderItem(orderId: string, orderItemData: ICreateOrderItem[]) {
    return this.queryBuilder()
      .insert(
        orderItemData.map((item) => {
          return {
            orderId: orderId,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          };
        }),
      )
      .into('order_items')
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
   * Updates an order item in the 'order_items' table.
   *
   * @param {string} orderItemId - The ID of the order item to update.
   * @param {IEditOrderItem} editOrderItemData - The data to update the order item with.
   * @return {Promise<object | null>} A promise that resolves to the updated order item object or null if an error occurs.
   */
  static editOrderItem(orderItemId: string, editOrderItemData: IEditOrderItem) {
    return this.queryBuilder()
      .update(editOrderItemData)
      .from('order_items')
      .where('id', orderItemId)
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
   * Deletes an order item from the 'order_items' table based on the provided order item ID.
   *
   * @param {string} orderItemId - The ID of the order item to delete.
   * @return {Promise<object | null>} A promise that resolves to the deleted order item object or null if an error occurs.
   */
  static deleteOrderItem(orderItemId: string) {
    return this.queryBuilder()
      .del()
      .from('order_items')
      .where('id', orderItemId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
