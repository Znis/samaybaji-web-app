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
  static getMenuItem(menuItemID: string) {
    return this.queryBuilder()
      .select('*')
      .from('menu_items')
      .where('id', menuItemID)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getMenuItemsByMenuID(menuID: string) {
    return this.queryBuilder()
      .select('*')
      .from('menu_items')
      .where('menu_id', menuID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createMenuItem(menuID: string, menuItemData: ICreateMenuItem) {
    return this.queryBuilder()
      .insert({ ...menuItemData, menuId: menuID })
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

  static editMenuItem(menuItemID: string, editMenuItemData: IEditMenuItem) {
    return this.queryBuilder()
      .update(editMenuItemData)
      .from('menu_items')
      .where('id', menuItemID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteMenuItem(menuItemID: string) {
    return this.queryBuilder()
      .del()
      .from('menu_items')
      .where('id', menuItemID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
