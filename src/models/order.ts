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

  static getOrdersByRestaurantID(restaurantID: string) {
    return this.queryBuilder()
      .select('orders.*')
      .from('orders')
      .join('order_items', 'orders.id', 'order_items.order_id')
      .join('menu_items', 'order_items.menu_item_id', 'menu_items.id')
      .join('menus', 'menu_items.menu_id', 'menus.id')
      .join('restaurants', 'menus.restaurant_id', 'restaurants.id')
      .where('restaurants.id', restaurantID)
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
