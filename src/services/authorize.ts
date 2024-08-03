import AuthorizationModel from '../models/authorize';
import loggerWithNameSpace from '../utils/logger';
import CartServices from './cart';
import MenuServices from './menu';
import RestaurantServices from './restaurant';

const logger = loggerWithNameSpace('Authorization Service');

export default class AuthorizationService {
  static async getRoleId(userId: string) {
    const data = await AuthorizationModel.getRoleId(userId);
    if (!data) {
      logger.error(`roleId of userId ${userId} not found`);
      return null;
    }
    logger.info(`roleId of userId ${userId} found`);
    return data.roleId;
  }

  static async getAssignedPermissionsForRole(roleId: string) {
    const data = await AuthorizationModel.getAssignedPermissionsForRole(roleId);
    if (!data) {
      logger.error(`Assigned permissions for roleId ${roleId} not found`);
      return null;
    }
    logger.info(`Assigned permissions for roleId ${roleId} found`);
    return data;
  }

  static async getAssignedPermission(userId: string) {
    const roleId = await this.getRoleId(userId);
    if (!roleId!) {
      logger.error(`roleId for userId ${userId} not found`);
      return [];
    }
    const permissions = await this.getAssignedPermissionsForRole(roleId!);
    if (!permissions!) {
      logger.error(`No any permission for user with userId ${userId}`);
      return [];
    }
    return permissions!;
  }

  static async getRestaurantId(userId: string) {
    const restaurant = await RestaurantServices.getRestaurant(userId);
    if (!restaurant) {
      return null;
    }
    return restaurant.id;
  }
  static async getMenuId(restaurantId: string) {
    const menu = await MenuServices.getMenu(restaurantId);
    if (!menu) {
      return null;
    }
    return menu.id;
  }

  static async getCartId(userId: string) {
    const cart = await CartServices.getCart(userId);
    if (!cart) {
      return null;
    }
    return cart.id;
  }
}
