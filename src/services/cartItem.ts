import CartItemModel from '../models/menu';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import ICartItem, {
  ICreateCartItemData,
  IEditCartItemData,
} from '../interfaces/cartItem';

const logger = loggerWithNameSpace('Cart Item Service');

export default class CartItemServices {
  static async getCartItemsByCartID(cartID: string) {
    const cartItems = await CartItemModel.getCartItemsByCartID(cartID);
    if (!cartItems) {
      logger.error(`Cart items of cartID ${cartID} not found`);
      return null;
    }
    logger.info(`Cart items of ${cartID} found`);
    return cartItems;
  }

  static async createCartItem(
    cartID: string,
    cartItemData: ICreateCartItemData,
  ) {
    const queryResult = await CartItemModel.createCartItem(
      cartID,
      cartItemData,
    )!;
    if (!queryResult) {
      logger.error('Could not create new cart item');
      throw new ModelError('Could not create cart item');
    }

    return { ...cartItemData, id: queryResult.id } as ICartItem;
  }

  static async editCartItem(
    cartItemID: string,
    editCartItemData: IEditCartItemData,
  ) {
    const queryResult = await CartItemModel.editCartItem(
      cartItemID,
      editCartItemData,
    )!;
    if (!queryResult) {
      logger.error(`Could not edit cart item with cartItemID ${cartItemID}`);
      throw new ModelError('Could not edit Menu');
    }
    logger.info(`Cart item with cartItemID ${cartItemID} updated`);

    return {
      ...editCartItemData,
      id: cartItemID,
    } as ICartItem;
  }

  static async deleteCartItem(cartItemID: string) {
    const queryResult = await CartItemModel.deleteCartItem(cartItemID)!;
    if (!queryResult) {
      logger.error(`Could not delete cart item with cartItemID ${cartItemID}`);
      throw new ModelError('Could not delete cart item');
    }
    logger.info(`Cart item with cartItemID ${cartItemID} deleted`);

    return true;
  }
}
