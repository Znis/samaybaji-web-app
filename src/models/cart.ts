import { BaseModel } from './base';

export default class MenuModel extends BaseModel {
  static getAllCarts() {
    return this.queryBuilder()
      .select('*')
      .from('carts')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getCart(userId: string) {
    return this.queryBuilder()
      .select('*')
      .from('carts')
      .where('user_id', userId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createCart(userId: string) {
    return this.queryBuilder()
      .insert({ userId: userId })
      .into('carts')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static clearCart(cartId: string) {
    return this.queryBuilder()
      .del()
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
}
