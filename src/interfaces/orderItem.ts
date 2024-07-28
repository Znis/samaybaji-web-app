import { OrderItemStatus } from '../enums/order';

export interface IOrderItem {
  id: string;
  orderID: string;
  menuItemID: string;
  quantity: number;
  unitPrice: number;
  status: OrderItemStatus;
  notes: string;
}

export interface ICreateOrderItem {
  orderID: string;
  menuItemID: string;
  quantity: number;
  unitPrice: number;
  status: OrderItemStatus;
  notes: string;
}

export interface IEditOrderItem {
  quantity?: number;
  unitPrice?: number;
  status?: OrderItemStatus;
  notes?: string;
}
