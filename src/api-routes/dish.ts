import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateDish, IEditDish } from '../interfaces/dish';

const baseUrl = 'http://localhost:8000';
const allDishUrl = `/dish/all`;
const dishUrl = `/dish`;
const dishUrlWithMenuItemId = `/dish/menu-item-id`;

export const fetchAllDishes = async () => {
  return await axios.get(`${baseUrl}${allDishUrl}`).then((res) => {
    return res.data;
  });
};
export const fetchDishByMenuItemId = async (menuItemId: string) => {
  return await axios
    .get(`${baseUrl}${dishUrlWithMenuItemId}/${menuItemId}`)
    .then((res) => {
      return res.data;
    });
};
export const fetchDish = async (dishId: string) => {
  return await axios.get(`${baseUrl}${dishUrl}/${dishId}`).then((res) => {
    return res.data;
  });
};

export const createDish = async (dishData: ICreateDish, menuItemId: string) => {
  return await axios
    .post(`${baseUrl}${dishUrl}/${menuItemId}`, dishData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editDish = async (editDishData: IEditDish, dishId: string) => {
  return await axios
    .patch(`${baseUrl}${dishUrl}/${dishId}`, editDishData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteDish = async (dishId: string) => {
  return await axios
    .delete(`${baseUrl}${dishUrl}/${dishId}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
