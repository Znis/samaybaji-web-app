import IMenuItem from './menuItem';

interface ICartItem {
  id: string;
  menuItemId: string;
  quantity: number;
}
export interface ICreateCartItemData {
  menuItemId: string;
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
