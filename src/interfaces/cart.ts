import { IMenuItemData } from './menu';

export interface ICartItemData {
  menuItem: IMenuItemData;
  quantity: number;
}
export interface IFormattedCartItemDataForAPI {
  menuItemID: string;
  quantity: number;
}
