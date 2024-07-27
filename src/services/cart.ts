import CartModel from '../models/cart';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import CartItemServices from './cartItem';
import ICart from '../interfaces/cart';
import MenuItemServices from './menuItem';

const logger = loggerWithNameSpace('Cart Service');

export default class CartServices {
  static async getAllCarts() {
    const carts = await CartModel.getAllCarts();
    if (!carts) {
      return null;
    }
    logger.info('All Carts Found');
    return carts;
  }
  static async getCartItems(userID: string) {
    const cart = await CartModel.getCart(userID);
    if (!cart) {
      logger.error(`Cart of userID ${userID} not found`);
      return null;
    }

    const cartItems = await CartItemServices.getCartItemsByCartID(cart.id);
    const formattedCartItems = await Promise.all(
      cartItems!.map(async (cartItem) => {
        const menuItem = await MenuItemServices.getMenuItem(
          cartItem.menuItemId,
        );
        return { quantity: cartItem.quantity, menuItem: menuItem };
      }),
    );
    logger.info(`Cart of userID ${userID} found`);
    return formattedCartItems;
  }
  static async getCart(userID: string) {
    const cart = await CartModel.getCart(userID);
    if (!cart) {
      logger.error(`Cart of userID ${userID} not found`);
      return null;
    }
    return cart;
  }
  static async createCart(userID: string) {
    const queryResult = await CartModel.createCart(userID)!;
    if (!queryResult) {
      logger.error('Could not create new cart');
      throw new ModelError('Could not create cart');
    }

    return { userID: userID, id: queryResult.id } as ICart;
  }

  static async clearCart(cartID: string) {
    const queryResult = await CartModel.clearCart(cartID)!;
    if (!queryResult && queryResult != 0) {
      logger.error(`Could not clear cart with cartID ${cartID}`);
      throw new ModelError('Could not clear cart');
    }
    logger.info(`Cart with cartID ${cartID} cleared`);

    return true;
  }
}
