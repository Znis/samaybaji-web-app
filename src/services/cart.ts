import CartModel from '../models/cart';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import CartItemServices from './cartItem';
import ICart from '../interfaces/cart';
import MenuItemServices from './menuItem';
import { IFormattedCartItemData } from '../interfaces/cartItem';

const logger = loggerWithNameSpace('Cart Service');

export default class CartService {
  static async getAllCarts() {
    const carts = await CartModel.getAllCarts();
    if (!carts) {
      return null;
    }
    logger.info('All Carts Found');
    return carts;
  }
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
  static async getCart(userId: string) {
    const cart = await CartModel.getCart(userId);
    if (!cart) {
      logger.error(`Cart of userId ${userId} not found`);
      return null;
    }
    return cart;
  }
  static async createCart(userId: string) {
    const queryResult = await CartModel.createCart(userId)!;
    if (!queryResult) {
      logger.error('Could not create new cart');
      throw new ModelError('Could not create cart');
    }

    return { userId: userId, id: queryResult.id } as ICart;
  }

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
