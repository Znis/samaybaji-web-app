import DishModel from '../models/dish';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ICreateDish, IDish, IEditDish } from '../interfaces/dish';
import MinioService from './minio';

export default class DishService {
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
          // intentionally left blank
        }
        return dish;
      }),
    );
    return newData;
  }
  static async getDishByMenuItemId(menuItemId: string) {
    const dish = await DishModel.getDishByMenuItemId(menuItemId);
    console.log(dish);
    if (!dish) {
      return null;
    }
    try {
      dish.imgSrc = (await MinioService.getReadUrl(dish.imgSrc!)) as string;
    } catch {
      // intentionally left blank
    }
    return dish;
  }
  static async getDish(dishId: string) {
    const dish = await DishModel.getDish(dishId);
    if (!dish) {
      return null;
    }
    try {
      dish.imgSrc = (await MinioService.getReadUrl(dish.imgSrc!)) as string;
    } catch {
      // intentionally left blank
    }

    return dish;
  }

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

  static async deleteDish(dishId: string) {
    const queryResult = await DishModel.deleteDish(dishId)!;
    if (!queryResult) {
      throw new ModelError('Could not delete Dish');
    }
    return true;
  }
}
