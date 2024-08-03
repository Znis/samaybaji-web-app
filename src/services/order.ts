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
        const orderItems = (await OrderItemServices.getOrderItemsByOrderId(
          order.id,
        )) as IOrderItem[];
        order.status =
          order.status == OrderStatus.CANCELLED
            ? order.status
            : this.determineOrderStatus(orderItems);
        return { ...order, orderItems: orderItems };
      }),
    );
    logger.info(`All Orders Found`);
    return orderWithOrderItems;
  }
  static async getOrder(orderId: string) {
    const order = await OrderModel.getOrder(orderId);
    if (!order) {
      logger.error(`Order of orderId ${orderId} not found`);
      return null;
    }
    const orderItems = await OrderItemServices.getOrderItemsByOrderId(order.id);

    logger.info(`Order of orderId ${orderId} found`);
    return orderItems;
  }
  static async getOrdersByUserId(userId: string) {
    const orders = await OrderModel.getOrdersByUserId(userId);
    if (!orders) {
      logger.error(`Order of userId ${userId} not found`);
      return null;
    }
    const orderWithOrderItems = await Promise.all(
      orders.map(async (order: IOrder) => {
        const orderItems = (await OrderItemServices.getOrderItemsByOrderId(
          order.id,
        )) as IOrderItem[];
        order.status =
          order.status == OrderStatus.CANCELLED
            ? order.status
            : this.determineOrderStatus(orderItems);
        return { ...order, orderItems: orderItems };
      }),
    );
    logger.info(`Orders of userId ${userId} Found`);
    return orderWithOrderItems;
  }
  static async getOrdersByRestaurantId(restaurantId: string) {
    const orders = await OrderModel.getOrdersByRestaurantId(restaurantId);
    if (!orders) {
      logger.error(`Order of restaurantId ${restaurantId} not found`);
      return null;
    }
    const orderItems = (await OrderItemServices.getOwnOrderItems(
      restaurantId,
    )) as IOrderItem[];
    const orderWithOrderItem = await Promise.all(
      orderItems.map(async (orderItem: IOrderItem) => {
        const order = orders.filter((item) => item.id == orderItem.orderId)[0];
        return { ...order, orderItems: orderItem };
      }),
    );
    console.log(orderWithOrderItem);
    return orderWithOrderItem;
  }

  static async createOrder(userId: string, orderData: ICreateOrder) {
    const { orderItems, ...orderDetails } = orderData;
    orderDetails.subTotalAmount = orderItems.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0,
    );
    orderDetails.totalAmount =
      orderDetails.subTotalAmount + orderDetails.deliveryAmount;
    const queryResult = await OrderModel.createOrder(userId, orderDetails)!;
    const createOrderItems = await OrderItemServices.createOrderItem(
      queryResult.id,
      orderItems,
    );
    if (!queryResult || !createOrderItems) {
      logger.error('Could not create new order');
      throw new ModelError('Could not create order');
    }
    logger.info(`Order with orderId ${queryResult.id} created`);

    return {
      ...orderData,
      id: queryResult.id,
      userId: userId,
      status: OrderStatus.PENDING,
    } as IOrder;
  }

  static async editOrder(orderId: string, editOrderData: IEditOrder) {
    const { orderItems, ...orderDetails } = editOrderData;
    if (orderDetails.status == OrderStatus.CANCELLED) {
      const orderItemsOfOrder = (await OrderItemServices.getOrderItemsByOrderId(
        orderId,
      )) as unknown as IOrderItem[];
      orderItemsOfOrder.forEach(
        async (item) =>
          await OrderItemServices.editOrderItem(item.id, {
            status: OrderItemStatus.CANCELLED,
          }),
      );
    }
    const queryResult = await OrderModel.editOrder(orderId, orderDetails)!;
    if (!queryResult) {
      logger.error('Could not create new order');
      throw new ModelError('Could not create order');
    }

    logger.info(`Order with orderId ${orderId} updated`);

    return {
      ...editOrderData,
      id: orderId,
    } as IOrder;
  }

  static async deleteOrder(orderId: string) {
    const queryResult = await OrderModel.deleteOrder(orderId)!;
    if (!queryResult) {
      logger.error(`Could not delete order with orderId ${orderId}`);
      throw new ModelError('Could not delete order');
    }
    logger.info(`Order with orderId ${orderId} deleted`);

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
