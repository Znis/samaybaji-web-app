import { ICreateCartItemData, IEditCartItemData } from '../interfaces/cartItem';
import { BaseModel } from './base';

export default class CartItemModel extends BaseModel {
  static getCartItemsByCartID(cartID: string) {
    return this.queryBuilder()
      .select('*')
      .from('cart_items')
      .where('cart_id', cartID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static createCartItem(cartID: string, cartItemData: ICreateCartItemData[]) {
    return this.queryBuilder()
      .insert(
        cartItemData.map((item) => {
          return {
            menuItemId: item.menuItemID,
            quantity: item.quantity,
            cartId: cartID,
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
    menuItemID: string,
    cartID: string,
    editCartItemData: IEditCartItemData,
  ) {
    return this.queryBuilder()
      .update(editCartItemData)
      .from('cart_items')
      .where('menu_item_id', menuItemID)
      .andWhere('cart_id', cartID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteCartItem(menuItemID: string, cartID: string) {
    return this.queryBuilder()
      .del()
      .from('cart_items')
      .where('menu_item_id', menuItemID)
      .andWhere('cart_id', cartID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
