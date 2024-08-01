import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ReviewTargetType } from '../enums/review';
import { ICreateRating, IEditRating } from '../interfaces/rating';

const baseUrl = 'http://localhost:8000';
const usersRatingsUrl = `/ratings/user`;
const targetRatingsUrl = `/ratiRating`;
const specificRatingUrl = `/ratings/`;
const createRatingUrl = `/ratings/create`;
const editRatingUrl = `/ratings/edit`;
const deleteRatingUrl = `/ratings/delete`;

export const fetchSpecificRating = async (
  targetID: string,
  targetType: ReviewTargetType,
  userID?: string,
) => {
  return await axios
    .get(`${baseUrl}${specificRatingUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        targetID: targetID,
        targetType: targetType,
        userID: userID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchUserRatings = async (userID?: string) => {
  return await axios
    .get(`${baseUrl}${usersRatingsUrl}`, {
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
export const fetchTargetRatings = async (
  targetType: ReviewTargetType,
  targetID: string,
) => {
  return await axios
    .get(`${baseUrl}${targetRatingsUrl}`, {
      params: {
        targetID: targetID,
        targetType: targetType,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const createRating = async (ratingData: ICreateRating) => {
  return await axios
    .post(`${baseUrl}${createRatingUrl}`, ratingData, {
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
  targetID: string,
) => {
  return await axios
    .patch(`${baseUrl}${editRatingUrl}`, editRatingData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        targetID: targetID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteRating = async (targetID: string) => {
  return await axios
    .delete(`${baseUrl}${deleteRatingUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        targetID: targetID,
      },
    })
    .then((res) => {
      return res.data;
    });
};
