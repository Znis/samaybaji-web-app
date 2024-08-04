import { ReviewTargetType } from '../enums/review';
import { ICreateReview, IEditReview } from '../interfaces/review';
import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Review Model');
export default class ReviewModel extends BaseModel {
  /**
   * Retrieves all reviews for a specific target type.
   *
   * @param {ReviewTargetType} targetType - The type of target for which to retrieve reviews.
   * @return {Promise<any[]>} A promise that resolves to an array of review data, or null if an error occurred.
   */
  static getAllReviews(targetType: ReviewTargetType) {
    return this.queryBuilder()
      .select('*')
      .from('reviews')
      .where('target_type', targetType)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves all reviews for a specific user and target type.
   *
   * @param {string} userId - The ID of the user.
   * @param {ReviewTargetType} targetType - The type of target.
   * @return {Promise<any[] | null>} A promise that resolves to an array of review data or null if an error occurred.
   */
  static getReviewsByUserId(userId: string, targetType: ReviewTargetType) {
    return this.queryBuilder()
      .select('*')
      .from('reviews')
      .where('user_id', userId)
      .andWhere('target_type', targetType)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves all reviews for a specific target ID.
   *
   * @param {string} targetId - The ID of the target.
   * @return {Promise<any[] | null>} A promise that resolves to an array of review data or null if an error occurred.
   */
  static getReviewsByTargetId(targetId: string) {
    return this.queryBuilder()
      .select('*')
      .from('reviews')
      .where('target_id', targetId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Creates a new review in the database.
   *
   * @param {ICreateReview} reviewData - The data for the review to be created.
   * @param {string} targetId - The ID of the target for the review.
   * @param {string} userId - The ID of the user creating the review.
   * @return {Promise<string | null>} A promise that resolves to the ID of the newly created review, or null if an error occurred.
   */
  static createReview(
    reviewData: ICreateReview,
    targetId: string,
    userId: string,
  ) {
    return this.queryBuilder()
      .insert({ ...reviewData, targetId: targetId, userId: userId })
      .into('reviews')
      .returning('id')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }

  /**
   * Updates a review in the database.
   *
   * @param {string} reviewId - The ID of the review to be updated.
   * @param {IEditReview} editReviewData - The updated data for the review.
   * @return {Promise<any | null>} A promise that resolves to the updated review data or null if an error occurred.
   */
  static editReview(reviewId: string, editReviewData: IEditReview) {
    return this.queryBuilder()
      .update(editReviewData)
      .from('reviews')
      .where('id', reviewId)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Deletes a review from the database.
   *
   * @param {string} reviewId - The ID of the review to be deleted.
   * @return {Promise<any | null>} A promise that resolves to the deleted review data or null if an error occurred.
   */
  static deleteReview(reviewId: string) {
    return this.queryBuilder()
      .del()
      .from('reviews')
      .where('id', reviewId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
