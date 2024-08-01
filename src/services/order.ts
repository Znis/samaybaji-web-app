import OrderModel from '../models/order';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import OrderItemServices from './orderItem';
import { ICreateOrder, IEditOrder, IOrder } from '../interfaces/order';
import { OrderItemStatus, OrderStatus } from '../enums/order';
import { IOrderItem } from '../interfaces/orderItem';

const logger = loggerWithNameSpace('Order Service');

export default class OrderService {
  static async getAllOrders() {
    const orders = await OrderModel.getAllOrders();
    if (!orders) {
      return null;
    }
    const orderWithOrderItems = await Promise.all(
      orders.map(async (order: IOrder) => {
        const orderItems = (await OrderItemServices.getOrderItemsByOrderID(
          order.id,
        )) as IOrderItem[];
        order.status = this.determineOrderStatus(orderItems);
        return { ...order, orderItems: orderItems };
      }),
    );
    logger.info(`All Orders Found`);
    return orderWithOrderItems;
  }
  static async getOrder(orderID: string) {
    const order = await OrderModel.getOrder(orderID);
    if (!order) {
      logger.error(`Order of orderID ${orderID} not found`);
      return null;
    }
    const orderItems = await OrderItemServices.getOrderItemsByOrderID(order.id);

    logger.info(`Order of orderID ${orderID} found`);
    return orderItems;
  }
  static async getOrdersByUserID(userID: string) {
    const orders = await OrderModel.getOrdersByUserID(userID);
    if (!orders) {
      logger.error(`Order of userID ${userID} not found`);
      return null;
    }
    const orderWithOrderItems = await Promise.all(
      orders.map(async (order: IOrder) => {
        const orderItems = (await OrderItemServices.getOrderItemsByOrderID(
          order.id,
        )) as IOrderItem[];
        order.status = this.determineOrderStatus(orderItems);
        return { ...order, orderItems: orderItems };
      }),
    );
    logger.info(`Orders of userID ${userID} Found`);
    return orderWithOrderItems;
  }
  static async getOrdersByRestaurantID(restaurantID: string) {
    const orders = await OrderModel.getOrdersByRestaurantID(restaurantID);
    if (!orders) {
      logger.error(`Order of restaurantID ${restaurantID} not found`);
      return null;
    }
    const orderWithOrderItems = await Promise.all(
      orders.map(async (order: IOrder) => {
        const orderItems = (await OrderItemServices.getOrderItemsByOrderID(
          order.id,
        )) as IOrderItem[];
        order.status = this.determineOrderStatus(orderItems);
        return { ...order, orderItems: orderItems };
      }),
    );
    logger.info(`Orders of restaurantID ${restaurantID} Found`);
    return orderWithOrderItems;
  }

  static async createOrder(userID: string, orderData: ICreateOrder) {
    const { orderItems, ...orderDetails } = orderData;
    orderDetails.subTotalAmount = orderItems.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0,
    );
    orderDetails.totalAmount =
      orderDetails.subTotalAmount + orderDetails.deliveryAmount;
    const queryResult = await OrderModel.createOrder(userID, orderDetails)!;
    const createOrderItems = await OrderItemServices.createOrderItem(
      queryResult.id,
      orderItems,
    );
    if (!queryResult || !createOrderItems) {
      logger.error('Could not create new order');
      throw new ModelError('Could not create order');
    }
    logger.info(`Order with orderID ${queryResult.id} created`);

    return {
      ...orderData,
      id: queryResult.id,
      userID: userID,
      status: OrderStatus.PENDING,
    } as IOrder;
  }

  static async editOrder(orderID: string, editOrderData: IEditOrder) {
    const { orderItems, ...orderDetails } = editOrderData;

    const queryResult = await OrderModel.editOrder(orderID, orderDetails)!;
    if (!queryResult) {
      logger.error('Could not create new order');
      throw new ModelError('Could not create order');
    }

    logger.info(`Order with orderID ${orderID} updated`);

    return {
      ...editOrderData,
      id: orderID,
    } as IOrder;
  }

  static async deleteOrder(orderID: string) {
    const queryResult = await OrderModel.deleteOrder(orderID)!;
    if (!queryResult) {
      logger.error(`Could not delete order with orderID ${orderID}`);
      throw new ModelError('Could not delete order');
    }
    logger.info(`Order with orderID ${orderID} deleted`);

    return true;
  }
  static determineOrderStatus(orderItems: IOrderItem[]): OrderStatus {
    let hasPending = false;
    let hasCooking = false;
    let hasReady = false;

    for (const item of orderItems) {
      switch (item.status) {
        case OrderItemStatus.PENDING:
          hasPending = true;
          break;
        case OrderItemStatus.COOKING:
          hasCooking = true;
          break;
        case OrderItemStatus.READY:
          hasReady = true;
          break;
      }
    }

    if (orderItems.length === 0) {
      return OrderStatus.PENDING;
    }

    if (hasPending) {
      return OrderStatus.PENDING;
    }

    if (hasCooking) {
      return OrderStatus.COOKING;
    }

    if (hasReady && !hasCooking && !hasPending) {
      return OrderStatus.EN_ROUTE;
    }

    if (!hasPending && !hasCooking && !hasReady) {
      return OrderStatus.DELIVERED;
    }

    return OrderStatus.CANCELLED;
  }
}
