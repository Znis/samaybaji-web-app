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
  static getCart(userID: string) {
    return this.queryBuilder()
      .select('*')
      .from('carts')
      .where('user_id', userID)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createCart(userID: string) {
    return this.queryBuilder()
      .insert({ userId: userID })
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

  static clearCart(cartID: string) {
    return this.queryBuilder()
      .del()
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
}
