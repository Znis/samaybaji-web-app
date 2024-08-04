import HttpStatusCode from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import CartItemService from '../services/cartItem';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Cart Item Controller');

/**
 * Controller function to add a cart item to the database for the given cart ID and cart item data.
 *
 * @param {Request} req - The request object containing the cart item data and cart ID.
 * @param {Response} res - The response object used to send the created cart item data.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the cart item is created successfully.
 * @throws {Error} If there is an error creating the cart item.
 */
export async function addCartItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cartItemData = req.body;
    const cartId = req.query.cartId as string;
    const response = await CartItemService.createCartItem(cartId, cartItemData);
    return res.status(HttpStatusCode.CREATED).json({ created: response });
  } catch (error) {
    logger.error('Cart item creation failed');
    logger.error('Error: ', error);
    next(error);
  }
}
/**
 * Controller function to edit a cart item with the specified menu item ID and cart ID.
 *
 * @param {Request} req - The request object containing the menu item ID, cart ID, and cart item data.
 * @param {Response} res - The response object used to send the edited cart item data.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the cart item is edited successfully.
 */
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
    return res.status(HttpStatusCode.OK).json({ edited: response });
  } catch (error) {
    logger.error('Cart item edit failed');
    logger.error('Error: ', error);
    next(error);
  }
}
/**
 * Controller function to delete a cart item from the database.
 *
 * @param {Request} req - The request object containing the query parameters.
 * @param {Response} res - The response object used to send the HTTP response.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the cart item is deleted successfully.
 */
export async function deleteCartItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const menuItemId = req.query.menuItemId as string;
    const cartId = req.query.cartId as string;
    await CartItemService.deleteCartItem(menuItemId, cartId);
    return res.status(HttpStatusCode.NO_CONTENT).json('Deleted Successfully');
  } catch (error) {
    logger.error('Cart item deletion failed');
    logger.error('Error: ', error);
    next(error);
  }
}
