import DishModel from '../models/dish';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ICreateDish, IDish, IEditDish } from '../interfaces/dish';

const logger = loggerWithNameSpace('Dish Service');
export default class DishServices {
  static async getAllDishes() {
    const dishes = await DishModel.getAllDishes();
    if (!dishes) {
      return null;
    }
    logger.info('All Dishes Found');
    return dishes;
  }
  static async getDish(menuItemID: string) {
    const dish = await DishModel.getDish(menuItemID);
    if (!dish) {
      logger.error(`Dish with menuItemID ${menuItemID} not found`);
      return null;
    }
    logger.info(`Dish with menuItemID ${menuItemID} found`);
    return dish;
  }

  static async createDish(menuItemID: string, dishData: ICreateDish) {
    const queryResult = await DishModel.createDish(menuItemID, dishData)!;
    if (!queryResult) {
      logger.error('Could not create new dish');
      throw new ModelError('Could not create dish');
    }
    logger.info(`New dish for menuItemID ${menuItemID} created`);
    return { ...dishData, id: queryResult.id } as IDish;
  }

  static async editDish(dishID: string, editDishData: IEditDish) {
    const queryResult = await DishModel.editDish(dishID, editDishData)!;
    if (!queryResult) {
      logger.error(`Could not edit dish with dishID ${dishID}`);
      throw new ModelError('Could not edit Dish');
    }
    logger.info(`Dish with dishID ${queryResult.id} updated`);

    return {
      ...editDishData,
      id: dishID,
    } as IDish;
  }

  static async deleteDish(dishID: string) {
    const queryResult = await DishModel.deleteDish(dishID)!;
    if (!queryResult) {
      logger.error(`Could not delete dish with dishID ${dishID}`);
      throw new ModelError('Could not delete Dish');
    }
    logger.info(`Dish with dishID ${dishID} deleted`);

    return true;
  }
}
