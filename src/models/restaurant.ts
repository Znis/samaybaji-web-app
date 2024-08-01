import IRestaurant, {
  ICreateRestaurant,
  IEditRestaurant,
} from '../interfaces/restaurant';
import { BaseModel } from './base';

export default class RestaurantModel extends BaseModel {
  static getAllRestaurants() {
    return this.queryBuilder()
      .select('*')
      .from('restaurants')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getRestaurant(userId: string) {
    return this.queryBuilder()
      .select('restaurants.*')
      .from('restaurants')
      .join('users', 'restaurants.user_id', 'users.id')
      .where('users.id', userId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getRestaurantInfo(restaurantId: string) {
    return this.queryBuilder()
      .select('*')
      .from('restaurants')
      .where('id', restaurantId)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createRestaurant(userId: string, restaurant: ICreateRestaurant) {
    return this.queryBuilder()
      .insert({ ...restaurant, userId: userId })
      .into('restaurants')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static editRestaurant(
    restaurantId: string,
    editRestaurantData: IEditRestaurant,
  ) {
    return this.queryBuilder()
      .update(editRestaurantData)
      .from('restaurants')
      .where('id', restaurantId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteRestaurant(restaurantId: string) {
    return this.queryBuilder()
      .del()
      .from('restaurants')
      .where('id', restaurantId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
