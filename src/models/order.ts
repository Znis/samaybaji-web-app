import { ICreateOrderDetails, IEditOrderDetails } from '../interfaces/order';
import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Order Model');
export default class OrderModel extends BaseModel {
  /**
   * Retrieves all orders from the database.
   *
   * @return {Promise<Array<Order> | null>} A promise that resolves to an array of Order objects or null if an error occurs.
   */
  static getAllOrders() {
    return this.queryBuilder()
      .select('*')
      .from('orders')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves an order from the database based on the provided order ID.
   *
   * @param {string} orderId - The ID of the order to retrieve.
   * @return {Promise<Order | null>} A promise that resolves to the retrieved order object or null if an error occurs.
   */
  static getOrder(orderId: string) {
    return this.queryBuilder()
      .select('*')
      .from('orders')
      .where('id', orderId)
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
   * Retrieves all orders associated with a specific user from the database.
   *
   * @param {string} userId - The ID of the user to retrieve orders for.
   * @return {Promise<Array<Order> | null>} A promise that resolves to an array of Order objects or null if an error occurs.
   */
  static getOrdersByUserId(userId: string) {
    return this.queryBuilder()
      .select('*')
      .from('orders')
      .where('user_id', userId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }

  /**
   * Retrieves all orders associated with a specific restaurant from the database.
   *
   * @param {string} restaurantId - The ID of the restaurant to retrieve orders for.
   * @return {Promise<Array<Order> | null>} A promise that resolves to an array of Order objects or null if an error occurs.
   */
  static getOrdersByRestaurantId(restaurantId: string) {
    return this.queryBuilder()
      .select('orders.*')
      .distinct()
      .from('orders')
      .join('order_items', 'orders.id', 'order_items.order_id')
      .join('menu_items', 'order_items.menu_item_id', 'menu_items.id')
      .join('menus', 'menu_items.menu_id', 'menus.id')
      .join('restaurants', 'menus.restaurant_id', 'restaurants.id')
      .where('restaurants.id', restaurantId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Creates an order in the database with the provided user ID and order details.
   *
   * @param {string} userId - The ID of the user creating the order.
   * @param {ICreateOrderDetails} orderData - The details of the order to be created.
   * @return {Promise<string | null>} A promise that resolves to the ID of the created order or null if an error occurs.
   */
  static createOrder(userId: string, orderData: ICreateOrderDetails) {
    return this.queryBuilder()
      .insert({ ...orderData, userId: userId })
      .into('orders')
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
   * Updates an order in the database with the provided order ID and edit data.
   *
   * @param {string} orderId - The ID of the order to be edited.
   * @param {IEditOrderDetails} editOrderData - The details of the order to be edited.
   * @return {Promise<Order | null>} A promise that resolves to the updated order object or null if an error occurs.
   */
  static editOrder(orderId: string, editOrderData: IEditOrderDetails) {
    return this.queryBuilder()
      .update(editOrderData)
      .into('orders')
      .where('id', orderId)
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
   * Deletes an order from the 'orders' table based on the provided orderId.
   *
   * @param {string} orderId - The ID of the order to be deleted.
   * @return {Promise<any>} A promise that resolves to the deleted order data or null if an error occurs.
   */
  static deleteOrder(orderId: string) {
    return this.queryBuilder()
      .del()
      .from('orders')
      .where('id', orderId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
