import RatingModel from '../models/rating';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ReviewTargetType } from '../enums/review';
import { ICreateRating, IEditRating, IRating } from '../interfaces/rating';

const logger = loggerWithNameSpace('Rating Service');
export default class RatingServices {
  static async getAllRatings() {
    const ratings = await RatingModel.getAllRatings();
    if (!ratings) {
      return null;
    }
    logger.info('All Ratings Found');
    return ratings;
  }
  static async getRatingsByUserID(
    userID: string,
    targetType: ReviewTargetType,
  ) {
    const ratings = await RatingModel.getRatingsByUserID(userID, targetType);
    if (!ratings) {
      return null;
    }
    logger.info(`All Ratings of userID ${userID} for ${targetType} Found`);
    return ratings;
  }
  static async getRating(
    userID: string,
    targetType: ReviewTargetType,
    targetID: string,
  ) {
    const rating = await RatingModel.getRating(userID, targetType, targetID);
    if (!rating) {
      logger.error(`Rating for ${targetType} with ID ${targetID} not found`);
      return null;
    }
    logger.info(`Rating for ${targetType} with ID ${targetID} found`);
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

  static async editRating(ratingID: string, editRatingData: IEditRating) {
    const queryResult = await RatingModel.editRating(ratingID, editRatingData)!;
    if (!queryResult) {
      logger.error(`Could not edit rating with ratingID ${ratingID}`);
      throw new ModelError('Could not edit Rating');
    }
    logger.info(`Rating with ratingID ${queryResult.id} updated`);

    return {
      ...editRatingData,
      id: ratingID,
    } as IRating;
  }

  static async deleteRating(ratingID: string) {
    const queryResult = await RatingModel.deleteRating(ratingID)!;
    if (!queryResult) {
      logger.error(`Could not delete rating with ratingID ${ratingID}`);
      throw new ModelError('Could not delete Rating');
    }
    logger.info(`Rating with ratingID ${ratingID} deleted`);

    return true;
  }
}
