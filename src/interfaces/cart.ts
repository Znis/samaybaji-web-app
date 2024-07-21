import { menuItemData } from './menu';

export interface cartItemData {
  menuItem: menuItemData;
  quantity: number;
}

export interface cartData {
  cartItems: cartItemData[];
}
