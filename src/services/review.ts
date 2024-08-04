import ReviewModel from '../models/review';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import { ReviewTargetType } from '../enums/review';
import { ICreateReview, IEditReview, IReview } from '../interfaces/review';

const logger = loggerWithNameSpace('Review Service');
export default class ReviewService {
  /**
   * Retrieves all reviews for both dish and restaurant targets.
   *
   * @return {Promise<{ dishReviews: IReview[], restaurantReviews: IReview[] } | null>} An object containing both dish and restaurant reviews, or null if no reviews are found.
   */
  static async getAllReviews() {
    const dishReviews = await ReviewModel.getAllReviews(ReviewTargetType.DISH);
    const restaurantReviews = await ReviewModel.getAllReviews(
      ReviewTargetType.RESTAURANT,
    );
    if (!restaurantReviews || !dishReviews) {
      logger.error('No any review found');
      return null;
    }
    logger.info('All Reviews Found');
    return { dishReviews: dishReviews, restaurantReviews: restaurantReviews };
  }
  /**
   * Retrieves the reviews made by a user for both dish and restaurant targets.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<{ dishReviews: IReview[], restaurantReviews: IReview[] } | null>} An object containing both dish and restaurant reviews, or null if no reviews are found.
   */
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

  /**
   * Retrieves reviews by the given target ID.
   *
   * @param {string} targetId - The ID of the target.
   * @return {Promise<Review[] | null>} An array of reviews or null if not found.
   */
  static async getReviewsByTargetId(targetId: string) {
    const reviews = await ReviewModel.getReviewsByTargetId(targetId);
    if (!reviews) {
      logger.error(`Reviews for Id ${targetId} not found`);
      return null;
    }
    logger.info(`Reviews for Id ${targetId} found`);
    return reviews;
  }

  /**
   * Creates a new review in the database.
   *
   * @param {ICreateReview} reviewData - The data for the review to be created.
   * @param {string} targetId - The ID of the target for the review.
   * @param {string} userId - The ID of the user creating the review.
   * @return {Promise<IReview>} The newly created review with its ID.
   * @throws {ModelError} If the review could not be created.
   */
  static async createReview(
    reviewData: ICreateReview,
    targetId: string,
    userId: string,
  ) {
    const queryResult = await ReviewModel.createReview(
      reviewData,
      targetId,
      userId,
    )!;
    if (!queryResult) {
      logger.error('Could not create new Review');
      throw new ModelError('Could not create Review');
    }
    logger.info(`New Review for ${reviewData.targetType} created`);
    return { ...reviewData, id: queryResult.id } as IReview;
  }

  /**
   * Updates a review in the database.
   *
   * @param {string} reviewId - The ID of the review to be updated.
   * @param {IEditReview} editReviewData - The updated data for the review.
   * @return {IReview} The updated review data.
   */
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

  /**
   * Deletes a review from the database.
   *
   * @param {string} reviewId - The ID of the review to be deleted.
   * @return {Promise<boolean>} A promise that resolves to true if the review is successfully deleted, or rejects with a ModelError if the deletion fails.
   */
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
