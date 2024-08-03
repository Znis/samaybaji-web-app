import RestaurantModel from '../models/restaurant';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IRestaurant, {
  ICreateRestaurant,
  IEditRestaurant,
} from '../interfaces/restaurant';
import UserServices from './users';
import { Roles } from '../enums/roles';
import MinioService from './minio';

const logger = loggerWithNameSpace('Restaurant Service');
export default class RestaurantService {
  static async getAllRestaurants() {
    const restaurants = await RestaurantModel.getAllRestaurants();
    if (!restaurants) {
      return null;
    }
    logger.info('All Restaurants Found');
    return restaurants;
  }
  static async getRestaurantInfo(restaurantId: string) {
    const restaurant = await RestaurantModel.getRestaurantInfo(restaurantId);
    if (!restaurant) {
      logger.error(`Restaurant with restaurantId ${restaurantId} not found`);
      return null;
    }
    try {
      restaurant.profilePic = (await MinioService.getReadUrl(
        restaurant.profilePic!,
      )) as string;
    } catch {
      // intentionally left blank
    }

    try {
      restaurant.coverPic = (await MinioService.getReadUrl(
        restaurant.coverPic!,
      )) as string;
    } catch {
      // intentionally left blank
    }
    logger.info(`Restaurant with restaurantId ${restaurantId} found`);
    return restaurant;
  }
  static async getRestaurant(userId: string) {
    const restaurant = await RestaurantModel.getRestaurant(userId);
    if (!restaurant) {
      logger.error(`Restaurant with userId ${userId} not found`);
      return null;
    }
    try {
      restaurant.profilePic = (await MinioService.getReadUrl(
        restaurant.profilePic!,
      )) as string;
    } catch {
      // intentionally left blank
    }
    try {
      restaurant.coverPic = (await MinioService.getReadUrl(
        restaurant.coverPic!,
      )) as string;
    } catch {
      // intentionally left blank
    }

    logger.info(`Restaurant with userId ${userId} found`);
    return restaurant;
  }

  static async createRestaurant(userId: string, restaurant: ICreateRestaurant) {
    const queryResult = await RestaurantModel.createRestaurant(
      userId,
      restaurant,
    )!;
    if (!queryResult) {
      logger.error('Could not create new restaurant');
      throw new ModelError('Could not create restaurant');
    }
    await UserServices.updateRole(userId, Roles.CUSTOMER_WITH_RESTAURANT);
    logger.info(`New restaurant for userId ${userId} created`);
    return { ...restaurant, id: queryResult.id } as IRestaurant;
  }

  static async editRestaurant(
    restaurantId: string,
    editRestaurantData: IEditRestaurant,
  ) {
    const queryResult = await RestaurantModel.editRestaurant(
      restaurantId,
      editRestaurantData,
    )!;
    if (!queryResult) {
      logger.error(
        `Could not edit restaurant with restaurantId ${restaurantId}`,
      );
      throw new ModelError('Could not edit Restaurant');
    }
    logger.info(`Restaurant with restaurantId ${queryResult.id} updated`);

    return {
      ...editRestaurantData,
      id: restaurantId,
    } as IRestaurant;
  }

  static async deleteRestaurant(restaurantId: string) {
    const queryResult = await RestaurantModel.deleteRestaurant(restaurantId)!;
    if (!queryResult) {
      logger.error(
        `Could not delete restaurant with restaurantId ${restaurantId}`,
      );
      throw new ModelError('Could not delete Restaurant');
    }
    logger.info(`Restaurant with restaurantId ${restaurantId} deleted`);

    return true;
  }
}
