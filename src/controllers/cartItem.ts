import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import CartItemService from '../services/cartItem';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Cart Item Controller');

export async function addCartItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cartItemData = req.body;
    const cartId = req.query.cartId as string;
    const response = await CartItemService.createCartItem(cartId, cartItemData);
    logger.info(`New cart item for cartId ${cartId} created`);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Cart item creation failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function editCartItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemId = req.query.menuItemId as string;
    const cartId = req.query.cartId as string;
    const cartItemData = req.body;
    const response = await CartItemService.editCartItem(
      menuItemId,
      cartId,
      cartItemData,
    );
    logger.info(`Cart Item with menuItemId ${menuItemId} edited`);
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Cart item edit failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
export async function deleteCartItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemId = req.query.menuItemId as string;
    const cartId = req.query.cartId as string;
    await CartItemService.deleteCartItem(menuItemId, cartId);
    logger.info(`Cart item with menuItemId ${menuItemId} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Cart item deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
