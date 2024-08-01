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
export const fetchDish = async (menuItemID: string) => {
  return await axios
    .get(`${baseUrl}${dishUrl}`, { params: { menuItemID: menuItemID } })
    .then((res) => {
      return res.data;
    });
};

export const createDish = async (dishData: ICreateDish, menuItemID: string) => {
  return await axios
    .post(`${baseUrl}${createDishUrl}`, dishData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        menuItemID: menuItemID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editDish = async (editDishData: IEditDish, dishID: string) => {
  return await axios
    .patch(`${baseUrl}${editDishUrl}`, editDishData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        dishID: dishID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteDish = async (dishID: string) => {
  return await axios
    .delete(`${baseUrl}${deleteDishUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        dishID: dishID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
