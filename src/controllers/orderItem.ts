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
    const orderID = req.query.orderID as string;
    const response = await OrderItemService.createOrderItem(
      orderID,
      orderItemData,
    );
    logger.info(`New order item for orderID ${orderID} created`);
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
    const orderItemID = req.query.orderItemID as string;
    const orderItemData = req.body;
    const response = await OrderItemService.editOrderItem(
      orderItemID,
      orderItemData,
    );
    logger.info(`Order Item with orderItemID ${orderItemID} edited`);
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
    const orderItemID = req.query.orderItemID as string;
    await OrderItemService.deleteOrderItem(orderItemID);
    logger.info(`Order item with orderItemID ${orderItemID} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Order item deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
