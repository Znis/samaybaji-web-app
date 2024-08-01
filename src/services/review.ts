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
  static async getReviewsByUserId(userId: string) {
    const dishReviews = await ReviewModel.getReviewsByUserId(
      userId,
      ReviewTargetType.DISH,
    );
    const restaurantReviews = await ReviewModel.getReviewsByUserId(
      userId,
      ReviewTargetType.RESTAURANT,
    );
    if (!restaurantReviews || !dishReviews) {
      logger.error('No any review found');
      return null;
    }
    logger.info(`All Reviews of userId ${userId} Found`);
    return { dishReviews: dishReviews, restaurantReviews: restaurantReviews };
  }
  static async getSpecificReviewByUserId(
    userId: string,
    targetType: ReviewTargetType,
    targetId: string,
  ) {
    const review = await ReviewModel.getSpecificReviewByUserId(
      userId,
      targetId,
      targetType,
    );
    if (!review) {
      logger.error('No any specific review found');
      return null;
    }

    logger.info(
      `Review found for userId ${userId}, targetId ${targetId}, targetType ${targetType}`,
    );
    return review;
  }

  static async getReviews(targetType: ReviewTargetType, targetId: string) {
    const reviews = await ReviewModel.getReviews(targetId, targetType);
    if (!reviews) {
      logger.error(`Reviews for ${targetType} with Id ${targetId} not found`);
      return null;
    }
    logger.info(`Reviews for ${targetType} with Id ${targetId} found`);
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

  static async editReview(reviewId: string, editReviewData: IEditReview) {
    const queryResult = await ReviewModel.editReview(reviewId, editReviewData)!;
    if (!queryResult) {
      logger.error(`Could not edit Review with reviewId ${reviewId}`);
      throw new ModelError('Could not edit Review');
    }
    logger.info(`Review with reviewId ${queryResult.id} updated`);

    return {
      ...editReviewData,
      id: reviewId,
    } as IReview;
  }

  static async deleteReview(reviewId: string) {
    const queryResult = await ReviewModel.deleteReview(reviewId)!;
    if (!queryResult) {
      logger.error(`Could not delete Review with reviewId ${reviewId}`);
      throw new ModelError('Could not delete Review');
    }
    logger.info(`Review with reviewId ${reviewId} deleted`);

    return true;
  }
}
