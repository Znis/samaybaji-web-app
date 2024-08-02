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
  static async getActiveOrderItemsByMenuItemId(menuItemId: string) {
    const activeOrderItems =
      await OrderItemModel.getActiveOrderItemsByMenuItemId(menuItemId);
    if (!activeOrderItems) {
      logger.error(`Active order items of menuItemId ${menuItemId} not found`);
      return null;
    }
    logger.info(`Active order items of ${menuItemId} found`);
    return activeOrderItems;
  }
  static async getOwnOrderItems(orderId: string, restaurantId: string) {
    const orderItems = await OrderItemModel.getOwnOrderItems(
      orderId,
      restaurantId,
    );
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
    logger.info(`Order items of ${orderId} found`);
    return orderItemsWithMenuItemData;
  }

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
