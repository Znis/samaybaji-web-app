import IMenuItem from './menuItem';

interface ICartItem {
  id: string;
  menuItemID: string;
  quantity: number;
}
export interface ICreateCartItemData {
  menuItemID: string;
  quantity: number;
}
export interface IEditCartItemData {
  quantity: number;
}
export interface IFormattedCartItemData {
  menuItemData: IMenuItem;
  quantity: number;
}
export default ICartItem;
