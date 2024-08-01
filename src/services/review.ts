import ReviewModel from '../models/review';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ReviewTargetType } from '../enums/review';
import { ICreateReview, IEditReview, IReview } from '../interfaces/review';

const logger = loggerWithNameSpace('Review Service');
export default class ReviewService {
  static async getAllReviews() {
    const dishReviews = await ReviewModel.getAllReviews(ReviewTargetType.DISH);
    const restaurantReviews = await ReviewModel.getAllReviews(ReviewTargetType.RESTAURANT);
    if (!restaurantReviews || !dishReviews) {
      logger.error('No any review found');
      return null;
    }
    logger.info('All Reviews Found');
    return { dishReviews: dishReviews, restaurantReviews: restaurantReviews };
  }
  static async getReviewsByUserID(userID: string) {
    const dishReviews = await ReviewModel.getReviewsByUserID(
      userID,
      ReviewTargetType.DISH,
    );
    const restaurantReviews = await ReviewModel.getReviewsByUserID(
      userID,
      ReviewTargetType.RESTAURANT,
    );
    if (!restaurantReviews || !dishReviews) {
      logger.error('No any review found');
      return null;
    }
    logger.info(`All Reviews of userID ${userID} Found`);
    return { dishReviews: dishReviews, restaurantReviews: restaurantReviews };
  }
  static async getSpecificReviewByUserID(
    userID: string,
    targetType: ReviewTargetType,
    targetID: string,
  ) {
    const review = await ReviewModel.getSpecificReviewByUserID(
      userID,
      targetID,
      targetType,
    );
    if (!review) {
      logger.error('No any specific review found');
      return null;
    }

    logger.info(
      `Review found for userID ${userID}, targetID ${targetID}, targetType ${targetType}`,
    );
    return review;
  }

  static async getReviews(targetType: ReviewTargetType, targetID: string) {
    const reviews = await ReviewModel.getReviews(targetID, targetType);
    if (!reviews) {
      logger.error(`Reviews for ${targetType} with ID ${targetID} not found`);
      return null;
    }
    logger.info(`Reviews for ${targetType} with ID ${targetID} found`);
    return reviews;
  }

  static async createReview(reviewData: ICreateReview) {
    const queryResult = await ReviewModel.createReview(reviewData)!;
    if (!queryResult) {
      logger.error('Could not create new Review');
      throw new ModelError('Could not create Review');
    }
    logger.info(`New Review for ${reviewData.targetType} created`);
    return { ...reviewData, id: queryResult.id } as IReview;
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
