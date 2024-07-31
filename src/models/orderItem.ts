import { ICreateOrderItem, IEditOrderItem } from '../interfaces/orderItem';
import { BaseModel } from './base';

export default class OrderItemModel extends BaseModel {
  static getAllOrderItems() {
    return this.queryBuilder()
      .select('*')
      .from('order_items')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getOrderItem(orderItemID: string) {
    return this.queryBuilder()
      .select('*')
      .from('order_items')
      .where('id', orderItemID)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getOrderItemsByOrderID(orderID: string) {
    return this.queryBuilder()
      .select('*')
      .from('order_items')
      .where('order_id', orderID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createOrderItem(orderID: string, orderItemData: ICreateOrderItem[]) {
    return this.queryBuilder()
      .insert(
        orderItemData.map((item) => {
          return {
            orderId: orderID,
            menuItemId: item.menuItemID,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          };
        }),
      )
      .into('order_items')
      .returning('id')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editOrderItem(orderItemID: string, editOrderItemData: IEditOrderItem) {
    return this.queryBuilder()
      .update(editOrderItemData)
      .from('order_items')
      .where('id', orderItemID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteOrderItem(orderItemID: string) {
    return this.queryBuilder()
      .del()
      .from('order_items')
      .where('id', orderItemID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
