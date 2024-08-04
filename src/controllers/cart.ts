import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import CartService from '../services/cart';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Cart Controller');

/**
 * Controller function to retrieve all carts from the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} A promise that resolves to void.
 */
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
    logger.error('Error: ', error);
    next(error);
  }
}

/**
 * Controller function to retrieve the cart items for a given user ID.
 *
 * @param {Request} req - The request object containing the query parameter 'userId'.
 * @param {Response} res - The response object used to send the HTTP response.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the cart items are successfully retrieved and sent in the response, or rejects with an error.
 */
export async function getCartItems(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.query.userId as string;
    const cart = await CartService.getCartItems(userId);
    if (!cart) {
      next(new BaseError('No cart Found'));
      return;
    }
    return res.status(HttpStatusCode.OK).json(cart);
  } catch (error) {
    logger.error(`Cart fetch failed`);
    logger.error('Error: ', error);
    next(error);
  }
}

/**
 * Controller function to clear the cart with the given cart ID.
 *
 * @param {Request} req - The request object containing the query parameter 'cartId'.
 * @param {Response} res - The response object used to send the HTTP response.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the cart is cleared successfully, or rejects with an error.
 */
export async function clearCart(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cartId = req.query.cartId as string;
    await CartService.clearCart(cartId);
    return res.status(HttpStatusCode.NO_CONTENT).json('Cleared Successfully');
  } catch (error) {
    logger.error(`Cart clear failed`);
    logger.error('Error: ', error);
    next(error);
  }
}
