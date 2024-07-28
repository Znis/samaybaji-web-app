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
export async function getOrdersByUserID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userID = req.query.userID as string;
    const orders = await OrderService.getOrdersByUserID(userID);
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
export async function getOrdersByRestaurantID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantID = req.query.restaurantID as string;
    const orders = await OrderService.getOrdersByRestaurantID(restaurantID);
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
    const orderID = req.query.orderID as string;
    const orderItems = await OrderService.getOrder(orderID);
    if (!orderItems) {
      logger.error(`No order found of orderID ${orderID}`);
      next(new BaseError('No order Found'));
      return;
    }
    logger.info(`Menu items of orderID ${orderID} found`);
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
    const userID = req.query.userID as string;
    const response = await OrderService.createOrder(userID, orderData);
    logger.info(`New order for userID ${userID} created`);
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
    const orderID = req.query.orderID as string;
    const orderData = req.body;
    const response = await OrderService.editOrder(orderID, orderData);
    logger.info(`Order with orderID ${orderID} edited`);
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
    const orderID = req.query.orderID as string;
    await OrderService.deleteOrder(orderID);
    logger.info(`Order with orderID ${orderID} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Order deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
