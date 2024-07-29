import OrderItemModel from '../models/orderItem';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import {
  ICreateOrderItem,
  IEditOrderItem,
  IOrderItem,
} from '../interfaces/orderItem';

const logger = loggerWithNameSpace('Order Item Service');

export default class OrderItemServices {
  static async getOrderItemsByOrderID(orderID: string) {
    const orderItems = await OrderItemModel.getOrderItemsByOrderID(orderID);
    if (!orderItems) {
      logger.error(`Order items of orderID ${orderID} not found`);
      return null;
    }
    logger.info(`Order items of ${orderID} found`);
    return orderItems;
  }

  static async createOrderItem(orderID: string, orderData: ICreateOrderItem[]) {
    const queryResult = await OrderItemModel.createOrderItem(
      orderID,
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
    orderItemID: string,
    editOrderData: IEditOrderItem,
  ) {
    const queryResult = await OrderItemModel.editOrderItem(
      orderItemID,
      editOrderData,
    )!;
    if (!queryResult) {
      logger.error(`Could not edit order item with orderItemID ${orderItemID}`);
      throw new ModelError('Could not edit order item');
    }
    logger.info(`Cart item with orderItemID ${orderItemID} updated`);

    return {
      ...editOrderData,
      id: queryResult.id,
    } as IOrderItem;
  }

  static async deleteOrderItem(orderItemID: string) {
    const queryResult = await OrderItemModel.deleteOrderItem(orderItemID)!;
    if (!queryResult) {
      logger.error(
        `Could not delete order item with orderItemID ${orderItemID}`,
      );
      throw new ModelError('Could not delete order item');
    }
    logger.info(`Cart order with orderItemID ${orderItemID} deleted`);

    return true;
  }
}
