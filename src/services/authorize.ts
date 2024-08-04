import AuthorizationModel from '../models/authorize';
import loggerWithNameSpace from '../utils/logger';
import CartServices from './cart';
import MenuServices from './menu';
import RestaurantServices from './restaurant';

const logger = loggerWithNameSpace('Authorization Service');

export default class AuthorizationService {
  /**
   * Retrieves the role ID associated with the given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {string | null} The role ID, or null if the role is not found.
   */
  static async getRoleId(userId: string) {
    const data = await AuthorizationModel.getRoleId(userId);
    if (!data) {
      logger.error(`roleId of userId ${userId} not found`);
      return null;
    }
    logger.info(`roleId of userId ${userId} found`);
    return data.roleId;
  }

  /**
   * Retrieves the assigned permissions for a given role ID.
   *
   * @param {string} roleId - The ID of the role.
   * @return {Promise<string[] | null>} An array of permission names, or null if the assigned permissions are not found.
   */
  static async getAssignedPermissionsForRole(roleId: string) {
    const data = await AuthorizationModel.getAssignedPermissionsForRole(roleId);
    if (!data) {
      logger.error(`Assigned permissions for roleId ${roleId} not found`);
      return null;
    }
    logger.info(`Assigned permissions for roleId ${roleId} found`);
    return data;
  }

  /**
   * Retrieves the assigned permissions for a given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<string[]>} An array of assigned permissions for the user.
   */
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

  /**
   * Retrieves the restaurant ID associated with a given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<string | null>} The ID of the restaurant associated with the user, or null if no restaurant is found.
   */
  static async getRestaurantId(userId: string) {
    const restaurant = await RestaurantServices.getRestaurant(userId);
    if (!restaurant) {
      return null;
    }
    return restaurant.id;
  }
  /**
   * Retrieves the menu ID associated with a given restaurant ID.
   *
   * @param {string} restaurantId - The ID of the restaurant.
   * @return {Promise<string | null>} The menu ID, or null if the menu is not found.
   */
  static async getMenuId(restaurantId: string) {
    const menu = await MenuServices.getMenu(restaurantId);
    if (!menu) {
      return null;
    }
    return menu.id;
  }

  /**
   * Retrieves the ID of the cart associated with the given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<string | null>} - The ID of the cart, or null if no cart is found.
   */
  static async getCartId(userId: string) {
    const cart = await CartServices.getCart(userId);
    if (!cart) {
      return null;
    }
    return cart.id;
  }
}
