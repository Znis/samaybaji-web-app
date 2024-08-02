import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ReviewTargetType } from '../enums/review';
import { ICreateRating, IEditRating } from '../interfaces/rating';

const baseUrl = 'http://localhost:8000';
const ratingUrl = '/ratings';
const specificRatingUrl = '/ratings/specific-rating/';

export const fetchSpecificRating = async (
  targetId: string,
  userId?: string,
) => {
  return await axios
    .get(`${baseUrl}${specificRatingUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        targetId: targetId,
        userId: userId,
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
  targetId: string,
) => {
  return await axios
    .patch(`${baseUrl}${ratingUrl}/${targetId}`, editRatingData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
