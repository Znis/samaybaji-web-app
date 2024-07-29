import { ICreateMenu, IEditMenu } from '../interfaces/menu';
import { BaseModel } from './base';

export default class MenuModel extends BaseModel {
  static getAllMenus() {
    return this.queryBuilder()
      .select('*')
      .from('menus')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getMenu(restaurantID: string) {
    return this.queryBuilder()
      .select('*')
      .from('menus')
      .where('restaurant_id', restaurantID)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createMenu(restaurantID: string, menuData: ICreateMenu) {
    return this.queryBuilder()
      .insert({ ...menuData, restaurantId: restaurantID })
      .into('menus')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editMenu(menuID: string, editMenuData: IEditMenu) {
    return this.queryBuilder()
      .update(editMenuData)
      .from('menus')
      .where('id', menuID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteMenu(menuID: string) {
    return this.queryBuilder()
      .del()
      .from('menus')
      .where('id', menuID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
