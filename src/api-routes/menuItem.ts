import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateMenuItem, IEditMenuItem } from '../interfaces/menuItem';

const baseUrl = 'http://localhost:8000';
const menuItemsUrl = `/menu-items/`;
const createMenuItemUrl = `/menu-items/create`;
const editMenuItemUrl = `/menu-items/edit`;
const deleteMenuItemUrl = `/menu-items/delete`;
const popularMenuItemsUrl = '/menu-items/popular';

export const fetchAllMenuItems = async () => {
  return await axios.get(`${baseUrl}${menuItemsUrl}`).then((res) => {
    return res.data;
  });
};
export const fetchPopularMenuItems = async () => {
  return await axios.get(`${baseUrl}${popularMenuItemsUrl}`).then((res) => {
    return res.data;
  });
};
export const createMenuItem = async (
  createMenuItemData: ICreateMenuItem,
  menuId?: string,
) => {
  return await axios
    .post(`${baseUrl}${createMenuItemUrl}`, createMenuItemData, {
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
export const editMenuItem = async (
  editMenuItemData: IEditMenuItem,
  menuItemId: string,
) => {
  return await axios
    .patch(`${baseUrl}${editMenuItemUrl}`, editMenuItemData, {
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
export const deleteMenuItem = async (menuItemId: string) => {
  return await axios
    .delete(`${baseUrl}${deleteMenuItemUrl}`, {
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
