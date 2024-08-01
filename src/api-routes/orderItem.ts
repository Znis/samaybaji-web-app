import axios from 'axios';
import { ICreateOrderItem, IEditOrderItem } from '../interfaces/orderItem';
import { StateManager } from '../state-management/stateManager';

const baseUrl = 'http://localhost:8000';
const createOrderItemUrl = `/order-item/add`;
const editOrderItemUrl = `/order-item/edit`;
const deleteOrderItemUrl = `/order-item/delete`;

export const createOrderItem = async (
  orderItemData: ICreateOrderItem,
  userID: string,
) => {
  return await axios
    .post(`${baseUrl}${createOrderItemUrl}`, orderItemData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        userID: userID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editOrderItem = async (
  orderItemData: IEditOrderItem,
  orderItemID?: string,
) => {
  return await axios
    .patch(`${baseUrl}${editOrderItemUrl}`, orderItemData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        orderItemID: orderItemID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteOrderitem = async (orderItemID?: string) => {
  return await axios
    .delete(`${baseUrl}${deleteOrderItemUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        orderItemID: orderItemID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
