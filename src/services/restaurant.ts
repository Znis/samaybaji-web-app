import RestaurantModel from '../models/restaurant';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IRestaurant, { IEditRestaurantData } from '../interfaces/restaurant';
import UserServices from './users';
import { Roles } from '../enums/roles';

const logger = loggerWithNameSpace('Restaurant Service');
export default class RestaurantServices {
  static async getAllRestaurants() {
    const restaurants = await RestaurantModel.getAllRestaurants();
    if (!restaurants) {
      return null;
    }
    logger.info('All Restaurants Found');
    return restaurants;
  }
  static async getRestaurant(userID: string) {
    const restaurant = await RestaurantModel.getRestaurant(userID);
    if (!restaurant) {
      logger.error(`Restaurant with userID ${userID} not found`);
      return null;
    }
    logger.info(`Restaurant with userID ${userID} found`);
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
    await UserServices.updateRole(userID, Roles.CUSTOMER_WITH_RESTAURANT);
    logger.info(`New restaurant for userID ${userID} created`);
    return { ...restaurant, id: queryResult.id } as IRestaurant;
  }

  static async editRestaurant(
    userID: string,
    editRestaurantData: IEditRestaurantData,
  ) {
    const queryResult = await RestaurantModel.editRestaurant(
      userID,
      editRestaurantData,
    )!;
    if (!queryResult) {
      logger.error(`Could not edit restaurant of userID ${userID}`);
      throw new ModelError('Could not edit Restaurant');
    }
    logger.info(`Restaurant for restaurantID ${queryResult.id} updated`);

    return {
      ...editRestaurantData,
      id: queryResult.id,
    } as IEditRestaurantData;
  }

  static async deleteRestaurant(userID: string) {
    const queryResult = await RestaurantModel.deleteRestaurant(userID)!;
    if (!queryResult) {
      logger.error(`Could not delete restaurant of userID ${userID}`);
      throw new ModelError('Could not delete Restaurant');
    }
    logger.info(`Restaurant of userID ${userID} deleted`);

    return true;
  }
}
