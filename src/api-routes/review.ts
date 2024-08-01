import axios from 'axios';
import { StateManager } from '../state-management/stateManager';
import { ICreateReview, IEditReview } from '../interfaces/review';
import { ReviewTargetType } from '../enums/review';

const baseUrl = 'http://localhost:8000';
const allReviewsUrl = `/reviews/all`;
const usersReviewsUrl = `/reviews/user`;
const targetReviewsUrl = `/reviews/`;
const specificReviewUrl = `/reviews/`;
const createReviewUrl = `/reviews/create`;
const editReviewUrl = `/reviews/edit`;
const deleteReviewUrl = `/reviews/delete`;

export const fetchSpecificReview = async (
  targetId: string,
  targetType: ReviewTargetType,
  userId?: string,
) => {
  return await axios
    .get(`${baseUrl}${specificReviewUrl}`, {
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
export const fetchTargetReviews = async (
  targetType: ReviewTargetType,
  targetId: string,
) => {
  return await axios
    .get(`${baseUrl}${targetReviewsUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
      params: {
        targetId: targetId,
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
  targetId: string,
) => {
  return await axios
    .patch(`${baseUrl}${editReviewUrl}`, editReviewData, {
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
export const deleteReview = async (targetId: string) => {
  return await axios
    .delete(`${baseUrl}${deleteReviewUrl}`, {
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
