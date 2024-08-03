import axios from 'axios';
import { ICreateOrderItem, IEditOrderItem } from '../interfaces/orderItem';
import { StateManager } from '../state-management/stateManager';
import { baseUrl } from './base';

const orderItemUrl = '/order-items';

export const createOrderItem = async (
  orderItemData: ICreateOrderItem,
  userId: string,
) => {
  return await axios
    .post(`${baseUrl}${orderItemUrl}`, orderItemData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        userId: userId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editOrderItem = async (
  orderItemData: IEditOrderItem,
  orderItemId: string,
) => {
  return await axios
    .patch(`${baseUrl}${orderItemUrl}/${orderItemId}`, orderItemData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteOrderitem = async (orderItemId: string) => {
  return await axios
    .delete(`${baseUrl}${orderItemUrl}/${orderItemId}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
