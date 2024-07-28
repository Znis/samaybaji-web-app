import { OrderStatus } from '../enums/order';

export interface IOrder {
  id: string;
  phoneNumber: string;
  deliveryAddress: string;
  customerName: string;
  notes: string;
  orderDate: string;
  orderTime: string;
  userID: string;
  status: OrderStatus;
  totalAmount: number;
  discountAmount: number;
  deliveryAmount: number;
  paymentMethod: string;
}

export interface ICreateOrder {
  phoneNumber: string;
  deliveryAddress: string;
  customerName: string;
  notes: string;
  orderDate: string;
  orderTime: string;
  status: OrderStatus;
  totalAmount: number;
  discountAmount: number;
  deliveryAmount: number;
  paymentMethod: string;
}
export interface IEditOrder {
  phoneNumber?: string;
  deliveryAddress?: string;
  customerName?: string;
  notes?: string;
  orderDate?: string;
  orderTime?: string;
  status?: OrderStatus;
  totalAmount?: number;
  discountAmount?: number;
  deliveryAmount?: number;
  paymentMethod?: string;
}
