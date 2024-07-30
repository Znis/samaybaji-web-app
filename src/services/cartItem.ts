import CartItemModel from '../models/cartItem';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import ICartItem, {
  ICreateCartItemData,
  IEditCartItemData,
} from '../interfaces/cartItem';

const logger = loggerWithNameSpace('Cart Item Service');

export default class CartItemService {
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
    cartItemData: ICreateCartItemData[],
  ) {
    const queryResult = await CartItemModel.createCartItem(
      cartID,
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
    menuItemID: string,
    cartID: string,
    editCartItemData: IEditCartItemData,
  ) {
    const queryResult = await CartItemModel.editCartItem(
      menuItemID,
      cartID,
      editCartItemData,
    )!;
    if (!queryResult) {
      logger.error(`Could not edit cart item with menuItemID ${menuItemID}`);
      throw new ModelError('Could not edit Menu');
    }
    logger.info(`Cart item with menuItemID ${menuItemID} updated`);

    return {
      ...editCartItemData,
      id: queryResult.id,
    } as ICartItem;
  }

  static async deleteCartItem(menuItemID: string, cartID: string) {
    const queryResult = await CartItemModel.deleteCartItem(menuItemID, cartID)!;
    if (!queryResult) {
      logger.error(`Could not delete cart item with menuItemID ${menuItemID}`);
      throw new ModelError('Could not delete cart item');
    }
    logger.info(`Cart item with menuItemID ${menuItemID} deleted`);

    return true;
  }
}
