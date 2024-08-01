import axios from 'axios';
import { ICreateOrder, IEditOrder } from '../interfaces/order';
import { StateManager } from '../state-management/stateManager';

const baseUrl = 'http://localhost:8000';
const ordersUrl = `/orders`;
const allOrdersUrl = `/orders/all`;
const restaurantOrdersUrl = `/orders/restaurant`;

export const fetchAllOrders = async () => {
  return await axios.get(`${baseUrl}${allOrdersUrl}`).then((res) => {
    return res.data;
  });
};
export const fetchUserOrders = async (userID?: string) => {
  return await axios
    .get(`${baseUrl}${ordersUrl}`, {
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
export const fetchRestaurantOrders = async (userID?: string) => {
  return await axios
    .get(`${baseUrl}${restaurantOrdersUrl}`, {
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
export const createOrder = async (orderData: ICreateOrder) => {
  return await axios
    .post(`${baseUrl}${ordersUrl}`, orderData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editOrder = async (orderData: IEditOrder, orderId: string) => {
  return await axios
    .patch(`${baseUrl}${ordersUrl}/${orderId}`, orderData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteOrder = async (orderId: string) => {
  return await axios
    .delete(`${baseUrl}${ordersUrl}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
