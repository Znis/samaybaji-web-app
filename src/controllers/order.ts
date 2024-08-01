import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import OrderService from '../services/order';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Order Controller');

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

export async function getOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderId = req.query.orderId as string;
    const orderItems = await OrderService.getOrder(orderId);
    if (!orderItems) {
      logger.error(`No order found of orderId ${orderId}`);
      next(new BaseError('No order Found'));
      return;
    }
    logger.info(`Menu items of orderId ${orderId} found`);
    return res.status(HttpStatusCode.OK).json(orderItems);
  } catch (error) {
    logger.error('Order fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderData = req.body;
    const userId = req.query.userId as string;
    const response = await OrderService.createOrder(userId, orderData);
    logger.info(`New order for userId ${userId} created`);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Order creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function editOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderId = req.params.orderId as string;
    const orderData = req.body;
    const response = await OrderService.editOrder(orderId, orderData);
    logger.info(`Order with orderId ${orderId} edited`);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Order edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderId = req.params.orderId as string;
    await OrderService.deleteOrder(orderId);
    logger.info(`Order with orderId ${orderId} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Order deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
