import { OrderItemStatus } from '../enums/order';

export interface IOrderItem {
  id: string;
  orderID: string;
  menuItemID: string;
  quantity: number;
  unitPrice: number;
  status: OrderItemStatus;
}

export interface ICreateOrderItem {
  menuItemID: string;
  quantity: number;
  unitPrice: number;
}

export interface IEditOrderItem {
  quantity?: number;
  unitPrice?: number;
  status?: OrderItemStatus;
}
