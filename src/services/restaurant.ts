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
  /**
   * Retrieves all restaurants from the database.
   *
   * @return {Promise<IRestaurant[] | null>} An array of all restaurants, or null if no restaurants are found.
   */
  static async getAllRestaurants() {
    const restaurants = await RestaurantModel.getAllRestaurants();
    if (!restaurants) {
      return null;
    }
    logger.info('All Restaurants Found');
    return restaurants;
  }
  /**
   * Retrieves the restaurant information by its ID.
   *
   * @param {string} restaurantId - The ID of the restaurant.
   * @return {Promise<IRestaurant | null>} The restaurant information if found, null otherwise.
   */
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
      restaurant.coverPic = (await MinioService.getReadUrl(
        restaurant.coverPic!,
      )) as string;
    } catch {
      logger.error(`Could not retrive the image for restaurant`);
    }

    logger.info(`Restaurant with restaurantId ${restaurantId} found`);
    return restaurant;
  }
  /**
   * Retrieves a restaurant by its user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<Restaurant | null>} The restaurant object if found, null otherwise.
   */
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
      restaurant.coverPic = (await MinioService.getReadUrl(
        restaurant.coverPic!,
      )) as string;
    } catch {
      logger.error(`Could not retrieve the image for restaurant`);
    }

    logger.info(`Restaurant with userId ${userId} found`);
    return restaurant;
  }

  /**
   * Creates a new restaurant for a given user.
   *
   * @param {string} userId - The ID of the user creating the restaurant.
   * @param {ICreateRestaurant} restaurant - The details of the restaurant to be created.
   * @return {Promise<IRestaurant>} The newly created restaurant with its ID.
   * @throws {ModelError} If the restaurant creation fails.
   */
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

  /**
   * Edits a restaurant in the database with the given ID using the provided data.
   *
   * @param {string} restaurantId - The ID of the restaurant to edit.
   * @param {IEditRestaurant} editRestaurantData - The data to update the restaurant with.
   * @return {Promise<IRestaurant>} A promise that resolves to the updated restaurant object if successful, or throws a ModelError if the edit fails.
   */
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

  /**
   * Deletes a restaurant by its ID.
   *
   * @param {string} restaurantId - The ID of the restaurant to delete.
   * @return {Promise<boolean>} A promise that resolves to `true` if the restaurant was successfully deleted, or rejects with a `ModelError` if the deletion failed.
   */
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
