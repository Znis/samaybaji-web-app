import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateCartItemData, IEditCartItemData } from '../interfaces/cartItem';
import { baseUrl } from './base';

const cartUrl = '/carts';
const cartItemsUrl = '/cart-items';
const addCartItemUrl = `${cartItemsUrl}/add`;
const removeCartItemUrl = `${cartItemsUrl}/delete`;
const editCartItemUrl = `${cartItemsUrl}/edit`;

export const removeCartItem = async (menuItemId: string) => {
  return await axios
    .delete(`${baseUrl}${removeCartItemUrl}`, {
      params: { menuItemId: menuItemId },
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editCartItem = async (
  menuItemId: string,
  editCartItemData: IEditCartItemData,
) => {
  return await axios
    .patch(
      `${baseUrl}${editCartItemUrl}`,
      { quantity: editCartItemData.quantity },
      {
        params: { menuItemId: menuItemId },

        headers: {
          Authorization: `Bearer ${StateManager.state.accessToken}`,
        },
      },
    )
    .then((res) => {
      return res.data;
    });
};

export const addCartItem = async (cartItemData: ICreateCartItemData[]) => {
  return await axios
    .post(`${baseUrl}${addCartItemUrl}`, cartItemData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchCartItems = async () => {
  return await axios
    .get(`${baseUrl}${cartUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
