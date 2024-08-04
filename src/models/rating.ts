import { ICreateRating, IEditRating } from '../interfaces/rating';
import loggerWithNameSpace from '../utils/logger';
import { BaseModel } from './base';

const logger = loggerWithNameSpace('Rating Model');
export default class RatingModel extends BaseModel {
  /**
   * Retrieves a specific rating for a given target and user.
   *
   * @param {string} targetId - The ID of the target.
   * @param {string} userId - The ID of the user.
   * @return {Promise<any>} A promise that resolves to the rating data if found, or null if not found.
   */
  static getSpecificRating(targetId: string, userId: string) {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .where('user_id', userId)
      .andWhere('target_id', targetId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Retrieves all ratings for a given target.
   *
   * @param {string} targetId - The ID of the target.
   * @return {Promise<any[] | null>} A promise that resolves to an array of rating data if found, or null if not found.
   */
  static getTargetRatings(targetId: string) {
    return this.queryBuilder()
      .select('*')
      .from('ratings')
      .andWhere('target_id', targetId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
  /**
   * Creates a rating for a target and user.
   *
   * @param {ICreateRating} ratingData - The data for the rating.
   * @param {string} targetId - The ID of the target.
   * @param {string} userId - The ID of the user.
   * @return {Promise<number | null>} A promise that resolves to the ID of the created rating, or null if an error occurred.
   */
  static createRating(
    ratingData: ICreateRating,
    targetId: string,
    userId: string,
  ) {
    return this.queryBuilder()
      .insert({ ...ratingData, targetId: targetId, userId: userId })
      .into('ratings')
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
   * Updates a rating with the provided data.
   *
   * @param {string} ratingId - The ID of the rating to update.
   * @param {IEditRating} editRatingData - The data to update the rating with.
   * @return {Promise<any | null>} A promise that resolves to the updated rating data, or null if an error occurred.
   */
  static editRating(ratingId: string, editRatingData: IEditRating) {
    return this.queryBuilder()
      .update(editRatingData)
      .from('ratings')
      .where('id', ratingId)
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
   * Deletes a rating from the 'ratings' table by its ID.
   *
   * @param {string} ratingId - The ID of the rating to delete.
   * @return {Promise<any | null>} A promise that resolves to the deleted rating data, or null if an error occurred.
   */
  static deleteRating(ratingId: string) {
    return this.queryBuilder()
      .del()
      .from('ratings')
      .where('id', ratingId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        logger.error('Model error: ', error);
        return null;
      });
  }
}
