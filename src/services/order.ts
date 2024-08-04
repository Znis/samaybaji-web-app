import OrderModel from '../models/order';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import OrderItemServices from './orderItem';
import { ICreateOrder, IEditOrder, IOrder } from '../interfaces/order';
import { OrderItemStatus, OrderStatus } from '../enums/order';
import { IOrderItem } from '../interfaces/orderItem';

const logger = loggerWithNameSpace('Order Service');

export default class OrderService {
  /**
   * Retrieves all orders from the database, along with their associated order items.
   *
   * @return {Promise<IOrder[] | null>} A Promise that resolves to an array of IOrder objects,
   *                                   or null if no orders were found.
   */
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
  /**
   * Retrieves an order by orderId and its associated order items.
   *
   * @param {string} orderId - The ID of the order to retrieve.
   * @return {Promise<IOrderItem[] | null>} A Promise that resolves to an array of order items,
   *                                      or null if the order was not found.
   */
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
  /**
   * Retrieves all orders associated with a specific user, along with their associated order items.
   *
   * @param {string} userId - The ID of the user whose orders are being retrieved.
   * @return {Promise<IOrder[] | null>} A Promise that resolves to an array of orders, each containing their associated order items,
   *                                   or null if no orders were found for the specified user.
   */
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
  /**
   * Retrieves all orders associated with a specific restaurant, along with their associated order items.
   *
   * @param {string} restaurantId - The ID of the restaurant whose orders are being retrieved.
   * @return {Promise<Array<IOrder & { orderItems: IOrderItem }> | null>} A Promise that resolves to an array of orders, each containing their associated order items,
   *                                                                    or null if no orders were found for the specified restaurant.
   */
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
    return orderWithOrderItem;
  }

  /**
   * Creates a new order with the given user ID and order data.
   *
   * @param {string} userId - The ID of the user creating the order.
   * @param {ICreateOrder} orderData - The data for the order to be created.
   * @return {Promise<IOrder>} A Promise that resolves to the created order object.
   * @throws {ModelError} If the order could not be created.
   */
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

  /**
   * Edits an order by updating its details and cancelling its associated order items if necessary.
   *
   * @param {string} orderId - The ID of the order to edit.
   * @param {IEditOrder} editOrderData - The data containing the details of the order to edit and its associated order items.
   * @return {Promise<IOrder>} A Promise that resolves to the edited order object.
   * @throws {ModelError} If the order could not be edited.
   */
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

  /**
   * Deletes an order by its ID.
   *
   * @param {string} orderId - The ID of the order to delete.
   * @return {Promise<boolean>} A Promise that resolves to true if the order is successfully deleted, or throws a ModelError if the deletion fails.
   */
  static async deleteOrder(orderId: string) {
    const queryResult = await OrderModel.deleteOrder(orderId)!;
    if (!queryResult) {
      logger.error(`Could not delete order with orderId ${orderId}`);
      throw new ModelError('Could not delete order');
    }
    logger.info(`Order with orderId ${orderId} deleted`);

    return true;
  }
  /**
   * Determines the status of an order based on the status of its items.
   *
   * @param {IOrderItem[]} orderItems - The array of order items.
   * @return {OrderStatus} The status of the order: PENDING, COOKING, EN_ROUTE, DELIVERED, or CANCELLED.
   */
  static determineOrderStatus(orderItems: IOrderItem[]): OrderStatus {
    let hasPending = false;
    let hasCooking = false;
    let hasReady = false;
    let hasCancelled = true;

    for (const item of orderItems) {
      switch (item.status) {
        case OrderItemStatus.PENDING:
          hasPending = true;
          hasCancelled = false;
          break;
        case OrderItemStatus.COOKING:
          hasCooking = true;
          hasCancelled = false;
          break;
        case OrderItemStatus.READY:
          hasReady = true;
          hasCancelled = false;
          break;
        case OrderItemStatus.CANCELLED:
          break;
      }
    }

    if (orderItems.length === 0) {
      return OrderStatus.PENDING;
    }

    if (hasCancelled) {
      return OrderStatus.CANCELLED;
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

    return OrderStatus.DELIVERED;
  }
}
