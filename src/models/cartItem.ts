import { ICreateCartItemData, IEditCartItemData } from '../interfaces/cartItem';
import { BaseModel } from './base';

export default class CartItemModel extends BaseModel {
  static getCartItemsByCartId(cartId: string) {
    return this.queryBuilder()
      .select('*')
      .from('cart_items')
      .where('cart_id', cartId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static createCartItem(cartId: string, cartItemData: ICreateCartItemData[]) {
    return this.queryBuilder()
      .insert(
        cartItemData.map((item) => {
          return {
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            cartId: cartId,
          };
        }),
      )
      .into('cart_items')
      .returning('id')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editCartItem(
    menuItemId: string,
    cartId: string,
    editCartItemData: IEditCartItemData,
  ) {
    return this.queryBuilder()
      .update(editCartItemData)
      .from('cart_items')
      .where('menu_item_id', menuItemId)
      .andWhere('cart_id', cartId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteCartItem(menuItemId: string, cartId: string) {
    return this.queryBuilder()
      .del()
      .from('cart_items')
      .where('menu_item_id', menuItemId)
      .andWhere('cart_id', cartId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
