import { ICreateMenuItem, IEditMenuItem } from '../interfaces/menuItem';
import { BaseModel } from './base';

export default class MenuItemModel extends BaseModel {
  static getAllMenuItems() {
    return this.queryBuilder()
      .select('*')
      .from('menu_items')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static getPopularMenuItems() {
    return this.queryBuilder()
      .select('*')
      .from('menu_items')
      .where('is_popular', true)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getMenuItem(menuItemId: string) {
    return this.queryBuilder()
      .select('*')
      .from('menu_items')
      .where('id', menuItemId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getMenuItemsByMenuId(menuId: string) {
    return this.queryBuilder()
      .select('*')
      .from('menu_items')
      .where('menu_id', menuId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createMenuItem(menuId: string, menuItemData: ICreateMenuItem) {
    return this.queryBuilder()
      .insert({ ...menuItemData, menuId: menuId })
      .into('menu_items')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editMenuItem(menuItemId: string, editMenuItemData: IEditMenuItem) {
    return this.queryBuilder()
      .update(editMenuItemData)
      .from('menu_items')
      .where('id', menuItemId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteMenuItem(menuItemId: string) {
    return this.queryBuilder()
      .del()
      .from('menu_items')
      .where('id', menuItemId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
