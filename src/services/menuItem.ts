import MenuItemModel from '../models/menuItem';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import IMenuItem, {
  ICreateMenuItem,
  IEditMenuItem,
} from '../interfaces/menuItem';
import OrderItemService from './orderItem';
import MinioService from './minio';
import { BaseError } from '../error/baseError';

export default class MenuItemService {
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
          // intentionally left blank
        }
        return menuItem;
      }),
    );
    return newData;
  }

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
      // intentionally left blank
    }

    return menuItem;
  }

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
          // intentionally left blank
        }
        return menuItem;
      }),
    );
    return newData;
  }

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
          // intentionally left blank
        }
        return menuItem;
      }),
    );
    return newData;
  }
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

  static async deleteMenuItem(menuItemId: string) {
    const menuItemToBeDeleted = await MenuItemService.getMenuItem(menuItemId);
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
