import IRestaurant, {
  ICreateRestaurantData,
  IEditRestaurantData,
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
  static getRestaurantByUserEmail(email: string) {
    return this.queryBuilder()
      .select('restaurants.*')
      .from('restaurants')
      .join('users', 'restaurants.user_id', 'users.id')
      .where('users.email', email)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createRestaurant(userID: string, restaurant: ICreateRestaurantData) {
    return this.queryBuilder()
      .insert({ ...restaurant, userId: userID })
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
    userID: string,
    editRestaurantData: IEditRestaurantData,
  ) {
    return this.queryBuilder()
      .update(editRestaurantData)
      .from('restaurants')
      .where('user_id', userID)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteRestaurant(userID: string) {
    return this.queryBuilder()
      .del()
      .from('restaurants')
      .where('user_id', userID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
