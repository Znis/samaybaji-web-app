import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import OrderItemService from '../services/orderItem';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Order Item Controller');

/**
 * Controller function to add an order item to the database.
 *
 * @param {Request} req - The request object containing the order item data and order ID.
 * @param {Response} res - The response object used to send the created order item.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the order item is created and the response is sent.
 */
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
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Order item creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to edit an order item with the specified orderItemId using the provided orderItemData.
 *
 * @param {Request} req - The request object containing the orderItemId and orderItemData.
 * @param {Response} res - The response object used to send the edited order item.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the order item is edited and the response is sent.
 */
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
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Order item edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
/**
 * Controller function to delete an order item with the specified orderItemId.
 *
 * @param {Request} req - The request object containing the orderItemId.
 * @param {Response} res - The response object used to send the deletion result.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the order item is deleted and the response is sent.
 */
export async function deleteOrderItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderItemId = req.params.orderItemId as string;
    await OrderItemService.deleteOrderItem(orderItemId);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Order item deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
