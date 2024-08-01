import axios from 'axios';
import { ICreateOrder, IEditOrder } from '../interfaces/order';
import { StateManager } from '../state-management/stateManager';

const baseUrl = 'http://localhost:8000';
const ordersUrl = `/orders/all`;
const restaurantOrdersUrl = `/orders/`;
const userOrdersUrl = `/orders/`;
const createOrderUrl = `/orders/create`;
const editOrderUrl = `/orders/edit`;
const deleteOrderUrl = `/orders/delete`;

export const fetchAllOrders = async () => {
  return await axios.get(`${baseUrl}${ordersUrl}`).then((res) => {
    return res.data;
  });
};
export const fetchUserOrders = async (userID?: string) => {
  return await axios
    .get(`${baseUrl}${userOrdersUrl}`, {
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
    .post(`${baseUrl}${createOrderUrl}`, orderData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editOrder = async (orderData: IEditOrder, orderID?: string) => {
  return await axios
    .post(`${baseUrl}${editOrderUrl}`, orderData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        orderID: orderID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteOrder = async (orderID?: string) => {
  return await axios
    .post(`${baseUrl}${deleteOrderUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        orderID: orderID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
