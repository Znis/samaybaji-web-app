import { ICreateOrderDetails, IEditOrderDetails } from '../interfaces/order';
import { BaseModel } from './base';

export default class OrderModel extends BaseModel {
  static getAllOrders() {
    return this.queryBuilder()
      .select('*')
      .from('orders')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getOrder(orderID: string) {
    return this.queryBuilder()
      .select('*')
      .from('orders')
      .where('id', orderID)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static getOrdersByUserID(userID: string) {
    return this.queryBuilder()
      .select('*')
      .from('orders')
      .where('user_id', userID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createOrder(userID: string, orderData: ICreateOrderDetails) {
    return this.queryBuilder()
      .insert({ ...orderData, userId: userID })
      .into('orders')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static editOrder(orderID: string, editOrderData: IEditOrderDetails) {
    return this.queryBuilder()
      .update(editOrderData)
      .into('orders')
      .where('id', orderID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static deleteOrder(orderID: string) {
    return this.queryBuilder()
      .del()
      .from('orders')
      .where('id', orderID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
