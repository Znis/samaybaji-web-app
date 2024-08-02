import DishModel from '../models/dish';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ICreateDish, IDish, IEditDish } from '../interfaces/dish';

const logger = loggerWithNameSpace('Dish Service');
export default class DishService {
  static async getAllDishes() {
    const dishes = await DishModel.getAllDishes();
    if (!dishes) {
      return null;
    }
    logger.info('All Dishes Found');
    return dishes;
  }
  static async getDishByMenuItemId(menuItemId: string) {
    const dish = await DishModel.getDishByMenuItemId(menuItemId);
    if (!dish) {
      logger.error(`Dish with menuItemId ${menuItemId} not found`);
      return null;
    }
    logger.info(`Dish with menuItemId ${menuItemId} found`);
    return dish;
  }
  static async getDish(dishId: string) {
    const dish = await DishModel.getDish(dishId);
    if (!dish) {
      logger.error(`Dish with dishId ${dishId} not found`);
      return null;
    }
    logger.info(`Dish with dishId ${dishId} found`);
    return dish;
  }

  static async createDish(dishId: string, dishData: ICreateDish) {
    const queryResult = await DishModel.createDish(dishId, dishData)!;
    if (!queryResult) {
      logger.error('Could not create new dish');
      throw new ModelError('Could not create dish');
    }
    logger.info(`New dish for dishId ${dishId} created`);
    return { ...dishData, id: queryResult.id } as IDish;
  }

  static async editDish(dishId: string, editDishData: IEditDish) {
    const queryResult = await DishModel.editDish(dishId, editDishData)!;
    if (!queryResult) {
      logger.error(`Could not edit dish with dishId ${dishId}`);
      throw new ModelError('Could not edit Dish');
    }
    logger.info(`Dish with dishId ${queryResult.id} updated`);

    return {
      ...editDishData,
      id: dishId,
    } as IDish;
  }

  static async deleteDish(dishId: string) {
    const queryResult = await DishModel.deleteDish(dishId)!;
    if (!queryResult) {
      logger.error(`Could not delete dish with dishId ${dishId}`);
      throw new ModelError('Could not delete Dish');
    }
    logger.info(`Dish with dishId ${dishId} deleted`);

    return true;
  }
}
