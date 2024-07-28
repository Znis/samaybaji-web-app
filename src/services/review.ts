import ReviewModel from '../models/review';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ReviewTargetType } from '../enums/review';
import { ICreateReview, IEditReview, IReview } from '../interfaces/review';

const logger = loggerWithNameSpace('Review Service');
export default class ReviewServices {
  static async getAllReviews() {
    const Reviews = await ReviewModel.getAllReviews();
    if (!Reviews) {
      return null;
    }
    logger.info('All Reviews Found');
    return Reviews;
  }
  static async getReviewsByUserID(
    userID: string,
    targetType: ReviewTargetType,
  ) {
    const Reviews = await ReviewModel.getReviewsByUserID(userID, targetType);
    if (!Reviews) {
      return null;
    }
    logger.info(`All Reviews of userID ${userID} for ${targetType} Found`);
    return Reviews;
  }
  static async getReview(
    userID: string,
    targetType: ReviewTargetType,
    targetID: string,
  ) {
    const Review = await ReviewModel.getReview(userID, targetType, targetID);
    if (!Review) {
      logger.error(`Review for ${targetType} with ID ${targetID} not found`);
      return null;
    }
    logger.info(`Review for ${targetType} with ID ${targetID} found`);
    return Review;
  }

  static async createReview(ReviewData: ICreateReview) {
    const queryResult = await ReviewModel.createReview(ReviewData)!;
    if (!queryResult) {
      logger.error('Could not create new Review');
      throw new ModelError('Could not create Review');
    }
    logger.info(`New Review for ${ReviewData.targetType} created`);
    return { ...ReviewData, id: queryResult.id } as IReview;
  }

  static async editReview(reviewID: string, editReviewData: IEditReview) {
    const queryResult = await ReviewModel.editReview(reviewID, editReviewData)!;
    if (!queryResult) {
      logger.error(`Could not edit Review with reviewID ${reviewID}`);
      throw new ModelError('Could not edit Review');
    }
    logger.info(`Review with reviewID ${queryResult.id} updated`);

    return {
      ...editReviewData,
      id: reviewID,
    } as IReview;
  }

  static async deleteReview(reviewID: string) {
    const queryResult = await ReviewModel.deleteReview(reviewID)!;
    if (!queryResult) {
      logger.error(`Could not delete Review with reviewID ${reviewID}`);
      throw new ModelError('Could not delete Review');
    }
    logger.info(`Review with reviewID ${reviewID} deleted`);

    return true;
  }
}
