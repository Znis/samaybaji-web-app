import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateDish, IEditDish } from '../interfaces/dish';

const baseUrl = 'http://localhost:8000';
const allDishUrl = `/dishes/all`;
const dishUrl = `/dishes`;
const createDishUrl = `/dishes/create`;
const editDishUrl = `/dishes/edit`;
const deleteDishUrl = `/dishes/delete`;

export const fetchAllDishes = async () => {
  return await axios.get(`${baseUrl}${allDishUrl}`).then((res) => {
    return res.data;
  });
};
export const fetchDish = async (menuItemId: string) => {
  return await axios.get(`${baseUrl}${dishUrl}/${menuItemId}`).then((res) => {
    return res.data;
  });
};

export const createDish = async (dishData: ICreateDish, menuItemId: string) => {
  return await axios
    .post(`${baseUrl}${createDishUrl}`, dishData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        menuItemId: menuItemId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editDish = async (editDishData: IEditDish, dishId: string) => {
  return await axios
    .patch(`${baseUrl}${editDishUrl}`, editDishData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        dishId: dishId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteDish = async (dishId: string) => {
  return await axios
    .delete(`${baseUrl}${deleteDishUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        dishId: dishId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
