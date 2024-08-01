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
  targetId: string,
  targetType: ReviewTargetType,
  userId?: string,
) => {
  return await axios
    .get(`${baseUrl}${specificRatingUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        targetId: targetId,
        targetType: targetType,
        userId: userId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchUserRatings = async (userId?: string) => {
  return await axios
    .get(`${baseUrl}${usersRatingsUrl}`, {
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
export const fetchTargetRatings = async (
  targetType: ReviewTargetType,
  targetId: string,
) => {
  return await axios
    .get(`${baseUrl}${targetRatingsUrl}`, {
      params: {
        targetId: targetId,
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
  targetId: string,
) => {
  return await axios
    .patch(`${baseUrl}${editRatingUrl}`, editRatingData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        targetId: targetId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteRating = async (targetId: string) => {
  return await axios
    .delete(`${baseUrl}${deleteRatingUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        targetId: targetId,
      },
    })
    .then((res) => {
      return res.data;
    });
};
