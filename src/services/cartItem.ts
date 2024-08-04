import CartItemModel from '../models/cartItem';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import ICartItem, {
  ICreateCartItemData,
  IEditCartItemData,
} from '../interfaces/cartItem';

const logger = loggerWithNameSpace('Cart Item Service');

export default class CartItemService {
  /**
   * Retrieves cart items by cart ID.
   *
   * @param {string} cartId - The ID of the cart.
   * @return {Promise<Array<Object> | null>} A promise that resolves to an array of cart items or null if there was an error.
   */
  static async getCartItemsByCartId(cartId: string) {
    const cartItems = await CartItemModel.getCartItemsByCartId(cartId);
    if (!cartItems) {
      logger.error(`Cart items of cartId ${cartId} not found`);
      return null;
    }
    logger.info(`Cart items of ${cartId} found`);
    return cartItems;
  }

  /**
   * Creates a new cart item in the database for the given cart ID and cart item data.
   *
   * @param {string} cartId - The ID of the cart.
   * @param {ICreateCartItemData[]} cartItemData - An array of cart item data to be created.
   * @return {Promise<ICartItem[]>} A promise that resolves to an array of created cart items.
   * @throws {ModelError} If the cart item could not be created.
   */
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

  /**
   * Edits a cart item with the specified menu item ID and cart ID.
   *
   * @param {string} menuItemId - The ID of the menu item to be edited.
   * @param {string} cartId - The ID of the cart containing the item to be edited.
   * @param {IEditCartItemData} editCartItemData - The data to be used for editing the cart item.
   * @return {Promise<ICartItem>} A promise that resolves to the updated cart item.
   * @throws {ModelError} If the cart item could not be edited.
   */
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

  /**
   * Deletes a cart item from the database.
   *
   * @param {string} menuItemId - The ID of the menu item.
   * @param {string} cartId - The ID of the cart.
   * @return {Promise<any>} A promise that resolves to the deleted data or null if there was an error.
   */
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
