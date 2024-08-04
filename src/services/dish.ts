import DishModel from '../models/dish';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ICreateDish, IDish, IEditDish } from '../interfaces/dish';
import MinioService from './minio';

const logger = loggerWithNameSpace('Dish Service');
export default class DishService {
  /**
   * Retrieves all dishes from the database and returns their information, including the image URL.
   *
   * @return {Promise<IDish[] | null>} An array of dish objects with the image URL or null if no dishes are found.
   */
  static async getAllDishes() {
    const dishes = await DishModel.getAllDishes();
    if (!dishes) {
      return null;
    }
    const newData = await Promise.all(
      dishes.map(async (dish: IDish) => {
        try {
          dish.imgSrc = (await MinioService.getReadUrl(dish.imgSrc!)) as string;
        } catch {
          logger.error(`Could not retrive the image of dish`);
        }
        return dish;
      }),
    );
    return newData;
  }
  /**
   * Retrieves a dish based on the provided menu item ID and its image source URL.
   *
   * @param {string} menuItemId - The ID of the menu item to retrieve the dish for.
   * @return {Promise<any>} The dish object with the updated image source URL or null if no dish is found.
   */
  static async getDishByMenuItemId(menuItemId: string) {
    const dish = await DishModel.getDishByMenuItemId(menuItemId);
    console.log(dish);
    if (!dish) {
      return null;
    }
    try {
      dish.imgSrc = (await MinioService.getReadUrl(dish.imgSrc!)) as string;
    } catch {
      logger.error(`Could not retrive the image of dish`);
    }
    return dish;
  }
  /**
   * Retrieves a dish based on the provided dish ID and its image source URL.
   *
   * @param {string} dishId - The ID of the dish to retrieve.
   * @return {Promise<Dish | null>} The dish object with the image source URL, or null if no dish is found.
   */
  static async getDish(dishId: string) {
    const dish = await DishModel.getDish(dishId);
    if (!dish) {
      return null;
    }
    try {
      dish.imgSrc = (await MinioService.getReadUrl(dish.imgSrc!)) as string;
    } catch {
      logger.error(`Could not retrive the image of dish`);
    }

    return dish;
  }

  /**
   * Creates a new dish in the 'dishes' table with the provided data.
   *
   * @param {string} menuItemId - The ID of the menu item.
   * @param {string} restaurantId - The ID of the restaurant.
   * @param {string} menuId - The ID of the menu.
   * @param {ICreateDish} dishData - The data of the dish to be created.
   * @return {Promise<IDish>} A promise that resolves to the created dish with the ID added.
   * @throws {ModelError} If the dish could not be created.
   */
  static async createDish(
    menuItemId: string,
    restaurantId: string,
    menuId: string,
    dishData: ICreateDish,
  ) {
    const queryResult = await DishModel.createDish(
      menuItemId,
      restaurantId,
      menuId,
      dishData,
    )!;
    if (!queryResult) {
      throw new ModelError('Could not create dish');
    }
    return { ...dishData, id: queryResult.id } as IDish;
  }

  /**
   * Edits a dish with the provided ID and data.
   *
   * @param {string} dishId - The ID of the dish to edit.
   * @param {IEditDish} editDishData - The data to update the dish with.
   * @return {IDish} The edited dish object.
   */
  static async editDish(dishId: string, editDishData: IEditDish) {
    const queryResult = await DishModel.editDish(dishId, editDishData)!;
    if (!queryResult) {
      throw new ModelError('Could not edit Dish');
    }

    return {
      ...editDishData,
      id: dishId,
    } as IDish;
  }

  /**
   * Deletes a dish with the provided ID.
   *
   * @param {string} dishId - The ID of the dish to delete.
   * @return {Promise<boolean>} A promise that resolves to `true` if the dish was successfully deleted.
   * @throws {ModelError} If the dish could not be deleted.
   */
  static async deleteDish(dishId: string) {
    const queryResult = await DishModel.deleteDish(dishId)!;
    if (!queryResult) {
      throw new ModelError('Could not delete Dish');
    }
    return true;
  }
}
