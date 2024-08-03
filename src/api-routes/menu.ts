import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateMenu, IEditMenu } from '../interfaces/menu';
import { baseUrl } from './base';

const menuUrl = '/menus/all';
const restaurantMenu = '/menus';

export const fetchAllMenus = async () => {
  return await axios.get(`${baseUrl}${menuUrl}`).then((res) => {
    return res.data;
  });
};
export const fetchRestaurantMenu = async (restaurantId?: string) => {
  return await axios
    .get(`${baseUrl}${restaurantMenu}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        restaurantId: restaurantId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const createMenu = async (
  menuData: ICreateMenu,
  restaurantId?: string,
) => {
  return await axios
    .post(`${baseUrl}${restaurantMenu}`, menuData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        restaurantId: restaurantId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editMenu = async (editMenuData: IEditMenu, menuId?: string) => {
  return await axios
    .patch(`${baseUrl}${restaurantMenu}`, editMenuData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        menuId: menuId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteMenu = async (menuId?: string) => {
  return await axios
    .delete(`${baseUrl}${restaurantMenu}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        menuId: menuId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
