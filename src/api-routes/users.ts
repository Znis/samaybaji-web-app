import axios from 'axios';
import { ICreateUser, IUpdateUser } from '../interfaces/users';
import { StateManager } from '../state-management/stateManager';

const baseUrl = 'http://localhost:8000';
const usersUrl = '/users';
const allUsersUrl = '/users/all';
const userRoleUrl = '/users/role';

export const fetchAllUsers = async () => {
  return await axios
    .get(`${baseUrl}${allUsersUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchUser = async (userId: string) => {
  const designatedUrl = userId
    ? `${baseUrl}${usersUrl}/?userId=${userId}`
    : `${baseUrl}${usersUrl}`;
  return await axios
    .get(designatedUrl, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchRoleId = async (userId: string) => {
  return await axios
    .get(`${baseUrl}${userRoleUrl}/?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const register = async (formData: ICreateUser) => {
  return await axios.post(`${baseUrl}${usersUrl}`, formData).then((res) => {
    return res.data;
  });
};
export const editUser = async (formData: IUpdateUser, userId?: string) => {
  return await axios
    .patch(`${baseUrl}${usersUrl}`, formData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        userId: userId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteUser = async (userId?: string) => {
  return await axios
    .delete(`${baseUrl}${usersUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        userId: userId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
