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
  static getMenu(restaurantId: string) {
    return this.queryBuilder()
      .select('*')
      .from('menus')
      .where('restaurant_id', restaurantId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createMenu(restaurantId: string, menuData: ICreateMenu) {
    return this.queryBuilder()
      .insert({ ...menuData, restaurantId: restaurantId })
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

  static editMenu(menuId: string, editMenuData: IEditMenu) {
    return this.queryBuilder()
      .update(editMenuData)
      .from('menus')
      .where('id', menuId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteMenu(menuId: string) {
    return this.queryBuilder()
      .del()
      .from('menus')
      .where('id', menuId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
