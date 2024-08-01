import { OrderItemStatus } from '../enums/order';
import IMenuItem from './menuItem';

export interface IOrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  status: OrderItemStatus;
  menuItemData: IMenuItem;
}

export interface ICreateOrderItem {
  menuItemId: string;
  quantity: number;
  unitPrice: number;
}

export interface IEditOrderItem {
  quantity?: number;
  unitPrice?: number;
  status?: OrderItemStatus;
}
