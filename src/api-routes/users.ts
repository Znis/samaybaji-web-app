import axios from 'axios';
import { ICreateUser, IUpdateUser } from '../interfaces/users';
import { StateManager } from '../state-management/stateManager';

const baseUrl = 'http://localhost:8000';
const usersUrl = '/users';
const allUsersUrl = '/users/all';
const registerUrl = `${usersUrl}/register`;
const editUrl = `${usersUrl}/edit`;
const deleteUrl = `${usersUrl}/delete`;

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
export const fetchUser = async (userID: string) => {
  const designatedUrl = userID
    ? `${baseUrl}${usersUrl}/?userID=${userID}`
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
export const register = async (formData: ICreateUser) => {
  return await axios.post(`${baseUrl}${registerUrl}`, formData).then((res) => {
    return res.data;
  });
};
export const editUser = async (formData: IUpdateUser, userID?: string) => {
  return await axios
    .post(`${baseUrl}${editUrl}`, formData, {
      params: {
        userID: userID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteUser = async (userID?: string) => {
  return await axios
    .post(`${baseUrl}${deleteUrl}`, {
      params: {
        userID: userID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
