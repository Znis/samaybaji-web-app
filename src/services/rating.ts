import RatingModel from '../models/rating';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ICreateRating, IEditRating, IRating } from '../interfaces/rating';

const logger = loggerWithNameSpace('Rating Service');
export default class RatingService {
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

  static async getSpecificRating(targetId: string, userId: string) {
    const rating = await RatingModel.getSpecificRating(targetId, userId);
    if (!rating) {
      logger.error('No any specific rating found');
      return null;
    }

    logger.info(`Review found for userId ${userId}, targetId ${targetId}`);
    return rating;
  }
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
