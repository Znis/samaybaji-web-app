import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateRating, IEditRating } from '../interfaces/rating';
import { baseUrl } from './base';

const ratingUrl = '/ratings';
const specificRatingUrl = '/ratings/specific-rating';

export const fetchSpecificRating = async (targetId: string) => {
  return await axios
    .get(`${baseUrl}${specificRatingUrl}/${targetId}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const fetchTargetRatings = async (targetId: string) => {
  return await axios
    .get(`${baseUrl}${ratingUrl}/${targetId}`, {})
    .then((res) => {
      return res.data;
    });
};
export const createRating = async (
  ratingData: ICreateRating,
  targetId: string,
) => {
  return await axios
    .post(`${baseUrl}${ratingUrl}/${targetId}`, ratingData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editRating = async (
  editRatingData: IEditRating,
  reviewId: string,
) => {
  return await axios
    .patch(`${baseUrl}${ratingUrl}/${reviewId}`, editRatingData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
