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

  static createCartItem(cartID: string, cartItemData: ICreateCartItemData) {
    return this.queryBuilder()
      .insert({ ...cartItemData, cartId: cartID })
      .into('cart_items')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editCartItem(cartItemID: string, editCartItemData: IEditCartItemData) {
    return this.queryBuilder()
      .update(editCartItemData)
      .from('cart_items')
      .where('id', cartItemID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteCartItem(cartItemID: string) {
    return this.queryBuilder()
      .del()
      .from('cart_items')
      .where('id', cartItemID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
