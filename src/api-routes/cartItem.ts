import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateCartItemData, IEditCartItemData } from '../interfaces/cartItem';

const baseUrl = 'http://localhost:8000';
const cartUrl = '/carts';
const cartItemsUrl = '/cart-items';
const addCartItemUrl = `${cartItemsUrl}/add`;
const removeCartItemUrl = `${cartItemsUrl}/delete`;
const editCartItemUrl = `${cartItemsUrl}/edit`;

export const removeCartItem = async (menuItemID: string) => {
  return await axios
    .delete(`${baseUrl}${removeCartItemUrl}`, {
      params: { menuItemID: menuItemID },
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editCartItem = async (
  menuItemID: string,
  editCartItemData: IEditCartItemData,
) => {
  return await axios
    .patch(
      `${baseUrl}${editCartItemUrl}`,
      { quantity: editCartItemData.quantity },
      {
        params: { menuItemID: menuItemID },

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
