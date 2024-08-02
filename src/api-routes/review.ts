import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateReview, IEditReview } from '../interfaces/review';
import { ReviewTargetType } from '../enums/review';

const baseUrl = 'http://localhost:8000';
const allReviewsUrl = `/reviews/all`;
const usersReviewsUrl = `/reviews/user`;
const reviewUrl = `/reviews`;
const specificReview = `/reviews/specific-review`;

export const fetchSpecificReview = async (
  targetId: string,
  targetType: ReviewTargetType,
  userId?: string,
) => {
  return await axios
    .get(`${baseUrl}${specificReview}`, {
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
export const fetchUserReviews = async (userId?: string) => {
  return await axios
    .get(`${baseUrl}${usersReviewsUrl}`, {
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
export const fetchAllReviews = async () => {
  return await axios
    .get(`${baseUrl}${allReviewsUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchTargetReviews = async (targetId: string) => {
  return await axios
    .get(`${baseUrl}${reviewUrl}/${targetId}`, {})
    .then((res) => {
      return res.data;
    });
};
export const createReview = async (
  reviewData: ICreateReview,
  targetId: string,
) => {
  return await axios
    .post(`${baseUrl}${reviewUrl}/${targetId}`, reviewData, {
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
  targetId: string,
) => {
  return await axios
    .patch(`${baseUrl}${reviewUrl}/${targetId}`, editReviewData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const deleteReview = async (targetId: string) => {
  return await axios
    .delete(`${baseUrl}${reviewUrl}/${targetId}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
