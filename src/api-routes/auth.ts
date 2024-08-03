import axios from 'axios';
import { IAuthUser } from '../interfaces/users';
import { baseUrl } from './base';

const loginUrl = '/login';
const adminLoginUrl = '/login/admin';
const refreshUrl = '/refresh';

export const login = async (formData: IAuthUser) => {
  return await axios
    .post(`${baseUrl}${loginUrl}`, formData, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    });
};
export const adminLogin = async (formData: IAuthUser) => {
  return await axios
    .post(`${baseUrl}${adminLoginUrl}`, formData, {
      withCredentials: true,
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
