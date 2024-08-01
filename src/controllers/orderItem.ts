import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import OrderItemService from '../services/orderItem';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Order Item Controller');

export async function addOrderItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderItemData = req.body;
    const orderId = req.query.orderId as string;
    const response = await OrderItemService.createOrderItem(
      orderId,
      orderItemData,
    );
    logger.info(`New order item for orderId ${orderId} created`);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Order item creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function editOrderItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderItemId = req.params.orderItemId as string;
    const orderItemData = req.body;
    const response = await OrderItemService.editOrderItem(
      orderItemId,
      orderItemData,
    );
    logger.info(`Order Item with orderItemId ${orderItemId} edited`);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Order item edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function deleteOrderItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderItemId = req.params.orderItemId as string;
    await OrderItemService.deleteOrderItem(orderItemId);
    logger.info(`Order item with orderItemId ${orderItemId} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Order item deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
