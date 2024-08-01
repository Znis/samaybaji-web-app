import axios from 'axios';
import { IAuthUser } from '../interfaces/users';

const baseUrl = 'http://localhost:8000';
const loginUrl = '/login';
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
