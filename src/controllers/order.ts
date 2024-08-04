import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import OrderService from '../services/order';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Order Controller');

/**
 * Controller function to retrieve all orders.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} A promise that resolves when the function is complete.
 */
export async function getAllOrders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orders = await OrderService.getAllOrders();
    if (!orders) {
      next(new BaseError('No Any Orders Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    logger.error('Order fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to retrieve all orders associated with a specific user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} A promise that resolves when the function is complete.
 */
export async function getOrdersByUserId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.query.userId as string;
    const orders = await OrderService.getOrdersByUserId(userId);
    if (!orders) {
      next(new BaseError('No Any Orders Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    logger.error('Order fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to retrieve all orders associated with a specific restaurant.
 *
 * @param {Request} req - The request object containing the restaurantId query parameter.
 * @param {Response} res - The response object used to send the orders.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the orders are retrieved and sent.
 * @throws {BaseError} If no orders are found for the specified restaurant.
 */
export async function getOrdersByRestaurantId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantId = req.query.restaurantId as string;
    const orders = await OrderService.getOrdersByRestaurantId(restaurantId);
    if (!orders) {
      next(new BaseError('No Any Orders Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    logger.error('Order fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}

/**
 * Controller function to retrieve the order items associated with a specific order ID.
 *
 * @param {Request} req - The request object containing the orderId query parameter.
 * @param {Response} res - The response object used to send the order items.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the order items are retrieved and sent.
 * @throws {BaseError} If no order items are found for the specified order ID.
 */
export async function getOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderId = req.query.orderId as string;
    const orderItems = await OrderService.getOrder(orderId);
    if (!orderItems) {
      next(new BaseError('No order Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(orderItems);
  } catch (error) {
    logger.error('Order fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

/**
 * Controller function to create a new order for a user.
 *
 * @param {Request} req - The request object containing the order data and user ID.
 * @param {Response} res - The response object used to send the created order.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the order is created and sent.
 * @throws {Error} If there is an error creating the order.
 */
export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderData = req.body;
    const userId = req.query.userId as string;
    const response = await OrderService.createOrder(userId, orderData);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Order creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to edit an existing order based on the provided order ID and updated order data.
 *
 * @param {Request} req - The request object containing the order ID and updated order data.
 * @param {Response} res - The response object used to send the edited order.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the order is edited and sent.
 * @throws {Error} If there is an error editing the order.
 */
export async function editOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderId = req.params.orderId as string;
    const orderData = req.body;
    const response = await OrderService.editOrder(orderId, orderData);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Order edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to delete an order based on the provided order ID.
 *
 * @param {Request} req - The request object containing the order ID.
 * @param {Response} res - The response object used to send the deletion status.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the order is deleted and the response is sent.
 * @throws {Error} If there is an error deleting the order.
 */
export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderId = req.params.orderId as string;
    await OrderService.deleteOrder(orderId);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Order deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
