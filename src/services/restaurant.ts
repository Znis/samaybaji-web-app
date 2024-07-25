import RestaurantModel from '../models/restaurant';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IRestaurant, { IEditRestaurantData } from '../interfaces/restaurant';

const logger = loggerWithNameSpace('Users Service');
const salt = 10;
export default class RestaurantServices {
  static async getAllRestaurants() {
    const restaurants = await RestaurantModel.getAllRestaurants();
    if (!restaurants) {
      return null;
    }
    logger.info('All Restaurants Found');
    return restaurants;
  }
  static async getRestaurantByUserEmail(email: string) {
    const restaurant = await RestaurantModel.getRestaurantByUserEmail(email);
    if (!restaurant) {
      logger.error(`Restaurant with email ${email} not found`);
      return null;
    }
    logger.info(`Restaurant with email ${email} found`);
    return restaurant;
  }

  static async createRestaurant(userID: string, restaurant: IRestaurant) {
    const queryResult = await RestaurantModel.createRestaurant(
      userID,
      restaurant,
    )!;
    if (!queryResult) {
      logger.error('Could not create new restaurant');
      throw new ModelError('Could not create restaurant');
    }

    logger.info(`New restaurant for userID ${userID} created`);
    return { ...restaurant, id: queryResult.id } as IRestaurant;
  }

  static async editRestaurant(
    restaurantID: string,
    editRestaurantData: IEditRestaurantData,
  ) {
    const queryResult = await RestaurantModel.editRestaurant(
      restaurantID,
      editRestaurantData,
    )!;
    if (!queryResult) {
      logger.error(`Could not edit restaurant with id ${restaurantID}`);
      throw new ModelError('Could not edit Restaurant');
    }
    logger.info(`Restaurant for restaurantID ${restaurantID} updated`);

    return {
      ...editRestaurantData,
      id: queryResult.id,
    } as IEditRestaurantData;
  }

  static async deleteRestaurant(restaurantID: string) {
    const queryResult = await RestaurantModel.deleteRestaurant(restaurantID)!;
    if (!queryResult) {
      logger.error(`Could not delete restaurant with id ${restaurantID}`);
      throw new ModelError('Could not delete Restaurant');
    }
    logger.info(`Restaurant with restaurantID ${restaurantID} deleted`);

    return true;
  }
}
