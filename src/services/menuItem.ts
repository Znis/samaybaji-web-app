import MenuItemModel from '../models/menuItem';
import { ModelError } from '../error/modelError';
import IMenuItem, {
  ICreateMenuItem,
  IEditMenuItem,
} from '../interfaces/menuItem';
import OrderItemService from './orderItem';
import MinioService from './minio';
import { BaseError } from '../error/baseError';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Menu Item Service');

export default class MenuItemService {
  /**
   * Retrieves all menu items and their image sources using MinioService.
   *
   * @return {Promise<IMenuItem[]>} A promise that resolves to an array of menu items with image sources.
   */
  static async getAllMenuItems() {
    const menuItems = await MenuItemModel.getAllMenuItems();
    if (!menuItems) {
      return null;
    }
    const newData = await Promise.all(
      menuItems.map(async (menuItem: IMenuItem) => {
        try {
          menuItem.imageSrc = (await MinioService.getReadUrl(
            menuItem.imageSrc!,
          )) as string;
        } catch {
          logger.error(`Could not retrive the image of menu item`);
        }
        return menuItem;
      }),
    );
    return newData;
  }

  /**
   * Retrieves a single menu item by its ID and its image source using MinioService.
   *
   * @param {string} menuItemId - The ID of the menu item to retrieve.
   * @return {IMenuItem|null} The retrieved menu item with image source, or null if not found.
   */
  static async getMenuItem(menuItemId: string) {
    const menuItem = await MenuItemModel.getMenuItem(menuItemId);
    if (!menuItem) {
      return null;
    }
    try {
      menuItem.imageSrc = (await MinioService.getReadUrl(
        menuItem.imageSrc!,
      )) as string;
    } catch {
      logger.error(`Could not retrive the image of menu item`);
    }

    return menuItem;
  }

  /**
   * Retrieves menu items by their menu ID and their image sources using MinioService.
   *
   * @param {string} menuId - The ID of the menu to retrieve menu items from.
   * @return {Promise<IMenuItem[]|null>} A promise that resolves to an array of menu items with image sources, or null if no menu items are found.
   */
  static async getMenuItemsByMenuId(menuId: string) {
    const menuItems = await MenuItemModel.getMenuItemsByMenuId(menuId);
    if (!menuItems) {
      return null;
    }
    const newData = await Promise.all(
      menuItems.map(async (menuItem: IMenuItem) => {
        try {
          menuItem.imageSrc = (await MinioService.getReadUrl(
            menuItem.imageSrc!,
          )) as string;
        } catch {
          logger.error(`Could not retrive the image of menu item`);
        }
        return menuItem;
      }),
    );
    return newData;
  }

  /**
   * Retrieves the popular menu items and their image sources using MinioService.
   *
   * @return {Promise<IMenuItem[]|null>} A promise that resolves to an array of popular menu items with updated image sources, or null if no popular menu items are found.
   */
  static async getPopularMenuItems() {
    const popularMenuItems = await MenuItemModel.getPopularMenuItems();
    if (!popularMenuItems) {
      return null;
    }
    const newData = await Promise.all(
      popularMenuItems.map(async (menuItem: IMenuItem) => {
        try {
          menuItem.imageSrc = (await MinioService.getReadUrl(
            menuItem.imageSrc!,
          )) as string;
        } catch {
          logger.error(`Could not retrive the image of menu item`);
        }
        return menuItem;
      }),
    );
    return newData;
  }
  /**
   * Creates a new menu item in the database with the provided menu ID and menu item data.
   *
   * @param {string} menuId - The ID of the menu to associate the new menu item with.
   * @param {ICreateMenuItem} menuItemData - The data of the new menu item.
   * @return {Promise<IMenuItem>} A promise that resolves to the newly created menu item with its ID.
   * @throws {ModelError} If the menu item could not be created in the database.
   */
  static async createMenuItem(menuId: string, menuItemData: ICreateMenuItem) {
    const queryResult = await MenuItemModel.createMenuItem(
      menuId,
      menuItemData,
    )!;
    if (!queryResult) {
      throw new ModelError('Could not create menu item');
    }

    return { ...menuItemData, id: queryResult.id } as IMenuItem;
  }

  /**
   * Edits a menu item in the database with the provided menu item ID and updated data.
   *
   * @param {string} menuItemId - The ID of the menu item to be edited.
   * @param {IEditMenuItem} editMenuItemData - The updated data for the menu item.
   * @return {Promise<IMenuItem>} A promise that resolves to the edited menu item with its ID.
   * @throws {ModelError} If the menu item could not be edited in the database.
   */
  static async editMenuItem(
    menuItemId: string,
    editMenuItemData: IEditMenuItem,
  ) {
    const queryResult = await MenuItemModel.editMenuItem(
      menuItemId,
      editMenuItemData,
    )!;
    if (!queryResult) {
      throw new ModelError('Could not edit Menu item');
    }
    return {
      ...editMenuItemData,
      id: menuItemId,
    } as IMenuItem;
  }

  /**
   * Deletes a menu item from the database with the given menu item ID.
   *
   * @param {string} menuItemId - The ID of the menu item to be deleted.
   * @return {Promise<boolean>} A promise that resolves to `true` if the menu item was successfully deleted.
   * @throws {BaseError} If there are active order items associated with the menu item.
   * @throws {ModelError} If the menu item could not be deleted in the database.
   */
  static async deleteMenuItem(menuItemId: string) {
    const activeOrderItemsCount =
      await OrderItemService.getActiveOrderItemsByMenuItemId(menuItemId);
    if (activeOrderItemsCount) {
      throw new BaseError(
        'Could not delete Menu item due to active order items',
      );
    }
    const queryResult = await MenuItemModel.deleteMenuItem(menuItemId)!;
    if (!queryResult) {
      throw new ModelError('Could not delete Menu item');
    }
    return true;
  }
}
