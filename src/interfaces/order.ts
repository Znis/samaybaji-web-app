import { OrderStatus } from '../enums/order';
import { ICreateOrderItem, IOrderItem } from './orderItem';
export interface IOrder {
  id: string;
  customerPhone: string;
  deliveryAddress: string;
  customerName: string;
  notes: string;
  orderDate: string;
  orderTime: string;
  userID: string;
  status: OrderStatus;
  totalAmount: number;
  subTotalAmount: number;
  deliveryAmount: number;
  paymentMethod: string;
  orderItems: IOrderItem[];
}
export interface ICreateOrder {
  customerPhone: string;
  deliveryAddress: string;
  customerName: string;
  notes: string;
  orderDate: string;
  orderTime: string;
  totalAmount: number;
  subTotalAmount: number;
  deliveryAmount: number;
  paymentMethod: string;
  orderItems: ICreateOrderItem[];
}
export interface IEditOrder {
  customerPhone?: string;
  deliveryAddress?: string;
  customerName?: string;
  notes?: string;
  orderDate?: string;
  orderTime?: string;
  status?: OrderStatus;
  totalAmount?: number;
  subTotalAmount?: number;
  deliveryAmount?: number;
  paymentMethod?: string;
  orderItems?: ICreateOrderItem[];
}
