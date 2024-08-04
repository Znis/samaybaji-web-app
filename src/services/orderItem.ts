import OrderItemModel from '../models/orderItem';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import {
  ICreateOrderItem,
  IEditOrderItem,
  IOrderItem,
} from '../interfaces/orderItem';
import MenuItemService from './menuItem';
import IMenuItem from '../interfaces/menuItem';

const logger = loggerWithNameSpace('Order Item Service');

export default class OrderItemService {
  /**
   * Retrieves order items by the provided order ID and enriches them with menu item data.
   *
   * @param {string} orderId - The ID of the order to retrieve items for.
   * @return {Promise<IOrderItem[]>} An array of order items with associated menu item data.
   */
  static async getOrderItemsByOrderId(orderId: string) {
    const orderItems = await OrderItemModel.getOrderItemsByOrderId(orderId);
    if (!orderItems) {
      logger.error(`Order items of orderId ${orderId} not found`);
      return null;
    }
    const orderItemsWithMenuItemData = await Promise.all(
      orderItems.map(async (item) => {
        const menuItemData = (await MenuItemService.getMenuItem(
          item.menuItemId,
        )) as IMenuItem;
        return { ...item, menuItemData: menuItemData } as IOrderItem;
      }),
    );
    logger.info(`Order items of ${orderId} found`);
    return orderItemsWithMenuItemData;
  }
  /**
   * Retrieves the number of active order items associated with a given menu item ID.
   *
   * @param {string} menuItemId - The ID of the menu item to retrieve active order items for.
   * @return {number} The number of active order items associated with the menu item.
   */
  static async getActiveOrderItemsByMenuItemId(menuItemId: string) {
    const activeOrderItems =
      (await OrderItemModel.getActiveOrderItemsByMenuItemId(
        menuItemId,
      )) as IOrderItem[];
    if (!activeOrderItems.length) {
      logger.error(`Active order items of menuItemId ${menuItemId} not found`);
    }
    logger.info(`Active order items of ${menuItemId} found`);
    return activeOrderItems.length;
  }
  /**
   * Retrieves the order items associated with a specific restaurant.
   *
   * @param {string} restaurantId - The ID of the restaurant to retrieve order items for.
   * @return {Promise<IOrderItem[]>} A promise that resolves to an array of order items with associated menu item data.
   * @throws {ModelError} If the order items could not be retrieved.
   */
  static async getOwnOrderItems(restaurantId: string) {
    const orderItems = await OrderItemModel.getOwnOrderItems(restaurantId);
    if (!orderItems) {
      logger.error('Could not get the order items');
      throw new ModelError('Could not get the order items');
    }
    const orderItemsWithMenuItemData = await Promise.all(
      orderItems.map(async (item) => {
        const menuItemData = (await MenuItemService.getMenuItem(
          item.menuItemId,
        )) as IMenuItem;
        return { ...item, menuItemData: menuItemData } as IOrderItem;
      }),
    );
    return orderItemsWithMenuItemData;
  }

  /**
   * Creates an order item for a given order ID and order data.
   *
   * @param {string} orderId - The ID of the order.
   * @param {ICreateOrderItem[]} orderData - The data of the order item to be created.
   * @return {Promise<IOrderItem[]>} A promise that resolves to an array of created order items.
   * @throws {ModelError} If the order item creation fails.
   */
  static async createOrderItem(orderId: string, orderData: ICreateOrderItem[]) {
    const queryResult = await OrderItemModel.createOrderItem(
      orderId,
      orderData,
    )!;
    if (!queryResult) {
      logger.error('Could not create new order item');
      throw new ModelError('Could not create order item');
    }
    return queryResult.map((item: { id: string }, idx: number) => {
      return { ...orderData[idx], id: item.id };
    }) as IOrderItem[];
  }
  /**
   * Edits an order item with the specified orderItemId using the provided editOrderData.
   *
   * @param {string} orderItemId - The ID of the order item to be edited.
   * @param {IEditOrderItem} editOrderData - The data used to edit the order item.
   * @return {Promise<IOrderItem>} A promise that resolves to the edited order item.
   * @throws {ModelError} If the order item could not be edited.
   */
  static async editOrderItem(
    orderItemId: string,
    editOrderData: IEditOrderItem,
  ) {
    const queryResult = await OrderItemModel.editOrderItem(
      orderItemId,
      editOrderData,
    )!;
    if (!queryResult) {
      logger.error(`Could not edit order item with orderItemId ${orderItemId}`);
      throw new ModelError('Could not edit order item');
    }
    logger.info(`Cart item with orderItemId ${orderItemId} updated`);

    return {
      ...editOrderData,
      id: queryResult.id,
    } as IOrderItem;
  }

  /**
   * Deletes an order item with the specified orderItemId.
   *
   * @param {string} orderItemId - The ID of the order item to be deleted.
   * @return {Promise<boolean>} A promise that resolves to true if the order item is successfully deleted,
   *                            or throws a ModelError if the deletion fails.
   */
  static async deleteOrderItem(orderItemId: string) {
    const queryResult = await OrderItemModel.deleteOrderItem(orderItemId)!;
    if (!queryResult) {
      logger.error(
        `Could not delete order item with orderItemId ${orderItemId}`,
      );
      throw new ModelError('Could not delete order item');
    }
    logger.info(`Cart order with orderItemId ${orderItemId} deleted`);

    return true;
  }
}
