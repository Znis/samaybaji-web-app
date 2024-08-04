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

export async function getCartItems(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.query.userId as string;
    const cart = await CartService.getCartItems(userId);
    if (!cart) {
      logger.error(`No cart found of userId ${userId}`);
      next(new BaseError('No cart Found'));
      return;
    }
    logger.info(`Cart of userId ${userId} found`);
    return res.status(HttpStatusCode.OK).json(cart);
  } catch (error) {
    logger.error(`Cart fetch failed: `, error);

    next(error);
  }
}

export async function clearCart(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cartId = req.query.cartId as string;
    await CartService.clearCart(cartId);
    logger.info(`Cart with cartId ${cartId} cleared`);
    return res.status(HttpStatusCode.NO_CONTENT).json('Cleared Successfully');
  } catch (error) {
    logger.error(`Cart clear failed: `, error);
    next(error);
  }
}
