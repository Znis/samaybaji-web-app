import axios from 'axios';
import { ICreateRestaurant, IEditRestaurant } from '../interfaces/restaurant';
import { StateManager } from '../state-management/stateManager';

const baseUrl = 'http://localhost:8000';
const restaurantUrl = '/restaurants/all';
const userRestaurantUrl = '/restaurants';
const createRestaurantUrl = `/restaurants/create`;
const editRestaurantUrl = `/restaurants/edit`;
const deleteRestaurantUrl = `/restaurants/delete`;

export const fetchAllRestaurants = async () => {
  return await axios.get(`${baseUrl}${restaurantUrl}`).then((res) => {
    return res.data;
  });
};
export const fetchUserRestaurant = async (userID?: string) => {
  return await axios
    .get(`${baseUrl}${userRestaurantUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        userID: userID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const createRestaurant = async (restaurantData: ICreateRestaurant) => {
  return await axios
    .post(`${baseUrl}${createRestaurantUrl}`, restaurantData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const editRestaurant = async (
  restaurantData: IEditRestaurant,
  restaurantID?: string,
) => {
  return await axios
    .post(`${baseUrl}${editRestaurantUrl}`, restaurantData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        restaurantID: restaurantID,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const deleteRestaurant = async (restaurantID?: string) => {
  return await axios
    .post(
      `${baseUrl}${deleteRestaurantUrl}`,
      {
        headers: {
          Authorization: `Bearer ${StateManager.state.accessToken}`,
        },
      },
      {
        params: {
          restaurantID: restaurantID,
        },
      },
    )
    .then((res) => {
      return res.data;
    });
};
