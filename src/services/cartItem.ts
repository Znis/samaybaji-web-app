import CartItemModel from '../models/cartItem';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import ICartItem, {
  ICreateCartItemData,
  IEditCartItemData,
} from '../interfaces/cartItem';

const logger = loggerWithNameSpace('Cart Item Service');

export default class CartItemService {
  static async getCartItemsByCartId(cartId: string) {
    const cartItems = await CartItemModel.getCartItemsByCartId(cartId);
    if (!cartItems) {
      logger.error(`Cart items of cartId ${cartId} not found`);
      return null;
    }
    logger.info(`Cart items of ${cartId} found`);
    return cartItems;
  }

  static async createCartItem(
    cartId: string,
    cartItemData: ICreateCartItemData[],
  ) {
    const queryResult = await CartItemModel.createCartItem(
      cartId,
      cartItemData,
    )!;
    if (!queryResult) {
      logger.error('Could not create new cart item');
      throw new ModelError('Could not create cart item');
    }
    return queryResult.map((item: { id: string }, idx: number) => {
      return { ...cartItemData[idx], id: item.id };
    }) as ICartItem[];
  }

  static async editCartItem(
    menuItemId: string,
    cartId: string,
    editCartItemData: IEditCartItemData,
  ) {
    const queryResult = await CartItemModel.editCartItem(
      menuItemId,
      cartId,
      editCartItemData,
    )!;
    if (!queryResult) {
      logger.error(`Could not edit cart item with menuItemId ${menuItemId}`);
      throw new ModelError('Could not edit Menu');
    }
    logger.info(`Cart item with menuItemId ${menuItemId} updated`);

    return {
      ...editCartItemData,
      id: queryResult.id,
    } as ICartItem;
  }

  static async deleteCartItem(menuItemId: string, cartId: string) {
    const queryResult = await CartItemModel.deleteCartItem(menuItemId, cartId)!;
    if (!queryResult) {
      logger.error(`Could not delete cart item with menuItemId ${menuItemId}`);
      throw new ModelError('Could not delete cart item');
    }
    logger.info(`Cart item with menuItemId ${menuItemId} deleted`);

    return true;
  }
}
