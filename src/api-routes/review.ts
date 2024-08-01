import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateReview, IEditReview } from '../interfaces/review';
import { ReviewTargetType } from '../enums/review';

const baseUrl = 'http://localhost:8000';
const usersReviewsUrl = `/reviews/user`;
const targetReviewsUrl = `/reviews/`;
const specificReviewUrl = `/reviews/`;
const createReviewUrl = `/reviews/create`;
const editReviewUrl = `/reviews/edit`;
const deleteReviewUrl = `/reviews/delete`;

export const fetchSpecificReview = async (
  targetID: string,
  targetType: ReviewTargetType,
  userID?: string,
) => {
  return await axios
    .get(`${baseUrl}${specificReviewUrl}`, {
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
export const fetchUserReviews = async (userID?: string) => {
  return await axios
    .get(`${baseUrl}${usersReviewsUrl}`, {
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
export const fetchTargetReviews = async (
  targetType: ReviewTargetType,
  targetID: string,
) => {
  return await axios
    .get(`${baseUrl}${targetReviewsUrl}`, {
      params: {
        targetID: targetID,
        targetType: targetType,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const createReview = async (reviewData: ICreateReview) => {
  return await axios
    .post(`${baseUrl}${createReviewUrl}`, reviewData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editReview = async (
  editReviewData: IEditReview,
  targetID: string,
) => {
  return await axios
    .patch(`${baseUrl}${editReviewUrl}`, editReviewData, {
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
export const deleteReview = async (targetID: string) => {
  return await axios
    .delete(`${baseUrl}${deleteReviewUrl}`, {
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
