import RatingModel from '../models/rating';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ICreateRating, IEditRating, IRating } from '../interfaces/rating';

const logger = loggerWithNameSpace('Rating Service');
export default class RatingService {
  /**
   * Retrieves the ratings for a given target ID.
   *
   * @param {string} targetId - The ID of the target.
   * @return {Promise<{ count: number, rating: number } | null>} - An object containing the count of ratings and the average rating, or null if no ratings are found.
   */
  static async getTargetRatings(targetId: string) {
    const ratings = await RatingModel.getTargetRatings(targetId);
    if (!ratings) {
      logger.error(`Ratings for Id ${targetId} not found`);
      return null;
    }
    logger.info(`Ratings for Id ${targetId} found`);
    const count = ratings.length;
    const rating = Math.floor(
      ratings.reduce((sum, rating) => sum + rating.rating, 0) / count,
    );
    return { count: count, rating: rating };
  }

  /**
   * Retrieves a specific rating for a given target and user.
   *
   * @param {string} targetId - The ID of the target.
   * @param {string} userId - The ID of the user.
   * @return {Promise<any>} A promise that resolves to the rating data if found, or null if not found.
   */
  static async getSpecificRating(targetId: string, userId: string) {
    const rating = await RatingModel.getSpecificRating(targetId, userId);
    if (!rating) {
      logger.error('No any specific rating found');
      return null;
    }

    logger.info(`Review found for userId ${userId}, targetId ${targetId}`);
    return rating;
  }
  /**
   * Creates a new rating for a target and user.
   *
   * @param {ICreateRating} ratingData - The data for the rating to be created.
   * @param {string} targetId - The ID of the target.
   * @param {string} userId - The ID of the user.
   * @return {Promise<IRating>} The created rating with its ID.
   * @throws {ModelError} If the rating could not be created.
   */
  static async createRating(
    ratingData: ICreateRating,
    targetId: string,
    userId: string,
  ) {
    const queryResult = await RatingModel.createRating(
      ratingData,
      targetId,
      userId,
    )!;
    if (!queryResult) {
      logger.error('Could not create new rating');
      throw new ModelError('Could not create rating');
    }
    logger.info(`New rating for ${ratingData.targetType} created`);
    return { ...ratingData, id: queryResult.id } as IRating;
  }

  /**
   * Edits a rating with the given ID and data.
   *
   * @param {string} ratingId - The ID of the rating to edit.
   * @param {IEditRating} editRatingData - The data to update the rating with.
   * @return {Promise<IRating>} A promise that resolves to the updated rating.
   * @throws {ModelError} If the rating could not be edited.
   */
  static async editRating(ratingId: string, editRatingData: IEditRating) {
    const queryResult = await RatingModel.editRating(ratingId, editRatingData)!;
    if (!queryResult) {
      logger.error(`Could not edit rating with ratingId ${ratingId}`);
      throw new ModelError('Could not edit Rating');
    }
    logger.info(`Rating with ratingId ${queryResult.id} updated`);

    return {
      ...editRatingData,
      id: ratingId,
    } as IRating;
  }

  /**
   * Deletes a rating with the given ID.
   *
   * @param {string} ratingId - The ID of the rating to delete.
   * @return {Promise<boolean>} A promise that resolves to true if the rating is successfully deleted, or throws a ModelError if the deletion fails.
   */
  static async deleteRating(ratingId: string) {
    const queryResult = await RatingModel.deleteRating(ratingId)!;
    if (!queryResult) {
      logger.error(`Could not delete rating with ratingId ${ratingId}`);
      throw new ModelError('Could not delete Rating');
    }
    logger.info(`Rating with ratingId ${ratingId} deleted`);

    return true;
  }
}
