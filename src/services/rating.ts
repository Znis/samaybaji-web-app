import RatingModel from '../models/rating';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ReviewTargetType } from '../enums/review';
import { ICreateRating, IEditRating, IRating } from '../interfaces/rating';

const logger = loggerWithNameSpace('Rating Service');
export default class RatingService {
  static async getAllRatings() {
    const ratings = await RatingModel.getAllRatings();
    if (!ratings) {
      return null;
    }
    logger.info('All Ratings Found');
    return ratings;
  }
  static async getRatingsByUserId(userId: string) {
    const dishRatings = await RatingModel.getRatingsByUserId(
      userId,
      ReviewTargetType.DISH,
    );
    const restaurantRatings = await RatingModel.getRatingsByUserId(
      userId,
      ReviewTargetType.RESTAURANT,
    );
    if (!dishRatings || !restaurantRatings) {
      return null;
    }
    logger.info(`All Ratings of userId ${userId} Found`);
    return { dishRatings: dishRatings, restaurantRatings: restaurantRatings };
  }
  static async getRatings(targetType: ReviewTargetType, targetId: string) {
    const rating = await RatingModel.getRatings(targetType, targetId);
    if (!rating) {
      logger.error(`Rating for ${targetType} with Id ${targetId} not found`);
      return null;
    }
    logger.info(`Rating for ${targetType} with Id ${targetId} found`);
    return rating;
  }

  static async getSpecificRatingByUserId(
    userId: string,
    targetType: ReviewTargetType,
    targetId: string,
  ) {
    const rating = await RatingModel.getSpecificRatingByUserId(
      userId,
      targetId,
      targetType,
    );
    if (!rating) {
      logger.error('No any specific rating found');
      return null;
    }

    logger.info(
      `Review found for userId ${userId}, targetId ${targetId}, targetType ${targetType}`,
    );
    return rating;
  }
  static async createRating(ratingData: ICreateRating) {
    const queryResult = await RatingModel.createRating(ratingData)!;
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
