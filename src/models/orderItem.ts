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
  static getOrderItem(orderItemId: string) {
    return this.queryBuilder()
      .select('*')
      .from('order_items')
      .where('id', orderItemId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getOrderItemsByOrderId(orderId: string) {
    return this.queryBuilder()
      .select('*')
      .from('order_items')
      .where('order_id', orderId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getOwnOrderItems(restaurantId: string) {
    return this.queryBuilder()
      .select('order_items.*')
      .from('order_items')
      .join('menu_items', 'order_items.menu_item_id', 'menu_items.id')
      .join('menus', 'menu_items.menu_id', 'menus.id')
      .join('restaurants', 'menus.restaurant_id', 'restaurants.id')
      .where('restaurants.id', restaurantId)
      .distinct()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
  static getActiveOrderItemsByMenuItemId(menuItemId: string) {
    return this.queryBuilder()
      .select('*')
      .from('order_items')
      .where('menu_item_id', menuItemId)
      .andWhere(function () {
        this.where('status', 'pending').orWhere('status', 'cooking');
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createOrderItem(orderId: string, orderItemData: ICreateOrderItem[]) {
    return this.queryBuilder()
      .insert(
        orderItemData.map((item) => {
          return {
            orderId: orderId,
            menuItemId: item.menuItemId,
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

  static editOrderItem(orderItemId: string, editOrderItemData: IEditOrderItem) {
    return this.queryBuilder()
      .update(editOrderItemData)
      .from('order_items')
      .where('id', orderItemId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteOrderItem(orderItemId: string) {
    return this.queryBuilder()
      .del()
      .from('order_items')
      .where('id', orderItemId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
