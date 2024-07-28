import { ICreateDish, IEditDish } from '../interfaces/dish';
import { BaseModel } from './base';

export default class DishModel extends BaseModel {
  static getAllDishes() {
    return this.queryBuilder()
      .select('*')
      .from('dishes')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getDish(menuItemID: string) {
    return this.queryBuilder()
      .select('*')
      .from('dishes')
      .where('menu_item_id', menuItemID)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createDish(menuItemID: string, dishData: ICreateDish) {
    return this.queryBuilder()
      .insert({ ...dishData, menuItemId: menuItemID })
      .into('dishes')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editDish(dishID: string, editDishData: IEditDish) {
    return this.queryBuilder()
      .update(editDishData)
      .from('dishes')
      .where('id', dishID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteDish(dishID: string) {
    return this.queryBuilder()
      .del()
      .from('dishes')
      .where('id', dishID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
