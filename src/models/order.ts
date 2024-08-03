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
  static getOrder(orderId: string) {
    return this.queryBuilder()
      .select('*')
      .from('orders')
      .where('id', orderId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static getOrdersByUserId(userId: string) {
    return this.queryBuilder()
      .select('*')
      .from('orders')
      .where('user_id', userId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static getOrdersByRestaurantId(restaurantId: string) {
    return this.queryBuilder()
      .select('orders.*')
      .distinct()
      .from('orders')
      .join('order_items', 'orders.id', 'order_items.order_id')
      .join('menu_items', 'order_items.menu_item_id', 'menu_items.id')
      .join('menus', 'menu_items.menu_id', 'menus.id')
      .join('restaurants', 'menus.restaurant_id', 'restaurants.id')
      .where('restaurants.id', restaurantId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createOrder(userId: string, orderData: ICreateOrderDetails) {
    return this.queryBuilder()
      .insert({ ...orderData, userId: userId })
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
  static editOrder(orderId: string, editOrderData: IEditOrderDetails) {
    return this.queryBuilder()
      .update(editOrderData)
      .into('orders')
      .where('id', orderId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static deleteOrder(orderId: string) {
    return this.queryBuilder()
      .del()
      .from('orders')
      .where('id', orderId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
