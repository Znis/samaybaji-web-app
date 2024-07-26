import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import CartService from '../services/cart';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Cart Controller');

export async function getAllCarts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const carts = await CartService.getAllCarts();
    if (!carts) {
      next(new BaseError('No Any Carts Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(carts);
  } catch (error) {
    logger.error('Cart fetch failed');
    logger.error(`Error: `, error);
    next(error);
  }
}

export async function getCart(req: Request, res: Response, next: NextFunction) {
  try {
    const userID = req.query.userID as string;
    const cart = await CartService.getCart(userID);
    if (!cart) {
      logger.error(`No cart found of userID ${userID}`);
      next(new BaseError('No cart Found'));
      return;
    }
    logger.info(`Cart of userID ${userID} found`);
    return res.status(HttpStatusCode.OK).json(cart);
  } catch (error) {
    logger.error('Cart fetch failed');
    logger.error(`Error: `, error);

    next(error);
  }
}

export async function clearCart(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cartID = req.query.cartItemID as string;
    await CartService.clearCart(cartID);
    logger.info(`Cart with cartID ${cartID} cleared`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Cleared Successfully');
  } catch (error) {
    logger.error('Cart clear failed');
    logger.error(`Error: `, error);
    next(error);
  }
}
