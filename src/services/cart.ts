import CartModel from '../models/cart';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import CartItemServices from './cartItem';
import ICart from '../interfaces/cart';
import MenuItemServices from './menuItem';
import { IFormattedCartItemData } from '../interfaces/cartItem';

const logger = loggerWithNameSpace('Cart Service');

export default class CartService {
  /**
   * Retrieves all carts from the database.
   *
   * @return {Promise<ICart[] | null>} An array of all carts, or null if no carts are found.
   */
  static async getAllCarts() {
    const carts = await CartModel.getAllCarts();
    if (!carts) {
      return null;
    }
    logger.info('All Carts Found');
    return carts;
  }
  /**
   * Retrieves the cart items for a given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<IFormattedCartItemData[] | null>} A promise that resolves to an array of formatted cart items or null if the cart is not found.
   */
  static async getCartItems(userId: string) {
    const cart = await CartModel.getCart(userId);
    if (!cart) {
      logger.error(`Cart of userId ${userId} not found`);
      return null;
    }

    const cartItems = await CartItemServices.getCartItemsByCartId(cart.id);
    const formattedCartItems = await Promise.all(
      cartItems!.map(async (cartItem) => {
        const menuItem = await MenuItemServices.getMenuItem(
          cartItem.menuItemId,
        );
        return {
          quantity: cartItem.quantity,
          menuItemData: menuItem,
        } as IFormattedCartItemData;
      }),
    );
    logger.info(`Cart of userId ${userId} found`);
    return formattedCartItems;
  }
  /**
   * Retrieves the cart for a given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<ICart | null>} A promise that resolves to the cart object or null if the cart is not found.
   */
  static async getCart(userId: string) {
    const cart = await CartModel.getCart(userId);
    if (!cart) {
      logger.error(`Cart of userId ${userId} not found`);
      return null;
    }
    return cart;
  }
  /**
   * Creates a new cart in the database for the given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<ICart>} A promise that resolves to the created cart object.
   * @throws {ModelError} If the cart could not be created.
   */
  static async createCart(userId: string) {
    const queryResult = await CartModel.createCart(userId)!;
    if (!queryResult) {
      logger.error('Could not create new cart');
      throw new ModelError('Could not create cart');
    }

    return { userId: userId, id: queryResult.id } as ICart;
  }

  /**
   * Clears the cart with the given cart ID.
   *
   * @param {string} cartId - The ID of the cart to be cleared.
   * @return {Promise<boolean>} A promise that resolves to true if the cart is successfully cleared,
   *                           or throws a ModelError if the cart could not be cleared.
   */
  static async clearCart(cartId: string) {
    const queryResult = await CartModel.clearCart(cartId)!;
    if (!queryResult && queryResult != 0) {
      logger.error(`Could not clear cart with cartId ${cartId}`);
      throw new ModelError('Could not clear cart');
    }
    logger.info(`Cart with cartId ${cartId} cleared`);

    return true;
  }
}
