import axios, { AxiosResponse } from 'axios';
import { userFormData } from './interfaces/users';
import { StateManagement } from './state-management/stateManagement';

const baseUrl = 'http://localhost:8000';
const usersUrl = '/users';
const loginUrl = '/login';
const registerUrl = `${usersUrl}/register`;
const refreshUrl = '/authenticate/refresh';
const restaurantUrl = '/restaurants';
const menuUrl = '/menus';

export const login = async (formData: userFormData) => {
  return await axios
    .post(`${baseUrl}${loginUrl}`, formData, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    });
};
export const register = async (formData: userFormData) => {
  return await axios.post(`${baseUrl}${registerUrl}`, formData).then((res) => {
    return res.data;
  });
};

export const fetchAllUsers = async () => {
  return await axios
    .get(`${baseUrl}${usersUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManagement.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchAllRestaurants = async () => {
  return await axios
    .get(`${baseUrl}${restaurantUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManagement.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchAllMenus = async () => {
  return await axios
    .get(`${baseUrl}${menuUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManagement.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const fetchAccessToken = async () => {
  return await axios
    .post(
      `${baseUrl}${refreshUrl}`,
      {},
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export async function makeApiCall<T, R>(
  callbackFn: (...args: T[]) => Promise<Response>,
  ...args: T[]
): Promise<Response> {
  try {
    const response = await callbackFn(...args);
    return response;
  } catch {
    const tokenResponse = await fetchAccessToken();
    if (!tokenResponse.accessToken) {
      StateManagement.updateState('accessToken', null);
      StateManagement.updateState('user', null);
      return tokenResponse;
    }
    StateManagement.updateState('accessToken', tokenResponse.accessToken);

    const response = await callbackFn(...args);
    return response;
  }
}
