import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateMenuItem, IEditMenuItem } from '../interfaces/menuItem';

const baseUrl = 'http://localhost:8000';
const menuItemsUrl = `/menu-items`;
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
export const createMenuItem = async (createMenuItemData: ICreateMenuItem) => {
  return await axios
    .post(`${baseUrl}${menuItemsUrl}`, createMenuItemData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
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
    .patch(`${baseUrl}${menuItemsUrl}/${menuItemId}`, editMenuItemData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteMenuItem = async (menuItemId: string) => {
  return await axios
    .delete(`${baseUrl}${menuItemsUrl}/${menuItemId}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
