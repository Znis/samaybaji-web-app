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
    const cartID = req.query.cartID as string;
    const response = await CartItemService.createCartItem(cartID, cartItemData);
    logger.info(`New cart item for cartID ${cartID} created`);
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
    const menuItemID = req.query.menuItemID as string;
    const cartID = req.query.cartID as string;
    const cartItemData = req.body;
    const response = await CartItemService.editCartItem(
      menuItemID,
      cartID,
      cartItemData,
    );
    logger.info(`Cart Item with menuItemID ${menuItemID} edited`);
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
    const menuItemID = req.query.menuItemID as string;
    const cartID = req.query.cartID as string;
    await CartItemService.deleteCartItem(menuItemID, cartID);
    logger.info(`Cart item with menuItemID ${menuItemID} deleted`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Cart item deletion failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
